// ────────────────────────────────────────────────────────────────────────────
//  Arcus (test management) sidebar — folder-driven, same contract as Suite.
//
//  Only the top-level section list lives here (label, order); every row under
//  a section autogenerates from src/content/docs/arcus/<section>/ and takes
//  its position and label from the page's own frontmatter. See
//  sidebar-suite.mjs for the full convention.
//
//  The whole tree is wrapped in one group so Starlight's single `sidebar`
//  array can carry both products; starlightRouteData.ts unwraps it on
//  /arcus/ pages and drops it everywhere else.
//
//  The pages behind these folders are IA placeholders (2026-09-02): the nav
//  shape is the deliverable, the prose lands per page afterwards.
// ────────────────────────────────────────────────────────────────────────────

import { section } from './sidebar-suite.mjs';

export const arcus = {
	label: 'Arcus',
	items: [
		// Arcus's own top-of-rail utility rows, mirroring Suite's. They live in
		// this product's tree rather than being borrowed from Suite's, so each
		// row points at that product's own destination.
		// The shared docs home (index.mdx), scrolled to the Arcus section.
		{ label: 'Home', link: '/home/#arcus', attrs: { 'data-nav-utility': 'true' } },
		{
			label: 'API Reference',
			slug: 'arcus/api-reference/overview',
			attrs: { 'data-nav-utility': 'true' },
		},
		{ label: 'Changelog', slug: 'arcus/changelog', attrs: { 'data-nav-utility': 'true' } },

		section('Get Started', 'arcus/get-started', { collapsed: false }),
		section('QI Home', 'arcus/qi-home'),
		section('Automation', 'arcus/automation'),
		section('Create & Manage', 'arcus/create-and-manage'),
		section('Run Tests', 'arcus/run-tests'),
		section('Reports', 'arcus/reports'),
		section('Integrations', 'arcus/integrations'),
		section('Settings', 'arcus/settings'),

		// Never rendered as a rail section: the middleware strips it on regular
		// pages and unwraps it on /arcus/api-reference/ pages, exactly as it does
		// for Suite's REST APIs.
		section('API Reference', 'arcus/api-reference'),
	],
};

export default arcus;
