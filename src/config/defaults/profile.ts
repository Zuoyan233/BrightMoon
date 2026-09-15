import type { ProfileConfig } from "../../types/config";

export const defaultProfileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp", // 头像图片路径
	name: "Zuoyan", // 昵称
	bio: "The world is so big, I want to see it.", // 个人简介
	typewriter: {
		enable: true, // 启用个人简介打字机效果
		speed: 100, // 打字速度（毫秒）
	},
	links: [
		// 社交链接
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
	],
};
