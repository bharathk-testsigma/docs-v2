/**
 * Editorial budget check for the hand-written doc pages.
 *
 * The docs-v2-writer rules turn style into countable limits (median sentence
 * length, intro length, callout count, page cap per page type). Nothing else in
 * the repo measures them, so a page can drift over a cap and still build and
 * still look fine -- which is exactly how a 4,600-word "task" page happens.
 *
 * Only pages that DECLARE `pageType` are checked: that field is the opt-in, so
 * the 50 generated API pages and the not-yet-rewritten ported pages are skipped
 * rather than reported as 60 failures.
 *
 * The last two tests are publishing hygiene rather than editorial budget: they
 * check what `src/pages/[...slug].md.ts` actually serves. They live here
 * because this file already walks every page.
 *
 * Run `npm test`. Set VERBOSE=1 to print the full per-page table.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { stripMdx } from '../src/lib/strip-mdx.mjs';

const ROOT = new URL('../src/content/docs/', import.meta.url).pathname;

/**
 * Caps per page type. `null` = uncapped.
 * - `reference` — W-18: length follows the table, so there is nothing to cap.
 * - `guide` — a single-page hub whose H2s are reached from a hero card grid.
 *   It merges what W-40 would split, so the per-type caps and the 3-callout
 *   limit (W-24) do not apply. Every OTHER budget still does.
 */
const PROSE_CAP = { task: 600, concept: 900, overview: 250, reference: null, guide: null };

/** Page types exempt from W-24, for the reason above. */
const CALLOUT_EXEMPT = new Set(['guide']);

function walk(dir) {
	return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
		e.isDirectory()
			? walk(join(dir, e.name))
			: /\.mdx?$/.test(e.name)
				? [join(dir, e.name)]
				: []
	);
}

const words = (s) => (s.trim() ? s.trim().split(/\s+/).length : 0);

