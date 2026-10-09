// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
	id: number; // 唯一标识
	title: string; // 网站标题
	imgurl: string; // 网站图标或头像链接
	desc: string; // 网站描述
	siteurl: string; // 网站地址
	tags: string[]; // 分类标签
}

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
	return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

// 友情链接数据（此处填写内容）
export const friendsData: FriendItem[] = [
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
];
