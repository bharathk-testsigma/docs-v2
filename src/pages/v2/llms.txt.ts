import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { suite } from '../../data/sidebar-suite.mjs';
import { arcus } from '../../data/sidebar-arcus.mjs';
import { withBase } from '../../lib/base';
import { fromRoute } from '../../lib/site-config.mjs';

/**
 * /llms.txt (https://llmstxt.org): one index of every page for AI tools,
 * linking the HTML page rather than its Markdown twin ([...slug].md.ts): a
 * tool tends to cite the URL it read, and a citation should land a reader on
 * the real page. The summary tells tools where the twins are.
 *
 * Sections and their order come from the sidebar config, so this reads like
 * the rail. A page in no configured section (Home, Changelog) is listed under
 * its product.
 */

type Item = { label?: string; slug?: string; items?: Item[]; autogenerate?: { directory: string } };

const PRODUCTS = [
	// Testsigma pages sit at the docs root; everything under arcus/ is Arcus.
	{ name: 'Testsigma', owns: (id: string) => !id.startsWith('arcus/') && id !== 'home', items: suite as Item[] },
	{ name: 'Arcus', owns: (id: string) => id.startsWith('arcus/'), items: (arcus as Item).items! },
];

export const GET: APIRoute = async ({ site }) => {
	// Collection ids carry the version ('v2/x', 'arcus/v2/x'); strip it so they
	// line up with the version-free sidebar data, and withBase() adds it back.
	const docs = (await getCollection('docs', ({ data }) => !data.draft))
		.map((doc) => ({ ...doc, id: fromRoute(`/${doc.id}`).slice(1) }))
		.sort((a, b) => a.id.localeCompare(b.id));
	const page = (id: string) => new URL(withBase(`/${id}/`), site).href;

	let out = `# Testsigma Docs

> Documentation for Testsigma (test automation for web, mobile, desktop, Salesforce, and APIs) and Arcus. Append .md to any page URL (without the trailing slash) for its Markdown version.
`;

	for (const { name, owns, items } of PRODUCTS) {
		// Section label -> its folders and hand-listed slugs, in rail order.
		const sections = new Map<string, { dirs: string[]; slugs: Set<string> }>();
		const add = (label: string) =>
			sections.get(label) ?? sections.set(label, { dirs: [], slugs: new Set() }).get(label)!;
		const walk = (list: Item[], top?: string) => {
			for (const item of list) {
				if (top && item.autogenerate) add(top).dirs.push(item.autogenerate.directory);
				else if (top && item.slug) add(top).slugs.add(item.slug);
				if (item.items) walk(item.items, top ?? item.label);
			}
		};
		walk(items);

		const groups = new Map<string, string[]>([[name, []]]);
		for (const label of sections.keys()) groups.set(`${name}: ${label}`, []);
		for (const doc of docs) {
			if (!owns(doc.id)) continue;
			const hit = [...sections].find(
				([, s]) => s.slugs.has(doc.id) || s.dirs.some((d) => doc.id === d || doc.id.startsWith(`${d}/`))
			);
			const desc = doc.data.description ? `: ${doc.data.description}` : '';
			groups.get(hit ? `${name}: ${hit[0]}` : name)!.push(`- [${doc.data.title}](${page(doc.id)})${desc}`);
		}
		for (const [heading, lines] of groups) {
			if (lines.length) out += `\n## ${heading}\n\n${lines.join('\n')}\n`;
		}
	}

	return new Response(out, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
