// ────────────────────────────────────────────────────────────────────────────
//  Suite sidebar — folder-driven (2026-08-17).
//
//  Each top-level section autogenerates from its content folder, so adding a
//  page (or a folder of pages) under src/content/docs/<section>/ puts it
//  in the rail with no config change. Per-page position and label live in the
//  page's own frontmatter:
//
//    sidebar:
//      order: 20          # position within its folder (folders sort by their
//                         # lowest-ordered page, then alphabetically)
//      label: Test Cases  # row label; defaults to the page title
//      hidden: true       # page builds but gets no rail row
//
//  Nested folder labels are the folder name prettified by the route middleware
//  (starlightRouteData.ts) — dashes become spaces, words are title-cased, with
//  a small exception map for names like CI/CD and iOS.
//
//  Only two things still live here: the top-level section list (label, icon
//  key, order) and the REST API tree (script-generated, swapped in by the
//  route middleware on /api/ pages).
// ────────────────────────────────────────────────────────────────────────────

import { restApis } from './sidebar-suite-api.mjs';

/** A top-level rail section backed by a content folder. Shared with Arcus. */
export const section = (label, directory, extra = {}) => ({
	label,
	collapsed: true,
	items: [{ autogenerate: { directory, collapsed: true } }],
	...extra,
});

export const suite = [
	// Top-of-rail utility rows: standalone links above the first group, each with
	// a framed icon (theme.css keys that off `data-nav-utility`).
	// The one docs home (index.mdx); each product's Home lands on its own section.
	{ label: 'Home', link: '/home/#testsigma', attrs: { 'data-nav-utility': 'true' } },
	{ label: 'API Reference', slug: 'api/overview', attrs: { 'data-nav-utility': 'true' } },
	{ label: 'Changelog', slug: 'changelog', attrs: { 'data-nav-utility': 'true' } },

	section('Get Started', 'get-started', { collapsed: false }),
	section('Atto AI', 'atto'),
	section('Create & Manage', 'create-and-manage'),
	section('Application Types', 'application-types'),
	section('Run Tests', 'run-tests'),
	section('Reports & Analytics', 'analytics'),
	section('On-Prem', 'on-prem'),
	section('Other Testing Types', 'testing-types'),
	section('Add-ons', 'addons'),
	section('Integrations', 'integrations'),

	// Kept in the data, never rendered as a rail section: the middleware strips
	// it on regular pages and unwraps it on /api/ pages.
	...(restApis ? [restApis] : []),

	section('Settings', 'settings'),
];

export default suite;
