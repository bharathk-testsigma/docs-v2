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
 */

/**
 * Strip the MDX scaffolding that is meaningless outside the build:
 * `import`/`export` statements and bare component tags. The content *inside*
 * those components is kept -- it is the actual documentation.
 *
 * Known limitation: a page using <PlatformTabs> emits every tab's body one
 * after another, since the tab labels live in component props rather than in
 * the Markdown. Lossy, but better than dropping the content.
 */
function stripMdx(source: string): string {
	return source
		// `import X from '...'` / `export const ...`
		.replace(/^\s*(?:import|export)\s.*$/gm, '')
		// A line that is nothing but a JSX/HTML open or close tag.
		.replace(/^\s*<\/?[A-Za-z][\w.-]*(?:\s[^>]*)?\/?>\s*$/gm, '')
		// Inline wrapper divs (hero placeholders, link boxes): drop the tags,
		// keep the text between them.
		.replace(/<\/?div(?:\s[^>]*)?>/g, '')
		// Collapse the blank lines those removals leave behind.
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

export const getStaticPaths: GetStaticPaths = async () => {
	const docs = await getCollection('docs');
	return docs.map((doc) => ({ params: { slug: doc.id }, props: { doc } }));
};

export const GET: APIRoute = ({ props }) => {
	const { doc } = props as {
		doc: { data: { title: string; description?: string }; body?: string };
	};
	const deck = doc.data.description ? `\n> ${doc.data.description}\n` : '';
	const body = stripMdx(doc.body ?? '');

	return new Response(`# ${doc.data.title}\n${deck}\n${body}\n`, {
		headers: { 'content-type': 'text/markdown; charset=utf-8' },
	});
};
