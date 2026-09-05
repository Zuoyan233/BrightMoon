# AGENTS.md — BrightMoon Project Guide

## Project Overview

BrightMoon is a feature-rich static blog site built on **Astro + Svelte + Tailwind CSS** (versions from `package.json` → `dependencies`: `astro`, `svelte`, `tailwindcss`), derived from the Fuwari template with deep customization. Project version is defined in `package.json` → `version` field. Licensed under Apache 2.0.

Core features:
- **Static site generation** (optional Cloudflare Workers adapter)
- **14-language i18n** (en / zh_CN / zh_TW / ja / ko / es / th / vi / tr / id / ar / de / fr / ru)
- **Post encryption** (AES, client-side decryption via crypto-es)
- **Anime tracking** (local data + Bangumi/Bilibili API sync)
- **Pagefind full-text search**
- **Swup page transition animations**
- **RSS / Atom / Sitemap / OG image generation**
- **Live2D mascot (Pio)**
- **Music player / Weather widget / Calendar / Timeline / Albums**
- **Cookie consent / External link confirmation / Third-party analytics (GTM, Clarity, Umami)**
- **IndexNow SEO submission**
- **Interactive framework upgrade tool** (SHA256 verification, backup, protected file skipping)

## Build & Test Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` / `pnpm start` | Start dev server |
| `pnpm build` | Full build (update-anime → astro build → pagefind → optimize-images → compress-fonts) |
| `pnpm check` | Astro type checking |
| `pnpm type-check` | TypeScript strict check (`tsc --noEmit --isolatedDeclarations`) |
| `pnpm lint` | Biome lint + auto-fix |
| `pnpm format` | Biome format |
| `pnpm preview` | Preview build output |
| `pnpm new-post -- <filename>` | Create a new post (auto-generates frontmatter) |
| `pnpm update-anime` | Update anime data |
| `pnpm update-bangumi` | Sync data from Bangumi API |
| `pnpm update-bilibili` | Sync data from Bilibili API |
| `pnpm optimize-images` | Image optimization (WebP conversion) |
| `pnpm compress-fonts` | Font subsetting & compression |
| `pnpm submit` | IndexNow search engine submission |
| `pnpm brightmoon-upgrade` | Interactive framework upgrade |

**Package manager: pnpm** (version pinned in `package.json` → `packageManager` field). npm/yarn are forbidden (enforced by `preinstall` script).

### CI Pipeline

GitHub Actions (`.github/workflows/CI.yml`) runs on the `master` branch:
1. **Astro Check** — `pnpm astro check`
2. **Astro Build** — `pnpm astro build` (sets `ENABLE_CONTENT_SYNC=false` to skip external API calls)

Dependencies are installed with `pnpm install --frozen-lockfile`.

## Project Structure

```
src/
├── config/          # Site config (defaults.ts framework-maintained / user.ts user overrides / index.ts deep merge)
├── content/
│   ├── posts/       # Blog posts (Markdown with frontmatter)
│   └── spec/        # Special pages (about / feedback / friends / sponsors)
├── components/      # Astro + Svelte components
│   ├── comment/     # Comment system (Twikoo)
│   ├── control/     # Interactive controls (pagination, back-to-top, floating TOC)
│   ├── widget/      # Sidebar widgets (weather, calendar, tags, categories, music, mascot, etc.)
│   ├── misc/        # General components (icons, image wrapper, license, share poster)
│   └── skills/      # Skills chart
├── layouts/         # Page layouts (Layout.astro / MainGridLayout.astro)
├── pages/           # Route pages + API endpoints
│   ├── api/         # JSON API (calendar data)
│   ├── og/          # OG image generation
│   ├── posts/       # Post dynamic routes
│   └── albums/      # Album dynamic routes
├── plugins/         # rehype/remark plugins + expressive-code plugins
├── scripts/         # Client-side JS (theme init, layout, banner, etc.)
├── styles/          # CSS / Stylus stylesheets
├── utils/           # Utility functions
├── i18n/            # Internationalization (language files + translation system)
├── data/            # Static data (anime, friends, projects, skills, timeline, etc.)
├── types/           # TypeScript type definitions
├── content.config.ts # Content collection Zod schema definitions
└── env.d.ts         # Environment variable type declarations

scripts/              # Build/tool scripts
public/               # Static assets (images, fonts, JS, Live2D models, etc.)
```

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

### File-Type Specific Rules

- **`.astro` / `.svelte` / `.vue`**: Relaxed `useConst`, `useImportType`, `noUnusedVariables`, `noUnusedImports` (unavoidable in framework-generated code)
- **`.d.ts`**: Relaxed `noUnusedVariables`
- **`.css`**: Allows `formatWithErrors`, disables `noUnknownAtRules` (Tailwind directives)

### CSS

- Tailwind CSS (version from `package.json` → `tailwindcss`) + `@tailwindcss/typography`
- PostCSS nesting + import
- Stylus for partial styles (`.styl`)
- Biome CSS parser with `tailwindDirectives: true`

### Component Conventions

- Page-level components use `.astro`
- Components requiring client-side interactivity use `.svelte` (Svelte, version from `package.json` → `svelte`, runes syntax)
- Path aliases: `@/` → `src/`, `@components/`, `@i18n/`, `@utils/`, etc.

### Configuration Pattern

