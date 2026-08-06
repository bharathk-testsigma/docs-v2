## Testsigma Product Knowledge

**Built from:** Live product walkthroughs, screen recordings, and product demo
videos (July 1, 2026). Use this section as the authoritative product reference
when writing — do not invent terminology, UI labels, or flows not described here.

---

### Product Architecture

Testsigma has three layers:
- **Suite** (`app.testsigma.com`) — test automation product
- **Arcus** (`test-management.testsigma.com`) — test management product
- **Atto** — AI coworker layer spanning both products

**Product selector:** `id.testsigma.com` — shows all organizations after login.

---

### Suite — Left Navigation

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

---

### Application Types (within a Project)

1. Web application
2. Unified (cross-platform Android + iOS, Modern stack only)
3. Salesforce
4. Android
5. iOS
6. Mobile web
7. Rest API
8. Desktop (Beta)
9. Windows (Lite)

**Unified Mobile:** One test case runs on both Android and iOS. Modern stack
(WebDriverIO) only — NOT compatible with Classic (Selenium/Java).

---

### Atto's Home — Generate Test Cases (Playground)

**URLs:** `/ui/ai-journey/{projectId}` (list view), `/ui/playground/{projectId}` (generation session)

**Left panel — Atto's Chat:**
- Source list with + button per source and count badge
- Prompt field: "Describe the feature or flow you want to test..."
- "Read existing test case library" checkbox — when enabled, Atto reads existing library and adds/updates rather than generating fresh
- "Generate with AI" button (purple/pink gradient)

**Context sources (all confirmed):**
Jira Requirement, Confluence, Figma Designs, XRay Tests, Azure DevOps, QTest,
Files (jpeg/png/gif/pdf/docx/xlsx/md, max 5), Video Recording (max 10),
Live Recorder, Natural language prompts, OpenAPI/Swagger.

**Upload Files dialog:** drag and drop area, accepted: jpeg, png, gif, pdf, docx, xlsx, md — max 5 files. Right panel preview. Discard / Add File(s).

**Video Recording config:** "+ Add Videos" button, max 10 files, lists filename + size.

**Generation in progress:** Atto avatar (blue robot) in right panel, progress
bar + percentage, status text ("Analyzing user requirements and attached files..."),
elapsed time counter.

**Generation result — right panel:**
- Source badges: "2 Jira stories", "5 Files", "1 Videos"
- Tabs: All test cases (N) | Pending (N) | Accepted (N) | Rejected (N)
- Test cases grouped by feature category (expandable, count per group)

**Atto's Home list view — Copilot Generations tab:**
- Filter tabs: All | To Do | In Progress | Done
- Each card: ticket ID (e.g., AG-228), date, ⋯ menu, title, test case count, status dropdown
- "Generate with AI" button top right + "Open Playground" button

---

### Test Case Details Dialog (from Atto Playground)

Opens when clicking a generated test case in the right panel.

**Header:** 🏠 icon + name | type badge (Functional) | state badge | status badge | "Move with ↑ ↓" | ✕

**State badges:**
- **New** (blue) — freshly AI-generated, never been to library
- **Update** (orange/amber) — AI modifying an existing library test case
- **Pending** (yellow dot) — not yet accepted or rejected

**Tabs:** Manual Steps | Automated Steps

**Manual Steps tab:**
- Left: Atto chat panel — "Hey! I can help you edit your test case. Let's start!"
- Prompt Atto to refine steps — "Refine manual steps" button appears in response
- After refinement: drag handles (⠿), inline editable, "+ Add Block" / "+ Add Step", Cancel / Save
- "See What's New" button (for Update-state cases)

**Automated Steps tab:**
- NLP steps with element names as colored links
- "Generate Automated Steps" button (purple) — converts manual steps to NLP
- Edit button for inline editing

**Bottom action bar:**
- **Run with Copilot** (purple dropdown, chevron → environment selector)
- **Agentic Learning (Beta)** (teal/green dropdown, chevron)
- **Reject** | **Save to Library**

**Environment selector dropdown options (example):** efr, Travel (booking.co...), New Facebook, Simply Travel, Global.

**Save to Library:** Saves to Suite under "AI Generated Feature" top-level folder. Scenario folders auto-named: `AI Generated Scenario_[date]_[time]`. Status set to "Draft".

---

### Agentic Learning (Beta)

**What it is:** AI agent autonomously executes a manual test case on a live
app, observes real behavior, and generates a corrected automated test case.
Tagline: "Adapt to Real User Journeys."

