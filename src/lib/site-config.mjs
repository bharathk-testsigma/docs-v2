/**
 * The one place the docs mount point is written down.
 *
 * astro.config.mjs passes this to Astro as `base`, which is what makes
 * `import.meta.env.BASE_URL` — read by src/lib/base.ts in app code — resolve to
 * the same value. Node-side consumers (tests, scripts) import this directly,
 * because `import.meta.env` does not exist outside the Astro build.
 *
 * Cutover to /docs is therefore a one-line edit here, not a search for every
 * '/docs-new' string in the repo.
 */
export const DOCS_BASE = '/docs/v2';

/** Prefix a site-absolute path. For Node-side code with no import.meta.env. */
export const withDocsBase = (path) => `${DOCS_BASE}${path}`;
