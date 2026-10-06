---
title: Testsigma Product Context — Master Reference
indexed: false
indexed_note: >
  NOT embedded into the retrieval corpus as of 2026-09-02. Kept as a human
  product reference only. Its keyword lines made it outrank the real doc pages
  on the questions it covered, so every error in it became systemic: it
  invented a POST /test_cases endpoint and a sixth authoring route, and §27's
  "four routes ... freely mixable in one test" made the assistant present Atto
  as a way to add steps to an existing test case. The doc pages carry the
  correct framing ("Atto generates whole test cases ... rather than steps for
  one flow"). Re-enable only after §27 is split into create-a-test-case vs
  add-steps and the file is audited against the current docs.
purpose: Single-source product context for a RAG documentation assistant
source: Live product walkthroughs, screen recordings, and product demo videos
source_date: 2026-07-01
compiled: 2026-07-30
revised: 2026-09-02
revision_note: >
  Scope narrowed to navigation and context for Testsigma. Reference-grade content
  (per-widget, per-endpoint, per-function detail) intentionally removed and
  left to the product documentation. Classic/Modern lifecycle claim corrected.
products_covered: Testsigma, Atto
status: Verified content only. Unverified claims are marked inline. Gaps are recorded in §29, never guessed.
confidence: "Internal consistency is verified. Product facts rest on UI captures and documentation of varying age; markers [unverified], [confirmed], [corrected], and [source] carry that per claim and must survive into answers."
staleness_warning: "Source is dated 2026-07-01. Anything marked Beta, In-Progress, or `volatility: high` is two months past verification and should be re-checked before it is stated as current."
---

# Testsigma Product Context — Master Reference

Every fact here traces to a UI capture or to Testsigma's own documentation.
Nothing is inferred, extrapolated, or filled in from general testing-tool
knowledge. Where the sources are silent, the gap is recorded in **§29 Known
Gaps** rather than guessed at. Where they were wrong, the correction is marked.

---

## §0 How to use this document as retrieval context

`product: all` `keywords: index, chunking, retrieval rules, metadata, how to use`

**Chunking model.** Each numbered section (`§1`–`§28`) is written to stand
alone and is the intended chunk boundary. Subsections marked `####` can be
split further without losing meaning, because each one re-states its parent
feature.

**Retrieval rules to encode in the index:**

1. **Echo UI labels verbatim.** Button text, tab names, menu items, and field
   labels in this document are exact. Do not paraphrase them ("Save to
   Library", not "save it to the library").
2. **Stack gating.** Anything touching Unified Mobile is Modern-stack only.
   Those chunks carry `stack: modern`. Never present a Unified Mobile
   capability to a Classic-stack question.
3. **Recency flag.** Source date is 2026-07-01. Beta and In-Progress features
   carry `volatility: high` and must trigger a "verify current behavior"
   caveat in any answer built from them.
4. **Unverified markers travel with the claim.** Where a fact is marked
   `[unverified]` inline, that marker must survive into the answer. Do not
   promote an unverified claim to a stated fact.
5. **API answers come from §31 only.** The Testsigma REST API surface is
   enumerated in §31. Answer from that list verbatim. If an operation is not
   on it, say so — do not infer an endpoint from REST convention or from the
   existence of a sibling operation. Creating test cases and creating projects
   are specifically absent.
6. **Gaps are answerable.** §29 lists what this document does not cover.
   Retrieving §29 and saying "not covered here" is a correct answer, and is
   always better than assembling a plausible one.

**Scope of this document: navigation and context for Testsigma.** It answers
*what a thing is*, *where it lives*, and *what it relates to* — plus the
terminology and state/label vocabulary needed to talk about it. It is
deliberately **not**:

- a procedure manual — no "click X, then Y" walkthroughs
- an installation, deployment, or toolchain reference
- a commercial reference — no pricing, plans, or licensing
- a guide to any product other than Testsigma (and Atto within it)

When a question asks how to perform a task, answer with the concept and the
location, then point to the product documentation for the steps. Absent
procedural detail is by design and is never recorded as a gap.

**Tag semantics.** `product:` names the layer a chunk belongs to (`suite`,
`all`). `keywords:` is retrieval surface, not content. `stack:` restricts
applicability. `volatility: high` means the fact has a short shelf life.

**Chunk metadata schema** — see **§30**.

---

## §1 Product architecture and URL map

`product: all` `keywords: architecture, Testsigma, Atto, URLs, login, org selector`

This document covers two layers. Testsigma ships other products; they are out
of scope (§0).

| Layer | What it is | URL |
|---|---|---|
| **Testsigma** | Test automation product | `app.testsigma.com` |
| **Atto** | AI coworker layer inside Testsigma | no standalone URL |

**Product selector:** `id.testsigma.com` — shows all organizations after
login.

**Project Switcher**, top left of the Testsigma nav, switches across **Projects,
Applications, and Versions** — the three-level scope that also appears in
Reuse Step Group (§34) and Figma visual testing device config (§36).

#### URL reference table (Testsigma)

| Area | Path |
|---|---|
| Atto's Home, list view | `/ui/ai-journey/{projectId}` |
| Atto playground, generation session | `/ui/playground/{projectId}` |
| Test Cases | `/ui/td/{projectId}/cases/filters` |
| Step Groups | `/ui/td/{projectId}/step-groups/filters` |
| Elements | `/ui/td/{projectId}/elements/filters/{appId}` |
| Test Data Profiles | `/ui/td/{projectId}/data/folders/{folderId}/sets` |
| Environments | `/ui/td/{projectId}/environments/{id}/details` |
| Uploads | `/ui/td/{projectId}/uploads` |
| Addons | `/ui/addons` |
| Test Suites | `/ui/td/{projectId}/suites` |
| Create Test Suite | `/ui/td/{projectId}/suites/new` |
| Test Plans | `/ui/td/{projectId}/plans` |
| Test Plan detail | `/ui/td/plans/{id}/details` |
| Run Results (plan run) | `/ui/td/results/{planId}/runs/{runId}` |
| Dry Run Results | `/ui/td/dry_run/{runId}/step_results` |
| Agents | `/ui/agents` |
| Terminal OAuth | `/ui/testsigmaterminal/authorize` |

These are application UI paths, not API endpoints.

**Mock Server host:** `mockserver-us.testsigma.com`
**Upload file location scheme:** `testsigma-storage://...`

---

## §2 Testsigma — left navigation tree

`product: suite` `keywords: navigation, left nav, menu, sidebar, Command Center`

```
[Project Switcher — top]
Dashboard
Atto's Home
Create Tests
  ├── Test Cases
  ├── Step Groups
  └── Elements
Test Data
  ├── Test Data Profiles
  ├── Environments
  ├── Uploads
  └── Mock Servers
Test Suites
Test Plans
Run Results
Settings
Save Points
[Command Center — bottom bar, ⌘K / Ctrl+K]
[User Profile — bottom-left]
```

**Command Center** is invoked with ⌘K on macOS or Ctrl+K on Windows and sits
in the bottom bar. The bottom-left icon row also gives access to Add Widget,
an Atto's Home shortcut, Addons (§35), Usage Details, What's New, Help, and My
Profile; the logged-in user's name and role are shown there too. **Save
Points** is a top-level nav item. **Elements** lives under **Create Tests**,
not under Test Data.

Dashboard is documented in §32, Save Points in §33, and Step Groups in §34.

---

## §3 Application types within a Testsigma project

`product: suite` `keywords: application type, project type, Web, Android, iOS, Salesforce, Desktop, Windows, Unified`

Nine application types:

1. Web application
2. Unified — cross-platform Android + iOS, Modern stack only
3. Salesforce — available on both Classic and Modern (§26)
4. Android
5. iOS
6. Mobile web
7. Rest API
8. Desktop (Beta)
9. Windows (Lite)

**Unified Mobile:** one test case runs on both Android and iOS. Modern stack
(WebDriverIO) only — **not** compatible with Classic (Selenium/Java). Full
limitation list in **§25**.

Unified is the only application type restricted to a single engine. Others,
including Salesforce, run on both (§26).

`[unverified: engine availability was confirmed for Salesforce and Unified
only. Do not assert engine support for Desktop (Beta), Windows (Lite), Rest
API, or Mobile web.]`

---

## §4 Atto — the AI layer

`product: all` `keywords: Atto, AI agents, Generator, Runner, Healer, Analyzer, Bug Reporter, Coverage Planner, Optimizer`

Atto is the AI coworker layer inside Testsigma.

#### Atto agents

| Agent | Responsibility |
|---|---|
| **Generator** | Test case generation from all source types |
| **Runner** | Copilot and Agentic execution |
| **Healer** | Auto-Healing — corrects element locators when they fail during execution |
| **Analyzer** | Result analysis, patterns, risk signals |
| **Bug Reporter** | Auto-creates Jira bug reports |
| **Coverage Planner** | Test coverage analysis |
| **Optimizer** | Test suite efficiency |

**Bug Reporter pre-populates:** test case name, environment, test plan ID,
result URL, error type, root cause, suggestions.

**Sprint Planner** is an Atto feature for test planning from sprint or work
item data. No further detail is available — see §29.

**Not all seven agents are available** — Coverage Planner and Optimizer are
"Coming Soon". See §43 before describing any agent as working.

---

## §5 Auto-Healing

`product: suite` `keywords: auto heal, self healing, locator, Healer, Gen AI Auto Heal`

- Toggled at **Settings → Preferences → Auto Healing**.
- In run results, an auto-heal badge appears beside the test case name,
  reporting the number of steps healed.
- **Gen AI Auto Heal (Unified Mobile):** when an element recorded on Android
  fails on iOS, the feature uses the other platform's screenshot as context.

---

## §6 Atto's Home — Generate Test Cases (playground)

`product: suite` `keywords: Atto's Home, playground, generate with AI, context sources, AI journey` `volatility: high`

**URLs:** `/ui/ai-journey/{projectId}` (list view), `/ui/playground/{projectId}`
(generation session).

#### Left panel — Atto's Chat

- Source list with a **+** button per source and a count badge
- A prompt field for describing the feature or flow to be tested
- **"Read existing test case library"** checkbox — when enabled, Atto reads
  the existing library and adds to or updates it rather than generating fresh
  test cases
- **"Generate with AI"** button

#### Context sources

Jira Requirement · Confluence · Figma Designs · XRay Tests · Azure DevOps ·
QTest · Files · Video Recording · Live Recorder · Natural language prompts ·
OpenAPI/Swagger.

**Files source limits:** accepted formats jpeg, png, gif, pdf, docx, xlsx, md
— maximum 5 files.
**Video Recording limits:** maximum 10 files.

#### Upload Files dialog

Drag-and-drop area; accepted formats jpeg, png, gif, pdf, docx, xlsx, md; max
5 files. Right panel shows a preview. Actions: **Discard** / **Add File(s)**.

#### Video Recording config

**"+ Add Videos"** button, max 10 files, lists filename and size.

#### Generation in progress

Progress bar with percentage, status text, and an elapsed time counter in the
right panel.

#### Generation result — right panel

- Source badges reporting the count and type of each source used
- Tabs: **All test cases (N)** | **Pending (N)** | **Accepted (N)** |
  **Rejected (N)**
- Test cases grouped by feature category — groups are expandable and show a
  count per group

#### Atto's Home list view — Copilot Generations tab

- Filter tabs: **All** | **To Do** | **In Progress** | **Done**
- Each card shows: ticket ID, date, **⋯** menu, title, test case count, status
  dropdown
- Top right: **"Generate with AI"** button and **"Open Playground"** button

---

## §7 Test Case Details dialog (Atto playground)

`product: suite` `keywords: test case details, manual steps, automated steps, New badge, Update badge, Pending, Save to Library` `volatility: high`

Opens when clicking a generated test case in the playground's right panel.

**Header:** 🏠 icon + name | type badge (Functional) | state badge | status
badge | "Move with ↑ ↓" | ✕

#### State badges

| Badge | Meaning |
|---|---|
| **New** | Freshly AI-generated, never been to the library |
| **Update** | AI is modifying an existing library test case |
| **Pending** | Not yet accepted or rejected |

**Tabs:** Manual Steps | Automated Steps

#### Manual Steps tab

- Left: an Atto chat panel for editing the test case conversationally
- Prompting Atto to refine steps surfaces a **"Refine manual steps"** button
  in the response
- After refinement: drag handles, inline editing, **"+ Add Block"** /
  **"+ Add Step"**, **Cancel** / **Save**
- **"See What's New"** button — for test cases in the Update state

#### Automated Steps tab

- NLP steps render element names as links
- **"Generate Automated Steps"** button converts manual steps to NLP
- **Edit** button for inline editing

#### Bottom action bar

- **Run with Copilot** — dropdown; the chevron opens the environment selector
- **Agentic Learning (Beta)** — dropdown with chevron
- **Reject** | **Save to Library**

#### Save to Library behavior

Saves into Testsigma under the **"AI Generated Feature"** top-level folder.
Scenario folders are auto-named `AI Generated Scenario_[date]_[time]`. Status
is set to **Draft**.

---

## §8 Agentic Learning (Beta) — part of Atto

`product: suite` `keywords: agentic learning, agent, live app, Record Manual Steps, Start Learning Live App` `volatility: high`

**What it is:** an Atto capability, not a separate authoring route. An AI
agent explores the live application to complete a test case Atto has already
generated — it executes the test case's manual steps against the running app,
observes real behavior, and produces automated steps from what it observed.

**Entry point:** the **"Agentic Learning (Beta)"** button in the Test Case
Details bottom bar (§7).

#### Mechanism

The session runs in **Chrome for Testing**, in a Copilot window opened
alongside Test Case Details. The Copilot panel shows chat and a progress log
on the left and the step list on the right; the agent executes steps
autonomously, marking each as it passes.

The session has two user-driven phases, each started by a chat instruction to
Atto: **"Start Learning Live App"** begins the exploration, and **"Start
Generating Automated Test Case"** converts what was observed into automated
NLP steps in the Automated Steps tab. Generated steps carry Testsigma element
names.

**The user retains control of the browser throughout.** A pre-run notice
states this explicitly: if the agent stalls or fails to progress, the user can
drive the application directly to guide it further. This is the purpose of the
**Record Manual Steps** control.

#### Copilot panel controls (Agentic Learning)

- **Resume** button
- Step-back, retry/refresh, settings gear
- **Record Manual Steps** button — the user manually guides the agent when it
  is stuck
- Stop/abort controls
- Bottom text field states: "Learning..." / "Generating..."

**After save:** the test case appears in Testsigma as **Draft** under the AI
Generated Feature folder.

---

## §9 Run with Copilot (from Atto playground)

`product: suite` `keywords: Run with Copilot, Generate Steps button, locator update, pending test case` `volatility: high`

**What it is:** executes a generated (Pending) test case using Copilot mode,
verifying automated steps against the live app.

**Key difference from standard Copilot:** a **"Generate Steps"** button
appears in the Copilot panel header. It regenerates or fills in automation
steps mid-session when locators are missing or steps fail.

**Post-run banner:** "The test steps might be updated. Refresh the page to see
the latest changes." with a **Refresh** button.

---

## §10 Agentic Learning vs Run with Copilot

`product: suite` `keywords: comparison, agentic learning vs copilot, which to use`

Both operate on a test case Atto has already generated. Neither is a route to
create a test case from scratch — see §27.

| | Agentic Learning | Run with Copilot |
|---|---|---|
| Operates on | The test case's manual steps | The test case's automated NLP steps |
| Agent role | Explores the live app, then generates automated steps | Executes existing steps, updates locators |
| User intervention | Record Manual Steps if stuck | Set debug points, pause, record |
| Output | Automated steps added to the test case | Updated/verified automated steps |

---

## §11 Test Cases (Testsigma)

`product: suite` `keywords: test case editor, step types, slash commands, right rail, step settings, NLP`

**URL:** `/ui/td/{projectId}/cases/filters`

#### Test Case Editor top bar

test case name | Status | **Record ▾** | **Run** | **Copilot** | **⋯**

- **⋯ menu:** Clone | Delete
- **Record dropdown:** Record / Record in Incognito Mode

#### Step type selector — slash-command shortcuts

**Standard**

| Step type | Shortcut |
|---|---|
| Natural Language | `/` |
| Step Group | `/stepgroup` |
| Create a Block | `/blocks` |
| For Loop | `/forloop` |
| While Loop | `/whileloop` |
| Custom Function | `/function` |
| Rest API | `/api` |

**Conditional**

| Step type | Shortcut |
|---|---|
| If Natural Language | `/if` |
| If Step Group | `/if stepgroup` |
| If Custom Function | `/if function` |
| If Rest API | `/if api` |

The `/api` step type is an in-test step for calling an API under test. It is
not a Testsigma API for creating test cases — see §27 and §29.

#### Right rail — 6 icons, top to bottom

1. **Test Case Info** — name, description, created/updated by
2. **Ad-Hoc Runs** — history, Re-Run button, View Details link
3. **Test Case Settings** — Pre-Requisite, Test Data Profile, Data Driven
   toggle, Visual Testing toggle, **Fail Test Case if Visual Testing Fails**
   toggle (§36), AfterTest Case toggle
4. **Manage Test Case** — Status (Draft / In Review / Ready / Obsolete /
   Rework), Priority (Critical / Major / Medium / Minor), Assignee, Reviewer,
   Test type, Requirement, Labels, Custom Fields
5. **Activity** — History and Comments tabs
6. **Help** — Examples, Action List, Get Started tabs

#### Step Settings panel — per step

- Pre-Requisite dropdown
- Step Timeout — ≤120 secs
- Screenshot capture — Always / Only on step failure
- No. of Retries on Step Failure
- Stop Test Case execution on Test Step failure — default ON
- Ignore this step result in Test Case Result
- Disable step
- Enable Visual Testing for the step
- Enable Accessibility Testing for the step
- Highlight element in screenshot

---

## §12 The Recorder (Testsigma)

`product: suite` `keywords: recorder, record steps, element inspector, locator precedence, Ctrl+Shift+F, test lab`

#### Floating panel controls

settings icon · screenshot icon · expand icon · ✕ | element inspector icon ·
**Pause** · **Stop**

#### How it works

Hover an element → tooltip shows the type (TEXT, INPUT, BUTTON) plus the name
→ click → the step is captured. **`Ctrl+Shift+F`** freezes the element
inspector, which is how dynamic dropdowns are captured.

#### Locator Precedence (draggable order)

XPath → CSS Selector → ID → Name → Link Text

#### Copilot inside the recorder

A separate floating panel. **"Generate Test Scenarios"** returns 5
context-aware suggestions; selecting one auto-generates all steps.

#### Mobile and local recording

Requires **Testsigma Terminal** (§24). Test Lab options:

- Local Devices — "2x Faster Authoring"
- Testsigma Lab
- BrowserStack
- Testsigma Emulator — "5x Faster Authoring", Beta

---

## §13 Copilot Mode (Test Case Editor top bar)

`product: suite` `keywords: Copilot, Terminal required, Chrome for Testing, execution point, debug point, launch config`

**Requires:** Testsigma Terminal running locally — v2.2.2+ for auto-launch.

**When Terminal is not running:** "Testsigma Terminal must be running on your
desktop to use the Copilot." with a **Launch Terminal** button and a download
option.

#### Copilot launch config panel fields

- Copilot Status — "Copilot is ready"
- Browser — Chrome for Testing
- Set initial debug point — dropdown of test case steps
- Execute from step — dropdown
- Environment + **Manage Variables**
- Additional settings: Page Timeout (default 30s), Step Timeout (default 30s),
  Apply to all steps, Screenshot capture, Mock Server
- Desired Capabilities: Key / Data type / Value
- **Launch** / **Cancel** / **Save configuration**

**Saved Configs:** named configurations. When one is loaded, the footer shows
**"Update configuration"** plus **"Save configuration."**

#### Copilot execution

- Runs in Chrome for Testing, shown with a warning banner
- Copilot panel control bar: Pause/Resume, Step Over, step controls, settings
  gear, **Rec** button
- **Execution Point** — the currently executing step
- **Debug Point** — a breakpoint where execution pauses
- When paused, the user interacts with the app and new steps are recorded live
  and appended
- Status bar: "Recording in progress" / "N Steps recorded and added to the
  test case"
- The session generates a dry run result at
  `/ui/td/dry_run/{id}/step_results`

---

## §14 Ad-Hoc Run panel

`product: suite` `keywords: ad-hoc run, run button, test lab, headless, desired capabilities, saved configs`

**Entry:** the **Run** button in the test case editor.

**Panel header:** "Ad-Hoc Run" plus a **"Saved Configs"** dropdown.

#### Test Lab tabs

| Tab | Fields |
|---|---|
| **Testsigma Lab** | OS & Version, Browser, Resolution, Headless Test checkbox |
| **Local Devices** | Connected Machine dropdown, Browser |
| **BrowserStack** | OS / Browser / Resolution |

Connected machines follow the agent naming convention in §24.

#### Present on all tabs

- Environment dropdown + **"Manage Variables"** link
- Additional settings (collapsible): Page Timeout (≤120 secs, default 30),
  Step Timeout (≤120 secs, default 30), Apply to all steps toggle, Screenshot
  capture (For all steps), Mock Server + **"Create New Server"** link
- Desired Capabilities (collapsible): Key / Data type (String) / Value

**Footer:** **Run Now** | **Cancel** | **Save configuration** — replaced by
**Update configuration** when a saved config is loaded.

---

## §15 Dry Run Results

`product: suite` `keywords: dry run, step results, screenshots, visual difference, more details, adhoc run ID`

**URL:** `/ui/td/dry_run/{runId}/step_results`

#### Step icons

| Icon | Meaning |
|---|---|
| green ✓ | Passed |
| spinning loader | Executing |
| gray circle | Queued |
| red ✗ | Failed |
| red slashed circle | Not executed / Stopped |

#### Completed run header

status badge, duration `HH:MM:SS.mmm`, version badges, a **More details**
link, action icons (light bulb for AI insights, bar chart for analysis, video
for execution recording, clock for timeline), and a **Re-Run** button.

#### More Details panel

- Donut chart: Total Steps, then Queued / Passed / Failed / Not Executed /
  Stopped
- Machine Details: lab type, machine name, version, resolution
- Test Case Details: Start Time, Adhoc Run ID, Priority, Type, Data Driven,
  Executed by

#### Step detail panel

Screenshot thumbnail (expandable, downloadable), a **Visual Difference**
button, then Message, Test data, Step Settings, Metadata, and Step Details —
all collapsible.

**Screenshot expanded view:** three tabs — **Screenshot** | **Visual
Difference** | **Visual Difference - Figma**. Includes a Download link and
left/right arrows for step navigation.

**Visual Difference button tooltip when not enabled:** "Visual Testing is not
enabled for this Step."

---

## §16 Elements — object repository (Testsigma)

`product: suite` `keywords: elements, object repository, locators, XPATH, Accessibility ID, Copilot Placeholder Screen`

**URL:** `/ui/td/{projectId}/elements/filters/{appId}`

**Columns:** Element Name, Type, Screen Name, Created, Affected List,
Reviewer, Status.

**Element types:** XPATH, CSS Selector, ID, Name, Link Text, Accessibility ID
(mobile).

**Status values:** Draft, In Review, Ready, Obsolete.

**"Copilot Placeholder Screen"** is the screen name used for AI-captured
elements.

**Top bar:** Search, export icon, import icon, **Record** dropdown (Record /
Record in Incognito Mode), **Create Element** button, **"Saved Filters"**
dropdown, **Show Filters** button.

---

## §17 Test Data (Testsigma)

`product: suite` `keywords: test data profiles, ETF, sensitive data, environments, environment variables, uploads, mock server`

#### Test Data Profiles

**URL:** `/ui/td/{projectId}/data/folders/{folderId}/sets`

- Columns: S.No., ETF toggle, Set Name, then parameter columns with a lock
  icon for sensitive parameters
- Sensitive and password values display as masked dots
- Top right: export/import icons, link icon, history icon, **+** (add column)
- **"+"** button bottom-left adds a row

**New profile:** blank grid, "Untitled" title, default columns Parameter 1 /
2 / 3, 4 empty rows, **Create** / **Cancel** top right.

#### Environments

**URL:** `/ui/td/{projectId}/environments/{id}/details`

- Two tabs: **Overview** | **List**
- Warning banner: "Note: Renaming this variable here will change it across
  other environments as well."
- Variable table: S.No., Variable, Default Value, edit/delete icons
- Right panel: **"Linked Test Plans(0)"**
- **"Add Variable"** button opens the Add Environment Variable dialog:
  Variable field + Default Value field (lock icon for sensitive), with
  **Cancel** / **Creating...**
- Toast on creation: "Environment created successfully."

#### Uploads

**URL:** `/ui/td/{projectId}/uploads`

- Columns: File Name, File Location (`testsigma-storage://...`), Version, Last
  Updated By
- **Upload** button top right

#### Mock Servers

A nav item under Test Data. The Mock Server itself is an external service at
`mockserver-us.testsigma.com`, used for API mocking, and is selectable in
Ad-Hoc Run, Copilot launch config, and Test Plan settings, each of which
offers a **"Create New Server"** link. Mock Server management UI is not
covered by the source material — see **§29**.

---

## §18 Test Suites (Testsigma)

`product: suite` `keywords: test suite, static, dynamic, AfterTest Suite, prerequisite`

**URL:** `/ui/td/{projectId}/suites`

**Test suite list columns:** Title, Type (Static / Dynamic), Created, Created by,
Status (No Runs / Passed / Failed, with a donut icon).

#### Create Test Suite — full-page form at `/ui/td/{projectId}/suites/new`

- **Basic Details:** Name, Description toggle, Pre-Requisite dropdown, Labels
- **Test Cases (0):** "Add/Remove Test Case" link opens a dual-panel picker
- **AfterTest Suite** toggle, with a tooltip
- **Create** / **Cancel**

Toast on creation: "Test Suite created successfully."

Static vs Dynamic membership and the AfterTest Suite options are covered in
§37.

---

## §19 Test Plans (Testsigma)

`product: suite` `keywords: test plan, machine profile, recovery actions, accessibility testing, WCAG, CI/CD, schedules, post plan hook`

**URL:** `/ui/td/{projectId}/plans`

**Types:** Cross browser testing | Custom test plan.

Creation is a 3-step flow.

#### Step 2 — Add Test Suites & Link Machine Profiles

- **Test Machines** section: **"Link Test Machine"** button, with the
  instruction to use the monitor icon on each suite row
- **"View Prerequisites"** link opens an "Execution sequence" popup showing
  prerequisite suite → current suite order
- **"Add test machine/device profile"** right drawer: Name, Pre-requisite
  machine, Test Lab (Testsigma Lab / Local Devices / BrowserStack), Connected
  Machine dropdown, Browser (Chrome for Testing), Headless Test, **Reset
  session for every test case** (default checked), **Hard Reset session for
  every test suite**, Desired Capabilities, then **Create Profile** /
  **Cancel**

#### Step 3 — Test Plan Settings

- **Send Notification** toggle
- **Additional Settings:** Environment, Screenshot capture (For all steps),
  Page Timeout (default 30s), Step Timeout (default 30s), Apply to all steps,
  Mock Server + **Create New Server** link
- **Accessibility Testing** toggle — when ON, shows a WCAG Version &
  Conformance Level dropdown, default **"WCAG 2.1 AA"**. Safari and Firefox
  are not supported.
- **Recovery Actions** (collapsible) — per failure type (Major Step,
  Pre-Requisite, Test Case, Suite, Machine) with **Abort** or
  **Report-and-continue** options. Rerun options: None / All Test Cases / Only
  Failed Test Cases.
- **Post Plan Hook:** Addon dropdown

#### Test Plan detail view — `/ui/td/plans/{id}/details`

Three tabs:

1. **Test Machine & Suites**
2. **CI/CD Integrations** — Default Integrations logos: Azure DevOps,
   CircleCI, Codeship, Bamboo, Jenkins, AWS, Travis CI, Generic Shell,
   TestRail, QTest, GitHub, GitLab. `[unverified: TestRail and QTest are test
   management tools and are also listed under Test Management in §21; their
   appearance in this tab was not separately confirmed.]` Includes a REST API
   section with a `curl POST` example to start a plan and a `curl GET` example
   to check status. These are the in-product surfacing of the Testsigma REST API —
   see **§31** for the full endpoint inventory.
3. **Schedules**

**Run Now split button dropdown:** Run | Partial Run.

---

## §20 Run Results — test plan runs (Testsigma)

`product: suite` `keywords: run results, plan run, run overview, donut chart, addon details, consolidated duration`

**URL:** `/ui/td/results/{planId}/runs/{runId}`

Run Results is where reporting lives in Testsigma. There is no separate Reports
nav item; run reports are exported from here.

#### Header

back arrow | test plan name | status badge | **Auto Refresh** toggle | stop
button | **Compare Run** | **Rerun** | export icon

#### Export Run Report As

The export icon opens a menu headed **"EXPORT RUN REPORT AS"** with three
formats:

| Format | Menu label |
|---|---|
| PDF | **PDF** |
| Excel | **MS Excel Sheet** |
| JUnit | **Junit report** |

The JUnit export is the UI equivalent of `GET Get JUnit report` in the Testsigma
REST API (§31).

**Left panel:** Test Runs list — run numbers with status icons, plus search
and filter icons.

**Center:** view switcher dropdown — Test Suites | Test Cases | Test Machines
— showing a count for the active view, plus a **Filters** button and a Search
field.

**Test Cases view columns:** pass/fail icon, test case name, auto-heal badge
reporting steps healed, suite name, and 3 action icons — re-run, view results,
settings.

#### Run Overview panel (right)

- Donut chart labelled with the count and unit of the active view, plus
  Passed / Failed / Not Executed / Stopped counts
- **First Run:** Start Time
- **Last Run:** Start Time, End Time, and a **View Runs** link
- **Duration:** Consolidated Duration
- **Test plan settings**, with a **More Settings** link: Build (editable),
  Execution type (e.g. Manual), Environment
- **Post plan hook result:** Passed / Failed / No Runs
- **Addon** — for a qTest Integration addon: API_KEY, RELEASE_ID, CYCLE_ID,
  OVERRIDE_ON_RERUN, PROJECT_ID

---

## §21 Settings — Integrations (Testsigma)

`product: suite` `keywords: integrations, Jira, Slack, BrowserStack, CI/CD, bug reporting, test management, settings`

Entries marked `[confirmed]` were verified in the source walkthrough. All
others appear in the UI list but were **not** individually confirmed and must
be presented as unconfirmed.

| Category | Integrations |
|---|---|
| **Bug Reporting** | Jira Cloud `[confirmed]`, Azure DevOps Boards `[confirmed]`, Monday.com `[confirmed]`, YouTrack `[confirmed]`, Jira Server/DC, Xray Cloud, Xray Server, Mantis, Bugzilla, Backlog, ClickUp, Linear, Trello |
| **Collaboration** | Slack, MS Teams, Google Chat — all unconfirmed |
| **Test Lab** | BrowserStack, SauceLabs, Kobiton, TestMU, LambdaTest — all unconfirmed |
| **Test Management** | Zephyr Cloud, Xray, qTest, TestRail — all unconfirmed |
| **Product Management** | Figma `[confirmed]`, Confluence Cloud `[confirmed]`, Jira `[confirmed]`, Confluence Server, Xray Server, GitHub |
| **CI/CD** | Jenkins, GitHub, GitLab, Azure DevOps, Bitbucket, CircleCI, Travis CI, Bamboo, Bitrise, AWS CodePipeline, AWS Lambda, Google Cloud Build, Codemagic, CodeShip, Copado, Gearset, Shell Script, REST API — all unconfirmed |

Setup steps, required credentials, and per-integration behavior are not
covered — see §29.

---

## §22 Gen AI Keys — BYOK (Testsigma)

`product: suite` `keywords: BYOK, Gen AI Keys, OpenAI, Azure OpenAI, LLM keys, admin settings`

**BYOK** = Bring Your Own Key — enterprise LLM key management.

- Location: **Admin Settings → Gen AI Keys**
- Supports the customer's own OpenAI or Azure OpenAI keys, configured **per
  feature**
- Features with per-feature LLM config: Copilot in Web/Mobile Recorder, Test
  Data Generation, API testing, Auto Heal, Visual Analysis, AI in Addons
- Any feature left unmapped uses Testsigma's own model providers

Atto generation (§6) and Agentic Learning (§8) do not appear on the
per-feature list. Whether they support customer keys is unresolved — see §29.

---

## §23 Settings — Preferences (Testsigma)

`product: suite` `keywords: preferences, auto healing toggle, review management, onboarding tutorials, generative AI`

- Auto Healing toggle
- Control Who Can Stop Executions
- Review Management — Test Case / Element / Self
- Disable Onboarding Tutorials
- Generative AI features

---

## §24 Testsigma Terminal

`product: suite` `keywords: Terminal, desktop app, macOS, DMG, agent, copilot ready, agents page, local devices`

**What it is:** a native desktop app that enables Copilot recording, local
device testing, and agentic execution. It is **required for Copilot mode**.

**Version:** v2.5.3 (July 2026). Auto-launch requires v2.2.2+.

#### Available builds

Terminal runs on macOS, Windows, and Linux. The download picker has two tabs
— **Agent** | **Terminal** — with these entries under Terminal:

| Build | Format |
|---|---|
| Mac (Intel) | `.dmg` |
| Mac (M Series) | `.dmg` |
| Windows | `.exe` |
| Linux | `.AppImage` |

#### Setup

Install, then authenticate via **browser OAuth** at
`/ui/testsigmaterminal/authorize`, which hands back to the desktop app. Before
login, a setup screen offers **Configure Settings** for proxy, SSL, and
memory. Per-platform install steps are in the product documentation (§0).

#### Terminal main dashboard

- **COPILOT** section: Web, Mobile, Salesforce — each with a status dot
- **AGENTIC** section: Web, Mobile — each with a status dot
- Status dots: green = ready, red = updating or error
- Example status line: "Web Copilot is ready to use. The connection to the
  agent is active."
- Bottom nav: Active Sessions, Logs, Settings, Info, Report Issue

#### Agents page — `/ui/agents`

- Tabs: **All (count)** | **Active agent** | **Inactive agent** |
  **Unregistered agent** | **Obsolete agent**
- Columns: Title, OS, Available Browsers (icons), Last Successful Ping,
  Status, Version
- Agent naming convention: `username_YYYY-MM-DD_HHhMMmSSs`
- Top right: **"Testsigma Terminal"** button and **"Setup Agent"** button

---

## §25 Unified Mobile testing — In-Progress, July 2026

`product: suite` `stack: modern` `keywords: Unified Mobile, cross-platform, dual locator, platform applicability, limitations` `volatility: high`

One test case runs on both Android and iOS. **Modern stack only** —
WebDriverIO. Not compatible with Classic (Selenium/Java).

#### Current limitations, as of 2026-07-01

1. Manual authoring only — Atto is not available for the Unified type yet
2. Cloud execution only — no local device support yet
3. Data-driven testing, test plans, scheduling, and CI/CD still in progress
4. No migration path from existing Android or iOS projects
5. Add-on support not yet available
6. Import from other project types deferred
7. Save checkpoint support deferred
8. REST API step type disabled in the UI
9. Visual testing has a known bug — TP-4158, ReOpen status
10. AI Step for Unified Mobile not yet available

This list is two months old and is the fastest-moving content in this
document. Any answer built from it must say so.

#### Key terms

| Term | Meaning |
|---|---|
| Platform applicability | Both / Android only / iOS only |
| Platform badge | Shown on NLPs |
| Dual-locator | Separate Android and iOS locators per element |
| Not-executed | Result for steps skipped due to platform mismatch |

Related: **Gen AI Auto Heal** for Unified Mobile uses the other platform's
screenshot as context when an element recorded on Android fails on iOS (§5).

---

## §26 Execution stacks — Classic vs Modern

`product: suite` `keywords: Classic, Modern, Selenium, Playwright, WebDriverIO, BT Runner, TypeScript`

| | Classic | Modern |
|---|---|---|
| Framework | Selenium/Java | Playwright (web) + WebDriverIO (mobile) |
| Language | Java | TypeScript |
| Unified Mobile | ✗ | ✓ only |
| Salesforce | ✓ | ✓ |

**Both engines are supported.** The documentation presents Classic and Modern
as two current execution engines, distinguished by capability, not lifecycle —
there is no deprecation notice for Classic anywhere in the source. Modern
automatically waits for elements and page state before interacting, which
reduces timing-related failures, and handles Shadow DOM and web components
more natively than Classic.

`[corrected 2026-09-02: an earlier revision of this file labelled Classic
"Legacy" and Modern "Current". That was unsupported. Do not describe Classic
as deprecated, legacy, or end-of-life.]`

**The framework row is not a list of supported application types.** Salesforce
is available on **both** Classic and Modern. Do not infer from "Playwright
(web) + WebDriverIO (mobile)" that Modern covers only web and mobile app
types.

`[Salesforce on Modern confirmed 2026-09-02, after this document's July source
date. Which framework serves Salesforce on Modern is not recorded.]`

**BT Runner** is the TypeScript-based execution framework on the Modern stack.
**WDIO** (WebDriverIO) is the TypeScript wrapper for Appium used by Unified
Mobile.

---

## §27 All the ways to create a test case in Testsigma

`product: suite` `keywords: create test case, ways to create, author test case, write tests, NLP, Recorder, Copilot, Atto, generate tests`

Testsigma has four routes to create a test case, freely mixable in one test:

1. **Generate with Atto** — the playground creates test cases from Jira,
   Confluence, Figma, files, videos, or a prompt; saved to the library as
   Draft.
   - **Agentic Learning (Beta)** is part of Atto, not a separate route: an
     agent explores the live application to complete a test case Atto
     generated.
2. **Copilot** — AI step generation in the recorder or editor; "Generate Test
   Scenarios" builds all steps for a picked scenario. Requires Testsigma
   Terminal.
3. **Record** — the editor's Record button launches the Recorder extension;
   clicks become steps and elements. Mobile/local recording needs Testsigma
   Terminal.
4. **Type NLP steps** in the test case editor (Create Tests → Test Cases);
   pressing the / key opens the step type menu.

There is **no API route for creating a test case.** The Testsigma REST API (§31)
exposes test case reads, rerun, and result updates, but no create operation —
and no project create either. It does expose **Create a test step** and
**Create multiple test steps**, which write into a test case that already
exists; those are not an authoring route on their own. Do not infer a
`POST /test_cases` from them.

Atto generation is not yet available for the Unified Mobile application type.

---

## §28 Terminology reference

`product: all` `keywords: glossary, definitions, terminology, what does X mean`

| Term | Definition |
|---|---|
| Testsigma | Test automation product (`app.testsigma.com`) |
| Atto | AI coworker layer inside Testsigma |
| Copilot | AI assistant for step generation — in the recorder, editor, or Atto playground |
| Agentic Learning | Beta Atto capability: an agent explores the live app to complete an Atto-generated test case, producing automated steps from what it observes. Not a standalone authoring route. |
| Run with Copilot | Executes an Atto-generated test case via Copilot; updates locators during the session |
| NLP | Natural Language Processing — Testsigma's human-readable step syntax |
| BT Runner | TypeScript-based execution framework (Modern stack) |
| WDIO | WebDriverIO — TypeScript wrapper for Appium (Unified Mobile) |
| Testsigma Terminal | Desktop app enabling Copilot recording and local device testing |
| Classic stack | Selenium/Java — a current execution engine, not deprecated (§26) |
| Modern stack | Playwright (web) + WebDriverIO (mobile) |
| BYOK | Bring Your Own Key — enterprise LLM key management |
| Mock Server | External service (`mockserver-us.testsigma.com`) for API mocking |
| Tunnel | Testsigma Tunnel — reaches locally hosted or private apps from cloud execution, bypassing firewalls without IP whitelisting (§39) |
| Auto-Healing | AI feature that auto-corrects failed element locators during execution |
| Baseline image | The stored reference image a step's screenshot is compared against in Visual Testing (§36) |
| Strict / Lenient | Visual Testing comparison modes — exact pixel match vs. a threshold percentage (§36) |
| AfterTest Suite | Special test case run after a suite completes (teardown) |
| AfterTest Case | Steps run after a test case regardless of result |
| Recovery Actions | Per-failure-type configuration in Test Plans |
| Static test suite | Test suite whose test cases are chosen manually (§37) |
| Dynamic test suite | Test suite whose membership is defined by filters and updates automatically (§37) |
| Iteration | One pass of a data-driven test case over one test data set; the unit of rerun (§38) |
| Execution engine | The addon documentation's term for Classic and Modern (§40) |
| Unified Mobile | Application type where one test case runs on both Android and iOS |
| Sprint Planner | Atto feature for test planning from sprint or work item data |
| Addon | Package of additional actions usable in test steps; stack-specific, installed from the Addons marketplace (§35) |
| AI Generated Feature | Top-level folder in Testsigma where all Atto-generated test cases are saved |
| New badge | Badge on a generated test case: freshly AI-generated |
| Update badge | Badge on a generated test case: modifying an existing library test case |
| Pending badge | Badge on a generated test case: not yet accepted or rejected |
| Save to Library | Moves an Atto-generated test case to Testsigma as Draft |
| Save Point | A checkpoint of a project's state, created manually or during import, that the project can be restored to (§33) |
| Chrome for Testing | Dedicated Chrome build used exclusively for Copilot and Agentic sessions |
| Generate Steps button | Appears in the Copilot panel header during Run with Copilot — regenerates automation steps mid-session |
| Execution Point | Marker in the Copilot panel showing the currently executing step |
| Debug Point | Breakpoint marker in the Copilot panel where execution pauses |

---

## §29 Known gaps — what this document does not cover

`product: all` `keywords: gaps, not covered, unknown, unsupported questions, limitations of this context`

Retrieving this section and answering "not covered in this context" is
correct. Do not fill these gaps from general knowledge.

#### Features named but never documented

- **"Advanced vs Legacy dashboard" was a mislabel.** The Dashboard toggle is
  **Standard | Advanced** (§32); no "Legacy" mode exists. Treat questions about
  a legacy dashboard as questions about Standard mode.
- **Advanced dashboard behavior after creation.** §32 covers the builder —
  naming, widget selection, Create Dashboard. Editing, sharing, deleting, and
  per-widget configuration of a saved dashboard are not captured, nor is
  whether dashboards are personal or shared across the org.
- **Compare Run.** A button in the Run Results header (§20). What it compares
  and what the comparison view shows are not captured.
- **VPAT export** — named as an Accessibility widget destination (§32); what
  the export contains is not covered (§42)
- **Mock Servers** — selectable in three places (§17); what a mock server
  contains and how it binds to a test are not covered
- **Sprint Planner** — named in §4, nothing further. Coverage Planner and
  Optimizer are documented only as "Coming Soon" (§4)
- Atto agents **Coverage Planner**, **Optimizer**, **Analyzer** — named in §4
  with a one-line responsibility, no feature detail

#### Unresolved questions

- **Testsigma REST API request/response detail.** §31 records what the API can and
  cannot do, by resource. Request bodies, query parameters, response schemas,
  and per-endpoint paths are deliberately in the API documentation instead.
  Answer with the capability and the path prefix; never construct a path or
  payload.
- **Documentation defect at source.** The Testsigma REST API overview page states
  that the API "creates and updates projects, test cases, test steps, and test
  data." Its own endpoint list contains no create operation for projects or
  test cases (§31). Until the source page is corrected, that sentence must not
  be used as evidence that those endpoints exist.
- **Addons — remaining unknowns.** Whether an installed addon appears as its
  own step type or inside the Natural Language step, and how addon parameters
  are configured. The platform icon meanings on addon cards are inferred, not
  confirmed (§35). Authoring languages and addon types are now covered in §40.
- **Save Points — conceptual unknowns.** The label for the non-manual save
  point type, whether restoring is destructive or reversible, and whether save
  points have a retention limit. Also unconfirmed: whether the "Save checkpoint
  support deferred" line in §25 refers to this feature. Where edit/delete/
  restore are invoked from is procedural and out of scope (§0).
- **`/api_private/v1`.** Named as a path prefix serving Salesforce metadata,
  partially obscured in the source. Whether it is supported for customer use
  is unknown.
- **BYOK coverage for Atto generation and Agentic Learning** — absent from the
  per-feature list in §22.
- **Integration setup steps and credentials** — §21 lists names only; setup is
  procedural and out of scope (§0).
- **Roles, permissions, and user management** — not covered. The only role
  name observed anywhere is **Account Admin**, shown beside the user name in
  the bottom-left nav (§2).
- **Self-hosted or on-premise deployment** — confirmed to exist (§31 notes
  on-premise base URLs); deployment itself is out of scope (§0).

#### Staleness

Source date is 2026-07-01. Sections tagged `volatility: high` (§6, §7, §8, §9,
§25) describe Beta or In-Progress features and should be re-verified before
being stated as current behavior.

---

## §30 Chunk metadata manifest

`product: all` `keywords: manifest, chunk schema, index build, metadata fields`

Schema to apply when indexing:

| Field | Values | Source |
|---|---|---|
| `section` | `§0`–`§43` | heading |
| `title` | section heading text | heading |
| `product` | `suite` \| `all` | tag line |
| `keywords` | comma-separated | tag line |
| `stack` | `modern` (absent = both) | tag line |
| `volatility` | `high` (absent = stable) | tag line |
| `source_date` | `2026-07-01` | frontmatter |
| `confidence` | `verified` \| `unverified` | inline `[unverified]` / `[confirmed]` markers |

#### Section manifest

| § | Title | product | stack | volatility |
|---|---|---|---|---|
| 0 | How to use this document as retrieval context | all | — | — |
| 1 | Product architecture and URL map | all | — | — |
| 2 | Testsigma — left navigation tree | suite | — | — |
| 3 | Application types | suite | — | — |
| 4 | Atto — the AI layer | all | — | — |
| 5 | Auto-Healing | suite | — | — |
| 6 | Atto's Home — playground | suite | — | high |
| 7 | Test Case Details dialog | suite | — | high |
| 8 | Agentic Learning (Beta) | suite | — | high |
| 9 | Run with Copilot | suite | — | high |
| 10 | Agentic Learning vs Run with Copilot | suite | — | — |
| 11 | Test Cases | suite | — | — |
| 12 | The Recorder | suite | — | — |
| 13 | Copilot Mode | suite | — | — |
| 14 | Ad-Hoc Run panel | suite | — | — |
| 15 | Dry Run Results | suite | — | — |
| 16 | Elements | suite | — | — |
| 17 | Test Data | suite | — | — |
| 18 | Test Suites | suite | — | — |
| 19 | Test Plans | suite | — | — |
| 20 | Run Results | suite | — | — |
| 21 | Integrations | suite | — | — |
| 22 | Gen AI Keys — BYOK | suite | — | — |
| 23 | Preferences | suite | — | — |
| 24 | Testsigma Terminal | suite | — | — |
| 25 | Unified Mobile | suite | modern | high |
| 26 | Execution stacks | suite | — | — |
| 27 | Ways to create a test case | suite | — | — |
| 28 | Terminology reference | all | — | — |
| 29 | Known gaps | all | — | — |
| 30 | Chunk metadata manifest | all | — | — |
| 31 | Testsigma REST API | suite | — | high |
| 32 | Dashboard | suite | — | high |
| 33 | Save Points | suite | — | — |
| 34 | Step Groups | suite | — | — |
| 35 | Addons | suite | — | — |
| 36 | Visual Testing | suite | — | — |
| 37 | Test Suites — Static vs Dynamic | suite | — | — |
| 38 | Data-Driven testing and test data types | suite | — | — |
| 39 | Testsigma Tunnel | suite | — | — |
| 40 | Addon types and authoring | suite | — | — |
| 41 | Agent vs Terminal | suite | — | — |
| 42 | Accessibility Testing | suite | — | — |
| 43 | Atto agent status | all | — | high |

---

## §31 Testsigma REST API

`product: suite` `keywords: API, REST API, endpoints, API key, base URL, regional host, JUnit, trigger test plan, integration` `volatility: high`

Testsigma exposes a REST API for triggering test plan runs and reading results.
It also creates and updates test steps, test data, environments, elements, and
uploads. All endpoints authenticate with an API key and return JSON.

**There is no create operation for test cases or for projects.** See the
defect note in §29 before answering any question that assumes otherwise.

#### Base URLs

Each account is served from a regional host. The host a request goes to
depends on where the account lives. To find the region, read the host in the
browser address bar while signed in to Testsigma — that host is the one the
API calls use.

| Region | Host |
|---|---|
| US | `https://app.testsigma.com` |
| EU | `https://app-eu.testsigma.com` |
| India | `https://app-in.testsigma.com` |

Requests to the wrong regional host fail authentication: an API key is issued
by one account, on one host, and is not valid on the others. On-premise
deployments use their own deployment host instead of any of the above.

#### Path prefixes

| Prefix | Serves |
|---|---|
| `/api/v1` | Projects, test cases, test suites, test plans, test data, environments, elements, uploads |
| `/api/v2` | Results and test steps |
| `/api_private/v1` | Salesforce metadata `[unverified: partially obscured in source; customer-facing status unknown]` |

Each endpoint page in the API reference names the prefix that endpoint uses
and carries a region selector that rewrites the samples on that page.

#### Capability by resource

Operation names below are verbatim from the API reference navigation. The full
per-endpoint reference — paths, request bodies, response schemas — is in the
API documentation; this table exists to answer *what the API can and cannot
do*.

| Resource | Read | Write | Notes |
|---|---|---|---|
| Projects | Get users, List uploads | — | **No project create** |
| Test Cases | Execution details, labels, priorities, requirements | Trigger a rerun, Update results | **No test case create** |
| Test Steps | List, Retrieve, Search NLP templates | Create (single and bulk), Update, Delete | Full CRUD |
| Test Suites | Get test suites | — | Read-only |
| Test Plans | List, configs, plan result, test case results | Trigger, Schedule, Update schedule, Delete schedule | Richest group |
| Test Data | — | Upload profile, Create profile value, Update profile value | Create uses `PATCH` `[unverified: unusual; worth confirming]` |
| Environments | Get an environment | Create, Update | |
| Elements | Get elements, Get an element | Create, Update | API resource is `ui_identifiers`, **not** `elements` — see below |
| Uploads | Get an upload, Get upload versions | Upload a file, Update a file | |
| Results | Plan, suite, case, step, and machine results; JUnit report | — | JUnit = the Junit report export in §20 |
| Integrations | Get refresh status | Refresh Salesforce metadata | Salesforce only |

#### Resource names differ from UI names

The API path for Elements (§16) is `/api/v1/ui_identifiers`. Never construct a
path from a UI label; if a path is needed and not recorded here, say so.

#### The absence of test-case creation is corroborated

Two independent API references — the current Testsigma REST API navigation and the
legacy API documentation — contain no test-case resource. The legacy
`/api/v1/` surface consists of projects, applications, environments,
test_plans, test_suites, uploads, ui_identifiers, requirements, tags,
test_data, reports, execution_results, schedule_executions, and
saved_execution_configs. There is no `test_cases`.

#### Notes for answering

- The API's centre of gravity is **triggering runs and reading results**.
  Authoring is largely outside it.
- The `curl POST` to start a plan and `curl GET` to check status in the Test
  Plan CI/CD tab (§19) are this same API, surfaced in-product.

`[source: Testsigma REST API reference, captured 2026-09-02 from an unpublished
local build of the docs site. Endpoint set may change before publication.]`

---

## §32 Dashboard

`product: suite` `keywords: dashboard, Standard, Advanced, widgets, execution trend, latest runs, custom dashboard, accessibility widgets` `volatility: high`

First item in the Testsigma left nav. Two modes, switched by a **Standard** |
**Advanced** toggle beside the "Dashboard" page title.

There is no "Legacy" dashboard. If a question uses that word, the mode being
asked about is **Standard**.

**Header, both modes:** **Schedule a demo** | **Share Feedback** | **Create
New** (dropdown)

### Standard mode

**URL:** `/ui/dashboard`

- Four stat cards: **Total**, **Passed**, **Failed**, **Not Executed**
- **Latest Runs** panel — tabs **Today** | **This week** | **This month** |
  **This quarter**, each able to show a count badge. Empty state: "There are
  no Runs Today."
- **Test Case Execution Trend** — line chart, y-axis labelled "Test Case",
  x-axis dates, range dropdown (e.g. **Last 30 days**), filter icon, legend
  **Passed** / **Failed**

### Advanced mode

**URL:** `/ui/v2/dashboard/new` (creation)

A custom dashboard builder. Multiple named dashboards are held in tabs along
the top with a **+** to add another.

- **Dashboard Name** — required field
- **Select Widgets** — six category tabs, each showing a count of widgets
  selected within it
- Each widget row: checkbox, widget name, preview (eye) icon, one-line
  description
- Hint when nothing is chosen: "Select at least 1 widget"
- Footer: "N widget selected" | **Cancel** | **Create Dashboard**

#### Widget categories

Six categories. The per-widget reference lives in the product documentation;
what matters here is what each category covers, so a question can be routed.

| Category | Covers |
|---|---|
| Executive Insights & … | Cross-project roll-ups: status summaries, pass/fail trends and percentages, latest runs, project health, test plan analytics |
| Reliability & Stability | Flakiness and failure analysis: test health classification (Consistent / Flaky / Unexecuted), flaky test ranking, top failing tests, error categories, time-to-fix, success rate by retry attempt |
| Test Design & Team P… | Authoring and team throughput: tests authored over time and per user, fixed-failure counts, authored vs executed, stale assets, and distribution by priority / status / type / app type |
| AI Intelligence & Age… | AI vs manual step composition, auto-healing trend, NLP template usage ranking |
| Infrastructure & Perf… | Concurrency and queueing, execution duration (average / median / P95), environment coverage across browser-OS-device, runs per application type |
| Accessibility | WCAG compliance score by level, issues by severity, top criteria with issues, compliance trend, priority issues, per-URL page health, VPAT readiness |

Category labels are truncated in the UI as shown. Widget names are Title Case
with unconventional casing (for example "Nlp Usage Ranked List", "Time To Fix
Test Kpi") — reproduce them as-is rather than correcting them.

The Accessibility widgets are the reporting surface for the Accessibility
Testing configured per test plan (§19) and per step (§11).

`[source: captured 2026-09-02. Advanced mode is on a `/ui/v2/` path and is
newer than the rest of this document.]`

---

## §33 Save Points

`product: suite` `keywords: save point, checkpoint, restore, project state, rollback, import`

**URL:** `/ui/save_points` (underscore, not hyphen)

Top-level item in the Testsigma left nav. A save point is a checkpoint of a
project's state that the project can later be restored to — restoring returns
the project to the exact state it was in when the save point was created.

**Scope:** the project. Save Points sits outside the Create Tests / Test Data
groupings and applies to the project as a whole, not to a single test case.

#### How save points are created

| Method | Notes |
|---|---|
| **Manually** | The **Create Save Point** button, top right of the page |
| **During import** | A save point is created as part of an import |

#### List view

Each save point renders as a card showing:

- Date and time, formatted `Day \| Mon D YYYY \| HH:MM` (example:
  `Tue \| Sep 1 2026 \| 11:54`)
- The save point name
- A type badge — **"Manual Save point"** for manually created ones

`[unverified: the badge distinguishes manual save points from another type,
presumably import-created, but the label used for that other type was not
observed. Do not state it.]`

#### Available operations

Create, edit, delete, and restore.

`[unverified: the per-card controls for edit, delete, and restore were not
visible in the source capture. The operations are confirmed to exist; where
they are invoked from is not.]`

**Possible relation to Unified Mobile:** §25 lists "Save checkpoint support
deferred" as a Unified Mobile limitation. Whether that refers to this feature
is not confirmed — see §29.

---

## §34 Step Groups

`product: suite` `keywords: step group, reusable steps, stepgroup, shared steps`

**URLs:** `/ui/td/{projectId}/step-groups` (hyphen, unlike the underscore in
`/ui/save_points`), list with filters at
`/ui/td/{projectId}/step-groups/filters`

Nav item under **Create Tests**, alongside Test Cases and Elements. A step
group is a reusable unit of steps that a test case invokes, inserted with the
`/stepgroup` step type or conditionally with `/if stepgroup` (§11).

#### Layout

Two panes. Left is a step group list with folder-style grouping and counts
per group, and a toolbar carrying a **+** (create), a checklist icon, a
sort/expand control, a **⋮** menu, and a collapse chevron. Right is the
selected step group.

**Empty state (no step group selected):** heading "Hey There!" with the line
"Select or Create Step Group to start automating tests." and a footer link:
"Check our documentation to learn all about Testsigma."

#### Why they exist

A group of steps common to many test cases — logging in before a transfer,
before a deletion, before a download — is defined once and reused instead of
being duplicated per test case.

#### Test data and iteration

A step group can have a test data profile iterated over it. When it does:

- The **iteration count** can be stored into a variable for later use
- Data set values from the iterated profile can be compared inside an **if**
  condition

#### Reuse across projects

Step groups are **not confined to one project**. A test case inserts an
external one via **Reuse Step Group**, selecting the project, application, and
version, then the step group itself.

Creation and management procedures live in the product documentation (§0).

---

## §35 Addons

`product: suite` `keywords: addon, add-on, marketplace, community, install, custom actions, Classic, Modern`

**URL:** `/ui/addons`

An addon packages additional **actions** usable in test steps — capabilities
Testsigma does not ship natively. Addon descriptions are written in terms of
the actions they contribute (for example "actions to be performed on Browser's
Local storage").

**Not a left nav item.** Addons is reached from an icon in the bottom-left
icon row, below the Command Center hint (§2).

#### Tabs

**Community** | **Installed Addons** | **My Addons**, plus a **+ New Addon**
button for authoring a custom addon.

#### Community listing

Three sections, each with its own search and sort controls and a
**View More...** link:

- **Featured**
- **New & Updated Addons**
- **Testsigma Addons**

#### Addon card fields

| Field | Notes |
|---|---|
| Name | e.g. Broken Link Finder, Mock Geolocation, PDF Actions, ReadCSV, Dynamic gRPC Client, Browser Local storage Actions |
| Star rating | 5-star scale; unrated addons show zero stars |
| Stack badge | **Classic** or **Modern** — see below |
| Author | Community member or Testsigma |
| Description | One or two lines |
| Platform icons | Which application types the addon supports — web, Android, iOS, mobile, and a code/braces icon `[unverified: icon meanings inferred from shape, not from labels]` |
| Download count | With a download icon |
| **Install** | Action button |

#### Addons are stack-specific

Every addon carries a **Classic** or **Modern** badge (§26). An addon built
for one stack does not serve the other — the catalogue contains separate
Classic and Modern builds of the same addon, one described as "the exact
replica of" its counterpart on the other stack.

This is why **add-on support is not yet available for Unified Mobile** (§25):
Unified Mobile is Modern-stack only, and the addon ecosystem is
predominantly Classic.

#### How addons appear elsewhere in Testsigma

| Reference | Meaning |
|---|---|
| **Post Plan Hook → Addon dropdown** (§19) | A test plan can run an addon after the plan completes |
| **Addon details** in Run Results (§20) | An addon's configured parameters, shown per run |
| **"AI in Addons"** in BYOK (§22) | Addons that call an LLM can use the customer's own key |
| **"Add-on support not yet available"** (§25) | Unified Mobile limitation |

These are one concept, not several: an addon contributes actions, can be
invoked as a post-plan hook, may take parameters visible in run results, and
may itself use AI.

---

## §36 Visual Testing

`product: suite` `keywords: visual testing, baseline image, visual difference, Strict, Lenient, threshold, ignore region, Figma, AI Insights, UI regression`

Compares a screenshot captured during a run against a stored **baseline
image** to detect UI regressions. **Off by default**; enabled per test step.

#### Baseline model

| Term | Meaning |
|---|---|
| Baseline image | The stored reference a step is compared against |
| Current / reference image | The screenshot captured on this run |

Enabling visual testing does not produce a comparison immediately: Testsigma
needs a baseline first, so **visual testing is available only after the next
successful run**. The baseline is updated by opening a step's Visual
Difference view and marking the current image as the base image — done
whenever an intentional UI change lands.

#### Where it is enabled

- **Per step** — the step's options menu, or the "Enable Visual Testing for the
  step" setting in the Step Settings panel (§11)
- **In bulk** — select multiple steps and apply a bulk settings update
- **Per test case** — a **Fail Test Case if Visual Testing Fails** toggle in
  Test Case Settings marks the whole test case failed when a visual difference
  is detected
- **Per test plan / run** — the Visual Testing toggles referenced in §19

#### Results

In test case results, steps carry a camera icon: **green** for no visual
difference, **red** where differences were found. The icon opens the **Visual
Difference** overlay, which is where comparison is inspected and configured —
differences highlighted or hidden, images merged, regions selected or ignored,
the comparison mode set, and the current image marked as the new baseline.

In dry run results the same thing appears as the **Visual Difference** button
and the expanded screenshot's three tabs (§15).

#### Comparison modes

| Mode | Behavior |
|---|---|
| **Strict** | Full pixel-by-pixel comparison; exact match required |
| **Lenient** | Pixel-by-pixel with a **threshold** percentage — at a 70% threshold, 70% of pixels must match and differences in the remaining 30% are ignored |

Mode is set from the Visual Difference overlay. Either mode can be scoped to
part of the image with **Select Region** rather than applied to the whole
screenshot.

#### Ignore regions

Regions can be excluded from comparison to keep dynamic content — ads,
timestamps, user-specific data — from producing false positives, so only
meaningful changes are flagged.

#### AI Insights

When visual differences are detected, AI Insights produces a **UI Difference
Analysis Report** identifying the likely root cause of the mismatch with
suggested resolutions. The insights are copyable.

#### Visual testing against Figma designs

The third mode: the baseline is a **Figma frame** rather than a screenshot
from a previous run — comparing the built UI against the design directly.

- Configured from the **Visual Difference – Figma** view, where a Figma frame
  link is supplied along with a target **Browser** and **Resolution**
- For Android and iOS, a mobile device with the required resolution is chosen
  instead
- **The Figma frame's dimensions must match the target device resolution**,
  and the same browser and resolution configured here must be selected at run
  time, or results will not be accurate
- Results appear under the **Visual Difference - Figma** tab in step results
  (§15)

This is why Figma appears as a Product Management integration in §21 and as an
Atto context source in §6 — three distinct uses of the same connection.

`[source: testsigma-docs repository, read 2026-09-02. Documentation may lag the
product; where this section and a UI capture disagree, prefer the capture.]`

---

## §37 Test Suites — Static vs Dynamic

`product: suite` `keywords: static test suite, dynamic test suite, filters, saved filter, AfterTest Suite, suite membership`

Test suites organise test cases by common functionality or scenario. **A test
case can belong to multiple test suites.**

| Type | Membership |
|---|---|
| **Static** | Test cases are chosen manually and the membership is fixed until edited |
| **Dynamic** | Test cases are selected by **filters**; membership updates continuously as test cases start or stop matching |

A dynamic suite is created from the **Create Test Suite** split control via
**Create Dynamic Test Suite**. Its **Filtered Testcases** section takes
filters, an optional sort order, and the filter config can be saved by name
and optionally marked **Public**. Nothing is hand-picked — the system selects
whatever matches.

The practical consequence: a dynamic suite added to a test plan picks up newly
authored test cases without the plan being edited.

#### AfterTest Suite options

The AfterTest Suite toggle (§18) has two axes of configuration:

| Setting | Options |
|---|---|
| When to execute | **Once After All Test Cases** \| **For Every Test Case** |
| If AfterTest Suite fails | **Fail the test suite** \| **Show the test suite result** |

#### Test Suite details page

Shows the test cases and the **test plans** linked to the suite. Right-side
navbar: Test Suite Settings (pre-requisite, AfterTest Suite), Test Suite Info
(name, type, description), Activity (History and Comments).

---

## §38 Data-Driven testing and test data types

`product: suite` `keywords: data driven, iteration, test data profile, test data set, parameter, runtime, environment, data generator, mailbox, concat`

#### Data-Driven toggle

A test case setting (§11). When enabled, the same test case runs repeatedly
against different data sets from a **Test Data Profile**. Each pass is an
**iteration**.

Which data sets are used can be narrowed by three filter kinds:

| Filter | Behavior |
|---|---|
| **Iteration** | Sequential data sets, by greater than / less than / between |
| **Set Name** | Non-sequential, by between / equals / contains / starts with / ends with |
| **Parameter** | Non-sequential, by parameter values within the data sets |

Related settings: **Test Data Profile** selects the profile, **Test Data Set**
selects a set within it.

**Iterations are the unit of rerun.** For a data-driven test case with 4
iterations where 1 and 3 failed, a failed-only rerun reruns only iterations 1
and 3 — not the whole test case.

#### Test data types usable in a step

| Type | What it supplies |
|---|---|
| **Plain Text** (raw) | A static, fixed value typed directly into the step |
| **Parameter** | A variable resolved from a Test Data Profile — the basis of data-driven runs |
| **Runtime** | A value captured during execution and stored in a runtime variable, for use in a later step |
| **Environment** | A value tied to the selected environment — server names, ports, credentials (§17) |
| **Random** | Random alphanumeric data; length given as an integer from 1 to 256 |
| **Data Generator** | Structured realistic data (names, addresses, emails) from Default Test Data Generator Functions |
| **Phone Number** | A provisioned test phone number able to receive SMS, used for 2FA flows |
| **Mail Box** | A provisioned mailbox address, used for OTP and activation-link flows |
| **Concat** | Combines multiple test data values into one |

Default Test Data Generator Functions are grouped into families covering
names, addresses, companies, dates, domains, email, files, ID numbers,
internet data, mailboxes, numbers, phone numbers, strings and random
text, plus type conversion and a function that pulls from a test data profile.
The per-function reference is in the product documentation.

**Custom data generators** can be added — one of the addon types (§40).

---

## §39 Testsigma Tunnel

`product: suite` `keywords: tunnel, localhost, private server, firewall, proxy, local testing, secure connection`

Lets cloud execution reach a **locally hosted or private application**. The
tunnel binary bypasses corporate firewall and proxy restrictions without IP
whitelisting or exposing the app to the public internet, connecting over Web
Socket, HTTPS, and SSH.

This is what makes a locally hosted site testable across the OS, browser, and
resolution combinations available in Testsigma's cloud.

#### Architecture — five components

| Component | Role |
|---|---|
| **Testsigma Tunnel Client** | Distributed binary installed on the machine that can reach the local app; authenticates with a key on start |
| **Authentication Server** | Processes the client's auth request, then assigns a Tunnel Connect Server |
| **Testsigma Tunnel Server** | VM or container in a Testsigma data center; runs an HTTP/TCP proxy forwarding requests from test executors, and hosts the TCP server the client tunnels to |
| **REST API Client / Browser** | The automation environment, which uses the Tunnel Server as its proxy |
| **Remote Address** | The target URL — localhost, a privately hosted site, or a public site |

The client establishes a **bidirectional** tunnel between Testsigma and the
remote address.

#### Platform support

Client builds exist for **macOS, Windows, Linux (Debian & RPM), Docker, and
Kubernetes**. System requirements and install steps are out of scope (§0).

Distinct from **Testsigma Terminal** (§24), which enables Copilot and local
device execution. Tunnel is about network reachability; Terminal is about
local execution.

---

## §40 Addon types and authoring

`product: suite` `keywords: addon types, custom actions, custom function, data generator, conditional if, while loop, post plan hook, Java, TypeScript, engine`

Extends §35. An addon adds **custom actions** to Testsigma's built-in action
repository — actions specific to an application that Testsigma cannot ship
generically.

#### Five addon types

| Type | Purpose |
|---|---|
| **Custom Actions** | New action statements usable as test steps |
| **Test Data Generator** | Custom data generators beyond the default set (§38) |
| **Conditional If** | An if-condition with custom logic |
| **While Loops** | A loop that runs until a custom condition matches |
| **Post-Plan Hooks** | Actions that run after a test plan finishes, regardless of outcome (§19) |

Both engines support all five types.

#### "Engine", not "stack"

The addon documentation calls Classic and Modern **execution engines**.
Addons are **engine-specific**: Classic applications use **Java** addons,
Modern applications use **TypeScript** addons, and an addon built for one
engine **does not appear** in an application running on the other.

#### Authoring language

Classic addons are written in **Java**, Modern addons in **TypeScript**.
Modern addon authoring additionally requires that Modern addon features are
enabled for the account. Toolchain and build detail is out of scope (§0).

Addons can be published to the Community Marketplace or kept in a **private
repository** visible only to their owner — the option for addons containing
proprietary code.

#### Note on the `/function` step type

§11 lists a **Custom Function** step type (`/function`). The documentation has
no separate "custom functions" feature; custom logic reaches test steps
through addons. `[unverified: whether the /function step type invokes an addon
or is a distinct mechanism was not confirmed.]`

`[source for §37–§40: testsigma-docs repository, read 2026-09-02. Prefer UI
captures where they disagree.]`

---

## §41 Testsigma Agent vs Testsigma Terminal

`product: suite` `keywords: agent, terminal, local execution, orchestration, difference, which do I need`

Two separate local utilities, offered as the two tabs of the same download
picker (§24). They are not alternatives — they do different jobs.

| | **Testsigma Agent** | **Testsigma Terminal** |
|---|---|---|
| What it is | A Java utility | A desktop application |
| Purpose | Test **orchestration** on a local machine — queueing tests, running them, fetching results | Enables **Copilot** recording, local device testing, and agentic execution |
| Needed for | Local test plan runs and local ad-hoc runs | Copilot mode (§13), mobile/local recording (§12) |
| Appears in | The **Agents** page, `/ui/agents`, and the **Connected Machine** dropdown on Local Devices tabs (§14, §19) | Its own dashboard, with Copilot and Agentic status per platform (§24) |

A machine running the Agent shows up as a connected machine available for
local execution. The **Setup Agent** button on the Agents page (§24) leads to
the Agent, not the Terminal.

---

## §42 Accessibility Testing

`product: suite` `keywords: accessibility, WCAG, conformance, severity, critical serious moderate minor, VPAT, a11y report, Perceivable Operable`

Scans the application's state at chosen test steps against WCAG criteria.

#### Three levels of configuration

| Level | Where |
|---|---|
| Account | **Settings → Preferences → Web Accessibility Testing** must have **Step Level** enabled first |
| Step | **Enable Accessibility Testing for the step** — per step, or via a bulk settings update across selected steps (§11) |
| Test plan | The **Accessibility Testing** toggle plus **WCAG Versions & Conformance Level**, default WCAG 2.1 AA (§19) |

Because scanning is step-scoped, the check runs against the app state at
exactly the point the step reaches — not against the page as a whole.

**Applicability:** web applications, and Salesforce applications with the same
workflow. Safari and Firefox are not supported (§19). Mobile accessibility
testing is documented separately.

#### Where results appear

After a plan run, **View Reports** for the test plan, then **View Report**
opens the detailed accessibility report.

The report has an **Overview** tab and an **All Issues** tab. Overview
aggregates findings four ways — by severity, by WCAG principle, by page URL,
and by HTML component type. All Issues is a filterable list keyed on WCAG
criterion, filterable by test case or page and carrying a **Step Level** label
confirming the scope of the listing.

The dashboard Accessibility widgets (§32) aggregate this same data across
runs.

#### Vocabulary

**Severity:** Critical · Serious · Moderate · Minor · Success — the same five
values used by the Issues By Severity widget (§32).

**WCAG principles:** Perceivable · Operable · Understandable · Robust.

---

## §43 Atto agent status

`product: all` `keywords: Atto agents, Analyzer, Coverage Planner, Optimizer, coming soon, availability`

§4 lists seven Atto agents. They are not equally available.

| Agent | Status |
|---|---|
| Generator | Available (§6) |
| Runner | Available — Copilot and Agentic execution (§8, §9, §13) |
| Healer | Available — Auto-Healing (§5) |
| Bug Reporter | Available |
| **Analyzer** | Available — see below |
| **Coverage Planner** | Documented only as **"Coming Soon"** |
| **Optimizer** | Documented only as **"Coming Soon"** |

Do not describe Coverage Planner or Optimizer as working features. If asked,
say they are announced but were not yet available as of the source date.

`[the "Coming Soon" status was read from the documentation on 2026-09-02; the
pages themselves are undated and either agent may have shipped since.]`

#### Analyzer

Operates on a **failed test step** from a completed test plan run or dry run.
Returns:

- the error type
- the root cause
- the visual evidence captured during execution
- a set of suggestions

A suggestion can be applied to update the step, or the failure reported to a
bug tracking tool, without leaving the results page. This connects to the
light bulb (AI insights) icon in run result headers (§15) and to the Bug
Reporter's pre-populated fields (§4).

`[source for §41–§43: testsigma-docs repository, read 2026-09-02. Prefer UI
captures where they disagree.]`
