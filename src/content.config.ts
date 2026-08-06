import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	// Release notes rendered by ChangelogFeed.astro on the per-product
	// /suite/changelog/ and /arcus/changelog/ pages. Frontmatter holds the meta;
	// the markdown body holds the notes:
	//   ## New features        (or "Improvements" / "Fixes")
	//   **Item title** — one-line description
	changelog: defineCollection({
		loader: glob({ pattern: '**/*.md', base: './src/content/changelog' }),
		schema: z.object({
			version: z.string(),
			date: z.string(), // e.g. "June 16, 2026"
			latest: z.boolean().default(false),
			headline: z.string(),
			// Suite entries live as flat files (default); Arcus entries live under
			// changelog/arcus/ and set product: arcus.
			product: z.enum(['suite', 'arcus']).default('suite'),
		}),
	}),

	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// ── Editorial contract (docs-v2-writer rules/frontmatter.md) ──
				// `pageType` is the one-page-one-type declaration W-40 is checked
				// against; `verified` is the month the UI labels and limits on the
				// page were last confirmed against the product (T-24).
				// OPTIONAL only because the 50 API endpoint pages and the ported
				// pages predate the contract -- make both required once they are
				// backfilled, so a page cannot land without declaring its type.
				// `guide` is the deliberate exception to W-40 (one page, one type):
				// a single page that carries concept, reference AND procedures,
				// navigated by a card grid in its own hero that links to each H2.
				// Testsigma Tunnel is the one page built this way. It is a separate
				// value rather than a mislabelled `reference` so the override is
				// visible in frontmatter instead of hidden behind a wrong type.
				pageType: z.enum(['task', 'concept', 'reference', 'overview', 'guide']).optional(),
				verified: z
					.string()
					.regex(/^\d{4}-\d{2}$/, 'Use YYYY-MM')
					.optional(),

				// The feature surface this page is responsible for: one entry per
				// route/mode/option the product offers here. tests/docs-budgets
				// asserts each entry has a matching heading, so dropping one of four
				// authoring routes fails a test instead of silently reading as done.
				// Every other budget measures FORM (sentence length, callout count);
				// this is the only one that measures COVERAGE, which is why a page
				// documenting half a feature used to pass the whole suite.
				covers: z.array(z.string()).optional(),

				// Words readers TYPE that this page does not itself say. Docs
				// vocabulary and search vocabulary drift apart -- "Author web tests"
				// never says "create", so it lost `create test cases for web` to a
				// page about test SUITES whose H2s happen to start with "Create".
				// These terms are indexed (via data-pagefind-index-attrs in
				// ApiMarkdownContent.astro) but never rendered, so they fix search
				// without bending the prose. Add a term when a real query misses this
				// page -- not as blanket synonyms.
				searchTerms: z.array(z.string()).optional(),

				// ── API reference endpoint pages ──
				// Endpoint pages are pure frontmatter: this block is the single
				// source of truth, and ApiMarkdownContent.astro renders it (tables,
				// method badge, and the cURL/JS/Python samples, which are DERIVED
				// from method+path+body so they cannot drift from the spec).
				// Leave it off for normal doc pages, which render as usual.
				api: z
					.object({
						method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
						path: z.string(),
						baseUrl: z.string().default('https://app.testsigma.com/api/v1'),
						pathParams: z.array(z.object({ name: z.string(), desc: z.string() })).default([]),
						query: z.array(z.object({ name: z.string(), desc: z.string() })).default([]),
						bodyFields: z.array(z.object({ name: z.string(), desc: z.string() })).default([]),
						// An object, or an array of objects for batch endpoints
						// (e.g. updating several results in one call).
						requestBody: z.union([z.record(z.any()), z.array(z.any())]).optional(),
						// multipart/form-data requests (file uploads). When set, the
						// samples use form fields instead of a JSON body; a value of
						// `@filename` renders as a file field.
						formData: z.record(z.any()).optional(),
						response: z.any(),
						status: z.number().default(200),
						statusText: z.string().default('OK'),
						responseAttributes: z.array(z.object({ name: z.string(), desc: z.string() })).default([]),
					})
					.optional(),
			}),
		}),
	}),
};
