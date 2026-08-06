---
title: Testsigma Product Context — Master Reference
purpose: Single-source product context for building the Ask Assistant index
source: Live product walkthroughs, screen recordings, and product demo videos
source_date: 2026-07-01
compiled: 2026-07-30
products_covered: Suite, Arcus, Atto
status: Verified content only.
---

# Testsigma Product Context — Master Reference

---

## §1 Product architecture and URL map

`product: all` `keywords: architecture, Suite, Arcus, Atto, URLs, login, org selector`

Testsigma has three layers.

| Layer | What it is | URL |
|---|---|---|
| **Suite** | Test automation product | `app.testsigma.com` |
| **Arcus** | Test management product | `arcus.testsigma.com` |
| **Atto** | AI coworker layer spanning both products | no standalone URL |

**Product selector:** `id.testsigma.com` — shows all organizations after
login.

**Arcus URL note:** the Arcus app is at `arcus.testsigma.com`. The older
address `test-management.testsigma.com` in some material refers to the same
product, Arcus.

**QI Platform** — Quality Intelligence Platform — is Testsigma's umbrella
term for Arcus.

#### URL reference table (Suite)

| Area | Path |
|---|---|
| Atto's Home, list view | `/ui/ai-journey/{projectId}` |
| Atto playground, generation session | `/ui/playground/{projectId}` |
| Test Cases | `/ui/td/{projectId}/cases/filters` |
| Elements | `/ui/td/{projectId}/elements/filters/{appId}` |
| Test Data Profiles | `/ui/td/{projectId}/data/folders/{folderId}/sets` |
| Environments | `/ui/td/{projectId}/environments/{id}/details` |
| Uploads | `/ui/td/{projectId}/uploads` |
| Test Suites | `/ui/td/{projectId}/suites` |
| Create Test Suite | `/ui/td/{projectId}/suites/new` |
| Test Plans | `/ui/td/{projectId}/plans` |
| Test Plan detail | `/ui/td/plans/{id}/details` |
| Run Results (plan run) | `/ui/td/results/{planId}/runs/{runId}` |
| Dry Run Results | `/ui/td/dry_run/{runId}/step_results` |
| Agents | `/ui/agents` |
| Terminal OAuth | `/ui/testsigmaterminal/authorize` |

**Mock Server host:** `mockserver-us.testsigma.com`
**Upload file location scheme:** `testsigma-storage://...`

---

## §2 Suite — left navigation tree

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

Notes for the index: **Command Center** is invoked with ⌘K on macOS or
Ctrl+K on Windows and sits in the bottom bar. **Save Points** is a
top-level nav item in Suite. **Elements** lives under **Create Tests**, not
under Test Data.

---

## §3 Application types within a Suite project

`product: suite` `keywords: application type, project type, Web, Android, iOS, Salesforce, Desktop, Windows, Unified`

Nine application types:

1. Web application
2. Unified — cross-platform Android + iOS, Modern stack only
3. Salesforce
4. Android
5. iOS
6. Mobile web
7. Rest API
8. Desktop (Beta)
9. Windows (Lite)

**Unified Mobile:** one test case runs on both Android and iOS. Modern
stack (WebDriverIO) only — **not** compatible with Classic (Selenium/Java).
Full limitation list in §25.

---

## §4 Atto — the AI layer

`product: all` `keywords: Atto, AI agents, Generator, Runner, Healer, Analyzer, Bug Reporter, Coverage Planner, Optimizer`

Atto is the AI coworker layer spanning both Suite and Arcus. It is not
exclusive to either product.

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
item data.

---

## §5 Auto-Healing

`product: suite` `keywords: auto heal, self healing, locator, Healer, Gen AI Auto Heal`

- Toggled at **Settings → Preferences → Auto Healing**.
- In run results, an auto-heal badge appears beside the test case name:
  "N steps heal…".
- **Gen AI Auto Heal (Unified Mobile):** when an element recorded on
  Android fails on iOS, the feature uses the other platform's screenshot as
  context.

---

## §6 Atto's Home — Generate Test Cases (playground)

`product: suite` `keywords: Atto's Home, playground, generate with AI, context sources, AI journey` `volatility: high`