/** Frontmatter is only read for scalars, so a YAML parser would be a dependency for three regexes. */
const fmValue = (fm, key) =>
	fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1].trim().replace(/^['"]|['"]$/g, '');

/**
 * Body text with everything that is not prose removed: code fences, MDX
 * comments, JSX tags, import lines, and table rows. Table rows come out
 * because a table's WORDS are data, not prose -- W-27 puts the prose in the
 * lead-in sentence above it -- but they are counted separately so a page
 * cannot hide bulk inside a grid.
 */
function stripToProse(body) {
	const noCode = body
		.replace(/^```[\s\S]*?^```/gm, '')
		.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
		.replace(/^import .*$/gm, '');
	const lines = noCode.split('\n');
	const tableRows = lines.filter((l) => /^\s*\|/.test(l));
	const prose = lines
		.filter((l) => !/^\s*\|/.test(l))
		.join('\n')
		.replace(/^<\/?[A-Z][^>]*>\s*$/gm, '') // component tags on their own line
		.replace(/<\/?[A-Za-z][^>]*>/g, '') // inline tags
		.replace(/^#{1,6} .*$/gm, '') // headings are not prose
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // link text, not the URL
		.replace(/[*_`]/g, '');
	return { prose, tableRowCount: tableRows.length };
}

function sentenceLengths(prose) {
	return prose
		.split('\n')
		.filter((l) => l.trim() && !/^\s*[-–]\s/.test(l)) // bullets are fragments, not sentences
		.join('\n')
		// A line ending in ':' introduces a list. Bullets are already gone, so
		// without this the lead-in glues onto the paragraph AFTER the list and
		// reads as one 28-word sentence that was never written.
		.split(/(?<=[.!?:])\s+/)
		.map((s) => words(s.replace(/[.!?:]+$/, '')))
		.filter((n) => n > 2);
}

const percentile = (nums, p) => {
	const sorted = [...nums].sort((a, b) => a - b);
	return sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))] ?? 0;
};

function measure(file) {
	const src = readFileSync(file, 'utf8');
	const m = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!m) return null;
	const [, fm, rawBody] = m;
	// The `## FAQs` appendix is exempt from the prose caps. Decision (July
	// 2026): help-centre Q&A migrates INTO feature pages rather than living as
	// separate FAQ pages, so a page's FAQ tail scales with how much its feature
	// gets asked about — capping it would force that content back out to
	// standalone pages, which is the exact thing the decision retired. The caps
	// still bind the page's own body. (This also supersedes W-43's FAQ ban;
	// see rules/_conflicts.md §5.)
	const body = rawBody.split(/^## FAQs\s*$/m)[0];

	const pageType = fmValue(fm, 'pageType');
	if (!pageType) return null;

	// A splash page (the two product homes) is a hero, a card grid and a
	// diagram, not prose. Every budget here measures sentences, and on such a
	// page a "sentence" is whatever adjacent labels the stripper glued together
	// -- "Test cases Step types Elements Test data Run tests Suites, plans..."
	// is nineteen words of nav, not a nineteen-word sentence. Their editorial
	// contract is the `mdSummary` twin in frontmatter, which IS prose.
	if (fmValue(fm, 'template') === 'splash') return null;

	// Intro = prose between the last import and the first heading (W-04).
	const beforeFirstHeading = body.split(/^## /m)[0];
	const { prose, tableRowCount } = stripToProse(body);
	const intro = stripToProse(beforeFirstHeading).prose;
	const lens = sentenceLengths(prose);

	const hasRelated = /^## Related\s*$/m.test(body);

	// A page that declares `covers:` documents several routes through one
	// feature, so the 600-word task cap fights the thing that matters more --
	// covering all of them. Such a page gets the concept ceiling (900) instead.
	// Deliberately NOT uncapped: unbounded is how a 4,600-word page happens.
	const coversCount = (fm.match(/^covers:\n((?:\s+-\s+.*\n?)+)/m)?.[1].match(/^\s+-\s+/gm) ?? [])
		.length;
	const cap = coversCount > 1 && pageType === 'task' ? 900 : PROSE_CAP[pageType];

	return {
		cap,
		coversCount,
		file: relative(ROOT, file),
		pageType,
		verified: fmValue(fm, 'verified'),
		descWords: words(fmValue(fm, 'description') ?? ''),
		introWords: words(intro),
		proseWords: words(prose),
		tableRowCount,
		median: percentile(lens, 50),
		p90: percentile(lens, 90),
		callouts: (body.match(/<Aside\b/g) ?? []).length,
		screenshots: (body.match(/SCREENSHOT NEEDED/g) ?? []).length,
		unverified: (body.match(/UNVERIFIED/g) ?? []).length,
		hasRelated,
		maxDepth: Math.max(0, ...(body.match(/^#{2,6} /gm) ?? []).map((h) => h.trim().length)),
	};
}

const pages = walk(ROOT).map(measure).filter(Boolean);

// Guard against the walk or the frontmatter match silently breaking and turning
// every budget below into a vacuous pass over an empty list.
test('the budget check found pages to measure', () => {
	assert.ok(pages.length >= 10, `only ${pages.length} pages declare pageType`);
});

if (process.env.VERBOSE) {
	const row = (p) =>
		[
			p.file.padEnd(48),
			p.pageType.padEnd(9),
			String(p.median).padStart(3),
			String(p.p90).padStart(4),
			String(p.introWords).padStart(5),
			String(p.descWords).padStart(5),
			String(p.proseWords).padStart(6),
			String(p.tableRowCount).padStart(4),
			String(p.callouts).padStart(4),
			String(p.screenshots).padStart(4),
			String(p.hasRelated ? 1 : 0).padStart(4),
			String(p.maxDepth - 1).padStart(3),
		].join(' ');
	console.log(
		['file'.padEnd(48), 'type'.padEnd(9), 'med', ' p90', 'intro', ' desc', ' prose', ' tbl', ' cal', ' scr', ' rel', '  h'].join(' ')
	);
	pages.forEach((p) => console.log(row(p)));
}

test('W-01: median sentence is at most 14 words', () => {
	const bad = pages.filter((p) => p.median > 14);
	assert.deepEqual(bad.map((p) => `${p.file}: ${p.median}`), []);
});

test('W-02: 90th-percentile sentence is at most 26 words', () => {
	const bad = pages.filter((p) => p.p90 > 26);
	assert.deepEqual(bad.map((p) => `${p.file}: ${p.p90}`), []);
});

test('W-04: intro before the first heading is 30-45 words', () => {
	const bad = pages.filter((p) => p.introWords < 30 || p.introWords > 45);
	assert.deepEqual(bad.map((p) => `${p.file}: ${p.introWords}`), []);
});

test('W-07: description is 9-24 words', () => {
	const bad = pages.filter((p) => p.descWords < 9 || p.descWords > 24);
	assert.deepEqual(bad.map((p) => `${p.file}: ${p.descWords}`), []);
});

test('W-15/16/17: prose stays under the cap for the page type', () => {
	const bad = pages.filter((p) => p.cap && p.proseWords > p.cap);
	assert.deepEqual(
		bad.map((p) => `${p.file}: ${p.proseWords} > ${p.cap}`),
		[]
	);
});

test('W-24: 0-3 callouts per page', () => {
	const bad = pages.filter((p) => !CALLOUT_EXEMPT.has(p.pageType) && p.callouts > 3);
	assert.deepEqual(bad.map((p) => `${p.file}: ${p.callouts}`), []);
});

test('W-31: at most 3 screenshots on a task page', () => {
	const bad = pages.filter((p) => p.pageType === 'task' && p.screenshots > 3);
	assert.deepEqual(bad.map((p) => `${p.file}: ${p.screenshots}`), []);
});

// W-34 (2-4 Related links) RETIRED 2026-08-19: Related sections were removed
// site-wide (Bharath's call); the sidebar and inline links carry navigation.
// The inverse now holds: no page may carry a Related section at all.
test('W-34 inverse: no Related sections anywhere', () => {
	const bad = pages.filter((p) => p.hasRelated);
	assert.deepEqual(bad.map((p) => p.file), []);
});

test('W-10: headings stop at h3', () => {
	const bad = pages.filter((p) => p.maxDepth > 4);
	assert.deepEqual(bad.map((p) => `${p.file}: h${p.maxDepth - 1}`), []);
});

test('W-13: no heading is a question', () => {
	const bad = walk(ROOT)
		.filter((f) => measure(f))
		.flatMap((f) => (readFileSync(f, 'utf8').match(/^#{2,6} .*\?\s*$/gm) ?? []).map((h) => `${relative(ROOT, f)}: ${h}`));
	assert.deepEqual(bad, []);
});

test('frontmatter: verified is YYYY-MM', () => {
	const bad = pages.filter((p) => !/^\d{4}-\d{2}$/.test(p.verified ?? ''));
	assert.deepEqual(bad.map((p) => `${p.file}: ${p.verified}`), []);
});

/**
 * On a `guide` page the hero cards ARE the sub-navigation, so a card pointing at
 * an anchor no heading produces is dead nav that still builds and still renders.
 * github-slugger is what Starlight uses for heading ids; the subset below (lower,
 * strip punctuation, spaces to hyphens) covers every heading on these pages.
 */
const slug = (text) =>
	text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');

test('in-page card anchors resolve to a heading on the same page', () => {
	const bad = walk(ROOT).flatMap((file) => {
		const src = readFileSync(file, 'utf8');
		const headings = new Set(
			(src.match(/^#{2,6} .+$/gm) ?? []).map((h) => slug(h.replace(/^#+\s*/, '')))
		);
		return [...src.matchAll(/href="#([^"]+)"/g)]
			.map((m) => m[1])
			.filter((anchor) => !headings.has(anchor))
			.map((anchor) => `${relative(ROOT, file)}: #${anchor}`);
	});
	assert.deepEqual(bad, []);
});

/**
 * Coverage, not form. A `covers:` entry per route/mode/option the product offers
 * on this page; each must have a heading. This exists because every other check
 * here measures style, so a page documenting 2 of 4 authoring routes passed all
 * of them -- form was enforced and completeness was assumed.
 */
test('covers: every declared feature route has a heading', () => {
	const bad = walk(ROOT).flatMap((file) => {
		const src = readFileSync(file, 'utf8');
		const fm = src.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
		const block = fm.match(/^covers:\n((?:\s+-\s+.*\n?)+)/m)?.[1];
		if (!block) return [];
		const headings = (src.match(/^#{2,6} .+$/gm) ?? []).map((h) =>
			slug(h.replace(/^#+\s*/, ''))
		);
		return block
			.split('\n')
			.map((l) => l.replace(/^\s*-\s+/, '').trim().replace(/^['"]|['"]$/g, ''))
			.filter(Boolean)
			.filter((item) => !headings.includes(slug(item)))
			.map((item) => `${relative(ROOT, file)}: no heading for "${item}"`);
	});
	assert.deepEqual(bad, []);
});

test('T-28: no UNVERIFIED marker survives review', () => {
	const bad = pages.filter((p) => p.unverified > 0);
	assert.deepEqual(bad.map((p) => `${p.file}: ${p.unverified}`), []);
});

/**
 * Retired wording. A banned phrase is one that reads as vague or off-domain for
 * a testing product, where a precise alternative always exists. Checked against
 * the RAW source (frontmatter included, since descriptions and `covers:` entries
 * are prose readers see) rather than the stripped body.
 *
 * "by hand" was retired site-wide (Aug 2026): it says nothing about the
 * mechanism. In this product the manual route means typing NLP steps, so the
 * heading is "Create tests manually using NLPs", not "Write steps by hand" —
 * and readers search for "create", which the old wording never matched.
 *
 * Add a row when a phrase is retired; keep `instead` specific enough to act on.
 */
const RETIRED_PHRASES = [
	{ pattern: /\bby hand\b/gi, instead: '"manually", or name the mechanism ("manually using NLPs")' },
];

test('style: retired phrases stay retired', () => {
	const bad = walk(ROOT).flatMap((file) => {
		const src = readFileSync(file, 'utf8');
		return RETIRED_PHRASES.flatMap(({ pattern, instead }) => {
			const hits = src.match(pattern) ?? [];
			return hits.length
				? [`${relative(ROOT, file)}: ${hits.length}× "${hits[0]}" — use ${instead}`]
				: [];
		});
	});
	assert.deepEqual(bad, []);
});

// A1 (content audit, 8 Sep 2026): 25 pages leaked `{/* SCREENSHOT NEEDED */}`
// comments into their `.md` export, where "View as Markdown" and the Open in
// Claude/ChatGPT buttons show them to readers. stripMdx now removes them; this
// is the assertion that keeps it that way, since the leak is invisible in the
// rendered HTML and so cannot be caught by looking at the site.
const LEAKS = [
	{ pattern: /\{\/\*/, what: 'MDX comment' },
	{ pattern: /<style\b/i, what: '<style> block' },
	{ pattern: /<script\b/i, what: '<script> block' },
	{ pattern: /^\s*(?:import|export)\s/m, what: 'import/export statement' },
];

test('A1: no build scaffolding survives into the .md export', () => {
	const bad = walk(ROOT).flatMap((file) => {
		// Fenced samples come back out of stripMdx verbatim, and a sample may
		// legitimately contain `import`, `<style>` or `{/*`. Drop them: the
		// question is whether SCAFFOLDING leaked, not what the samples show.
		const exported = stripMdx(readFileSync(file, 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '')).replace(
			/^```[\s\S]*?^```/gm,
			''
		);
		return LEAKS.filter(({ pattern }) => pattern.test(exported)).map(
			({ what }) => `${relative(ROOT, file)}: ${what}`
		);
	});
	assert.deepEqual(bad, []);
});

// B4: the Prerequisites box keeps its label inside the component, so without
// the substitution in stripMdx the export shows a bare bullet list with nothing
// marking it as a gate -- which is exactly what the audit measured on 44 pages.
test('B4: <Prerequisites> exports as a heading', () => {
	const bad = walk(ROOT).flatMap((file) => {
		const src = readFileSync(file, 'utf8');
		if (!src.includes('<Prerequisites>')) return [];
		return stripMdx(src).includes('## Prerequisites') ? [] : [relative(ROOT, file)];
	});
	assert.deepEqual(bad, []);
});
