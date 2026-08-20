---
name: help-docs-writing-skill
description: Turn raw product context (PRDs, Jira tickets, engineer notes, Slack threads, PDFs, or existing pages) into clear, production-quality help documentation. Preserve product truth, improve information architecture, and follow conventions used by best-in-class doc sites such as Stripe, Vercel, Mintlify, and GitHub CLI.
---

# Help Docs Writing Skill

Use this skill to write, edit, review, or restructure help documentation from raw input.

## 0. Intake (do this before drafting)

Every raw source (ticket, PRD, thread, PDF, existing page) goes through four steps before you write a sentence.

1. **Extract** the essentials from the source. Keep only:
   - Product facts, exact UI labels, defaults
   - Limits, quotas, permissions, plan gating
   - Error messages and what triggers them
   - Supported paths and workflows

   Drop rollout dates, owners, acceptance criteria, internal rationale, and roadmap notes.

   If the source is a transcript, thread, or meeting notes, find the actual product decision. Ignore hypotheticals, rejected options, and side debates.

2. **Classify** the page into one primary type. One page, one type.
   - **Conceptual**: reader is learning *what* or *why*
   - **How-to**: reader is doing a specific task
   - **Reference**: reader is looking up a value, field, or option
   - **Troubleshooting**: reader is stuck and needs symptom → fix

   Blur these only when the doc system already blurs them and it helps the reader.

3. **Locate** the page that should own this content.
   - Editing an existing page almost always beats creating a new one.
   - **Do not draft until you know whether this is a new page or an edit to an existing one.** If you do not know, ask.

4. **Gap-flag** what the source doesn't answer. It becomes `TODO(owner): question`. Never invent product behavior to fill a gap.

## Core approach

1. **Understand the reader's job.** What are they trying to do, and where in the workflow does this page sit?

2. **Sources are evidence, not structure.** Preserve product truth. Reorganize freely when the source order is not the clearest order for the reader.

3. **Information flow before sentence polish.** Reader's goal first, decisions next, deep reference later. Split distinct jobs onto separate pages when it makes each page faster to use.

4. **Write simply.**
   - Second person, present tense: "Testsigma runs the suite on push," not "will run."
   - Say what the product **does**, not what it **can do**.
   - Short, direct, active sentences.
   - Sentence case in headings. Task- or question-shaped.
   - Product UI labels in **bold**, with exact casing: **Settings → Billing**.
   - Code, paths, and identifiers in `mono`.
   - Contractions are fine: *don't, you'll, can't*. They read more human than buttoned-up formal prose.
   - Pick the product's canonical term once. Use it every time on the page. Do not swap in synonyms for variety.
   - See §Sound human, not generated for the specific words and patterns to cut.

5. **Use the right element for the content.**
   - Numbered steps for procedures.
   - Bullets for short parallel lists.
   - Tables for comparison and reference.
   - Code blocks for commands, config, and exact examples.
   - Callouts only when they help the reader decide or avoid a mistake (see §Callouts).

6. **Visuals.** Use supplied screenshots or diagrams. Never fabricate UI. If a visual is needed but missing, describe exactly what is needed. For example: "screenshot of **Test Case** editor with **Data-driven** toggle on, light and dark."

## Sound human, not generated

AI-written docs have tells. Remove them on sight. These are patterns to cut by default, not absolute bans; keep the rare instance that's genuinely doing work instead of contorting a sentence to avoid one word.