**URLs:** `/ui/ai-journey/{projectId}` (list view), `/ui/playground/{projectId}`
(generation session).

#### Left panel — Atto's Chat

- Source list with a **+** button per source and a count badge
- Prompt field placeholder: "Describe the feature or flow you want to test..."
- **"Read existing test case library"** checkbox — when enabled, Atto reads
  the existing library and adds to or updates it rather than generating
  fresh test cases
- **"Generate with AI"** button (purple/pink gradient)

#### Context sources (all confirmed)

Jira Requirement · Confluence · Figma Designs · XRay Tests · Azure DevOps ·
QTest · Files · Video Recording · Live Recorder · Natural language prompts ·
OpenAPI/Swagger.

**Files source limits:** accepted formats jpeg, png, gif, pdf, docx, xlsx,
md — maximum 5 files.
**Video Recording limits:** maximum 10 files.

#### Upload Files dialog

Drag-and-drop area; accepted formats jpeg, png, gif, pdf, docx, xlsx, md;
max 5 files. Right panel shows a preview. Actions: **Discard** /
**Add File(s)**.

#### Video Recording config

**"+ Add Videos"** button, max 10 files, lists filename and size.

#### Generation in progress

Atto avatar (blue robot) in the right panel, progress bar with percentage,
status text (example: "Analyzing user requirements and attached files..."),
and an elapsed time counter.

#### Generation result — right panel

- Source badges, e.g. "2 Jira stories", "5 Files", "1 Videos"
- Tabs: **All test cases (N)** | **Pending (N)** | **Accepted (N)** |
  **Rejected (N)**
- Test cases grouped by feature category — groups are expandable and show a
  count per group

#### Atto's Home list view — Copilot Generations tab

- Filter tabs: **All** | **To Do** | **In Progress** | **Done**
- Each card shows: ticket ID (example: AG-228), date, **⋯** menu, title,
  test case count, status dropdown
- Top right: **"Generate with AI"** button and **"Open Playground"** button

---

## §7 Test Case Details dialog (Atto playground)

`product: suite` `keywords: test case details, manual steps, automated steps, New badge, Update badge, Pending, Save to Library` `volatility: high`

Opens when clicking a generated test case in the playground's right panel.

**Header:** 🏠 icon + name | type badge (Functional) | state badge | status
badge | "Move with ↑ ↓" | ✕

#### State badges

| Badge | Color | Meaning |
|---|---|---|
| **New** | blue | Freshly AI-generated, never been to the library |
| **Update** | orange/amber | AI is modifying an existing library test case |
| **Pending** | yellow dot | Not yet accepted or rejected |

**Tabs:** Manual Steps | Automated Steps

#### Manual Steps tab

- Left: Atto chat panel, opening line "Hey! I can help you edit your test
  case. Let's start!"
- Prompting Atto to refine steps surfaces a **"Refine manual steps"** button
  in the response
- After refinement: drag handles (⠿), inline editing, **"+ Add Block"** /
  **"+ Add Step"**, **Cancel** / **Save**
- **"See What's New"** button — for test cases in the Update state

#### Automated Steps tab

- NLP steps render element names as colored links
- **"Generate Automated Steps"** button (purple) converts manual steps to NLP
- **Edit** button for inline editing

#### Bottom action bar

- **Run with Copilot** — purple dropdown; chevron opens the environment
  selector
- **Agentic Learning (Beta)** — teal/green dropdown with chevron
- **Reject** | **Save to Library**

Environment selector dropdown options (example set): efr, Travel
(booking.co…), New Facebook, Simply Travel, Global.

#### Save to Library behavior

Saves into Suite under the **"AI Generated Feature"** top-level folder.
Scenario folders are auto-named `AI Generated Scenario_[date]_[time]`.
Status is set to **Draft**.

---

## §8 Agentic Learning (Beta)

`product: suite` `keywords: agentic learning, agent, live app, Record Manual Steps, Start Learning Live App` `volatility: high`

**What it is:** an AI agent autonomously executes a manual test case on a
live app, observes real behavior, and generates a corrected automated test
case. Tagline: "Adapt to Real User Journeys."

**Entry point:** the **"Agentic Learning (Beta)"** button in the Test Case
Details bottom bar.

