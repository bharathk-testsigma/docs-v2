/**
 * Strip the MDX scaffolding that is meaningless outside the build: comments,
 * page-local CSS and JS, `import`/`export` statements, and tags. The content
 * *inside* those tags is kept -- it is the actual documentation.
 *
 * Comments go because they are written for whoever edits the file, and name
 * build internals (config files, design sources) that have no business in a
 * reader's copy of the page. Style and script blocks go with their contents:
 * CSS declarations are not documentation, and a model handed them answers
 * out of them.
 *
 * Fenced code is parked behind placeholders first, so a `<tag>` inside a
 * sample survives the tag stripper.
 *
 * Lives here rather than inline in the `.md` route so that
 * `tests/docs-budgets.test.mjs` can assert on the real function instead of a
 * copy of it that can drift.
 *
 * Known limitation: a page using <PlatformTabs> emits every tab's body one
 * after another, since the tab labels live in component props rather than in
 * the Markdown. Lossy, but better than dropping the content.
 *
 * @param {string} source
 * @returns {string}
 */
export function stripMdx(source) {
	/** @type {string[]} */
	const fences = [];
	/** @param {string} block */
	const park = (block) => `\u0000${fences.push(block) - 1}\u0000`;

	return source
		.replace(/^```[\s\S]*?^```/gm, park)
		// `{/* ... */}`, including the multi-line ones at the top of a page.
		.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
		// Page-local CSS and JS, contents and all.
		.replace(/<(style|script)\b[\s\S]*?<\/\1>/gi, '')
		// `import X from '...'` / `export const ...`
		.replace(/^\s*(?:import|export)\s.*$/gm, '')
		// <Prerequisites> keeps its label inside the component, so the tag
		// stripper below would leave a bare bullet list with nothing marking it
		// as a gate the reader must clear before step 1. Emit the heading they
		// see rendered, which also puts it in the export's outline.
		.replace(/^[ \t]*<Prerequisites>[ \t]*$/gm, '## Prerequisites\n')
		.replace(/^[ \t]*<\/Prerequisites>[ \t]*$/gm, '')
		// Every remaining tag, however its attributes wrap. Text between them
		// stays; an SVG path leaves nothing behind, which is the point.
		.replace(/<\/?[A-Za-z][^>]*>/g, '')
		// Collapse the blank lines those removals leave behind.
		.replace(/\n{3,}/g, '\n\n')
		.trim()
		.replace(/\u0000(\d+)\u0000/g, (_, i) => fences[Number(i)]);
}
