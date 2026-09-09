import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Serves every docs page as raw Markdown at `<page-path>.md`.
 *
 * This is what makes the header's "Copy page" control real rather than
 * decorative: it copies the Markdown source, which is the useful thing to paste
 * into an LLM or an issue. Deriving Markdown by scraping the rendered DOM would
 * be lossy and fragile, and the collection already holds the original.
 *
 * `title` and `description` are re-emitted as a heading and blockquote because
 * they live in frontmatter, not in `body`, so a copied page would otherwise
 * start mid-content with no title.
 *
 * A page whose body is layout rather than prose -- the two splash homes -- sets
 * `mdSummary` in frontmatter, and that is served verbatim instead. Stripping a
 * hero, a card grid and an SVG leaves a wall of orphaned link text, which is
 * worse than nothing on the site's most-visited page.
 */

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
 * Known limitation: a page using <PlatformTabs> emits every tab's body one
 * after another, since the tab labels live in component props rather than in
 * the Markdown. Lossy, but better than dropping the content.
 */
function stripMdx(source: string): string {
	const fences: string[] = [];
	const park = (block: string) => `\u0000${fences.push(block) - 1}\u0000`;

	return source
		.replace(/^```[\s\S]*?^```/gm, park)
		// `{/* ... */}`, including the multi-line ones at the top of a page.
		.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
		// Page-local CSS and JS, contents and all.
		.replace(/<(style|script)\b[\s\S]*?<\/\1>/gi, '')
		// `import X from '...'` / `export const ...`
		.replace(/^\s*(?:import|export)\s.*$/gm, '')
		// Every remaining tag, however its attributes wrap. Text between them
		// stays; an SVG path leaves nothing behind, which is the point.
		.replace(/<\/?[A-Za-z][^>]*>/g, '')
		// Collapse the blank lines those removals leave behind.
		.replace(/\n{3,}/g, '\n\n')
		.trim()
		.replace(/\u0000(\d+)\u0000/g, (_, i) => fences[Number(i)]);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const docs = await getCollection('docs');
	return docs.map((doc) => ({ params: { slug: doc.id }, props: { doc } }));
};

export const GET: APIRoute = ({ props }) => {
	const { doc } = props as {
		doc: { data: { title: string; description?: string; mdSummary?: string }; body?: string };
	};
	const deck = doc.data.description ? `\n> ${doc.data.description}\n` : '';
	const body = doc.data.mdSummary?.trim() ?? stripMdx(doc.body ?? '');

	return new Response(`# ${doc.data.title}\n${deck}\n${body}\n`, {
		headers: { 'content-type': 'text/markdown; charset=utf-8' },
	});
};
