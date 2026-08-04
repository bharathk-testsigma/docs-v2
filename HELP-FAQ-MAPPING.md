# Help → docs migration status

Working document, not a docs page. Delete once the remaining categories land.

**Decision in force (July 2026).** Help content folds into the feature page that
owns the topic, as a `## FAQs` section after `## Related` — never as standalone
FAQ pages. Recorded in `docs-v2-writer/rules/_conflicts.md` §5. The FAQ tail is
exempt from prose caps (see tests/docs-budgets.test.mjs).

## Done — 110 of 110 help pages migrated (complete 2026-07-29, see "help migration COMPLETE" below)

| Source (docs-v2 help/) | Landed in |
| --- | --- |
| agent-setup/* (17 of 22) + agent core docs (12) | `installation/testsigma-agent.mdx` (guide) |
| copilot-terminal/* (10) + terminal core docs (5) | `installation/testsigma-terminal.mdx` (guide) |
| web-testing/why-cloud-devices…, url-not-accessible | `installation/testsigma-tunnel.mdx` FAQs |
| web-testing/what-should-i-do-if-my-browser-blocks-local-network-access | Terminal FAQs |
| why-chrome-extension, automating-captcha, basic-authentication, text-based-captcha, authenticator-totp, automating-chrome-extension, chrome-for-testing | `web/tests/author-tests.mdx` FAQs |
| drag-and-drop, upload-files, ui-identifier (if-visible), clearing-cookies, unable-to-retrieve-value, non-text-keys, verify-file-download, otp-in-html | `web/tests/step-types.mdx` FAQs |
| chrome-settings, link-text-capture, dropdown, checkbox, radiobutton, issues-with-ui-identifiers, enable-disable-elements | `web/elements.mdx` FAQs |
| queued-for-a-long-time, page-loading-issues, browser-session errors, longer-execution-times | `web/run-tests.mdx` FAQs |
| execution-video (view + full-plan), exports-page errors, xls-edge | `web/results.mdx` FAQs |
| collecting-har-file | `web/debug.mdx` FAQs |
| ie-mode, browser-permissions, 3ds-pageload, popup-issues | `web/capabilities.mdx` FAQs |
| no-route-to-host, agent whitelisting, restricted-access | agent guide (Requirements + FAQs) |
| api-testcase-failure, raw-body-post | `get-started/quickstart-api.mdx` FAQs |
| salesforce most-common-issues (auth, login NLP, MFA, labs) | `get-started/quickstart-salesforce.mdx` FAQs |
| jenkins-xml-to-html | `integrations/ci-cd/jenkins.mdx` FAQs |
| multiple-runtime-variables | `web/test-data/data-generators.mdx` FAQs |
| update-excel-in-uploads | `web/test-data/test-data-profiles.mdx` FAQs |

Deliberate compressions (flag if unwanted): the sample XSLT stylesheet in
jenkins-xml-to-html was reduced to the method + command; the per-OS
kill-a-process walkthroughs were compressed to one command per OS.

## Done — Mobile section (2026-07-29)

`mobile/tests/author-tests.mdx`, `mobile/elements.mdx`, `mobile/run-tests.mdx`.
24 of 25 mobile help pages folded (mobile-testing.md is a nav index, nothing to
port). Deliberately NOT cloned from Web: manage-tests, test-data, step-* pages —
that content is platform-neutral and its Web pages are canonical; the Mobile
stubs stay until mobile-specific source exists. Flag if you want mirrored pages
instead. On-prem confirmed IN SCOPE (2026-07-29) — build with the horizontals.

## superseded — earlier in-progress note

Built so far: `mobile/tests/author-tests.mdx`, `mobile/elements.mdx` — sources:
elements/android-apps (4), ios-apps (2 of 4), mobile-web (2), test-cases mobile
(2), plus 11 mobile help pages folded as FAQs (app-package-activity, bundle-id,
waitForIdleTimeout, click-tap, scroll/swipe, recorder-launch, play-protect,
developer-mode-ios, wda, ios-app-closes, resign, permission-error,
accessibility-ids, compatible-id-locators).

Mobile help pages still to fold (unread): apple-pay-automation,
capture-network-logs-in-android-app, common-android-issues,
handling-ios-app-compatibility-issues, more-prerequisite-settings,
mobile-recorder-actions-failures, test-execution-queued (mobile),
failed-to-launch-ui, emulators-simulators (→ future mobile/run-tests page).
Remaining mobile pages to build: run-tests, results, test-data, manage-tests.

## Done — Salesforce section (2026-07-29)

5 pages from 13 sources: setup/connected-app, setup/connections (project +
metadata + user connections + test-connection + refresh error handling),
tests/author-tests, tests/salesforce-nlps (19 special NLPs + table NLPs + SOQL
step + query builder), elements. introduction.md was a nav page — superseded.
Not ported verbatim: special-nlps.md per-NLP screenshots/GIFs (S3), table-nlps
full NLP list (source shows it only in a GIF — flag: needs the actual list from
the product).

## Done — Windows sections (2026-07-29)

5 pages from 16 sources + 2 help pages. Windows (Lite): author-tests, elements,
advanced-uft (7 legacy UFT/TSRx sources consolidated into one page — the
Windows (Advanced) app type is ABSENT from the current product's type list;
UNVERIFIED flag on the page, confirm before publish). Windows (Beta) = Desktop:
author-tests, elements (batch + selective recorders). recorder-failed help →
FAQs on both author-tests pages; secured-business-application-support →
Tunnel FAQ (it was a general secured-apps checklist, not desktop content).
Extended (2026-07-29): sap-automation (5 sources) → windows-beta/sap.mdx +
windows-beta/sap-actions.mdx — the 120-row actions table factored into 7 common
actions + per-type extras, zero rows lost. Remaining Windows IA stubs (Manage
Tests, Step Groups, Test Data, Test Suites/Plans, Run Tests, Results, Auto Heal,
Capabilities, Debug ×2 groups) are platform-neutral topics whose Web pages are
canonical — same decision as Mobile; no Windows-specific source exists for them.
Not ported: Storylane interactive demo embeds (external scripts — the site's
CSP/no-external policy question applies; flag if wanted).

## Done — CI/CD integrations (2026-07-29)

17 pages from 19 sources. shell-script.mdx is the canonical page: both full
scripts (bash + PowerShell) extracted VERBATIM from source, the REST trigger/
status/report API table, and the get-test-plan-ID flow. 15 per-tool pages
(GitHub Actions, GitLab, Bitbucket, Azure DevOps, CircleCI, Travis, Bamboo
plugin, Bitrise, AWS DevOps, AWS Lambda, Google Cloud Build, Codemagic,
CodeShip, Copado, Gearset) each carry their tool-specific steps and YAML
verbatim, pointing at shell-script for the machinery. Fixed: jenkins.mdx
posted to /api/v1/execution — the real endpoint is /api/v1/execution_results;
also gained frontmatter + Related. Flagged: aws-lambda and codeship sources
use retired username/password endpoints — pages carry the modern method with
the legacy noted (1 UNVERIFIED on aws-lambda).

## Done — platform delta pages (2026-07-29, "option 3")

Decision: every remaining platform-neutral stub becomes a THIN page — a 3-line
intro, "What is different here" deltas, and a link to the single canonical
guide. Instructions live in exactly one place; platform pages only add, never
repeat. 53 pages generated across Mobile (14), Salesforce (15), Windows Lite
(12), Windows Beta (12). Deltas sourced from product knowledge and already-read
sources (Unified constraints incl. no data-driven/scheduling/CI, Gen AI Auto
Heal, Salesforce metadata repair loop, Windows local-only execution).
Deliberately NOT created (support unconfirmed — fill when confirmed): mobile
accessibility-testing; windows visual/accessibility/auto-heal/capabilities.
These stubs will also be enriched when #10 mines desired-capabilities (18),
auto-healing (8), visual/accessibility (4) into full platform pages.

## Done — Integrations complete (2026-07-29)

22 pages from 23 sources: bug reporting (Jira, Bugzilla, Mantis, Backlog,
monday.com, YouTrack), test management (Azure Boards, ClickUp, Linear, Trello,
qTest incl. Post Plan Hook + status mapping, TestRail incl. both addons, Xray,
Zephyr), test labs (BrowserStack, Sauce Labs, Kobiton, TestMU + LambdaTest from
the overview source — a LambdaTest-specific source page never existed), and
collaboration (Slack, Teams, Google Chat). Jira appears in both the Test
Management and Bug Reporting nav groups, one page. Source copy-paste defects
fixed rather than ported: bugzilla page called itself Mantis/Backlog, qTest
prereqs said TestRail, linear prereqs said Youtrack. integrations/overview.md
superseded by the nav itself. Task #9 CLOSED — all 42 sources accounted for.

## Done — Copilot Mode (2026-07-29)

`atto/copilot.mdx` (guide, new page) from 10 orphaned sources: `copilot/` (introduction,
key-capabilities, launch-copilot, record-test-steps, copilot-debug-toolbar) and
`copilot/manage-test-steps/` (add, edit-and-update, delete, reorder, bulk-actions).
This content had **no home anywhere in the target** — the earlier mapping line
"copilot-terminal/* (10) + terminal core docs (5)" covered the *Terminal help
pages*, not the Copilot feature docs.

Product knowledge confirms two distinct Copilot surfaces, so this is additive,
not a correction: "Copilot inside recorder" (Generate Test Scenarios, stays in
`web/tests/author-tests.mdx`) and "Copilot Mode" from the Test Case Editor top
bar (the new page). Both are now cross-linked to each other.

De-duplicated as part of this: `web/debug.mdx` had its own debug-point and
debug-toolbar sections, which the new page owns properly. Replaced with a
3-sentence pointer; `covers:` updated. The remote-debugging-window content stays
on debug.mdx, being debug-specific.

Recovered knowledge the Terminal page was missing: Linux AppImage dependency
failure, the port-error cleanup procedure (kill leftover processes + clear both
Testsigma folders), the install-time authentication error, `.tar.gz` as a Linux
archive format, and the Chrome 139 agent incompatibility.

## Done — Agent / Terminal / Tunnel review (2026-07-29)

Reviewed as three separate products against all sources (agent 12, terminal 5,
tunnel 1 at 1009 lines, copilot 10, help/agent-setup 22, help/copilot-terminal 10).
**Structure held**: three products, three lifecycle guides, one section overview.
Each page already runs the real customer journey — why → requirements → install →
configure → use → upgrade → retire → FAQs. No restructure needed.

Verified rather than assumed: `agent/command-line-arguments.md` is 447 source
lines against a ~30-line target table, but all 25 arguments are present — the
source repeated a 4-step "open a terminal, run this, done" block per argument,
and that boilerplate is what was dropped. `TS_IE_PATH` checked against source
(line 254) and is real, not invented.

Gaps closed: the Agent↔Terminal relationship is now stated on *both* pages
(Terminal contains and manages an agent; only one is ever active; install the
agent alone for CI), and the tunnel page gained "Run several tunnels from one
release" — the source's multi-tunnel values-file pattern, which the page
referenced under "Remove a tunnel" but never taught.

## Done — Reports section (2026-07-29)

4 pages from 13 sources, filling the IA's three Reports stubs:
`reports/view-and-export` (built-in dashboard + PDF/XLS/JUnit export + logo),
`reports/custom-dashboards` (create, filter, edit, share),
`reports/widgets` (all 40 widgets × 4 fields across 6 categories, plus the 6
starting combinations), `reports/generate-reports` (Allure, JUnit, custom PDF
via the CLI generator, incl. all 8 `config.preference.*` keys).

Widgets Reference is **one page beyond the design canvas** — 391 source lines of
lookup table does not belong inside a task page. Noted in the sidebar file.

Run-result *reading* deliberately stayed canonical in `web/results.mdx` rather
than being duplicated into Reports. That page absorbed what it was missing:
in-page filters (Test Runs panel, level dropdown, donut click-through), the
machine-view caveat, rerun scopes + the 10-rerun limit + Compare Run, the
Accessibility Test Overview controls, and the full Mac/Windows shortcut table.

## Done — Projects & project settings (2026-07-29)

2 pages from 7 sources: `settings/projects` (projects, applications, versions,
incl. copy-data-from-previous-version and the version-ID lookup) and
`settings/project-settings` (requirements, requirement types, test case types,
priorities).

**IA gap found:** there is no top-level Projects section and no slot for this
anywhere in the canvas — 7 source pages with nowhere to go. Filed under Settings
as two new nodes. Project *creation* was already covered per-quickstart; what was
missing was managing and deleting the three levels, and the classification lists.
Storylane demo embeds skipped, consistent with the earlier decision.

## Done — Addons section (2026-07-29)

6 pages from 11 sources, filling every Addons stub in the canvas:
`addons/index` (what/why + the 5 buildable types), `addons/marketplace`
(browse, search/sort/filter, details, install, use), `addons/build`
(prerequisites, template, code, validate, upload, publish, update, use — merges
create.md + update.md + pre-requisite-to-create-addon.md), `addons/sdk`
(RunTimeData + RunMetaData with both full code samples and all 6 metadata
methods, from the 2 `sdk/` sources), and both worked examples.

The four external `testsigma.com/tutorials/addons/*` links are preserved as
external links — they are tutorial content, not docs pages, so they are not
broken internal links.

## Done — On-prem section (2026-07-29)

3 pages from 6 `on-premise-setup/` sources **plus the 5 help pages that were
blocked on this section** — that blocker row is now cleared.

`on-prem/architecture` (3 layers, 7 services, ports by role and by container
name), `on-prem/install` (machine/database/config/backup requirements, network
allowlist + port list, compose deploy, all 8 containers and the load-balancer
env block, 10-point post-install checklist, post-upgrade steps, 12
troubleshooting scenarios, 5 FAQs), `on-prem/custom-domains` (the 6 service
URLs, certificate rules, load-balancer volume mount).

Canvas had ONE node for ~960 source lines. Split to 3 — architecture is
reference material and custom domains is a pre-build decision, not an install
step. Noted in the sidebar file.

**Security fix, not a port:** `help/agent-setup/general-issues.md` contains a
live Docker Hub access token in plain text (`dckr_pat_…`). It was deliberately
NOT carried across. The new page gives the `docker login -u testsigmaonprem`
command and tells the reader to request the token from support, with a callout
against pasting it into shared documents. **The token in the source repo should
be rotated** — it has been published on the docs site.

Also normalised: the source's `Testsigma CE` deployment-errors page was folded
into the same troubleshooting section rather than kept as a separate CE topic,
since the symptoms (ports busy, app unreachable, Docker Desktop/WSL, log
collection) apply to any Docker deployment. Open question 1 below is therefore
narrower now, but still open.

## Done — help migration COMPLETE, 110 of 110 (2026-07-29)

The last 5 blocked pages landed, and the blocker table is gone.

`general-howtos/connect-mongodb-and-postgresql-via-addon`,
`general-howtos/how-to-configure-the-oracledb-add-on-in-testsigma`, and
`steps-elements/mysql-db-test-cases` → **`addons/examples/database-queries.mdx`**
(new page). All 10 MySQL NLPs, the Oracle JDBC syntax with both SID and
Service-Name examples and the 6 URL placeholders, and the MongoDB + PostgreSQL
parameter tables. One page beyond the canvas: 3 sources of reference material,
too long to live in a marketplace FAQ. Added a credential warning — every
connection URL in these sources embeds a username and password in plain text on
the test step.

`general-howtos/ui-elements-for-ios-apps` and
`general-howtos/how-to-test-flutter-apps-using-accessibility-mode` →
**`mobile/elements.mdx` FAQs**. The 10 common XCUITest element types with their
attributes plus the 10 less common ones, and the Flutter semantic-tree procedure
(`$0.click()` in the console, then locate by `aria-label`) with both caveats.

Audited the full 110 rather than trusting the running count. Every page is now
either folded into a feature page or explicitly superseded:
- `help/index.md` — superseded by this migration, nothing to port.
- All 8 `execution-apis/*` pages have real content and are all accounted for in
  the earlier passes. The old note claiming "~5 index/nav pages" here was
  wrong — there is no index page in that directory.

## Verification at completion

`npm test` — every budget green across 368 pages. `npx astro build` — clean.
Only T-28 fails, on deliberate UNVERIFIED flags (see Open questions).

## Done — Collaboration, Uploads, Audit Logs, Recorder (2026-07-29)

6 pages from 15 sources, closing the last of the missing Suite sections.

`settings/team-management` (6 roles, 3 invite routes incl. read-only, role/project
edit, removal — from collaboration/users-roles + invite-team-members +
assign-projects). `settings/review-management` (test case AND element review,
peer + self, from the 2 review-management sources — one workflow, not two
platform features). `settings/preferences` (all 6 account toggles, incl.
Control Who Can Stop Executions with its full permission matrix, and the
onboarding-tutorial toggle — **this clears the last general-howtos blocker**).
`settings/audit-logs` (6 entry fields, 5 filters, async export via Settings >
Exports). `web/test-data/uploads` (apps + attachment files + all 3 build routes
for APK/IPA/APP; Mobile's Test Data group reuses this slug rather than getting a
near-duplicate). `web/tests/recorder` (3 browser installs, 3 extension options,
private-window permissions per browser, Firefox's 2 extra permissions, excluded
attributes, freeze-and-act).

Recorder Extension and Uploads are both **beyond the canvas** — extension
install is a hard prerequisite for Record and had no destination at all.

Recovered from `configuration/security/org-settings.md`, which was otherwise a
nav page: Testsigma also supports SAML SSO through **OneLogin** and **Google
Workspace**. Neither had a page or a mention anywhere in the target. Noted on
`security/okta-sso.mdx`, which is the generic SAML walkthrough.

## Settings stubs with NO source content — nothing lost

Checked all 13 `configuration/` sources against the remaining canvas stubs.
These IA positions have no docs-v2 source behind them at all, so they are
undocumented product surface rather than migration gaps: **Custom Fields**,
**Labels**, **Report Settings**, **Imports & Exports**, **Phone Numbers (TFA)**,
**Mail Boxes**, **Testsigma IP Info**. Leave as stubs until someone writes them
from the product.

Also accounted for: `configuration/security/overview.md` (nav page, superseded by
the Security section itself) and `configuration/user-settings.md` (already inside
`security/two-factor-authentication.mdx`).

## Done — Task #10, capabilities / auto-heal / visual / accessibility (2026-07-29)

All 32 sources mined into existing pages, plus one new page. No new sections.

**`web/capabilities.mdx`** gained: multi-extension syntax, the screen-share arg,
the user-agent format example, the full Firefox geolocation profile (the
`geo.prompt.testing` flags matter — coordinates alone do nothing), a **Set a
geolocation** section distinguishing country-level `geoLocation` (all 48 country
codes) from coordinate-level, coordinate semantics (Chrome = lat/long/**altitude**,
Firefox = lat/lng/**accuracy**) with worked examples, the IE/Safari limitation,
**Run in private browsing** (`testsigma.privateBrowsing`, cross-browser),
**Basic authentication in Safari** (`testsigma.customHeaders`),
`browserstack.console`, the tz database reference, the idleTimeout/maxDuration
rationale, a console-logs-by-lab table, and **Simulate a slow network** (the
throttling add-on + NLP + all 5 profiles).

**`mobile/capabilities.mdx`** was a 24-line delta stub; now a real reference:
Android (`noReset`, `autoGrantPermissions`, `appium:waitForIdleTimeout`), iOS
(`autoAcceptAlerts`, `autoDismissAlerts`, `resignApp` + the entitlements
warning), biometric auth (`testsigma.allowTouchIdEnroll`, Testsigma Lab only),
Play Store credentials (`browserstack.appStoreConfiguration`, with a warning
about storing a real password in a machine profile), Android WebView debugging,
and FLAG_SECURE screenshot unblocking.

**`web/debug.mdx`** gained **Collect logs from a run**: the Logs view (Console,
Network, Appium, Device), HAR download, and the BrowserStack **Network Log**
toggle for Android/iOS (on by default for web and mobile web).

**`web/auto-heal.mdx`** gained the Salesforce row, the dummy-locator explanation
for Atto-generated cases, and a worked before/after locator table for all four
surfaces.

**`web/tests/visual-testing.mdx`** gained the 5 Visual Difference controls, AI
Insights, **Visual Testing Mode** (Strict vs Lenient + threshold, and
region-scoped lenient), ignore regions, and **Fail Test Case if Visual Testing
Fails**.

**`web/tests/accessibility-testing.mdx`** gained Issues by Components and a full
**All Issues** walkthrough (filters, 5 list columns, 6 detail-pane fields),
plus Compare Runs and Export.

**`mobile/tests/accessibility-testing.mdx` is new.** Its IA slot was a stub
marked "support unconfirmed" — but a complete source page exists
(`accessibility-testing/mobile-accessibility-testing.md`), so support IS
confirmed. Written as a delta: no Issues by Pages (no URLs), native code in
Element Details, everything else pointing at the web report walkthrough.

One new UNVERIFIED flag raised: the iOS re-signing source names the capability
`ResignEnabled` in its prose and `resignApp` in its own table. Flagged rather
than guessed.

## Remaining Suite work (Arcus is OUT of scope — confirmed 2026-07-29)

Nothing outstanding in the source inventory. The remaining canvas stubs are
Windows Lite/Beta visual, accessibility, auto-heal and capabilities — all
platform-neutral topics with no platform-specific source, same decision as the
earlier delta-page pass.

## Open questions

1. Testsigma CE / on-prem: in scope for this site?
2. The agent hardware numbers: core docs say 8 GB / 20 GB; the legacy FAQ said
   2–4 GB / 2 GB. The newer core numbers were used everywhere.
3. UNVERIFIED markers reviewed 2026-07-30 against `testsigmahq/testsigma-docs`
   (dev branch, cloned to scratchpad — not vendored into this repo). 7 resolved
   and the markers removed: Suite API key location + `api_private` external-use
   status, Windows (Lite) vs Desktop (Beta) distinction, Windows (Advanced)/UFT
   still exists, agent Lab IPs (now cited: 35.174.92.188, 34.204.63.14,
   74.50.105.97), local iOS provisioning-profile flow, `ResignEnabled` UI label
   vs `resignApp` capability key. 9 markers across 7 pages remain, deliberately:
   - 3 are Arcus/QI Home pages — out of scope for `testsigma-docs` (Suite-only).
   - `atto/byok.mdx` (2): no Gemini/Vertex AI page exists in the source either.
   - `installation/testsigma-tunnel.mdx`: the source itself is split — 3
     platform setup pages say "Testsigma Tunnel", the Kubernetes page says
     "Tunnels".
   - `web/elements.mdx`: the source's own Create Element page and Locator
     Types page list two different sets (5 vs 7, with/without Accessibility ID).
   - `integrations/ci-cd/aws-lambda.mdx`: the source's Lambda page still uses
     username/password auth, unresolved upstream too.
