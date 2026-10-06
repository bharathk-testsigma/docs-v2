/**
 * Base-path helpers.
 *
 * The site is not served from the domain root: it lives under `/docs/v2/` (Testsigma) and `/docs/arcus/v2/` (Arcus), see toRoute() in site-config.mjs
 * (see `base` in astro.config.mjs), behind the website's Apache. Astro rewrites
 * the links IT generates — markdown links, sidebar entries, pagination, asset
 * URLs — but not two things:
 *
 *   1. path literals we hand-write in components (`href="/..."`)
 *   2. `Astro.url.pathname` / `location.pathname`, which always CARRY the base
 *
 * So every hand-written path needs one of these:
 *
 *   withBase()  — building an href/src   ('/x/' → '/docs/v2/x/', '/arcus/x/' → '/docs/arcus/v2/x/')
 *   stripBase() — testing a pathname     ('/docs/arcus/v2/…' → '/arcus/…')
 *
 * Route predicates (isArcusPath, isApiReferencePath) call stripBase themselves,
 * so callers keep passing `Astro.url.pathname` unchanged.
 *
 * Works in both places `import.meta.env.BASE_URL` is available: server-side
 * during the build, and inside client scripts, where Astro inlines the literal
 * into the bundle.
 */

import { fromRoute, toRoute } from './site-config.mjs';

/** Configured base, normalised to '' (root) or '/docs' — never a trailing slash. */
export const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/**
 * Prefix a site-absolute path with the base.
 *
 * Idempotent, and a no-op for anything that is not a site-absolute path. Both
 * matter for the Ask AI drawer, which prefixes URLs coming from the retrieval
 * index and from LLM-written markdown links — those arrive unprefixed, already
 * prefixed, or as external `https://` URLs, and must not be mangled.
 */
export const withBase = (path: string): string => {
	if (!path.startsWith('/') || path.startsWith('//')) return path; // relative or protocol-relative
	if (BASE && (path === BASE || path.startsWith(BASE + '/'))) return path; // already prefixed
	return BASE + toRoute(path);
};

/**
 * Remove the base from a pathname so it can be matched against the literal
 * prefixes used throughout the app. Returns '/' for the site root.
 */
export const stripBase = (pathname: string): string => {
	if (!BASE || (pathname !== BASE && !pathname.startsWith(BASE + '/'))) return pathname;
	return fromRoute(pathname.slice(BASE.length) || '/');
};
