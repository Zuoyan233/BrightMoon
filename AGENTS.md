# AGENTS.md — BrightMoon Project Guide

## Project Overview

BrightMoon is a feature-rich static blog site built on Astro + Svelte + Tailwind CSS (versions from package.json → dependencies: astro, svelte, tailwindcss), derived from the Fuwari template with deep customization. Project version is defined in package.json → version field. Licensed under Apache 2.0.

Core features:
- **Static site generation** (optional Cloudflare Workers adapter via `CF_WORKERS=1`)
- **8-language i18n** (en / zh_CN / zh_TW / ja / ko / fr / de / ru)
- **Post encryption** (AES, client-side decryption via crypto-es)
- **Anime tracking** (local data + Bangumi/Bilibili API sync)
- **Pagefind full-text search**
- **Swup page transition animations**
- **RSS / Atom / Sitemap / OG image generation**
- **Live2D mascot (Pio)**
- **Music player / Weather widget / Calendar / Timeline / Albums** (feature pages toggleable via `siteConfig.featurePages`)
- **Cookie consent / External link confirmation / Third-party analytics (GTM, Microsoft Clarity, Umami)**
- **IndexNow SEO submission**
- **Interactive framework upgrade tool** (SHA256 verification, backup, protected file skipping)

## Build & Test Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Full build (update-anime → astro build → pagefind → optimize-images → compress-fonts) |
| `pnpm check` | Astro type checking |
| `pnpm lint` | Biome lint + auto-fix |
| `pnpm preview` | Preview build output |
| `pnpm new-post -- <filename>` | Create a new post (auto-generates frontmatter) |
| `pnpm update-anime` | Update anime data |
| `pnpm update-bangumi` | Sync data from Bangumi API |
| `pnpm update-bilibili` | Sync data from Bilibili API |
| `pnpm optimize-images` | Image optimization |
| `pnpm compress-fonts` | Font subsetting & compression |
| `pnpm brightmoon-upgrade` | Interactive framework upgrade |

**Package manager: pnpm** (version pinned in `package.json` → `packageManager` field). npm/yarn are forbidden (enforced by `preinstall` script).

### CI Pipeline

GitHub Actions (`.github/workflows/CI.yml`) runs on the `master` branch with two jobs:
1. **Astro Check** — `pnpm astro check`
2. **Astro Build** — `pnpm astro build` (sets `ENABLE_CONTENT_SYNC=false` to skip external API calls)

Dependencies are installed with `pnpm install --frozen-lockfile`.

## Project Structure

```
src/
├── config/          # Site config (defaults/ framework-maintained / user/ user overrides / index.ts deep merge)
│   ├── defaults/    # Default config values (overwritten on upgrade)
│   ├── user/        # User config overrides (protected during upgrade)
│   └── index.ts     # Deep merge entry point
├── content/
│   ├── posts/       # Blog posts (Markdown with frontmatter)
│   └── spec/        # Special pages (about / feedback / friends / sponsors)
├── components/      # Astro + Svelte components
│   ├── comment/     # Comment system (Twikoo)
│   ├── control/     # Interactive controls (pagination, back-to-top, floating TOC)
│   ├── layout/      # Layout components (RightSideBar)
│   ├── misc/        # General components (icons, image wrapper, license, share poster, etc.)
│   ├── skills/      # Skills chart
│   └── widget/      # Sidebar widgets (weather, calendar, tags, categories, music, mascot, etc.)
├── layouts/         # Page layouts (Layout.astro / MainGridLayout.astro)
├── pages/           # Route pages + API endpoints
│   ├── albums/      # Album dynamic routes
│   ├── anime/       # Anime tracking page
│   ├── api/         # JSON API (calendar data)
│   ├── diary/       # Diary page
│   ├── og/          # OG image generation
│   └── posts/       # Post dynamic routes
├── plugins/         # rehype/remark plugins + expressive-code plugins
├── scripts/         # Client-side JS (theme init, layout, banner, etc.)
├── styles/          # CSS / Stylus stylesheets
├── utils/           # Utility functions
├── i18n/            # Internationalization (language files + translation system)
├── data/            # Static data (anime, devices, diary, friends, projects, skills, timeline)
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
  - `noUnusedTemplateLiteral: error`
  - `useNumberNamespace: error`

### File-Type Specific Rules

- **`.astro` / `.svelte`**: Relaxed `useConst`, `useImportType`, `noUnusedVariables`, `noUnusedImports` (unavoidable in framework-generated code)
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
- Path aliases: `@/` → `src/`, `@components/` → `src/components/`, `@i18n/` → `src/i18n/`, `@utils/` → `src/utils/`, `@assets/` → `src/assets/`, `@constants/` → `src/constants/`, `@layouts/` → `src/layouts/`

### Configuration Pattern

- **Defaults**: `src/config/defaults/` (overwritten on upgrade — do not edit manually)
- **User overrides**: `src/config/user/` (protected during upgrade, all fields optional)
- **Merge entry**: `src/config/index.ts` (deep merge, business code imports from here)
- **Type definitions**: `src/types/config.ts`

## Content Authoring

### Post Frontmatter Schema

Posts live in `src/content/posts/` and support nested directories. Frontmatter fields:

```yaml
title: string          # Required
published: date        # Required
draft: boolean         # Default false
description: string    # Default ""
image: string          # Cover image path, default ""
tags: string[]         # Default []
category: string       # Default ""
lang: string           # Default ""
pinned: boolean        # Pin to top, default false
comment: boolean       # Default true
encrypted: boolean     # Encrypted post, default false
password: string       # Encryption password (build-time only, not exposed as plaintext to frontend)
passwordHint: string   # Password hint, default ""
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
| `UMAMI_API_KEY` | Umami analytics API key (used in `src/env.d.ts`) |
| `INDEXNOW_KEY` | IndexNow SEO submission key |
| `INDEXNOW_HOST` | Site domain for IndexNow |
| `CF_WORKERS` | Set to any value to enable Cloudflare Workers adapter |

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
2. `astro build` — Astro static site build
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

