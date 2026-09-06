# BrightMoon

<img align='right' src='./project-preview/images/logo.webp' width='200px' alt="BrightMoon logo">

BrightMoon は、モダンなミニマリズムと優雅さを融合した、獨特の二次元美學を備えた靜態ブログテンプレートです。[Astro](https://astro.build/) を基盤とし、先進的な機能と洗練されたビジュアルを一つに統合しています。

**_明月初めて昇るが如く、清らかな輝きは変わらず_** <br>
**_此処を始まりとし、新たに出発せん。_**

[![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)](https://nodejs.org/)
[![pnpm >= 11](https://img.shields.io/badge/pnpm-%3E%3D11-blue)](https://pnpm.io/)
[![Astro](https://img.shields.io/badge/Astro-7.2.9-orange)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)](https://www.typescriptlang.org/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?logo=apache)](https://opensource.org/licenses/Apache-2.0)

💻 私のウェブサイトへようこそ：[こちらをクリック](https://www.zuoyanblogs.xyz/)

🌐 README 言語：[简体中文](./README_zh_CN.md) &nbsp;|&nbsp; [繁體中文](./README_zh_Hant.md) &nbsp;|&nbsp; [English](./README.md)

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

## 📌 バージョン説明

本プロジェクトは Mizuki V8.2 をベースにカスタマイズ拡張開発されており、バージョン番号に BrightMoon Custom Edition（CE）のサフィックスを付与し、BrightMoon による軽度カスタマイズバージョンであることを示しています（現在流行のウェブサイトフレームワークを猛勉強中です。時間があるときに続けて取り組みます）。

---

## ✨ 機能特性

### 🔧 コンポーネント設定システムの再構築

- **階層型設定アーキテクチャ：** 設定は3層に分割：`src/config/defaults.ts`（上流デフォルト値、アップグレード時に自動更新）、`src/config/user.ts`（ユーザー設定、アップグレード時に保護）、`src/config/index.ts`（マージエントリ）。編集するのは `src/config/user.ts` のみ。
- **レスポンシブレイアウト対応：** コンポーネントがレスポンシブレイアウトをサポートし、デバイスタイプに応じて自動的に表示を調整。

### 📐 レイアウトシステムの最適化

- **サイドバー位置の動的調整：** 左右サイドバーの切り替えに対応し、レイアウトが自動適応。
- **記事目次のインテリジェント配置：** サイドバーが右側にある場合、記事目次は自動的に左側に移動し、より優れた読書体験を提供。
- **グリッドレイアウトの改善：** CSS Grid レイアウトを最適化し、コンテナ幅の異常問題を解決。
- **レスポンシブTOC：** 記事目次がレスポンシブデバイス設定に対応し、モバイル端末で自動的に表示を最適化。

### 🎛️ 設定ファイルフォーマットの標準化

- **標準化された設定フォーマット：** 統一されたコンポーネント設定ファイルフォーマット仕様を作成。
- **型安全性：** 完全な TypeScript 型定義により、設定の型安全性を確保。
- **拡張性：** カスタムコンポーネントタイプと設定オプションをサポート。

### 🧹 コード最適化

- **テストファイルのクリーンアップ：** 未使用のテスト設定と依存関係を削除し、プロジェクト容量を削減。
- **コード構造の最適化：** コンポーネントアーキテクチャを改善し、コードの保守性を向上。
- **パフォーマンス向上：** コンポーネントロードロジックを最適化し、ページレンダリングパフォーマンスを向上。
- **コンポーネントアニメーションの最適化：** 一部ウィジェットのアニメーションを最適化し、インタラクションの滑らかさを向上。

### 🎨 デザインとインターフェース

- **フレームワーク** - [Astro](https://astro.build) と [Tailwind CSS](https://tailwindcss.com) に基づいて構築。
- **アニメーション** - [Swup](https://swup.js.org/) を使用したスムーズなアニメーションとページ遷移。
- **マルチテーマモード** - ライト、ダーク、「システムに従う」の3モードに対応。ドロップダウンリストで自由に切替可能。
- **パンくずリスト** - 明確なナビゲーションパスを提供し、ユーザーが前の階層に簡単に戻れます。
- **外部リンク確認ダイアログ** - 外部リンククリック時に確認ダイアログを表示し、ブラウジングの安全性を向上。
- **パーソナライズ外観制御** - 壁紙モード、桜エフェクト、記事一覧レイアウト、ナビゲーションバースタイルなどの UI 制御をサポート。
  - カスタマイズ可能なテーマカラーと動的バナーカルーセル。
  - 透明度とブラー効果をサポートする全画面背景画像。
  - 全デバイス対応レスポンシブデザイン。
  - JetBrains Mono フォントによる美しいタイポグラフィ。
  - カレンダースタイルの最適化：左右切り替えアイコン、記事公開日のドット位置、同日複数記事の数字表示を改善。
- **ページスクロールバースタイル** - カスタムスクロールバーで全体のビジュアル統一を維持。

### 🔍 コンテンツと検索

- [Pagefind](https://pagefind.app/) に基づく高度な検索機能。
- シンタックスハイライトをサポートする[強化された Markdown 機能](https://docs.mizuki.mysqil.com/press/Markdown/Markdown/)。
- 自動スクロールをサポートするインタラクティブな目次。
- RSS および Atom フィード生成。
- 読了時間の推定。
- 記事カテゴリとタグシステム。

### 📱 特徴的なページ

- **アニメページ** - アニメ視聴進捗と評価を追跡。
- **フレンドリンクページ** - 友人サイトを美しいカードで表示。
- **アルバムページ** - 生活の中の素敵な瞬間を記録。
- **デバイスページ** - 使用デバイス情報を表示。
- **ダイアリーページ** - SNS感覚で日常の瞬間を共有。
- **アーカイブページ** - 整然とした記事タイムラインビュー。
- **アバウトページ** - カスタマイズ可能な自己紹介。
- **スポンサーページ** - サイト管理者を支援し、決済QRコード配置パスを統合。
- **フィードバックページ** - サイトへの意見・提案を提出し、サイト管理者と直接連絡（メール・友達QRコード）。
- **プロジェクト紹介ページ** - 開発プロジェクトのポートフォリオ。
- **スキル紹介ページ** - 技術スキルと専門知識。
- **タイムラインページ** - 成長の過程と重要なマイルストーン。

### 🛠 技術特性

- **強化されたコードブロック** - [Expressive Code](https://expressive-code.com/) に基づく。
- **数式サポート** - KaTeX レンダリング。
- **画像最適化** - PhotoSwipe ギャラリー統合。
- **SEO 最適化** - サイトマップとメタタグを含む。
- **パフォーマンス最適化** - 遅延読み込みとキャッシュメカニズム。
- **コメントシステム** - 最新版 Twikoo コメントシステムを統合、多次元設定に対応。
- **翻訳コンポーネント** - ローカル i18n 言語ライブラリ + translate.js を採用しミリ秒単位の翻訳を実現、14ヶ国のサイト言語テキストを内蔵。
- **天気ウィジェット** - WeatherAPI サービスを採用。7日間天気予報、IPベースの自動位置特定、手動での都市検索に対応。
- **Cookie 同意** - Cookie プライバシーポリシー確認バナー。同意/拒否に対応し、拒否時は不要なCookieを自動削除。
- **サイト統計** - 現在の日付（複数地域フォーマット対応）、季節、時間帯をリアルタイム表示。
- **画像体積縮小** - ビルド時に画像を自動的に圧縮し、画像フォーマットを WebP または AVIF 形式に変換することで、読み込み時間を短縮し、ユーザー体験を向上させます。
- **フレームワーク更新検出** - リモートリポジトリAPIを介して BrightMoon の新リリースを自動検出。安定版とプレリリース版の検出に対応し、新バージョン発見時にダイアログで通知。
- **フレームワークアップグレードツール** - オンラインとローカルの2つのアップグレード方式に対応。アップグレード前にバックアップを自動作成しロールバックを防止、アップグレード後に依存関係を自動インストールし一時ファイルをクリーンアップ。手動でのバックアップ作成とバックアップからの復元に対応。

---

## ⚡ プロジェクトの実行方法

1. **Node.js をインストール：** 本プロジェクトは Node.js 22 以上が必要です。

2. **Git をインストール：** 本プロジェクトは Git を使用しています。

3. **リポジトリのクローン：**

   ```bash
   git clone https://github.com/Zuoyan233/BrightMoon.git
   cd BrightMoon
   ```

4. **依存関係をインストール：**

   ```bash
   # pnpm がインストールされていない場合は、まずインストール
   npm install -g pnpm

   # プロジェクトの依存関係をインストール
   pnpm install
   ```

5. **ブログの設定：**

- `src/config/user.ts` を編集してブログ設定をカスタマイズ。
- サイト情報、テーマカラー、バナー画像、ソーシャルリンクを更新。
- 特徴的なページ機能を設定。

6. **特徴的なページ設定：**

- **アニメページ：** `src/pages/anime.astro` でアニメリストを編集。
- **フレンドリンクページ：** `src/content/spec/friends.md` でフレンドデータを編集。
- **アルバムページ：** `public/images/albums` でアルバム情報を編集。アルバム機能は**自動スキャン機構**を採用しており、フォルダを作成して画像と設定ファイルを配置するだけで、コードを書く必要はありません！

  <details>
  <summary><b>アルバム機能の使用説明</b>（クリックして展開）</summary>

  BrightMoon のフォトアルバム機能は**自動スキャン機構**を採用しています。フォルダを作成して画像と設定ファイルを配置するだけで、手動でコードを書く必要はありません（外部リンクアルバムの場合は各画像の `src` などの情報を手動で定義する必要があります）。

  ##### クイックスタート

  アルバムを作成するには以下の3ステップだけです：

  1. `public/images/albums/`（この説明ファイルのあるディレクトリ）の下にフォルダを作成します（フォルダ名＝アルバムID）
  2. フォルダに `cover.jpg`（カバー画像）とその他の写真を配置します
  3. `info.json` 設定ファイルを作成します

  完了！アルバムは自動的にアルバム一覧ページに表示されます。

  ##### ディレクトリ構造

  ```
  public/images/albums/
  ├── my-travel-2024/              # アルバムフォルダ（フォルダ名 = アルバムID）
  │   ├── info.json                # アルバム設定ファイル（必須）
  │   ├── cover.jpg                # カバー画像（必須）
  │   ├── photo1.jpg               # アルバム写真
  │   ├── photo2.jpg
  │   └── photo3.jpg
  ├── daily-life/                  # 別のアルバム
  │   ├── info.json
  │   ├── cover.jpg
  │   └── ...
  ```

  ##### 設定ファイルガイド

  **ローカル画像モード**

  アルバムフォルダに `info.json` を作成します：

  ```json
  {
    "title": "私の旅行アルバム",
    "description": "2024年の夏の美しい思い出",
    "date": "2024-08-01",
    "location": "日本 東京",
    "tags": ["旅行", "風景", "夏"],
    "layout": "masonry",
    "columns": 3,
    "hidden": false
  }
  ```

  **設定項目の説明：**

  | 項目 | 必須 | 説明 | デフォルト値 |
  |------|------|------|-------------|
  | `title` | はい | アルバムタイトル | フォルダ名を使用 |
  | `description` | いいえ | アルバム説明 | 空 |
  | `date` | いいえ | アルバム日付（形式：YYYY-MM-DD） | 現在の日付 |
  | `location` | いいえ | 撮影場所 | 空 |
  | `tags` | いいえ | タグ配列 | `[]` |
  | `layout` | いいえ | レイアウト方式：`grid`（グリッド）または `masonry`（メイソンリー） | `grid` |
  | `columns` | いいえ | 列数（2-4） | `3` |
  | `hidden` | いいえ | アルバムを非表示にするかどうか | `false` |

  **外部リンク画像モード**

  外部画像リンクを使用したい場合（例：画像ホスティングサービス）、`mode: "external"` を設定します：

  ```json
  {
    "mode": "external",
    "title": "外部リンクアルバム例",
    "description": "外部画像リンクを使用したアルバム",
    "date": "2024-08-28",
    "location": "インターネット",
    "tags": ["外部リンク", "例"],
    "layout": "masonry",
    "columns": 3,
    "cover": "https://example.com/cover.jpg",
    "photos": [
      {
        "id": "photo-1",
        "src": "https://example.com/photo1.jpg",
        "alt": "画像説明",
        "title": "画像タイトル",
        "description": "詳細説明",
        "tags": ["タグ1"],
        "width": 1920,
        "height": 1280
      }
    ]
  }
  ```

  **外部モードの追加項目：**

  | 項目 | 必須 | 説明 |
  |------|------|------|
  | `mode` | はい | `"external"` に設定して外部モードを有効化 |
  | `cover` | はい | カバー画像URL（外部モードのみ必要） |
  | `photos` | はい | 写真配列。各写真には `src`、`alt`、`title` などが含まれます。下表参照 |

  **photos 配列内の各写真オブジェクトの項目（外部モードのみ）：**

  | 項目 | 必須 | 説明 | 例 |
  |------|------|------|-----|
  | `id` | いいえ | 写真の一意識別子 | `"photo-1"` |
  | `src` | はい | 写真のURL | `"https://example.com/photo.jpg"` |
  | `thumbnail` | いいえ | サムネイルURL（指定しない場合は元画像を使用） | `"https://example.com/thumb.jpg"` |
  | `alt` | いいえ | 代替テキスト（アクセシビリティ用） | `"美しい夕焼け"` |
  | `title` | いいえ | 写真タイトル | `"海辺の夕焼け"` |
  | `description` | いいえ | 写真の詳細説明 | `"2024年の夏に海辺で撮影した夕焼け"` |
  | `tags` | いいえ | 写真タグ配列 | `["夕焼け", "海辺"]` |
  | `date` | いいえ | 撮影日（形式：YYYY-MM-DD） | `"2024-08-01"` |
  | `location` | いいえ | 撮影場所 | `"沖縄ビーチ"` |
  | `width` | いいえ | 写真幅（ピクセル） | `1920` |
  | `height` | いいえ | 写真高さ（ピクセル） | `1280` |
  | `camera` | いいえ | カメラモデル | `"Canon EOS R5"` |
  | `lens` | いいえ | レンズモデル | `"RF 24-70mm F2.8"` |
  | `settings` | いいえ | 撮影設定（文字列） | `"f/2.8, 1/500s, ISO 100"` |

  > **注意：**
  > - ローカル画像モードでは `photos` 項目を設定する**必要はありません**。システムがフォルダ内の全画像ファイルを自動スキャンします
  > - 外部モードでは `photos` 配列を**必ず**手動で設定する必要があり、最低限 `src` 項目が必要です
  > - 外部写真には読み込み速度向上のため `thumbnail` サムネイルを設定することをお勧めします

  ##### 画像フォーマット推奨事項

  **カバー画像 (cover.jpg)：**
  - **サイズ**：800×600px（4:3 比率）
  - **フォーマット**：JPG（外部モードはより多くのフォーマットをサポート）
  - **サイズ**：200KB未満を推奨

  **アルバム写真：**
  - **フォーマット**：JPG、JPEG、PNG、WebP、GIF、SVG、AVIF
  - **サイズ**：最大幅 1920px を推奨
  - **最適化**：アップロード前に圧縮して読み込み速度を向上させてください

  ##### レイアウトオプション

  **グリッドレイアウト (Grid)：**
  ```json
  { "layout": "grid", "columns": 3 }
  ```
  - サイズが統一された写真に適しています、2-4列をサポート、写真は正方形にクロップされます

  **メイソンリーレイアウト (Masonry)：**
  ```json
  { "layout": "masonry", "columns": 3 }
  ```
  - サイズが異なる写真に適しています、元の比率を維持、自動配置により自然な見た目

  ##### 高度な機能

  **ファイル名タグ（実験的）**

  システムはファイル名からのタグ解析をサポートしています（形式：`基本名_タグ1_タグ2.ext`）：
  ```
  photo_sunset_beach.jpg  →  タグ：sunset, beach
  ```

  **非表示アルバム**

  `"hidden": true` を設定するとアルバムを非表示にできますが、直接URLからアクセス可能です：
  ```
  アクセス：/albums/your-album-id/
  ```

  ##### よくある質問

  **Q: 私のアルバムが表示されないのはなぜですか？**  
  A: `info.json` と `cover.jpg` が存在するか、および `hidden` が `true` に設定されていないか確認してください。

  **Q: 他の画像フォーマットは使用できますか？**  
  A: はい、JPG、PNG、WebP、GIF、SVG、AVIF などのフォーマットをサポートしています。

  **Q: 画像の読み込み速度をどのように最適化できますか？**  
  A: WebP など圧縮率の高いフォーマットの使用をお勧めします。外部モードではサムネイルを設定してください。

  **Q: アルバムの並び順序を変更するにはどうすればよいですか？**  
  A: アルバムは時系列順に表示されます。アルバムの `date` 項目を変更して並び順を調整できます。

  </details>

- **デバイスページ：** `src/data/devices.ts` でデバイス情報を編集。
- **ダイアリーページ：** `src/data/diary.ts` で投稿を編集。
- **アバウトページ：** `src/content/spec/about.md` でコンテンツを編集。
- **スポンサーページ：** `src/content/spec/sponsors.md` でコンテンツを編集。
  - `src/config/user.ts` 内の `addpaymentConfig` で決済QRコードを設定。QRコード画像の保存先は `public/images/sponsors`。
- **フィードバックページ：** `src/content/spec/feedback.md` でコンテンツを編集。
  - `src/config/user.ts` 内の `contactEmailConfig` でサイト管理者のメールアドレスを設定。
  - `src/config/user.ts` 内の `addfriendConfig` で友達追加QRコードを設定。QRコード画像の保存先は `public/images/contact`。
- **プロジェクト紹介ページ：** `src/data/projects.ts` で表示コンテンツを編集。
- **スキル紹介ページ：** `src/data/skills.ts` で表示コンテンツを編集。
- **タイムラインページ：** `src/data/timeline.ts` で表示コンテンツを編集。

7. **記事コンテンツ管理：**

- **新規記事作成：** `pnpm new-post <ファイル名>`。
- **記事編集：** `src/content/posts/` 内のファイルを修正。
- **カスタムページ：** `src/content/spec/` 内の特殊ページを編集。
- **画像追加：** 画像を `src/assets/` または `public/` に配置。
- **Markdown 拡張構文：** 詳細は Mizuki Docs の [Markdown 拡張構文](https://docs.mizuki.mysqil.com/press/Markdown/customize/) を参照。

Frontmatter フィールド説明：

- **title**: 記事タイトル（必須）
- **published**: 公開日（必須）
- **description**: 記事の説明、SEOおよびプレビュー用
- **image**: カバー画像パス（記事ファイルからの相対パス）
- **tags**: 分類用タグ配列
- **category**: 記事カテゴリ
- **encrypted**: `true` に設定すると、記事を暗号化（`src/config/user.ts` で暗号化機能を有効にする必要あり）
- **password**: 記事の暗号化パスワード
- **passwordHint**: 記事の暗号化パスワードヒント
- **draft**: `true` に設定すると、本番環境で記事を非表示
- **comment**: `true` または `false` に設定すると、現在の記事のコメントON/OFFを制御（事前に `src/config/user.ts` で Twikoo コメントシステムを有効にする必要あり）
- **pinned**: `true` に設定すると記事をトップに固定
- **lang**: 記事の言語（サイトデフォルト言語と異なる場合のみ設定）

8. **開発サーバーの起動：**

   ```bash
   pnpm dev
   ```

   ブログは `http://localhost:4321` で利用可能。

9. **BrightMoon ブログフレームワークのアップグレード（任意）：**

   新バージョンがリリースされた場合、内蔵アップグレードツールを使用できます：

   ```bash
   pnpm brightmoon-upgrade
   ```

   アップグレードツールは2つのアップグレード方式と2つのバックアップ機能を提供します：
   - **オンラインアップグレード** - リモートリポジトリから最新の Release を自動ダウンロードし、アップグレードを完了します。安定版またはプレリリース版の選択に対応。
   - **ローカルアップグレード** - ダウンロードした `.zip` アーカイブをプロジェクトルートの `update` フォルダに配置すると、ツールが自動的に展開しアップグレードを完了します。
   - **バックアップ作成** - プロジェクト全体の手動バックアップを作成し、`backup` ディレクトリに保存します。
   - **バックアップ復元** - `backup` ディレクトリからバックアップファイルを選択してプロジェクトを復元します。

   アップグレード前にバックアップが自動作成され、ロールバックが防止されます。アップグレード後は `pnpm install` が自動的に実行され、新しい依存関係がインストールされ、一時ファイルがクリーンアップされます。アップグレード処理中、`src/config/user.ts` 内のユーザー設定は保護され、手動での移行は不要です。`src/config/defaults.ts` 内のアップストリームのデフォルト値は自動的に更新されます。

10. **全コマンドはプロジェクトルートディレクトリで実行：**

| コマンド                     | 操作                                                      |
| :--------------------------- | :-------------------------------------------------------- |
| `pnpm install`               | 依存関係のインストール                                    |
| `pnpm dev`                   | `localhost:4321` でローカル開発サーバー起動               |
| `pnpm build`                 | 本番サイトを `./dist/` にビルド                           |
| `pnpm preview`               | デプロイ前にローカルでビルドをプレビュー                  |
| `pnpm brightmoon-upgrade`    | BrightMoon ブログフレームワークアップグレードツールを実行 |
| `pnpm check`                 | Astro エラーチェック実行                                  |
| `pnpm format`                | Biome を使用してコードフォーマット                        |
| `pnpm lint`                  | コード問題のチェックと修正                                |
| `pnpm optimize-images`       | 画像体積圧縮ツールを実行                                  |
| `pnpm new-post <ファイル名>` | 新規ブログ記事作成                                        |
| `pnpm astro ...`             | Astro CLI コマンド実行                                    |

---

## 🙏 謝辞

- [Mizuki](https://github.com/matsuzaka-yuki/Mizuki) - Fuwari に基づく二次開発強化版。モダンで多機能な静的ブログテンプレートを提供してくださり感謝します。
- [Fuwari](https://github.com/saicaca/fuwari) by saicaca - 本プロジェクトの基盤となったオリジナルテンプレート。このように美しく強力なテンプレートを作成してくださり感謝します。
- [Yukina](https://github.com/WhitePaper233/yukina) - 本プロジェクトの形成に寄与したデザインインスピレーションとアイデアを提供してくださり感謝します。Yukina は優れたデザイン原則とユーザーエクスペリエンスを示すエレガントなブログテンプレートです。
- [Firefly](https://github.com/CuteLeaf/Firefly) - 両側サイドバーレイアウト、記事二列グリッドなどの優れたレイアウトデザインアイデア、および一部ウィジェットの設計と実装を提供してくださり感謝します。
- [Twilight](https://github.com/spr-aachen/Twilight) - インスピレーションと技術サポートを提供してくださり感謝します。Twilight の動的壁紙モード切替システム、レスポンシブデザイン、トランジション効果は本プロジェクトを大幅に向上させました。

---

⭐ ご質問やご提案がございましたら、[Issue](https://github.com/Zuoyan233/BrightMoon/issues) または [Pull Request](https://github.com/Zuoyan233/BrightMoon/pulls) を作成してください。また、[私のウェブサイトのフィードバックページ](https://www.zuoyanblogs.xyz/feedback/) からもご連絡いただけます。このプロジェクトがお役に立ちましたら、ぜひスターを付けてください！