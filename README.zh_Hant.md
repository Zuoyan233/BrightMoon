# BrightMoon
<img align='right' src='./example project show/images/logo.webp' width='200px' alt="BrightMoon logo">

BrightMoon 是一款融合現代簡約與優雅氣質的獨特二次元美學靜態部落格模板。專案以 [Astro](https://astro.build/) 為構建基石，將先進功能與精美視覺融為一體。

***如明月初升，清輝如故*** </br>
***以此為始，重新出發。***

[![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)](https://nodejs.org/)
[![pnpm >= 11](https://img.shields.io/badge/pnpm-%3E%3D11-blue)](https://pnpm.io/)
[![Astro](https://img.shields.io/badge/Astro-6.3.1-orange)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)](https://www.typescriptlang.org/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?logo=apache)](https://opensource.org/licenses/Apache-2.0)

💻 歡迎進入我的網站參觀：[點擊進入](https://www.zuoyanblogs.xyz/)

🌐 README 語言：[简体中文](./README.zh_CN.md) &nbsp; [English](./README.en.md) &nbsp; [日本語](./README.jp.md)

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

## 🔄 本專案的更新頻率

不定期同步更新 Mizuki 主題框架主線內容。未來計畫在框架功能基礎上進行客製化修改，版本號將統一以 BrightMoon Custom Edition（CE）作為後綴，代表其為 BrightMoon 的輕度客製版本（目前在惡補學習市面上流行的網站框架，要等有空才行，嗚嗚嗚~~~）。

---

## 🛠 本專案魔改的內容

- 添加十個國家的站點語言文本，未來站點更新時將同步更新語言文本。
- 添加多語言國際翻譯元件：
  - 魔改 mobile-navbar 樣式表以適應 translate 面板樣式。
- 修改日曆樣式，並魔改成最舒服的外觀：
  - 更改左右切換的圖示。
  - 調整文章發佈的底部小圓點位置。
  - 調整右上角同天發佈多篇文章的數字大小。
- 添加回饋頁面，並整合聯絡站長方式。
- 添加贊助頁面，並整合支付 QR Code 放置路徑。
- 新增站點統計的即時日期、季節與時間，日期與季節顯示支援多地區格式，時間支援時段顯示。
- 添加外部連結確認彈窗，並魔改部分樣式。
- 新增頁面滾動條樣式。
- 重構個人化配置，新增桌布模式、櫻花特效、文章列表佈局、導航列樣式的 UI 控制。
- 加入「跟隨系統」主題模式，支援下拉式選單選擇主題。
- 將 bangumi 與 bilibili 設定整合至 anime 設定項下。
- 更新並適配最新版本的 Twikoo 留言系統。
- TOC 目錄支援響應式裝置配置。
- 重構隱藏相簿邏輯，修復無法透過連結存取的問題。
- 優化部分小元件動畫。

---

## ✨ 功能特性

想了解更多 Mizuki 的功能特性：[進入 Mizuki Docs 官方網站](https://docs.mizuki.mysqil.com/)

### 🔧 元件配置系統重構

- **統一配置架構：** 全新的模組化元件配置體系，支援動態元件管理和順序配置。
- **配置驅動的元件載入：** 重構 SideBar 元件，實現完全基於配置的元件載入機制。
- **統一控制開關：** 移除音樂播放器和公告元件的獨立 enable 開關，統一由 sidebarLayoutConfig 控制。
- **響應式佈局適配：** 元件支援響應式佈局，可根據裝置類型自動調整顯示。

### 📐 佈局系統最佳化

- **側邊欄位置動態調整：** 支援左右側邊欄切換，佈局自動適配。
- **文章目錄智慧定位：** 當側邊欄在右側時，文章導航自動移至左側，提供更好的閱讀體驗。
- **網格佈局改進：** 最佳化 CSS Grid 佈局，解決容器寬度異常問題。

### 🎛️ 設定檔格式標準化

- **標準化設定格式：** 建立統一的元件設定檔格式規範。
- **型別安全：** 完善的 TypeScript 型別定義，確保設定的型別安全。
- **可擴充套件性：** 支援自訂元件型別和設定選項。

### 🧹 程式碼最佳化

- **測試檔案清理：** 移除未使用的測試配置和依賴，減少專案體積。
- **程式碼結構最佳化：** 改進元件架構，提升程式碼可維護性。
- **效能提升：** 最佳化元件載入邏輯，提升頁面渲染效能。

### 🎨 設計與介面

- 基於 [Astro](https://astro.build) 和 [Tailwind CSS](https://tailwindcss.com) 建置。
- 使用 [Swup](https://swup.js.org/) 實現流暢的動畫和頁面過渡。
- 明暗主題切換，支援系統偏好檢測。
- 可自訂主題色彩和動態橫幅輪播。
- 全螢幕背景圖片，支援輪播、透明度和模糊效果。
- 全裝置響應式設計。
- 使用 JetBrains Mono 字型的美觀排版。

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
- **贊助頁面** - 贊助站長支援優質創作。
- **回饋頁面** - 提交網站意見建議，與站長直接溝通。
- **專案展示頁面** - 開發專案作品集。
- **技能展示頁面** - 技術技能和專業知識。
- **時間線頁面** - 成長歷程和重要里程碑。

### 🛠 技術特性

- **增強程式碼區塊** - 基於 [Expressive Code](https://expressive-code.com/)。
- **數學公式支援** - KaTeX 渲染。
- **圖片最佳化** - PhotoSwipe 畫廊整合。
- **SEO 最佳化** - 包含站點地圖和元標籤。
- **效能最佳化** - 延遲載入和快取機制。
- **留言系統** - 支援 Twikoo 整合。
- **翻譯組件** - 採用本地 i18n 語言庫 + translate.js 實現毫秒級翻譯。

---

## ⚡ 如何執行本專案？

1. **複製倉庫：**

   ```bash
   git clone https://github.com/Zuoyan233/BrightMoon.git
   cd BrightMoon
   ```

2. **安裝依賴：**

   ```bash
   # 如果沒有安裝 pnpm，先安裝
   npm install -g pnpm

   # 安裝專案依賴
   pnpm install
   ```

3. **設定部落格：**

- 編輯 `src/config.ts` 自訂部落格設定。
- 更新站點資訊、主題色彩、橫幅圖片和社交連結。
- 設定特色頁面功能。
- (可選) 設定內容倉庫分離 - 瞭解詳細請閱讀 Mizuki Docs 的 [內容倉庫配置](https://docs.mizuki.mysqil.com/Other/separation/)。

4. **特色頁面配置：**

- **追番頁面：** 在 `src/pages/anime.astro` 中編輯動畫列表。
- **友鏈頁面：** 在 `src/content/spec/friends.md` 中編輯朋友資料。
- **相簿頁面：** 在 `public/images/albums` 中編輯相簿資訊，如何使用請前往 [相簿功能使用說明](./public/images/albums/README.md)。
- **我的裝置頁面：** 在 `src/data/devices.ts` 中編輯裝置資訊。
- **日記頁面：** 在 `src/data/diary.ts` 中編輯動態。
- **關於頁面：** 在 `src/content/spec/about.md` 中編輯內容。
- **贊助頁面：** 在 `src/content/spec/sponsors.md` 中編輯內容。
  - 在 `src/config.ts` 中找到 `addpaymentConfig` 配置支付 QR Code，支付 QR Code 存放路徑在 `public/images/sponsors` 內。
- **回饋頁面：** 在 `src/content/spec/feedback.md` 中編輯內容。
  - 在 `src/config.ts` 中找到 `contactEmailConfig` 配置站長電子郵件聯絡方式。
  - 在 `src/config.ts` 中找到 `addfriendConfig` 設定，用以加入好友 QR Code。QR Code 的存放路徑位於 `public/images/contact` 內。
- **專案展示頁面：** 在 `src/data/projects.ts` 中編輯展示的內容。
- **技能展示頁面：** 在 `src/data/skills.ts` 中編輯展示的內容。
- **時間線頁面：** 在 `src/data/timeline.ts` 中編輯展示的內容。

5. **文章內容管理：**

- **建立新文章：** `pnpm new-post <檔名>`。
- **編輯文章：** 修改 `src/content/posts/` 中的檔案。
- **自訂頁面：** 編輯 `src/content/spec/` 中的特殊頁面。
- **新增圖片：** 將圖片放在 `src/assets/` 或 `public/` 中。
- **Markdown 擴充套件語法:** 瞭解詳細請閱讀 Mizuki Docs 的 [Markdown 擴充套件語法](https://docs.mizuki.mysqil.com/press/Markdown/customize/)。

Frontmatter 欄位說明：

- **title**: 文章標題（必需）
- **published**: 發佈日期（必需）
- **description**: 文章描述，用於 SEO 和預覽
- **image**: 封面圖片路徑（相對於文章檔案）
- **tags**: 標籤陣列，用於分類
- **category**: 文章分類
- **draft**: 設定為 `true` 在生產環境中隱藏文章
- **comment**: 設定為 `true` 或 `false` 可控制當前文章的留言開關（需先在 `src/config.ts` 中開啟 Twikoo 留言系統）
- **pinned**: 設定為 `true` 將文章置頂
- **lang**: 文章語言（僅當與站點預設語言不同時設定）

6. **啟動開發伺服器：**

   ```bash
   pnpm dev
   ```

   部落格將在 `http://localhost:4321` 可用。

7. **所有指令都在專案根目錄執行：**

| 指令                   | 操作                                   |
| :--------------------- | :------------------------------------- |
| `pnpm install`         | 安裝依賴                               |
| `pnpm dev`             | 在 `localhost:4321` 啟動本地開發伺服器 |
| `pnpm build`           | 構建生產站點到 `./dist/`               |
| `pnpm preview`         | 在部署前本地預覽構建                   |
| `pnpm check`           | 執行 Astro 錯誤檢查                    |
| `pnpm format`          | 使用 Biome 格式化程式碼                |
| `pnpm lint`            | 檢查並修復程式碼問題                   |
| `pnpm new-post <檔名>` | 建立新部落格文章                       |
| `pnpm astro ...`       | 執行 Astro CLI 指令                    |

為了給開發者提供更流暢、熟悉的體驗，我們依然選擇 Biome 來處理程式碼格式化和修復程式碼。

儘管 Mizuki 7.6 版本後改為使用 Prettier + ESLint，但我們認為 Biome 的「開箱即用」特性與我們的工作流程匹配得更好，避免了額外的配置成本。

---

## 🙏 致謝

- [Mizuki](https://github.com/matsuzaka-yuki/Mizuki) – 基於 Fuwari 的增強版本。感謝您提供現代化且功能豐富的靜態部落格模板。
- [Fuwari](https://github.com/saicaca/fuwari) by saicaca – 本專案所基於的原始模板。感謝您創建了如此優美且功能強大的模板。
- [Yukina](https://github.com/WhitePaper233/yukina) – 感謝您提供的設計靈感與創意，協助塑造了此專案。Yukina 是一個展現卓越設計原則與使用者體驗的優雅部落格模板。
- [Firefly](https://github.com/CuteLeaf/Firefly) – 感謝您提供優秀的版面設計思路，如雙側邊欄佈局、文章雙欄網格等，以及部分小元件的設計與實現。
- [Twilight](https://github.com/spr-aachen/Twilight) – 感謝您提供的靈感與技術支援。Twilight 的動態桌布模式切換系統、響應式設計與過渡效果，顯著提升了此專案。

---

⭐ 如有問題或建議，請提交 [Issue](https://github.com/Zuoyan233/BrightMoon/issues) 或 [Pull Request](https://github.com/Zuoyan233/BrightMoon/pulls)。另外，您也可以透過 [我的網站反饋頁面](https://www.zuoyanblogs.xyz/feedback/) 與我們聯繫。如果您覺得這個專案有幫助，請考慮給它一個星標！
