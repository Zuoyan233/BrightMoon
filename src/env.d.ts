/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare module "@fontsource-variable/jetbrains-mono";

interface ImportMetaEnv {
	readonly UMAMI_API_KEY?: string;
}

// biome-ignore lint/correctness/noUnusedVariables: augments global import.meta type via declaration merging
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
