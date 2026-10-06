#!/usr/bin/env node
/**
 * Reads every doc page, splits into small sections, embeds them through the
 * LiteLLM gateway (OpenAI text-embedding-3-small),
 * and writes two files the Ask Assistant API reads at runtime:
 *
 *   public/ask-index.bin        — packed Float32 vectors (1024 dims per chunk)
 *   public/ask-index.meta.json  — parallel array of { url, title, product, excerpt }
 *
 * Usage:
 *   node --env-file=.env scripts/build-ask-index.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, appendFileSync, unlinkSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { createHash } from 'crypto';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const DOCS_DIR  = join(ROOT, 'src', 'content', 'docs');
const PUBLIC    = join(ROOT, 'public');

// Embeddings run through the company LiteLLM gateway (same key and base URL as
// answer generation — direct provider keys are disabled).
const GATEWAY_KEY = process.env.ANTHROPIC_API_KEY;
const GATEWAY_URL = process.env.ANTHROPIC_BASE_URL;

const EMBED_MODEL   = 'text-embedding-3-small-openai';
const DIMS          = 1024;   // text-embedding-3-small, truncated via `dimensions`
const CHUNK_MAX     = 900;    // characters per chunk before splitting further

// Throughput knobs. The gateway has no trial-tier throttle, so the defaults
// build the whole index in a couple of minutes; override if it rate-limits.
const BATCH_SIZE    = Number(process.env.EMBED_BATCH_SIZE)  || 128;  // texts per request
const CONCURRENCY   = Number(process.env.EMBED_CONCURRENCY) || 4;    // parallel requests
const REQ_MIN_MS    = Number(process.env.EMBED_REQ_MIN_MS)  || 0;    // min ms between request starts

// ── Walk docs directory ────────────────────────────────────────────────────────

function walkDocs(dir, results = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walkDocs(full, results);
    } else if (/\.(md|mdx)$/.test(name)) {
      results.push(full);
    }
  }
  return results;
}

// ── Parse frontmatter ──────────────────────────────────────────────────────────

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { title: '', description: '', body: raw, data: {} };
  const body = m[2];
  let data = {};
  try {
    data = yaml.load(m[1]) || {};
  } catch {
    // Fall back to a title-only parse if the YAML is malformed
    const titleM = m[1].match(/^title:\s*['"]?(.*?)['"]?\s*$/m);
    data = titleM ? { title: titleM[1].trim() } : {};
  }
  return {
    title: data.title ? String(data.title).trim() : '',
    description: data.description ? String(data.description).trim() : '',
    body,
    data,
  };
}

// ── Render an `api:` frontmatter block as searchable plain text ─────────────────
// API reference pages keep all their content (endpoint, params, response schema)
// in the `api:` YAML block and have an empty markdown body. Without this, those
// pages would only ever be indexed by their title — so the Ask Assistant could
// surface them as "related" but never had the endpoint URL or field descriptions
// in the context it feeds the LLM.

function apiToText(api) {
  if (!api || typeof api !== 'object') return '';
  const lines = [];
  const method = api.method ? String(api.method).toUpperCase() : '';
  const path   = api.path ? String(api.path) : '';
  const base   = api.baseUrl ? String(api.baseUrl).replace(/\/+$/, '') : '';

  if (method || path) lines.push(`${method} ${path}`.trim());
  if (base && path)   lines.push(`Endpoint URL: ${base}${path}`);
  if (method)         lines.push(`HTTP method: ${method}`);

  const fields = (label, arr) => {
    if (!Array.isArray(arr) || !arr.length) return;
    lines.push(`${label}:`);
    for (const p of arr) {
      if (p && p.name) lines.push(`- ${p.name}: ${p.desc || ''}`.trim());
    }
  };
  fields('Path parameters',    api.pathParams);
  fields('Query parameters',   api.query);
  fields('Form data fields',   api.formData);
  fields('Request body fields', api.bodyFields);
  fields('Response attributes', api.responseAttributes);

  return lines.join('\n');
}

// ── Strip markdown to plain text ───────────────────────────────────────────────

export function toPlain(text) {
  // Code content is KEPT, not stripped. Every concrete value a reader asks the
  // assistant for -- callback URLs, endpoints, CLI commands, config keys --
  // lives inside a code span or fence, so dropping them left the model able to
  // describe a step ("Set the Callback URL to ___") but never to quote it.
  //
  // It is parked behind NUL-delimited placeholders rather than unwrapped in
  // place, so the strippers below cannot chew on it: the HTML-tag rule would
  // otherwise eat `<div>` out of a snippet, and the emphasis rules would eat
  // the `*` out of a glob or a SQL `SELECT *`.
  const code = [];
  const park = (s) => `\u0000${code.push(s) - 1}\u0000`;
  return text
    // MDX component imports are machinery, not prose. They were being indexed
    // verbatim at the top of every page's first chunk.
    .replace(/^[ \t]*(?:import|export)\s[^\n]*\n?/gm, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')           // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')   // links → label
    .replace(/```[^\n`]*\n([\s\S]*?)```/g, (_m, body) => park(body.trim())) // fenced code
    .replace(/`([^`\n]+)`/g, (_m, body) => park(body))                      // inline code
    .replace(/^>+\s?/gm, '')                    // blockquotes
    .replace(/^\s*[-*+]\s+/gm, '')              // bullets
    .replace(/^\s*\d+\.\s+/gm, '')              // numbered lists
    .replace(/\*\*([^*]+)\*\*/g, '$1')          // bold
    .replace(/\*([^*]+)\*/g, '$1')              // italic
    .replace(/#{1,6}\s*/g, '')                  // heading hashes
    .replace(/<[^>]+>/g, '')                    // HTML tags
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\u0000(\d+)\u0000/g, (_m, i) => code[Number(i)])   // restore code
    .trim();
}