**Entry:** "Agentic Learning (Beta)" button in Test Case Details bottom bar.

**Pre-run notice text:** "Before proceeding with agent initialization, we kindly
request you verify the manual test flow. Please note that even if you start your
agent, you will still have full access to your application through the browser.
This means that if the agent stops working or encounters any problems that
prevent it from moving forward, you can simply continue using the application
directly in the browser to guide the agent further."

**Flow:**
1. Click Agentic Learning → Copilot window opens alongside Test Case Details
2. Pre-run notice appears
3. User types: "Start Learning Live App" → sends to Atto
4. App opens in Chrome for Testing. Copilot panel: left = chat/progress log, right = step list
5. Agent runs steps autonomously — green ✓ as steps pass, spinner on current step
6. Step log format: step number + description → sub-bullets ("Clicked button with index N:", "Verdict: Success")
7. After manual steps complete: user types "Start Generating Automated Test Case"
8. Atto generates automated NLP steps (loading skeleton shown in Automated Steps tab)
9. Steps appear with Testsigma element names → save to library

**Copilot panel controls:**
- Resume button (green)
- Step-back (|◄), retry/refresh, settings gear
- **Record Manual Steps** button — user manually guides agent when stuck
- Two red circle buttons (stop/abort)
- Bottom text field: "Learning..." / "Generating..."

**After save:** Test case in Suite as "Draft" under AI Generated Feature folder.

---

### Run with Copilot (from Atto Playground)

**What it is:** Executes a generated (Pending) test case using Copilot mode,
verifying automated steps on the live app. Tagline: "Debug & Fix Issues Instantly."

**Key difference from standard Copilot:** "Generate Steps" button (purple)
appears in Copilot panel header — regenerates/fills in automation steps
mid-session when locators are missing or steps fail.

**Post-run yellow banner:** "The test steps might be updated. Refresh the page
to see the latest changes." + Refresh button.

**Agentic Learning vs Run with Copilot:**

| | Agentic Learning | Run with Copilot |
|---|---|---|
| Input | Manual steps | Automated NLP steps |
| Agent role | Drives + generates automation | Executes steps, updates locators |
| User intervention | Record Manual Steps if stuck | Set debug points, pause, record |
| Output | New automated test case | Updated/verified automated test case |

---

### Test Cases (Suite)

**URL:** `/ui/td/{projectId}/cases/filters`

**Test Case Editor top bar:** test case name | Status | Record ▾ | Run | Copilot | ⋯
- **⋯ menu:** Clone | Delete
- **Record dropdown:** Record / Record in Incognito Mode

**Step type selector (slash-command shortcuts):**

Standard: Natural Language `/` | Step Group `/stepgroup` | Create a Block `/blocks` | For Loop `/forloop` | While Loop `/whileloop` | Custom Function `/function` | Rest API `/api`

Conditional: If Natural Language `/if` | If Step Group `/if stepgroup` | If Custom Function `/if function` | If Rest API `/if api`

**Right rail icons (6, top to bottom):**
1. Test Case Info (name, description, created/updated by)
2. Ad-Hoc Runs (history, Re-Run button, View Details link)
3. Test Case Settings (Pre-Requisite, Test Data Profile, Data Driven toggle, Visual Testing toggle, AfterTest Case toggle)
4. Manage Test Case (Status: Draft/In Review/Ready/Obsolete/Rework | Priority: Critical/Major/Medium/Minor | Assignee | Reviewer | Test type | Requirement | Labels | Custom Fields)
5. Activity (History + Comments tabs)
6. Help (Examples, Action List, Get Started tabs)

**Step Settings panel (per-step):**
- Pre-Requisite dropdown
- Step Timeout (≤120 secs)
- Screenshot capture: Always / Only on step failure
- No. of Retries on Step Failure
- Stop Test Case execution on Test Step failure (default ON)
- Ignore this step result in Test Case Result
- Disable step
- Enable Visual Testing for the step
- Enable Accessibility Testing for the step
- Highlight element in screenshot

---

### The Recorder

**Floating panel controls:** settings icon, screenshot icon, expand icon, ✕ | element inspector icon, Pause (green), Stop (red).

**How it works:** Hover element → tooltip shows type (TEXT, INPUT, BUTTON) + name → click → step captured. `Ctrl+Shift+F` freezes element inspector for dynamic dropdowns.

