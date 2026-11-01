import type { FriendsDataConfig } from "../../types/config";

// 友链数据用户配置
export const userFriendsDataConfig: Partial<FriendsDataConfig> = {
	items: [
		{
			id: 1, // 唯一标识
			title: "Astro", // 网站标题
			imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640", // 网站图标或头像链接
			desc: "The web framework for content-driven websites", // 网站描述
			siteurl: "https://github.com/withastro/astro", // 网站地址
			tags: ["Framework"], // 分类标签
		},
		{
			id: 2,
			title: "Twikoo",
			imgurl: "https://avatars.githubusercontent.com/u/92834001?s=200&v=4",
			desc: "A simple, safe, free comment system",
			siteurl: "https://twikoo.js.org/",
			tags: ["Comment-System"],
		},
		{
			id: 3,
			title: "Tailwind CSS",
			imgurl:
				"https://www.runoob.com/wp-content/uploads/2024/11/Tailwind_CSS_Logo.png",
			desc: "A utility-first CSS framework for rapidly building custom user interfaces",
			siteurl: "https://tailwindcss.com/",
			tags: ["CSS"],
		},
		{
			id: 4,
			title: "Svelte",
			imgurl: "https://v4.svelte.dev/favicon.png",
			desc: "Cybernetically enhancedweb apps",
			siteurl: "https://v4.svelte.dev/",
			tags: ["Framework"],
		},
	],
};
