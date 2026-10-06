import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { stripMdx, absolutizeLinks } from '../lib/strip-mdx.mjs';
import { withDocsBase } from '../lib/site-config.mjs';

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
 * Links are rewritten to full URLs (absolutizeLinks), since the base that the
 * HTML pages get at build time never reaches this raw-text route.
 *
 * A page whose body is layout rather than prose -- the docs home -- sets
 * `mdSummary` in frontmatter, and that is served verbatim instead. Stripping a
 * hero, a card grid and an SVG leaves a wall of orphaned link text, which is
 * worse than nothing on the site's most-visited page.
 */

export const getStaticPaths: GetStaticPaths = async () => {
	// Drafts are unpublished pages: no HTML route in production, so no copy either.
	const docs = await getCollection('docs', ({ data }) => !data.draft);
	return docs.map((doc) => ({ params: { slug: doc.id }, props: { doc } }));
};

export const GET: APIRoute = ({ props }) => {
	const { doc } = props as {
		doc: { data: { title: string; description?: string; mdSummary?: string }; body?: string };
	};
	const deck = doc.data.description ? `\n> ${doc.data.description}\n` : '';
	const raw = doc.data.mdSummary?.trim() ?? stripMdx(doc.body ?? '');
	// Authors write '/x/' links; the copy needs full URLs to work once pasted.
	const body = absolutizeLinks(raw, import.meta.env.SITE ?? 'https://testsigma.com', withDocsBase);

	return new Response(`# ${doc.data.title}\n${deck}\n${body}\n`, {
		headers: { 'content-type': 'text/markdown; charset=utf-8' },
	});
};
