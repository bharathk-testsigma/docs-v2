/**
 * Ask Assistant — serverless answer engine.
 *
 * Flow: embed question (Voyage AI) → retrieve top chunks → stream answer (Claude) → send sources.
 * Streams back Server-Sent Events (SSE):
 *   event: status  — progress messages while thinking
 *   event: delta   — streamed answer text chunks
 *   event: sources — array of { url, title } after answer is complete
 *   event: done    — end of stream
 *   event: error   — something went wrong
 *
 * Platform notes
 * ──────────────
 * Written for Vercel Node.js runtime (export default handler).
 * For Netlify: move to netlify/functions/ask.ts, change the export to:
 *   export const handler = async (event: HandlerEvent) => { ... }
 *   and adapt req/res to use event.body / return { statusCode, body }.
 * For local dev: run `node scripts/dev-server.mjs` (see README).
 *
 * Required env vars
 * ─────────────────
 *   ANTHROPIC_API_KEY — from console.anthropic.com
 *   VOYAGE_API_KEY    — from dashboard.voyageai.com
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { join } from 'path';

// ── Types ──────────────────────────────────────────────────────────────────────

interface ChunkMeta {
  url: string;
  title: string;
  product: string;
  text: string;       // full chunk — used to build the LLM context
  excerpt: string;    // short preview — kept for display use
}

// ── Index (loaded once per cold start, then cached) ───────────────────────────

const DIMS = 1024;   // must match DIMS in build-ask-index.mjs
let _vectors: Float32Array | null = null;
let _meta: ChunkMeta[] | null = null;

function loadIndex() {
  if (_vectors && _meta) return { vectors: _vectors, meta: _meta };
  // Vercel includes these files via vercel.json "includeFiles".
  // For local dev, process.cwd() is the project root.
  const dir = join(process.cwd(), 'public');
  const bin = readFileSync(join(dir, 'ask-index.bin'));
  _vectors = new Float32Array(bin.buffer, bin.byteOffset, bin.byteLength / 4);
  _meta = JSON.parse(readFileSync(join(dir, 'ask-index.meta.json'), 'utf-8'));
  return { vectors: _vectors, meta: _meta };
}

// ── Cosine similarity ─────────────────────────────────────────────────────────

function cosine(q: Float32Array, offset: number, vecs: Float32Array): number {
  let dot = 0, qa = 0, va = 0;
  for (let i = 0; i < DIMS; i++) {
    dot += q[i] * vecs[offset + i];
    qa  += q[i] * q[i];
    va  += vecs[offset + i] * vecs[offset + i];
  }
  return dot / (Math.sqrt(qa) * Math.sqrt(va) + 1e-10);
}

// ── Retrieval: two stages ──────────────────────────────────────────────────────
// Stage 1 (cheap, local): cosine over all vectors → a WIDE candidate pool.
// Stage 2 (one API call): Voyage's reranker orders the pool against the actual
// question and the top slice becomes the excerpts. The reranker reads the full
// chunk text, so it handles what cosine similarity can't: vocabulary gaps
// ("author" vs "create"), title bias (API pages named after the action), and
// telling siblings apart. Earlier hand-tuned penalties were deleted for it.

const CANDIDATES = 50;   // pool size sent to the reranker
const TOP_K      = 8;    // excerpts handed to Claude

/** Stage 1: cosine top-N, product-filtered, with light family diversity. */
export function retrieveCandidates(
  q: number[],
  vecs: Float32Array,
  meta: ChunkMeta[],
  product?: string,
  n = CANDIDATES,
): (ChunkMeta & { score: number })[] {
  const qf = new Float32Array(q);
  const total = vecs.length / DIMS;

  // The site duplicates platform pages per app (web/mobile/salesforce/... each
  // have "Test suites", "Author tests", ...). Cap candidates per page FAMILY
  // (same leaf slug) so near-identical siblings can't fill the pool before the
  // reranker ever sees a different page. The reranker gets 4 of each at most.
  const FAMILY_CAP = 4;
  const familyOf = (url: string) => url.split('/').filter(Boolean).pop() ?? url;

  const scores: [number, number][] = [];
  for (let i = 0; i < total; i++) scores.push([cosine(qf, i * DIMS, vecs), i]);
  scores.sort((a, b) => b[0] - a[0]);

  const seen = new Set<string>();
  const familyCount = new Map<string, number>();
  const results: (ChunkMeta & { score: number })[] = [];

  const addHit = (score: number, i: number) => {
    const m = meta[i];
    // Dedupe by page URL; supplementary context chunks have no URL, so each
    // one keys on its own index instead of all collapsing into one hit.
    const key = m.url || `ctx:${i}`;
    if (seen.has(key)) return;
    if (m.url) {
      const fam = familyOf(m.url);
      const count = familyCount.get(fam) ?? 0;
      if (count >= FAMILY_CAP) return;
      familyCount.set(fam, count + 1);
    }
    seen.add(key);
    results.push({ ...m, score });
  };

  // Pass 1: product-filtered ('all' = supplementary context, matches both)
  if (product) {
    for (const [s, i] of scores) {
      if (meta[i].product === product || meta[i].product === 'all') addHit(s, i);
      if (results.length >= n) break;
    }
  }
  // Pass 2: top-up with any product if we don't have enough
  if (results.length < n / 2) {
    for (const [s, i] of scores) {
      addHit(s, i);
      if (results.length >= n) break;
    }
  }

  return results.slice(0, n);
}

