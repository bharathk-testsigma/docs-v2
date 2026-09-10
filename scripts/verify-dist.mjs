/**
 * Pre-deploy sanity check on dist/, run by .github/workflows/manual.yml between
 * `npm run build` and `docker build`.
 *
 * WHY THIS EXISTS AS A SCRIPT: the workflow used to inline the checks, and one of
 * them named a content path --
 *
 *     grep -q '"/docs-new/' dist/index.html dist/suite/get-started/introduction/index.html
 *
 * -- so when the v7 IA rewrite renamed that page to get-started/overview, grep
 * exited 2 on the missing file and every deploy failed at the verify step. A
 * check that hardcodes a slug breaks each time the docs are reorganised, which is
 * the one thing this repo does constantly.
 *
 * So nothing below names a page. The checks are derived from the build output
 * itself: the root redirect says where home is, and every redirect stub in dist/
 * is followed to whatever it points at. Reorganise freely; this keeps working.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { DOCS_BASE } from '../src/lib/site-config.mjs';

const DIST = 'dist';
const errors = [];
const fail = (msg) => errors.push(msg);

/** Astro emits redirects as a meta-refresh stub; null for a real page. */
const redirectTarget = (html) =>
	html.match(/http-equiv="refresh" content="0;url=([^"]+)"/)?.[1] ?? null;

/** '/docs-new/home/' -> 'dist/home/index.html' (fragments and query dropped). */
function distFileFor(urlPath) {
	const path = urlPath.split('#')[0].split('?')[0];
	if (!path.startsWith(DOCS_BASE)) return null;
	const rest = path.slice(DOCS_BASE.length).replace(/^\/|\/$/g, '');
	return join(DIST, rest, 'index.html');
}

function walk(dir, out = []) {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) walk(full, out);
		else if (entry === 'index.html') out.push(full);
	}
	return out;
}

// ── 1. the build produced something at all ───────────────────────────────────
if (!existsSync(join(DIST, 'index.html'))) fail('dist/index.html missing — did the build run?');
if (!existsSync(join(DIST, '404.html'))) fail('dist/404.html missing — Apache ErrorDocument would 404 into nothing');
// Search is a headline feature; an empty index ships a dead search box.
const pagefind = join(DIST, 'pagefind');
if (!existsSync(pagefind)) fail('dist/pagefind missing — search would break');
// Arcus searches its own bundle (scripts/build-pagefind.mjs); without it the
// dialog loads nothing on every /arcus/ page and reports no results.
const pagefindArcus = join(DIST, 'pagefind-arcus');
if (!existsSync(join(pagefindArcus, 'pagefind-entry.json')))
	fail('dist/pagefind-arcus/pagefind-entry.json missing — Arcus search would find nothing');
else {
	// Pagefind nests its shards: pagefind/index/*.pf_index and
	// pagefind/fragment/*.pf_fragment, with pagefind-entry.json naming them. A
	// flat readdir of pagefind/ sees only the runtime JS and finds nothing.
	if (!existsSync(join(pagefind, 'pagefind-entry.json'))) fail('dist/pagefind/pagefind-entry.json missing — the search runtime has no index to load');
	const shards = join(pagefind, 'index');
	if (!existsSync(shards) || !readdirSync(shards).some((f) => f.endsWith('.pf_index')))
		fail('dist/pagefind/index/ has no .pf_index shards — search index is empty');
}

if (errors.length) {
	for (const e of errors) console.error(`✗ ${e}`);
	process.exit(1);
}

const pages = walk(DIST);

// ── 2. every redirect resolves to a page that exists ─────────────────────────
// This is the check that would have caught the introduction/overview rename at
// the source instead of as a grep failure: a redirect whose target was deleted
// is a 404 for anyone holding the old link.
let redirects = 0;
for (const file of pages) {
	const target = redirectTarget(readFileSync(file, 'utf8'));
	if (!target) continue;
	redirects++;
	const dest = distFileFor(target);
	if (!dest) fail(`${relative(DIST, file)} redirects to ${target}, which is outside ${DOCS_BASE}/ — it would land on the website's own 404`);
	else if (!existsSync(dest)) fail(`${relative(DIST, file)} redirects to ${target}, but ${dest} was not built — dangling redirect`);
}

// ── 3. links carry the base prefix ───────────────────────────────────────────
// Without `base` in astro.config.mjs the emitted links come out root-relative
// and every one of them 404s behind the website ingress. Checked on the page the
// root redirect points at, so no slug is named here.
const home = distFileFor(redirectTarget(readFileSync(join(DIST, 'index.html'), 'utf8')) ?? '');
if (!home || !existsSync(home)) {
	fail('dist/index.html is not a redirect to a page that exists — the docs root would be a dead end');
} else if (!readFileSync(home, 'utf8').includes(`"${DOCS_BASE}/`)) {
	fail(`${relative(DIST, home)} has no "${DOCS_BASE}/-prefixed links — check \`base\` in astro.config.mjs`);
}

// A single page could pass by luck; the whole build must be prefixed.
const unprefixed = pages.filter((f) => {
	const html = readFileSync(f, 'utf8');
	return !redirectTarget(html) && !html.includes(`"${DOCS_BASE}/`);
});
if (unprefixed.length) fail(`${unprefixed.length} page(s) emit no ${DOCS_BASE}/ links, e.g. ${relative(DIST, unprefixed[0])}`);

// ── 4. the Ask API origin reached the browser bundle ─────────────────────────
// PUBLIC_ASK_API_ORIGIN is inlined at build time, so a missing or misspelled
// value is invisible until a reader opens the drawer and the POST goes to this
// image, which has no /api/ask. Vite keeps the trailing-slash strip and the path
// join as runtime expressions, so "<origin>/api/ask" never appears as a literal
// -- the origin alone is what to look for.
const askOrigin = (process.env.PUBLIC_ASK_API_ORIGIN ?? '').replace(/\/+$/, '');
if (askOrigin) {
	const assets = join(DIST, '_astro');
	const inlined =
		existsSync(assets) &&
		readdirSync(assets)
			.filter((f) => f.endsWith('.js'))
			.some((f) => readFileSync(join(assets, f), 'utf8').includes(askOrigin));
	if (!inlined) fail(`PUBLIC_ASK_API_ORIGIN (${askOrigin}) is not in dist/_astro — Ask AI would POST to this image, which has no /api/ask`);
}

// ── report ───────────────────────────────────────────────────────────────────
if (errors.length) {
	for (const e of errors) console.error(`✗ ${e}`);
	process.exit(1);
}
console.log(`✓ dist/ verified — ${pages.length - redirects} pages, ${redirects} redirects, base ${DOCS_BASE}`);
