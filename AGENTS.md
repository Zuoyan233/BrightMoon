# AGENTS.md — BrightMoon Project Guide

## Project Overview

BrightMoon is a feature-rich static blog site built on Astro + Svelte + Tailwind CSS (versions from package.json → dependencies: astro, svelte, tailwindcss), derived from the Fuwari template with deep customization. Project version is defined in package.json → version field. Licensed under Apache 2.0.

Core features:
- **Static site generation** (optional Cloudflare Workers adapter via `CF_WORKERS=1`)
- **8-language i18n** (en / zh_CN / zh_TW / ja / ko / fr / de / ru) with client-side dictionary rendering + optional translate.js machine translation
- **Post encryption** (AES, client-side decryption via crypto-es) + optional site-wide password protection
- **Anime tracking** (local data / Bangumi API / Bilibili API, switchable via `siteConfig.anime.mode`)
- **Pagefind full-text search**
- **Swup page transition animations**
- **RSS / Atom / Sitemap / OG image generation**
- **Live2D mascot (Pio)** + sakura particle effect
- **Music player (local / online mode) / Weather widget / Calendar / Daily quote / Announcement / Timeline / Albums / Devices / Projects / Skills** (feature pages toggleable via `siteConfig.featurePages`)
- **Wallpaper system**: `banner` / `fullscreen` / `fullscreen-banner` / `none` modes with per-device position & opacity settings
- **Post list layout**: list / grid modes, switchable
- **Cookie consent / External link confirmation / Third-party analytics (GTM, Microsoft Clarity)**
- **IndexNow SEO submission**
- **Version check dialog** (upgrade notification) + **Interactive framework upgrade tool** (SHA256 verification, backup, protected file skipping)

## Build & Test Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Full build (update-anime → astro build → pagefind → optimize-images → compress-fonts) |
| `pnpm check` | Astro type checking |
| `pnpm type-check` | `tsc --noEmit --isolatedDeclarations` |
| `pnpm lint` | Biome check + auto-fix (`./src`) |
| `pnpm format` | Biome format only (`./src`) |
| `pnpm preview` | Preview build output |
| `pnpm new-post -- <filename>` | Create a new post (auto-generates frontmatter) |
| `pnpm update-anime` | Update anime data |
| `pnpm update-bangumi` | Sync data from Bangumi API |
| `pnpm update-bilibili` | Sync data from Bilibili API |
| `pnpm optimize-images` | Optimize source images (`--source`); build step uses `--dist` |
| `pnpm compress-fonts` | Font subsetting & compression |
| `pnpm test-font-compression` | Test font compression in isolation |
| `pnpm submit` | Submit URLs to search engines via IndexNow |
| `pnpm brightmoon-upgrade` | Interactive framework upgrade |

**Package manager: pnpm** (version pinned in `package.json` → `packageManager` field). npm/yarn are forbidden (enforced by `preinstall` script using `only-allow pnpm`).

### CI Pipeline

GitHub Actions (`.github/workflows/CI.yml`) runs on the `master` branch (push + PR, plus `workflow_dispatch`) with two jobs:
1. **Astro Check** — `pnpm astro check`
2. **Astro Build** — `pnpm astro build` (both set `ENABLE_CONTENT_SYNC=false` to skip external API calls)

Both jobs use a concurrency group (in-progress runs are cancelled) and install dependencies with `pnpm install --frozen-lockfile`.

## Project Structure

