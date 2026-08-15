import type {
	DARK_MODE,
	LIGHT_MODE,
	SYSTEM_MODE,
	WALLPAPER_BANNER,
	WALLPAPER_FULLSCREEN,
	WALLPAPER_NONE,
} from "../constants/constants";

export type SiteConfig = {
	title: string;
	subtitle: string;
	siteURL: string; // 站点URL，以斜杠结尾，例如：https://www.example.com/
	keywords?: string[]; // 站点关键词，用于生成 <meta name="keywords">
	siteStats: {
		siteStartDate?: string;
		dynamicEnable?: boolean; // 启用动态更新站点统计和时间段显示
		enable12HourClock?: boolean; // 启用12小时制
	};

	timeZone:
		| -12
		| -11
		| -10
		| -9
		| -8
		| -7
		| -6
		| -5
		| -4
		| -3
		| -2
		| -1
		| 0
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12;

	lang:
		| "en"
		| "zh_CN"
		| "zh_TW"
		| "ja"
		| "ko"
		| "es"
		| "th"
		| "vi"
		| "tr"
		| "id"
		| "ar"
		| "de"
		| "fr"
		| "ru";

	appearance: {
		hue: number;
		fixed: boolean;
		// 水波纹效果配置
		waves?: {
			enable: boolean; // 是否启用水波纹效果
			performanceMode?: boolean; // 性能模式：减少动画复杂度
		};
		// 壁纸模式配置
		wallpaperMode: {
			defaultMode: "banner" | "fullscreen" | "none"; // 默认壁纸模式：banner=顶部横幅，fullscreen=全屏壁纸，none=无壁纸
			defaultBannerPosition?: "top" | "center" | "bottom"; // 默认横幅位置（banner模式时生效）：top=顶部对齐，center=居中，bottom=底部对齐
			defaultFullscreenPosition?: "top" | "center" | "bottom"; // 默认壁纸位置（全屏壁纸时生效）：top=顶部对齐，center=居中，bottom=底部对齐
			defaultOpacity?: number; // 默认壁纸透明度，0-1之间（全屏壁纸时生效）
			defaultBlur?: number; // 默认背景模糊程度，单位px（全屏壁纸时生效）
			defaultCardOpacity?: number; // 默认卡片透明度，0-1之间（全屏壁纸时生效）
			showModeSwitchOnMobile?: "off" | "mobile" | "desktop" | "both"; // 整体布局方案切换按钮显示设置：off=隐藏，mobile=仅移动端，desktop=仅桌面端，both=全部显示
		};
		// 文章列表布局配置
		postListLayout: {
			defaultMode: "list" | "grid"; // 默认布局模式：list=列表模式，grid=网格模式
			allowSwitch: boolean; // 是否允许用户切换布局
		};
		// 导航栏透明模式
		navbar?: {
			transparentMode?: "semi" | "full" | "semifull"; // 导航栏透明模式："semi" 半透明加圆角，"full" 完全透明，"semifull" 动态透明
		};
	};

	translate?: {
		enable: boolean; // 是否启用翻译功能
		service?: string; // 翻译服务类型
		defaultLanguage?: string; // 默认语言
		showSelectTag?: boolean; // 是否显示语言选择下拉框
		autoDiscriminate?: boolean; // 是否自动识别用户语言
		ignoreClasses?: string[]; // 忽略翻译的CSS类名
		ignoreTags?: string[]; // 忽略翻译的HTML标签
	};

	// 特色页面开关配置
	featurePages: {
		anime: boolean; // 番剧页面开关
		diary: boolean; // 日记页面开关
		friends: boolean; // 友链页面开关
		projects: boolean; // 项目页面开关
		skills: boolean; // 技能页面开关
		timeline: boolean; // 时间线页面开关
		albums: boolean; // 相册页面开关
		devices: boolean; // 设备页面开关
		feedback: boolean; // 反馈页面开关
		sponsors: boolean; // 赞助页面开关
	};

	// 顶栏标题配置
	navbarTitle?: {
		mode?: "text-icon" | "logo"; // 显示模式："text-icon" 显示图标+文本，"logo" 仅显示Logo
		text: string; // 顶栏标题文本
		icon?: string; // 顶栏标题图标路径
		logo?: string; // 网站Logo图片路径
	};

	// 页面自动缩放配置
	pageScaling?: {
		enable: boolean; // 是否开启自动缩放
		targetWidth?: number; // 目标宽度，低于此宽度时开始缩放
	};

	// 添加字体配置
	font: {
		fontFamily: string;
		fontWeight: string | number;
		localFonts: string[];
		fontFile?: string;
		enableCompress: boolean;
	};

	// 番剧页面配置（整合 bangumi、bilibili 配置）
	anime?: {
		mode?: "bangumi" | "local" | "bilibili"; // 番剧页面模式
		// Bangumi 配置
		bangumi?: {
			userId?: string; // Bangumi用户ID
			fetchOnDev?: boolean; // 是否在开发环境下获取 Bangumi 数据
		};
		// Bilibili 配置
		bilibili?: {
			vmid?: string; // Bilibili用户ID (vmid)
			fetchOnDev?: boolean; // 是否在开发环境下获取 Bilibili 数据
			SESSDATA?: string; // Bilibili SESSDATA（可选，用于获取进度信息）
			coverMirror?: string; // 封面图片镜像源（可选，默认为空字符串）
			useWebp?: boolean; // 是否使用WebP格式（默认 true）
		};
	};

	// Cookie 隐私协议配置
	cookieConsent?: {
		enable: boolean; // true=显示协议弹窗，false=关闭弹窗且默认同意所有权限
	};

	// 标签样式配置
	tagStyle?: {
		useNewStyle?: boolean; // 是否使用新样式（悬停高亮样式）还是旧样式（外框常亮样式）
	};

	banner: {
		src:
			| string
			| string[]
			| {
					desktop?: string | string[];
					mobile?: string | string[];
			  }; // 支持单个图片、图片数组或分别设置桌面端和移动端图片
		carousel?: {
			enable: boolean; // 是否启用轮播
			interval: number; // 轮播间隔时间（秒）
		};
		imageApi?: {
			enable: boolean; // 是否启用图片API
			url: string; // API地址，返回每行一个图片链接的文本
		};
		homeText?: {
			enable: boolean; // 是否在首页显示自定义文字
			title?: string; // 主标题
			subtitle?: string | string[]; // 副标题，支持单个字符串或字符串数组
			typewriter?: {
				enable: boolean; // 是否启用打字机效果
				speed: number; // 打字速度（毫秒）
				deleteSpeed: number; // 删除速度（毫秒）
				pauseTime: number; // 完整显示后的暂停时间（毫秒）
			};
		};
		credit: {
			enable: boolean;
			text: string;
			url?: string;
		};
	};

	fullscreenWallpaper: FullscreenWallpaperConfig;

	toc: {
		enable: boolean;
		responsive?: {
			mobile: "float"; // 手机端模式
			tablet: "float" | "sidebar"; // 平板端模式
			desktop: "float" | "sidebar"; // 桌面端模式
		};
		depth: 1 | 2 | 3;
		useJapaneseBadge?: boolean; // 使用日语假名标记（あいうえお...）代替数字
	};
	showCoverInContent: boolean; // 控制文章封面在文章内容页显示的开关
	generateOgImages: boolean;
	favicon: Favicon[];
	showLastModified: boolean; // 控制“上次编辑”卡片显示的开关
};

