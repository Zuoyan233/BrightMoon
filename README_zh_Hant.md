# BrightMoon

<img align='right' src='./project-preview/images/logo.webp' width='200px' alt="BrightMoon logo">

BrightMoon 是一款融合現代簡約與優雅氣質的獨特二次元美學靜態部落格模板。專案以 [Astro](https://astro.build/) 為構建基石，將先進功能與精美視覺融為一體。

**_如明月初升，清輝如故_** <br>
**_以此為始，重新出發。_**

[![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)](https://nodejs.org/)
[![pnpm >= 11](https://img.shields.io/badge/pnpm-%3E%3D11-blue)](https://pnpm.io/)
[![Astro](https://img.shields.io/badge/Astro-7.2.3-orange)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)](https://www.typescriptlang.org/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?logo=apache)](https://opensource.org/licenses/Apache-2.0)

💻 歡迎進入我的網站參觀：[點擊進入](https://www.zuoyanblogs.xyz/)

🌐 README 語言：[简体中文](./README_zh_CN.md) &nbsp;|&nbsp; [English](./README.md) &nbsp;|&nbsp; [日本語](./README_jp.md)

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

## 📌 版本說明

本專案基於 Mizuki V8.2 進行客製化拓展開發，版本號以 BrightMoon Custom Edition（CE）為後綴，代表 BrightMoon 的輕度客製版本（目前正在惡補市面上流行的網站框架，等有空了再繼續推進）。

---

## ✨ 功能特性

### 🔧 元件配置系統重構

- **分層配置架構：** 配置拆分為三層：`src/config/defaults.ts`（上游預設值，升級時自動更新）、`src/config/user.ts`（使用者配置，升級時受保護）、`src/config/index.ts`（合併入口）。僅需編輯 `src/config/user.ts`。
- **響應式佈局適配：** 元件支援響應式佈局，可根據裝置類型自動調整顯示。

### 📐 佈局系統最佳化

- **側邊欄位置動態調整：** 支援左右側邊欄切換，佈局自動適配。
- **文章目錄智慧定位：** 當側邊欄在右側時，文章目錄自動移至左側，提供更好的閱讀體驗。
- **網格佈局改進：** 最佳化 CSS Grid 佈局，解決容器寬度異常問題。
- **TOC 目錄響應式適配：** 文章目錄支援響應式裝置配置，行動端自動最佳化顯示。

### 🎛️ 設定檔格式標準化

- **標準化設定格式：** 建立統一的元件設定檔格式規範。
- **型別安全：** 完善的 TypeScript 型別定義，確保設定的型別安全。
- **可擴充套件性：** 支援自訂元件型別和設定選項。

### 🧹 程式碼最佳化

- **測試檔案清理：** 移除未使用的測試配置和依賴，減少專案體積。
- **程式碼結構最佳化：** 改進元件架構，提升程式碼可維護性。
- **效能提升：** 最佳化元件載入邏輯，提升頁面渲染效能。
- **元件動畫最佳化：** 最佳化部分小元件動畫，提升互動流暢度。

### 🎨 設計與介面

- **專案構建** - 基於 [Astro](https://astro.build) 和 [Tailwind CSS](https://tailwindcss.com) 構建。
- **動畫與過渡** - 使用 [Swup](https://swup.js.org/) 實現流暢的動畫和頁面過渡。
- **多主題模式** - 支援明亮、暗黑及「跟隨系統」三種模式，透過下拉選單自由切換。
- **麵包屑導航** - 提供清晰的導航路徑，方便使用者返回上一級。
- **外部連結確認彈窗** - 點擊外部連結時彈窗確認，提升瀏覽安全性。
- **個人化外觀控制** - 支援桌布模式、櫻花特效、文章列表佈局、導覽列樣式等 UI 開關，隨心定製。
  - 可自訂主題色彩和動態橫幅輪播。
  - 全螢幕背景圖片，支援輪播、透明度和模糊效果。
  - 全裝置響應式設計。
  - 使用 JetBrains Mono 字型的美觀排版。
  - 最佳化日曆樣式：最佳化左右切換圖示、文章發佈小圓點位置、同日多文章數字顯示。
- **頁面捲動條樣式** - 自訂捲動條外觀，保持整體視覺統一。

### 🔍 內容與搜尋

- 基於 [Pagefind](https://pagefind.app/) 的進階搜尋功能。
- [增強的 Markdown 功能](https://docs.mizuki.mysqil.com/press/Markdown/Markdown/)，支援語法高亮。
- 互動式目錄，支援自動滾動。
- RSS 和 Atom 訂閱生成。
- 閱讀時間估算。
- 文章分類和標籤系統。

### 📱 特色頁面

- **追番頁面** - 追蹤動畫觀看進度和評分。
- **友鏈頁面** - 精美卡片展示朋友網站。
- **相簿頁面** - 記錄生活中的美好瞬間。
- **我的裝置頁面** - 展示裝置資訊。
- **日記頁面** - 分享生活瞬間，類似社交媒體。
- **歸檔頁面** - 有序的文章時間線檢視。
- **關於頁面** - 可自訂的個人介紹。
- **贊助頁面** - 贊助站長支援優質創作，整合支付 QR Code 放置路徑，便捷收款。
- **回饋頁面** - 提交網站意見建議，整合聯絡站長方式（信箱、好友 QR Code），與站長直接溝通。
- **專案展示頁面** - 開發專案作品集。
- **技能展示頁面** - 技術技能和專業知識。
- **時間線頁面** - 成長歷程和重要里程碑。

### 🛠 技術特性

- **增強程式碼區塊** - 基於 [Expressive Code](https://expressive-code.com/)。
- **數學公式支援** - KaTeX 渲染。
- **圖片最佳化** - PhotoSwipe 畫廊整合。
- **SEO 最佳化** - 包含站點地圖和中繼標籤。
- **效能最佳化** - 延遲載入和快取機制。
- **留言系統** - 整合最新版 Twikoo 留言系統，支援多維度配置。
- **翻譯元件** - 採用本地 i18n 語言庫 + translate.js 實現毫秒級翻譯，內建十四個國家站點語言文本。
- **天氣元件** - 採用 WeatherAPI 服務，支援七日天氣預報、IP 自動定位目前地區，支援手動搜尋切換查看其他地區天氣。
- **Cookie 隱私提示** - Cookie 隱私政策確認橫幅，支援接受/拒絕，拒絕後自動清除非必要 Cookie。
- **站點統計** - 即時顯示目前日期（支援多地區格式）、季節和時段資訊。
- **框架版本更新** - 透過遠端倉庫 API 自動檢測 BrightMoon 新版本發佈，支援穩定版與預發佈版檢測，發現新版本時彈窗提示並引導下載更新。
- **框架升級工具** - 支援線上與本機兩種升級方式，升級前自動建立備份並偵測防回滾，升級後自動安裝依賴並清理暫存檔案；支援手動建立備份與從備份恢復專案。

---

## ⚡ 如何執行本專案？

1. **安裝 Node.js：** 本專案需要 Node.js 22 或以上版本。

2. **安裝 Git：** 本專案使用 Git 進行版本控制，請確保已安裝並配置好 Git。

3. **複製倉庫：**

   ```bash
   git clone https://github.com/Zuoyan233/BrightMoon.git
   cd BrightMoon
   ```

4. **安裝依賴：**

   ```bash
   # 如果沒有安裝 pnpm，先安裝
   npm install -g pnpm

   # 安裝專案依賴
   pnpm install
   ```

5. **設定部落格：**

- 編輯 `src/config/user.ts` 自訂部落格設定。
- 更新站點資訊、主題色彩、橫幅圖片和社交連結。
- 設定特色頁面功能。

6. **特色頁面配置：**

- **追番頁面：** 在 `src/pages/anime.astro` 中編輯動畫列表。
- **友鏈頁面：** 在 `src/content/spec/friends.md` 中編輯朋友資料。
- **相簿頁面：** 在 `public/images/albums` 中編輯相簿資訊。相簿功能採用**自動掃描機制**，只需建立資料夾、放置圖片和設定檔即可，無需手動撰寫程式碼！

  <details>
  <summary><b>相簿功能使用說明</b>（點擊展開）</summary>

  BrightMoon 相簿功能採用**自動掃描**機制，只需建立資料夾、放置圖片和設定檔即可，無需手動撰寫程式碼（外連相簿則需要手動定義每張圖片的 `src` 等資訊）。

  ##### 快速開始

  建立一個相簿只需 3 步：

  1. 在 `public/images/albums/`（本說明檔所在目錄）下建立一個資料夾（資料夾名即為相簿 ID）
  2. 在資料夾中放置 `cover.jpg`（封面圖）和其他照片
  3. 建立 `info.json` 設定檔

  完成！相簿會自動出現在相簿列表頁面。

  ##### 目錄結構

  ```
  public/images/albums/
  ├── my-travel-2024/              # 相簿資料夾（資料夾名 = 相簿ID）
  │   ├── info.json                # 相簿設定檔（必需）
  │   ├── cover.jpg                # 封面圖（必需）
  │   ├── photo1.jpg               # 相簿照片
  │   ├── photo2.jpg
  │   └── photo3.jpg
  ├── daily-life/                  # 另一個相簿
  │   ├── info.json
  │   ├── cover.jpg
  │   └── ...
  ```

  ##### 設定檔說明

  **本地圖片模式**

  在相簿資料夾中建立 `info.json`：

  ```json
  {
    "title": "我的旅行相簿",
    "description": "2024年夏天的美好回憶",
    "date": "2024-08-01",
    "location": "日本東京",
    "tags": ["旅行", "風景", "夏天"],
    "layout": "masonry",
    "columns": 3,
    "hidden": false
  }
  ```

  **設定項說明：**

  | 欄位 | 必需 | 說明 | 預設值 |
  |------|------|------|--------|
  | `title` | 是 | 相簿標題 | 使用資料夾名 |
  | `description` | 否 | 相簿描述 | 空 |
  | `date` | 否 | 相簿日期（格式：YYYY-MM-DD） | 目前日期 |
  | `location` | 否 | 拍攝地點 | 空 |
  | `tags` | 否 | 標籤陣列 | `[]` |
  | `layout` | 否 | 佈局方式：`grid`（網格）或 `masonry`（瀑布流） | `grid` |
  | `columns` | 否 | 欄數（2-4） | `3` |
  | `hidden` | 否 | 是否隱藏相簿 | `false` |

  **外連圖片模式**

  如果想使用外部圖片連結（例如使用圖床），設定 `mode: "external"`：

  ```json
  {
    "mode": "external",
    "title": "外連相簿範例",
    "description": "使用外部圖片連結的相簿",
    "date": "2024-08-28",
    "location": "網路",
    "tags": ["外連", "範例"],
    "layout": "masonry",
    "columns": 3,
    "cover": "https://example.com/cover.jpg",
    "photos": [
      {
        "id": "photo-1",
        "src": "https://example.com/photo1.jpg",
        "alt": "圖片描述",
        "title": "圖片標題",
        "description": "詳細描述",
        "tags": ["標籤1"],
        "width": 1920,
        "height": 1280
      }
    ]
  }
  ```

  **外連模式額外欄位：**

  | 欄位 | 必需 | 說明 |
  |------|------|------|
  | `mode` | 是 | 設定為 `"external"` 啟用外連模式 |
  | `cover` | 是 | 封面圖片 URL（僅外連模式需要） |
  | `photos` | 是 | 照片陣列，每張照片包含 `src`、`alt`、`title` 等欄位，詳見下表 |

  **photos 陣列中每張圖片的欄位說明（僅外連模式需要）：**

  | 欄位 | 必需 | 說明 | 範例 |
  |------|------|------|------|
  | `id` | 否 | 照片唯一識別碼 | `"photo-1"` |
  | `src` | 是 | 照片 URL 位址 | `"https://example.com/photo.jpg"` |
  | `thumbnail` | 否 | 縮圖 URL（不提供則使用原圖） | `"https://example.com/thumb.jpg"` |
  | `alt` | 否 | 圖片替代文字（用於無障礙存取） | `"美麗的日落"` |
  | `title` | 否 | 照片標題 | `"海邊日落"` |
  | `description` | 否 | 照片詳細描述 | `"2024年夏天在海邊拍攝的日落"` |
  | `tags` | 否 | 照片標籤陣列 | `["日落", "海邊"]` |
  | `date` | 否 | 拍攝日期（格式：YYYY-MM-DD） | `"2024-08-01"` |
  | `location` | 否 | 拍攝地點 | `"沖繩海灘"` |
  | `width` | 否 | 照片寬度（像素） | `1920` |
  | `height` | 否 | 照片高度（像素） | `1280` |
  | `camera` | 否 | 相機型號 | `"Canon EOS R5"` |
  | `lens` | 否 | 鏡頭型號 | `"RF 24-70mm F2.8"` |
  | `settings` | 否 | 拍攝參數（字串） | `"f/2.8, 1/500s, ISO 100"` |

  > **注意：**
  > - 本地圖片模式**不需要**設定 `photos` 欄位，系統會自動掃描資料夾中的所有圖片檔案
  > - 外連模式**必須**手動設定 `photos` 陣列，至少需要提供 `src` 欄位
  > - 建議為外連照片提供 `thumbnail` 縮圖以提升載入速度

  ##### 圖片格式建議

  **封面圖片 (cover.jpg)：**
  - **尺寸**：800×600px（4:3 比例）
  - **格式**：JPG（外連模式可支援更多格式）
  - **大小**：建議 < 200KB

  **相簿照片：**
  - **格式**：JPG、JPEG、PNG、WebP、GIF、SVG、AVIF
  - **尺寸**：建議最大寬度 1920px
  - **最佳化**：建議壓縮後上傳，提升載入速度

  ##### 佈局選項

  **網格佈局 (Grid)：**
  ```json
  { "layout": "grid", "columns": 3 }
  ```
  - 適合尺寸統一的照片，支援 2-4 欄，照片會被裁剪為正方形

  **瀑布流佈局 (Masonry)：**
  ```json
  { "layout": "masonry", "columns": 3 }
  ```
  - 適合不同尺寸的照片，保持照片原始比例，自動排列，視覺效果更自然

  ##### 進階功能

  **檔名標籤（實驗性）**

  系統支援從檔名解析標籤（格式：`基本名_標籤1_標籤2.ext`）：
  ```
  photo_sunset_beach.jpg  →  標籤：sunset, beach
  ```

  **隱藏相簿**

  設定 `"hidden": true` 可以隱藏相簿，但仍可透過 URL 直接存取：
  ```
  存取：/albums/your-album-id/
  ```

  ##### 常見問題

  **Q: 為什麼我的相簿沒有顯示？**  
  A: 檢查是否存在 `info.json` 和 `cover.jpg`，以及 `hidden` 是否設定為 `true`。

  **Q: 可以使用其他圖片格式嗎？**  
  A: 可以，支援 JPG、PNG、WebP、GIF、SVG、AVIF 等格式。

  **Q: 如何最佳化圖片載入速度？**  
  A: 建議使用 WebP 等壓縮率較高的格式壓縮圖片大小。使用外連模式時設定縮圖。

  **Q: 如何更改相簿排序？**  
  A: 相簿按時間順序展示，可透過修改相簿的 `date` 欄位調整排序。

  </details>

- **我的裝置頁面：** 在 `src/data/devices.ts` 中編輯裝置資訊。
- **日記頁面：** 在 `src/data/diary.ts` 中編輯動態。
- **關於頁面：** 在 `src/content/spec/about.md` 中編輯內容。
- **贊助頁面：** 在 `src/content/spec/sponsors.md` 中編輯內容。
  - 在 `src/config/user.ts` 中找到 `addpaymentConfig` 配置支付 QR Code，支付 QR Code 存放路徑在 `public/images/sponsors` 內。
- **回饋頁面：** 在 `src/content/spec/feedback.md` 中編輯內容。
  - 在 `src/config/user.ts` 中找到 `contactEmailConfig` 配置站長電子郵件聯絡方式。
  - 在 `src/config/user.ts` 中找到 `addfriendConfig` 配置加入好友 QR Code，QR Code 存放路徑在 `public/images/contact` 內。
- **專案展示頁面：** 在 `src/data/projects.ts` 中編輯展示的內容。
- **技能展示頁面：** 在 `src/data/skills.ts` 中編輯展示的內容。
- **時間線頁面：** 在 `src/data/timeline.ts` 中編輯展示的內容。

7. **文章內容管理：**

- **建立新文章：** `pnpm new-post <檔名>`。
- **編輯文章：** 修改 `src/content/posts/` 中的檔案。
- **自訂頁面：** 編輯 `src/content/spec/` 中的特殊頁面。
- **新增圖片：** 將圖片放在 `src/assets/` 或 `public/` 中。
- **Markdown 擴充語法：** 瞭解詳細請閱讀 Mizuki Docs 的 [Markdown 擴充語法](https://docs.mizuki.mysqil.com/press/Markdown/customize/)。

Frontmatter 欄位說明：

- **title**: 文章標題（必需）
- **published**: 發佈日期（必需）
- **description**: 文章描述，用於 SEO 和預覽
- **image**: 封面圖片路徑（相對於文章檔案）
- **tags**: 標籤陣列，用於分類
- **category**: 文章分類
- **encrypted**: 設定為 `true` 加密文章，需在 `src/config/user.ts` 中開啟加密功能
- **password**: 密碼，用於加密文章
- **passwordHint**: 密碼提示，用於密碼輸框提示
- **draft**: 設定為 `true` 在生產環境中隱藏文章
- **comment**: 設定為 `true` 或 `false` 可控制當前文章的留言開關（需先在 `src/config/user.ts` 中開啟 Twikoo 留言系統）
- **pinned**: 設定為 `true` 將文章置頂
- **lang**: 文章語言（僅當與站點預設語言不同時設定）

8. **啟動開發伺服器：**

   ```bash
   pnpm dev
   ```

   部落格將在 `http://localhost:4321` 可用。

9. **升級 BrightMoon 部落格框架（可選）：**

   當有新版本發佈時，可使用內建升級工具進行升級：

   ```bash
   pnpm brightmoon-upgrade
   ```

   升級工具提供兩種升級方式與兩種備份功能：
   - **線上升級** - 從遠端倉庫自動下載最新 Release 並完成升級，支援選擇穩定版或預發佈版。
   - **本機升級** - 將下載的 `.zip` 壓縮包放入專案根目錄的 `update` 資料夾中，工具將自動解壓並完成升級。
   - **建立備份** - 手動建立專案完整備份，備份檔案儲存在 `backup` 目錄中。
   - **恢復備份** - 從 `backup` 目錄中選擇備份檔案恢復專案。

   升級前會自動建立備份並偵測防回滾，升級完成後會自動執行 `pnpm install` 安裝新依賴並清理暫存檔案。`src/config/user.ts` 中的使用者配置升級時受保護，無需手動遷移；`src/config/defaults.ts` 中的上游預設值會自動更新。

10. **所有指令都在專案根目錄執行：**

| 指令                      | 操作                                   |
| :------------------------ | :------------------------------------- |
| `pnpm install`            | 安裝依賴                               |
| `pnpm dev`                | 在 `localhost:4321` 啟動本地開發伺服器 |
| `pnpm build`              | 構建生產站點到 `./dist/`               |
| `pnpm preview`            | 在部署前本地預覽構建                   |
| `pnpm brightmoon-upgrade` | 執行 BrightMoon 部落格框架升級工具     |
| `pnpm check`              | 執行 Astro 錯誤檢查                    |
| `pnpm format`             | 使用 Biome 格式化程式碼                |
| `pnpm lint`               | 檢查並修復程式碼問題                   |
| `pnpm new-post <檔名>`    | 建立新部落格文章                       |
| `pnpm astro ...`          | 執行 Astro CLI 指令                    |

---

## 🙏 致謝

- [Mizuki](https://github.com/matsuzaka-yuki/Mizuki) – 基於 Fuwari 的二次開發增強版本，感謝提供現代化且功能豐富的靜態部落格模板。
- [Fuwari](https://github.com/saicaca/fuwari) by saicaca – 本專案所基於的原始模板。感謝您建立了如此優美且功能強大的模板。
- [Yukina](https://github.com/WhitePaper233/yukina) – 感謝提供設計靈感與創意，幫助塑造了此專案。Yukina 是一個展現卓越設計原則與使用者體驗的優雅部落格模板。
- [Firefly](https://github.com/CuteLeaf/Firefly) – 感謝提供優秀的版面設計思路，雙側邊欄佈局、文章雙欄網格等佈局，及部分小元件的設計與實現。
- [Twilight](https://github.com/spr-aachen/Twilight) – 感謝提供靈感與技術支援。Twilight 的動態桌布模式切換系統、響應式設計與過渡效果顯著提升了此專案。

---

⭐ 如有問題或建議，請提交 [Issue](https://github.com/Zuoyan233/BrightMoon/issues) 或 [Pull Request](https://github.com/Zuoyan233/BrightMoon/pulls)。另外，您也可以透過 [我的網站回饋頁面](https://www.zuoyanblogs.xyz/feedback/) 與我們聯繫。如果您覺得這個專案有幫助，請考慮給它一個星標！