- **No em dashes for asides.** Use a period, comma, or parentheses. An em dash on every third sentence reads as generated, not written. (This doesn't touch the en dash in a numeric range like 12-18; that's a different mark and it's fine.)
- **No empty intensifiers.** Cut *seamless, robust, powerful, leverage, utilize, streamline, unlock, elevate, cutting-edge, game-changer*. Say what the thing does instead of praising it.
- **No stock transitions.** Cut *Additionally, Furthermore, Moreover, Overall, In today's fast-paced world, In conclusion*. The next sentence should stand on its own.
- **No throat-clearing.** Cut *It's important to note that, It's worth mentioning, Keep in mind that*. State the fact.
- **No filler justification after every step.** Don't tack "This ensures/allows/enables you to..." onto each action. Explain why only when the why is non-obvious.
- **No false contrast.** Avoid "It's not just X, it's Y." State the one true thing.
- **Vary sentence length.** Not every sentence should run 12 to 18 words with the same rhythm. Let some be short.
- **Don't restate the heading.** The sentence under a heading should add information, not repeat it in longer form.
- **No summary-of-summary endings.** Don't recap the page in miniature at the bottom. If the page needs a recap, the page is too long.

## Source disagrees with product

If the raw source contradicts current product behavior, or is silent on a required detail:

**Stop. Flag with `TODO(owner): <question>`. Do not guess. Do not publish inferred behavior.**

This is the most important rule in this skill.

## Page length and scope

- **One page, one goal.** If a how-to covers more than one goal, split it.
- **Too long:** more than about seven steps, or the reader scrolls past the first task to reach a second. Split it.
- **Too short:** fewer than about 100 words of unique content. Fold it into the parent page instead of standing alone.

## Numbered-step hygiene

- One step per screen or decision, not one step per field. Filling several fields on the same form is one step. Moving to a new screen, dialog, or confirmation is a new step. Split "click X, then click Y in the next dialog" into two steps.
- Start each step with an imperative verb: *Open*, *Select*, *Enter*, *Confirm*.
- Put verification at the end of the procedure, not inside a step.
- Prerequisites go in a block above step 1, not hidden inside step 1.

## Link vs inline

- **Link** when the concept has its own page and the reader can safely skip it.
- **Inline** a one-sentence definition on first use so the reader can keep going without clicking.
- Do not repeat what the linked page already explains. If you are tempted to explain it in full, the link is wrong or the page structure is wrong.

## Page anatomy

Every page has a top, body, and bottom. Fill only what applies. **Short pages (under ~300 words) skip the bottom scaffolding.** On a short page it's just noise.

**Top**
- Frontmatter: only fields your CMS uses (see §Frontmatter).
- H1 that contains the phrase a reader would actually search for.
- One-sentence description under the H1: what the page delivers, in up to 160 characters. It doubles as the search snippet. Skip this line if your CMS already renders the frontmatter description on-page; don't duplicate it in the body.
- Status badge next to the H1 when relevant: **New**, **Beta**, **Deprecated**.
- Audience escape hatch when more than one reader might land here:
  > *Just getting started? See [Quickstart].*
  > *Not a developer? See [No-code guide].*

**Body**
- One primary page type (from Intake §2).
- Progressive disclosure: the shortest useful answer up top, edge cases and reference below.

**Bottom (longer pages and landing pages only)**
- Verification: "You'll know it worked when…"
- Next steps: two to four items, each with a **bold label** and a one-line description.
- Related links: a short deterministic list, not prose "see also."
- Escape hatch when the page is a common mis-landing: *Not what you're looking for? → [related area]*.

## Page-type patterns

### Conceptual (what and why)
What it is, why it exists, when to use it, when not to. No steps. Link out to how-to pages for the doing.

### How-to (a task)
- One-sentence goal.
- Prerequisites block, only if truly required.
- Shortest reliable numbered sequence (see §Numbered-step hygiene).
- Verification step.
- Common errors and fixes, or a link to troubleshooting.

### Reference (a lookup)
Table-heavy, no narrative. Slot-fill from the source: name, type, default, description, dependencies.

For **API or CLI reference**, add: base URL or synopsis, auth, options table (short flag, long flag, type, default, description), request and response examples, and an error table.

### Troubleshooting
Symptom → Cause → Fix, one row per symptom. Put the exact error string in the heading so search can find it.

### Quickstart
Install → Authenticate → First successful action → Progressive features → Customization. Prereqs before payoff. Never bury the first win.

### Pricing
Lead with the pricing model. Show meaningful tiers, limits, and one worked example. Put caveats next to the number they qualify.

### FAQ
Use it for questions users actually ask, not questions you wish they would ask. Prefer folding answers into the main page unless the question is a genuine off-ramp.

## Code and CLI samples (when the page has code)

- Minimal, complete, runnable. No `...` placeholders.
- Real values, not `foo` or `bar`.
- One success case and one representative error.
- Language or framework tabs when the product supports multiple. Keep snippets parallel across tabs.
- Include filename and highlighted lines in the code fence when the source says "add these lines to that file."
- Inline the API method and path as a badge, not bare text: `POST /v1/charges`.

## Callouts

Your CMS decides the exact set. In practice, five buckets cover the ground:

- **Note**: neutral aside.
- **Tip**: optional improvement.
- **Check**: verification, "how you know it worked."
- **Warning**: non-destructive watch-out.
- **Danger**: irreversible, data loss, or security consequence.

Place each callout next to the step or behavior it affects. If a page has more than three callouts, most of them should be prose or steps.

## Frontmatter

Only include fields your CMS uses. Common ones: `title`, `description`, `sidebar_label`, `type`, `applies_to`. Skip anything the CMS ignores.

When existing pages from the same source are available, read their actual frontmatter and mirror that schema instead of guessing from the generic list above. The real schema is always more reliable than a generic guess.

## Visuals

- Paired light and dark image assets when the doc site supports theme switching (`name-light.png` and `name-dark.png`).
- Alt text describes the content, not "screenshot of…"
- Screenshots go stale. Prefer callout-annotated crops over full-screen shots.
- Use diagrams for workflows, state transitions, decisions, or system relationships. Label the user's actions and the outcomes. Skip decorative diagrams.

## Worked example: raw ticket to published page

**Input (Jira excerpt):**
> TS-4211 — Add data-driven toggle to Test Case editor. Owner: @arjun. Target: Q3. AC: toggle visible for Pro+, persists across sessions, defaults off. Rollout behind flag `dd_editor_v2`. See PRD.

**Extracted:**
- New control: **Data-driven** toggle in the Test Case editor.
- Availability: Pro plan and above.
- Default: off. Persists across sessions.

**Dropped:** ticket ID, owner, target date, flag name, PRD link, "AC:".

**Classified:** how-to (turning it on) + a reference row (in the editor's field table). Two touchpoints, not a new page.

**Located:** edit the existing *Test Case editor* page. Add a **Data-driven testing** section and a row in the fields table.

**Gap-flagged:** `TODO(@arjun): what data sources does the toggle accept: CSV only, or also Excel and DB?`

**Draft (excerpt):**

> ### Run a test case with multiple data sets
>
> Use the **Data-driven** toggle to run the same test case across rows of input data.
>
> **Availability:** Pro plan and above.
>
> 1. Open the test case in the **Test Case** editor.
> 2. Turn on **Data-driven**.
> 3. Select a data source. `TODO(@arjun): confirm supported source types.`
> 4. Save the test case.
>
> **Check:** the case header shows a **Data-driven** badge, and the **Runs** tab lists one run per data row.

Notice: the rollout date, flag name, and ticket ID never appear. The gap is flagged, not guessed.

## Review (before you ship)

- **Same job?** The page still serves the reader's original need.
- **Same truth?** No product behavior added, removed, or altered.
- **Better flow?** The main task is faster to find and do.
- **No damage?** No prerequisite, warning, limit, or security note was buried or dropped.
- **Complete?** Supported paths and important edge cases still covered.
- **Clear?** A cold reader can act without background explanation.
- **Consistent?** Terminology, UI labels, examples, and callout types match the rest of the doc set.
- **Gaps flagged?** Every unknown is a `TODO(owner)`, not a guess.
- **Right size?** No page over-long or under-fed (see §Page length and scope).
- **Sounds human?** No em-dash overuse, stock transitions, or filler justification (see §Sound human, not generated).
- **Visuals valid?** No fabricated UI. Missing visuals explicitly requested.

If you used outside sources beyond the supplied material, mark them clearly.

## Output standard

Production documentation: clear purpose, obvious hierarchy, concise prose, actionable steps, real examples, accurate product behavior, appropriate visuals, no documentation-about-documentation, and no invented facts.
