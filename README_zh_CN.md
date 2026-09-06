# BrightMoon

<img align='right' src='./project-preview/images/logo.webp' width='200px' alt="BrightMoon logo">

BrightMoon 是一款融合现代简约与优雅气质的独特二次元美学静态博客模板。项目以 [Astro](https://astro.build/) 为构建基石，将先进功能与精美视觉融为一体。

**_如明月初升，清辉如故_** <br>
**_以此为始，重新出发。_**

[![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)](https://nodejs.org/)
[![pnpm >= 11](https://img.shields.io/badge/pnpm-%3E%3D11-blue)](https://pnpm.io/)
[![Astro](https://img.shields.io/badge/Astro-7.2.9-orange)](https://astro.build/)
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

- **分层配置架构：** 配置拆分为三层：`src/config/defaults.ts`（上游默认值，升级时自动更新）、`src/config/user.ts`（用户配置，升级时受保护）、`src/config/index.ts`（合并入口）。仅需编辑 `src/config/user.ts`。
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
- **图片体积压缩** - 构建时自动压缩图片，将图片格式转换为 WebP 或 AVIF 格式，减少加载时间，提升用户体验。
- **框架版本更新** - 通过远程仓库 API 自动检测 BrightMoon 新版本发布，支持稳定版与预发布版检测，发现新版本时弹窗提示并引导下载更新。
- **框架升级工具** - 支持在线与本地两种升级方式，升级前自动创建备份并检测防回滚，升级后自动安装依赖并清理临时文件；支持手动创建备份与从备份恢复项目。

---

## ⚡ 如何运行该项目？

1. **安装 Node.js ：** 项目要求 Node.js 22 或更高版本。

2. **安装 Git：** 项目使用 Git 进行版本控制，确保已安装并配置好。

3. **克隆仓库：**

   ```bash
   git clone https://github.com/Zuoyan233/BrightMoon.git
   cd BrightMoon
   ```

4. **安装依赖：**

   ```bash
   # 如果没有安装 pnpm，先安装
   npm install -g pnpm

   # 安装项目依赖
   pnpm install
   ```

5. **配置博客：**

- 编辑 `src/config/user.ts` 自定义博客设置。
- 更新站点信息、主题色彩、横幅图片和社交链接。
- 配置特色页面功能。

6. **特色页面配置：**

- **追番页面：** 在 `src/pages/anime.astro` 中编辑动画列表。
- **友链页面：** 在 `src/content/spec/friends.md` 中编辑朋友数据。
- **相册页面：** 在 `public/images/albums` 中编辑相册信息。相册功能采用**自动扫描机制**，只需创建文件夹、放置图片和配置文件即可，无需手动编写代码！

  <details>
  <summary><b>相册功能使用说明</b>（点击展开）</summary>

  BrightMoon 相册功能采用**自动扫描**机制，只需创建文件夹、放置图片和配置文件即可，无需手动编写代码（外链相册则需要手动定义每张图片的 `src` 等信息）。

  ##### 快速开始

  创建一个相册只需 3 步：

  1. 在 `public/images/albums/`（本说明文件所在目录）下创建一个文件夹（文件夹名即为相册 ID）
  2. 在文件夹中放置 `cover.jpg`（封面图）和其他照片
  3. 创建 `info.json` 配置文件

  完成！相册会自动出现在相册列表页面。

  ##### 目录结构

  ```
  public/images/albums/
  ├── my-travel-2024/              # 相册文件夹（文件夹名 = 相册ID）
  │   ├── info.json                # 相册配置文件（必需）
  │   ├── cover.jpg                # 封面图（必需）
  │   ├── photo1.jpg               # 相册照片
  │   ├── photo2.jpg
  │   └── photo3.jpg
  ├── daily-life/                  # 另一个相册
  │   ├── info.json
  │   ├── cover.jpg
  │   └── ...
  ```

  ##### 配置文件说明

  **本地图片模式**

  在相册文件夹中创建 `info.json`：

  ```json
  {
    "title": "我的旅行相册",
    "description": "2024年夏天的美好回忆",
    "date": "2024-08-01",
    "location": "日本东京",
    "tags": ["旅行", "风景", "夏天"],
    "layout": "masonry",
    "columns": 3,
    "hidden": false
  }
  ```

  **配置项说明：**

  | 字段 | 必需 | 说明 | 默认值 |
  |------|------|------|--------|
  | `title` | 是 | 相册标题 | 使用文件夹名 |
  | `description` | 否 | 相册描述 | 空 |
  | `date` | 否 | 相册日期（格式：YYYY-MM-DD） | 当前日期 |
  | `location` | 否 | 拍摄地点 | 空 |
  | `tags` | 否 | 标签数组 | `[]` |
  | `layout` | 否 | 布局方式：`grid`（网格）或 `masonry`（瀑布流） | `grid` |
  | `columns` | 否 | 列数（2-4） | `3` |
  | `hidden` | 否 | 是否隐藏相册 | `false` |

  **外链图片模式**

  如果想使用外部图片链接（例如使用图床），设置 `mode: "external"`：

  ```json
  {
    "mode": "external",
    "title": "外链相册示例",
    "description": "使用外部图片链接的相册",
    "date": "2024-08-28",
    "location": "网络",
    "tags": ["外链", "示例"],
    "layout": "masonry",
    "columns": 3,
    "cover": "https://example.com/cover.jpg",
    "photos": [
      {
        "id": "photo-1",
        "src": "https://example.com/photo1.jpg",
        "alt": "图片描述",
        "title": "图片标题",
        "description": "详细描述",
        "tags": ["标签1"],
        "width": 1920,
        "height": 1280
      }
    ]
  }
  ```

  **外链模式额外字段：**

  | 字段 | 必需 | 说明 |
  |------|------|------|
  | `mode` | 是 | 设置为 `"external"` 启用外链模式 |
  | `cover` | 是 | 封面图片 URL（仅外链模式需要） |
  | `photos` | 是 | 照片数组，每张照片包含 `src`、`alt`、`title` 等字段，详见下表 |

  **photos 数组中每张图片的字段说明（仅外链模式需要）：**

  | 字段 | 必需 | 说明 | 示例 |
  |------|------|------|------|
  | `id` | 否 | 照片唯一标识符 | `"photo-1"` |
  | `src` | 是 | 照片 URL 地址 | `"https://example.com/photo.jpg"` |
  | `thumbnail` | 否 | 缩略图 URL（不提供则使用原图） | `"https://example.com/thumb.jpg"` |
  | `alt` | 否 | 图片替代文本（用于无障碍访问） | `"美丽的日落"` |
  | `title` | 否 | 照片标题 | `"海边日落"` |
  | `description` | 否 | 照片详细描述 | `"2024年夏天在海边拍摄的日落"` |
  | `tags` | 否 | 照片标签数组 | `["日落", "海边"]` |
  | `date` | 否 | 拍摄日期（格式：YYYY-MM-DD） | `"2024-08-01"` |
  | `location` | 否 | 拍摄地点 | `"冲绳海滩"` |
  | `width` | 否 | 照片宽度（像素） | `1920` |
  | `height` | 否 | 照片高度（像素） | `1280` |
  | `camera` | 否 | 相机型号 | `"Canon EOS R5"` |
  | `lens` | 否 | 镜头型号 | `"RF 24-70mm F2.8"` |
  | `settings` | 否 | 拍摄参数（字符串） | `"f/2.8, 1/500s, ISO 100"` |

  > **注意：**
  > - 本地图片模式**不需要**配置 `photos` 字段，系统会自动扫描文件夹中的所有图片文件
  > - 外链模式**必须**手动配置 `photos` 数组，至少需要提供 `src` 字段
  > - 建议为外链照片提供 `thumbnail` 缩略图以提升加载速度

  ##### 图片格式建议

  **封面图片 (cover.jpg)：**
  - **尺寸**：800×600px（4:3 比例）
  - **格式**：JPG（外链模式可支持更多格式）
  - **大小**：建议 < 200KB

  **相册照片：**
  - **格式**：JPG、JPEG、PNG、WebP、GIF、SVG、AVIF
  - **尺寸**：建议最大宽度 1920px
  - **优化**：建议压缩后上传，提升加载速度

  ##### 布局选项

  **网格布局 (Grid)：**
  ```json
  { "layout": "grid", "columns": 3 }
  ```
  - 适合尺寸统一的照片，支持 2-4 列，照片会被裁剪为正方形

  **瀑布流布局 (Masonry)：**
  ```json
  { "layout": "masonry", "columns": 3 }
  ```
  - 适合不同尺寸的照片，保持照片原始比例，自动排列，视觉效果更自然

  ##### 高级功能

  **文件名标签（实验性）**

  系统支持从文件名解析标签（格式：`基本名_标签1_标签2.ext`）：
  ```
  photo_sunset_beach.jpg  →  标签：sunset, beach
  ```

  **隐藏相册**

  设置 `"hidden": true` 可以隐藏相册，但仍可通过 URL 直接访问：
  ```
  访问：/albums/your-album-id/
  ```

  ##### 常见问题

  **Q: 为什么我的相册没有显示？**  
  A: 检查是否存在 `info.json` 和 `cover.jpg`，以及 `hidden` 是否设置为 `true`。

  **Q: 可以使用其他图片格式吗？**  
  A: 可以，支持 JPG、PNG、WebP、GIF、SVG、AVIF 等格式。

  **Q: 如何优化图片加载速度？**  
  A: 建议使用 WebP 等压缩率较高的格式压缩图片大小。使用外链模式时设置缩略图。

  **Q: 如何更改相册排序？**  
  A: 相册按时间顺序展示，可通过修改相册的 `date` 字段调整排序。

  </details>

- **我的设备页面：** 在 `src/data/devices.ts` 中编辑设备信息。
- **日记页面：** 在 `src/data/diary.ts` 中编辑动态。
- **关于页面：** 在 `src/content/spec/about.md` 中编辑内容。
- **赞助页面：** 在 `src/content/spec/sponsors.md` 中编辑内容。
  - 在 `src/config/user.ts` 中找到 `addpaymentConfig` 配置支付二维码，支付二维码存放路径在 `public/images/sponsors` 内。
- **反馈页面：** 在 `src/content/spec/feedback.md` 中编辑内容。
  - 在 `src/config/user.ts` 中找到 `contactEmailConfig` 配置站长电子邮箱联系方式。
  - 在 `src/config/user.ts` 中找到 `addfriendConfig` 配置添加好友二维码，好友二维码存放路径在 `public/images/contact` 内。
- **项目展示页面：** 在 `src/data/projects.ts` 中编辑展示的内容。
- **技能展示页面：** 在 `src/data/skills.ts` 中编辑展示的内容。
- **时间线页面：** 在 `src/data/timeline.ts` 中编辑展示的内容。

7. **文章内容管理：**

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
- **encrypted**: 设置为 `true` 加密文章，需在 `src/config/user.ts` 中开启加密功能
- **password**: 密码，用于加密文章
- **passwordHint**: 密码提示，用于密码输入框
- **draft**: 设置为 `true` 在生产环境中隐藏文章
- **comment**: 设置为 `true` 或 `false` 可控制当前文章的评论开关（需先在 `src/config/user.ts` 中开启 Twikoo 评论系统）
- **pinned**: 设置为 `true` 将文章置顶
- **lang**: 文章语言（仅当与站点默认语言不同时设置）

8. **启动开发服务器：**

   ```bash
   pnpm dev
   ```

   博客将在 `http://localhost:4321` 可用。

9. **升级 BrightMoon 博客框架（可选）：**

   当有新版本发布时，可使用内置升级工具进行升级：

   ```bash
   pnpm brightmoon-upgrade
   ```

   升级工具提供两种升级方式与备份与恢复功能：
   - **在线升级** - 从远程仓库自动下载最新 Release 并完成升级，支持选择稳定版或预发布版。
   - **本地升级** - 将下载的 `.zip` 压缩包放入项目根目录的 `update` 文件夹中，工具将自动解压并完成升级。
   - **创建备份** - 手动创建项目完整备份，备份文件保存在 `backup` 目录中。
   - **恢复备份** - 从 `backup` 目录中选择备份文件恢复项目。

   升级前会自动创建备份并检测防回滚，升级完成后会自动运行 `pnpm install` 安装新依赖并清理临时文件。`src/config/user.ts` 中的用户配置升级时受保护，无需手动迁移；`src/config/defaults.ts` 中的上游默认值会自动更新。

10. **所有命令都在项目根目录运行：**

| 命令                      | 操作                                   |
| :------------------------ | :------------------------------------- |
| `pnpm install`            | 安装依赖                               |
| `pnpm dev`                | 在 `localhost:4321` 启动本地开发服务器 |
| `pnpm build`              | 构建生产站点到 `./dist/`               |
| `pnpm preview`            | 在部署前本地预览构建                   |
| `pnpm brightmoon-upgrade` | 运行 BrightMoon 博客框架升级工具       |
| `pnpm check`              | 运行 Astro 错误检查                    |
| `pnpm format`             | 使用 Biome 格式化代码                  |
| `pnpm lint`               | 检查并修复代码问题                     |
| `pnpm optimize-images`    | 运行图片体积压缩工具                   |
| `pnpm new-post <文件名>`  | 创建新博客文章                         |
| `pnpm astro ...`          | 运行 Astro CLI 命令                    |

---

## 🙏 感谢

- [Mizuki](https://github.com/matsuzaka-yuki/Mizuki) - 基于 Fuwari 的二次开发增强版本，感谢提供现代化、功能丰富的静态博客模板。
- [Fuwari](https://github.com/saicaca/fuwari) by saicaca - 本项目所基于的原始模板。感谢您创建了如此漂亮且功能强大的模板。
- [Yukina](https://github.com/WhitePaper233/yukina) - 感谢提供设计灵感和创意，帮助塑造了这个项目。Yukina 是一个优雅的博客模板，展现了出色的设计原则和用户体验。
- [Firefly](https://github.com/CuteLeaf/Firefly) - 感谢提供优秀的布局设计思路，双侧边栏布局、文章双列网格等布局，及部分小组件的设计与实现。
- [Twilight](https://github.com/spr-aachen/Twilight) - 感谢提供灵感和技术支持。Twilight 的动态壁纸模式切换系统、响应式设计和过渡效果显著提升。

---

⭐ 如有问题或建议，请提交 [Issue](https://github.com/Zuoyan233/BrightMoon/issues) 或 [Pull Request](https://github.com/Zuoyan233/BrightMoon/pulls)。另外，您也可以通过 [我的网站反馈页面](https://www.zuoyanblogs.xyz/feedback/) 与我们联系。如果您觉得这个项目有帮助，请考虑给它一个星标！