**Locator Precedence (draggable):** XPath, CSS Selector, ID, Name, Link Text.

**Copilot inside recorder:** Separate floating panel. "Generate Test Scenarios" → 5 context-aware suggestions. Select one → all steps auto-generated.

**For mobile/local recording:** Requires Testsigma Terminal. Test Lab options: Local Devices (2x Faster Authoring), Testsigma Lab, BrowserStack, Testsigma Emulator (5x Faster Authoring, Beta).

---

### Copilot Mode (Test Case Editor Top Bar)

**Requires:** Testsigma Terminal running locally (v2.2.2+ for auto-launch).

**When Terminal NOT running:** "Testsigma Terminal must be running on your desktop to use the Copilot." → Launch Terminal button + download option.

**Copilot launch config panel fields:**
- Copilot Status: green dot "Copilot is ready"
- Browser: Chrome for Testing
- Set initial debug point (dropdown of test case steps)
- Execute from step (dropdown)
- Environment + Manage Variables
- Additional settings: Page Timeout (default 30s), Step Timeout (default 30s), Apply to all steps, Screenshot capture, Mock Server
- Desired Capabilities: Key / Data type / Value
- Launch / Cancel / Save configuration

**Saved Configs:** named configurations — when loaded, footer shows "Update configuration" + "Save configuration."

**Copilot execution:**
- Chrome for Testing browser (v138, with warning banner)
- Copilot panel control bar: Pause/Resume, Step Over (|►), step controls, settings gear, Rec button
- **Execution Point** (blue marker) = current executing step
- **Debug Point** (red dot) = breakpoint — pauses here
- When paused: user interacts with app, new steps recorded live and appended
- Status bar: "Recording in progress" / "N Steps recorded and added to the test case"
- Session generates a dry run result: `/ui/td/dry_run/{id}/step_results`

---

### Ad-Hoc Run Panel

**Entry:** "Run" button in test case editor.

**Panel header:** "Ad-Hoc Run" + "Saved Configs" dropdown.

**Test Lab tabs:**
- **Testsigma Lab:** OS & Version, Browser, Resolution (e.g., 1920x1080), Headless Test checkbox
- **Local Devices:** Connected Machine dropdown (agents named `username_YYYY-MM-DD_HHhMMmSSs`), Browser
- **BrowserStack:** same OS/Browser/Resolution fields

**All tabs include:**
- Environment dropdown + "Manage Variables" link
- Additional settings (collapsible): Page Timeout (≤120 secs, default 30), Step Timeout (≤120 secs, default 30), Apply to all steps toggle, Screenshot capture (For all steps), Mock Server + "Create New Server" link
- Desired Capabilities (collapsible): Key / Data type (String) / Value

**Footer:** Run Now | Cancel | Save configuration (| Update configuration when saved config loaded).

---

### Dry Run Results

**URL:** `/ui/td/dry_run/{runId}/step_results`

**Step icons:** green ✓ (passed) | spinning loader (executing) | gray circle (queued) | red ✗ (failed) | red slashed circle (not executed/stopped)

**Completed run header:** status badge | duration HH:MM:SS.mmm | version badges | More details link | action icons (light bulb = AI insights, bar chart = analysis, video = execution recording, clock = timeline) | Re-Run button.

