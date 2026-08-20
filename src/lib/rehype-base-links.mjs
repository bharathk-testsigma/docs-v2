/**
 * Prefix site-absolute links in CONTENT with the configured base.
 *
 * Astro re-prefixes the links it generates itself (sidebar, pagination, asset
 * URLs), but NOT links authors write inside markdown. This repo has 483 of them
 * across 173 pages -- `[Auto-heal](/suite/atto/overview/)` and friends. Under
 * `/docs-new/` every one resolves against the domain root, lands on the
 * marketing site, and 404s.
 *
 * Rewriting them in the content instead would mean touching 173 files now and
 * every one of them again at cutover, and would leave authors writing a base
 * prefix by hand forever. Doing it here keeps the content portable: pages stay
 * written as `/suite/...`, and the mount point stays a single config value.
 *
 * Deliberately narrow -- only `href` on <a> and `src` on <img>, only paths that
 * are site-absolute. External URLs, protocol-relative URLs, anchors, mailto:
 * and anything already carrying the base are left exactly as written.
 */
import { visit } from 'unist-util-visit';

const PREFIXABLE = { a: 'href', img: 'src' };

export function rehypeBaseLinks(base = '') {
	const clean = base.replace(/\/+$/, '');

	const prefix = (value) => {
		// Site-absolute only: skips 'https://…', '//cdn…', '#anchor',
		// 'mailto:', and plain relative links.
		if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return value;
		// Idempotent, so a re-run or an already-prefixed link is untouched.
		if (value === clean || value.startsWith(clean + '/')) return value;
		return clean + value;
	};

	return () => (tree) => {
		if (!clean) return; // mounted at the root -- nothing to do
		visit(tree, 'element', (node) => {
			const attr = PREFIXABLE[node.tagName];
			if (!attr) return;
			node.properties[attr] = prefix(node.properties?.[attr]);
		});
		// Raw <a>/<img> written as JSX inside MDX (the home page hero and topic
		// grid) never become hast 'element' nodes -- they stay mdxJsxTextElement /
		// mdxJsxFlowElement with an attributes ARRAY, so the visitor above walks
		// straight past them. Same prefixing, different shape.
		visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
			const attr = PREFIXABLE[node.name];
			if (!attr) return;
			for (const a of node.attributes ?? []) {
				if (a.type === 'mdxJsxAttribute' && a.name === attr && typeof a.value === 'string') {
					a.value = prefix(a.value);
				}
			}
		});
	};
}
