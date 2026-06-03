/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare module "@fontsource-variable/jetbrains-mono";

interface ImportMetaEnv {
	readonly UMAMI_API_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
