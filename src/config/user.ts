/**
 * BrightMoon 用户配置文件（用户配置，升级时受保护不会被覆盖）
 *
 * 在此文件中覆盖你在 src/config/defaults.ts 中想要修改的字段。
 */

import type {
	AddpaymentConfig,
	AnnouncementConfig,
	CommentConfig,
	ContactEmailConfig,
	ContactMethods,
	ExpressiveCodeConfig,
	ExternalLinkConfirmConfig,
	FooterConfig,
	LicenseConfig,
	MusicPlayerConfig,
	NavBarConfig,
	PermalinkConfig,
	PioConfig,
	ProfileConfig,
	SakuraConfig,
	ShareConfig,
	SidebarLayoutConfig,
	SiteConfig,
	UmamiConfig,
	UpgradeConfig,
	VersionCheckConfig,
	WeatherConfig,
} from "../types/config";
import { LinkPreset } from "../types/config";
import { getTranslateLanguageFromConfig } from "../utils/language-utils";

/**
 * 用户覆盖配置类型
 * 所有字段均为可选，仅写入需要覆盖默认值的部分
 */
export interface UserConfig {
	siteConfig?: Partial<SiteConfig>;
	navBarConfig?: Partial<NavBarConfig>;
	profileConfig?: Partial<ProfileConfig>;
	licenseConfig?: Partial<LicenseConfig>;
	permalinkConfig?: Partial<PermalinkConfig>;
	expressiveCodeConfig?: Partial<ExpressiveCodeConfig>;
	commentConfig?: Partial<CommentConfig>;
	shareConfig?: Partial<ShareConfig>;
	externalLinkConfirmConfig?: Partial<ExternalLinkConfirmConfig>;
	contactEmailConfig?: Partial<ContactEmailConfig>;
	contactMethods?: Partial<ContactMethods>;
	addpaymentConfig?: Partial<AddpaymentConfig>;
	announcementConfig?: Partial<AnnouncementConfig>;
	musicPlayerConfig?: Partial<MusicPlayerConfig>;
	footerConfig?: Partial<FooterConfig>;
	versionCheckConfig?: Partial<VersionCheckConfig>;
	upgradeConfig?: Partial<UpgradeConfig>;
	weatherConfig?: Partial<WeatherConfig>;
	sidebarLayoutConfig?: Partial<SidebarLayoutConfig>;
	sakuraConfig?: Partial<SakuraConfig>;
	pioConfig?: Partial<PioConfig>;
	umamiConfig?: Partial<UmamiConfig>;
}

const SITE_LANG = "en"; // 语言代码，例如：'en', 'zh_CN', 'zh_TW', 'ja', 'ar', 'de', 'es', 'fr', 'id', 'ko', 'ru', 'th', 'tr', 'vi' 等
const SITE_TIMEZONE = 8; // 设置你的网站时区 from -12 to 12 default in UTC+8

const weatherEnabled = true; // 是否启用天气组件
const tocEnabled = true; // 是否启用目录组件

/**
 * 用户自定义配置覆盖项
 *
 * 在下方按需写入你想要覆盖的字段，未声明的字段将自动使用
 * src/config/defaults.ts 中的默认值。
 *
 * 注意：此文件已在 upgradeConfig.protected 中声明，升级时不会被覆盖。
 */
