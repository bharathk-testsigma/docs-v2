---
name: testsigma-docs-writer
description: Draft pages for the new Testsigma docs site (testsigma-docs-v2) from the Testsigma Documentation Rulebook, using the nav plan to decide what each page covers, and checking the legacy testsigma-docs pages afterwards only to confirm no knowledge was lost. Use this skill whenever the user mentions writing, drafting, or migrating a doc for the new site or docs-v2; names a target doc or section from the nav plan (Getting started, Atto AI, Test authoring, Test execution, Platforms, Reports, Addons, Integrations, Settings); asks to consolidate or merge legacy pages; asks where a page should go on the new site; or asks for a rulebook review of a draft. Trigger this even for a casually phrased request like "write the test data page" or "next doc" — designing from the rulebook rather than from the old pages is the whole point of the skill, and it is the step most easily skipped by hand.
---

# Testsigma docs writer

Design each page from the rulebook. Use the legacy pages only to make sure no knowledge is lost.

**This order matters and is easy to get backwards.** The legacy sources are not a template. They are a fact checklist. If you read them first and then write, you will reproduce their structure with tidier prose — link farms, `Getting help` sections, headings that mirror the old page titles. The result passes a lint and still fails, because the page was designed by the old site.

So: decide what the page should be from `what_is_covered` and the rulebook. Then open the sources to confirm you carried every fact. Then verify.

**Knowledge is retained across the docs set, not necessarily on one page.** The plan maps 535 legacy pages onto 57 target docs, so content moves. A fact that belongs to another target doc goes there, and you say so in your report. What is never acceptable is a fact that lands nowhere.

**The map partitions pages, not facts.** Every legacy page is assigned to exactly one target doc — verified: 535 pages, 535 claimed, no orphans, no page claimed twice. But a fact about *your* topic can sit inside a page owned by another doc. A test-data constraint stated only in `test-plans/overview` is invisible if you read the assigned 43 sources alone. So each doc is checked against the whole repo, not just its column.

## Before you start

Confirm these three paths. Ask if any is unknown — do not guess.

| What | Default | Notes |
|---|---|---|
| Legacy source repo | `../testsigma-docs` | Gatsby. Pages live at `src/pages/docs/<path>.md` |
| Target repo | `.` | `testsigma-docs-v2`, Astro + Starlight |
| Target content root | `src/content/docs/` | Confirm whether pages sit under a `suite/` subdirectory |

The rulebook is in `references/rulebook.md`. **Read it before drafting** — all 127 rules, each tagged with where it came from. The nav plan is `references/nav-map.tsv`.

Build the repo index once per session, before the first doc:

```bash
python3 scripts/index_repo.py --repo ../testsigma-docs
```

That indexes all 535 legacy pages — headings, UI labels, links, term frequencies — so every doc can be checked against the whole corpus cheaply. Reading 535 pages per doc is not feasible; searching an index of them is.

## Workflow

### 1. Resolve the target doc and design it before reading sources

Look it up in the nav map:

```bash
python3 scripts/gather_sources.py --list
python3 scripts/gather_sources.py --doc "Test data"
```

That prints the section, what the page must cover, and every legacy source path. If the user names something not in the map, stop and ask — the map is the agreed scope, and inventing a page outside it creates orphans.

Now, **before opening a single source**, write down:

- The page type from rulebook section 1, and its word budget
- The H2s you expect, derived from `what_is_covered` and the page's job
- What this page delegates to its siblings in the map

Check the whole map for neighbours first. If another target doc owns something, this page links to it rather than covering it. An Overview that contains a first-test procedure has eaten the quickstart page sitting next to it in the plan.

### 2. Gather and read every source

```bash
python3 scripts/gather_sources.py --doc "Test data" --copy-to /tmp/sources
```

Read all of them. Not a sample. A page consolidating 43 sources needs 43 sources read, because the facts are scattered and each source usually contributes two or three that appear nowhere else.

When `legacy_source_count` is 0, there is no source. Draft from product knowledge, mark every uncertain claim, and tell the user which claims need SME confirmation. Never fill a gap with a plausible-sounding invention — see rulebook 8.5.

### 3. Search the whole repo for strays

```bash
python3 scripts/find_strays.py --doc "Test data" --repo ../testsigma-docs
```

This reports two things the assigned column cannot:

- **Strays** — pages owned by another target doc that discuss your topic heavily. Read them. Take the facts that belong on your page; leave the ones that belong to their owner, and record the boundary in your report so the same fact is not written twice.
- **Inbound links** — pages that link into your sources. Their expectations survive the migration, so whatever they were pointing at needs to still exist on your page.

Judgement is required here: a high score means topic overlap, not necessarily a fact you owe. Check, decide, and say what you decided.

### 4. Build a fact inventory before writing prose

Write the inventory to a scratch file first. One line per fact, tagged with its source page. Include:

- Every UI label, field, button, tab, and menu path
- Every constraint, limit, default, and supported/unsupported statement
- Every step in every procedure
- Every warning, note, and error string
- Every cross-reference to another doc

