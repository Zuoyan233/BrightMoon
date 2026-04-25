import type {
	AddpaymentConfig,
	AnnouncementConfig,
	CommentConfig,
	ContactEmailConfig,
	ContactMethods,
	ExpressiveCodeConfig,
	ExternalLinkConfirmConfig,
	FooterConfig,
	FullscreenWallpaperConfig,
	LicenseConfig,
	MusicPlayerConfig,
	NavBarConfig,
	PermalinkConfig,
	ProfileConfig,
	SakuraConfig,
	ShareConfig,
	SidebarLayoutConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";
import { getTranslateLanguageFromConfig } from "./utils/language-utils";

// 移除i18n导入以避免循环依赖

// 定义站点语言
const SITE_LANG = "en"; // 语言代码，例如：'en', 'zh_CN', 'zh_TW' , 'ja' , 'ar' , 'de' , 'es' , 'fr', 'id' , 'ko' , 'ru' , 'th' , 'tr' , 'vi' 等。
const SITE_TIMEZONE = 8; //设置你的网站时区 from -12 to 12 default in UTC+8
export const siteConfig: SiteConfig = {
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

	themeColor: {
		hue: 190, // 主题色的默认色相，范围从 0 到 360。例如：红色：0，青色：200，蓝绿色：250，粉色：345
		fixed: false, // 对访问者隐藏主题色选择器
	},

	translate: {
		enable: true, // 启用翻译功能
		service: "client.edge", // 使用 Edge 浏览器翻译服务
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

	// 顶栏标题配置
	navbarTitle: {
		// 显示模式："text-icon" 显示图标+文本，"logo" 仅显示Logo
		mode: "logo",
		// 顶栏标题文本
		text: "左颜研究部",
		// 顶栏标题图标路径，默认使用 public/assets/home/home.png
		icon: "",
		// 网站Logo图片路径
		logo: "assets/home/home.webp",
	},

	// 页面自动缩放配置
	pageScaling: {
		enable: true, // 是否开启自动缩放
		targetWidth: 2000, // 目标宽度，低于此宽度时开始缩放
	},

	bangumi: {
		userId: "your-bangumi-id", // 在此处设置你的Bangumi用户ID，可以设置为 "sai" 测试
		fetchOnDev: false, // 是否在开发环境下获取 Bangumi 数据（默认 false），获取前先执行 pnpm build 构建 json 文件
	},

	bilibili: {
		// 第一次配置请把vmid和anime mode模式正确设置好，然后输入pnpm run update-bilibili获取番剧数据
		vmid: "", // 在此处设置你的Bilibili用户ID (vmid)，例如 "1129280784"
		fetchOnDev: false, // 是否在开发环境下获取 Bilibili 数据（默认 false）
		SESSDATA: "", // Bilibili SESSDATA（可选，用于获取观看进度，从浏览器cookie中获取）
		coverMirror: "", // 封面图片镜像源（可选，如果需要使用镜像源，例如 "https://images.weserv.nl/?url="）
		useWebp: true, // 是否使用WebP格式（默认 true）
	},

	anime: {
		mode: "local", // 番剧页面模式："bangumi" 使用Bangumi API，"local" 使用本地配置，"bilibili" 使用Bilibili API
	},

	// 文章列表布局配置
	postListLayout: {
		// 默认布局模式："list" 列表模式（单列布局），"grid" 网格模式（双列布局）
		// 注意：如果侧边栏配置启用了"both"双侧边栏，则无法使用文章列表"grid"网格（双列）布局
		defaultMode: "list",
		// 是否允许用户切换布局
		allowSwitch: true,
	},

	// 标签样式配置
	tagStyle: {
		// 是否使用新样式（悬停高亮样式）还是旧样式（外框常亮样式）
		useNewStyle: true,
	},

	// 壁纸模式配置
	wallpaperMode: {
		// 默认壁纸模式：banner=顶部横幅，fullscreen=全屏壁纸，none=无壁纸
		defaultMode: "banner",
		// 整体布局方案切换按钮显示设置（默认："desktop"）
		// "off" = 不显示
		// "mobile" = 仅在移动端显示
		// "desktop" = 仅在桌面端显示
		// "both" = 在所有设备上显示
		showModeSwitchOnMobile: "both",
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

		position: "center", // 等同于 object-position，仅支持 'top', 'center', 'bottom'。默认为 'center'

		carousel: {
			enable: true, // 为 true 时：为多张图片启用轮播。为 false 时：从数组中随机显示一张图片
			interval: 6, // 轮播间隔时间（秒）
		},

		waves: {
			enable: true, // 是否启用水波纹效果（注意：此功能性能开销较大）
			performanceMode: true, // 性能模式：减少动画复杂度(性能提升40%)
			mobileDisable: false, // 移动端禁用
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
			title: "Welcome Home !", // 主页横幅主标题

			subtitle: [
				"永远相信美好的事情即将发生",
				"你知道“2333”是什么意思",
				"前方是一方通行",
				"前方高能",
				"这么可爱一定是男孩子",
				"注入灵魂",
				"安全裤是人类史上最差的发明，没有之一",
				"左颜研究部 乾杯 - ( ゜- ゜)つロ",
			],
			typewriter: {
				enable: true, // 启用副标题打字机效果

				speed: 100, // 打字速度（毫秒）
				deleteSpeed: 50, // 删除速度（毫秒）
				pauseTime: 6000, // 完全显示后的暂停时间（毫秒）
			},
		},

		credit: {
			enable: true, // 显示横幅图片来源文本
			text: "图片来自：搜图神器", // 要显示的来源文本
			url: "https://www.soutushenqi.com/", // （可选）原始艺术品或艺术家页面的 URL 链接
		},

		navbar: {
			transparentMode: "semifull", // 导航栏透明模式："semi" 半透明加圆角，"full" 完全透明，"semifull" 动态透明
		},
	},
	toc: {
		enable: true, // 启用目录功能
		responsive: {
			// 设备响应式配置（最佳设置，不建议修改），"float" 悬浮按钮模式， "sidebar" 侧边栏模式 （仅适用平板端与桌面端）
			mobile: "float", // 移动端默认使用 "float" 悬浮按钮模式
			tablet: "float", // 平板端默认使用 "float" 悬浮按钮模式，可选 "float" 悬浮按钮模式
			desktop: "sidebar", // 桌面端默认使用 "sidebar" 侧边栏模式，可选 "float" 悬浮按钮模式
		},
		depth: 3, // 目录深度，1-6，1 表示只显示 h1 标题，2 表示显示 h1 和 h2 标题，依此类推
		useJapaneseBadge: false, // 使用日语假名标记（あいうえお...）代替数字，开启后会将 1、2、3... 改为 あ、い、う...
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
		// 注意：自定义字体需要在 src/styles/main.css 中引入字体文件
		// 注意：字体子集优化功能目前仅支持 TTF 格式字体,开启后需要在生产环境才能看到效果,在Dev环境下显示的是浏览器默认字体!
		asciiFont: {
			// 英文字体 - 优先级最高
			// 指定为英文字体则无论字体包含多大范围，都只会保留 ASCII 字符子集
			fontFamily: "ZenMaruGothic-Medium",
			fontWeight: "400",
			localFonts: ["ZenMaruGothic-Medium.ttf"],
			enableCompress: true, // 启用字体子集优化，减少字体文件大小
		},
		cjkFont: {
			// 中日韩字体 - 作为回退字体
			fontFamily: "萝莉体 第二版",
			fontWeight: "500",
			localFonts: ["萝莉体 第二版.ttf"],
			enableCompress: true, // 启用字体子集优化，减少字体文件大小
		},
	},
	showLastModified: true, // 控制“上次编辑”卡片显示的开关
};
export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
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
	position: "center", // 壁纸位置，等同于 object-position
	carousel: {
		enable: true, // 启用轮播
		interval: 6, // 轮播间隔时间（秒）
	},
	zIndex: -1, // 层级，确保壁纸在背景层
	opacity: 0.8, // 壁纸透明度
	blur: 1, // 背景模糊程度
};

export const navBarConfig: NavBarConfig = {
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

				// {
				// 	name: "Gitee",
				// 	url: "https://gitee.com/matsuzakayuki/Mizuki",
				// 	external: true,
				// 	icon: "mdi:git",
				// },
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
};

export const profileConfig: ProfileConfig = {
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
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

// Permalink 固定链接配置
export const permalinkConfig: PermalinkConfig = {
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
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式（如背景颜色）已被覆盖，请参阅 astro.config.mjs 文件。
	// 请选择深色主题，因为此博客主题目前仅支持深色背景
	theme: "github-dark",
	// 是否在主题切换时隐藏代码块以避免卡顿问题
	hideDuringThemeTransition: true,
};

export const commentConfig: CommentConfig = {
	enable: false, // 启用评论功能。当设置为 false 时，评论组件将不会显示在文章区域。
	twikoo: {
		envId: "https://example-twikoo.top/",
		lang: SITE_LANG, // 与站点语言保持一致。
	},
};

export const shareConfig: ShareConfig = {
	enable: true, // 启用分享功能
};

export const externalLinkConfirmConfig: ExternalLinkConfirmConfig = {
	enable: true, // 是否启用外部链接确认功能
};

export const contactEmailConfig: ContactEmailConfig = {
	// email填写你的电子邮箱地址，link此处填写你需要跳转到对应电子邮箱的网站，格式是 "https://example.mail.com/"。
	emails: [
		{
			email: "演示邮箱1，请在src/config.ts中修改你的电子邮箱",
			link: "https://example.mail.com/",
		},
		{
			email: "演示邮箱2，请在src/config.ts中修改你的电子邮箱",
			link: "https://example.mail.com/",
		},
	],
};

export const contactMethods: ContactMethods = [
	// method与icon是填写你的社交软件方式，qrCode是填写你的添加好友的二维码，存放路径在 "public/images/contact/" 文件夹内。
	{
		method: "wechat",
		icon: "simple-icons:wechat",
		qrCode: "/images/contact/wechat friend.webp",
	},
	{
		method: "qq",
		icon: "simple-icons:qq",
		qrCode: "/images/contact/qq friend.webp",
	},
	{
		method: "telegram",
		icon: "simple-icons:telegram",
		qrCode: "/images/contact/telegram friend.webp",
	},
];

export const addpaymentConfig: AddpaymentConfig = {
	// paymentQRCode: 此处存放你的赞助支付二维码，存放路径在 "public/images/sponsors" 文件夹内。
	paymentQRCode_1: "/images/sponsors/alipay.webp",
	paymentQRCode_2: "/images/sponsors/wechat pay.webp",
};

export const announcementConfig: AnnouncementConfig = {
	title: "", // 公告标题，填空使用i18n字符串Key.announcement
	content: "欢迎来到左颜研究部博客! 聚集经验知识的后花园。", // 公告内容
	closable: true, // 允许用户关闭公告
	link: {
		enable: false, // 启用链接
		text: "查看更多", // 链接文本
		url: "/about/", // 链接 URL
		external: false, // 内部链接
	},
};

export const musicPlayerConfig: MusicPlayerConfig = {
	enable: true, // 启用音乐播放器功能
	mode: "meting", // 音乐播放器模式，可选 "local" 或 "meting"
	meting_api:
		"https://meting.mysqil.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r", // Meting API 地址
	id: "766208154", // 歌单ID
	server: "netease", // 音乐源服务器。有的meting的api源支持更多平台,一般来说,netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
	type: "playlist", // 播单类型
};

export const footerConfig: FooterConfig = {
	enable: true, // 是否启用Footer HTML注入功能
	customHtml: "", // HTML格式的自定义页脚信息，例如备案号等，默认留空
	// 也可以直接编辑 FooterConfig.html 文件来添加备案号等自定义内容
	// 注意：若 customHtml 不为空，则使用 customHtml 中的内容；若 customHtml 留空，则使用 FooterConfig.html 文件中的内容
	// FooterConfig.html 可能会在未来的某个版本弃用
};

/**
 * 侧边栏布局配置
 * 用于控制侧边栏组件的显示、排序、动画和响应式行为
 * sidebar: 控制组件所在的侧边栏（left 或 right）。注意：移动端通常不显示右侧栏内容。若组件设置在 right，请确保 layout.position 为 "both"。
 */
export const sidebarLayoutConfig: SidebarLayoutConfig = {
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
			enable: siteConfig.toc.enable,
			// 组件显示顺序
			order: 7,
			// 组件位置："sticky" 表示粘性定位，滚动时固定显示
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
			order: 5,
			// 组件位置
			position: "top",
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
			order: 6,
			// 组件位置
			position: "top",
			// 所在侧边栏
			sidebar: "right",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 250,
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
			// 移动端断点：屏幕宽度小于768px
			mobile: 768,
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
};

export const sakuraConfig: SakuraConfig = {
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
};

// Pio 看板娘配置
export const pioConfig: import("./types/config").PioConfig = {
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
};

// 导出所有配置的统一接口
export const widgetConfigs = {
	profile: profileConfig,
	announcement: announcementConfig,
	music: musicPlayerConfig,
	layout: sidebarLayoutConfig,
	sakura: sakuraConfig,
	fullscreenWallpaper: fullscreenWallpaperConfig,
	pio: pioConfig, // 添加 pio 配置
	share: shareConfig, // 添加分享配置
} as const;

export const umamiConfig = {
	enabled: false, // 是否显示Umami统计
	apiKey: import.meta.env.UMAMI_API_KEY || "api_xxxxxxxx", // API密钥优先从环境变量读取，否则使用配置文件中的值
	baseUrl: "https://api.umami.is", // Umami Cloud API地址
	scripts: `
<script defer src="XXXX.XXX" data-website-id="ABCD1234"></script>
  `.trim(), // 上面填你要插入的Script,不用再去Layout中插入
} as const;
