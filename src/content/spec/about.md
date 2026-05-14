::github{repo="Zuoyan233/BrightMoon"}

---

## What is the Origin of the BrightMoon Project?

The predecessor of the BrightMoon project was **Zuoyanblogs**. When the project first started, an official name had not yet been decided, so I temporarily combined my online alias "Zuoyan" with "blogs" to create *Zuoyanblogs* as a provisional placeholder.</br>

As the project gradually took shape and evolved from an initial experimental exploration into a more complete form of expression, I kept searching for a formal name that truly matched the project's essence. It needed to embody a spirit of "starting anew," convey simplicity and elegance, carry a touch of anime and two-dimensional (otaku) culture flair, possess a distinct Chinese aesthetic charm, and above all—be easy to remember.</br>

Ultimately, I landed on **BrightMoon** — **皓月** (Hàoyuè).</br>

In Chinese culture, the "Bright Moon" symbolizes clarity, fulfillment, and constancy. It possesses a classical poetic grace while remaining thoroughly modern. It represents a radiance that is luminous yet never harsh, and subtly echoes the sentiment of *"Though miles apart, we share the same beautiful moon"*—a sense of connection and resonance that I hope this project will bring to its users. Compared to the personal and provisional feel of Zuoyanblogs, **BrightMoon** signifies that the project is ready to face the future with greater maturity and openness.

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
- Updated and adapted to the latest version of the Twikoo comment system.
- TOC directory supports responsive device configuration.
- Refactored hidden photo album logic, fixed issue where it couldn't be accessed via link.
- Optimized animations for some small components.

## ✨ Features

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
---