const RERANK_MODEL = 'rerank-2.5-lite';

/** Stage 2: rerank candidates against the question; falls back to cosine
 *  order if the rerank call fails, so a Voyage hiccup degrades, not breaks. */
export async function rerank(
  question: string,
  candidates: (ChunkMeta & { score: number })[],
  k = TOP_K,
): Promise<(ChunkMeta & { score: number })[]> {
  try {
    const res = await fetch('https://api.voyageai.com/v1/rerank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`,
      },
      body: JSON.stringify({
        query: question,
        documents: candidates.map(c => c.text),
        model: RERANK_MODEL,
        top_k: k,
        return_documents: false,
      }),
    });
    if (!res.ok) throw new Error(`rerank ${res.status}`);
    const json = await res.json();
    return json.data.map((r: { index: number; relevance_score: number }) => ({
      ...candidates[r.index],
      score: r.relevance_score,
    }));
  } catch (err) {
    console.warn('[ask] rerank failed, falling back to cosine order:', (err as Error)?.message);
    return candidates.slice(0, k);
  }
}

// ── Voyage AI question embedding ─────────────────────────────────────────────

const VOYAGE_MODEL = 'voyage-3.5';
const EMBED_DIMS   = 1024;   // must match DIMS in build-ask-index.mjs

/**
 * Embed the question. Retries on 429/5xx: without this, one rate-limited or
 * blipped request means the reader just sees "the assistant is unavailable".
 * Kept short (2 retries, ~1s then ~2s) because a reader is waiting — the goal
 * is surviving a transient blip, not outlasting a real outage.
 */
async function embedQuestion(text: string, attempt = 0): Promise<number[]> {
  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      input: [text],
      model: VOYAGE_MODEL,
      input_type: 'query',          // optimizes the embedding for retrieval queries
      output_dimension: EMBED_DIMS,
    }),
  });

  if ((res.status === 429 || res.status >= 500) && attempt < 2) {
    const retryAfter = Number(res.headers.get('retry-after')) * 1000;
    await new Promise(r => setTimeout(r, retryAfter || 1000 * 2 ** attempt));
    return embedQuestion(text, attempt + 1);
  }

  if (!res.ok) {
    const detail = await res.text();
    console.warn(`[ask] Voyage embedding ${res.status}: ${detail.slice(0, 200)}`);
    // The reader gets a plain sentence; the provider's billing/rate-limit prose
    // is for the logs, not the drawer.
    throw new Error(
      res.status === 429
        ? 'The assistant is busy right now. Please try again in a moment.'
        : 'The assistant could not reach its search service. Please try again.'
    );
  }
  const json = await res.json();
  return json.data[0].embedding;
}

// ── Anthropic client ───────────────────────────────────────────────────────────

const anthropic = new Anthropic();   // reads ANTHROPIC_API_KEY from env

// ── Main handler ──────────────────────────────────────────────────────────────

