/**
 * Build ONE Pagefind index per product, replacing Starlight's single
 * whole-site index (`pagefind: false` in astro.config.mjs turns that off).
 *
 * Why two indexes rather than one with a filter: Suite and Arcus are separate
 * products with separate navigation, and a reader in one searching the other's
 * pages is a wrong result, not a broad one. Pagefind CAN filter
 * (`data-pagefind-filter`), but @pagefind/default-ui 1.5.2 has no option to
 * PIN a filter -- it only renders filters as checkboxes for the reader (its
 * accepted options are element/bundlePath/pageSize/…/sort, no `filters`). So
 * the scope has to be chosen at bundle level, which Search.astro does by
 * pointing `bundlePath` at the current product's directory.
 *
 * Everything Starlight's integration did is in the built HTML already
 * (`data-pagefind-body` on the article, `data-pagefind-ignore` on the chrome),
 * so these indexes are identical to its output apart from the page set.
 */
import * as pagefind from 'pagefind';
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { DOCS_VERSION } from '../src/lib/site-config.mjs';

const DIST = 'dist';
// Shared files live under dist/v2/ (site-config.mjs), and so do Testsigma's
// pages, since Testsigma has no product prefix; Arcus is dist/arcus/v2/.
const SHARED = join(DIST, DOCS_VERSION);

// Testsigma's index is every page folder under dist/v2/. Derived, not
// hard-coded, so a new section is picked up automatically: `_astro` and
// `pagefind*` are build output, and the docs home (`home`) is indexed with
// Testsigma as before.
const testsigmaDirs = readdirSync(SHARED, { withFileTypes: true })
	.filter((e) => e.isDirectory() && e.name !== '_astro' && !e.name.startsWith('pagefind'))
	.map((e) => e.name);

const BUNDLES = [
	// [output directory under dist/v2/, glob over dist/]
	['pagefind', `${DOCS_VERSION}/{${testsigmaDirs.join(',')}}/**/*.html`],
	['pagefind-arcus', `arcus/${DOCS_VERSION}/**/*.html`],
];

for (const [out, glob] of BUNDLES) {
	const { index, errors } = await pagefind.createIndex();
	if (!index) throw new Error(`Pagefind createIndex failed: ${errors?.join('; ')}`);

	const { page_count } = await index.addDirectory({ path: DIST, glob });
	// A glob that matches nothing writes a valid but empty bundle, and search
	// then silently returns no results for that product on every query.
	if (!page_count) throw new Error(`Pagefind indexed 0 pages for ${out} (glob: ${glob})`);

	await index.writeFiles({ outputPath: join(SHARED, out) });
	console.log(`  ${out.padEnd(15)} ${String(page_count).padStart(4)} pages  (${glob})`);
}

if (!existsSync(join(SHARED, 'pagefind', 'pagefind-entry.json'))) {
	throw new Error(`${SHARED}/pagefind/pagefind-entry.json missing after build`);
}