This step is what makes retention possible. Drafting straight from the sources reliably loses facts, because the ones that go missing are the ones buried mid-paragraph in the fourth source.

### 5. Check the inventory against the structure you already chose

You already chose the structure in step 1. Now check the inventory against it: every fact needs a home, and any fact with nowhere to go means either the structure is missing a section or the fact belongs to a different target doc.

Change the structure only when a fact genuinely demands it. **Never restructure because a source was organised a certain way** — the number of legacy pages behind a target doc says nothing about how many sections it should have, and their headings say nothing about what yours should be.

Structure comes from the page's job and from `what_is_covered`, which sometimes prescribes it outright ("One page, H2 per component" means exactly that). Shapes that follow from a page's job, not from its sources:

- **One H2 per component** when the page documents parallel things a reader picks between
- **One H2 per lifecycle stage** when the page covers an object a reader creates, changes, and removes
- **A reference table** when the content is a catalog a reader scans for one row
- **Symptom or exact-error H2s** for troubleshooting content (rulebook 4.10), grouped at the end

If a page genuinely holds two page types, say so and propose a split rather than shipping a hybrid.

### 6. Draft against the rulebook

Apply `references/rulebook.md`. The rules most often broken when consolidating:

- **Openings (3.x)** — one scope paragraph, ≤45 words, no `This article discusses`. The sources will all have banned openers; none survive.
- **Headings (4.x)** — sentence case, no bold wrapping, never `Steps to…`. Every source violates this.
- **Callouts (10.x)** — two types only, `:::note` and `:::danger`. Destructive actions get `:::danger`. Legacy pages route data-loss warnings through notes; fix that rather than carrying it over.
- **Verbs (11.5)** — click buttons, select options, enter text.
- **NLP strings (12.3)** — reproduce verbatim, including `Click on …`. Rule 11.5 does not apply inside an NLP step.
- **Duplication** — sources repeat setup steps constantly. State shared procedures once and have later sections build on them.
- **Link farms** — legacy pages end in stacked `Getting Started`, `Next Steps`, `Related Articles`, and `Getting Help` blocks. Rulebook 15.2 removes them. Support channels, community links, and tutorial-course links are site chrome; they belong in the footer or a support page, not repeated on every doc.
- **Delegating properly (1.4)** — a section that is only a list of links to other docs is not content. Either say something the reader can use, or let the sidebar do the job.

### 7. Verify retention, then fix

```bash
python3 scripts/verify_coverage.py --doc "Test data" --draft path/to/draft.md
```

This extracts every bolded UI label and every documentation link from the sources and reports what is missing from the draft. It also lints the draft against the mechanical rules.

Treat every reported miss as a real loss until you have checked it. Some are wording artifacts — the checker matches on strings, so a plural or a rephrase reads as missing. Some are deliberate cuts. **Both need stating explicitly to the user, per item.** Never report a clean verification you did not run.

Re-run until the only remaining items are ones you can name and justify.

### 8. Report

Tell the user:

1. Where the file was written
2. How many sources were consumed, plus any strays read, and the word count
3. Which facts you deliberately cut, and why
4. Which facts you left to another target doc, and which doc
5. Which claims need SME confirmation
6. Whether the page still exceeds its type's word budget, and whether it should be split

Then update the ledger:

```bash
python3 scripts/coverage.py --drafts <drafts-dir> --repo ../testsigma-docs
```

This reports how many of the 535 legacy pages have been consumed by a written doc. Per-doc verification proves one page kept its facts; this proves the set did. A legacy page still unconsumed when the migration ends is lost knowledge.

## What deliberate cuts look like

Consolidation means dropping content. It does not mean dropping facts. The difference:

**Safe to cut** — evaluative language ("powerful", "seamlessly", "This will save you much time"); sentences restating the heading; repeated setup steps; screenshots that only confirm a thing exists; self-links; testing-theory boilerplate describing what a test plan is in the abstract when the product has no such field.

**Never cut** — any UI label, field, or menu path; any constraint or limit; any supported/unsupported statement; any step; any error string; any warning; any cross-reference to a doc that still exists.

If unsure, keep it and flag it. A slightly long page is recoverable; a lost constraint reaches a customer.

## Common traps

**The sources contradict each other.** Two legacy pages describe the same dialog differently. Do not average them. Pick the more recent or more specific, and flag the conflict for product confirmation.

**A source is mostly a screenshot.** Several legacy pages hold their real content in a PNG — NLP catalogs especially. A screenshot is not searchable, translatable, or readable by a screen reader. Rebuild it as a table, and if the values are only legible in the image, mark them `TO TRANSCRIBE` rather than guessing.

**A source is already stale.** Legacy pages reference removed UI. If a claim cannot be confirmed against the product, flag it rather than migrating it.

**The nav map has notes.** Rows carry instructions like "verify cells against product", "ASSUMPTION pending confirmation", or "Recorder sunsets in ~6 months". Honor them; they are decisions someone already made.
