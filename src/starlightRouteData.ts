import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import type { SidebarEntry } from '@astrojs/starlight/route-data';

/**
 * Three left navs out of one sidebar config.
 *
 * `astro.config.mjs` nests both products under a top-level group each ("Suite",
 * "Arcus"). This middleware unwraps whichever one matches the URL, so the reader
 * sees that product's sections at top level and never the wrapper node itself.
 *
 * Within Suite there is a further split: the API reference is its own
 * destination, reached from the "API reference" tab in the top bar
 * (Header.astro). On those pages the left nav shows ONLY the endpoint groups, and
 * on every other Suite page it shows everything EXCEPT them. The alternative --
 * separate `sidebar` arrays -- is impossible (Starlight takes exactly one) and
 * would duplicate entries that already exist in the sidebar data files, letting
 * the copies drift.
 *
 * Starlight builds the sidebar before rendering and exposes it on the route, so
 * the split happens here rather than in Sidebar.astro, which hands the tree
 * straight to Starlight's own renderer.
 */

/** Wrapper groups in the `sidebar` array. Keep in sync with astro.config.mjs. */
const SUITE_GROUP = 'Suite';
const ARCUS_GROUP = 'Arcus';

/**
 * The API reference section of each product: the URL prefix its endpoint pages
 * live under, and the label of the group holding them in that product's tree.
 * Both products get the same treatment; only these two strings differ.
 */
const API_SECTIONS = {
	suite: { path: '/suite/api/', group: 'REST APIs' },
	arcus: { path: '/arcus/api-reference/', group: 'API Reference' },
} as const;

/**
 * Pages served by the API-only nav, in EITHER product. Header.astro keys the
 * "API reference" tab off this too, so a Suite-only test here also stopped that
 * tab lighting up on Arcus endpoint pages.
 */
export const isApiReferencePath = (pathname: string) =>
	Object.values(API_SECTIONS).some((section) => pathname.startsWith(section.path));

/** Pages served by the Arcus tree. Keep in sync with ProductSwitcher.astro. */
export const isArcusPath = (pathname: string) => pathname.startsWith('/arcus/');

type Group = Extract<SidebarEntry, { type: 'group' }>;

const isGroup = (entry: SidebarEntry): entry is Group => entry.type === 'group';

const findGroup = (entries: SidebarEntry[], label: string): Group | undefined =>
	entries.find((e): e is Group => isGroup(e) && e.label === label);

/**
 * Arcus's groups are `autogenerate`, so Starlight labels each one with its
 * directory name verbatim: the nav read `REPORT-IMPORTS` and a breadcrumb read
 * `test-cases`. Rewritten here, once, because both the nav and Breadcrumbs.astro
 * read this same tree.
 *
 * Only slug-shaped labels are touched, so hand-authored ones survive as written
 * -- `REST APIs`, `CI/CD` and `Atto (AI)` all fail the test and pass through.
 */
const humanize = (label: string) =>
	/^[a-z0-9]+(-[a-z0-9]+)*$/.test(label)
		? label.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
		: label;

const humanizeLabels = (entries: SidebarEntry[]): SidebarEntry[] =>
	entries.map((entry) =>
		isGroup(entry)
			? { ...entry, label: humanize(entry.label), entries: humanizeLabels(entry.entries) }
			: entry
	);

export const onRequest = defineRouteMiddleware((context) => {
	const { starlightRoute } = context.locals;
	const { pathname } = context.url;
	const arcus = isArcusPath(pathname);

	// ── 1. pick the product tree ──
	const product = findGroup(starlightRoute.sidebar, arcus ? ARCUS_GROUP : SUITE_GROUP);
	if (!product) return;
	starlightRoute.sidebar = humanizeLabels(product.entries);

	// ── 2. within that product, split its API reference out ──
	const section = API_SECTIONS[arcus ? 'arcus' : 'suite'];
	const apiGroup = findGroup(starlightRoute.sidebar, section.group);
	if (apiGroup) {
		starlightRoute.sidebar = pathname.startsWith(section.path)
			? // Unwrap the group so each entity (Projects, Test Cases, ...) becomes a
				// top-level section.
				apiGroup.entries
			: starlightRoute.sidebar.filter((e) => e !== apiGroup);
	}

	// ── 3. top-level sections are always open ──
	// theme.css renders them as inert uppercase headings rather than
	// disclosures, so only groups NESTED inside them collapse: the reader sees
	// every section and its direct pages, and expands only a sub-folder.
	starlightRoute.sidebar = starlightRoute.sidebar.map((entry) =>
		isGroup(entry) ? { ...entry, collapsed: false } : entry
	);
});
