/**
 * Pulls the procedures out of a page's MDX for schema.org HowTo markup.
 *
 * One procedure per `<Steps>` block, named after the nearest `##`/`###`
 * heading above it. Each step is the first paragraph of a top-level list
 * item, flattened to plain text; screenshots, code and nested sub-steps stay
 * on the page. Generated from the source rather than written by hand so the
 * markup can never drift from the steps the reader sees.
 *
 * ponytail: assumes `<Steps>` and its list start at column 0 (true for every
 * page today); an indented block, e.g. inside a <TabItem>, is skipped.
 */

/**
 * Markdown to plain text. Inline code is kept verbatim, so a placeholder like
 * `<project_id>` is not mistaken for a tag.
 * @param {string} s
 */
const plain = (s) =>
	s
		.split(/(`[^`]*`)/)
		.map((part, i) =>
			i % 2
				? part.slice(1, -1)
				: part
						.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
						.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
						.replace(/<\/?[A-Za-z][^>]*>/g, '')
						.replace(/\*\*/g, '')
		)
		.join('')
		.replace(/\s+/g, ' ')
		.trim();

/**
 * @param {string} body raw MDX
 * @returns {{ name: string | null, steps: string[] }[]}
 */
export function extractHowTos(body) {
	/** @type {{ name: string | null, steps: string[] }[]} */
	const howTos = [];
	/** @type {string | null} */
	let heading = null;
	/** @type {string[][] | null} */
	let items = null;
	let open = false;

	// Column-0 fences only: a `## ` inside a code sample is not a heading.
	for (const line of body.replace(/^```[\s\S]*?^```/gm, '').split('\n')) {
		if (!items) {
			const h = /^#{2,3}\s+(.+)$/.exec(line);
			if (h) heading = plain(h[1]);
			else if (/^<Steps>\s*$/.test(line)) items = [];
			continue;
		}
		if (/^<\/Steps>\s*$/.test(line)) {
			const steps = items.map((p) => plain(p.join(' '))).filter(Boolean);
			// A single step is not a procedure.
			if (steps.length > 1) howTos.push({ name: heading, steps });
			items = null;
			continue;
		}
		const item = /^\d+\.\s+(.*)$/.exec(line);
		if (item) {
			items.push([item[1]]);
			open = true;
		} else if (!line.trim()) {
			open = false;
		} else if (open && items.length) {
			// A wrapped line of the item's first paragraph.
			items[items.length - 1].push(line);
		}
	}
	return howTos;
}