**Pre-run notice text, verbatim:**

> "Before proceeding with agent initialization, we kindly request you verify
> the manual test flow. Please note that even if you start your agent, you
> will still have full access to your application through the browser. This
> means that if the agent stops working or encounters any problems that
> prevent it from moving forward, you can simply continue using the
> application directly in the browser to guide the agent further."

#### Flow

1. Click **Agentic Learning** → a Copilot window opens alongside Test Case
   Details
2. Pre-run notice appears
3. User types: **"Start Learning Live App"** → sends to Atto
4. The app opens in **Chrome for Testing**. Copilot panel: left = chat and
   progress log, right = step list
5. The agent runs steps autonomously — green ✓ as steps pass, spinner on the
   current step
6. Step log format: step number + description, then sub-bullets such as
   "Clicked button with index N:" and "Verdict: Success"
7. After manual steps complete, user types: **"Start Generating Automated
   Test Case"**
8. Atto generates automated NLP steps — a loading skeleton shows in the
   Automated Steps tab
9. Steps appear with Testsigma element names, then save to library

#### Copilot panel controls (Agentic Learning)

- **Resume** button (green)
- Step-back (|◄), retry/refresh, settings gear
- **Record Manual Steps** button — the user manually guides the agent when
  it is stuck
- Two red circle buttons (stop/abort)
- Bottom text field states: "Learning..." / "Generating..."

**After save:** the test case appears in Suite as **Draft** under the AI
Generated Feature folder.

---

## §9 Run with Copilot (from Atto playground)

`product: suite` `keywords: Run with Copilot, Generate Steps button, locator update, pending test case` `volatility: high`

**What it is:** executes a generated (Pending) test case using Copilot mode,
verifying automated steps against the live app. Tagline: "Debug & Fix Issues
Instantly."

**Key difference from standard Copilot:** a **"Generate Steps"** button
(purple) appears in the Copilot panel header. It regenerates or fills in
automation steps mid-session when locators are missing or steps fail.

**Post-run yellow banner:** "The test steps might be updated. Refresh the
page to see the latest changes." with a **Refresh** button.

---

## §10 Agentic Learning vs Run with Copilot

`product: suite` `keywords: comparison, agentic learning vs copilot, which to use`

| | Agentic Learning | Run with Copilot |
|---|---|---|
| Input | Manual steps | Automated NLP steps |
| Agent role | Drives + generates automation | Executes steps, updates locators |
| User intervention | Record Manual Steps if stuck | Set debug points, pause, record |
| Output | New automated test case | Updated/verified automated test case |

---

## §11 Test Cases (Suite)

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

#### Right rail — 6 icons, top to bottom

1. **Test Case Info** — name, description, created/updated by
2. **Ad-Hoc Runs** — history, Re-Run button, View Details link
3. **Test Case Settings** — Pre-Requisite, Test Data Profile, Data Driven
   toggle, Visual Testing toggle, AfterTest Case toggle
4. **Manage Test Case** — Status (Draft / In Review / Ready / Obsolete /
   Rework), Priority (Critical / Major / Medium / Minor), Assignee,
   Reviewer, Test type, Requirement, Labels, Custom Fields
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

## §12 The Recorder (Suite)

`product: suite` `keywords: recorder, record steps, element inspector, locator precedence, Ctrl+Shift+F, test lab`

#### Floating panel controls

settings icon · screenshot icon · expand icon · ✕ | element inspector icon ·
**Pause** (green) · **Stop** (red)

#### How it works

Hover an element → tooltip shows the type (TEXT, INPUT, BUTTON) plus the
name → click → the step is captured. **`Ctrl+Shift+F`** freezes the element
inspector, which is how dynamic dropdowns are captured.

#### Locator Precedence (draggable order)

XPath → CSS Selector → ID → Name → Link Text

#### Copilot inside the recorder

A separate floating panel. **"Generate Test Scenarios"** returns 5
context-aware suggestions; selecting one auto-generates all steps.

#### Mobile and local recording

Requires **Testsigma Terminal**. Test Lab options:

- Local Devices — "2x Faster Authoring"
- Testsigma Lab
- BrowserStack
- Testsigma Emulator — "5x Faster Authoring", Beta

