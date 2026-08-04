// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { suiteV2 } from './src/data/sidebar-suite-v2.mjs';
import { arcusNav } from './src/data/sidebar-arcus.mjs';

// https://astro.build/config
export default defineConfig({
	// No landing page: the docs root is the introduction. The three entries below
	// are the pages Introduction absorbed -- their URLs are kept alive because
	// they were the linkable ones (What is Testsigma? was the site root's target,
	// and Terminology was linked from quickstarts and Arcus).
	redirects: {
		'/': '/suite/get-started/introduction/',
		'/suite/get-started/what-is-testsigma/': '/suite/get-started/introduction/',
		'/suite/get-started/terminology/': '/suite/get-started/introduction/#terminology',
		'/suite/get-started/execution-stacks/': '/suite/get-started/introduction/#execution-stacks',
	},
	integrations: [
		starlight({
			title: 'Testsigma',
			// The browser tab was still showing Astro's starter favicon (the sparkle
			// in public/favicon.svg, which Starlight falls back to when this is
			// unset). Same mark the sidebar head uses, extracted from
			// testsigma-logo.svg -- one asset for both.
			favicon: '/testsigma-mark.svg',
			// The wordmark and the "Docs" chip are rendered by the SiteTitle
			// override, so no `logo` config here.
			description:
				'Documentation for Testsigma Suite: test automation for web, mobile, desktop, Salesforce, and APIs.',
			// Inter is the design's typeface (it ships the @font-face in the design
			// system's colors_and_type.css, pointing at .ttf files in that project).
			// Self-hosted via fontsource here rather than copying the TTFs, which
			// exceed the design API's 256 KiB per-file read limit.
			customCss: ['@fontsource-variable/inter', './src/styles/theme.css'],
			components: {
				// Linear-style layout: the sidebar owns the full viewport height and
				// carries the wordmark + search; the header becomes a top bar inside
				// the content column carrying breadcrumbs + page actions.
				Sidebar: './src/components/Sidebar.astro',
				Header: './src/components/Header.astro',
				PageTitle: './src/components/PageTitle.astro',
				// API reference layout for any page with an `api:` block in its
				// frontmatter; every other page renders as normal markdown.
				MarkdownContent: './src/components/ApiMarkdownContent.astro',
				// Click-to-toggle button, replacing Starlight's 3-option select.
				ThemeSelect: './src/components/ThemeSelect.astro',
				// Appends the "Was this page helpful?" row below the pagination.
				Footer: './src/components/Footer.astro',
			},
			pagination: true,
			tableOfContents: {
				// Linear's rail nests H3s under their H2, so the reader can see
				// sub-steps without opening the page. The design canvas listed H2s
				// only; following Linear here since this is its layout.
				minHeadingLevel: 2,
				maxHeadingLevel: 3,
			},
			// Both products in ONE sidebar, each under a top-level group. The route
			// middleware unwraps whichever group matches the URL, so only that
			// product's tree is ever rendered -- the reader never sees a "Suite" /
			// "Arcus" wrapper node, just that product's sections at top level.
			//
			// Two separate `sidebar` arrays is not an option: Starlight takes exactly
			// one, and it builds the tree before rendering. Nesting + unwrapping is
			// the same trick already used to split the API reference out of Suite.
			sidebar: [
				{ label: 'Suite', items: suiteV2 },
				{ label: 'Arcus', items: arcusNav },
			],
			// Picks the product tree by URL, then splits API reference out of Suite.
			// See the file for why it isn't two `sidebar` arrays.
			routeMiddleware: './src/starlightRouteData.ts',
			expressiveCode: {
				// ONE theme, and a dark one, so code blocks stay dark on the light
				// page as well -- matching the reference. A light/dark pair would
				// flip the block to a near-white fill in light mode, which is what
				// this used to do.
				themes: ['one-dark-pro'],
				// `defaultProps: { frame: 'code' }` is deliberately NOT set: it forces
				// every block into the plain editor frame, and the reference wants
				// shell blocks in EC's terminal frame with the macOS traffic-light
				// dots. Leaving it unset lets EC pick per language -- bash/sh get the
				// terminal, yaml/text/groovy get the plain frame.
				styleOverrides: {
					borderRadius: '8px',
					codeFontFamily:
						"ui-monospace, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
					codeFontSize: '0.781rem',
					codeLineHeight: '1.7',
					codePaddingBlock: '14px',
					codePaddingInline: '16px',
					uiFontFamily: "'Inter', -apple-system, system-ui, sans-serif",
					uiFontSize: '0.688rem',
					frames: {
						frameBoxShadowCssValue: 'none',
						editorActiveTabIndicatorHeight: '0px',
						terminalTitlebarBackground: '#21252b',
						terminalTitlebarBorderBottomColor: '#181a1f',
						terminalBackground: '#282c34',
						terminalTitlebarDotsForeground: 'rgba(255,255,255,0.25)',
					},
				},
			},
		}),
	],
});
