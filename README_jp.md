# BrightMoon

<img align='right' src='./project-preview/images/logo.webp' width='200px' alt="BrightMoon logo">

BrightMoon は、モダンなミニマリズムと優雅さを融合した、獨特の二次元美學を備えた靜態ブログテンプレートです。[Astro](https://astro.build/) を基盤とし、先進的な機能と洗練されたビジュアルを一つに統合しています。

**_明月初めて昇るが如く、清らかな輝きは変わらず_** <br>
**_此処を始まりとし、新たに出発せん。_**

[![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)](https://nodejs.org/)
[![pnpm >= 11](https://img.shields.io/badge/pnpm-%3E%3D11-blue)](https://pnpm.io/)
[![Astro](https://img.shields.io/badge/Astro-7.0.3-orange)](https://astro.build/)
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

- **設定統合：** 全コンポーネント設定項目を `src/config.ts` に一元管理。
- **アルバムロジックの再構築：** 隠しアルバムロジックを再構築し、リンク経由でアクセスできない問題を修正。
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
- **フレームワーク更新検出** - 更新サービスAPIを介して BrightMoon の新リリースを自動検出。安定版とプレリリース版の検出に対応し、新バージョン発見時にダイアログで通知。

---

## ⚡ プロジェクトの実行方法

1. **リポジトリのクローン：**

   ```bash
   git clone https://github.com/Zuoyan233/BrightMoon.git
   cd BrightMoon
   ```

2. **依存関係をインストール：**

   ```bash
   # pnpm がインストールされていない場合は、まずインストール
   npm install -g pnpm

   # プロジェクトの依存関係をインストール
   pnpm install
   ```

3. **ブログの設定：**

- `src/config.ts` を編集してブログ設定をカスタマイズ。
- サイト情報、テーマカラー、バナー画像、ソーシャルリンクを更新。
- 特徴的なページ機能を設定。

4. **特徴的なページ設定：**

- **アニメページ：** `src/pages/anime.astro` でアニメリストを編集。
- **フレンドリンクページ：** `src/content/spec/friends.md` でフレンドデータを編集。
- **アルバムページ：** `public/images/albums` でアルバム情報を編集。使用方法は [アルバム機能の使用説明](./public/images/albums/README.md) を参照。
- **デバイスページ：** `src/data/devices.ts` でデバイス情報を編集。
- **ダイアリーページ：** `src/data/diary.ts` で投稿を編集。
- **アバウトページ：** `src/content/spec/about.md` でコンテンツを編集。
- **スポンサーページ：** `src/content/spec/sponsors.md` でコンテンツを編集。
  - `src/config.ts` 内の `addpaymentConfig` で決済QRコードを設定。QRコード画像の保存先は `public/images/sponsors`。
- **フィードバックページ：** `src/content/spec/feedback.md` でコンテンツを編集。
  - `src/config.ts` 内の `contactEmailConfig` でサイト管理者のメールアドレスを設定。
  - `src/config.ts` 内の `addfriendConfig` で友達追加QRコードを設定。QRコード画像の保存先は `public/images/contact`。
- **プロジェクト紹介ページ：** `src/data/projects.ts` で表示コンテンツを編集。
- **スキル紹介ページ：** `src/data/skills.ts` で表示コンテンツを編集。
- **タイムラインページ：** `src/data/timeline.ts` で表示コンテンツを編集。

5. **記事コンテンツ管理：**

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
- **draft**: `true` に設定すると、本番環境で記事を非表示
- **comment**: `true` または `false` に設定すると、現在の記事のコメントON/OFFを制御（事前に `src/config.ts` で Twikoo コメントシステムを有効にする必要あり）
- **pinned**: `true` に設定すると記事をトップに固定
- **lang**: 記事の言語（サイトデフォルト言語と異なる場合のみ設定）

6. **開発サーバーの起動：**

   ```bash
   pnpm dev
   ```

   ブログは `http://localhost:4321` で利用可能。

7. **全コマンドはプロジェクトルートディレクトリで実行：**

| コマンド                     | 操作                                        |
| :--------------------------- | :------------------------------------------ |
| `pnpm install`               | 依存関係のインストール                      |
| `pnpm dev`                   | `localhost:4321` でローカル開発サーバー起動 |
| `pnpm build`                 | 本番サイトを `./dist/` にビルド             |
| `pnpm preview`               | デプロイ前にローカルでビルドをプレビュー    |
| `pnpm check`                 | Astro エラーチェック実行                    |
| `pnpm format`                | Biome を使用してコードフォーマット          |
| `pnpm lint`                  | コード問題のチェックと修正                  |
| `pnpm new-post <ファイル名>` | 新規ブログ記事作成                          |
| `pnpm astro ...`             | Astro CLI コマンド実行                      |

---

## 🙏 謝辞

- [Mizuki](https://github.com/matsuzaka-yuki/Mizuki) - Fuwari に基づく二次開発強化版。モダンで多機能な静的ブログテンプレートを提供してくださり感謝します。
- [Fuwari](https://github.com/saicaca/fuwari) by saicaca - 本プロジェクトの基盤となったオリジナルテンプレート。このように美しく強力なテンプレートを作成してくださり感謝します。
- [Yukina](https://github.com/WhitePaper233/yukina) - 本プロジェクトの形成に寄与したデザインインスピレーションとアイデアを提供してくださり感謝します。Yukina は優れたデザイン原則とユーザーエクスペリエンスを示すエレガントなブログテンプレートです。
- [Firefly](https://github.com/CuteLeaf/Firefly) - 両側サイドバーレイアウト、記事二列グリッドなどの優れたレイアウトデザインアイデア、および一部ウィジェットの設計と実装を提供してくださり感謝します。
- [Twilight](https://github.com/spr-aachen/Twilight) - インスピレーションと技術サポートを提供してくださり感謝します。Twilight の動的壁紙モード切替システム、レスポンシブデザイン、トランジション効果は本プロジェクトを大幅に向上させました。

---

⭐ ご質問やご提案がございましたら、[Issue](https://github.com/Zuoyan233/BrightMoon/issues) または [Pull Request](https://github.com/Zuoyan233/BrightMoon/pulls) を作成してください。また、[私のウェブサイトのフィードバックページ](https://www.zuoyanblogs.xyz/feedback/) からもご連絡いただけます。このプロジェクトがお役に立ちましたら、ぜひスターを付けてください！
