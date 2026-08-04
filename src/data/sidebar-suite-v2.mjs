// ────────────────────────────────────────────────────────────────────────────
//  Suite V2 information architecture.
//
//  GENERATED from the `NAV` array in the design canvas `Suite Docs V2.dc.html`
//  (223 nodes, 16 top-level). Regenerate rather than hand-editing, so the nav
//  and the design cannot drift apart.
//
//  Every group is `collapsed: true`. Starlight defaults groups to open, which
//  with 223 nodes produces a single unbrowsable wall; collapsing them matches
//  Linear, and Starlight still auto-expands the ancestor chain of the current
//  page so the reader always sees where they are.
//
//  No badges: the canvas's Gap / Decision markers were IA-review metadata, not
//  reader-facing navigation.
//
//  Nodes with no page yet render as `stub()`: a non-navigable placeholder, so
//  the whole tree can be reviewed end to end without 200 empty files in the
//  repo. Replace a stub with `{ label, slug }` as each page lands.
// ────────────────────────────────────────────────────────────────────────────

/** An IA position with no page behind it yet. Rendered inert by theme.css. */
const stub = (label) => ({
  label,
  link: '#',
  attrs: { 'data-ia-stub': 'true' },
});

/**
 * A REST API endpoint page. Slug only -- the label and the HTTP-method badge
 * come from the page's own frontmatter, so they cannot drift from the spec.
 */
const api = (path) => ({ slug: `suite/api/${path}` });