export default async function handler(req: any, res: any) {
  // CORS — allow requests from the docs site on any domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST')   { res.status(405).json({ error: 'Method not allowed' }); return; }

  // Parse request body (Vercel auto-parses JSON; raw Node.js needs manual read)
  let body: {
    question?: string;
    product?: string;
    history?: { role: 'user' | 'assistant'; content: string }[];
  } = {};
  try {
    if (req.body && typeof req.body === 'object') {
      body = req.body;
    } else {
      const raw = typeof req.body === 'string' ? req.body : await readBodyText(req);
      body = JSON.parse(raw || '{}');
    }
  } catch { /* leave body empty, caught below */ }

  const { question, product } = body;
  if (!question?.trim()) {
    res.status(400).json({ error: 'question is required' });
    return;
  }

  // Prior turns of this conversation, so follow-ups ("and the second step?",
  // "what about iOS?") resolve. Bounded: last 6 messages, 4k chars each —
  // enough for context, small enough that a long thread can't blow the prompt.
  const history = (Array.isArray(body.history) ? body.history : [])
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-6)
    .map(m => ({ role: m.role, content: m.content.slice(0, 4000) }));

  // SSE response headers
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');   // disable nginx/proxy buffering
  if (typeof res.flushHeaders === 'function') res.flushHeaders();

  const send = (event: string, data: unknown) =>
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

  try {
    send('status', { text: 'Finding relevant docs…' });

    // 1. Embed the question. On a follow-up, prepend the previous question so a
    // fragment like "and for iOS?" still retrieves against the real topic.
    const prevQuestion = [...history].reverse().find(m => m.role === 'user')?.content ?? '';
    const searchText = history.length && question.trim().length < 60
      ? `${prevQuestion}\n${question.trim()}`
      : question.trim();
    const queryVec = await embedQuestion(searchText);

    // 2. Two-stage retrieval: wide cosine pool → reranked top slice.
    const { vectors, meta } = loadIndex();
    const candidates = retrieveCandidates(queryVec, vectors, meta, product?.trim());
    send('status', { text: 'Ranking sources…' });
    const hits = await rerank(searchText, candidates);

    send('status', { text: 'Writing answer…' });

    // 3. Build context string from top hits (title + URL + text).
    // Supplementary context chunks have no URL — title only, so the model
    // can't cite a link that doesn't exist.
    const context = hits
      .map((h, i) => `[${i + 1}] ${h.title}${h.url ? ` — ${h.url}` : ''}\n${h.text}`)
      .join('\n\n---\n\n');

    // 4. Stream answer from Claude
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-5',
      // 2048, not 1024: multi-part answers ("all the ways to create a test
      // case") were being cut off mid-list at the old cap.
      max_tokens: 2048,
      system: `You are a documentation assistant for Testsigma. Answer the user's question using ONLY the numbered excerpts below.

Be concise and lead with the answer — no preamble ("Sure", "I'll show you…") and no restating the question. Give only what's needed; do not dump whole pages.

Answer the question that was asked, at the scope it was asked:
- A question about ALL the ways / options / types of something must enumerate every one the excerpts support — never describe one route as if it were the only one.
- A "how do I X" question gets the UI steps by default. Cover the REST API only when the question mentions the API, or as a brief final note.
- If the excerpts cover the topic for only one application type (Web, Mobile, Salesforce, Windows) but the question was general, answer generally and note where a type differs.

Format the answer in clean GitHub-flavored Markdown:
- Put EVERY command, code snippet, or config in a fenced code block with a language tag (e.g. \`\`\`bash, \`\`\`powershell, \`\`\`json, \`\`\`yaml). Never place multi-line commands or code in prose.
- Use inline \`backticks\` for short commands, flags, file names, env vars, values, and exact UI labels.
- Use **bold** for key UI elements; use numbered steps for procedures and bullets for option lists.
- When a page is worth opening, link it inline as [Page title](url) using the excerpt's URL.
- Cite the supporting excerpt with [N] inline.
- If the excerpts don't contain enough information, say so honestly — do not guess.

Product rules:
- These docs cover Testsigma Suite, the test automation product.
- Quote UI labels (buttons, tabs, menus, fields) exactly as written in the excerpts — never invent or paraphrase a label the excerpts don't show.
- For anything marked Beta or In-Progress in the excerpts, add a one-line note that the behavior may have changed since the docs were verified.

Documentation excerpts:
${context}`,
      // Prior turns first, so follow-ups have their antecedent. The excerpts in
      // the system prompt are always re-retrieved for the LATEST question.
      messages: [...history, { role: 'user' as const, content: question.trim() }],
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        send('delta', { text: event.delta.text });
      }
    }

    // 5. Send source links (supplementary context has no page to link to)
    send('sources', hits.filter(h => h.url).map(h => ({ url: h.url, title: h.title })));
    send('done', {});

  } catch (err: any) {
    send('error', { message: err?.message ?? 'Something went wrong. Please try again.' });
  } finally {
    res.end();
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function readBodyText(req: any): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: Buffer) => (data += chunk.toString()));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}
