// Types the one custom env var this project reads in client code. Astro's own
// ImportMetaEnv (from .astro/types.d.ts) covers the built-ins; without this
// declaration `astro check` flags PUBLIC_ASK_API_ORIGIN as unknown.
interface ImportMetaEnv {
	/**
	 * Origin serving api/ask + api/ask-feedback, e.g. https://docs-ask.vercel.app.
	 * Empty/unset means same-origin (Vercel, `npm run dev:ask`).
	 * See the note above ASK_API_URL in src/scripts/ask-shared.ts.
	 */
	readonly PUBLIC_ASK_API_ORIGIN?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