export type Favicon = {
	src: string;
	theme?: "light" | "dark";
	sizes?: string;
};

export enum LinkPreset {
	Home = 0,
	Archive = 1,
	About = 2,
	Friends = 3,
	Anime = 4,
	Diary = 5,
	Albums = 6,
	Projects = 7,
	Skills = 8,
	Timeline = 9,
	Sponsors = 10,
	Devices = 11,
	Feedback = 12,
	RSS = 13,
	Atom = 14,
}

export type NavBarLink = {
	name: string;
	url: string;
	external?: boolean;
	icon?: string; // 菜单项图标
	children?: (NavBarLink | LinkPreset)[]; // 支持子菜单，可以是NavBarLink或LinkPreset
};

export type NavBarConfig = {
	links: (NavBarLink | LinkPreset)[];
};

export type ProfileConfig = {
	avatar?: string;
	name: string;
	bio?: string;
	links: {
		name: string;
		url: string;
		icon: string;
	}[];
	typewriter?: {
		enable: boolean; // 是否启用打字机效果
		speed?: number; // 打字速度（毫秒）
	};
};

export type LicenseConfig = {
	enable: boolean;
	name: string;
	url: string;
};

// Permalink 配置
export type PermalinkConfig = {
	enable: boolean; // 是否启用全局 permalink 功能
	/**
	 * permalink 格式模板
	 * 支持的占位符：
	 * - %year% : 4位年份 (2024)
	 * - %monthnum% : 2位月份 (01-12)
	 * - %day% : 2位日期 (01-31)
	 * - %hour% : 2位小时 (00-23)
	 * - %minute% : 2位分钟 (00-59)
	 * - %second% : 2位秒数 (00-59)
	 * - %post_id% : 文章序号（按发布时间升序排列）
	 * - %postname% : 文章文件名（slug）
	 * - %category% : 分类名（无分类时为 "uncategorized"）
	 *
	 * 示例：
	 * - "%year%-%monthnum%-%postname%" => "2024-12-my-post"
	 * - "%post_id%-%postname%" => "42-my-post"
	 * - "%category%-%postname%" => "tech-my-post"
	 *
	 * 注意：不支持斜杠 "/"，所有生成的链接都在根目录下
	 */
	format: string;
};

