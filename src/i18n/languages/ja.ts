import Key from "../i18nKey";
import type { Translation } from "../translation";

export const ja: Translation = {
	[Key.home]: "ホーム",
	[Key.about]: "概要",
	[Key.archive]: "アーカイブ",
	[Key.search]: "検索",
	[Key.feedback]: "フィードバック",
	[Key.other]: "その他",

	// 翻訳パネルのタイトル
	[Key.translateHeader]: "言語を選択",

	// ナビゲーションバーのタイトル
	[Key.navLinks]: "リンク",
	[Key.navMy]: "マイ",
	[Key.navAbout]: "概要",
	[Key.sponsors]: "スポンサー",
	[Key.navOthers]: "その他",

	[Key.tags]: "タグ",
	[Key.categories]: "カテゴリ",
	[Key.recentPosts]: "最近の投稿",

	// 目次
	[Key.tocTitle]: "目次",

	// お知らせ
	[Key.announcement]: "お知らせ",
	[Key.announcementClose]: "閉じる",

	[Key.comments]: "コメント",
	[Key.friends]: "フレンズ",
	[Key.friendsSubtitle]: "素晴らしいウェブサイトを発見しよう",
	[Key.friendsSearchPlaceholder]: "名前や説明で検索...",
	[Key.friendsFilterAll]: "すべて",
	[Key.friendsNoResults]: "該当する友達が見つかりません",
	[Key.friendsVisit]: "訪問",
	[Key.friendsCopyLink]: "リンクをコピー",
	[Key.friendsCopySuccess]: "コピーしました",
	[Key.friendsTags]: "タグ",
	[Key.untitled]: "無題",
	[Key.uncategorized]: "未分類",
	[Key.noTags]: "タグなし",

	[Key.wordCount]: "単語",
	[Key.wordsCount]: "単語",
	[Key.minuteCount]: "分",
	[Key.minutesCount]: "分",
	[Key.postCount]: "投稿",
	[Key.postsCount]: "投稿",

	[Key.appearance]: "外観設定",
	[Key.themeSwitch]: "テーマ切り替え",
	[Key.themeColor]: "テーマカラー",
	[Key.sakuraEffect]: "桜エフェクト",
	[Key.wavesEffect]: "波紋エフェクト",
	[Key.wavesPerformanceMode]: "パフォーマンスモード",

	[Key.lightMode]: "ライト",
	[Key.darkMode]: "ダーク",
	[Key.systemMode]: "システム",

	[Key.more]: "もっと見る",

	[Key.author]: "著者",
	[Key.publishedAt]: "公開日",
	[Key.license]: "ライセンス",
	[Key.anime]: "アニメ",
	[Key.diary]: "日記",

	// アニメページ
	[Key.animeTitle]: "マイアニメリスト",
	[Key.animeSubtitle]: "アニメの記録",
	[Key.animeStatusWatching]: "視聴中",
	[Key.animeStatusCompleted]: "完了",
	[Key.animeStatusPlanned]: "計画中",
	[Key.animeStatusOnHold]: "一時停止",
	[Key.animeStatusDropped]: "視聴中止",
	[Key.animeFilterAll]: "すべて",
	[Key.animeYear]: "年",
	[Key.animeStudio]: "スタジオ",
	[Key.animeEmpty]: "アニメデータはありません",
	[Key.animeEmptyBangumi]:
		"Bangumiの設定またはネットワーク接続を確認してください",
	[Key.animeEmptyBilibili]:
		"Bilibiliデータが空です。`pnpm run update-bilibili` を実行してデータを取得してください",
	[Key.animeSetBangumiUserId]:
		"src/config/user.ts ファイルにあなたのBangumiユーザーIDを設定してください",
	[Key.animeSetBilibiliVmId]:
		"src/config/user.ts ファイルにあなたのBilibili vmIDを設定してください",
	[Key.animeEmptyLocal]:
		"src/data/anime.ts ファイルにアニメ情報を追加してください",

	// 日記ページ
	[Key.diarySubtitle]: "いつでもどこでも、生活を共有",
	[Key.diaryCount]: "件の日記",
	[Key.diaryReply]: "返信",
	[Key.diaryTips]: "最新の30件の日記のみ表示",
	[Key.diaryMinutesAgo]: "分前",
	[Key.diaryHoursAgo]: "時間前",
	[Key.diaryDaysAgo]: "日前",

	// 404ページ
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "ページが見つかりません",
	[Key.notFoundDescription]:
		"お探しのページは存在しないか、移動された可能性があります。",
	[Key.backToHome]: "ホームに戻る",

	// ミュージックプレイヤー
	[Key.musicPlayer]: "ミュージックプレイヤー",
	[Key.musicPlayerShow]: "ミュージックプレイヤーを表示",
	[Key.musicPlayerHide]: "ミュージックプレイヤーを非表示",
	[Key.musicPlayerExpand]: "ミュージックプレイヤーを拡大",
	[Key.musicPlayerCollapse]: "ミュージックプレイヤーを縮小",
	[Key.musicPlayerPause]: "一時停止",
	[Key.musicPlayerPlay]: "再生",
	[Key.musicPlayerPrevious]: "前へ",
	[Key.musicPlayerNext]: "次へ",
	[Key.musicPlayerShuffle]: "シャッフル",
	[Key.musicPlayerRepeat]: "全曲リピート",
	[Key.musicPlayerRepeatOne]: "一曲リピート",
	[Key.musicPlayerVolume]: "音量調整",
	[Key.musicPlayerMute]: "ミュート",
	[Key.musicPlayerUnmute]: "ミュート解除",
	[Key.musicPlayerProgress]: "再生状況",
	[Key.musicPlayerCover]: "ジャケット",
	[Key.musicPlayerPlaylist]: "プレイリスト",
	[Key.musicPlayerLoading]: "読み込み中...",
	[Key.musicPlayerErrorPlaylist]: "プレイリストの取得に失敗しました",
	[Key.musicPlayerErrorSong]:
		"現在の曲の読み込みに失敗しました。次の曲を試します",
	[Key.musicPlayerErrorEmpty]: "プレイリストに利用可能な曲がありません",
	[Key.musicPlayerLyrics]: "歌詞",
	[Key.musicPlayerLyricsShow]: "歌詞を表示",
	[Key.musicPlayerLyricsHide]: "歌詞を非表示",
	[Key.musicPlayerNoLyrics]: "歌詞はありません",
	[Key.musicPlayerLocateCurrent]: "現在の曲に移動",
	[Key.unknownSong]: "不明な曲",
	[Key.unknownArtist]: "不明なアーティスト",

	// アルバムページ
	[Key.albums]: "アルバム",
	[Key.albumsSubtitle]: "人生の美しい瞬間を記録",
	[Key.albumsEmpty]: "コンテンツがありません",
	[Key.albumsEmptyDesc]:
		"まだアルバムは作成されていません。素敵な思い出を追加しましょう！",
	[Key.albumsBackToList]: "アルバム一覧に戻る",
	[Key.albumsPhotoCount]: "枚の写真",
	[Key.albumsPhotosCount]: "枚の写真",
	[Key.hiddenAlbum]: "非表示のアルバム",
	[Key.hideAlbumTip]:
		"このアルバムは非表示に設定されているため、アルバムリストには表示されませんが、ダイレクトリンクから引き続きアクセスできます",

	// デバイスページ
	[Key.devices]: "マイデバイス",
	[Key.devicesSubtitle]: "日常で使用しているデバイス",
	[Key.devicesViewDetails]: "詳細を見る",

	// プロジェクトページ
	[Key.projects]: "プロジェクト",
	[Key.projectsSubtitle]: "開発プロジェクトポートフォリオ",
	[Key.projectsAll]: "すべて",
	[Key.projectsWeb]: "Webアプリケーション",
	[Key.projectsMobile]: "モバイルアプリケーション",
	[Key.projectsDesktop]: "デスクトップアプリケーション",
	[Key.projectsOther]: "その他",
	[Key.projectTechStack]: "技術スタック",
	[Key.projectLiveDemo]: "ライブデモ",
	[Key.projectSourceCode]: "ソースコード",
	[Key.projectDescription]: "プロジェクト概要",
	[Key.projectStatus]: "ステータス",
	[Key.projectStatusCompleted]: "完了",
	[Key.projectStatusInProgress]: "進行中",
	[Key.projectStatusPlanned]: "計画中",
	[Key.projectsTotal]: "総プロジェクト数",
	[Key.projectsCompleted]: "完了",
	[Key.projectsInProgress]: "進行中",
	[Key.projectsTechStack]: "技術スタック統計",
	[Key.projectsFeatured]: "注目プロジェクト",
	[Key.projectsPlanned]: "計画中",
	[Key.projectsDemo]: "ライブデモ",
	[Key.projectsSource]: "ソースコード",
	[Key.projectsVisit]: "プロジェクトを見る",
	[Key.projectsGitHub]: "GitHub",

	// RSSページ
	[Key.rss]: "RSSフィード",
	[Key.rssDescription]: "購読して最新情報を入手",
	[Key.rssSubtitle]: "RSSで購読して、最新の記事や更新をすぐに入手",
	[Key.rssLink]: "RSSリンク",
	[Key.rssCopyToReader]: "RSSリーダーにリンクをコピー",
	[Key.rssCopyLink]: "コピー",
	[Key.rssLatestPosts]: "最新記事",
	[Key.rssWhatIsRSS]: "RSSとは？",
	[Key.rssWhatIsRSSDescription]:
		"RSS（Really Simple Syndication）は、頻繁に更新されるコンテンツを配信するための標準フォーマットです。RSSを使用すると、以下のことができます：",
	[Key.rssBenefit1]: "手動でサイトを訪れずに最新コンテンツを入手",
	[Key.rssBenefit2]: "複数サイトの購読を一元管理",
	[Key.rssBenefit3]: "重要な更新や記事を見逃さない",
	[Key.rssBenefit4]: "広告のないクリーンな読書体験を楽しむ",
	[Key.rssHowToUse]:
		"Feedly、InoreaderなどのRSSリーダーを使用してこのサイトを購読することをお勧めします。",
	[Key.rssCopied]: "RSSリンクをクリップボードにコピーしました",
	[Key.rssCopyFailed]: "コピーに失敗しました。リンクを手動でコピーしてください",

	// Atomページ
	[Key.atom]: "Atomフィード",
	[Key.atomDescription]: "購読して最新情報を入手",
	[Key.atomSubtitle]: "Atomで購読して、最新の記事や更新をすぐに入手",
	[Key.atomLink]: "Atomリンク",
	[Key.atomCopyToReader]: "Atomリーダーにリンクをコピー",
	[Key.atomCopyLink]: "コピー",
	[Key.atomLatestPosts]: "最新記事",
	[Key.atomWhatIsAtom]: "Atomとは？",
	[Key.atomWhatIsAtomDescription]:
		"Atom（Atom Syndication Format）は、フィードとそのアイテムを記述するためのXMLベースの標準です。Atomを使用すると、以下のことができます：",
	[Key.atomBenefit1]: "手動でサイトを訪れずに最新コンテンツを入手",
	[Key.atomBenefit2]: "複数サイトの購読を一元管理",
	[Key.atomBenefit3]: "重要な更新や記事を見逃さない",
	[Key.atomBenefit4]: "広告のないクリーンな読書体験を楽しむ",
	[Key.atomHowToUse]:
		"Feedly、InoreaderなどのAtomリーダーを使用してこのサイトを購読することをお勧めします。",
	[Key.atomCopied]: "Atomリンクをクリップボードにコピーしました",
	[Key.atomCopyFailed]:
		"コピーに失敗しました。リンクを手動でコピーしてください",

	// 壁紙モード
	[Key.wallpaperMode]: "壁紙モード",
	[Key.wallpaperBanner]: "バナーモード",
	[Key.wallpaperFullscreen]: "フルスクリーンモード",
	[Key.wallpaperNone]: "壁紙を非表示",
	[Key.wallpaperPosition]: "壁紙の位置",
	[Key.wallpaperPositionTop]: "上部",
	[Key.wallpaperPositionCenter]: "中央",
	[Key.wallpaperPositionBottom]: "下部",
	[Key.wallpaperOpacity]: "背景の透明度",
	[Key.wallpaperBlur]: "背景のぼかし",
	[Key.cardOpacity]: "カード透明度",

	// ナビゲーションバー透明モード
	[Key.navbarTransparentMode]: "ナビゲーションバースタイル",
	[Key.navbarTransparentSemi]: "すりガラス",
	[Key.navbarTransparentFull]: "透明",
	[Key.navbarTransparentSemifull]: "動的透明",

	// スキルページ
	[Key.skills]: "スキル",
	[Key.skillsSubtitle]: "技術スキルと専門性",
	[Key.skillsFrontend]: "フロントエンド開発",
	[Key.skillsBackend]: "バックエンド開発",
	[Key.skillsDatabase]: "データベース",
	[Key.skillsTools]: "開発ツール",
	[Key.skillsOther]: "その他のスキル",
	[Key.skillLevel]: "習熟度",
	[Key.skillLevelBeginner]: "初心者",
	[Key.skillLevelIntermediate]: "中級",
	[Key.skillLevelAdvanced]: "上級",
	[Key.skillLevelExpert]: "エキスパート",
	[Key.skillExperience]: "経験",
	[Key.skillYears]: "年",
	[Key.skillMonths]: "月",
	[Key.skillsTotal]: "総スキル数",
	[Key.skillsExpert]: "エキスパートレベル",
	[Key.skillsAdvanced]: "上級",
	[Key.skillsIntermediate]: "中級",
	[Key.skillsBeginner]: "初心者",
	[Key.skillsAdvancedTitle]: "専門スキル",
	[Key.skillsProjects]: "関連プロジェクト",
	[Key.skillsDistribution]: "スキル分布",
	[Key.skillsByLevel]: "レベル別",
	[Key.skillsByCategory]: "カテゴリ別",
	[Key.noData]: "データがありません",

	// タイムラインページ
	[Key.timeline]: "タイムライン",
	[Key.timelineSubtitle]: "成長の軌跡と重要なマイルストーン",
	[Key.timelineEducation]: "学歴",
	[Key.timelineWork]: "職歴",
	[Key.timelineProject]: "プロジェクト経験",
	[Key.timelineAchievement]: "実績",
	[Key.timelinePresent]: "現在",
	[Key.timelineLocation]: "場所",
	[Key.timelineDescription]: "詳細",
	[Key.timelineMonths]: "月",
	[Key.timelineYears]: "年",
	[Key.timelineTotal]: "合計",
	[Key.timelineProjects]: "プロジェクト",
	[Key.timelineExperience]: "職歴",
	[Key.timelineCurrent]: "現在の状況",
	[Key.timelineHistory]: "経歴",
	[Key.timelineAchievements]: "実績",
	[Key.timelineStartDate]: "開始日",
	[Key.timelineDuration]: "期間",

	// フィードバックページ - サイト管理者連絡モジュール
	[Key.contactMe]: "サイト管理者に連絡",
	[Key.contactEmail]: "メールでサイト管理者に連絡",
	[Key.contactSocialFriends]: "SNSで友達追加してサイト管理者に連絡",
	[Key.addFriends]: "今すぐ友達追加",

	// スポンサーシップページ
	[Key.sponsorsNotice1]:
		"このウェブサイトの内容が役に立った場合は、以下の方法で活動を支援していただければ幸いです。より良いコンテンツ作成に役立てます。すべての支援は、ウェブサイトの維持、サーバー費用、コンテンツ制作に使用されます。",
	[Key.sponsorsNotice2]:
		"BrightMoon ブログプロジェクトのコンテンツ開発を支援していただき、ありがとうございます！",
	[Key.wechatPay]: "WeChat",
	[Key.aliPay]: "Alipay",
	[Key.scanPayQRcode]: "スキャンして支払う",
	[Key.sponsorsPartner]: "スポンサーパートナー",
	[Key.otherSupportOptions]: "その他の支援方法",
	[Key.shareBlog]: "私のブログをより多くの友人と共有する",
	[Key.leaveComment]: "記事下のコメント欄に感想を残す",
	[Key.subscribeToArticles]: "RSSとAtomを購読して最新記事を入手する",

	// パスワード保護
	[Key.passwordProtected]: "パスワードで保護されています",
	[Key.passwordProtectedTitle]: "このコンテンツはパスワードで保護されています",
	[Key.passwordProtectedDescription]:
		"パスワードを入力して保護されたコンテンツを表示してください",
	[Key.passwordPlaceholder]: "パスワードを入力",
	[Key.passwordUnlock]: "ロック解除",
	[Key.passwordUnlocking]: "ロック解除中...",
	[Key.passwordIncorrect]: "パスワードが間違っています。もう一度お試しください",
	[Key.passwordDecryptError]:
		"復号に失敗しました。パスワードが正しいか確認してください",
	[Key.passwordRequired]: "パスワードを入力してください",
	[Key.passwordVerifying]: "検証中...",
	[Key.passwordDecryptFailed]:
		"復号に失敗しました。パスワードを確認してください",
	[Key.passwordDecryptRetry]: "復号に失敗しました。もう一度お試しください",
	[Key.passwordUnlockButton]: "ロック解除",
	[Key.passwordHintLabel]: "パスワードヒント",
	[Key.copyFailed]: "コピーに失敗しました:",
	[Key.syntaxHighlightFailed]: "シンタックスハイライトに失敗しました:",
	[Key.autoSyntaxHighlightFailed]:
		"自動シンタックスハイライトにも失敗しました:",
	[Key.decryptionError]: "復号中にエラーが発生しました:",

	// 最終更新時刻カード
	[Key.lastModifiedPrefix]: "最終編集から: ",
	[Key.lastModifiedOutdated]: "一部の情報は古い可能性があります",
	[Key.year]: "年",
	[Key.month]: "月",
	[Key.day]: "日",
	[Key.hour]: "時間",
	[Key.minute]: "分",
	[Key.second]: "秒",

	// サイト統計
	[Key.siteStats]: "サイト統計",
	[Key.siteStatsPostCount]: "投稿数",
	[Key.siteStatsCategoryCount]: "カテゴリ数",
	[Key.siteStatsTagCount]: "タグ数",
	[Key.siteStatsTotalWords]: "総文字数",
	[Key.siteStatsRunningDays]: "運営日数",
	[Key.siteStatsLastUpdate]: "最終更新",
	[Key.siteStatsDaysAgo]: "{days}日前",
	[Key.siteStatsDays]: "{days}日",
	[Key.siteStatsCurrentDate]: "日付",
	[Key.siteStatsDateFormat]: "{year}年{month}月{day}日",
	[Key.siteStatsCurrentTime]: "時刻",
	[Key.siteStatsTimePeriodMorning]: "朝",
	[Key.siteStatsTimePeriodNoon]: "正午",
	[Key.siteStatsTimePeriodAfternoon]: "午後",
	[Key.siteStatsTimePeriodEvening]: "夕方",
	[Key.siteStatsTimePeriodNight]: "夜",
	[Key.siteStatsAm]: "午前",
	[Key.siteStatsPm]: "午後",
	[Key.siteStatsSeason]: "季節",
	[Key.siteStatsSeasonSpring]: "春",
	[Key.siteStatsSeasonSummer]: "夏",
	[Key.siteStatsSeasonAutumn]: "秋",
	[Key.siteStatsSeasonWinter]: "冬",

	// カレンダーコンポーネント
	[Key.calendarPrevMonth]: "前月へ",
	[Key.calendarNextMonth]: "次月へ",
	[Key.calendarBackToToday]: "今日に戻る",
	[Key.calendarSunday]: "日",
	[Key.calendarMonday]: "月",
	[Key.calendarTuesday]: "火",
	[Key.calendarWednesday]: "水",
	[Key.calendarThursday]: "木",
	[Key.calendarFriday]: "金",
	[Key.calendarSaturday]: "土",
	[Key.calendarJanuary]: "1月",
	[Key.calendarFebruary]: "2月",
	[Key.calendarMarch]: "3月",
	[Key.calendarApril]: "4月",
	[Key.calendarMay]: "5月",
	[Key.calendarJune]: "6月",
	[Key.calendarJuly]: "7月",
	[Key.calendarAugust]: "8月",
	[Key.calendarSeptember]: "9月",
	[Key.calendarOctober]: "10月",
	[Key.calendarNovember]: "11月",
	[Key.calendarDecember]: "12月",

	// シェア機能
	[Key.shareArticle]: "シェア",
	[Key.generatingPoster]: "ポスターを生成中...",
	[Key.copied]: "コピーしました",
	[Key.copyLink]: "リンクをコピー",
	[Key.savePoster]: "ポスターを保存",
	[Key.scanToRead]: "スキャンして読む",
	[Key.shareOnSocial]: "シェア",
	[Key.shareOnSocialDescription]:
		"この記事が役に立ったなら、他の人とも共有してください！",

	// プロフィール統計
	[Key.profileStatsLoading]: "統計を読み込み中...",
	[Key.profileStatsPageViews]: "ページビュー",
	[Key.profileStatsVisits]: "訪問",
	[Key.profileStatsUnavailable]: "統計情報は利用できません",

	// ページビュー統計
	[Key.pageViewsLoading]: "統計を読み込み中...",
	[Key.pageViewsUnavailable]: "統計情報は利用できません",

	// 投稿一覧レイアウト
	[Key.postListLayout]: "投稿一覧レイアウト",
	[Key.listMode]: "リスト",
	[Key.gridMode]: "グリッド",

	// 外部リンク警告
	[Key.leaveSite]: "このサイトを離れます",
	[Key.goToExternalLink]: "以下の外部リンクに移動しようとしています:",
	[Key.warningText]: "アカウントと資産のセキュリティにご注意ください",
	[Key.confirmText]: "続けて移動する",
	[Key.cancelText]: "キャンセル",

	// ソーシャルメディアで友達を追加
	[Key.copyAccount]: "アカウントをコピー",
	[Key.copyAccountSuccess]: "クリップボードにコピーしました",
	[Key.openAppAdd]: "アプリで開く",

	// 天気コンポーネント
	[Key.weather]: "天気",
	[Key.weatherNoApiKey]:
		"src/config/user.ts に WeatherAPI キーを追加してください",
	[Key.weatherLocationDisabled]:
		"プライバシー契約を拒否したため、天気位置情報サービスは無効になりました",
	[Key.weatherWaitingConsent]: "天気位置情報の承認を待っています...",
	[Key.weatherDefaultLocationHint]:
		"プライバシー同意が拒否されたため、デフォルト位置で天気を取得しています",
	[Key.weatherDefaultLocationConfirm]: "確認",
	[Key.weatherLoading]: "天気を読み込み中...",
	[Key.weatherLoadFailed]: "読み込みに失敗しました",
	[Key.weatherRetry]: "再試行",
	[Key.weatherSearchPlaceholder]: "都市を検索...",
	[Key.weatherHumidity]: "湿度",
	[Key.weatherWind]: "風速",
	[Key.weatherFeelsLike]: "体感温度",
	[Key.weatherUV]: "UV指数",
	[Key.weatherVisibility]: "視程",
	[Key.weatherForecast]: "天気予報",
	[Key.weatherToday]: "今日",
	[Key.weatherHigh]: "最高",
	[Key.weatherLow]: "最低",
	[Key.weatherCelsius]: "°C",
	[Key.weatherFahrenheit]: "°F",
	[Key.weatherKmh]: "km/h",
	[Key.weatherMph]: "mph",
	[Key.weatherChangeLocation]: "地域変更",
	[Key.weatherDetectLocation]: "現在地検出",

	// 天気条件
	[Key.weatherCondSunny]: "晴れ",
	[Key.weatherCondPartlyCloudy]: "くもり時々晴れ",
	[Key.weatherCondCloudy]: "くもり",
	[Key.weatherCondFog]: "霧",
	[Key.weatherCondDrizzle]: "霧雨",
	[Key.weatherCondRain]: "雨",
	[Key.weatherCondHeavyRain]: "大雨",
	[Key.weatherCondSnow]: "雪",
	[Key.weatherCondHeavySnow]: "大雪",
	[Key.weatherCondSleet]: "みぞれ",
	[Key.weatherCondThunderstorm]: "雷雨",
	[Key.weatherCondHail]: "ひょう",
	[Key.weatherCondDust]: "砂塵",

	// Cookie プライバシー通知
	[Key.cookieConsentTitle]: "プライバシー保護",
	[Key.cookieConsentDescription]:
		"BrightMoon では、サービスと広告の提供・維持・改善のために、Cookie を使用してデバイス識別子などのデータを保存およびアクセスしています。「同意する」を選択するか、「すべて拒否」をクリックして不要な Cookie を拒否できます。",
	[Key.cookieConsentIpInfo]: "位置情報を取得中...",
	[Key.cookieConsentIpTimeout]: "位置情報の取得がタイムアウトしました",
	[Key.cookieConsentAccept]: "同意する",
	[Key.cookieConsentReject]: "すべて拒否",

	// Twikoo コメントシステム
	[Key.twikooInitializing]: "Twikoo コメントシステムを初期化中...",
	[Key.twikooNotConfigured]: "Twikoo コメントシステムはまだ設定されていません",
	[Key.twikooConfigHint]:
		"src/config/user.ts で Twikoo コメントシステムを設定してください",
	[Key.twikooPrivacyRejected]:
		"プライバシー契約を拒否したため、Twikooコメントシステムは無効になりました",

	// バージョン更新チェック
	[Key.versionCheck]: "更新を確認",
	[Key.versionLatest]: "最新バージョンです",
	[Key.versionNewVersion]: "新しいバージョンがあります",
	[Key.versionChecking]: "確認中...",
	[Key.versionCheckError]: "確認に失敗しました",
	[Key.versionPreRelease]: "ベータ版",
	[Key.versionCheckFailedTitle]: "更新チェック失敗",
	[Key.versionCheckFailedDesc]:
		"更新を確認できません。通常はリモートリポジトリAPIのレート制限、またはリモートリポジトリAPIアドレスが設定されていないことが原因です。しばらくしてからもう一度お試しください",
	[Key.versionCheckSuccessTitle]: "チェック成功",
	[Key.versionCheckSuccessDesc]:
		"新しいバージョンは見つかりませんでした。最新バージョンです",
	[Key.versionDownload]: "最新バージョンをダウンロード",
	[Key.versionUpdateWarning]:
		"BrightMoon ブログフレームワークアップグレードツールの使用をお勧めします。アップグレード前にデータをバックアップしてください",

	// パンくずナビゲーション
	[Key.suggestion]: "訪れたいかもしれません",
	[Key.navBack]: "前のページへ",
	[Key.navForward]: "次のページへ",

	// トップへ戻るボタン
	[Key.backToTop]: "トップへ戻る",
};