```
src/
├── config/          # Site config (defaults/ framework-maintained / user/ user overrides / index.ts deep merge)
│   ├── defaults/    # Default config values, including *-data.ts data files (overwritten on upgrade)
│   ├── user/        # User config overrides + user data files (protected during upgrade, all fields optional)
│   └── index.ts     # Deep merge entry point
├── content/
│   ├── posts/       # Blog posts (Markdown with frontmatter)
│   └── spec/        # Special pages (about / feedback / friends / sponsors)
├── components/      # Astro + Svelte components
│   ├── comment/     # Comment system (Twikoo)
│   ├── control/     # Interactive controls (pagination, back-to-top, floating TOC, buttons)
│   ├── layout/      # Layout components (RightSideBar)
│   ├── misc/        # General components (icons, image wrapper, license, share poster, fullscreen wallpaper, markdown)
│   └── widget/      # Sidebar widgets (weather, calendar, tags, categories, music player, mascot, announcement, daily quote, profile, etc.)
├── constants/       # Shared constants (constants.ts, link-presets.ts)
├── layouts/         # Page layouts (Layout.astro / MainGridLayout.astro)
├── pages/           # Route pages + API endpoints
│   ├── albums/      # Album routes ([...page].astro listing + [id]/index.astro detail)
│   ├── anime/       # Anime tracking page
│   ├── api/         # JSON API (calendar-data.json)
│   ├── diary/       # Diary page
│   ├── og/          # OG image generation ([...slug].png.ts, satori)
│   ├── posts/       # Post dynamic routes
│   ├── archive.astro / about.astro / 404.astro
│   ├── devices / feedback / friends / projects / skills / sponsors / timeline .astro  # Feature pages
│   ├── rss.xml.ts / atom.xml.ts  # Feed endpoints
│   └── robots.txt.ts
├── plugins/         # rehype/remark plugins + expressive-code plugins (custom copy button, language badge, mermaid, admonitions, GitHub cards, image width, wrap-table)
├── scripts/         # Client-side JS (theme-init, theme-optimizer, layout, banner, main-grid, bottom-breadcrumb, right-sidebar-layout, code-collapse, version-check)
├── styles/          # CSS / Stylus stylesheets (main.css, variables.styl, per-feature css)
├── utils/           # Utility functions (content-utils, album-scanner, translation-manager, i18n-dom-updater, language-utils, sakura-manager, permalink-utils, setting-utils, widget-manager, etc.)
├── i18n/            # Internationalization
│   ├── languages/   # 8 language dictionaries (de / en / fr / ja / ko / ru / zh_CN / zh_TW)
│   ├── translation.ts  # Client-side allTranslations registry (configLang → dict)
│   └── i18nKey.ts   # i18n key definitions
├── assets/          # Astro-processed assets (images)
├── types/           # TypeScript type definitions (config.ts, album.ts, crypto-es.d.ts, translate.d.ts)
├── content.config.ts # Content collection Zod schema definitions
└── env.d.ts         # Environment variable type declarations

scripts/              # Build/tool scripts (update-anime.mjs, update-bangumi.mjs, update-bilibili.mjs, optimize-images.js, compress-fonts.js, new-post.js, upgrade.mjs, indexnow-submit.js, load-env.js)
public/               # Static assets (assets/, favicon/, images/, js/, pio/ Live2D models)
```

**Note:** There is no `src/data/` directory — all site data files (anime, devices, diary, friends, projects, skills, timeline) live as `*-data.ts` modules under `src/config/defaults/` with user overrides in `src/config/user/`.

## Code Style

### Formatting & Lint (Biome)

- **Indentation**: Tabs (not spaces)
- **Quotes**: Double quotes
- **Import sorting**: Auto-organized (`assist.actions.source.organizeImports: "on"`)
- **Lint rules**: Biome `recommended` preset + extra strict rules
  - `noParameterAssign: error`
  - `useAsConstAssertion: error`
  - `useDefaultParameterLast: error`
  - `useEnumInitializers: error`
  - `useSelfClosingElements: error`
  - `useSingleVarDeclarator: error`
  - `noUselessElse: error`
  - `noInferrableTypes: error`
  - `noUnusedTemplateLiteral: error`
  - `useNumberNamespace: error`

### File-Type Specific Rules

- **`.astro` / `.svelte`**: Relaxed `useConst`, `useImportType`, `noUnusedVariables`, `noUnusedImports` (unavoidable in framework-generated code)
- **`.d.ts`**: Relaxed `noUnusedVariables`
- **`.css`**: Allows `formatWithErrors`; disables `noUnknownAtRules` (Tailwind directives), `noDuplicateProperties`, `noUnknownProperty`, `noImportantStyles`, `noDescendingSpecificity`
- Biome `files.includes` excludes `dist/`, `node_modules/`, `src/public/`, `public/assets/js`

### CSS

- Tailwind CSS (version from `package.json` → `tailwindcss`) + `@tailwindcss/typography`
- PostCSS nesting + import
- Stylus for partial styles (`.styl`)
- Vite `cssMinify: "esbuild"` (lightningcss does not support `&` nesting syntax — do not change back)
- Biome CSS parser with `tailwindDirectives: true`

### Component Conventions

- Page-level components use `.astro`
- Components requiring client-side interactivity use `.svelte` (Svelte, version from `package.json` → `svelte`, runes syntax)
- Path aliases: `@/` → `src/`, `@components/` → `src/components/`, `@i18n/` → `src/i18n/`, `@utils/` → `src/utils/`, `@assets/` → `src/assets/`, `@constants/` → `src/constants/`, `@layouts/` → `src/layouts/`

### Configuration Pattern

