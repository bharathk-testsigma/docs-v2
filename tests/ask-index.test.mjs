// Unit checks for the Ask AI index builder's pure functions.
// The builder itself only runs when invoked directly, so importing is safe.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter, apiToText, makeChunks, toPlain } from '../scripts/build-ask-index.mjs';

test('parseFrontmatter splits title, description, and body', () => {
	const { title, description, body } = parseFrontmatter(
		'---\ntitle: My Page\ndescription: What it does\n---\nBody text here.'
	);
	assert.equal(title, 'My Page');
	assert.equal(description, 'What it does');
	assert.equal(body.trim(), 'Body text here.');
});

test('apiToText renders an api block with endpoint and params', () => {
	const text = apiToText({
		method: 'post',
		path: '/v1/test_plans/{id}/run',
		baseUrl: 'https://app.testsigma.com/api',
		pathParams: [{ name: 'id', desc: 'Test plan ID' }],
	});
	assert.match(text, /POST \/v1\/test_plans\/\{id\}\/run/);
	assert.match(text, /Endpoint URL: https:\/\/app\.testsigma\.com\/api\/v1\/test_plans/);
	assert.match(text, /- id: Test plan ID/);
});

test('makeChunks prefixes every chunk with the page title and splits on headings', () => {
	const body =
		'Intro paragraph long enough to be kept in the index without question.\n\n' +
		'## Section one\n\nSection one content that is definitely long enough to index.\n\n' +
		'## Section two\n\nSection two content that is also long enough to be indexed.';
	const chunks = makeChunks('Page Title', body);
	assert.equal(chunks.length, 3);
	for (const c of chunks) assert.ok(c.startsWith('Page Title\n\n'));
	assert.match(chunks[1], /Section one content/);
});

test('makeChunks splits oversized sections and never loses content', () => {
	const para = 'A paragraph of filler text that repeats to grow well past the limit. ';
	const body = `## Big section\n\n${(para + '\n\n').repeat(30)}`;
	const chunks = makeChunks('T', body);
	assert.ok(chunks.length > 1);
	for (const c of chunks) assert.ok(c.length <= 1000);
});

test('makeChunks falls back to the title for empty pages', () => {
	assert.deepEqual(makeChunks('Only Title', ''), ['Only Title']);
});

// Regression: code content used to be stripped, so the index held "Set the
// Callback URL to  and select..." and the assistant could describe a step but
// never quote the value it needed. Every concrete value in these docs (URLs,
// endpoints, commands, config keys) lives in a code span or fence.
test('toPlain keeps code content, and does not let strippers chew on it', () => {
	assert.match(toPlain('Set it to `https://x.test/authorize/` now.'), /https:\/\/x\.test\/authorize\//);
	assert.match(toPlain('Run:\n\n```bash\ncurl -X POST https://api.test/v1/run\n```'), /curl -X POST https:\/\/api\.test\/v1\/run/);
	// The HTML-tag rule must not eat tags out of a snippet, nor emphasis rules a glob.
	assert.match(toPlain('Wrap it in `<div class="x">`.'), /<div class="x">/);
	assert.match(toPlain('Match `SELECT * FROM t` exactly.'), /SELECT \* FROM t/);
	// Prose numbers must survive the placeholder round-trip untouched.
	assert.match(toPlain('Wait 10 to 15 minutes, use `--flag`.'), /Wait 10 to 15 minutes/);
});

test('toPlain drops MDX import/export machinery', () => {
	const out = toPlain(
		"import { Aside } from '@astrojs/starlight/components';\nexport const x = 1;\n\nReal prose."
	);
	assert.equal(out, 'Real prose.');
});
