import type { NavBarConfig } from "../../types/config";
import { LinkPreset } from "../../types/config";

export const userNavBarConfig: Partial<NavBarConfig> = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		// 自定义链接组
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