- **Defaults**: `src/config/defaults/` (overwritten on upgrade — do not edit manually)
- **User overrides**: `src/config/user/` (protected during upgrade, all fields optional)
- **Merge entry**: `src/config/index.ts` (deep merge, business code imports from here)
- **Type definitions**: `src/types/config.ts`
- Key config groups: `featurePages` (10 page toggles), `wallpaper` (banner/fullscreen/fullscreen-banner/none modes), `postListLayout`, `translate`, `anime` (bangumi/local/bilibili modes), `musicPlayer`, `pio`, `weather`, `font`, `upgrade`

## Content Authoring

### Post Frontmatter Schema

Posts live in `src/content/posts/` and support nested directories. Schema defined in `src/content.config.ts`:

```yaml
title: string          # Required
published: date        # Required
updated: date          # Optional
draft: boolean         # Default false
description: string    # Default ""
image: string          # Cover image path, default ""
tags: string[]         # Default []
category: string       # Default "", nullable
lang: string           # Default ""
pinned: boolean        # Pin to top, default false
comment: boolean       # Default true
priority: number       # Optional sorting priority
author: string         # Default ""
sourceLink: string     # Original article URL (for reprints), default ""
licenseName: string    # Custom license name, default ""
licenseUrl: string     # Custom license URL, default ""
encrypted: boolean     # Encrypted post, default false
password: string       # Encryption password (build-time only, not exposed as plaintext to frontend)
passwordHint: string   # Password hint, default ""
alias: string          # Post alias (alternate URL)
permalink: string      # Custom permalink, higher priority than alias
prevTitle / prevSlug   # Manual "previous post" override
nextTitle / nextSlug   # Manual "next post" override
```

### Creating a New Post

```bash
pnpm new-post -- my-new-post
```

### Encrypted Posts

Set `encrypted: true` and `password: "your-password"` in frontmatter. Content is AES-encrypted at build time and decrypted client-side by user input. **The password is embedded in encrypted form in the page** — security depends on password strength. Not suitable for protecting highly sensitive content.

### Albums

Albums are **directory-scanned**, not content collections: `src/utils/album-scanner.ts` reads `public/images/albums/<album-name>/` folders at build time. Folder names with a configurable prefix are treated as hidden and excluded from pages and the sitemap (filter in `astro.config.mjs` → sitemap integration).

## Client-side i18n & Translation

- Static UI text uses the i18n dictionary system: `src/i18n/languages/` (8 dictionaries), registered in `src/i18n/translation.ts` → `allTranslations` (configLang → dict). New languages must be added there.
- Client-side lookups go through `window.__i18n` helpers injected by MainGridLayout (`resolveLang()` / `t(key)`); unknown keys fall back: current language dict → site config language dict → empty string (never expose raw keys).
- Machine translation (translate.js) is coordinated by `src/utils/translation-manager.ts` + `i18n-dom-updater.ts`; dynamic DOM insertion must use `translationManager.translateRoot(el)`, never `window.translate.execute()` directly.
- Banner title/subtitle, post content, profile text etc. are config/content data — intentionally NOT covered by the i18n dictionary.

## Markdown Rendering Pipeline

Configured in `astro.config.mjs`:
- **remark**: math (remark-math), directives, sectionize, GitHub admonitions → directives, mermaid, custom `remarkContent`
- **rehype**: KaTeX, slug, autolink-headings, mermaid, image-width, wrap-table, components (github card / note / tip / important / caution / warning admonitions)
- **Expressive Code**: github-light/dark themes, collapsible sections, line numbers, custom language badge + copy button plugins (`src/plugins/expressive-code/`)

## Environment Variables

Copy `.env.example` to `.env`:

| Variable | Purpose |
|----------|---------|
| `INDEXNOW_KEY` | IndexNow SEO submission key |
| `INDEXNOW_HOST` | Site domain for IndexNow |
| `CF_WORKERS` | Set to any value to enable Cloudflare Workers adapter (read directly by `astro.config.mjs`, not in `.env.example`) |
| `ENABLE_CONTENT_SYNC` | Set to `false` to skip external API sync scripts (used by CI) |

**`.env` is in `.gitignore` — never commit it.**

## Deployment Steps

### Standard Static Deployment

1. `pnpm install --frozen-lockfile`
2. `pnpm build` (outputs to `dist/` directory)
3. Deploy `dist/` to any static host (Vercel / Netlify / Cloudflare Pages / GitHub Pages, etc.)

### Cloudflare Workers Deployment

1. Set environment variable `CF_WORKERS=1`
2. `pnpm build`
3. Deploy with `wrangler` (project includes `@astrojs/cloudflare` adapter and `wrangler` dependency)

### Build Pipeline Details

