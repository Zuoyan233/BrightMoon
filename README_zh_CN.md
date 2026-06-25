# BrightMoon

<img align='right' src='./project-preview/images/logo.webp' width='200px' alt="BrightMoon logo">

BrightMoon 是一款融合现代简约与优雅气质的独特二次元美学静态博客模板。项目以 [Astro](https://astro.build/) 为构建基石，将先进功能与精美视觉融为一体。

**_如明月初升，清辉如故_** <br>
**_以此为始，重新出发。_**

[![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)](https://nodejs.org/)
[![pnpm >= 11](https://img.shields.io/badge/pnpm-%3E%3D11-blue)](https://pnpm.io/)
[![Astro](https://img.shields.io/badge/Astro-7.0.2-orange)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)](https://www.typescriptlang.org/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?logo=apache)](https://opensource.org/licenses/Apache-2.0)

💻 欢迎进入我的网站参观：[点击进入](https://www.zuoyanblogs.xyz/)

🌐 README 语言：[繁體中文](./README_zh_Hant.md) &nbsp;|&nbsp; [English](./README.md) &nbsp;|&nbsp; [日本語](./README_jp.md)

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

## 📌 版本说明

本项目基于 Mizuki V8.2 进行定制化拓展开发，版本号以 BrightMoon Custom Edition（CE）为后缀，代表 BrightMoon 的轻度定制版本（目前正在恶补市面流行的网站框架，等有空了再继续推进）。

---

## ✨ 功能特性

### 🔧 组件配置系统重构

- **统一配置整合：** 全部组件配置项集中整合到 `src/config.ts` 中，统一管理。
- **相册逻辑重构：** 重构隐藏相册逻辑，修复无法通过链接访问的问题。
- **响应式布局适配：** 组件支持响应式布局，可根据设备类型自动调整显示。

### 📐 布局系统优化

- **侧边栏位置动态调整：** 支持左右侧边栏切换，布局自动适配。
- **文章目录智能定位：** 当侧边栏在右侧时，文章目录自动移至左侧，提供更好的阅读体验。
- **网格布局改进：** 优化 CSS Grid 布局，解决容器宽度异常问题。
- **TOC 目录响应式适配：** 文章目录支持响应式设备配置，移动端自动优化显示。

### 🎛️ 配置文件格式标准化

- **标准化配置格式：** 创建统一的组件配置文件格式规范。
- **类型安全：** 完善的 TypeScript 类型定义，确保配置的类型安全。
- **可扩展性：** 支持自定义组件类型和配置选项。

### 🧹 代码优化

- **测试文件清理：** 移除未使用的测试配置和依赖，减少项目体积。
- **代码结构优化：** 改进组件架构，提升代码可维护性。
- **性能提升：** 优化组件加载逻辑，提升页面渲染性能。
- **组件动画优化：** 优化部分小组件动画，提升交互流畅度。

### 🎨 设计与界面

- **项目构建** - 基于 [Astro](https://astro.build) 和 [Tailwind CSS](https://tailwindcss.com) 构建。
- **动画与过渡** - 使用 [Swup](https://swup.js.org/) 实现流畅的动画和页面过渡。
- **多主题模式** - 支持明亮、暗黑及 "跟随系统" 三种模式，通过下拉框自由切换。
- **面包屑导航** - 提供清晰的导航路径，方便用户返回上一级。
- **外部链接确认弹窗** - 点击外部链接时弹窗确认，提升浏览安全性。
- **个性化外观控制** - 支持壁纸模式、樱花特效、文章列表布局、导航栏样式等 UI 开关，随心定制。
  - 可自定义主题色彩和动态横幅轮播。
  - 全屏背景图片，支持轮播、透明度和模糊效果。
  - 全设备响应式设计。
  - 使用 JetBrains Mono 字体的优美排版。
  - 优化日历样式：优化左右切换图标、文章发布小圆点位置、同日多文章数字显示。
- **页面滚动条样式** - 自定义滚动条外观，保持整体视觉统一。

### 🔍 内容与搜索

- 基于 [Pagefind](https://pagefind.app/) 的高级搜索功能。
- [增强的 Markdown 功能](https://docs.mizuki.mysqil.com/press/Markdown/Markdown/)，支持语法高亮。
- 交互式目录，支持自动滚动。
- RSS 和 Atom 订阅生成。
- 阅读时间估算。
- 文章分类和标签系统。

### 📱 特色页面

- **追番页面** - 追踪动画观看进度和评分。
- **友链页面** - 精美卡片展示朋友网站。
- **相册页面** - 记录生活中的美好瞬间。
- **我的设备页面** - 展示设备信息。
- **日记页面** - 分享生活瞬间，类似社交媒体。
- **归档页面** - 有序的文章时间线视图。
- **关于页面** - 可自定义的个人介绍。
- **赞助页面** - 赞助站长支持优质创作，集成支付二维码放置路径，便捷收款。
- **反馈页面** - 提交网站意见建议，集成联系站长方式（邮箱、好友二维码），与站长直接沟通。
- **项目展示页面** - 开发项目作品集。
- **技能展示页面** - 技术技能和专业知识。
- **时间线页面** - 成长历程和重要里程碑。

### 🛠 技术特性

- **增强代码块** - 基于 [Expressive Code](https://expressive-code.com/)。
- **数学公式支持** - KaTeX 渲染。
- **图片优化** - PhotoSwipe 画廊集成。
- **SEO 优化** - 包含站点地图和元标签。
- **性能优化** - 懒加载和缓存机制。
- **评论系统** - 集成最新版 Twikoo 评论系统，支持多维度配置。
- **翻译组件** - 采用本地 i18n 语言库 + translate.js 实现毫秒级翻译，内置十四个国家站点语言文本。
- **天气组件** - 采用 WeatherAPI 服务，支持七日天气预报、IP 自动定位当前地区，支持手动搜索切换查看其他地区天气。
- **Cookie 隐私提示** - Cookie 隐私政策确认横幅，支持接受/拒绝，拒绝后自动清除非必要 Cookie。
- **站点统计** - 实时显示当前日期（支持多地区格式）、季节和时段信息。
- **框架版本更新** - 通过更新服务 API 自动检测 BrightMoon 新版本发布，支持稳定版与预发布版检测，发现新版本时弹窗提示并引导下载更新。

---

## ⚡ 如何运行该项目？

1. **克隆仓库：**

   ```bash
   git clone https://github.com/Zuoyan233/BrightMoon.git
   cd BrightMoon
   ```

2. **安装依赖：**

   ```bash
   # 如果没有安装 pnpm，先安装
   npm install -g pnpm

   # 安装项目依赖
   pnpm install
   ```

3. **配置博客：**

- 编辑 `src/config.ts` 自定义博客设置。
- 更新站点信息、主题色彩、横幅图片和社交链接。
- 配置特色页面功能。

4. **特色页面配置：**

- **追番页面：** 在 `src/pages/anime.astro` 中编辑动画列表。
- **友链页面：** 在 `src/content/spec/friends.md` 中编辑朋友数据。
- **相册页面：** 在 `public/images/albums` 中编辑相册信息，如何使用请前往 [相册功能使用说明](./public/images/albums/README.md)。
- **我的设备页面：** 在 `src/data/devices.ts` 中编辑设备信息。
- **日记页面：** 在 `src/data/diary.ts` 中编辑动态。
- **关于页面：** 在 `src/content/spec/about.md` 中编辑内容。
- **赞助页面：** 在 `src/content/spec/sponsors.md` 中编辑内容。
  - 在 `src/config.ts` 中找到 `addpaymentConfig` 配置支付二维码，支付二维码存放路径在 `public/images/sponsors` 内。
- **反馈页面：** 在 `src/content/spec/feedback.md` 中编辑内容。
  - 在 `src/config.ts` 中找到 `contactEmailConfig` 配置站长电子邮箱联系方式。
  - 在 `src/config.ts` 中找到 `addfriendConfig` 配置添加好友二维码，好友二维码存放路径在 `public/images/contact` 内。
- **项目展示页面：** 在 `src/data/projects.ts` 中编辑展示的内容。
- **技能展示页面：** 在 `src/data/skills.ts` 中编辑展示的内容。
- **时间线页面：** 在 `src/data/timeline.ts` 中编辑展示的内容。

5. **文章内容管理：**

- **创建新文章：** `pnpm new-post <文件名>`。
- **编辑文章：** 修改 `src/content/posts/` 中的文件。
- **自定义页面：** 编辑 `src/content/spec/` 中的特殊页面。
- **添加图片：** 将图片放在 `src/assets/` 或 `public/` 中。
- **Markdown 扩展语法:** 了解详细请阅读 Mizuki Docs 的 [Markdown 扩展语法](https://docs.mizuki.mysqil.com/press/Markdown/customize/)。

Frontmatter 字段说明：

- **title**: 文章标题（必需）
- **published**: 发布日期（必需）
- **description**: 文章描述，用于 SEO 和预览
- **image**: 封面图片路径（相对于文章文件）
- **tags**: 标签数组，用于分类
- **category**: 文章分类
- **draft**: 设置为 `true` 在生产环境中隐藏文章
- **comment**: 设置为 `true` 或 `false` 可控制当前文章的评论开关（需先在 `src/config.ts` 中开启 Twikoo 评论系统）
- **pinned**: 设置为 `true` 将文章置顶
- **lang**: 文章语言（仅当与站点默认语言不同时设置）

6. **启动开发服务器：**

   ```bash
   pnpm dev
   ```

   博客将在 `http://localhost:4321` 可用。

7. **所有命令都在项目根目录运行：**

| 命令                     | 操作                                   |
| :----------------------- | :------------------------------------- |
| `pnpm install`           | 安装依赖                               |
| `pnpm dev`               | 在 `localhost:4321` 启动本地开发服务器 |
| `pnpm build`             | 构建生产站点到 `./dist/`               |
| `pnpm preview`           | 在部署前本地预览构建                   |
| `pnpm check`             | 运行 Astro 错误检查                    |
| `pnpm format`            | 使用 Biome 格式化代码                  |
| `pnpm lint`              | 检查并修复代码问题                     |
| `pnpm new-post <文件名>` | 创建新博客文章                         |
| `pnpm astro ...`         | 运行 Astro CLI 命令                    |

---

## 🙏 感谢

- [Mizuki](https://github.com/matsuzaka-yuki/Mizuki) - 基于 Fuwari 的二次开发增强版本，感谢提供现代化、功能丰富的静态博客模板。
- [Fuwari](https://github.com/saicaca/fuwari) by saicaca - 本项目所基于的原始模板。感谢您创建了如此漂亮且功能强大的模板。
- [Yukina](https://github.com/WhitePaper233/yukina) - 感谢提供设计灵感和创意，帮助塑造了这个项目。Yukina 是一个优雅的博客模板，展现了出色的设计原则和用户体验。
- [Firefly](https://github.com/CuteLeaf/Firefly) - 感谢提供优秀的布局设计思路，双侧边栏布局、文章双列网格等布局，及部分小组件的设计与实现。
- [Twilight](https://github.com/spr-aachen/Twilight) - 感谢提供灵感和技术支持。Twilight 的动态壁纸模式切换系统、响应式设计和过渡效果显著提升。

---

⭐ 如有问题或建议，请提交 [Issue](https://github.com/Zuoyan233/BrightMoon/issues) 或 [Pull Request](https://github.com/Zuoyan233/BrightMoon/pulls)。另外，您也可以通过 [我的网站反馈页面](https://www.zuoyanblogs.xyz/feedback/) 与我们联系。如果您觉得这个项目有帮助，请考虑给它一个星标！