**More Details panel:**
- Donut chart: Total Steps, Queued / Passed / Failed / Not Executed / Stopped
- Machine Details: lab type, machine name, version, resolution
- Test Case Details: Start Time, Adhoc Run ID (#NNNN), Priority, Type, Data Driven, Executed by

**Step detail panel:** screenshot thumbnail (expandable, downloadable) | Visual Difference button | Message | Test data | Step Settings | Metadata | Step Details (all collapsible).

**Screenshot expanded view:** three tabs: Screenshot | Visual Difference | Visual Difference - Figma. Download link. Left/right arrows for step navigation.

**Visual Difference button tooltip (when not enabled):** "Visual Testing is not enabled for this Step."

---

### Elements (Object Repository)

**URL:** `/ui/td/{projectId}/elements/filters/{appId}`

**Columns:** Element Name, Type, Screen Name, Created, Affected List, Reviewer, Status.

**Element types:** XPATH, CSS Selector, ID, Name, Link Text, Accessibility ID (mobile).

**Status values:** Draft, In Review, Ready, Obsolete.

**"Copilot Placeholder Screen"** — screen name used for AI-captured elements.

**Top bar:** Search, export icon, import icon, Record dropdown (Record / Record in Incognito Mode), Create Element button, "Saved Filters" dropdown, Show Filters button.

---

### Test Data

**Test Data Profiles URL:** `/ui/td/{projectId}/data/folders/{folderId}/sets`

- Columns: S.No., ETF toggle, Set Name, [Parameter columns] with 🔒 lock icon for sensitive
- Sensitive/password values displayed as masked dots
- Top right: export/import icons, link icon, history icon, + (add column)
- "+ " button bottom-left (add row)

**New profile:** Blank grid, "Untitled" title, Parameter 1/2/3 default columns, 4 empty rows, Create / Cancel top right.

**Environments URL:** `/ui/td/{projectId}/environments/{id}/details`

**Environment detail page:**
- Two tabs: Overview | List
- Warning banner: "Note: Renaming this variable here will change it across other environments as well."
- Variable table: S.No., Variable, Default Value, edit/delete icons
- Right panel: "Linked Test Plans(0)"
- "Add Variable" button → Add Environment Variable dialog: Variable field + Default Value field (🔒 for sensitive). Cancel / Creating...
- Toast: "Environment created successfully."

**Uploads URL:** `/ui/td/{projectId}/uploads`
- Columns: File Name, File Location (`testsigma-storage://...`), Version, Last Updated By
- "Upload" button top right

---

### Test Suites

**URL:** `/ui/td/{projectId}/suites`

**Suite list columns:** Title, Type (Static/Dynamic), Created, Created by, Status (No Runs / Passed / Failed with donut icon).

**Create Test Suite (full-page form, `/ui/td/{projectId}/suites/new`):**
- Basic Details: Name, Description toggle, Pre-Requisite dropdown, Labels
- Test Cases (0): Add/Remove Test Case link → dual-panel picker
- AfterTest Suite toggle (with ⓘ)
- Create / Cancel

Toast: "Test Suite created successfully."

---

### Test Plans

**URL:** `/ui/td/{projectId}/plans`

**Types:** Cross browser testing | Custom test plan.

**Create Test Plan — 3 steps:**

**Step 2 — Add Test Suites & Link Machine Profiles:**
- Test Machines section: "Link Test Machine" button, instruction to use monitor icon per suite row
- "View Prerequisites" link → "Execution sequence" popup (prerequisite suite → current suite order)
- "Add test machine/device profile" panel (right drawer): Name, Pre-requisite machine, Test Lab (Testsigma Lab / Local Devices / BrowserStack), Connected Machine dropdown, Browser (Chrome for Testing), Headless Test, Reset session for every test case (default checked), Hard Reset session for every test suite, Desired Capabilities. Create Profile / Cancel.

**Step 3 — Test Plan Settings:**
- Send Notification toggle
- Additional Settings: Environment, Screenshot capture (For all steps), Page Timeout (default 30s), Step Timeout (default 30s), Apply to all steps, Mock Server + Create New Server link
- **Accessibility Testing toggle:** when ON, shows WCAG Version & Conformance Level dropdown (default "WCAG 2.1 AA"). Note: Safari and Firefox not supported.
- Recovery Actions (collapsible): per-failure-type (Major Step, Pre-Requisite, Test Case, Suite, Machine) with Abort / Report-and-continue options. Rerun: None / All Test Cases / Only Failed Test Cases.
- Post Plan Hook: Addon dropdown

**Test Plan detail view (`/ui/td/plans/{id}/details`) — three tabs:**
- **Test Machine & Suites**
- **CI/CD Integrations** — Default Integrations logos: Azure DevOps, CircleCI, Codeship, Bamboo, Jenkins, AWS, Travis CI, Generic Shell, TestRail, QTest, GitHub, GitLab. REST API section with curl POST (start plan) and curl GET (status check) examples.
- **Schedules**

**Run Now split button dropdown:** Run | Partial Run.

---

### Run Results (Test Plan Runs)

**URL:** `/ui/td/results/{planId}/runs/{runId}`

**Left panel:** Test Runs list — run numbers with status icons (red ✗ Failed, gray ○ Stopped).

**Center view switcher dropdown:** Test Suites | Test Cases | Test Machines (N).

**Test Cases view columns:** pass/fail icon, test case name, auto-heal badge ("N steps heal..."), suite name, 3 action icons (re-run, view results, settings).

**Run Overview panel (right):**
- Donut chart with count, Passed / Failed / Not Executed / Stopped counts
- Last Run: Start Time, End Time, Consolidated Duration
- Test plan settings: Build (editable ✏️), Execution type, Environment
- Post plan hook result (Passed/Failed/No Runs)
- Addon details (e.g., "qTest Integration"): API_KEY, RELEASE_ID, CYCLE_ID, OVERRIDE_ON_RERUN, PROJECT_ID

---

### Settings (Suite)

**Integrations:**
- Bug Reporting: Jira Cloud (✓), Jira Server/DC, Xray Cloud, Xray Server, Azure DevOps Boards (✓), Monday.com (✓), YouTrack (✓), Mantis, Bugzilla, Backlog, ClickUp, Linear, Trello
- Collaboration: Slack, MS Teams, Google Chat
- Test Lab: BrowserStack, SauceLabs, Kobiton, TestMU, LambdaTest
- Test Management: Test Management by Testsigma (Arcus), Zephyr Cloud, Xray, qTest, TestRail
- Product Management: Figma (✓), Confluence Cloud (✓), Confluence Server, Jira (✓), Xray Server, GitHub
- CI/CD: Jenkins, GitHub, GitLab, Azure DevOps, Bitbucket, CircleCI, Travis CI, Bamboo, Bitrise, AWS CodePipeline, AWS Lambda, Google Cloud Build, Codemagic, CodeShip, Copado, Gearset, Shell Script, REST API

**Gen AI Keys (BYOK):** per-feature LLM config for Copilot in Web/Mobile Recorder, Test Data Generation, API testing, Auto Heal, Visual Analysis, AI in Addons.

**Preferences:** Auto Healing toggle, Control Who Can Stop Executions, Review Management (Test Case / Element / Self), Disable Onboarding Tutorials, Generative AI features.

---

### Testsigma Terminal

**What it is:** Native macOS desktop app enabling Copilot recording, local device testing, and agentic execution. Required for Copilot mode.

**Version:** v2.5.3 (July 2026). Auto-launch requires v2.2.2+.

**Download sizes:** Intel Chip 160 MB, Apple Silicon 154 MB (~490 MB installed).

**Setup flow:**
1. Download DMG → drag to Applications
2. "Set up Testsigma Terminal" screen → Configure Settings (proxy/SSL/memory) or Continue
3. "Login to Testsigma" → browser OAuth at `/ui/testsigmaterminal/authorize`
4. Browser: "Logged in as [email]. The desktop app should have opened."
5. Terminal: "Preparing agent..." → main dashboard

**Terminal main dashboard:**
- **COPILOT** section: Web, Mobile, Salesforce (with status dots)
- **AGENTIC** section: Web, Mobile (with status dots)
- Status dots: green = ready, red = updating/error
- "Web Copilot is ready to use. The connection to the agent is active."
- Bottom nav: Active Sessions, Logs, Settings, Info, Report Issue

**Agents page (`/ui/agents`):**
- Tabs: All (count) | Active agent | Inactive agent | Unregistered agent | Obsolete agent
- Columns: Title, OS, Available Browsers (icons), Last Successful Ping, Status, Version
- Agent naming: `username_YYYY-MM-DD_HHhMMmSSs`
- Special entries: `localhost@Nandhini`, `Mac_Machine`
- Top right: "Testsigma Terminal" button + "Setup Agent" button

---

### Atto — AI Layer

**Atto Agents:**
- **Generator** — test case generation from all source types
- **Runner** — Copilot/Agentic execution
- **Healer** — Auto-Healing: corrects element locators when they fail during execution
- **Analyzer** — result analysis, patterns, risk signals
- **Bug Reporter** — auto-creates Jira bug reports (pre-populates test case name, environment, test plan ID, result URL, error type, root cause, suggestions)
- **Coverage Planner** — test coverage analysis
- **Optimizer** — test suite efficiency

**Auto-Healing:**
- Enabled/disabled: Settings → Preferences → Auto Healing toggle
- Auto-heal badge in run results: "N steps heal..." beside test case name
- Gen AI Auto Heal (Unified Mobile): when element recorded on Android fails on iOS, uses other platform's screenshot as context

**BYOK:** Admin Settings → Gen AI Keys. Supports own OpenAI/Azure OpenAI keys per feature. Unmapped features use Testsigma's model providers.

---

### Arcus — Left Navigation

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

**Arcus Settings integrations:** Jira (with Jira App), Azure DevOps, Linear, ClickUp, Figma, Confluence, Two-way sync with Suite.

---

### Unified Mobile Testing (In-Progress, July 2026)

**Current limitations:**
1. Manual authoring only — Atto not available for Unified type yet
2. Cloud execution only — no local device support yet
3. Data-driven testing, test plans, scheduling, CI/CD still in progress
4. No migration from existing Android/iOS projects
5. Add-on support not yet available
6. Import from other project types deferred
7. Save checkpoint support deferred
8. REST API step type disabled in UI
9. Visual testing has known bug (TP-4158, ReOpen status)
10. AI Step for Unified Mobile not yet available

**Key terms:** Platform applicability (Both/Android only/iOS only), Platform badge (on NLPs), Dual-locator (separate Android/iOS locators per element), Not-executed (result for platform-mismatch skipped steps).

---

### Execution Stacks

| | Classic | Modern |
|---|---|---|
| Framework | Selenium/Java | Playwright (web) + WebDriverIO (mobile) |
| Language | Java | TypeScript |
| Unified Mobile | ✗ | ✓ only |
| Status | Legacy | Current |

---

### Terminology Reference

| Term | Definition |
|---|---|
| Suite | Test automation product (`app.testsigma.com`) |
| Arcus | Test management product (`test-management.testsigma.com`) |
| Atto | AI coworker spanning both products |
| Copilot | AI assistant for step generation — in recorder, editor, or Atto playground |
| Agentic Learning | Beta: agent executes manual test case live, generates automated steps from observations |
| Run with Copilot | Executes generated test case via Copilot; auto-updates locators post-run |
| NLP | Natural Language Processing — Testsigma's human-readable step syntax |
| BT Runner | TypeScript-based execution framework (Modern stack) |
| WDIO | WebDriverIO — TypeScript wrapper for Appium (Unified Mobile) |
| Testsigma Terminal | Native desktop app enabling Copilot recording and local device testing |
| Classic stack | Selenium/Java (legacy) |
| Modern stack | Playwright (web) + WebDriverIO (mobile) |
| BYOK | Bring Your Own Key — enterprise LLM key management |
| Mock Server | External service (`mockserver-us.testsigma.com`) for API mocking |
| Tunnel | Testsigma Tunnel for accessing locally hosted apps during cloud execution |
| Auto-Healing | AI feature auto-correcting failed element locators during execution |
| AfterTest Suite | Special test case run after a suite completes (teardown) |
| AfterTest Case | Steps run after a test case regardless of result |
| Recovery Actions | Per-failure-type config in Test Plans |
| Unified Mobile | Application type: one test case runs on both Android and iOS |
| Sprint Planner | Atto feature for test planning from sprint/work item data |
| AI Generated Feature | Top-level folder in Suite where all Atto-generated test cases are saved |
| New badge | Blue badge on generated test case: freshly AI-generated |
| Update badge | Orange badge on generated test case: modifying an existing library test case |
| Pending badge | Yellow dot on generated test case: not yet accepted or rejected |
| Save to Library | Moves Atto-generated test case to Suite as Draft |
| Chrome for Testing | Dedicated Chrome build (v138) used exclusively for Copilot and Agentic sessions |
| Generate Steps button | Appears in Copilot panel header during Run with Copilot — regenerates automation steps mid-session |
| Execution Point | Blue marker in Copilot panel showing current executing step |
| Debug Point | Red dot in Copilot panel — breakpoint where execution pauses |
| QI Platform | Quality Intelligence Platform — Testsigma's umbrella term for Arcus |

---

### Documentation Site

| Repo | URL | Framework | Status |
|---|---|---|---|
| testsigmahq/testsigma-docs | testsigma.com/docs/ | Gatsby 5 | Production (Suite) |
| testsigmahq/TMSDocs | testsigma.com/docs/test-management/ | Gatsby 3 (EOL) | Production (Arcus) |
| bharathk08/docs-v2 | docs-v2-alpha.vercel.app | Astro 5 + Starlight | Alpha (both products) |

**Current docs site nav:** Test Automation | Atto (Beta) | Salesforce | Desktop | Testsigma Copilot.

**Current Suite sidebar sections:** Getting Started, Projects & Settings, Collaboration, Test Cases, Atto's Home, AI Agents, Auto Healing, Test Data Management, Elements (Objects), Test Step Recorder, Test Suites, Test Plans, Runs, Testsigma Terminal, Copilot, Testsigma Agent, Continuous Integration, Reports & Analytics, Visual Testing.

---

