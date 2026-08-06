// ────────────────────────────────────────────────────────────────────────────
//  Arcus (test management) information architecture.
//
//  Explicit tree, same conventions as sidebar-suite-v2.mjs: one lifecycle
//  spine (Arcus is a single surface, so no per-platform repetition), uniform
//  verb-led page names, subgroups only where a real cluster exists, and
//  `stub()` for IA positions with no page yet.
//
//  Content is sourced from TMSDocs branch `dev` (source of truth as of
//  2026-07-29, commit 6e05e28c). Merged pages carry `<!-- Source: -->` markers
//  per consumed legacy page; the per-page rules rewrite (W-01..W-43) happens
//  page by page on top of this preserved content.
//
//  "QI Home" replaced the old Atto section upstream (TMSDocs PR #140 deleted
//  atto/ entirely); this tree mirrors that. Bug Reporter Agent vanished in the
//  same PR with no QI Home replacement -- confirm with PM before re-adding.
// ────────────────────────────────────────────────────────────────────────────

/** An IA position with no page behind it yet. Rendered inert by theme.css. */
const stub = (label) => ({
	label,
	link: '#',
	attrs: { 'data-ia-stub': 'true' },
});

export const arcusNav = [
	{
		label: 'Get Started',
		collapsed: true,
		items: [
			{ label: 'Overview', slug: 'arcus/get-started' },
			{ label: 'What is Arcus?', slug: 'arcus/get-started/what-is-arcus' },
			{ label: 'Quickstart', slug: 'arcus/get-started/quickstart' },
			{ label: 'Projects', slug: 'arcus/get-started/projects' },
			// Cross-link into QI Home, same pattern as Suite's "Try Atto".
			// (Atto branding is Suite-only now; Arcus surfaces this as QI Home.)
			{ label: 'Try QI Home', slug: 'arcus/qi-home/overview' },
			{ label: 'Terminology', slug: 'arcus/get-started/terminology' },
			{ label: 'FAQs', slug: 'arcus/get-started/faqs' },
		],
	},
	{
		label: 'QI Home',
		collapsed: true,
		items: [
			{ label: 'Overview', slug: 'arcus/qi-home/overview' },
			{ label: 'Use the Playground', slug: 'arcus/qi-home/use-the-playground' },
			{
				label: 'Generate Test Cases',
				collapsed: true,
				items: [
					{ label: 'Ad-Hoc', slug: 'arcus/qi-home/generate/ad-hoc' },
					{ label: 'Attach Context', slug: 'arcus/qi-home/generate/attach-context-sources' },
					{ label: 'Write Prompts', slug: 'arcus/qi-home/generate/write-prompts' },
					{ label: 'Sprints', slug: 'arcus/qi-home/generate/sprints' },
					{ label: 'Review & Accept', slug: 'arcus/qi-home/generate/review-and-accept' },
				],
			},
			{ label: 'Coverage & Gaps', slug: 'arcus/qi-home/coverage-and-gaps' },
			{ label: 'Test Plans', slug: 'arcus/qi-home/test-plans' },
			{ label: 'QI Metrics', slug: 'arcus/qi-home/qi-metrics' },
			{
				label: 'Automation',
				collapsed: true,
				items: [
					{ label: 'Agentic Learning', slug: 'arcus/qi-home/automation/agentic-learning' },
					{ label: 'Learning Controls', slug: 'arcus/qi-home/automation/learning-controls' },
					{ label: 'Run with Copilot', slug: 'arcus/qi-home/automation/run-with-copilot' },
					{ label: 'Copilot Controls', slug: 'arcus/qi-home/automation/copilot-controls' },
				],
			},
			{
				label: 'Context Mapping',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: 'arcus/qi-home/context-mapping/overview' },
					{ label: 'Connect GitHub', slug: 'arcus/qi-home/context-mapping/connect-github' },
					{ label: 'Connect Claude Code', slug: 'arcus/qi-home/context-mapping/connect-claude-code' },
					{ label: 'Connect Cursor', slug: 'arcus/qi-home/context-mapping/connect-cursor' },
					{ label: 'Connect GitHub Copilot', slug: 'arcus/qi-home/context-mapping/connect-github-copilot' },
					{ label: 'Connect Codex', slug: 'arcus/qi-home/context-mapping/connect-codex' },
					{ label: 'Map Context', slug: 'arcus/qi-home/context-mapping/map-context' },
				],
			},
		],
	},
	{
		label: 'Test Cases',
		collapsed: true,
		items: [
			{ label: 'Author Test Cases', slug: 'arcus/test-cases/author-test-cases' },
			{ label: 'Manage Test Cases', slug: 'arcus/test-cases/manage-test-cases' },
			{ label: 'Organize Test Cases', slug: 'arcus/test-cases/organize-test-cases' },
			{ label: 'Step Groups', slug: 'arcus/test-cases/step-groups' },
			{ label: 'Versions', slug: 'arcus/test-cases/versions' },
			{ label: 'Review Management', slug: 'arcus/test-cases/review-management' },
		],
	},
	{ label: 'Data Sets', slug: 'arcus/data-sets' },
	{ label: 'Test Plans', slug: 'arcus/test-plans' },
	{
		label: 'Test Runs',
		collapsed: true,
		items: [
			{ label: 'Create Test Runs', slug: 'arcus/test-runs/create-test-runs' },
			{ label: 'Manage Test Runs', slug: 'arcus/test-runs/manage-test-runs' },
			{ label: 'Test Run Properties', slug: 'arcus/test-runs/test-run-properties' },
		],
	},
	{
		label: 'Reports',
		collapsed: true,
		items: [
			{ label: 'View & Export Reports', slug: 'arcus/reports/view-and-export-reports' },
			{ label: 'Dashboard Reports', slug: 'arcus/reports/dashboard-reports' },
			{ label: 'Requirement Traceability', slug: 'arcus/reports/requirement-traceability' },
		],
	},
	{ label: 'Test Capture', slug: 'arcus/test-capture' },
	{
		label: 'Imports & Exports',
		collapsed: true,
		items: [
			{ label: 'Zephyr', slug: 'arcus/imports-and-exports/zephyr' },
			{ label: 'TestRail', slug: 'arcus/imports-and-exports/testrail' },
			{ label: 'BrowserStack', slug: 'arcus/imports-and-exports/browserstack' },
			{ label: 'CSV', slug: 'arcus/imports-and-exports/csv-file' },
			{ label: 'Export Tests', slug: 'arcus/imports-and-exports/export-tests' },
		],
	},
	{
		label: 'Integrations',
		collapsed: true,
		items: [
			{
				label: 'Suite (Two-Way Sync)',
				collapsed: true,
				items: [
					{ label: 'Connect Suite', slug: 'arcus/integrations/suite/connect-suite' },
					{ label: 'Sync Test Cases', slug: 'arcus/integrations/suite/sync-test-cases' },
					{ label: 'Sync Test Plans & Runs', slug: 'arcus/integrations/suite/sync-test-plans-and-runs' },
				],
			},
			{
				label: 'Project Management',
				collapsed: true,
				items: [
					{ label: 'Set up Jira', slug: 'arcus/integrations/jira/set-up' },
					{ label: 'Work with Jira', slug: 'arcus/integrations/jira/work-with' },
					{ label: 'Set up Azure DevOps', slug: 'arcus/integrations/azure-devops/set-up' },
					{ label: 'Work with Azure DevOps', slug: 'arcus/integrations/azure-devops/work-with' },
					{ label: 'Linear', slug: 'arcus/integrations/linear' },
					{ label: 'ClickUp', slug: 'arcus/integrations/clickup' },
					{ label: 'Confluence', slug: 'arcus/integrations/confluence' },
					{ label: 'Figma', slug: 'arcus/integrations/figma' },
				],
			},
			{
				label: 'CI/CD',
				collapsed: true,
				items: [
					{ label: 'Jenkins', slug: 'arcus/integrations/ci-cd/jenkins' },
					{ label: 'GitHub', slug: 'arcus/integrations/ci-cd/github' },
					{ label: 'GitLab', slug: 'arcus/integrations/ci-cd/gitlab' },
					{ label: 'Azure DevOps', slug: 'arcus/integrations/ci-cd/azure-devops' },
					{ label: 'CircleCI', slug: 'arcus/integrations/ci-cd/circleci' },
					{ label: 'Travis CI', slug: 'arcus/integrations/ci-cd/travis-ci' },
				],
			},
		],
	},
	{
		label: 'Settings',
		collapsed: true,
		items: [
			{ label: 'Invite Users', slug: 'arcus/settings/invite-users' },
			{ label: 'Manage Access', slug: 'arcus/settings/manage-access' },
			{ label: 'Custom Fields', slug: 'arcus/settings/custom-fields' },
			{ label: 'Manage Properties', slug: 'arcus/settings/manage-properties' },
			{ label: 'Labels', slug: 'arcus/settings/labels' },
			{ label: 'Notifications', slug: 'arcus/settings/notifications' },
			{ label: 'SMTP Configuration', slug: 'arcus/settings/smtp-configuration' },
			{ label: 'API Keys', slug: 'arcus/settings/api-keys' },
			{ label: 'Audit Logs', slug: 'arcus/settings/audit-logs' },
		],
	},
	{
		label: 'API Reference',
		collapsed: true,
		items: [{ autogenerate: { directory: 'arcus/api-reference' } }],
	},
];

export default arcusNav;