`pnpm build` executes the following steps in order:
1. `node scripts/update-anime.mjs` — Sync anime data (skipped if `ENABLE_CONTENT_SYNC=false`)
2. `astro build` — Astro static site build (album scan happens here, URLs from `siteConfig.siteURL`)
3. `pagefind --site dist` — Generate search index
4. `node scripts/optimize-images.js --dist` — Optimize output images
5. `node scripts/compress-fonts.js` — Font subsetting & compression

## Commit Conventions

The project does not enforce a commit message format, but the PR template (`.github/pull_request_template.md`) requires categorization:

- **Bug fix**: Non-breaking change that fixes an issue
- **New feature**: Non-breaking change that adds functionality
- **Breaking change**: Change that causes existing functionality to break
- **Other**: Custom changes

PR Checklist:
- [ ] Read the [CONTRIBUTING](https://github.com/saicaca/fuwari/blob/main/CONTRIBUTING.md) document
- [ ] Confirm PR is not for personal config changes
- [ ] Self-reviewed code
- [ ] Changes generate no new warnings

## Security Notes & Pitfalls

### Must Follow

1. **Never commit `.env` files** — They contain API keys (INDEXNOW_KEY). `.gitignore` excludes them, but double-check.
2. **Never hardcode secrets in frontend code** — All sensitive config is injected via environment variables; type declarations are in `src/env.d.ts`. Bilibili `SESSDATA` in anime config is also sensitive.
3. **Encrypted post passwords are not truly secure** — AES encryption happens at build time; ciphertext is embedded in HTML. Anyone viewing source can attempt brute-force. Only suitable for low-sensitivity content protection — **do not use for truly confidential information**.
4. **sanitize-html** — The project uses `sanitize-html` to process user-input HTML (e.g., comments). Never bypass this sanitization step.
5. **CORS configuration** — `public/_headers` sets `Access-Control-Allow-Origin: *` for RSS/Atom endpoints. Be mindful of security implications when modifying.

### Common Pitfalls

1. **Edits to `src/config/defaults/` are lost on upgrade** — All user config and data must go in `src/config/user/`; `defaults/` is framework-maintained.
2. **`content/` directory is gitignored** — When using the independent content repo mode, `/content/` is excluded. Ensure content is in the correct location.
3. **User data files live in `src/config/user/`** — `devices-data.ts`, `friends-data.ts`, `diary-data.ts`, `projects-data.ts`, `skills-data.ts`, `timeline-data.ts`, `anime-data.ts` are user data, protected during upgrade.
4. **`src/config/user/bangumi-data.json`, `bilibili-data.json`, `anime-data.json` are gitignored** — API-synced data is not version-controlled.
5. **Build-time external API calls** — `update-anime`, `update-bangumi`, `update-bilibili` scripts call external APIs. CI skips them via `ENABLE_CONTENT_SYNC=false`. Local builds may fail without network or if APIs are rate-limited.
6. **pnpm strict lockfile** — Must use `pnpm install --frozen-lockfile`; `npm` and `yarn` are not accepted.
7. **Dependabot ignores major version updates** — `.github/dependabot.yml` groups patch and minor updates; major versions are ignored and require manual handling.
8. **Swup and anchor navigation** — Swup is configured with `smoothScrolling: false` and `skipPopStateHandling` to skip anchor links. When modifying Swup config, be careful not to break anchor jump behavior.
9. **Image format** — The project heavily uses WebP and AVIF; `optimize-images.js` auto-converts.
10. **Live2D models** — `public/pio/` contains Live2D model data (moc/mtn/textures) which is large. Be mindful of build output size when modifying.
11. **Albums are filesystem-driven** — Adding/removing albums means adding/removing folders under `public/images/albums/`; hidden album names must follow the configured prefix convention or they will appear publicly and in the sitemap.
12. **`trailingSlash: "always"`** — All routes end with `/`; pagination pages (`/2/`, `/3/`) are homepage variants and must be handled by path helpers (e.g. `isHomeOrPaginatedHome()`), not exact `/` checks.

## Dependency Update Strategy

- **Dependabot**: `.github/dependabot.yml` — monthly checks, groups patch + minor updates into grouped PRs; major versions are ignored and require manual evaluation
- **Upgrade tool**: `pnpm brightmoon-upgrade` provides interactive framework upgrade with:
  - SHA256 hash verification for download integrity
  - Full project backup before upgrade
  - Protected files (never overwritten): `src/config/user/**`, `src/content/**`, `src/assets/images/**`, `public/assets/` user dirs (anime / css / desktop-banner / font / home / mobile-banner), `public/favicon/**`, `public/images/**`, `public/pio/**`, `.env`, `.vscode/**`, `.npmrc` — list maintained in `src/config/defaults/upgrade.ts`
  - Rollback prevention detection
