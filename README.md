# BrightMoon
<img align='right' src='./example project show/images/logo.webp' width='200px' alt="BrightMoon logo">

BrightMoon is a unique anime-aesthetic static blog template blending modern simplicity with elegant refinement. Built on [Astro](https://astro.build/), it unites advanced functionality with exquisite visuals.

***Like the bright moon rising, its clear radiance remains as ever.*** </br>
***Taking this as a starting point, set forth anew.***

[![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)](https://nodejs.org/)
[![pnpm >= 11](https://img.shields.io/badge/pnpm-%3E%3D11-blue)](https://pnpm.io/)
[![Astro](https://img.shields.io/badge/Astro-6.3.1-orange)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)](https://www.typescriptlang.org/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?logo=apache)](https://opensource.org/licenses/Apache-2.0)

💻 Visit my website: [Click to enter](https://www.zuoyanblogs.xyz/)

🌐 README Language: [繁體中文](./README.zh_Hant.md) &nbsp; [简体中文](./README.zh_CN.md) &nbsp; [日本語](./README.jp.md)

![BrightMoon preview](./example%20project%20show/images/example%20project%20show.webp)

<table>
  <tr>
    <td><img alt="" src="example project show/images/example project show 2.webp"></td>
    <td><img alt="" src="example project show/images/example project show 3.webp"></td>
    <td><img alt="" src="example project show/images/example project show 4.webp"></td>
  <tr>
  <tr>
    <td><img alt="" src="example project show/images/example project show 5.webp"></td>
    <td><img alt="" src="example project show/images/example project show 6.webp"></td>
    <td><img alt="" src="example project show/images/example project show 7.webp"></td>
  <tr>
  <tr>
    <td><img alt="" src="example project show/images/example project show 8.webp"></td>
    <td><img alt="" src="example project show/images/example project show 9.webp"></td>
    <td><img alt="" src="example project show/images/example project show 10.webp"></td>
  <tr>
</table>

---

## 🔄 Update Frequency

Asynchronously synchronizes with the mainline content of the Mizuki theme framework on an irregular basis. Future plans include custom modifications built upon the framework's functionality. Version numbers will uniformly use the BrightMoon Custom Edition (CE) suffix, indicating a lightly customized version for BrightMoon (Currently busy catching up on popular web frameworks — need to find time, wuwuwu~~~).

---

## 🛠 Modified Content in This Project

- Added site language texts for ten languages; future site updates will be accompanied by synchronized language text updates.
- Added multi-language international translation component:
  - Modified `mobile-navbar` stylesheet to adapt the translate panel styles.
- Modified calendar styles to achieve the most comfortable appearance:
  - Changed left/right switch icons.
  - Adjusted the position of the small dot at the bottom indicating post publication.
  - Adjusted the number size for multiple posts published on the same day (top right corner).
- Added a feedback page and integrated methods to contact the site owner.
- Added a sponsors page and integrated paths for placing payment QR codes.
- Added real-time date, season, and time for site statistics, with date and season display supporting multiple regional formats and time supporting time-period representation.
- Added external link confirmation popup, and modified some styles.
- Add custom styles for the page scrollbar.
- Refactor personalization settings, add wallpaper mode and cherry blossom effect UI controls.
- Integrate bangumi and bilibili settings under the anime configuration section.
- Updated and adapted to the latest version of the Twikoo comment system.
- TOC directory supports responsive device configuration.
- Refactored hidden photo album logic, fixed issue where it couldn't be accessed via link.
- Optimized animations for some small components.

---

## ✨ Features

To learn more about Mizuki's features: [Enter Mizuki Docs Official Website](https://docs.mizuki.mysqil.com/)

### 🔧 Component Configuration System Refactoring

- **Unified Configuration Architecture:** A brand new modular component configuration system, supporting dynamic component management and order configuration.
- **Configuration-Driven Component Loading:** Refactored the SideBar component to achieve a fully configuration-based component loading mechanism.
- **Unified Control Switch:** Removed independent enable switches for the music player and announcement components, unified control by `sidebarLayoutConfig`.
- **Responsive Layout Adaptation:** Components support responsive layout, automatically adjusting display based on device type.

### 📐 Layout System Optimization

- **Dynamic Sidebar Position:** Supports switching between left and right sidebars, layout automatically adapts.
- **Intelligent Table of Contents Positioning:** When the sidebar is on the right, the article navigation automatically moves to the left for a better reading experience.
- **Grid Layout Improvement:** Optimized CSS Grid layout to resolve container width anomalies.

### 🎛️ Configuration File Format Standardization

- **Standardized Configuration Format:** Created a unified specification for component configuration file formats.
- **Type Safety:** Comprehensive TypeScript type definitions ensure type safety of configurations.
- **Extensibility:** Supports custom component types and configuration options.

### 🧹 Code Optimization

- **Test File Cleanup:** Removed unused test configurations and dependencies, reducing project size.
- **Code Structure Optimization:** Improved component architecture, enhancing code maintainability.
- **Performance Improvement:** Optimized component loading logic, improving page rendering performance.

### 🎨 Design & Interface

- Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).
- Smooth animations and page transitions using [Swup](https://swup.js.org/).
- Light/Dark theme switching with system preference detection.
- Customizable theme colors and dynamic banner carousel.
- Full-screen background images with support for carousel, transparency, and blur effects.
- Fully responsive design for all devices.
- Beautiful typography using the JetBrains Mono font.

### 🔍 Content & Search

- Advanced search functionality based on [Pagefind](https://pagefind.app/).
- [Enhanced Markdown features](https://docs.mizuki.mysqil.com/press/Markdown/Markdown/) with syntax highlighting.
- Interactive table of contents with auto-scrolling.
- RSS and Atom feed generation.
- Reading time estimation.
- Article categorization and tagging system.

### 📱 Featured Pages

- **Anime Page** - Track anime viewing progress and ratings.
- **Friends Page** - Beautiful cards displaying friends' websites.
- **Albums Page** - Capture beautiful moments in life.
- **My Devices Page** - Display device information.
- **Diary Page** - Share life moments, similar to social media.
- **Archive Page** - Ordered chronological view of articles.
- **About Page** - Customizable personal introduction.
- **Sponsors Page** - Support quality content creation by sponsoring the site owner.
- **Feedback Page** - Submit website suggestions and communicate directly with the site owner.
- **Projects Page** - Portfolio of development projects.
- **Skills Page** - Technical skills and expertise.
- **Timeline Page** - Growth journey and important milestones.

### 🛠 Technical Features

- **Enhanced Code Blocks** - Based on [Expressive Code](https://expressive-code.com/).
- **Mathematical Formula Support** - KaTeX rendering.
- **Image Optimization** - PhotoSwipe gallery integration.
- **SEO Optimization** - Includes sitemaps and meta tags.
- **Performance Optimization** - Lazy loading and caching mechanisms.
- **Comment System** - Supports Twikoo integration.
- **Translation Component** - Utilizes local i18n language library + translate.js to achieve millisecond-level translation.

---

## ⚡ How to run this project?

1. **Clone the repository:**

```bash
git clone https://github.com/Zuoyan233/BrightMoon.git

cd BrightMoon

```

2. **Install dependencies:**

```bash
# If pnpm is not installed, install it first
npm install -g pnpm

# Install project dependencies
pnpm install

```

3. **Configure the blog:**

- Edit `src/config.ts` to customize blog settings.
- Update site information, theme colors, banner images, and social links.
- Configure featured page functionalities.
- (Optional) Configure content repository separation - refer to Mizuki Docs's [Content Repository Configuration](https://docs.mizuki.mysqil.com/Other/separation/) for details.

4. **Featured Pages Configuration:**

- **Anime Page:** Edit the anime list in `src/pages/anime.astro`.
- **Friends Page:** Edit friend data in `src/content/spec/friends.md`.
- **Albums Page:** Edit album information in `public/images/albums`. For usage, see [Photo Album Feature Instructions](./public/images/albums/README.md).
- **My Devices Page:** Edit device information in `src/data/devices.ts`.
- **Diary Page:** Edit posts in `src/data/diary.ts`.
- **About Page:** Edit content in `src/content/spec/about.md`.
- **Sponsors Page:** Edit content in `src/content/spec/sponsors.md`.
  - Find `addpaymentConfig` in `src/config.ts` to configure payment QR codes. QR codes should be stored in `public/images/sponsors`.
- **Feedback Page:** Edit content in `src/content/spec/feedback.md`.
  - Find `contactEmailConfig` in `src/config.ts` to configure the site owner's email contact.
  - Find `addfriendConfig` in `src/config.ts` configuration to add a friend QR codes. The QR codes file path is stored in `public/images/contact`.
- **Projects Page:** Edit displayed content in `src/data/projects.ts`.
- **Skills Page:** Edit displayed content in `src/data/skills.ts`.
- **Timeline Page:** Edit displayed content in `src/data/timeline.ts`.

5. **Article Content Management:**

- **Create new article:** `pnpm new-post <filename>`.
- **Edit article:** Modify files in `src/content/posts/`.
- **Custom Pages:** Edit special pages in `src/content/spec/`.
- **Add images:** Place images in `src/assets/` or `public/`.
- **Markdown Extended Syntax:** Refer to Mizuki Docs's [Markdown Extended Syntax](https://docs.mizuki.mysqil.com/press/Markdown/customize/) for details.

Frontmatter Field Descriptions:

- **title**: Article title (Required)
- **published**: Publication date (Required)
- **description**: Article description for SEO and preview
- **image**: Cover image path (relative to the article file)
- **tags**: Array of tags for categorization
- **category**: Article category
- **draft**: Set to `true` to hide the article in production
- **comment**: Set to `true` or `false` to control comment switch for the current article (requires enabling Twikoo comment system in `src/config.ts` first)
- **pinned**: Set to `true` to pin the article
- **lang**: Article language (only needed if different from the site's default language)

6. **Start the development server:**

```bash
pnpm dev
```

The blog will be available at `http://localhost:4321`.

7. **All commands are run in the project root directory:**

| Commands                   | Operations                                             |
| :------------------------- | :----------------------------------------------------- |
| `pnpm install`             | Install dependencies                                   |
| `pnpm dev`                 | Start the local development server at `localhost:4321` |
| `pnpm build`               | Build the production site to `./dist/`                 |
| `pnpm preview`             | Preview the build locally before deployment            |
| `pnpm check`               | Run Astro bug checks                                   |
| `pnpm format`              | Format code using Biome                                |
| `pnpm lint`                | Check and fix code issues                              |
| `pnpm new-post <filename>` | Create a new blog post                                 |
| `pnpm astro ...`           | Run Astro CLI commands                                 |

To provide developers with a smoother, more familiar experience, we still use Biome for code formatting and fixing.

Although Mizuki version 7.6 and later switched to Prettier + ESLint, we believe Biome's "out-of-the-box" nature aligns better with our workflow, avoiding additional configuration costs.

---

## 🙏 Acknowledgements

- [Mizuki](https://github.com/matsuzaka-yuki/Mizuki) – An enhanced fork based on Fuwari. Thank you for providing a modern and feature-rich static blog template.
- [Fuwari](https://github.com/saicaca/fuwari) by saicaca – The original template on which this project is based. Thank you for creating such a beautiful and powerful template.
- [Yukina](https://github.com/WhitePaper233/yukina) – Thank you for the design inspiration and creativity that helped shape this project. Yukina is an elegant blog template showcasing excellent design principles and user experience.
- [Firefly](https://github.com/CuteLeaf/Firefly) – Thank you for providing great layout ideas, such as the dual sidebar layout, double-column article grids, and the design and implementation of some widgets.
- [Twilight](https://github.com/spr-aachen/Twilight) – Thank you for the inspiration and technical support. Twilight’s dynamic wallpaper mode switching system, responsive design, and transition effects significantly enhanced this project.

---

⭐ If you have any questions or suggestions, please submit an [Issue](https://github.com/Zuoyan233/BrightMoon/issues) or a [Pull Request](https://github.com/Zuoyan233/BrightMoon/pulls). Alternatively, you can also reach out via [the feedback page on my website](https://www.zuoyanblogs.xyz/feedback/). If you find this project helpful, please consider giving it a star!
