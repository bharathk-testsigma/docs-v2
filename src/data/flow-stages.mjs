/**
 * The stage data behind the journey diagram on each product home.
 *
 * Kept out of the MDX pages: a page's body doubles as the source for its
 * `.md` export, and a 60-line array of layout data is not documentation.
 * Kept out of StageFlow.astro so the component stays geometry and styling,
 * and the words live somewhere an editor will find them.
 *
 * Per stage: `label` heads the card, `rows` are the three chips inside it,
 * `foot` is the line under them, and `cap` is the sentence that replaces the
 * default caption while the card is hovered or focused. `tone` names the
 * accent, which StageFlow resolves per theme.
 */

export const SUITE_FLOW = {
	aria: 'How a test case moves through Testsigma: write tests, generate tests, execution, fix, ship',
	rest: 'Five stages, one test case. Hover a stage to see what Testsigma does there.',
	// Fixing is the one stage that feeds back rather than forward.
	loop: { from: 3, to: 2, label: 'Fixes feed back into the case' },
	stages: [
		{
			label: 'Write tests',
			tone: 'neutral',
			href: '/create-and-manage/create-test-cases/',
			rows: ['Copilot', 'Recorder', 'NLP steps'],
			foot: 'Plain English, no code',
			cap: 'Build the steps yourself: prompt Copilot, record the flow in the browser, or pick NLP steps from the library.',
		},
		{
			label: 'Generate tests',
			tone: 'pink',
			href: '/atto/ai-agents/',
			rows: ['Requirements', 'Designs', 'Files'],
			foot: 'Cases from what you have',
			cap: 'Point Atto at a requirement, a design, or a file, and it writes whole test cases for you to review.',
		},
		{
			label: 'Execution',
			tone: 'teal',
			href: '/run-tests/test-plan/',
			rows: ['Agentic', 'Cloud', 'Local'],
			foot: 'Parallel, wherever you run',
			cap: 'Run a plan agentically, on the parallel cloud grid, or on your own machines, with no grid to maintain.',
		},
		{
			label: 'Fix',
			tone: 'purple',
			href: '/run-tests/debug/',
			rows: ['Heal locators', 'Analyze failures', 'Report bugs'],
			foot: 'Fewer red builds',
			cap: 'Auto-healing repairs a moved locator mid-run, the Analyzer says why a step failed, and Bug Reporter files it.',
		},
		{
			label: 'Ship',
			tone: 'green',
			href: '/analytics/reports/',
			rows: ['Run test plans', 'Analyze results', 'Share reports'],
			foot: 'Results your team can read',
			cap: 'Run the plan on every build, read the result, and share the report with the people waiting on it.',
		},
	],
};

export const ARCUS_FLOW = {
	aria: 'How work moves through Testsigma Arcus: bring context, generate, review, plan and run, ship',
	rest: 'Five stages, from a requirement to a release call. Hover a stage to see what Arcus does there.',
	// What ships short of coverage comes back as gaps to work through.
	loop: { from: 4, to: 2, label: 'Gaps feed back into coverage' },
	stages: [
		{
			label: 'Bring context',
			tone: 'neutral',
			href: '/arcus/qi-home/context-management/',
			rows: ['Requirements', 'Designs', 'Code changes'],
			foot: 'What you already have',
			cap: 'Attach the sources that describe the feature. QI Home reads them as context, so nothing is retyped.',
		},
		{
			label: 'Generate',
			tone: 'purple',
			href: '/arcus/qi-home/generate-tests/',
			rows: ['By scenario', 'By module', 'Pending review'],
			foot: 'Cases you review, not write',
			cap: 'QI Home drafts the cases, including the edge cases a tired reader of the ticket would miss.',
		},
		{
			label: 'Review',
			tone: 'blue',
			href: '/arcus/create-and-manage/test-cases/',
			rows: ['Accept cases', 'Track gaps', 'Grow coverage'],
			foot: 'Accepted work, tracked',
			cap: 'Accept what is useful and drop the rest. Accepted cases land in your folders like any other case.',
		},
		{
			label: 'Plan and run',
			tone: 'green',
			href: '/arcus/run-tests/test-runs/',
			rows: ['Plan tiers', 'Test runs', 'Automated plans'],
			foot: 'Manual or automated',
			cap: 'Run a case yourself or let Copilot automate it. Either way the result lands in the same run.',
		},
		{
			label: 'Ship',
			tone: 'neutral',
			href: '/arcus/reports/dashboards/',
			rows: ['Coverage', 'Readiness', 'Release gate'],
			foot: 'Evidence for the call',
			cap: 'Every run rolls up into coverage by module and a readiness score you can take to the release meeting.',
		},
	],
};
