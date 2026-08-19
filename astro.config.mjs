// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { suite } from './src/data/sidebar-suite.mjs';

// https://astro.build/config
export default defineConfig({
	// No compatibility redirects: this site is staging/local only, never
	// published anywhere a link could exist to an old slug. Just the root
	// and the home/overview slugs that moved during development.
	redirects: {
		// Docs home lives at the site root.
		'/': '/home/',
		'/suite/home/': '/home/',
		'/suite/get-started/home/': '/home/',
		'/suite/get-started/': '/suite/get-started/overview/',
		// Overview moved into get-started/ when the sidebar became folder-driven
		// (2026-08-17) and each rail section became one content folder.
		'/suite/overview/': '/suite/get-started/overview/',
	},
	integrations: [
		starlight({
			title: 'Testsigma',
			// The browser tab was still showing Astro's starter favicon (the sparkle
			// in public/favicon.svg, which Starlight falls back to when this is
			// unset). Same mark the sidebar head uses, extracted from
			// testsigma-logo.svg -- one asset for both.
			favicon: '/testsigma-mark.svg',
			// The SVG above is the primary icon and stays crisp at any size, but it
			// is not enough on its own: iOS ignores SVG icons, and every browser
			// still probes /favicon.ico blind (a 404 until now). Both files are
			// rasterised FROM that same SVG by `npm run favicons`, so the three can
			// never drift into three different marks.
			head: [
				{
					tag: 'link',
					attrs: { rel: 'icon', href: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
				},
				{
					tag: 'link',
					attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
				},
				// Preload the header logos: on a full-page navigation the fetch starts
				// with the HTML instead of after layout, so the wordmark doesn't pop in
				// last and read as a "reload". Both variants, since the theme decides
				// late which one shows.
				{
					tag: 'link',
					attrs: { rel: 'preload', as: 'image', href: '/testsigma-logo.png' },
				},
				{
					tag: 'link',
					attrs: { rel: 'preload', as: 'image', href: '/testsigma-logo-dark.png' },
				},
			],
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
			// Chain-link anchor icons on headings (Bharath, 2026-08-19, reversing
			// the 2026-08-18 removal) — Linear-style copyable section links.
			markdown: { headingLinks: true },
			pagination: true,
			tableOfContents: {
				// Linear's rail nests H3s under their H2, so the reader can see
				// sub-steps without opening the page. The design canvas listed H2s
				// only; following Linear here since this is its layout.
				minHeadingLevel: 2,
				maxHeadingLevel: 3,
			},
			// One product (Suite) since Arcus was removed 2026-08-17; when Arcus
			// returns, wrap each product's tree in a labeled group and unwrap by
			// URL in the middleware again (see git history).
			sidebar: suite,
			// Splits the API reference out of the tree: endpoint pages show only
			// the endpoint groups, every other page shows everything else.
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
