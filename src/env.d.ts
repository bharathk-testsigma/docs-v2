/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_ASK_API_ORIGIN?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