---

## §13 Copilot Mode (Test Case Editor top bar)

`product: suite` `keywords: Copilot, Terminal required, Chrome for Testing, execution point, debug point, launch config`

**Requires:** Testsigma Terminal running locally — v2.2.2+ for auto-launch.

**When Terminal is not running:** "Testsigma Terminal must be running on your
desktop to use the Copilot." with a **Launch Terminal** button and a
download option.

#### Copilot launch config panel fields

- Copilot Status — green dot, "Copilot is ready"
- Browser — Chrome for Testing
- Set initial debug point — dropdown of test case steps
- Execute from step — dropdown
- Environment + **Manage Variables**
- Additional settings: Page Timeout (default 30s), Step Timeout (default
  30s), Apply to all steps, Screenshot capture, Mock Server
- Desired Capabilities: Key / Data type / Value
- **Launch** / **Cancel** / **Save configuration**

**Saved Configs:** named configurations. When one is loaded, the footer shows
**"Update configuration"** plus **"Save configuration."**

#### Copilot execution

- Runs in Chrome for Testing (v138, shown with a warning banner)
- Copilot panel control bar: Pause/Resume, Step Over (|►), step controls,
  settings gear, **Rec** button
- **Execution Point** — blue marker — the currently executing step
- **Debug Point** — red dot — a breakpoint where execution pauses
- When paused, the user interacts with the app and new steps are recorded
  live and appended
- Status bar: "Recording in progress" / "N Steps recorded and added to the
  test case"
- The session generates a dry run result at `/ui/td/dry_run/{id}/step_results`

---

## §14 Ad-Hoc Run panel

`product: suite` `keywords: ad-hoc run, run button, test lab, headless, desired capabilities, saved configs`

**Entry:** the **Run** button in the test case editor.

**Panel header:** "Ad-Hoc Run" plus a **"Saved Configs"** dropdown.

#### Test Lab tabs

| Tab | Fields |
|---|---|
| **Testsigma Lab** | OS & Version, Browser, Resolution (e.g. 1920x1080), Headless Test checkbox |
| **Local Devices** | Connected Machine dropdown (agents named `username_YYYY-MM-DD_HHhMMmSSs`), Browser |
| **BrowserStack** | OS / Browser / Resolution |

#### Present on all tabs

- Environment dropdown + **"Manage Variables"** link
- Additional settings (collapsible): Page Timeout (≤120 secs, default 30),
  Step Timeout (≤120 secs, default 30), Apply to all steps toggle,
  Screenshot capture (For all steps), Mock Server + **"Create New Server"**
  link
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

status badge | duration HH:MM:SS.mmm | version badges | **More details**
link | action icons — light bulb (AI insights), bar chart (analysis), video
(execution recording), clock (timeline) | **Re-Run** button

#### More Details panel

- Donut chart: Total Steps, then Queued / Passed / Failed / Not Executed /
  Stopped
