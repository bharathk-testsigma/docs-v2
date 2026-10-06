/**
 * The one place the docs mount point is written down.
 *
 * astro.config.mjs passes DOCS_BASE to Astro as `base`, which is what makes
 * `import.meta.env.BASE_URL` — read by src/lib/base.ts in app code — resolve to
 * the same value. Node-side consumers (tests, scripts) import this directly,
 * because `import.meta.env` does not exist outside the Astro build.
 *
 * Product-first URLs (Jayavel's feat/v2-uri scheme): a prefixed product is
 * served at /docs/<product>/<version>/…, and everything else — Testsigma's
 * pages, the docs home, assets, search bundles — at /docs/<version>/….
 * Testsigma has no slug of its own, so Arcus is the only prefixed product:
 *
 *   /get-started/overview/  →  /docs/v2/get-started/overview/
 *   /arcus/qi-home/         →  /docs/arcus/v2/qi-home/
 *
 * Content, sidebar data and the Ask index keep writing version-free paths;
 * toRoute() is the only thing that knows the version.
 */
export const DOCS_BASE = '/docs';
export const DOCS_VERSION = 'v2';
export const PRODUCTS = ['arcus'];

const PRODUCT_PREFIX = new RegExp(`^/(${PRODUCTS.join('|')})(?=[/?#]|$)`);
const VERSIONED_PREFIX = new RegExp(`^/(${PRODUCTS.join('|')})/${DOCS_VERSION}(?=[/?#]|$)`);
const SHARED_PREFIX = new RegExp(`^/${DOCS_VERSION}(?=[/?#]|$)`);

/** '/arcus/x' → '/arcus/v2/x'; any other site path → '/v2' + path. */
export const toRoute = (path) =>
	PRODUCT_PREFIX.test(path) ? path.replace(PRODUCT_PREFIX, `/$1/${DOCS_VERSION}`) : `/${DOCS_VERSION}${path}`;

/** Inverse of toRoute, for a pathname with DOCS_BASE already removed. */
export const fromRoute = (path) => {
	if (VERSIONED_PREFIX.test(path)) return path.replace(VERSIONED_PREFIX, '/$1');
	if (SHARED_PREFIX.test(path)) return path.replace(SHARED_PREFIX, '') || '/';
	return path;
};

/** Content-folder id → collection id: 'get-started/x' → 'v2/get-started/x'. */
export const toDocId = (id) => toRoute(`/${id}`).slice(1);

/** Prefix a site-absolute path. For Node-side code with no import.meta.env. */
export const withDocsBase = (path) => `${DOCS_BASE}${toRoute(path)}`;