// ── Split a page into indexable chunks ────────────────────────────────────────

function makeChunks(title, body) {
  const chunks = [];

  // Split on H2/H3 headings so each section stays together
  const sections = body.split(/(?=^#{2,3} )/m);

  for (const section of sections) {
    const plain = toPlain(section).trim();
    if (plain.length < 50) continue;

    // Prefix every chunk with the page title so the AI always has context
    const withTitle = title ? `${title}\n\n${plain}` : plain;

    if (withTitle.length <= CHUNK_MAX) {
      chunks.push(withTitle);
    } else {
      // Split long sections on blank lines
      const paras = withTitle.split(/\n\n+/);
      let buf = '';
      for (const p of paras) {
        const candidate = buf ? buf + '\n\n' + p : p;
        if (candidate.length > CHUNK_MAX && buf) {
          if (buf.trim().length >= 50) chunks.push(buf.trim());
          // Restart with title prefix for continuity
          buf = title ? `${title}\n\n${p}` : p;
        } else {
          buf = candidate;
        }
      }
      if (buf.trim().length >= 50) chunks.push(buf.trim());
    }
  }

  // Always have at least one chunk (the page title itself)
  return chunks.length ? chunks : (title ? [title] : []);
}

// ── URL from file path ─────────────────────────────────────────────────────────

function fileToUrl(filePath) {
  const rel   = relative(DOCS_DIR, filePath).replace(/\\/g, '/');
  const slug  = rel.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '');
  return `/${slug}/`;
}

// ── Batch embed (OpenAI embeddings via the LiteLLM gateway) ───────────────────

// Embed a batch of texts in one request, with retry on 429.
// `inputType` is kept in the signature because the caller distinguishes
// document vs query embeddings; OpenAI models have no such parameter, so it
// only affects nothing here — the same model embeds both sides.
async function embedBatch(texts, inputType = 'document', attempt = 0) {
  const res = await fetch(`${GATEWAY_URL}/v1/embeddings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GATEWAY_KEY}`,
    },
    body: JSON.stringify({
      input: texts,
      model: EMBED_MODEL,
      dimensions: DIMS,
    }),
  });

  if (res.status === 429) {
    if (attempt >= 6) throw new Error('Gateway rate limit: too many retries. Try again later.');
    const retryAfter = parseInt(res.headers.get('retry-after') || '0') * 1000;
    const waitMs = retryAfter || Math.min(2000 * 2 ** attempt, 60000);
    process.stdout.write(`\n  Rate limited — waiting ${Math.round(waitMs / 1000)}s…\n`);
    await new Promise(r => setTimeout(r, waitMs));
    return embedBatch(texts, inputType, attempt + 1);
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gateway Embedding API ${res.status}: ${body}`);
  }

  const json = await res.json();
  // Sort by index defensively so vectors line up with the input order
  return json.data.sort((a, b) => a.index - b.index).map(d => d.embedding);
}

// ── Resumable checkpoint helpers ────────────────────────────────────────────────
// On the trial tier a full build takes ~90 min, so an interruption (sleep, kill)
// would otherwise throw away all that work — the final files are only written on
// success. We checkpoint completed batches to PARTIAL_BIN (+ a PARTIAL_META
// progress file) after every wave, so a restart resumes where it left off.
// The checkpoint is keyed to a signature of the exact chunk list, so any change
// to the docs/chunking invalidates a stale partial and forces a clean rebuild.

const PARTIAL_BIN  = join(PUBLIC, 'ask-index.partial.bin');
const PARTIAL_META = join(PUBLIC, 'ask-index.partial.json');

function chunkSignature(texts) {
  const h = createHash('sha1');
  for (const t of texts) h.update(t).update('\u0000');
  return `${EMBED_MODEL}:${DIMS}:${BATCH_SIZE}:${texts.length}:${h.digest('hex').slice(0, 16)}`;
}

// Returns the number of completed batches that were loaded into `results`,
// or 0 if there is no usable checkpoint (also resets the partial files then).
function loadCheckpoint(sig, total, results) {
  if (!existsSync(PARTIAL_META) || !existsSync(PARTIAL_BIN)) return 0;
  try {
    const meta = JSON.parse(readFileSync(PARTIAL_META, 'utf-8'));
    const doneBatches = meta.doneBatches | 0;
    // Non-final batches are full size; the final batch may be smaller, so cap at total.
    const doneTexts   = Math.min(doneBatches * BATCH_SIZE, total);
    const expectBytes = doneTexts * DIMS * 4;
    if (meta.sig !== sig || doneBatches <= 0 || statSync(PARTIAL_BIN).size !== expectBytes) {
      return 0;
    }
    const buf  = readFileSync(PARTIAL_BIN);
    const vecs = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
    for (let i = 0; i < doneTexts && i < total; i++) {
      results[i] = Array.from(vecs.subarray(i * DIMS, i * DIMS + DIMS));
    }
    return doneBatches;
  } catch {
    return 0;
  }
}

function resetCheckpoint(sig, total) {
  writeFileSync(PARTIAL_BIN, Buffer.alloc(0));
  writeFileSync(PARTIAL_META, JSON.stringify({ sig, total, batchSize: BATCH_SIZE, doneBatches: 0 }));
}

function appendCheckpoint(sig, total, doneBatches, newVecs) {
  // newVecs: array of embeddings (each a DIMS-length array), in index order
  const f32 = new Float32Array(newVecs.length * DIMS);
  for (let i = 0; i < newVecs.length; i++) f32.set(newVecs[i], i * DIMS);
  appendFileSync(PARTIAL_BIN, Buffer.from(f32.buffer, f32.byteOffset, f32.byteLength));
  writeFileSync(PARTIAL_META, JSON.stringify({ sig, total, batchSize: BATCH_SIZE, doneBatches }));
}

function clearCheckpoint() {
  for (const f of [PARTIAL_BIN, PARTIAL_META]) {
    try { if (existsSync(f)) unlinkSync(f); } catch { /* ignore */ }
  }
}

// Split into batches, run CONCURRENCY batches in parallel at a time
async function embedAll(texts, inputType = 'document') {
  const batches = [];
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    batches.push(texts.slice(i, i + BATCH_SIZE));
  }
  const waves = Math.ceil(batches.length / CONCURRENCY);
  const etaMin = REQ_MIN_MS ? Math.ceil((waves * REQ_MIN_MS) / 60000) : null;
  console.log(
    `  ${texts.length} texts across ${batches.length} batches of ≤${BATCH_SIZE}` +
    (etaMin ? ` — throttled, ~${etaMin} min` : '')
  );

  const results = new Array(texts.length);
  const sig = chunkSignature(texts);

  // Resume from a matching checkpoint, or start fresh.
  let startBatch = loadCheckpoint(sig, texts.length, results);
  if (startBatch > 0) {
    console.log(`  Resuming from checkpoint: ${startBatch}/${batches.length} batches already embedded.`);
  } else {
    resetCheckpoint(sig, texts.length);
  }

  let done = startBatch * BATCH_SIZE;
  let lastStart = 0;

  for (let i = startBatch; i < batches.length; i += CONCURRENCY) {
    // Pace request starts to respect the rate limit (no-op when REQ_MIN_MS = 0)
    if (REQ_MIN_MS && lastStart) {
      const wait = REQ_MIN_MS - (Date.now() - lastStart);
      if (wait > 0) await new Promise(r => setTimeout(r, wait));
    }
    lastStart = Date.now();

    const wave = batches.slice(i, i + CONCURRENCY);
    const waveVecs = await Promise.all(wave.map(b => embedBatch(b, inputType)));

    const flat = [];
    waveVecs.forEach((vecs, w) => {
      const offset = (i + w) * BATCH_SIZE;
      for (let j = 0; j < vecs.length; j++) results[offset + j] = vecs[j];
      flat.push(...vecs);
    });

    // Checkpoint this wave's batches so an interruption resumes from here.
    appendCheckpoint(sig, texts.length, i + wave.length, flat);

    done += wave.reduce((n, b) => n + b.length, 0);
    process.stdout.write(`  Embedded ${done}/${texts.length}…\r`);
  }
  return results;
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  // --meta-only just rewrites meta.json from local docs; no embedding, no key needed.
  if ((!GATEWAY_KEY || !GATEWAY_URL) && !process.argv.includes('--meta-only')) {
    console.error('Error: ANTHROPIC_API_KEY / ANTHROPIC_BASE_URL are not set.');
    console.error('They carry the LiteLLM gateway key and host. Run:');
    console.error('  node --env-file=.env scripts/build-ask-index.mjs');
    process.exit(1);
  }

  console.log('Scanning docs...');
  const files = walkDocs(DOCS_DIR);
  console.log(`Found ${files.length} files.`);

  const allChunks = [];

  for (const file of files) {
    const raw     = readFileSync(file, 'utf-8');
    const { title, description, body, data } = parseFrontmatter(raw);
    if (data.draft === true) continue;   // drafts are excluded from the site too
    const url     = fileToUrl(file);
    if (url === '/home/') continue;     // docs landing page: links only, nothing to answer from
    // The two products are separate folders under content/docs, so the URL
    // is the product. api/ask.ts re-derives this rather than trusting the
    // field (see productOf there) -- the field is only as fresh as the last
    // re-embed, and a stale one would silently empty a product's pool.
    const product = url.startsWith('/arcus/') ? 'arcus' : 'suite';
    // Fold the frontmatter description and any `api:` block into the indexable
    // content. API reference pages have an empty body, so the api block is the
    // only thing that makes them findable by endpoint, params, or fields.
    const content = [description, apiToText(data.api), body]
      .filter(Boolean)
      .join('\n\n');
    if (!content.trim()) continue;   // title-only stubs would pollute retrieval
    const chunks  = makeChunks(title, content);

    for (const text of chunks) {
      allChunks.push({ url, title, product, text });
    }
  }

  // Supplementary context (product knowledge that is not a doc page):
  // src/data/ask-context/*.md. Chunks carry url: '' so they inform answers
  // but are never cited as sources. Optional frontmatter `product:` scopes a
  // file to one product; the default 'all' matches both at retrieval time.
  // `--no-context` builds from doc pages alone, for judging how much the
  // curated files are helping or hurting retrieval. The two indexes are not
  // interchangeable at runtime, so note which one is on disk.
  const CONTEXT_DIR = join(ROOT, 'src', 'data', 'ask-context');
  const skipContext = process.argv.includes('--no-context');
  if (skipContext) console.log('  --no-context: skipping src/data/ask-context/');
  if (!skipContext && existsSync(CONTEXT_DIR)) {
    for (const name of readdirSync(CONTEXT_DIR)) {
      if (!/\.(md|mdx)$/.test(name)) continue;
      const raw = readFileSync(join(CONTEXT_DIR, name), 'utf-8');
      const { title, description, body, data } = parseFrontmatter(raw);
      // `indexed: false` keeps a file in the folder as a human reference
      // without embedding it. Used where a curated file outranks the real doc
      // pages and its errors therefore become systemic.
      //
      // Read from the RAW frontmatter, not the parsed object: these files are
      // hand-maintained and their YAML has broken before (an unquoted value
      // containing `[...]` throws, and parseFrontmatter then falls back to a
      // title-only parse that silently drops every other field). An exclusion
      // that fails open would re-embed the file without anyone noticing.
      if (/^indexed:\s*false\s*$/m.test(raw.split(/^---$/m)[1] ?? '') || data.indexed === false) {
        console.log(`  skipping ${name} (indexed: false)`);
        continue;
      }
      const t = title || name.replace(/\.(md|mdx)$/, '');
      const content = [description, body].filter(Boolean).join('\n\n');
      if (!content.trim()) continue;
      for (const text of makeChunks(t, content)) {
        allChunks.push({ url: '', title: t, product: data.product || 'all', text });
      }
    }
  }

  console.log(`Total chunks: ${allChunks.length}`);

  // ── Write metadata JSON ───────────────────────────────────────────────────
  // `text` is the full chunk — api/ask.ts feeds it to the LLM as context.
  // `excerpt` is a short preview kept for any display use.
  const writeMeta = () => {
    const meta = allChunks.map(({ url, title, product, text }) => ({
      url,
      title,
      product,
      text,
      excerpt: text.slice(0, 220).replace(/\n+/g, ' ').trim(),
    }));
    writeFileSync(join(PUBLIC, 'ask-index.meta.json'), JSON.stringify(meta));
  };

  // --meta-only: rewrite meta.json from the (deterministic) chunks WITHOUT
  // re-embedding. Safe only while the chunk count still matches the vector
  // file — otherwise vectors and metadata would be misaligned.
  if (process.argv.includes('--meta-only')) {
    const vecCount = statSync(join(PUBLIC, 'ask-index.bin')).size / 4 / DIMS;
    if (vecCount !== allChunks.length) {
      throw new Error(
        `Chunk count (${allChunks.length}) != index vectors (${vecCount}). ` +
        `Docs changed — run a full rebuild, not --meta-only.`
      );
    }
    writeMeta();
    console.log(`meta.json regenerated from ${allChunks.length} chunks (no embedding).`);
    return;
  }

  console.log('Embedding…');
  const texts      = allChunks.map(c => c.text);
  const embeddings = await embedAll(texts);
  console.log('');

  // ── Write binary vector file ──────────────────────────────────────────────
  const buffer = new Float32Array(embeddings.length * DIMS);
  for (let i = 0; i < embeddings.length; i++) {
    buffer.set(embeddings[i], i * DIMS);
  }
  writeFileSync(join(PUBLIC, 'ask-index.bin'), Buffer.from(buffer.buffer));

  writeMeta();
  clearCheckpoint();   // build succeeded — discard the resumable partial files

  const mb = (buffer.byteLength / 1024 / 1024).toFixed(1);
  console.log(`\nDone!`);
  console.log(`  Chunks : ${allChunks.length}`);
  console.log(`  Index  : ${mb} MB  →  public/ask-index.bin`);
  console.log(`  Meta   : public/ask-index.meta.json`);
}

// Exported so the chunking logic can be imported/tested; only run main when
// this file is invoked directly (not when imported).
export { parseFrontmatter, apiToText, makeChunks };

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(err => {
    console.error('\nFailed:', err.message);
    process.exit(1);
  });
}
