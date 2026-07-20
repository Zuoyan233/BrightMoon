::github{repo="Zuoyan233/BrightMoon"}

---

## What is the Origin of the BrightMoon Project?

The predecessor of the BrightMoon project was **Zuoyanblogs**. When the project first started, an official name had not yet been decided, so I temporarily combined my online alias "Zuoyan" with "blogs" to create *Zuoyanblogs* as a provisional placeholder.</br>

As the project gradually took shape and evolved from an initial experimental exploration into a more complete form of expression, I kept searching for a formal name that truly matched the project's essence. It needed to embody a spirit of "starting anew," convey simplicity and elegance, carry a touch of anime and two-dimensional (otaku) culture flair, possess a distinct Chinese aesthetic charm, and above all—be easy to remember.</br>

Ultimately, I landed on **BrightMoon** — **皓月** (Hàoyuè).</br>

In Chinese culture, the "Bright Moon" symbolizes clarity, fulfillment, and constancy. It possesses a classical poetic grace while remaining thoroughly modern. It represents a radiance that is luminous yet never harsh, and subtly echoes the sentiment of *"Though miles apart, we share the same beautiful moon"*—a sense of connection and resonance that I hope this project will bring to its users. Compared to the personal and provisional feel of Zuoyanblogs, **BrightMoon** signifies that the project is ready to face the future with greater maturity and openness.

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