export const suiteV2 = [
  {
    label: 'Get Started',
    collapsed: true,
    items: [
      { label: 'Overview', slug: 'suite/get-started' },
      // Introduction absorbed What is Testsigma?, Terminology, Execution Stacks,
      // and the Try Atto orientation -- one page, navigated by its own hero card
      // grid, so Get Started is a short path rather than five sibling rows.
      { label: 'Introduction', slug: 'suite/get-started/introduction' },
      {
        label: 'Platforms',
        collapsed: true,
        items: [
          { label: 'Quickstart: Web', slug: 'suite/get-started/quickstart-web' },
          { label: 'Quickstart: Mobile', slug: 'suite/get-started/quickstart-mobile' },
          { label: 'Quickstart: Salesforce', slug: 'suite/get-started/quickstart-salesforce' },
          { label: 'Quickstart: API', slug: 'suite/get-started/quickstart-api' },
          { label: 'Quickstart: Desktop', slug: 'suite/get-started/quickstart-desktop' },
        ],
      },
      // Installation sits INSIDE Get Started as an L2 group, not as its own
      // top-level section: installing the Agent/Terminal/Tunnel is setup a
      // reader does once on the way in, so it belongs on the onboarding path
      // rather than standing alongside the feature sections. Page slugs are
      // unchanged (/suite/installation/*), so no URL moved.
      {
        label: 'Installation',
        collapsed: true,
        items: [
          { label: 'Overview', slug: 'suite/installation' },
          // Agent, Terminal, and Tunnel are three products, each deliberately ONE
          // page rather than a group: their topics are H2s reached from the card
          // grid in each page's own hero, so the sidebar entry is a single
          // destination and the in-page cards do the sub-navigation. This also
          // dissolved Client Apps, which had split the Agent's install docs from
          // its operational docs across two top-level sections.
          { label: 'Testsigma Agent', slug: 'suite/installation/testsigma-agent' },
          { label: 'Testsigma Terminal', slug: 'suite/installation/testsigma-terminal' },
          { label: 'Testsigma Tunnel', slug: 'suite/installation/testsigma-tunnel' },
        ],
      },
      { label: 'FAQs', slug: 'suite/get-started/faqs' },
    ],
  },
  {
    label: 'Atto AI',
    collapsed: true,
    items: [
      { label: 'Overview', slug: 'suite/atto/overview' },
      { label: 'AI Agents', slug: 'suite/atto/ai-agents' },
      { label: 'Learn & Execute', slug: 'suite/atto/learn-and-execute' },
      // Not in the canvas, though the LEGACY docs nav carried 'Copilot' as its
      // own top-level section. 10 source pages (copilot/* + manage-test-steps/*)
      // had no home anywhere in the new IA -- likely an omission, not a decision.
      { label: 'Copilot Mode', slug: 'suite/atto/copilot' },
      { label: 'BYOK', slug: 'suite/atto/byok' },
    ],
  },
  {
    label: 'Web',
    collapsed: true,
    items: [
      {
        label: 'Tests',
        collapsed: true,
        items: [
          { label: 'Author Tests', slug: 'suite/web/tests/author-tests' },
          { label: 'Manage Tests', slug: 'suite/web/tests/manage-tests' },
          { label: 'Step Groups', slug: 'suite/web/tests/step-groups' },
          { label: 'Step Types', slug: 'suite/web/tests/step-types' },
          { label: 'Step Options & Settings', slug: 'suite/web/tests/step-options-and-settings' },
          // Not in the canvas: the 5 test-step-recorder sources (3 browser
          // installs, extension options, private-window permissions, excluded
          // attributes, freeze) had no home. Extension install is a hard
          // prerequisite for Record, so it needs its own destination.
          { label: 'Recorder Extension', slug: 'suite/web/tests/recorder' },
          { label: 'Visual Testing', slug: 'suite/web/tests/visual-testing' },
          { label: 'Accessibility Testing', slug: 'suite/web/tests/accessibility-testing' },
        ],
      },
      {
        label: 'Test Data',
        collapsed: true,
        items: [
          { label: 'TDPs', slug: 'suite/web/test-data/test-data-profiles' },
          { label: 'Test Data Types', slug: 'suite/web/test-data/test-data-types' },
          { label: 'Data Generators', slug: 'suite/web/test-data/data-generators' },
          // Canonical Uploads page. Product puts Uploads under Test Data and it
          // serves web attachments AND mobile app builds, so Mobile reuses this
          // slug rather than getting a near-duplicate page.
          { label: 'Uploads', slug: 'suite/web/test-data/uploads' },
        ],
      },
      { label: 'Elements', slug: 'suite/web/elements' },
      { label: 'Test Suites', slug: 'suite/web/test-suites' },
      { label: 'Test Plans', slug: 'suite/web/test-plans' },
      { label: 'Run Tests', slug: 'suite/web/run-tests' },
      { label: 'Results', slug: 'suite/web/results' },
      { label: 'Auto Heal', slug: 'suite/web/auto-heal' },
      { label: 'Capabilities', slug: 'suite/web/capabilities' },
      { label: 'Debug', slug: 'suite/web/debug' },
    ],
  },
  {
    label: 'Mobile',
    collapsed: true,
    items: [
      {
        label: 'Tests',
        collapsed: true,
        items: [
          { label: 'Author Tests', slug: 'suite/mobile/tests/author-tests' },
          { label: 'Manage Tests', slug: 'suite/mobile/tests/manage-tests' },
          { label: 'Step Groups', slug: 'suite/mobile/tests/step-groups' },
          { label: 'Step Options & Settings', slug: 'suite/mobile/tests/step-options-and-settings' },
          { label: 'Step Types', slug: 'suite/mobile/tests/step-types' },
          { label: 'Visual Testing', slug: 'suite/mobile/tests/visual-testing' },
          // Was a stub pending "support unconfirmed". A full source page exists
          // (accessibility-testing/mobile-accessibility-testing.md), so support
          // IS confirmed and the page is now real.
          { label: 'Accessibility Testing', slug: 'suite/mobile/tests/accessibility-testing' },
        ],
      },
      {
        label: 'Test Data',
        collapsed: true,
        items: [
          { label: 'TDPs', slug: 'suite/mobile/test-data/test-data-profiles' },
          { label: 'Test Data Types', slug: 'suite/mobile/test-data/test-data-types' },
          { label: 'Data Generators', slug: 'suite/mobile/test-data/data-generators' },
          { label: 'Uploads', slug: 'suite/web/test-data/uploads' },
        ],
      },
      { label: 'Elements', slug: 'suite/mobile/elements' },
      { label: 'Test Suites', slug: 'suite/mobile/test-suites' },
      { label: 'Test Plans', slug: 'suite/mobile/test-plans' },
      { label: 'Run Tests', slug: 'suite/mobile/run-tests' },
      { label: 'Results', slug: 'suite/mobile/results' },
      { label: 'Auto Heal', slug: 'suite/mobile/auto-heal' },
      { label: 'Capabilities', slug: 'suite/mobile/capabilities' },
      { label: 'Debug', slug: 'suite/mobile/debug' },
    ],
  },
  {
    label: 'Salesforce',
    collapsed: true,
    items: [
      {
        label: 'Setup',
        collapsed: true,
        items: [
          { label: 'Create App', slug: 'suite/salesforce/setup/connected-app' },
          { label: 'Connections', slug: 'suite/salesforce/setup/connections' },
        ],
      },
      {
        label: 'Tests',
        collapsed: true,
        items: [
          { label: 'Author Tests', slug: 'suite/salesforce/tests/author-tests' },
          { label: 'Salesforce NLPs', slug: 'suite/salesforce/tests/salesforce-nlps' },
          { label: 'Step Groups', slug: 'suite/salesforce/tests/step-groups' },
          { label: 'Step Options & Settings', slug: 'suite/salesforce/tests/step-options-and-settings' },
          { label: 'Step Types', slug: 'suite/salesforce/tests/step-types' },
          { label: 'Visual Testing', slug: 'suite/salesforce/tests/visual-testing' },
          { label: 'Accessibility Testing', slug: 'suite/salesforce/tests/accessibility-testing' },
        ],
      },
      {
        label: 'Test Data',
        collapsed: true,
        items: [
          { label: 'TDPs', slug: 'suite/salesforce/test-data/test-data-profiles' },
          { label: 'Test Data Types', slug: 'suite/salesforce/test-data/test-data-types' },
          { label: 'Data Generators', slug: 'suite/salesforce/test-data/data-generators' },
        ],
      },
      { label: 'Elements', slug: 'suite/salesforce/elements' },
      { label: 'Test Suites', slug: 'suite/salesforce/test-suites' },
      { label: 'Test Plans', slug: 'suite/salesforce/test-plans' },
      { label: 'Run Tests', slug: 'suite/salesforce/run-tests' },
      { label: 'Results', slug: 'suite/salesforce/results' },
      { label: 'Auto Heal', slug: 'suite/salesforce/auto-heal' },
      { label: 'Capabilities', slug: 'suite/salesforce/capabilities' },
      { label: 'Debug', slug: 'suite/salesforce/debug' },
    ],
  },
  {
    label: 'Windows (Lite)',
    collapsed: true,
    items: [
      {
        label: 'Tests',
        collapsed: true,
        items: [
          { label: 'Author Tests', slug: 'suite/windows-lite/tests/author-tests' },
          { label: 'Manage Tests', slug: 'suite/windows-lite/tests/manage-tests' },
          { label: 'Step Groups', slug: 'suite/windows-lite/tests/step-groups' },
          { label: 'Step Options & Settings', slug: 'suite/windows-lite/tests/step-options-and-settings' },
          { label: 'Step Types', slug: 'suite/windows-lite/tests/step-types' },
          stub('Visual Testing'),
          stub('Accessibility Testing'),
        ],
      },
      {
        label: 'Test Data',
        collapsed: true,
        items: [
          { label: 'TDPs', slug: 'suite/windows-lite/test-data/test-data-profiles' },
          { label: 'Test Data Types', slug: 'suite/windows-lite/test-data/test-data-types' },
          { label: 'Data Generators', slug: 'suite/windows-lite/test-data/data-generators' },
        ],
      },
      { label: 'Elements', slug: 'suite/windows-lite/elements' },
      { label: 'Advanced (UFT)', slug: 'suite/windows-lite/advanced-uft' },
      { label: 'Test Suites', slug: 'suite/windows-lite/test-suites' },
      { label: 'Test Plans', slug: 'suite/windows-lite/test-plans' },
      { label: 'Run Tests', slug: 'suite/windows-lite/run-tests' },
      { label: 'Results', slug: 'suite/windows-lite/results' },
      stub('Capabilities'),
    ],
  },
  {
    label: 'Windows (Beta)',
    collapsed: true,
    items: [
      {
        label: 'Tests',
        collapsed: true,
        items: [
          { label: 'Author Tests', slug: 'suite/windows-beta/tests/author-tests' },
          { label: 'Manage Tests', slug: 'suite/windows-beta/tests/manage-tests' },
          { label: 'Step Groups', slug: 'suite/windows-beta/tests/step-groups' },
          { label: 'Step Options & Settings', slug: 'suite/windows-beta/tests/step-options-and-settings' },
          { label: 'Step Types', slug: 'suite/windows-beta/tests/step-types' },
          stub('Visual Testing'),
          stub('Accessibility Testing'),
        ],
      },
      {
        label: 'Test Data',
        collapsed: true,
        items: [
          { label: 'TDPs', slug: 'suite/windows-beta/test-data/test-data-profiles' },
          { label: 'Test Data Types', slug: 'suite/windows-beta/test-data/test-data-types' },
          { label: 'Data Generators', slug: 'suite/windows-beta/test-data/data-generators' },
        ],
      },
      { label: 'Elements', slug: 'suite/windows-beta/elements' },
      { label: 'SAP', slug: 'suite/windows-beta/sap' },
      { label: 'SAP Actions', slug: 'suite/windows-beta/sap-actions' },
      { label: 'Test Suites', slug: 'suite/windows-beta/test-suites' },
      { label: 'Test Plans', slug: 'suite/windows-beta/test-plans' },
      { label: 'Run Tests', slug: 'suite/windows-beta/run-tests' },
      { label: 'Results', slug: 'suite/windows-beta/results' },
    ],
  },
  // ── REST APIs ──
  // The one group that DEVIATES from the design canvas. The canvas mirrored the
  // authoring IA here (Tests / Test Data / Test Suites / Run Tests / Results),
  // but the API surface is organised by entity, and five of its groups
  // (Projects, Environments, Elements, Uploads, Integrations) have no canvas
  // label to live under. Grouping by entity instead gives all ~130 endpoints a
  // home; v2 twins of a v1 endpoint carry a "(v2)" label suffix. Source of
  // truth for every endpoint is /api-collection (Bruno). Don't regenerate this
  // group from the canvas without re-deciding that.
  {
    label: 'REST APIs',
    collapsed: true,
    items: [
      api('overview'),
      {
        label: 'Projects',
        collapsed: true,
        items: [
          api('projects/list-projects'),
          api('projects/get-project-id-by-name'),
          api('projects/get-users'),
          api('projects/list-applications'),
          api('projects/get-application'),
          api('projects/list-uploads'),
          api('projects/list-projects-v2'),
          api('projects/list-applications-v2'),
          api('projects/get-application-v2'),
          api('projects/list-application-versions'),
          api('projects/list-folders'),
        ],
      },
      {
        label: 'Test Cases',
        collapsed: true,
        items: [
          api('test-cases/list-test-cases'),
          api('test-cases/get-test-case'),
          api('test-cases/create-test-case'),
          api('test-cases/update-test-case'),
          api('test-cases/patch-test-case'),
          api('test-cases/delete-test-case'),
          api('test-cases/get-test-case-execution-details'),
          api('test-cases/get-labels'),
          api('test-cases/get-priorities'),
          api('test-cases/get-requirements'),
          api('test-cases/trigger-rerun'),
          api('test-cases/stop-rerun'),
          api('test-cases/update-results'),
          api('test-cases/list-test-cases-v2'),
          api('test-cases/get-test-case-v2'),
          api('test-cases/list-test-case-priorities-v2'),
          api('test-cases/get-test-case-priority'),
          api('test-cases/list-test-case-types'),
          api('test-cases/get-test-case-type'),
          api('test-cases/list-requirements-v2'),
          api('test-cases/get-requirement'),
        ],
      },
      {
        label: 'Test Steps',
        collapsed: true,
        items: [
          api('test-steps/list-test-case-steps'),
          api('test-steps/retrieve-test-step'),
          api('test-steps/create-test-step'),
          api('test-steps/create-multiple-test-steps'),
          api('test-steps/update-test-step'),
          api('test-steps/delete-test-step'),
          api('test-steps/search-nlp-templates'),
          api('test-steps/list-test-steps'),
        ],
      },
      {
        label: 'Test Suites',
        collapsed: true,
        items: [
          api('test-suites/get-test-suites'),
          api('test-suites/list-test-suites-v2'),
          api('test-suites/get-test-suite'),
        ],
      },
      {
        label: 'Test Plans',
        collapsed: true,
        items: [
          api('test-plans/list-test-plans'),
          api('test-plans/get-test-plan-configs'),
          api('test-plans/trigger-test-plan'),
          api('test-plans/get-test-plan-result'),
          api('test-plans/get-test-case-results'),
          api('test-plans/schedule-test-plan'),
          api('test-plans/update-schedule'),
          api('test-plans/delete-schedule'),
          api('test-plans/list-schedules'),
          api('test-plans/run-test-plan-from-cicd'),
          api('test-plans/list-test-plans-v2'),
          api('test-plans/get-test-plan'),
          api('test-plans/list-test-devices'),
          api('test-plans/list-post-plan-hooks'),
        ],
      },
      {
        label: 'Test Data',
        collapsed: true,
        items: [
          api('test-data/list-test-data-profiles'),
          api('test-data/get-test-data-profile'),
          api('test-data/create-test-data-profile'),
          api('test-data/update-a-test-data-profile'),
          api('test-data/delete-test-data-profile'),
          api('test-data/export-test-data-profile'),
          api('test-data/upload-test-data-profile'),
          api('test-data/update-test-data-profile'),
          api('test-data/create-profile-value'),
          api('test-data/update-profile-value'),
          api('test-data/list-test-data-sets'),
          api('test-data/update-test-data-set'),
          api('test-data/delete-test-data-set'),
          api('test-data/bulk-delete-test-data-sets'),
          api('test-data/list-test-data-profiles-v2'),
          api('test-data/get-test-data-profile-v2'),
        ],
      },
      {
        label: 'Environments',
        collapsed: true,
        items: [
          api('environments/list-environments'),
          api('environments/get-an-environment'),
          api('environments/create-an-environment'),
          api('environments/update-an-environment'),
          api('environments/update-environment-variable'),
          api('environments/list-environments-v2'),
          api('environments/get-an-environment-v2'),
        ],
      },
      {
        label: 'Elements',
        collapsed: true,
        items: [
          api('elements/get-elements'),
          api('elements/get-an-element'),
          api('elements/create-an-element'),
          api('elements/update-an-element'),
          api('elements/delete-an-element'),
          api('elements/list-elements-v2'),
          api('elements/get-an-element-v2'),
          api('elements/list-screen-names'),
          api('elements/get-screen-name'),
        ],
      },
      {
        label: 'Uploads',
        collapsed: true,
        items: [
          api('uploads/upload-file'),
          api('uploads/get-upload'),
          api('uploads/get-upload-versions'),
          api('uploads/update-file'),
          api('uploads/delete-upload'),
        ],
      },
      {
        label: 'Results',
        collapsed: true,
        items: [
          api('results/fetch-test-plan-results'),
          api('results/fetch-test-suite-results'),
          api('results/fetch-test-case-results'),
          api('results/fetch-test-step-results'),
          api('results/fetch-test-machine-results'),
          api('results/list-run-results'),
          api('results/export-run-results-summary'),
          api('results/get-junit-report'),
          api('results/list-test-case-results'),
          api('results/list-test-suite-results'),
          api('results/list-test-machine-results'),
          api('results/list-run-results-v2'),
          api('results/list-test-case-results-v2'),
          api('results/step-result-upload-status'),
          api('results/list-iteration-results'),
          api('results/list-test-machine-results-v2'),
          api('results/list-test-suite-results-v2'),
          api('results/get-step-result-asset'),
        ],
      },
      {
        label: 'Agents',
        collapsed: true,
        items: [
          api('agents/list-agents'),
          api('agents/create-dynamic-agent'),
          api('agents/delete-agent'),
        ],
      },
      {
        label: 'Custom Functions',
        collapsed: true,
        items: [
          api('custom-functions/create-custom-function'),
          api('custom-functions/update-custom-function'),
          api('custom-functions/get-file-id'),
        ],
      },
      {
        label: 'Platforms',
        collapsed: true,
        items: [
          api('platforms/list-supported-platforms'),
          api('platforms/list-os-versions'),
          api('platforms/list-browsers'),
          api('platforms/list-browser-versions'),
          api('platforms/list-screen-resolutions'),
        ],
      },
      {
        label: 'Users & Roles',
        collapsed: true,
        items: [
          api('users/list-users-v2'),
          api('users/get-user'),
          api('users/create-user'),
          api('users/list-roles'),
          api('users/get-role'),
        ],
      },
      {
        label: 'Connect Tunnel',
        collapsed: true,
        items: [api('tunnel/register-tunnel'), api('tunnel/deregister-tunnel')],
      },
      {
        label: 'Addons',
        collapsed: true,
        items: [api('addons/list-addons')],
      },
      {
        label: 'Integrations',
        collapsed: true,
        items: [
          api('integrations/refresh-salesforce-metadata'),
          api('integrations/get-refresh-status'),
          api('integrations/list-external-entity-mappings'),
        ],
      },
    ],
  },
  {
    label: 'On-prem',
    collapsed: true,
    items: [
      // Canvas had one node ('Install & Setup') for ~960 source lines across 6
      // on-premise-setup pages + 5 help pages. Architecture (services/ports) is
      // reference material and custom domains is a distinct pre-build decision,
      // so both are split out; Install & Setup keeps the deploy + troubleshooting.
      { label: 'Architecture', slug: 'suite/on-prem/architecture' },
      { label: 'Install & Setup', slug: 'suite/on-prem/install' },
      { label: 'Custom Domains', slug: 'suite/on-prem/custom-domains' },
    ],
  },
  {
    label: 'Addons',
    collapsed: true,
    items: [
      { label: 'Overview', slug: 'suite/addons' },
      { label: 'Marketplace', slug: 'suite/addons/marketplace' },
      { label: 'Build Your Own Addon', slug: 'suite/addons/build' },
      { label: 'SDK Reference', slug: 'suite/addons/sdk' },
      {
        label: 'Examples',
        collapsed: true,
        items: [
          { label: 'OCR Extraction', slug: 'suite/addons/examples/ocr-extraction' },
          { label: 'Post-Plan-Hook Addon', slug: 'suite/addons/examples/post-plan-hook' },
          // Not in the canvas: the 3 database help pages (MySQL 10 NLPs, OracleDB,
          // MongoDB + PostgreSQL) were blocked on "Addons section" and are
          // reference material, too long to fold into a marketplace FAQ.
          { label: 'Database Queries', slug: 'suite/addons/examples/database-queries' },
        ],
      },
    ],
  },
  {
    label: 'Reports',
    collapsed: true,
    items: [
      { label: 'View & Export Reports', slug: 'suite/reports/view-and-export' },
      { label: 'Custom Dashboards', slug: 'suite/reports/custom-dashboards' },
      // Not in the design canvas: the 40-widget catalogue was a separate source
      // page (widgets-reference.md, 391 lines) and is a lookup table, not
      // procedure -- it does not belong inside the Custom Dashboards task page.
      { label: 'Widgets Reference', slug: 'suite/reports/widgets' },
      { label: 'Generate Reports', slug: 'suite/reports/generate-reports' },
    ],
  },
  {
    label: 'Integrations',
    collapsed: true,
    items: [
      {
        label: 'CI/CD',
        collapsed: true,
        items: [
          { label: 'Shell Script', slug: 'suite/integrations/ci-cd/shell-script' },
          { label: 'Jenkins', slug: 'suite/integrations/ci-cd/jenkins' },
          { label: 'GitHub Actions', slug: 'suite/integrations/ci-cd/github-actions' },
          { label: 'GitLab CI', slug: 'suite/integrations/ci-cd/gitlab' },
          { label: 'CircleCI', slug: 'suite/integrations/ci-cd/circleci' },
          { label: 'Travis CI', slug: 'suite/integrations/ci-cd/travis-ci' },
          { label: 'Bitbucket', slug: 'suite/integrations/ci-cd/bitbucket' },
          { label: 'Bamboo', slug: 'suite/integrations/ci-cd/bamboo' },
          { label: 'Azure DevOps', slug: 'suite/integrations/ci-cd/azure-devops' },
          { label: 'AWS DevOps', slug: 'suite/integrations/ci-cd/aws-devops' },
          { label: 'AWS Lambda', slug: 'suite/integrations/ci-cd/aws-lambda' },
          { label: 'Codemagic', slug: 'suite/integrations/ci-cd/codemagic' },
          { label: 'CodeShip', slug: 'suite/integrations/ci-cd/codeship' },
          { label: 'Bitrise', slug: 'suite/integrations/ci-cd/bitrise' },
          { label: 'Copado', slug: 'suite/integrations/ci-cd/copado' },
          { label: 'Gearset', slug: 'suite/integrations/ci-cd/gearset' },
        ],
      },
      {
        label: 'Test Management',
        collapsed: true,
        items: [
          { label: 'Jira', slug: 'suite/integrations/bug-reporting/jira' },
          { label: 'Xray', slug: 'suite/integrations/test-management/xray' },
          { label: 'Zephyr', slug: 'suite/integrations/test-management/zephyr' },
          { label: 'qTest', slug: 'suite/integrations/test-management/qtest' },
          { label: 'TestRail', slug: 'suite/integrations/test-management/testrail' },
          { label: 'Azure DevOps Boards', slug: 'suite/integrations/test-management/azure-devops-boards' },
          { label: 'Trello', slug: 'suite/integrations/test-management/trello' },
          { label: 'ClickUp', slug: 'suite/integrations/test-management/clickup' },
          { label: 'Linear', slug: 'suite/integrations/test-management/linear' },
        ],
      },
      {
        label: 'Bug Reporting',
        collapsed: true,
        items: [
          { label: 'Jira', slug: 'suite/integrations/bug-reporting/jira' },
          { label: 'Bugzilla', slug: 'suite/integrations/bug-reporting/bugzilla' },
          { label: 'Mantis', slug: 'suite/integrations/bug-reporting/mantis' },
          { label: 'Backlog', slug: 'suite/integrations/bug-reporting/backlog' },
          { label: 'monday.com', slug: 'suite/integrations/bug-reporting/monday' },
          { label: 'YouTrack', slug: 'suite/integrations/bug-reporting/youtrack' },
        ],
      },
      {
        label: 'Test Labs',
        collapsed: true,
        items: [
          { label: 'BrowserStack', slug: 'suite/integrations/test-labs/browserstack' },
          { label: 'Sauce Labs', slug: 'suite/integrations/test-labs/sauce-labs' },
          { label: 'Kobiton', slug: 'suite/integrations/test-labs/kobiton' },
          { label: 'TestMU', slug: 'suite/integrations/test-labs/testmu' },
          { label: 'LambdaTest', slug: 'suite/integrations/test-labs/lambdatest' },
        ],
      },
      {
        label: 'Collaboration',
        collapsed: true,
        items: [
          { label: 'Slack', slug: 'suite/integrations/collaboration/slack' },
          { label: 'Microsoft Teams', slug: 'suite/integrations/collaboration/microsoft-teams' },
          { label: 'Google Chat', slug: 'suite/integrations/collaboration/google-chat' },
        ],
      },
    ],
  },
  {
    label: 'Security',
    collapsed: true,
    items: [
      { label: 'Password Policy', slug: 'suite/security/password-policy' },
      { label: 'Two-Factor Authentication', slug: 'suite/security/two-factor-authentication' },
      {
        label: 'Single Sign-On (SSO)',
        collapsed: true,
        items: [
          { label: 'Google SSO', slug: 'suite/security/google-sso' },
          { label: 'Azure SSO', slug: 'suite/security/azure-sso' },
          { label: 'Okta SSO', slug: 'suite/security/okta-sso' },
        ],
      },
    ],
  },
  {
    label: 'Settings',
    collapsed: true,
    items: [
      // Not in the design canvas. Project/application/version management and the
      // project-level classification lists (requirements, requirement types,
      // test case types, priorities) had no slot anywhere in the IA, and no
      // top-level Projects section exists -- 7 source pages with no home.
      { label: 'Projects & Applications', slug: 'suite/settings/projects' },
      { label: 'Project Settings', slug: 'suite/settings/project-settings' },
      { label: 'Team Management', slug: 'suite/settings/team-management' },
      // Not in the canvas: review management (test cases + elements) is one
      // workflow toggled in Preferences, not two platform features.
      { label: 'Review Management', slug: 'suite/settings/review-management' },
      { label: 'API Keys', slug: 'suite/settings/api-keys' },
      { label: 'Manage Access', slug: 'suite/settings/manage-access' },
      { label: 'Custom Fields', slug: 'suite/settings/custom-fields' },
      { label: 'Labels', slug: 'suite/settings/labels' },
      { label: 'iOS Settings', slug: 'suite/settings/ios-settings' },
      { label: 'SMTP Configuration', slug: 'suite/settings/smtp-configuration' },
      { label: 'Gen AI Keys', slug: 'suite/atto/byok' },
      { label: 'Preferences', slug: 'suite/settings/preferences' },
      { label: 'Audit Logs', slug: 'suite/settings/audit-logs' },
      { label: 'Report Settings', slug: 'suite/settings/report-settings' },
      { label: 'Imports & Exports', slug: 'suite/settings/imports-and-exports' },
      { label: 'Tunnels', slug: 'suite/installation/testsigma-tunnel' },
      { label: 'Phone Numbers (TFA)', slug: 'suite/settings/phone-numbers' },
      { label: 'Mail Boxes', slug: 'suite/settings/mail-boxes' },
      { label: 'Testsigma IP Info', slug: 'suite/settings/testsigma-ip-info' },
    ],
  },
];

export default suiteV2;