- **Defaults**: `src/config/defaults.ts` (overwritten on upgrade — do not edit manually)
- **User overrides**: `src/config/user.ts` (protected during upgrade, all fields optional)
- **Merge entry**: `src/config/index.ts` (deep merge, business code imports from here)
- **Type definitions**: `src/types/config.ts`

## Content Authoring

### Post Frontmatter Schema

Posts live in `src/content/posts/` and support nested directories. Frontmatter fields:

```yaml
title: string          # Required
published: date        # Required
updated: date          # Optional
draft: boolean         # Default false
description: string    # Default ""
image: string          # Cover image path, default ""
tags: string[]         # Default []
category: string       # Default ""
lang: string           # Default ""
pinned: boolean        # Pin to top, default false
priority: number       # Pin sort priority (lower = higher priority)
comment: boolean       # Default true
author: string
sourceLink: string
licenseName: string
licenseUrl: string
encrypted: boolean     # Encrypted post, default false
password: string       # Encryption password (build-time only, not exposed as plaintext to frontend)
passwordHint: string   # Password hint
alias: string          # URL alias
permalink: string      # Custom permalink (takes precedence over alias)
```

### Creating a New Post

```bash
pnpm new-post -- my-new-post
```

### Encrypted Posts

Set `encrypted: true` and `password: "your-password"` in frontmatter. Content is AES-encrypted at build time and decrypted client-side by user input. **The password is embedded in encrypted form in the page** — security depends on password strength. Not suitable for protecting highly sensitive content.

## Environment Variables

Copy `.env.example` to `.env`:

| Variable | Purpose |
|----------|---------|
| `UMAMI_API_KEY` | Umami analytics API key |
| `INDEXNOW_KEY` | IndexNow SEO submission key |
| `INDEXNOW_HOST` | Site domain |
| `CF_WORKERS` | Set to any value to enable Cloudflare Workers adapter |

**`.env` and `.env.production` are in `.gitignore` — never commit them.**

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
1. `node scripts/update-anime.mjs` — Sync anime data
2. `astro build` — Astro static site build
3. `pagefind --site dist` — Generate search index
4. `node scripts/optimize-images.js --dist` — Optimize output images
5. `node scripts/compress-fonts.js` — Font subsetting

## Commit Conventions

The project does not enforce a commit message format, but the PR template requires categorization:

- **Bug fix**: Non-breaking change that fixes an issue
- **New feature**: Non-breaking change that adds functionality
- **Breaking change**: Change that causes existing functionality to break

PR Checklist:
- [ ] Read the CONTRIBUTING document
- [ ] Confirm PR is not for personal config changes
- [ ] Self-reviewed code
- [ ] Changes generate no new warnings

## Security Notes & Pitfalls

### Must Follow

1. **Never commit `.env` files** — They contain API keys (UMAMI_API_KEY, INDEXNOW_KEY). `.gitignore` excludes them, but double-check.
2. **Never hardcode secrets in frontend code** — All sensitive config is injected via environment variables; type declarations are in `src/env.d.ts`.
3. **Encrypted post passwords are not truly secure** — AES encryption happens at build time; ciphertext is embedded in HTML. Anyone viewing source can attempt brute-force. Only suitable for low-sensitivity content protection — **do not use for truly confidential information**.
4. **sanitize-html** — The project uses `sanitize-html` to process user-input HTML (e.g., comments). Never bypass this sanitization step.
5. **CORS configuration** — `public/_headers` sets `Access-Control-Allow-Origin: *` for RSS/Atom endpoints. Be mindful of security implications when modifying.

### Common Pitfalls

1. **Edits to `defaults.ts` are lost on upgrade** — All user config must go in `user.ts`; `defaults.ts` is framework-maintained.
2. **`content/` directory is gitignored** — When using the independent content repo mode, `/content/` is excluded. Ensure content is in the correct location.
3. **`src/data/myself.ts` and `src/pages/myself.astro` are gitignored** — Personal pages are protected; upgrades won't overwrite them.
4. **`src/data/bangumi-data.json` and `src/data/bilibili-data.json` are gitignored** — API-synced data is not version-controlled.
5. **Build-time external API calls** — `update-anime`, `update-bangumi`, `update-bilibili` scripts call external APIs. CI skips them via `ENABLE_CONTENT_SYNC=false`. Local builds may fail without network or if APIs are rate-limited.
6. **pnpm strict lockfile** — Must use `pnpm install --frozen-lockfile`; `npm` and `yarn` are not accepted.
7. **Dependabot ignores major version updates** — Config only auto-merges patch and minor updates; major versions require manual handling.
8. **Swup and anchor navigation** — Swup is configured with `skipPopStateHandling` to skip anchor links. When modifying Swup config, be careful not to break anchor jump behavior.
9. **Image format** — The project heavily uses WebP; `optimize-images.js` auto-converts. Prefer WebP when adding new images.
10. **Live2D models** — `public/pio/` contains Live2D model data (moc/mtn/textures) which is large. Be mindful of build output size when modifying.

## Dependency Update Strategy

- **Dependabot**: Monthly checks, only auto-creates PRs for patch + minor updates; major versions require manual evaluation
- **Upgrade tool**: `pnpm brightmoon-upgrade` provides interactive framework upgrade with:
  - SHA256 hash verification for download integrity
  - Full project backup before upgrade
  - Automatic skipping of protected files (`user.ts`, `myself.ts`, etc.)
  - Rollback prevention detection