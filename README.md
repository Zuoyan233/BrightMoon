# BrightMoon

<img align='right' src='./project-preview/images/logo.webp' width='200px' alt="BrightMoon logo">

BrightMoon is a unique anime-aesthetic static blog template blending modern simplicity with elegant refinement. Built on [Astro](https://astro.build/), it unites advanced functionality with exquisite visuals.

**_Like the bright moon rising, its clear radiance remains as ever._** <br>
**_Taking this as a starting point, set forth anew._**

[![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)](https://nodejs.org/)
[![pnpm >= 11](https://img.shields.io/badge/pnpm-%3E%3D11-blue)](https://pnpm.io/)
[![Astro](https://img.shields.io/badge/Astro-7.1.6-orange)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)](https://www.typescriptlang.org/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?logo=apache)](https://opensource.org/licenses/Apache-2.0)

💻 Welcome to my website: [Click here](https://www.zuoyanblogs.xyz/)

🌐 README Languages：[简体中文](./README_zh_CN.md) &nbsp;|&nbsp; [繁體中文](./README_zh_Hant.md) &nbsp;|&nbsp; [日本語](./README_jp.md)

![BrightMoon preview](./project-preview/images/project-preview.webp)

<table>
  <tr>
    <td><img alt="" src="project-preview/images/project-preview 2.webp"></td>
    <td><img alt="" src="project-preview/images/project-preview 3.webp"></td>
    <td><img alt="" src="project-preview/images/project-preview 4.webp"></td>
  <tr>
  <tr>
    <td><img alt="" src="project-preview/images/project-preview 5.webp"></td>
    <td><img alt="" src="project-preview/images/project-preview 6.webp"></td>
    <td><img alt="" src="project-preview/images/project-preview 7.webp"></td>
  <tr>
  <tr>
    <td><img alt="" src="project-preview/images/project-preview 8.webp"></td>
    <td><img alt="" src="project-preview/images/project-preview 9.webp"></td>
    <td><img alt="" src="project-preview/images/project-preview 10.webp"></td>
  <tr>
</table>

---

## 📌 Version Notes

This project is a customized extension based on Mizuki V8.2, with version numbers suffixed with BrightMoon Custom Edition (CE), representing a light custom version of BrightMoon (currently cramming popular web frameworks — will continue when I have more time).

---

## ✨ Features

### 🔧 Component Configuration System Refactor

- **Configuration Architecture:** Split into three layers: `src/config/defaults.ts` (upstream defaults, auto-updated on upgrade), `src/config/user.ts` (user configuration, protected on upgrade), and `src/config/index.ts` (merge entry). Edit only `src/config/user.ts`.
- **Responsive Layout Adaptation:** Components support responsive layouts that automatically adjust based on device type.

### 📐 Layout System Optimization

- **Dynamic Sidebar Positioning:** Supports left/right sidebar switching with automatic layout adaptation.
- **Smart TOC Positioning:** When the sidebar is on the right, the table of contents automatically moves to the left for a better reading experience.
- **Grid Layout Improvements:** Optimized CSS Grid layout to resolve container width anomalies.
- **Responsive TOC:** Table of contents supports responsive device configuration with automatic optimization on mobile.

### 🎛️ Configuration File Standardization

- **Standardized Config Format:** Established a unified component configuration file format specification.
- **Type Safety:** Comprehensive TypeScript type definitions ensuring type-safe configuration.
- **Extensibility:** Supports custom component types and configuration options.

### 🧹 Code Optimization

- **Test File Cleanup:** Removed unused test configurations and dependencies, reducing project size.
- **Code Structure Optimization:** Improved component architecture for better maintainability.
- **Performance Enhancement:** Optimized component loading logic for improved page rendering performance.
- **Component Animation Optimization:** Optimized animations for several widgets for smoother interactions.

### 🎨 Design & Interface

- **Framework** - Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).
- **Animations** - Smooth animations and page transitions powered by [Swup](https://swup.js.org/).
- **Multi-Theme Mode** - Supports Light, Dark, and "System" themes, switchable via dropdown.
- **Breadcrumb Navigation** - Provides clear navigation paths, making it easy for users to navigate back.
- **External Link Confirmation** - Confirmation dialog when clicking external links for enhanced browsing security.
- **Personalized Appearance Control** - Toggle wallpaper mode, cherry blossom effects, article list layout, navbar style, and more.
  - Customizable theme colors and dynamic banner carousel.
  - Full-screen background images with carousel, transparency, and blur effects.
  - Fully responsive design across all devices.
  - Beautiful typography with JetBrains Mono font.
  - Optimized calendar styling: improved navigation icons, post dot positioning, and multi-post day indicators.
- **Custom Scrollbar** - Customized scrollbar styling for visual consistency.

### 🔍 Content & Search

- Advanced search powered by [Pagefind](https://pagefind.app/).
- [Enhanced Markdown](https://docs.mizuki.mysqil.com/press/Markdown/Markdown/) with syntax highlighting.
- Interactive table of contents with auto-scroll.
- RSS and Atom feed generation.
- Reading time estimation.
- Article categories and tags.

### 📱 Special Pages

- **Anime Page** - Track anime viewing progress and ratings.
- **Friends Page** - Elegant cards displaying friends' websites.
- **Album Page** - Capture beautiful moments in life.
- **Devices Page** - Showcase your device collection.
- **Diary Page** - Share life moments like social media.
- **Archive Page** - Organized article timeline view.
- **About Page** - Customizable personal introduction.
- **Sponsor Page** - Support the site owner with integrated payment QR code support.
- **Feedback Page** - Submit suggestions and contact the site owner directly (email & friend QR code).
- **Projects Page** - Development project portfolio.
- **Skills Page** - Technical skills and expertise.
- **Timeline Page** - Growth journey and key milestones.

### 🛠 Technical Features

- **Enhanced Code Blocks** - Powered by [Expressive Code](https://expressive-code.com/).
- **Math Formula Support** - KaTeX rendering.
- **Image Optimization** - PhotoSwipe gallery integration.
- **SEO Optimization** - Includes sitemaps and meta tags.
- **Performance Optimization** - Lazy loading and caching mechanisms.
- **Comment System** - Integrated with the latest Twikoo comment system, supporting multi-dimensional configuration.
- **Translation Component** - Local i18n library + translate.js for millisecond-speed translations, with built-in language support for fourteen countries.
- **Weather Widget** - Powered by WeatherAPI, supporting 7-day forecasts, IP-based auto-location, and manual city search.
- **Cookie Consent** - Cookie privacy policy banner with accept/deny support; auto-clears non-essential cookies on denial.
- **Site Statistics** - Real-time display of current date (with multi-region format support), season, and time period.
- **Framework Update Checker** - Automatically detects new BrightMoon releases via remote repository API, supports stable and pre-release detection, with prompt dialogs for updates.
- **Framework Upgrade Tool** - Supports both online and local upgrades, with automatic backup creation and rollback prevention before updating, and automatic dependency installation and temporary file cleanup after upgrading; supports manual backup creation and project restoration from backups.

---

## ⚡ How to run this project?

1. **Install Node.js:** This project requires Node.js 22 or higher.

2. **Install Git:** This project uses Git for version control, ensure it is installed and configured.

3. **Clone the repository:**

   ```bash
   git clone https://github.com/Zuoyan233/BrightMoon.git
   cd BrightMoon
   ```

4. **Install dependencies:**

   ```bash
   # Install pnpm if not already installed
   npm install -g pnpm

   # Install project dependencies
   pnpm install
   ```

5. **Configure the blog:**

- Edit `src/config/user.ts` to customize blog settings.
- Update site information, theme colors, banner images, and social links.
- Configure special page features.

6. **Special page configuration:**

- **Anime Page:** Edit the anime list in `src/pages/anime.astro`.
- **Friends Page:** Edit friend data in `src/content/spec/friends.md`.
- **Album Page:** Edit album info in `public/images/albums`. See the [album guide](./public/images/albums/README.md) for usage instructions.
- **Devices Page:** Edit device info in `src/data/devices.ts`.
- **Diary Page:** Edit posts in `src/data/diary.ts`.
- **About Page:** Edit content in `src/content/spec/about.md`.
- **Sponsor Page:** Edit content in `src/content/spec/sponsors.md`.
  - Configure payment QR codes via `addpaymentConfig` in `src/config/user.ts`. QR code images go in `public/images/sponsors`.
- **Feedback Page:** Edit content in `src/content/spec/feedback.md`.
  - Configure the site owner's email via `contactEmailConfig` in `src/config/user.ts`.
  - Configure friend QR codes via `addfriendConfig` in `src/config/user.ts`. QR code images go in `public/images/contact`.
- **Projects Page:** Edit content in `src/data/projects.ts`.
- **Skills Page:** Edit content in `src/data/skills.ts`.
- **Timeline Page:** Edit content in `src/data/timeline.ts`.

7. **Article management:**

- **Create a new post:** `pnpm new-post <filename>`.
- **Edit posts:** Modify files in `src/content/posts/`.
- **Custom pages:** Edit special pages in `src/content/spec/`.
- **Add images:** Place images in `src/assets/` or `public/`.
- **Extended Markdown:** See [Mizuki Docs - Markdown Customization](https://docs.mizuki.mysqil.com/press/Markdown/customize/) for details.

Frontmatter fields:

- **title**: Post title (required)
- **published**: Publication date (required)
- **description**: Post description for SEO and preview
- **image**: Cover image path (relative to the post file)
- **tags**: Array of tags for categorization
- **category**: Post category
- **encrypted**: Set to `true` to encrypt the post (requires `src/config/user.ts` to be enabled first)
- **password**: Password for the post
- **passwordHint**: Password hint for the post
- **draft**: Set to `true` to hide the post in production
- **comment**: Set to `true` or `false` to control comments for this post (requires Twikoo to be enabled in `src/config/user.ts` first)
- **pinned**: Set to `true` to pin the post to the top
- **lang**: Post language (only set when different from the site default)

8. **Start the development server:**

   ```bash
   pnpm dev
   ```

   The blog will be available at `http://localhost:4321`.

9. **Upgrade the BrightMoon blog framework (optional):**

   When a new version is released, use the built-in upgrade tool:

   ```bash
   pnpm brightmoon-upgrade
   ```

   The upgrade tool provides two upgrade methods and two backup features:
   - **Online upgrade** - Automatically downloads the latest Release from the remote repository and completes the upgrade. Supports selecting stable or pre-release versions.
   - **Local upgrade** - Place the downloaded `.zip` archive in the `update` folder in the project root. The tool will extract it automatically and complete the upgrade.
   - **Create Backup** - Manually create a full project backup, saved to the `backup` directory.
   - **Restore Backup** - Select a backup file from the `backup` directory to restore the project.

   Before upgrading, a backup is automatically created and rollback is prevented. After upgrading, `pnpm install` is automatically run to install new dependencies and clean up temporary files. User configuration in `src/config/user.ts` are protected during upgrades — no manual migration needed. Upstream default values in `src/config/defaults.ts` are updated automatically.

10. **All commands are run from the project root:**

| Command                    | Action                                         |
| :------------------------- | :--------------------------------------------- |
| `pnpm install`             | Install dependencies                           |
| `pnpm dev`                 | Start local dev server at `localhost:4321`     |
| `pnpm build`               | Build production site to `./dist/`             |
| `pnpm preview`             | Preview the build locally before deployment    |
| `pnpm brightmoon-upgrade`  | Run the BrightMoon blog framework upgrade tool |
| `pnpm check`               | Run Astro error checks                         |
| `pnpm format`              | Format code using Biome                        |
| `pnpm lint`                | Check and fix code issues                      |
| `pnpm new-post <filename>` | Create a new blog post                         |
| `pnpm astro ...`           | Run Astro CLI commands                         |

---

## 🙏 Acknowledgements

- [Mizuki](https://github.com/matsuzaka-yuki/Mizuki) - An enhanced secondary development version based on Fuwari. Thanks for providing a modern, feature-rich static blog template.
- [Fuwari](https://github.com/saicaca/fuwari) by saicaca - The original template this project is based on. Thank you for creating such a beautiful and powerful template.
- [Yukina](https://github.com/WhitePaper233/yukina) - Thank you for the design inspiration and creativity that helped shape this project. Yukina is an elegant blog template showcasing excellent design principles and user experience.
- [Firefly](https://github.com/CuteLeaf/Firefly) - Thank you for the excellent layout design ideas, including dual sidebar layout, dual-column article grid, and the design of certain widgets.
- [Twilight](https://github.com/spr-aachen/Twilight) - Thank you for the inspiration and technical support. Twilight's dynamic wallpaper mode switching, responsive design, and transition effects have significantly enhanced this project.

---

⭐ If you have any questions or suggestions, please submit an [Issue](https://github.com/Zuoyan233/BrightMoon/issues) or [Pull Request](https://github.com/Zuoyan233/BrightMoon/pulls). You can also reach out via [my website's feedback page](https://www.zuoyanblogs.xyz/feedback/). If you find this project helpful, please consider giving it a star!