- Machine Details: lab type, machine name, version, resolution
- Test Case Details: Start Time, Adhoc Run ID (#NNNN), Priority, Type, Data
  Driven, Executed by

#### Step detail panel

Screenshot thumbnail (expandable, downloadable) | **Visual Difference**
button | Message | Test data | Step Settings | Metadata | Step Details — all
collapsible.

**Screenshot expanded view:** three tabs — **Screenshot** | **Visual
Difference** | **Visual Difference - Figma**. Includes a Download link and
left/right arrows for step navigation.

**Visual Difference button tooltip when not enabled:** "Visual Testing is not
enabled for this Step."

---

## §16 Elements — object repository (Suite)

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

## §17 Test Data (Suite)

`product: suite` `keywords: test data profiles, ETF, sensitive data, environments, environment variables, uploads, mock server`

#### Test Data Profiles

**URL:** `/ui/td/{projectId}/data/folders/{folderId}/sets`

- Columns: S.No., ETF toggle, Set Name, then parameter columns with a 🔒 lock
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
  Variable field + Default Value field (🔒 for sensitive), with
  **Cancel** / **Creating...**
- Toast on creation: "Environment created successfully."

#### Uploads

**URL:** `/ui/td/{projectId}/uploads`

- Columns: File Name, File Location (`testsigma-storage://...`), Version,
  Last Updated By
- **Upload** button top right

#### Mock Servers

A nav item under Test Data. The Mock Server itself is an external service at
`mockserver-us.testsigma.com`, used for API mocking, and is selectable in
Ad-Hoc Run, Copilot launch config, and Test Plan settings, each of which
offers a **"Create New Server"** link. Detailed Mock Server management UI is
not covered by the source material — see §30.

---

## §18 Test Suites (Suite)

`product: suite` `keywords: test suite, static, dynamic, AfterTest Suite, prerequisite`

**URL:** `/ui/td/{projectId}/suites`

**Suite list columns:** Title, Type (Static / Dynamic), Created, Created by,
Status (No Runs / Passed / Failed, with a donut icon).

#### Create Test Suite — full-page form at `/ui/td/{projectId}/suites/new`

- **Basic Details:** Name, Description toggle, Pre-Requisite dropdown, Labels
- **Test Cases (0):** "Add/Remove Test Case" link opens a dual-panel picker
- **AfterTest Suite** toggle, with an ⓘ tooltip
- **Create** / **Cancel**

Toast on creation: "Test Suite created successfully."

---

## §19 Test Plans (Suite)

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
  machine, Test Lab (Testsigma Lab / Local Devices / BrowserStack),
  Connected Machine dropdown, Browser (Chrome for Testing), Headless Test,
  **Reset session for every test case** (default checked), **Hard Reset
  session for every test suite**, Desired Capabilities, then **Create
  Profile** / **Cancel**

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
  **Report-and-continue** options. Rerun options: None / All Test Cases /
  Only Failed Test Cases.
- **Post Plan Hook:** Addon dropdown

#### Test Plan detail view — `/ui/td/plans/{id}/details`

Three tabs:

1. **Test Machine & Suites**
2. **CI/CD Integrations** — Default Integrations logos: Azure DevOps,
   CircleCI, Codeship, Bamboo, Jenkins, AWS, Travis CI, Generic Shell,
   TestRail, QTest, GitHub, GitLab. Includes a REST API section with a
   `curl POST` example to start a plan and a `curl GET` example to check
   status.
3. **Schedules**

**Run Now split button dropdown:** Run | Partial Run.

---

## §20 Run Results — test plan runs (Suite)

`product: suite` `keywords: run results, plan run, run overview, donut chart, addon details, consolidated duration`

**URL:** `/ui/td/results/{planId}/runs/{runId}`

**Left panel:** Test Runs list — run numbers with status icons (red ✗
Failed, gray ○ Stopped).

**Center view switcher dropdown:** Test Suites | Test Cases |
Test Machines (N).

**Test Cases view columns:** pass/fail icon, test case name, auto-heal badge
("N steps heal…"), suite name, and 3 action icons — re-run, view results,
settings.

#### Run Overview panel (right)

- Donut chart with count, plus Passed / Failed / Not Executed / Stopped counts
- **Last Run:** Start Time, End Time, Consolidated Duration
- **Test plan settings:** Build (editable ✏️), Execution type, Environment
- **Post plan hook result:** Passed / Failed / No Runs
- **Addon details** — example "qTest Integration": API_KEY, RELEASE_ID,
  CYCLE_ID, OVERRIDE_ON_RERUN, PROJECT_ID

---

## §21 Settings — Integrations (Suite)

`product: suite` `keywords: integrations, Jira, Slack, BrowserStack, CI/CD, bug reporting, test management, settings`

Integration categories and their members. A ✓ marks entries recorded as
confirmed in the source walkthrough; unmarked entries are listed in the UI
but were not individually confirmed.

| Category | Integrations |
|---|---|
| **Bug Reporting** | Jira Cloud ✓, Jira Server/DC, Xray Cloud, Xray Server, Azure DevOps Boards ✓, Monday.com ✓, YouTrack ✓, Mantis, Bugzilla, Backlog, ClickUp, Linear, Trello |
| **Collaboration** | Slack, MS Teams, Google Chat |
| **Test Lab** | BrowserStack, SauceLabs, Kobiton, TestMU, LambdaTest |
| **Test Management** | Test Management by Testsigma (Arcus), Zephyr Cloud, Xray, qTest, TestRail |
| **Product Management** | Figma ✓, Confluence Cloud ✓, Confluence Server, Jira ✓, Xray Server, GitHub |
| **CI/CD** | Jenkins, GitHub, GitLab, Azure DevOps, Bitbucket, CircleCI, Travis CI, Bamboo, Bitrise, AWS CodePipeline, AWS Lambda, Google Cloud Build, Codemagic, CodeShip, Copado, Gearset, Shell Script, REST API |

---

## §22 Gen AI Keys — BYOK (Suite)

`product: suite` `keywords: BYOK, Gen AI Keys, OpenAI, Azure OpenAI, LLM keys, admin settings`

**BYOK** = Bring Your Own Key — enterprise LLM key management.

- Location: **Admin Settings → Gen AI Keys**
- Supports the customer's own OpenAI or Azure OpenAI keys, configured
  **per feature**
- Features with per-feature LLM config: Copilot in Web/Mobile Recorder, Test
  Data Generation, API testing, Auto Heal, Visual Analysis, AI in Addons
- Any feature left unmapped uses Testsigma's own model providers

---

## §23 Settings — Preferences (Suite)

`product: suite` `keywords: preferences, auto healing toggle, review management, onboarding tutorials, generative AI`

- Auto Healing toggle
- Control Who Can Stop Executions
- Review Management — Test Case / Element / Self
- Disable Onboarding Tutorials
- Generative AI features

---

## §24 Testsigma Terminal

`product: suite` `keywords: Terminal, desktop app, macOS, DMG, agent, copilot ready, agents page, local devices`

**What it is:** a native macOS desktop app that enables Copilot recording,
local device testing, and agentic execution. It is **required for Copilot
mode**.

**Version:** v2.5.3 (July 2026). Auto-launch requires v2.2.2+.

**Download sizes:** Intel Chip 160 MB · Apple Silicon 154 MB · roughly
490 MB installed.

#### Setup flow

1. Download the DMG and drag it to Applications
2. **"Set up Testsigma Terminal"** screen → **Configure Settings**
   (proxy / SSL / memory) or **Continue**
3. **"Login to Testsigma"** → browser OAuth at
   `/ui/testsigmaterminal/authorize`
4. Browser shows: "Logged in as [email]. The desktop app should have opened."
5. Terminal shows "Preparing agent..." then the main dashboard

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
- Special entries seen: `localhost@Nandhini`, `Mac_Machine`
- Top right: **"Testsigma Terminal"** button and **"Setup Agent"** button

---

## §25 Arcus — test management

`product: arcus` `keywords: Arcus, test management, QI Platform, import cases, Zephyr, TestRail, two-way sync`

**URL:** `arcus.testsigma.com`. Also referred to by the umbrella
term **QI Platform** (Quality Intelligence Platform).

#### Arcus left navigation

```
[Project Switcher]
Dashboard
Atto's Home
Test Cases
Step Groups
Data Sets
Test Runs
Test Plans
Reports
Import Cases
─────────────
Invite Users
Settings
What's New
Help
[User Profile — bottom-left]
```

**Import Cases sources:** Zephyr, TestRail, BrowserStack, CSV.

**Arcus Settings integrations:** Jira (with Jira App), Azure DevOps, Linear,
ClickUp, Figma, Confluence, and **two-way sync with Suite**.

**Index note:** Arcus nav differs from Suite. Arcus has *Data Sets*,
*Test Runs*, *Reports*, *Import Cases*, *Invite Users*, *What's New*, and
*Help*; Suite has *Create Tests*, *Test Data*, *Test Suites*, *Run Results*,
and *Save Points*. Both have Dashboard, Atto's Home, Test Cases, Step
Groups, Test Plans, and Settings.

---

## §26 Unified Mobile testing — In-Progress, July 2026

`product: suite` `stack: modern` `keywords: Unified Mobile, cross-platform, dual locator, platform applicability, limitations` `volatility: high`

One test case runs on both Android and iOS. **Modern stack only** —
WebDriverIO. Not compatible with Classic (Selenium/Java).

#### Current limitations

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

## §27 Execution stacks — Classic vs Modern

`product: suite` `keywords: Classic, Modern, Selenium, Playwright, WebDriverIO, BT Runner, TypeScript`

| | Classic | Modern |
|---|---|---|
| Framework | Selenium/Java | Playwright (web) + WebDriverIO (mobile) |
| Language | Java | TypeScript |
| Unified Mobile | ✗ | ✓ only |
| Status | Legacy | Current |

**BT Runner** is the TypeScript-based execution framework on the Modern
stack. **WDIO** (WebDriverIO) is the TypeScript wrapper for Appium used by
Unified Mobile.

---

## §28 Terminology reference

`product: all` `keywords: glossary, definitions, terminology, what does X mean`

| Term | Definition |
|---|---|
| Suite | Test automation product (`app.testsigma.com`) |
| Arcus | Test management product (`arcus.testsigma.com`) |
| Atto | AI coworker spanning both products |
| Copilot | AI assistant for step generation — in the recorder, editor, or Atto playground |
| Agentic Learning | Beta: agent executes a manual test case live and generates automated steps from observations |
| Run with Copilot | Executes a generated test case via Copilot; auto-updates locators post-run |
| NLP | Natural Language Processing — Testsigma's human-readable step syntax |
| BT Runner | TypeScript-based execution framework (Modern stack) |
| WDIO | WebDriverIO — TypeScript wrapper for Appium (Unified Mobile) |
| Testsigma Terminal | Native desktop app enabling Copilot recording and local device testing |
| Classic stack | Selenium/Java (legacy) |
| Modern stack | Playwright (web) + WebDriverIO (mobile) |
| BYOK | Bring Your Own Key — enterprise LLM key management |
| Mock Server | External service (`mockserver-us.testsigma.com`) for API mocking |
| Tunnel | Testsigma Tunnel, for accessing locally hosted apps during cloud execution |
| Auto-Healing | AI feature that auto-corrects failed element locators during execution |
| AfterTest Suite | Special test case run after a suite completes (teardown) |
| AfterTest Case | Steps run after a test case regardless of result |
| Recovery Actions | Per-failure-type configuration in Test Plans |
| Unified Mobile | Application type where one test case runs on both Android and iOS |
| Sprint Planner | Atto feature for test planning from sprint or work item data |
| AI Generated Feature | Top-level folder in Suite where all Atto-generated test cases are saved |
| New badge | Blue badge on a generated test case: freshly AI-generated |
| Update badge | Orange badge on a generated test case: modifying an existing library test case |
| Pending badge | Yellow dot on a generated test case: not yet accepted or rejected |
| Save to Library | Moves an Atto-generated test case to Suite as Draft |
| Chrome for Testing | Dedicated Chrome build (v138) used exclusively for Copilot and Agentic sessions |
| Generate Steps button | Appears in the Copilot panel header during Run with Copilot — regenerates automation steps mid-session |
| Execution Point | Blue marker in the Copilot panel showing the currently executing step |
| Debug Point | Red dot in the Copilot panel — a breakpoint where execution pauses |
| QI Platform | Quality Intelligence Platform — Testsigma's umbrella term for Arcus |

---

## §29 All the ways to create a test case in Suite

`product: suite` `keywords: create test case, ways to create, author test case, write tests, NLP, Recorder, Copilot, Atto, generate tests, API`

Suite has six routes to create a test case, freely mixable in one test:

1. **Type NLP steps** in the test case editor (Create Tests → Test Cases); pressing the / key opens the step type menu.
2. **Record** — the editor's Record button launches the Recorder extension; clicks become steps and elements. Mobile/local recording needs Testsigma Terminal.
3. **Copilot** — AI step generation in the recorder or editor; "Generate Test Scenarios" builds all steps for a picked scenario. Requires Terminal.
4. **Generate with Atto** — the playground creates test cases from Jira, Confluence, Figma, files, videos, or a prompt; saved to the library as Draft.
5. **Agentic Learning (Beta)** — an agent runs a manual test on the live app and generates the automated test case.
6. **REST API** — the POST /test_cases endpoint creates test cases programmatically.

Atto generation is not yet available for the Unified Mobile application type.