export const userConfig: UserConfig = {
	siteConfig: {
		title: "BrightMoon",
		subtitle: "Modern, feature-rich static blog",
		siteURL: "https://www.example.com/", // 请替换为你的站点URL，以斜杠结尾
		siteStats: {
			siteStartDate: "2025-10-30", // 站点开始运行日期，用于站点统计组件计算运行天数
			dynamicEnable: true, // 是否启用动态站点统计，默认启用
			enable12HourClock: false, // 启用12小时制时间显示 (需要启用动态站点统计生效)
		},

		timeZone: SITE_TIMEZONE,

		lang: SITE_LANG,

		appearance: {
			hue: 270, // 主题色的默认色相，范围从 0 到 360。例如：红色：0，青色：200，蓝绿色：250，粉色：345
			fixed: false, // 对访问者隐藏个性化设置面板
			// 水波纹效果配置
			waves: {
				enable: true, // 是否启用水波纹效果（注意：此功能性能开销较大）
				performanceMode: false, // 性能模式：减少动画复杂度(性能提升40%)
			},
			// 壁纸模式配置
			wallpaperMode: {
				// 默认壁纸模式：banner=顶部横幅，fullscreen=全屏壁纸，none=无壁纸
				defaultMode: "banner",
				// 默认横幅位置（banner模式时生效）：top=顶部对齐，center=居中，bottom=底部对齐
				defaultBannerPosition: "center",
				// 默认壁纸位置（全屏壁纸时生效）：top=顶部对齐，center=居中，bottom=底部对齐
				defaultFullscreenPosition: "center",
				// 默认壁纸透明度（全屏壁纸时生效），有效值：0.2-1
				defaultOpacity: 0.8,
				// 默认背景模糊程度（全屏壁纸时生效），有效值：0-40px
				defaultBlur: 8,
				// 默认卡片透明度（全屏壁纸时生效），有效值：0.2-1
				defaultCardOpacity: 0.3,
				// 整体布局方案切换按钮显示设置（需要 appearance 中的 fixed: false 才能生效）
				// "off" = 不显示
				// "mobile" = 仅在移动端显示
				// "desktop" = 仅在桌面端显示
				// "both" = 在所有设备上显示
				showModeSwitchOnMobile: "both",
			},
			// 文章列表布局配置
			postListLayout: {
				// 默认布局模式："list" 列表模式（单列布局），"grid" 网格模式（双列布局）
				// 注意：使用 "grid" 模式下桌面端隐藏右侧边栏，平板端与移动端强制回退为 "list" 列表模式，右侧边栏正常显示
				defaultMode: "list",
				// 是否允许用户切换布局
				allowSwitch: true,
			},
			navbar: {
				transparentMode: "semifull", // 导航栏透明模式："semi" 半透明加圆角，"full" 完全透明，"semifull" 动态透明
			},
		},

		translate: {
			enable: true, // 启用翻译功能
			service: "client.edge", // 默认使用 'client.edge' 为 Edge 浏览器翻译服务。留空则不使用任何第三方翻译服务，默认走 translate.js 默认 API
			defaultLanguage: getTranslateLanguageFromConfig(SITE_LANG), // 根据站点语言自动设置默认翻译语言
			showSelectTag: false, // 不显示默认语言选择下拉菜单，使用自定义按钮
			autoDiscriminate: true, // 自动检测用户语言
			ignoreClasses: ["ignore"], // 翻译时忽略的 CSS 类名
			ignoreTags: ["script", "style", "code", "pre"], // 翻译时忽略的 HTML 标签
		},

		// 特色页面开关配置（关闭未使用的页面有助于提升 SEO，关闭后请记得在 navbarConfig 中移除对应链接）
		featurePages: {
			anime: true, // 番剧页面开关
			diary: true, // 日记页面开关
			friends: true, // 友链页面开关
			projects: true, // 项目页面开关
			skills: true, // 技能页面开关
			timeline: true, // 时间线页面开关
			albums: true, // 相册页面开关
			devices: true, // 设备页面开关
			feedback: true, // 反馈页面开关
			sponsors: true, // 赞助页面开关
		},

		// Cookie 隐私协议开关：true=显示协议弹窗，false=关闭弹窗且默认同意所有权限
		cookieConsent: {
			enable: true,
		},

		// 顶栏标题配置
		navbarTitle: {
			// 显示模式："text-icon" 显示图标+文本，"logo" 仅显示Logo
			mode: "text-icon",
			// 顶栏标题文本
			text: "BrightMoon Blog",
			// 顶栏标题图标路径，默认使用 public/assets/home/home.png
			icon: "assets/home/home favicon.webp",
			// 网站Logo图片路径
			logo: "assets/home/home.webp",
		},

		// 页面自动缩放配置
		pageScaling: {
			enable: true, // 是否开启自动缩放
			targetWidth: 2000, // 目标宽度，低于此宽度时开始缩放
		},

		anime: {
			mode: "local", // 番剧页面模式："bangumi" 使用Bangumi API，"local" 使用本地配置，"bilibili" 使用Bilibili API
			// Bangumi 配置
			bangumi: {
				userId: "your-bangumi-id", // 在此处设置你的Bangumi用户ID，可以设置为 "sai" 测试
				fetchOnDev: false, // 是否在开发环境下获取 Bangumi 数据（默认 false），获取前先执行 pnpm build 构建 json 文件
			},
			// Bilibili 配置
			bilibili: {
				// 第一次配置请把vmid和anime mode模式正确设置好，然后输入pnpm run update-bilibili获取番剧数据
				vmid: "your-bilibili-id", // 在此处设置你的Bilibili用户ID (vmid)，例如 "352580971"
				fetchOnDev: false, // 是否在开发环境下获取 Bilibili 数据（默认 false）
				SESSDATA: "", // Bilibili SESSDATA（可选，用于获取观看进度，从浏览器cookie中获取）
				coverMirror: "", // 封面图片镜像源（可选，如果需要使用镜像源，例如 "https://images.weserv.nl/?url="）
				useWebp: true, // 是否使用WebP格式（默认 true）
			},
		},

		// 标签样式配置
		tagStyle: {
			// 是否使用新样式（悬停高亮样式）还是旧样式（外框常亮样式）
			useNewStyle: true,
		},

		banner: {
			// 支持单张图片或图片数组，当数组长度 > 1 时自动启用轮播
			src: {
				desktop: [
					"/assets/desktop-banner/d1.webp",
					"/assets/desktop-banner/d2.webp",
					"/assets/desktop-banner/d3.webp",
					"/assets/desktop-banner/d4.webp",
					"/assets/desktop-banner/d5.webp",
					"/assets/desktop-banner/d6.webp",
				], // 桌面横幅图片
				mobile: [
					"/assets/mobile-banner/m1.webp",
					"/assets/mobile-banner/m2.webp",
					"/assets/mobile-banner/m3.webp",
					"/assets/mobile-banner/m4.webp",
					"/assets/mobile-banner/m5.webp",
					"/assets/mobile-banner/m6.webp",
				], // 移动横幅图片
			}, // 使用本地横幅图片

			carousel: {
				enable: true, // 为 true 时：为多张图片启用轮播。为 false 时：从数组中随机显示一张图片
				interval: 6, // 轮播间隔时间（秒）
			},

			// PicFlow API支持(智能图片API)
			imageApi: {
				enable: false, // 启用图片API
				url: "http://domain.com/api_v2.php?format=text&count=4", // API地址，返回每行一个图片链接的文本
			},
			// 这里需要使用PicFlow API的Text返回类型,所以我们需要format=text参数
			// 项目地址:https://github.com/matsuzaka-yuki/PicFlow-API
			// 请自行搭建API

			homeText: {
				enable: true, // 在主页显示自定义文本
				title: "Let's be full of energy today !", // 主页横幅主标题

				subtitle: [
					"Hello World",
					"Always believe that good things are about to happen",
					"Even so, I will move forward",
					"Never give up",
					"Every day is a new beginning",
					"Our journey is to the stars and the sea",
					"The electric light dancing at your fingertips is my unwavering faith in this life",
					"Cheers to the Zuo Yan Research Department - ( ゜- ゜)つロ",
				],
				typewriter: {
					enable: true, // 启用副标题打字机效果
					speed: 100, // 打字速度（毫秒）
					deleteSpeed: 50, // 删除速度（毫秒）
					pauseTime: 6000, // 完全显示后的暂停时间（毫秒）
				},
				festivalEasterEgg: {
					enable: true, // 启用节日彩蛋
					dates: [
						{
							date: "01-01", // 格式 MM-DD 或 MM-DD~MM-DD（日期范围），如需周年递进请改用 startDate
							title: "Happy New Year !", // 节日横幅主标题，支持 {years} 占位符
							subtitle: "May the new year bring you joy and happiness", // 节日横幅副标题
						},
						{
							date: "02-14",
							title: "Happy Valentine's Day !",
							subtitle: ["Love is in the air", "Be my Valentine"],
						},
						{
							date: "03-08",
							title: "Happy Women's Day !",
							subtitle: "Celebrating the strength and grace of women",
						},
						{
							date: "04-01",
							title: "April Fools' Day !",
							subtitle: "Watch out for pranks today !",
						},
						{
							date: "05-01",
							title: "Happy Labour Day !",
							subtitle: "Celebrating the workers of the world",
						},
						{
							date: "06-01",
							title: "Happy Children's Day !",
							subtitle: "May you always keep a childlike heart",
						},
						{
							date: "10-01~10-07",
							title: "Happy National Day !",
							subtitle: [
								"Celebrating the motherland",
								"Wishing prosperity and happiness",
							],
						},
						{
							date: "12-25",
							title: "Merry Christmas !",
							subtitle: [
								"Jingle bells, jingle bells",
								"Wishing you warmth and joy",
							],
						},
					],
				},
			},

			credit: {
				enable: true, // 显示横幅图片来源文本
				text: "Image from: 搜图神器", // 要显示的来源文本
				url: "https://www.soutushenqi.com/", // （可选）原始艺术品或艺术家页面的 URL 链接
			},
		},

		fullscreenWallpaper: {
			// 支持单张图片或图片数组，当数组长度 > 1 时自动启用轮播
			src: {
				desktop: [
					"/assets/desktop-banner/d1.webp",
					"/assets/desktop-banner/d2.webp",
					"/assets/desktop-banner/d3.webp",
					"/assets/desktop-banner/d4.webp",
					"/assets/desktop-banner/d5.webp",
					"/assets/desktop-banner/d6.webp",
				],
				mobile: [
					"/assets/mobile-banner/m1.webp",
					"/assets/mobile-banner/m2.webp",
					"/assets/mobile-banner/m3.webp",
					"/assets/mobile-banner/m4.webp",
					"/assets/mobile-banner/m5.webp",
					"/assets/mobile-banner/m6.webp",
				],
			},
			carousel: {
				enable: true, // 为 true 时：为多张图片启用轮播。为 false 时：从数组中随机显示一张图片
				interval: 6, // 轮播间隔时间（秒）
			},
		},

		toc: {
			enable: tocEnabled, // 启用目录功能
			responsive: {
				// 设备响应式配置（最佳设置，不建议修改），"float" 悬浮按钮模式， "sidebar" 侧边栏模式
				mobile: "float", // 移动端默认使用 "float" 悬浮按钮模式
				tablet: "sidebar", /// 平板端默认使用 "sidebar" 侧边栏模式，可选 "float" 悬浮按钮模式
				desktop: "sidebar", // 桌面端默认使用 "sidebar" 侧边栏模式，可选 "float" 悬浮按钮模式
			},
			depth: 3, // 目录深度，1-6，1 表示只显示 h1 标题，2 表示显示 h1 和 h2 标题，依此类推
			useJapaneseBadge: true, // 使用日语假名标记（あいうえお...）代替数字，开启后会将 1、2、3... 改为 あ、い、う...
		},
		showCoverInContent: true, // 在文章内容页显示文章封面
		generateOgImages: false, // 启用生成OpenGraph图片功能,注意开启后要渲染很长时间，不建议本地调试的时候开启
		favicon: [
			// 留空以使用默认 favicon
			// {
			//   src: '/favicon/icon.png',    // 图标文件路径
			//   theme: 'light',              // 可选，指定主题 'light' | 'dark'
			//   sizes: '32x32',              // 可选，图标大小
			// }
		],

		// 字体配置
		font: {
			fontFamily: "MiSans-Normal", // 字体名称（用于 CSS font-family）
			fontWeight: "500", // 字体粗细
			localFonts: ["MiSans-Normal.woff2"], // 源字体文件（仅支持 TTF / OTF / WOFF2）：TTF / OTF 字体格式会由脚本自动压缩并转换为 WOFF2 字体格式，若本身已是 WOFF2 字体格式则直接跳过，无需处理
			// Web 字体文件路径（WOFF2 格式，在浏览器中实际使用）
			// 注意：此文件需要在运行构建和压缩脚本后才会生成，Dev 环境下如果看不到字体，请确保 public/assets/font/ 目录下有对应的 WOFF2 文件，或者临时将此路径改为 TTF 文件路径进行开发
			fontFile: "/assets/font/MiSans-Normal.woff2",
			enableCompress: true, // 是否启用字体子集优化（减少字体文件大小，只保留实际使用的字符）
		},
		showLastModified: true, // 控制“上次编辑”卡片显示的开关
	},

	navBarConfig: {
		links: [
			LinkPreset.Home,
			LinkPreset.Archive,
			// 支持自定义导航栏链接，支持多级菜单
			{
				name: "Links",
				url: "/links/",
				icon: "material-symbols:link",
				children: [
					{
						name: "Bilibili",
						url: "https://space.bilibili.com/352580971",
						external: true,
						icon: "fa6-brands:bilibili",
					},
					{
						name: "GitHub",
						url: "https://github.com/Zuoyan233",
						external: true,
						icon: "fa6-brands:github",
					},
				],
			},
			{
				name: "My",
				url: "/content/",
				icon: "material-symbols:person",
				children: [
					LinkPreset.Anime,
					LinkPreset.Diary,
					LinkPreset.Albums,
					LinkPreset.Projects,
					LinkPreset.Skills,
					LinkPreset.Timeline,
					LinkPreset.Devices,
				],
			},
			{
				name: "About",
				url: "/content/",
				icon: "material-symbols:info",
				children: [LinkPreset.About, LinkPreset.Friends],
			},
			{
				name: "Others",
				url: "#",
				icon: "material-symbols:more-horiz",
				children: [LinkPreset.Feedback, LinkPreset.Sponsors],
			},
		],
	},

	profileConfig: {
		avatar: "assets/images/avatar.webp", // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
		name: "Zuoyan",
		bio: "The world is so big, I want to see it.",
		typewriter: {
			enable: true, // 启用个人简介打字机效果
			speed: 100, // 打字速度（毫秒）
		},
		links: [
			{
				name: "Bilibili",
				icon: "fa6-brands:bilibili",
				url: "https://space.bilibili.com/352580971",
			},
			{
				name: "GitHub",
				icon: "fa6-brands:github",
				url: "https://github.com/Zuoyan233",
			},
			// {
			// 	name: "Gitee",
			// 	icon: "mdi:git",
			// 	url: "",
			// },

			// {
			// 	name: "Codeberg",
			// 	icon: "simple-icons:codeberg",
			// 	url: "",
			// },
			// {
			// 	name: "Discord",
			// 	icon: "fa6-brands:discord",
			// 	url: "",
			// },
		],
	},

	licenseConfig: {
		enable: true,
		name: "CC BY-NC-SA 4.0",
		url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
	},

	permalinkConfig: {
		enable: false, // 是否启用全局 permalink 功能，关闭时使用默认的文件名作为链接
		/**
		 * permalink 格式模板
		 * 支持的占位符：
		 * - %year% : 4位年份 (2024)
		 * - %monthnum% : 2位月份 (01-12)
		 * - %day% : 2位日期 (01-31)
		 * - %hour% : 2位小时 (00-23)
		 * - %minute% : 2位分钟 (00-59)
		 * - %second% : 2位秒数 (00-59)
		 * - %post_id% : 文章序号（按发布时间升序排列，最早的文章为1）
		 * - %postname% : 文章文件名（slug）
		 * - %category% : 分类名（无分类时为 "uncategorized"）
		 *
		 * 示例：
		 * - "%year%-%monthnum%-%postname%" => "/2024-12-my-post/"
		 * - "%post_id%-%postname%" => "/42-my-post/"
		 * - "%category%-%postname%" => "/tech-my-post/"
		 *
		 * 注意：不支持斜杠 "/"，所有生成的链接都在根目录下
		 */
		format: "%postname%", // 默认使用文件名
	},

	expressiveCodeConfig: {
		// 注意：某些样式（如背景颜色）已被覆盖，请参阅 astro.config.mjs 文件。
		// 请选择深色主题，因为此博客主题目前仅支持深色背景
		theme: "github-dark",
		// 是否在主题切换时隐藏代码块以避免卡顿问题
		hideDuringThemeTransition: true,
	},

	commentConfig: {
		enable: false, // 启用评论功能。当设置为 false 时，评论组件将不会显示在文章区域。
		twikoo: {
			envId: "https://example-twikoo.top/",
			lang: SITE_LANG, // 与站点语言保持一致。
		},
	},

	shareConfig: {
		enable: true, // 启用分享功能
	},

	externalLinkConfirmConfig: {
		enable: true, // 是否启用外部链接确认功能
	},

	contactEmailConfig: {
		// email填写你的电子邮箱地址，link此处填写你需要跳转到对应电子邮箱的网站，格式是 "https://example.mail.com/"。
		emails: [
			{
				email: "Demo email 1, please change your email in src/config/user.ts",
				link: "https://example.mail.com/",
			},
			{
				email: "Demo email 2, please change your email in src/config/user.ts",
				link: "https://example.mail.com/",
			},
		],
	},

	contactMethods: [
		// method是社交平台标识，label是显示名称（用于标签按钮），icon是图标名称
		// qrCode是二维码图片路径，account是账号ID，link是跳转链接（用于打开App添加好友），tip是提示文字
		{
			method: "wechat",
			label: "WeChat",
			icon: "simple-icons:wechat",
			qrCode: "/images/contact/wechat friend.webp",
			account: "your_wechat_id",
			link: "",
			tip: "Scan the QR code to add a WeChat friend",
		},
		{
			method: "qq",
			label: "QQ",
			icon: "simple-icons:qq",
			qrCode: "/images/contact/qq friend.webp",
			account: "your_qq_number",
			link: "",
			tip: "Scan the QR code to add a QQ friend",
		},
		{
			method: "telegram",
			label: "Telegram",
			icon: "simple-icons:telegram",
			qrCode: "/images/contact/telegram friend.webp",
			account: "@your_telegram",
			link: "https://t.me/your_telegram",
			tip: "Scan the QR code to add a Telegram friend",
		},
	],

	addpaymentConfig: {
		// paymentQRCode: 此处存放你的赞助支付二维码，存放路径在 "public/images/sponsors" 文件夹内。
		paymentQRCode_1: "/images/sponsors/alipay.webp",
		paymentQRCode_2: "/images/sponsors/wechat pay.webp",
	},

	announcementConfig: {
		title: "", // 公告标题，填空使用i18n字符串Key.announcement
		content: "Welcome to BrightMoon! Modern, feature-rich static blog.", // 公告内容
		closable: true, // 允许用户关闭公告
		link: {
			enable: false, // 启用链接
			text: "View more", // 链接文本
			url: "/about/", // 链接 URL
			external: false, // 内部链接
		},
	},

	musicPlayerConfig: {
		enable: true, // 启用音乐播放器功能
		mode: "meting", // 音乐播放器模式，可选 "local" 或 "meting"
		meting_api:
			"https://meting.mysqil.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r", // Meting API 地址
		id: "766208154", // 歌单ID
		server: "netease", // 音乐源服务器。有的meting的api源支持更多平台，一般来说，netease=网易云音乐，tencent=QQ音乐，kugou=酷狗音乐，xiami=虾米音乐，baidu=百度音乐
		type: "playlist", // 播单类型
		currentTime: 0, // 音乐播放器当前播放时间，默认为 0
		duration: 0, // 音乐播放器音乐时长，默认为 0
		volume: 1, // 音乐播放器音量，音量从小到大值是 0.1-1
		isRepeating: 2, // 音乐播放器循环模式（0: 不循环, 1: 单曲循环, 2: 列表循环）
		errorMessage: "", // 音乐播放器错误信息，默认为空字符串
		showError: false, // 音乐播放器是否显示错误信息，默认为 false (不显示)
		isPlaying: false, // 音乐播放器状态，默认为 false (未播放)
		isExpanded: false, // 音乐播放器是否展开，默认为 false (未展开)
		isHidden: false, // 音乐播放器是否隐藏，默认为 false (不隐藏)
		showPlaylist: false, // 音乐播放器是否显示播放列表，默认为 false (不显示)
		isMuted: false, // 音乐播放器是否静音，默认为 false (不静音)
		isLoading: false, // 音乐播放器是否加载中，默认为 false (不加载)
		isShuffled: false, // 音乐播放器是否随机播放，默认为 false (不随机播放)
		showLyrics: false, // 音乐播放器是否显示歌词，默认为 false (不显示)
	},

	footerConfig: {
		enable: true, // 是否启用Footer HTML注入功能
		customHtml:
			"This platform is a personal blog and is intended solely for learning and research purposes", // HTML格式的自定义页脚信息，例如备案号等，默认留空
	},

	versionCheckConfig: {
		enable: true, // 是否启用版本检测按钮
		autoCheck: true, // 是否启用自动检测更新

		// 获取远程仓库 API 地址，用于获取最新版本信息
		// per_page 参数控制每次请求返回的最大 Release 数量，默认 5 条即可满足检测需求
		// 如需检测其他仓库的版本更新，替换为对应的 API 地址即可
		apiUrl:
			"https://api.github.com/repos/Zuoyan233/BrightMoon/releases?per_page=5", // Github 格式：https://api.github.com/repos/{用户名}/{仓库名}/releases?per_page={数量}

		// 版本号前缀正则模式，用于从 Release tag 中提取纯数字版本号
		// 默认 "^(CE_V|v)" 会移除 tag 开头的 "CE_V" 或 "v" 前缀（不区分大小写）
		// 例如：CE_V1.2.3 → 1.2.3，v2.0.0 → 2.0.0，1.0.0 → 1.0.0（无前缀则不处理）
		// 如果你的项目使用了不同的 tag 命名规范，可以修改此正则以适配
		// 常见示例：
		//   "^(release-|v)"  → 匹配 release-1.0.0 或 v1.0.0
		//   "^[a-zA-Z_-]*"   → 匹配任意字母/下划线/连字符前缀
		//   ""               → 不移除任何前缀，直接使用原始 tag
		versionPrefixPattern: "^(CE_V|v)",
	},

	upgradeConfig: {
		// 升级时受保护的文件列表，这些文件不会被新增、覆盖或删除
		// 支持 glob 模式，如 "src/content/**" 匹配 src/content 下所有文件
		protected: [
			"src/config/user.ts",
			"src/content/**",
			"src/assets/images/**",
			"src/data/friends.ts",
			"src/data/diary.ts",
			"src/data/projects.ts",
			"src/data/skills.ts",
			"src/data/timeline.ts",
			"src/data/anime.ts",
			"src/data/bilibili-data.json",
			"src/data/bangumi-data.json",
			"src/data/anime-data.json",
			"public/assets/anime/**",
			"public/assets/css/**",
			"public/assets/desktop-banner/**",
			"public/assets/font/**",
			"public/assets/home/**",
			"public/assets/mobile-banner/**",
			"public/favicon/**",
			"public/images/**",
			"public/pio/**",
			".env",
			".vscode/**",
			".npmrc",
		],
		// 升级时忽略的文件列表，这些文件不参与同步
		ignore: [
			".git/**",
			"node_modules/**",
			".astro/**",
			"dist/**",
			".upgrade-tmp/**",
			"update/**",
			"backup/**",
		],
		// HTTP 请求超时时间（毫秒）
		httpTimeout: 30000,
	},

	weatherConfig: {
		enable: true, // 是否启用天气组件
		apiKey: "", // WeatherAPI API Key，在此处填写你的 Key
		defaultLocation: "", // 默认位置，留空则根据IP自动检测当前地区
		unit: "celsius", // 温度单位：celsius 或 fahrenheit
	},

	sidebarLayoutConfig: {
		// 侧边栏位置：单侧(unilateral)或双侧(both)
		position: "both",

		// 侧边栏组件配置列表
		components: [
			{
				// 组件类型：用户资料组件
				type: "profile",
				// 是否启用该组件
				enable: true,
				// 组件显示顺序（数字越小越靠前）
				order: 1,
				// 组件位置："top" 表示固定在顶部
				position: "top",
				// 所在侧边栏
				sidebar: "left",
				// CSS 类名，用于应用样式和动画
				class: "onload-animation",
				// 动画延迟时间（毫秒），用于错开动画效果
				animationDelay: 0,
			},
			{
				// 组件类型：公告组件
				type: "announcement",
				// 是否启用该组件（现在通过统一配置控制）
				enable: true,
				// 组件显示顺序
				order: 2,
				// 组件位置："top" 表示固定在顶部
				position: "top",
				// 所在侧边栏
				sidebar: "left",
				// CSS 类名
				class: "onload-animation",
				// 动画延迟时间
				animationDelay: 50,
			},
			{
				// 组件类型：分类组件
				type: "categories",
				// 是否启用该组件
				enable: true,
				// 组件显示顺序
				order: 3,
				// 组件位置："top" 表示固定在顶部
				position: "top",
				// 所在侧边栏
				sidebar: "left",
				// CSS 类名
				class: "onload-animation",
				// 动画延迟时间
				animationDelay: 150,
				// 响应式配置
				responsive: {
					// 折叠阈值：当分类数量超过5个时自动折叠
					collapseThreshold: 5,
				},
			},
			{
				// 组件类型：标签组件
				type: "tags",
				// 是否启用该组件
				enable: true,
				// 组件显示顺序
				order: 4,
				// 组件位置："top" 表示固定在顶部
				position: "top",
				// 所在侧边栏
				sidebar: "left",
				// CSS 类名
				class: "onload-animation",
				// 动画延迟时间
				animationDelay: 250,
				// 响应式配置
				responsive: {
					// 折叠阈值：当标签数量超过20个时自动折叠
					collapseThreshold: 20,
				},
			},
			{
				// 组件类型：目录组件
				type: "toc",
				// 是否启用该组件
				enable: tocEnabled,
				// 组件显示顺序
				order: 5,
				// 组件位置：粘性区域，滚动时保持可见
				position: "sticky",
				// 所在侧边栏
				sidebar: "left",
				// CSS 类名
				class: "onload-animation",
				// 动画延迟时间
				animationDelay: 300,
			},
			{
				// 组件类型：站点统计组件
				type: "site-stats",
				// 是否启用该组件
				enable: true,
				// 组件显示顺序
				order: 6,
				// 组件位置
				position: "sticky",
				// 所在侧边栏
				sidebar: "right",
				// CSS 类名
				class: "onload-animation",
				// 动画延迟时间
				animationDelay: 200,
			},
			{
				// 组件类型：日历组件
				type: "calendar",
				// 是否启用该组件（移动端默认不显示）
				enable: true,
				// 组件显示顺序
				order: 7,
				// 组件位置
				position: "sticky",
				// 所在侧边栏
				sidebar: "right",
				// CSS 类名
				class: "onload-animation",
				// 动画延迟时间
				animationDelay: 250,
			},
			{
				// 组件类型：天气组件
				type: "weather",
				// 是否启用该组件
				enable: weatherEnabled,
				// 组件显示顺序
				order: 4,
				// 组件位置
				position: "top",
				// 所在侧边栏
				sidebar: "left",
				// CSS 类名
				class: "onload-animation",
				// 动画延迟时间
				animationDelay: 300,
			},
		],

		// 默认动画配置
		defaultAnimation: {
			// 是否启用默认动画
			enable: true,
			// 基础延迟时间（毫秒）
			baseDelay: 0,
			// 递增延迟时间（毫秒），每个组件依次增加的延迟
			increment: 50,
		},

		// 响应式布局配置
		responsive: {
			// 断点配置（像素值）
			breakpoints: {
				// 移动端断点：屏幕宽度小于744px
				mobile: 744,
				// 平板端断点：屏幕宽度小于1280px
				tablet: 1280,
				// 桌面端断点：屏幕宽度大于等于1280px
				desktop: 1280,
			},
			// 不同设备的布局模式
			// hidden: 隐藏侧边栏
			// sidebar: 显示侧边栏
			layout: {
				// 移动端：显示侧边栏(抽屉模式)
				mobile: "sidebar",
				// 平板端：显示侧边栏(抽屉模式)
				tablet: "sidebar",
				// 桌面端：显示侧边栏
				desktop: "sidebar",
			},
		},
	},

	sakuraConfig: {
		enable: true, // 默认关闭樱花特效
		sakuraNum: 10, // 樱花数量
		limitTimes: -1, // 樱花越界限制次数，-1为无限循环
		size: {
			min: 0.5, // 樱花最小尺寸倍数
			max: 1.1, // 樱花最大尺寸倍数
		},
		opacity: {
			min: 0.3, // 樱花最小不透明度
			max: 0.9, // 樱花最大不透明度
		},
		speed: {
			horizontal: {
				min: -1.7, // 水平移动速度最小值
				max: -1.2, // 水平移动速度最大值
			},
			vertical: {
				min: 1.5, // 垂直移动速度最小值
				max: 2.2, // 垂直移动速度最大值
			},
			rotation: 0.03, // 旋转速度
			fadeSpeed: 0.03, // 消失速度，不应大于最小不透明度
		},
		zIndex: 100, // 层级，确保樱花在合适的层级显示
	},

	pioConfig: {
		enable: true, // 启用看板娘
		models: ["/pio/models/mikoto/mikoto.model.json"], // 默认模型路径
		position: "left", // 模型位置
		width: 280, // 默认宽度
		height: 310, // 默认高度
		mode: "draggable", // 默认为可拖拽模式
		hiddenOnMobile: true, // 默认在移动设备上隐藏
		dialog: {
			welcome: "Welcome to the BrightMoon!", // 欢迎词
			touch: [
				"What are you doing?",
				"Do not touch me!",
				"HENTAI!",
				"Don't defile me!",
			], // 触摸提示
			home: "Click here to return to the homepage !", // 首页提示
			skin: ["Have you seen my new outfit ?", "This looks really good !"], // 换装提示
			close: "QWQ , Next see you again~", // 关闭提示
			link: "https://github.com/Zuoyan233/BrightMoon", // 关于链接
		},
	},

	umamiConfig: {
		enabled: false, // 是否显示Umami统计
		apiKey: import.meta.env.UMAMI_API_KEY || "api_xxxxxxxx", // API密钥优先从环境变量读取，否则使用配置文件中的值
		baseUrl: "https://api.umami.is", // Umami Cloud API地址
		scripts: `
	<script defer src="XXXX.XXX" data-website-id="ABCD1234"></script>
  `.trim(), // 上面填你要插入的Script,不用再去Layout中插入
	},
};
