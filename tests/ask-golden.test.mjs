/**
 * Golden-question regression tests for Ask Assistant retrieval.
 *
 * Every question here is one that FAILED in real use; each assertion encodes
 * what the fix guaranteed. Run after any index rebuild or retrieval change —
 * a rebuild re-embeds everything, and nothing else would tell us a fixed
 * question silently regressed.
 *
 * Retrieval only: no Claude calls, so it is fast and cheap. It hits the Voyage
 * embed + rerank APIs, hence the skip when the gateway env vars are absent (CI
 * without secrets, other contributors) rather than a hard failure.
 *
 *   node --env-file=.env --test tests/ask-golden.test.mjs
 */
import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DIMS = 1024;
const PUBLIC = join(import.meta.dirname, '..', 'public');
const hasKey = !!process.env.ANTHROPIC_API_KEY && !!process.env.ANTHROPIC_BASE_URL;
const hasIndex = existsSync(join(PUBLIC, 'ask-index.bin'));

/** Cases: question → what retrieval must (and must not) surface. */
const GOLDEN = [
  {
    name: 'test case creation lists the authoring routes',
    question: 'test case creation in testsigma',
    // Was asserting "routes to create a test case", a phrase only
    // product-context.md §27 carried — the same section that made the
    // assistant call Atto a way to add steps to an existing test case. That
    // file is no longer indexed (indexed: false), so this now asserts against
    // the doc page that actually owns the topic.
    mustMatchUrl: [/\/create-and-manage\/create-test-cases\//],
    // The API endpoint page used to win this outright.
    mustNotBeFirst: [/\/api\/test-cases\/create-test-case\//],
  },
  {
    name: 'CI trigger finds the CI/CD pages',
    question: 'How do I trigger a test plan from a CI pipeline?',
    mustMatchUrl: [/integrations\/ci-cd\/|api\/test-plans\//],
  },
  {
    name: 'feature questions do not retrieve the changelog',
    question: 'How does auto healing work?',
    mustNotMatchUrl: [/changelog/],
  },
  {
    name: 'element not found surfaces the support answer',
    question: 'element not found during execution but visible in the app',
    mustMatch: [/locator \(XPath\) no longer matches|Element Not Found/i],
  },
  {
    name: 'incognito recording surfaces the extension permission answer',
    question: 'cannot record in incognito',
    mustMatch: [/Allow in Incognito/i],
  },
  {
    name: 'XPath loop variable syntax is retrievable',
    question: 'why does testsigma overwrite my xpath in a loop',
    mustMatch: [/\$\|i\||pipeline operator/i],
  },
];

let mod, vectors, meta;

before(async () => {
  if (!hasKey || !hasIndex) return;
  mod = await import('../api/ask.ts');
  const bin = readFileSync(join(PUBLIC, 'ask-index.bin'));
  vectors = new Float32Array(bin.buffer, bin.byteOffset, bin.byteLength / 4);
  meta = JSON.parse(readFileSync(join(PUBLIC, 'ask-index.meta.json'), 'utf-8'));
  assert.equal(vectors.length / DIMS, meta.length, 'index vectors and metadata must align');
});

describe('Ask Assistant golden questions', {
  // Serial, not parallel: rerank still runs on Voyage's trial tier (3 RPM),
  // where a parallel run just collects 429s. Each case retries with backoff.
  concurrency: 1,
  skip: !hasKey || !hasIndex ? 'needs gateway env vars and a built index' : false,
}, () => {
  for (const g of GOLDEN) {
    test(g.name, { timeout: 180_000 }, async () => {
      const embed = await embedQuestion(g.question);
      const candidates = mod.retrieveCandidates(embed, vectors, meta);
      assert.ok(candidates.length > 0, 'candidate pool must not be empty');
      const hits = await mod.rerank(g.question, candidates);
      assert.ok(hits.length > 0, 'reranked hits must not be empty');

      const texts = hits.map((h) => h.text);
      const urls = hits.map((h) => h.url);
      const blob = texts.join('\n');

      for (const re of g.mustMatch ?? [])
        assert.match(blob, re, `no hit matched ${re}\nhits:\n${urls.join('\n')}`);
      for (const re of g.mustMatchUrl ?? [])
        assert.ok(urls.some((u) => re.test(u)), `no hit URL matched ${re}\nhits:\n${urls.join('\n')}`);
      for (const re of g.mustNotMatchUrl ?? [])
        assert.ok(!urls.some((u) => re.test(u)), `a hit URL matched forbidden ${re}\nhits:\n${urls.join('\n')}`);
      for (const re of g.mustNotBeFirst ?? [])
        assert.ok(!re.test(urls[0] ?? ''), `forbidden top hit ${re}: ${urls[0]}`);
    });
  }
});

/** Min gap between embed requests. The gateway has no trial-tier throttle, so
 *  this is 0 by default; raise it if the gateway ever rate-limits. */
const RATE_LIMIT_MS = Number(process.env.EMBED_REQ_MIN_MS ?? 0);
let lastCall = 0;

/** Embed a question through the SAME model the index was built with. Using a
 *  different model here silently scores noise, so this must track
 *  EMBED_MODEL in build-ask-index.mjs and api/ask.ts. */
async function embedQuestion(text, attempt = 0) {
  const wait = RATE_LIMIT_MS - (Date.now() - lastCall);
  if (lastCall && wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastCall = Date.now();

  const res = await fetch(`${process.env.ANTHROPIC_BASE_URL}/v1/embeddings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ANTHROPIC_API_KEY}`,
    },
    body: JSON.stringify({
      input: [text],
      model: 'text-embedding-3-small-openai',
      dimensions: DIMS,
    }),
  });
  if ((res.status === 429 || res.status >= 500) && attempt < 4) {
    await new Promise((r) => setTimeout(r, 2_000 * (attempt + 1)));
    return embedQuestion(text, attempt + 1);
  }
  if (!res.ok) throw new Error(`Embed ${res.status}: ${await res.text()}`);
  return (await res.json()).data[0].embedding;
}
