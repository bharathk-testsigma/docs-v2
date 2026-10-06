/**
 * API reference smoke test. Run `npm run build` first, then `npm test`.
 *
 * The request samples on every endpoint page are GENERATED from the `api:`
 * frontmatter by ApiMarkdownContent.astro, so nothing in the repo states the
 * expected cURL/JS/Python output -- if the generator or the wiring breaks
 * (schema, MarkdownContent override, PageTitle suppression), the pages still
 * build and just render wrongly. This walks the built HTML and asserts each
 * page actually shows the method, URL, and samples its frontmatter declares.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { withDocsBase } from '../src/lib/site-config.mjs';
import {
	SUITE_REGIONS,
	CANONICAL_HOSTS,
	DEFAULT_HOSTS,
	regionsForHost,
} from '../src/data/regions.ts';

const SECTIONS = [
	// 55 endpoints + the overview: the legacy-documented set (the generated
	// rest were deleted 2026-08-11; see sidebar-suite-api.mjs).
	{ product: 'suite', content: 'api/', dist: 'v2/api/', pages: 56, endpoints: 55 },
];
const srcDir = (rel) => new URL(`../src/content/docs/${rel}`, import.meta.url).pathname;
const distDir = (rel) => new URL(`../dist/${rel}`, import.meta.url).pathname;

/** Every page source under a directory, recursively. */
function walk(dir) {
	return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
		e.isDirectory() ? walk(join(dir, e.name)) : /\.mdx?$/.test(e.name) ? [join(dir, e.name)] : []
	);
}

// Only the handful of scalars the samples are built from -- a real YAML parse
// would be a dependency to assert three regexes' worth of values.
const scalar = (src, key, fallback) =>
	src.match(new RegExp(`^\\s{2}${key}:\\s*(.+)$`, 'm'))?.[1].trim() ?? fallback;

/** Escape a literal for use inside a RegExp (paths carry `{id}` and `.`). */
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const collect = (section) => {
	const content = srcDir(section.content);
	return walk(content).map((file) => {
		const src = readFileSync(file, 'utf8');
		return {
			slug: relative(content, file).replace(/\.mdx?$/, ''),
			method: src.match(/^\s{2}method:\s*(\w+)$/m)?.[1],
			path: scalar(src, 'path'),
			baseUrl: scalar(src, 'baseUrl', 'https://app.testsigma.com/api/v1'),
			isForm: /^\s{2}formData:/m.test(src),
			html: () => readFileSync(join(distDir(section.dist), relative(content, file).replace(/\.mdx?$/, ''), 'index.html'), 'utf8'),
			product: section.product,
		};
	});
};

const bySection = SECTIONS.map((section) => ({ section, pages: collect(section) }));
const endpoints = bySection.flatMap(({ pages }) => pages.filter((p) => p.method));

test('the content set is intact', () => {
	for (const { section, pages } of bySection) {
		assert.ok(existsSync(distDir(section.dist)), `dist/${section.dist} missing -- run \`npm run build\` first`);
		assert.equal(pages.length, section.pages, `${section.product}: unexpected page count`);
		assert.equal(pages.filter((p) => p.method).length, section.endpoints, `${section.product}: unexpected endpoint count`);
	}
});

