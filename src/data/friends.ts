// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
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
