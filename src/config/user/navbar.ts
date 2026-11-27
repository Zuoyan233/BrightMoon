import type { NavBarConfig } from "../../types/config";
import { LinkPreset } from "../../types/config";

export const userNavBarConfig: Partial<NavBarConfig> = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		// 自定义链接组
		{
			name: "Links", // 自定义链接组名称
			url: "/links/", // 自定义链接组链接
			icon: "material-symbols:link", // 图标名称，格式为 "material-symbols:图标名称"

			// 自定义链接组子链接
			children: [
				{
					name: "Bilibili", // 名称
					url: "https://space.bilibili.com/352580971", // 链接
					external: true, // 是否在新标签页打开
					icon: "fa6-brands:bilibili", // 图标名称，格式为 "fa6-brands:图标名称"
				},
				{
					name: "GitHub",
					url: "https://github.com/Zuoyan233",
					external: true,
					icon: "fa6-brands:github",
				},
			],
		},
		// 个人页面链接组
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
		// 关于页面链接组
		{
			name: "About",
			url: "/content/",
			icon: "material-symbols:info",
			children: [LinkPreset.About, LinkPreset.Friends],
		},
		// 其他链接组
		{
			name: "Others",
			url: "#",
			icon: "material-symbols:more-horiz",
			children: [LinkPreset.Feedback, LinkPreset.Sponsors],
		},
	],
};