test('every endpoint page renders the samples its frontmatter declares', () => {
	for (const { slug, method, path, baseUrl, isForm, html, product } of endpoints) {
		const h = html();
		const url = baseUrl + path;

		assert.match(h, /class="ts-api-page/, `${product}/${slug}: not rendered as an API page`);
		assert.equal(
			(h.match(/<h1/g) ?? []).length,
			1,
			`${product}/${slug}: expected exactly one h1 (PageTitle must sit these pages out)`
		);
		assert.ok(h.includes(`curl -X ${method}`), `${product}/${slug}: cURL sample missing ${method}`);
		// The host is wrapped in a [data-ts-host] span so the region picker can
		// rewrite it, so the URL is no longer one flat string. Assert the span sits
		// directly against the rest of the URL -- that proves the URL is intact AND
		// that the picker can reach its host.
		const { host, pathname } = new URL(baseUrl);
		assert.match(
			h,
			new RegExp(`<span data-ts-host[^>]*>${esc(host)}</span>${esc(pathname + path)}`),
			`${product}/${slug}: samples do not contain ${url} (host-wrapped)`
		);
		assert.ok(h.includes(`requests.${method.toLowerCase()}(`), `${product}/${slug}: Python sample missing`);
		assert.ok(h.includes(`method: &#39;${method}&#39;`), `${product}/${slug}: JavaScript sample missing`);

		// File uploads must use form fields, never a JSON body.
		if (isForm) {
			assert.ok(h.includes('-F &#39;'), `${product}/${slug}: form-data page has no curl -F field`);
			assert.ok(h.includes('new FormData()'), `${product}/${slug}: form-data page has no FormData()`);
		}
	}
});

test("each product's overview page still renders as ordinary markdown", () => {
	for (const { section, pages } of bySection) {
		const overview = pages.find((p) => p.slug === 'overview');
		assert.ok(overview, `${section.product}: no overview page`);
		assert.match(overview.html(), /class="sl-markdown-content/);
		assert.doesNotMatch(overview.html(), /class="ts-api-page/);
	}
});

test('an endpoint page links to its OWN product for authentication', () => {
	for (const { slug, html, product } of endpoints) {
		// Base-prefixed like every other in-site link: the site is served from a
		// sub-path, so asserting the bare path would only pass if base were dropped.
		const expected = withDocsBase('/api/overview/#authentication');
		assert.ok(
			html().includes(`href="${expected}"`),
			`${product}/${slug}: auth link should point at ${expected}`
		);
	}
});

test('an endpoint page gets the API-only nav', () => {
	for (const { slug, html, product } of endpoints) {
		assert.match(html(), /data-api-nav="true"/, `${product}/${slug}: missing the API-only nav`);
	}
});

/**
 * Regional hosts. The picker can only rewrite a host it recognises, so a page
 * authored with an unknown or already-regional host would render a base URL and
 * samples that silently ignore the reader's region. src/data/regions.ts is the
 * only place a host may be declared.
 */
test('every endpoint page is authored with a canonical host, never a regional one', () => {
	const bad = [];
	for (const { slug, product, baseUrl } of endpoints) {
		const host = new URL(baseUrl).host;
		if (!DEFAULT_HOSTS.includes(host)) {
			bad.push(`${product}/${slug}: baseUrl host "${host}" is not a canonical host`);
		}
	}
	assert.deepEqual(bad, []);
});

test('the host in a rendered sample is swappable by the region picker', () => {
	for (const { slug, html, product, baseUrl } of endpoints) {
		const host = new URL(baseUrl).host;
		const doc = html();
		// The host must appear wrapped, never as bare text the picker cannot reach.
		assert.match(
			doc,
			new RegExp(`<span data-ts-host[^>]*>${esc(host)}</span>`),
			`${product}/${slug}: host is not wrapped in a [data-ts-host] span`
		);
		// A picker is offered only where the family has more than one region.
		// Match the ELEMENT, not the bare attribute name: the picker's own script
		// is inlined into every page and contains the selector as a string, so a
		// text match reports a picker on pages that render none.
		const expectPicker = regionsForHost(host).length > 1;
		assert.equal(
			/<button[^>]*data-ts-region-btn/.test(doc),
			expectPicker,
			`${product}/${slug}: region picker ${expectPicker ? 'missing' : 'should not be present'}`
		);
	}
});

test('the Suite overview lists exactly the regions in regions.ts', () => {
	const overview = readFileSync(join(srcDir('api/'), 'overview.mdx'), 'utf8');
	for (const r of SUITE_REGIONS) {
		assert.ok(
			overview.includes(`https://${r.host}`),
			`overview is missing the ${r.label} host (${r.host})`
		);
	}
	// No host may appear that isn't a declared region.
	const mentioned = [...overview.matchAll(/https:\/\/([a-z0-9.-]*testsigma\.com)/g)].map((m) => m[1]);
	for (const host of new Set(mentioned)) {
		assert.ok(
			CANONICAL_HOSTS.includes(host),
			`overview mentions undeclared host "${host}" -- add it to src/data/regions.ts`
		);
	}
});
