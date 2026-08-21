// ────────────────────────────────────────────────────────────────────────────
//  Suite sidebar — folder-driven (2026-08-17).
//
//  Each top-level section autogenerates from its content folder, so adding a
//  page (or a folder of pages) under src/content/docs/suite/<section>/ puts it
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
//  route middleware on /suite/api/ pages).
// ────────────────────────────────────────────────────────────────────────────

import { restApis } from './sidebar-suite-api.mjs';

/** A top-level rail section backed by a content folder. */
const section = (label, directory, extra = {}) => ({
	label,
	collapsed: true,
	items: [{ autogenerate: { directory, collapsed: true } }],
	...extra,
});

export const suite = [
	// Top-of-rail utility rows: standalone links above the first group, each with
	// a framed icon (theme.css keys that off `data-nav-utility`).
	{ label: 'Home', slug: 'home', attrs: { 'data-nav-utility': 'true' } },
	{ label: 'API Reference', slug: 'suite/api/overview', attrs: { 'data-nav-utility': 'true' } },
	{ label: 'Changelog', slug: 'suite/changelog', attrs: { 'data-nav-utility': 'true' } },

	section('Get Started', 'suite/get-started', { collapsed: false }),
	section('Atto AI', 'suite/atto'),
	section('Create & Manage', 'suite/create-and-manage'),
	section('Application Types', 'suite/application-types'),
	section('Run Tests', 'suite/run-tests'),
	section('Reports & Analytics', 'suite/analytics'),
	section('On-Prem', 'suite/on-prem'),
	section('Other Testing Types', 'suite/testing-types'),
	section('Add-ons', 'suite/addons'),
	section('Integrations', 'suite/integrations'),

	// Kept in the data, never rendered as a rail section: the middleware strips
	// it on regular pages and unwraps it on /suite/api/ pages.
	...(restApis ? [restApis] : []),

	section('Settings', 'suite/settings'),
];

export default suite;
