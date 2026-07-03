// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Help-tab migration redirects (old troubleshooting/FAQ URLs → /help/).
// Generated from scripts/help-move-map.json — the same source of truth used by
// the migration script and public/_redirects, so the three can never drift.
// NOTE on `base: '/docs'`: Astro applies the base to the redirect's *source*
// (the emitted page lands under dist/docs/…), but NOT to the *destination*
// string — so the destination must include the `/docs` prefix explicitly.
const helpMoves = JSON.parse(
  readFileSync(new URL('./scripts/help-move-map.json', import.meta.url), 'utf8')
);
const helpRedirects = Object.fromEntries(
  helpMoves.map(({ from, to }) => [
    `/suite/${from}/`,
    { status: 301, destination: `/docs/suite/${to}/` },
  ])
);

// ────────────────────────────────────────────────────────────────────────────
//  Testsigma Docs — Astro + Starlight config
//  Everything you normally need to touch lives in THIS file. Edit the sidebar,
//  the site URL, redirects, and analytics here. Page content lives in
//  src/content/docs/ as Markdown — you rarely touch code to add a page.
// ────────────────────────────────────────────────────────────────────────────

export default defineConfig({
  // Your production domain. Used for canonical URLs, sitemap, and OG tags.
  site: 'https://testsigma.com',

  // The whole docs site lives under /docs/ on the host.
  // outDir builds into dist/docs/ so files are physically at the right URL path.
  // Vercel is told outputDirectory:"dist" so it serves dist/ as root,
  // making dist/docs/suite/index.html accessible at /docs/suite/ with no rewrites.
  base: '/docs',
  outDir: './dist/docs',

  // CRITICAL for SEO parity: the old Gatsby site serves every URL WITH a
  // trailing slash (e.g. /docs/test-management/projects/). Keep this 'always'
  // so Astro produces the exact same URLs and you don't lose rankings.
  trailingSlash: 'always',

  // The whole docs site lives under /docs/ (same as today).
  // ── Explicit redirects (old URL → new URL). ──
  // Mirror of the old src/redirects.json. Add any URL that changes here.
  // NOTE: the old site also auto-redirected underscore URLs to hyphen URLs
  // (e.g. /manage_projects/ → /manage-projects/). See public/_redirects and
  // the README "URL parity" section for how that is handled at the host.
  // The Help-tab moves are generated above from scripts/help-move-map.json.
  redirects: helpRedirects,

  integrations: [
    starlight({
      title: 'Testsigma Docs',
      // Logo kept for Starlight internals (og:image, mobile menu, etc.)
      logo: { src: './src/assets/testsigma-mark.svg', alt: 'Testsigma' },

      // Code block styling — always dark regardless of site color mode.
      expressiveCode: {
        themes: ['one-dark-pro'],
        styleOverrides: {
          borderRadius: '8px',
          frames: {
            terminalTitlebarBackground: '#21252b',
            terminalTitlebarBorderBottomColor: '#181a1f',
            terminalBackground: '#282c34',
            // macOS traffic light colors
            terminalTitlebarDotsForeground: 'rgba(255,255,255,0.25)',
          },
        },
      },

      // Custom chrome — Header replaces Starlight's default header entirely.
      components: {
        Header:           './src/components/Header.astro',
        Sidebar:          './src/components/Sidebar.astro',
        TableOfContents:  './src/components/TableOfContents.astro',
        PageTitle:        './src/components/PageTitle.astro',
        MarkdownContent:  './src/components/ApiMarkdownContent.astro',
        // Footer wrapper mounts the global <AskOverlay/> (Ask Assistant) on every page.
        Footer:           './src/components/Footer.astro',
      },

      // GitHub "Edit this page" links — points to the markdown source
      editLink: {
        baseUrl: 'https://github.com/testsigmahq/testsigma-docs/edit/main/src/content/docs/',
      },

      // Brand fonts + analytics + canonical/SEO tags injected into <head>.
      // This replaces the old seo.jsx Helmet block. Starlight already emits
      // <title>, description, canonical, and Open Graph tags automatically
      // from each page's frontmatter — only the EXTRA bits go here.
      head: [
        // Favicon — teal Testsigma gear mark
        {
          tag: 'link',
          attrs: { rel: 'icon', type: 'image/png', href: '/docs/favicon.png' },
        },
        // Google Tag Manager (was inline in seo.jsx)
        {
          tag: 'script',
          content:
            "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5F8HTVT');",
        },
        // HubSpot
        {
          tag: 'script',
          attrs: { id: 'hs-script-loader', async: true, defer: true, src: '//js.hs-scripts.com/23341221.js' },
        },
        // Google site verification
        {
          tag: 'meta',
          attrs: { name: 'google-site-verification', content: '58TM3lGyGn6c2Bj0PvPQSNzrd9_yBsHs2BjJ6KMHlRU' },
        },
        // Inter + IBM Plex Mono (brand type)
        {
          tag: 'link',
          attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap' },
        },
      ],

      // Brand theming lives in one CSS file (colors only — no logic).
      customCss: ['./src/styles/custom.css'],

      // Full-text search, built in, zero config. No Typesense, no API keys.
      // (Starlight ships Pagefind automatically on `astro build`.)

      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/testsigmahq' },
      ],

      // ── The left-hand catalog. This is your nav. ──
      // Each `autogenerate` block builds itself from the folders under
      // src/content/docs/, ordered by each page's `sidebar.order` frontmatter
      // (we map your old `order:` field onto it). Add a folder + .md files and
      // it shows up here automatically.
      sidebar: [
        // ── Suite ─────────────────────────────────────────────────────────
        {
          label: 'Suite',
          items: [
            { label: 'Get Started', items: [
                { label: 'Introduction',    slug: 'suite/getting-started/introduction-cloud' },
                { label: 'FAQs',            slug: 'suite/getting-started/faqs' },
                { label: 'Terminology',     slug: 'suite/getting-started/terminology' },
                { label: 'Sample Apps',     slug: 'suite/getting-started/testsigma-sample-apps' },
                { label: 'Command Center',  slug: 'suite/getting-started/command-center' },
                { label: 'Setup',           autogenerate: { directory: 'suite/getting-started/setup' } },
              ]},
            { label: 'Atto AI Coworker', items: [
                { label: 'Overview',        slug: 'suite/atto/generative-ai/overview' },
                { label: 'Generate Tests',  autogenerate: { directory: 'suite/atto/generative-ai/generate-tests' } },
                { label: 'Copilot',         autogenerate: { directory: 'suite/atto/generative-ai/copilot' } },
                { label: 'Integrations',    autogenerate: { directory: 'suite/atto/generative-ai/integrations' } },
                { label: 'BYOK', items: [
                    { label: 'Introduction',   slug: 'suite/atto/generative-ai/byok/intro' },
                    { label: 'Supported LLMs', autogenerate: { directory: 'suite/atto/generative-ai/byok/supported-llms' } },
                  ]},
              ]},
            { label: 'AI Agents',           autogenerate: { directory: 'suite/ai-agents' } },
            { label: 'Auto-Healing',        autogenerate: { directory: 'suite/auto-healing' } },
            { label: 'Test Cases',          autogenerate: { directory: 'suite/test-cases' } },
            { label: 'Elements', items: [
                { label: 'Overview',          slug: 'suite/elements/overview' },
                { label: 'Web Apps',          autogenerate: { directory: 'suite/elements/web-apps' } },
                { label: 'Android Apps',      autogenerate: { directory: 'suite/elements/android-apps' } },
                { label: 'iOS Apps',          autogenerate: { directory: 'suite/elements/ios-apps' } },
                { label: 'Mobile Web',        autogenerate: { directory: 'suite/elements/mobile-web-application' } },
                { label: 'Flutter Apps',      autogenerate: { directory: 'suite/elements/flutter-apps' } },
                { label: 'Dynamic Elements',  autogenerate: { directory: 'suite/elements/dynamic-elements' } },
                { label: 'Import & Export',   slug: 'suite/elements/import-export' },
                { label: 'Locator Precedence',slug: 'suite/elements/locator-precedence' },
                { label: 'Verify Elements',   slug: 'suite/elements/verify-elements' },
              ]},
            { label: 'Test Data',           autogenerate: { directory: 'suite/test-data' } },
            { label: 'Test Plans',          autogenerate: { directory: 'suite/test-plans' } },
            { label: 'Test Suites',         autogenerate: { directory: 'suite/test-suites' } },
            { label: 'Runs',                autogenerate: { directory: 'suite/runs' } },
            { label: 'Reports',             autogenerate: { directory: 'suite/reports' } },
            { label: 'Integrations',        autogenerate: { directory: 'suite/integrations' } },
            { label: 'CI/CD',               autogenerate: { directory: 'suite/continuous-integration' } },
            { label: 'Testsigma Agent',     autogenerate: { directory: 'suite/agent' } },
            { label: 'Projects',            autogenerate: { directory: 'suite/projects' } },
            { label: 'Configuration',       autogenerate: { directory: 'suite/configuration' } },
            { label: 'On-Premise Setup',    autogenerate: { directory: 'suite/on-premise-setup' } },
            { label: 'Test Step Recorder',  autogenerate: { directory: 'suite/test-step-recorder' } },
            { label: 'Desktop Automation',  autogenerate: { directory: 'suite/desktop-automation' } },
            { label: 'Windows Automation',  autogenerate: { directory: 'suite/windows-automation' } },
            { label: 'Windows Lite',        autogenerate: { directory: 'suite/windows-lite-automation' } },
            { label: 'Visual Testing',      autogenerate: { directory: 'suite/visual-testing' } },
            { label: 'Accessibility',       autogenerate: { directory: 'suite/accessibility-testing' } },
            { label: 'Salesforce Testing',  autogenerate: { directory: 'suite/salesforce-testing' } },
            { label: 'SAP Automation',      autogenerate: { directory: 'suite/sap-automation' } },
            { label: 'Add-ons',             autogenerate: { directory: 'suite/addons' } },
            { label: 'SDK',                 autogenerate: { directory: 'suite/sdk' } },
            { label: 'Uploads',             autogenerate: { directory: 'suite/uploads' } },
            { label: 'Collaboration',       autogenerate: { directory: 'suite/collaboration' } },
            { label: 'Activity Monitoring', autogenerate: { directory: 'suite/activity-monitoring' } },
            { label: 'Desired Capabilities',autogenerate: { directory: 'suite/desired-capabilities' } },
            { label: 'Testsigma Terminal',  autogenerate: { directory: 'suite/testsigma-terminal' } },
            { label: 'Testsigma Tunnel',    autogenerate: { directory: 'suite/testsigma-tunnel' } },
            { label: 'Debugging',           autogenerate: { directory: 'suite/debugging' } },
            { label: 'Best Practices',      autogenerate: { directory: 'suite/best-practices' } },
            { label: 'API Reference', items: [
                { label: 'Overview',      slug: 'suite/api/overview' },
                { label: 'Projects',      items: [
                    { label: 'List projects',      slug: 'suite/api/projects/list-projects' },
                    { label: 'List applications',  slug: 'suite/api/projects/list-applications' },
                    { label: 'List uploads',       slug: 'suite/api/projects/list-uploads' },
                    { label: 'Get users',          slug: 'suite/api/projects/get-users' },
                  ]},
                { label: 'Test Cases',    items: [
                    { label: 'Get test case priorities', slug: 'suite/api/test-cases/get-priorities' },
                    { label: 'Get test case labels',     slug: 'suite/api/test-cases/get-labels' },
                    { label: 'Get requirements',         slug: 'suite/api/test-cases/get-requirements' },
                    { label: 'Update results',           slug: 'suite/api/test-cases/update-results' },
                    { label: 'Trigger a rerun',          slug: 'suite/api/test-cases/trigger-rerun' },
                    { label: 'Stop a rerun',             slug: 'suite/api/test-cases/stop-rerun' },
                    { label: 'Get execution details',    slug: 'suite/api/test-cases/get-test-case-execution-details' },
                  ]},
                { label: 'Test Steps',    items: [
                    { label: 'Create a test step',         slug: 'suite/api/test-steps/create-test-step' },
                    { label: 'Create multiple test steps', slug: 'suite/api/test-steps/create-multiple-test-steps' },
                    { label: 'Retrieve a test step',       slug: 'suite/api/test-steps/retrieve-test-step' },
                    { label: 'List test case steps',       slug: 'suite/api/test-steps/list-test-case-steps' },
                    { label: 'Search NLP templates',       slug: 'suite/api/test-steps/search-nlp-templates' },
                    { label: 'Update a test step',         slug: 'suite/api/test-steps/update-test-step' },
                    { label: 'Delete a test step',         slug: 'suite/api/test-steps/delete-test-step' },
                  ]},
                { label: 'Elements',      items: [
                    { label: 'Get elements',     slug: 'suite/api/elements/get-elements' },
                    { label: 'Get an element',   slug: 'suite/api/elements/get-an-element' },
                    { label: 'Create an element',slug: 'suite/api/elements/create-an-element' },
                    { label: 'Update an element',slug: 'suite/api/elements/update-an-element' },
                  ]},
                { label: 'Test Data',     items: [
                    { label: 'Upload test data profile',  slug: 'suite/api/test-data/upload-test-data-profile' },
                    { label: 'Update test data profile',  slug: 'suite/api/test-data/update-test-data-profile' },
                    { label: 'Create profile value',      slug: 'suite/api/test-data/create-profile-value' },
                    { label: 'Update profile value',      slug: 'suite/api/test-data/update-profile-value' },
                  ]},
                { label: 'Environments',  items: [
                    { label: 'List environments',        slug: 'suite/api/environments/list-environments' },
                    { label: 'Get an environment',       slug: 'suite/api/environments/get-an-environment' },
                    { label: 'Create an environment',    slug: 'suite/api/environments/create-an-environment' },
                    { label: 'Update an environment',    slug: 'suite/api/environments/update-an-environment' },
                  ]},
                { label: 'Test Suites',   items: [
                    { label: 'Get test suites', slug: 'suite/api/test-suites/get-test-suites' },
                  ]},
                { label: 'Test Plans',    items: [
                    { label: 'Trigger a test plan',   slug: 'suite/api/test-plans/trigger-test-plan' },
                    { label: 'Get test plan result',  slug: 'suite/api/test-plans/get-test-plan-result' },
                    { label: 'Get test case results', slug: 'suite/api/test-plans/get-test-case-results' },
                    { label: 'Get test plan configs', slug: 'suite/api/test-plans/get-test-plan-configs' },
                    { label: 'List test plans',       slug: 'suite/api/test-plans/list-test-plans' },
                    { label: 'Schedule a test plan',  slug: 'suite/api/test-plans/schedule-test-plan' },
                    { label: 'Update a schedule',     slug: 'suite/api/test-plans/update-schedule' },
                    { label: 'Delete a schedule',     slug: 'suite/api/test-plans/delete-schedule' },
                  ]},
                { label: 'Uploads',       items: [
                    { label: 'Upload a file',       slug: 'suite/api/uploads/upload-file' },
                    { label: 'Update a file',       slug: 'suite/api/uploads/update-file' },
                    { label: 'Get an upload',       slug: 'suite/api/uploads/get-upload' },
                    { label: 'Get upload versions', slug: 'suite/api/uploads/get-upload-versions' },
                  ]},
                { label: 'Results',       items: [
                    { label: 'Test plan results',    slug: 'suite/api/results/fetch-test-plan-results' },
                    { label: 'Test machine results', slug: 'suite/api/results/fetch-test-machine-results' },
                    { label: 'Test suite results',   slug: 'suite/api/results/fetch-test-suite-results' },
                    { label: 'Test case results',    slug: 'suite/api/results/fetch-test-case-results' },
                    { label: 'Test step results',    slug: 'suite/api/results/fetch-test-step-results' },
                  ]},
                { label: 'Integrations',  items: [
                    { label: 'Refresh Salesforce metadata', slug: 'suite/api/integrations/refresh-salesforce-metadata' },
                    { label: 'Get refresh status',          slug: 'suite/api/integrations/get-refresh-status' },
                  ]},
              ]},
            { label: 'Help', items: [
                { label: 'Agent & Setup',      autogenerate: { directory: 'suite/help/agent-setup' } },
                { label: 'Web Testing',        autogenerate: { directory: 'suite/help/web-testing' } },
                { label: 'Mobile Testing',     autogenerate: { directory: 'suite/help/mobile-testing' } },
                { label: 'Steps & Elements',   autogenerate: { directory: 'suite/help/steps-elements' } },
                { label: 'Copilot & Terminal', autogenerate: { directory: 'suite/help/copilot-terminal' } },
                { label: 'Execution & APIs',   autogenerate: { directory: 'suite/help/execution-apis' } },
                { label: 'Desktop & Windows',  autogenerate: { directory: 'suite/help/desktop-windows' } },
                { label: 'General How-Tos',    autogenerate: { directory: 'suite/help/general-howtos' } },
              ]},
          ],
        },
        // ── Arcus ─────────────────────────────────────────────────────────
        {
          label: 'Arcus',
          items: [
            { label: 'Introduction',     autogenerate: { directory: 'arcus/introduction' } },
            { label: 'Projects',         autogenerate: { directory: 'arcus/projects' } },
            { label: 'Test Cases',       autogenerate: { directory: 'arcus/test-cases' } },
            { label: 'Test Plans',       autogenerate: { directory: 'arcus/test-plans' } },
            { label: 'Test Runs',        autogenerate: { directory: 'arcus/test-runs' } },
            { label: 'Step Groups',      autogenerate: { directory: 'arcus/step-groups' } },
            { label: 'Test Capture',     autogenerate: { directory: 'arcus/test-capture' } },
            { label: 'Data Sets',        autogenerate: { directory: 'arcus/data-sets' } },
            { label: 'Atto (AI)',        autogenerate: { directory: 'arcus/atto' } },
            { label: 'Integrations',     autogenerate: { directory: 'arcus/integrations' } },
            { label: 'CI/CD',            autogenerate: { directory: 'arcus/ci-cd-integrations' } },
            { label: 'Reports',          autogenerate: { directory: 'arcus/reports' } },
            { label: 'Manage Users',     autogenerate: { directory: 'arcus/manage-users' } },
            { label: 'Settings',         autogenerate: { directory: 'arcus/settings' } },
            { label: 'Imports/Exports',  autogenerate: { directory: 'arcus/imports-and-exports' } },
            { label: 'Two-Way Sync',     autogenerate: { directory: 'arcus/testsigma-two-way-integration' } },
            { label: 'API Reference', items: [
                { label: 'Overview', slug: 'arcus/api-reference/overview' },
                { label: 'Modules',  slug: 'arcus/api-reference/modules' },
                { label: 'Projects', items: [
                    { label: 'Create a project', slug: 'arcus/api-reference/projects/create-a-project' },
                    { label: 'Get a project',    slug: 'arcus/api-reference/projects/get-a-project' },
                    { label: 'List projects',    slug: 'arcus/api-reference/projects/list-projects' },
                    { label: 'Update a project', slug: 'arcus/api-reference/projects/update-a-project' },
                    { label: 'Delete a project', slug: 'arcus/api-reference/projects/delete-a-project' },
                  ]},
                { label: 'Folders', items: [
                    { label: 'Create a folder', slug: 'arcus/api-reference/folders/create-a-folder' },
                    { label: 'Get a folder',    slug: 'arcus/api-reference/folders/get-a-folder' },
                    { label: 'List folders',    slug: 'arcus/api-reference/folders/list-folders' },
                    { label: 'Update a folder', slug: 'arcus/api-reference/folders/update-a-folder' },
                    { label: 'Move a folder',   slug: 'arcus/api-reference/folders/move-a-folder' },
                    { label: 'Delete a folder', slug: 'arcus/api-reference/folders/delete-a-folder' },
                  ]},
                { label: 'Test Cases', items: [
                    { label: 'Create a test case', slug: 'arcus/api-reference/test-cases/create-a-test-case' },
                    { label: 'Get a test case',    slug: 'arcus/api-reference/test-cases/get-a-test-case' },
                    { label: 'List test cases',    slug: 'arcus/api-reference/test-cases/list-test-cases' },
                    { label: 'Update a test case', slug: 'arcus/api-reference/test-cases/update-a-test-case' },
                    { label: 'Delete a test case', slug: 'arcus/api-reference/test-cases/delete-a-test-case' },
                  ]},
                { label: 'Step Groups', items: [
                    { label: 'Create a step group', slug: 'arcus/api-reference/step-groups/create-a-step-group' },
                    { label: 'Get a step group',    slug: 'arcus/api-reference/step-groups/get-a-step-group' },
                    { label: 'List step groups',    slug: 'arcus/api-reference/step-groups/list-step-groups' },
                    { label: 'Update a step group', slug: 'arcus/api-reference/step-groups/update-a-step-group' },
                    { label: 'Delete a step group', slug: 'arcus/api-reference/step-groups/delete-a-step-group' },
                  ]},
                { label: 'Test Runs', items: [
                    { label: 'Create a test run',          slug: 'arcus/api-reference/test-runs/create-a-test-run' },
                    { label: 'Get a test run',             slug: 'arcus/api-reference/test-runs/get-a-test-run' },
                    { label: 'List test runs',             slug: 'arcus/api-reference/test-runs/list-test-runs' },
                    { label: 'Get test run cases',         slug: 'arcus/api-reference/test-runs/get-test-run-cases' },
                    { label: 'Assign user to test run case', slug: 'arcus/api-reference/test-runs/assign-user-to-test-run-case' },
                    { label: 'Update test run case status', slug: 'arcus/api-reference/test-runs/update-test-run-case-status' },
                    { label: 'Update a test run',          slug: 'arcus/api-reference/test-runs/update-a-test-run' },
                    { label: 'Delete a test run',          slug: 'arcus/api-reference/test-runs/delete-a-test-run' },
                  ]},
                { label: 'Report Imports', items: [
                    { label: 'JUnit report import', slug: 'arcus/api-reference/report-imports/junit-report-import' },
                    { label: 'Get import status',   slug: 'arcus/api-reference/report-imports/get-import-status' },
                  ]},
                { label: 'Test Plans', items: [
                    { label: 'Create a test plan',            slug: 'arcus/api-reference/test-plans/create-a-test-plan' },
                    { label: 'Get a test plan',               slug: 'arcus/api-reference/test-plans/get-a-test-plan' },
                    { label: 'List test plans',               slug: 'arcus/api-reference/test-plans/list-test-plans' },
                    { label: 'List test runs for a test plan', slug: 'arcus/api-reference/test-plans/list-test-runs-for-test-plan' },
                    { label: 'Complete a test plan',          slug: 'arcus/api-reference/test-plans/complete-a-test-plan' },
                    { label: 'Update a test plan',            slug: 'arcus/api-reference/test-plans/update-a-test-plan' },
                    { label: 'Delete a test plan',            slug: 'arcus/api-reference/test-plans/delete-a-test-plan' },
                  ]},
                { label: 'Settings', items: [
                    { label: 'Get automation types',     slug: 'arcus/api-reference/settings/get-automation-types' },
                    { label: 'Get test case types',      slug: 'arcus/api-reference/settings/get-test-case-types' },
                    { label: 'Get test case statuses',   slug: 'arcus/api-reference/settings/get-test-case-statuses' },
                    { label: 'Get test case priorities', slug: 'arcus/api-reference/settings/get-test-case-priorities' },
                    { label: 'Get test run statuses',    slug: 'arcus/api-reference/settings/get-test-run-statuses' },
                    { label: 'Get users',                slug: 'arcus/api-reference/settings/get-users' },
                  ]},
              ]},
            { label: 'Help', items: [
                { label: 'Getting Started', autogenerate: { directory: 'arcus/help' } },
              ]},
          ],
        },
      ],
    }),
  ],
});