// 评论配置
export type CommentConfig = {
	enable: boolean; // 是否启用评论功能
	twikoo?: TwikooConfig;
};

type TwikooConfig = {
	envId: string;
	region?: string;
	lang?: string;
};

export type LIGHT_DARK_MODE =
	| typeof LIGHT_MODE
	| typeof DARK_MODE
	| typeof SYSTEM_MODE;

export type WALLPAPER_MODE =
	| typeof WALLPAPER_BANNER
	| typeof WALLPAPER_FULLSCREEN
	| typeof WALLPAPER_NONE;

export type BlogPostData = {
	body: string;
	title: string;
	published: Date;
	description: string;
	tags: string[];
	draft?: boolean;
	image?: string;
	category?: string;
	pinned?: boolean;
	prevTitle?: string;
	prevSlug?: string;
	nextTitle?: string;
	nextSlug?: string;
};

export type ExpressiveCodeConfig = {
	theme: string;
	hideDuringThemeTransition?: boolean; // 是否在主题切换时隐藏代码块
};

export type AnnouncementConfig = {
	// enable属性已移除，现在通过sidebarLayoutConfig统一控制
	title?: string; // 公告栏标题
	content: string; // 公告栏内容
	icon?: string; // 公告栏图标
	type?: "info" | "warning" | "success" | "error"; // 公告类型
	closable?: boolean; // 是否可关闭
	link?: {
		enable: boolean; // 是否启用链接
		text: string; // 链接文字
		url: string; // 链接地址
		external?: boolean; // 是否外部链接
	};
};

export type MusicPlayerConfig = {
	enable: boolean; // 是否启用音乐播放器功能
	mode: "meting" | "local"; // 音乐播放器模式
	meting_api: string; // Meting API 地址
	id: string; // 歌单ID
	server: string; // 音乐源服务器
	type: string; // 音乐类型
	currentTime: number; // 当前播放时间
	duration: number; // 音乐时长
	volume: number; // 音量
	isRepeating: number; // 循环模式
	errorMessage: string; // 错误信息
	showError: boolean; // 是否显示错误信息
	isPlaying: boolean; // 播放状态
	isExpanded: boolean; // 是否展开
	isHidden: boolean; // 是否隐藏
	showPlaylist: boolean; // 是否显示播放列表
	isMuted: boolean; // 是否静音
	isLoading: boolean; // 是否加载中
	isShuffled: boolean; // 是否随机播放
	showLyrics: boolean; // 是否显示歌词
};

export type FooterConfig = {
	enable: boolean; // 是否启用Footer HTML注入功能
	customHtml?: string; // 自定义HTML内容，用于添加备案号等信息
};

// 组件配置类型定义
export type WidgetComponentType =
	| "profile"
	| "announcement"
	| "categories"
	| "tags"
	| "toc"
	| "music-player"
	| "pio" // 添加 pio 组件类型
	| "site-stats" // 站点统计组件
	| "calendar" // 日历组件
	| "weather" // 天气组件
	| "custom";

export type WidgetComponentConfig = {
	type: WidgetComponentType; // 组件类型
	enable: boolean; // 是否启用该组件
	order: number; // 显示顺序，数字越小越靠前
	position: "top" | "sticky"; // 组件位置：顶部固定区域或粘性区域
	sidebar?: "left" | "right"; // 组件所在侧边栏：左侧或右侧（仅当启用双侧边栏时有效）
	class?: string; // 自定义CSS类名
	style?: string; // 自定义内联样式
	animationDelay?: number; // 动画延迟时间（毫秒）
	responsive?: {
		hidden?: ("mobile" | "tablet" | "desktop")[]; // 在指定设备上隐藏
		collapseThreshold?: number; // 折叠阈值
	};
	customProps?: Record<string, unknown>; // 自定义属性，用于扩展组件功能
};

export type SidebarLayoutConfig = {
	position: "unilateral" | "both"; // 侧边栏位置：单侧或双侧
	components: WidgetComponentConfig[]; // 组件配置列表
	defaultAnimation: {
		enable: boolean; // 是否启用默认动画
		baseDelay: number; // 基础延迟时间（毫秒）
		increment: number; // 每个组件递增的延迟时间（毫秒）
	};
	responsive: {
		breakpoints: {
			mobile: number; // 移动端断点（px）
			tablet: number; // 平板端断点（px）
			desktop: number; // 桌面端断点（px）
		};
		layout: {
			mobile: "hidden" | "sidebar"; // 移动端布局模式
			tablet: "hidden" | "sidebar"; // 平板端布局模式
			desktop: "sidebar"; // 桌面端布局模式
		};
	};
};

