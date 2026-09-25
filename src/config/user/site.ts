import type { SiteConfig } from "../../types/config";
import { getTranslateLanguageFromConfig } from "../../utils/language-utils";
import { SITE_LANG, SITE_TIMEZONE } from "./constants";

export const userSiteConfig: Partial<SiteConfig> = {
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
			// 默认壁纸模式：banner=顶部横幅，fullscreen=全屏壁纸，fullscreen-banner=全屏横幅，none=无壁纸
			defaultMode: "banner",
			// 默认横幅位置（banner 与 fullscreen-banner 模式时生效，支持桌面端、平板端与移动端）：top=顶部对齐，center=居中，bottom=底部对齐
			defaultBannerPosition: "center",
			// 默认壁纸位置（全屏壁纸时生效，支持桌面端、平板端与移动端）：top=顶部对齐，center=居中，bottom=底部对齐
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

	// 顶部加载条配置
	progressBar: {
		enable: true, // 是否启用顶部加载条
		fadeDuration: 400, // 加载完成后淡出时长（毫秒）
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
			vmId: "your-bilibili-id", // 在此处设置你的Bilibili用户ID (vmid)，例如 "352580971"
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
		},

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
				forceFestivalMode: true, // 节日时强制切换到全屏横幅模式、启用樱花飘落特效并更改主题色色相
				dates: [
					{
						date: "01-01", // 格式 MM-DD 或 MM-DD~MM-DD（日期范围），如需周年递进请改用 startDate
						title: "Happy New Year !", // 节日横幅主标题，date 类型支持 {year} 占位符（当前年份），startDate 类型支持 {years} 占位符（周年数）
						subtitle: "May the new year bring you joy and happiness", // 节日横幅副标题
						imageSrc: "/assets/falling/firecrackers.png", // 自定义飘落图片路径，不设置则使用默认图片
					},
					{
						date: "02-14",
						title: "Happy Valentine's Day !",
						subtitle: ["Love is in the air", "Be my Valentine"],
						imageSrc: "/assets/falling/sakura.png",
					},
					{
						date: "03-08",
						title: "Happy Women's Day !",
						subtitle: "Celebrating the strength and grace of women",
						imageSrc: "/assets/falling/sakura.png",
					},
					{
						date: "04-01",
						title: "April Fools' Day !",
						subtitle: "Watch out for pranks today !",
						imageSrc: "/assets/falling/green_leaf.png",
					},
					{
						date: "05-01",
						title: "Happy Labour Day !",
						subtitle: "Celebrating the workers of the world",
						imageSrc: "/assets/falling/birthday.png",
					},
					{
						date: "06-01",
						title: "Happy Children's Day !",
						subtitle: "May you always keep a childlike heart",
						imageSrc: "/assets/falling/heart.png",
					},
					{
						date: "10-01~10-07",
						title: "Happy National Day !",
						subtitle: [
							"Celebrating the motherland",
							"Wishing prosperity and happiness",
						],
						imageSrc: "/assets/falling/birthday.png",
					},
					{
						date: "12-25",
						title: "Merry Christmas !",
						subtitle: [
							"Jingle bells, jingle bells",
							"Wishing you warmth and joy",
						],
						imageSrc: "/assets/falling/snowflake.png",
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

	breadcrumb: {
		enable: true, // 启用面包屑导航
	},

	toc: {
		enable: true, // 启用目录功能
		responsive: {
			// 设备响应式配置（最佳设置，不建议修改），"float" 悬浮按钮模式， "sidebar" 侧边栏模式
			mobile: "float", // 移动端默认使用 "float" 悬浮按钮模式
			tablet: "sidebar", // 平板端默认使用 "sidebar" 侧边栏模式，可选 "float" 悬浮按钮模式
			desktop: "sidebar", // 桌面端默认使用 "sidebar" 侧边栏模式，可选 "float" 悬浮按钮模式
		},
		depth: 3, // 目录深度，1-6，1 表示只显示 h1 标题，2 表示显示 h1 和 h2 标题，依此类推
		useJapaneseBadge: true, // 使用日语假名标记（あいうえお...）代替数字，开启后会将 1、2、3... 改为 あ、い、う...
	},
	showCoverInContent: true, // 在文章内容页显示文章封面
	generateOgImages: false, // 启用生成OpenGraph图片功能,注意开启后要渲染很长时间，不建议本地调试的时候开启
	favicon: [
		// 留空以使用默认 favicon
	],

	// 字体配置
	font: {
		fontFamily: "MiSans-Normal", // 字体名称（用于 CSS font-family）
		fontWeight: "500", // 字体粗细
		localFonts: ["MiSans-Normal.woff2"], // 源字体文件（支持 TTF / OTF / WOFF / WOFF2）：WOFF/WOFF2 跳过，TTF/OTF 按站点实际使用的字符子集化并输出为 WOFF2
		// Web 字体文件路径（WOFF2 格式，在浏览器中实际使用）
		// 注意：子集化仅在构建时作用于 dist 输出目录；Dev 环境直接使用 public/assets/font/ 下的源文件，请确保该目录下存在对应文件
		fontFile: "/assets/font/MiSans-Normal.woff2",
		enableCompress: true, // 是否启用字体子集优化（减少字体文件大小，只保留实际使用的字符）
	},
	showLastModified: true, // 控制"上次编辑"卡片显示的开关

	thirdPartyAnalytics: {
		enable: false, // 是否启用第三方统计，默认关闭，启用可能影响 Lighthouse 评分
		gtmId: "", // Google Tag Manager 容器 ID，留空则不加载 GTM
		clarityId: "", // Clarity 项目 ID，留空则不加载 Clarity
	},
};