1. **Never commit `.env` files** — They contain API keys (UMAMI_API_KEY, INDEXNOW_KEY). `.gitignore` excludes them, but double-check.
2. **Never hardcode secrets in frontend code** — All sensitive config is injected via environment variables; type declarations are in `src/env.d.ts`.
3. **Encrypted post passwords are not truly secure** — AES encryption happens at build time; ciphertext is embedded in HTML. Anyone viewing source can attempt brute-force. Only suitable for low-sensitivity content protection — **do not use for truly confidential information**.
4. **sanitize-html** — The project uses `sanitize-html` to process user-input HTML (e.g., comments). Never bypass this sanitization step.
5. **CORS configuration** — `public/_headers` sets `Access-Control-Allow-Origin: *` for RSS/Atom endpoints. Be mindful of security implications when modifying.

### Common Pitfalls

1. **Edits to `src/config/defaults/` are lost on upgrade** — All user config must go in `src/config/user/`; `defaults/` is framework-maintained.
2. **`content/` directory is gitignored** — When using the independent content repo mode, `/content/` is excluded. Ensure content is in the correct location.
3. **`src/data/devices.ts` is user data** — Device list page data, protected during upgrade.
4. **`src/data/bangumi-data.json` and `src/data/bilibili-data.json` are gitignored** — API-synced data is not version-controlled.
5. **Build-time external API calls** — `update-anime`, `update-bangumi`, `update-bilibili` scripts call external APIs. CI skips them via `ENABLE_CONTENT_SYNC=false`. Local builds may fail without network or if APIs are rate-limited.
6. **pnpm strict lockfile** — Must use `pnpm install --frozen-lockfile`; `npm` and `yarn` are not accepted.
7. **Dependabot ignores major version updates** — `.github/dependabot.yml` groups patch and minor updates; major versions are ignored and require manual handling.
8. **Swup and anchor navigation** — Swup is configured with `skipPopStateHandling` to skip anchor links. When modifying Swup config, be careful not to break anchor jump behavior.
9. **Image format** — The project heavily uses WebP and AVIF; `optimize-images.js` auto-converts.
10. **Live2D models** — `public/pio/` contains Live2D model data (moc/mtn/textures) which is large. Be mindful of build output size when modifying.

## Dependency Update Strategy

- **Dependabot**: `.github/dependabot.yml` — monthly checks, groups patch + minor updates into grouped PRs; major versions are ignored and require manual evaluation
- **Upgrade tool**: `pnpm brightmoon-upgrade` provides interactive framework upgrade with:
  - SHA256 hash verification for download integrity
  - Full project backup before upgrade
  - Automatic skipping of protected files (`src/config/user/`, `src/content/`, `src/data/`, `public/assets/`, `.env`, etc.)
  - Rollback prevention detection