export type SakuraConfig = {
	enable: boolean; // 是否启用樱花特效
	sakuraNum: number; // 樱花数量，默认21
	limitTimes: number; // 樱花越界限制次数，-1为无限循环
	size: {
		min: number; // 樱花最小尺寸倍数
		max: number; // 樱花最大尺寸倍数
	};
	opacity: {
		min: number; // 樱花最小不透明度
		max: number; // 樱花最大不透明度
	};
	speed: {
		horizontal: {
			min: number; // 水平移动速度最小值
			max: number; // 水平移动速度最大值
		};
		vertical: {
			min: number; // 垂直移动速度最小值
			max: number; // 垂直移动速度最大值
		};
		rotation: number; // 旋转速度
		fadeSpeed: number; // 消失速度
	};
	zIndex: number; // 层级，确保樱花在合适的层级显示
};

export type FullscreenWallpaperConfig = {
	src:
		| string
		| string[]
		| {
				desktop?: string | string[];
				mobile?: string | string[];
		  }; // 支持单个图片、图片数组或分别设置桌面端和移动端图片
	carousel?: {
		enable: boolean; // 是否启用轮播
		interval: number; // 轮播间隔时间（秒）
	};
};

/**
 * Pio 看板娘配置
 */
export type PioConfig = {
	enable: boolean; // 是否启用看板娘
	models?: string[]; // 模型文件路径数组
	position?: "left" | "right"; // 看板娘位置
	width?: number; // 看板娘宽度
	height?: number; // 看板娘高度
	mode?: "static" | "fixed" | "draggable"; // 展现模式
	hiddenOnMobile?: boolean; // 是否在移动设备上隐藏
	dialog?: {
		welcome?: string | string[]; // 欢迎词
		touch?: string | string[]; // 触摸提示
		home?: string; // 首页提示
		skin?: [string, string]; // 换装提示 [切换前, 切换后]
		close?: string; // 关闭提示
		link?: string; // 关于链接
		custom?: Array<{
			selector: string; // CSS选择器
			type: "read" | "link"; // 类型
			text?: string; // 自定义文本
		}>;
	};
};

/**
 * 分享组件配置
 */
export type ShareConfig = {
	enable: boolean; // 是否启用分享功能
};

/**
 * 外部链接确认配置
 */
export type ExternalLinkConfirmConfig = {
	enable: boolean;
};

/**
 * 联系站长电子邮箱配置
 */
export type ContactEmailConfig = {
	emails: {
		email: string;
		link: string;
	}[];
};

/**
 * 添加赞助支付二维码配置
 */
export type AddpaymentConfig = {
	paymentQRCode_1: string;
	paymentQRCode_2: string;
};

/**
 * 添加添加好友二维码配置
 */
export type ContactMethod = {
	method: string; // 社交平台名称
	label: string; // 显示名称（用于标签按钮）
	icon: string; // 图标名称
	qrCode: string; // 二维码图片路径
	account?: string; // 账号ID
	link?: string; // 跳转链接，用于打开App添加好友
	tip: string; // 提示文字
};

export type ContactMethods = ContactMethod[];

/**
 * 天气组件配置
 */
export type WeatherConfig = {
	enable: boolean; // 是否启用天气组件
	apiKey: string; // WeatherAPI API Key
	defaultLocation?: string; // 默认位置，留空则根据IP自动检测
	unit?: "celsius" | "fahrenheit"; // 温度单位，默认摄氏度
};

export type VersionCheckConfig = {
	enable: boolean; // 是否启用版本检测按钮
	autoCheck: boolean; // 是否启用自动检测更新
	apiUrl: string; // 获取远程仓库 API 地址，用于获取最新版本信息
	versionPrefixPattern: string; // 版本号前缀正则模式，用于从 Release tag 中提取纯数字版本号
};

export type UpgradeConfig = {
	protected: string[]; // 升级时受保护的文件列表，这些文件不会被覆盖或删除
	ignore: string[]; // 升级时忽略的文件列表，这些文件不参与同步
	httpTimeout: number; // HTTP 请求超时时间（毫秒）
};

export type UmamiConfig = {
	enabled: boolean; // 是否启用 Umami 统计
	apiKey: string; // Umami API 密钥
	baseUrl: string; // Umami API 基础地址
	scripts: string; // 要插入的统计脚本
};
