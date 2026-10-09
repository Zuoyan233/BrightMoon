// 本地番剧数据配置
// 用于管理本地存储的番剧数据

export type AnimeItem = {
	title: string; // 番剧标题
	status: "watching" | "completed" | "planned"; // 观看状态：追番中 / 已看完 / 计划看
	rating: number; // 个人评分（0-10）
	cover: string; // 封面图片路径
	description: string; // 番剧简介
	episodes: string; // 集数信息
	year: string; // 播出年份
	genre: string[]; // 标签 / 类型
	studio: string; // 制作公司
	link: string; // 番剧页面链接
	progress: number; // 当前观看进度
	totalEpisodes: number; // 总集数
	startDate: string; // 开始播出日期
	endDate: string; // 完结日期
};

// 本地番剧数据（此处填写内容）
const localAnimeList: AnimeItem[] = [
	{
		title: "Pokémon", // 番剧标题
		status: "completed", // 观看状态：追番中 / 已看完 / 计划看
		rating: 10, // 个人评分（0-10）
		cover: "/assets/anime/Pokémon.webp", // 封面图片路径
		description: '"I got a Pokémon!!"', // 番剧简介
		episodes: "271 episodes", // 集数信息
		year: "1997", // 播出年份
		genre: ["Hot-blooded ", "Battle", "Inspirational", "Children"], // 标签 / 类型
		studio: "OLM TEAM OTA", // 制作公司
		link: "https://www.bilibili.com/bangumi/media/md5761", // 番剧页面链接
		progress: 271, // 当前观看进度
		totalEpisodes: 271, // 总集数
		startDate: "1997-04", // 开始播出日期
		endDate: "2001-09", // 完结日期
	},
	{
		title: "Himouto! Umaru-chan",
		status: "completed",
		rating: 9.8,
		cover: "/assets/anime/Himouto! Umaru-chan.webp",
		description:
			"The perfect little sister, the perfect high school student, but at home she's a super lazy himouto.",
		episodes: "12 episodes",
		year: "2015",
		genre: ["Slice of Life", "Moe"],
		studio: "Doga Kobo",
		link: "https://www.bilibili.com/bangumi/media/md2580",
		progress: 12,
		totalEpisodes: 12,
		startDate: "2015-07",
		endDate: "2015-09",
	},
	{
		title: "LoveLive! Sunshine",
		status: "completed",
		rating: 9.7,
		cover: "/assets/anime/LoveLive! Sunshine.webp",
		description:
			"The story of nine girls who strive forward with radiance as their goal.",
		episodes: "13 episodes",
		year: "2016",
		genre: ["Music", "Idol"],
		studio: "SUNRISE",
		link: "https://www.bilibili.com/bangumi/media/md5062",
		progress: 13,
		totalEpisodes: 13,
		startDate: "2016-01",
		endDate: "2016-03",
	},
	{
		title: "Nichijou",
		status: "completed",
		rating: 10,
		cover: "/assets/anime/Nichijou.webp",
		description: "Today is another warm, healing, and leisurely day.",
		episodes: "26 episodes",
		year: "2011",
		genre: ["Moe", "Comedy", "Slice of Life", "Manga Adaptation"],
		studio: "Kyoto Animation",
		link: "https://www.bilibili.com/bangumi/media/md844",
		progress: 26,
		totalEpisodes: 26,
		startDate: "2011-04",
		endDate: "2011-06",
	},
	{
		title: "CITY",
		status: "completed",
		rating: 9.8,
		cover: "/assets/anime/CITY.webp",
		description:
			"Welcome to the wonderfully thrilling CITY where heart-pounding moments await!",
		episodes: "13 episodes",
		year: "2025",
		genre: ["Manga Adaptation", "Slice of Life", "Comedy"],
		studio: "Kyoto Animation",
		link: "https://www.bilibili.com/bangumi/media/md26367205",
		progress: 12,
		totalEpisodes: 12,
		startDate: "2025-07",
		endDate: "2025-10",
	},
	{
		title: "Zootopia",
		status: "completed",
		rating: 9.3,
		cover: "/assets/anime/Zootopia.webp",
		description:
			"In this city, rabbit officer Judy and fox Nick team up to uncover a major conspiracy that could shake the very foundation of the animal city.",
		episodes: "1 episodes",
		year: "2016",
		genre: ["Comedy", "Animation", "Adventure"],
		studio: "The Walt Disney Company",
		link: "https://www.bilibili.com/bangumi/media/md28337870",
		progress: 1,
		totalEpisodes: 1,
		startDate: "2016-07",
		endDate: "2016-07",
	},
	{
		title: "Zootopia 2",
		status: "completed",
		rating: 8.4,
		cover: "/assets/anime/Zootopia_2.webp",
		description:
			"The arrival of a mysterious reptile turns the warm and cozy Zootopia completely upside down. Facing a brand new city crisis, rabbit officer Judy and fox Nick once again join forces to protect Zootopia.",
		episodes: "1 episodes",
		year: "2025",
		genre: ["Comedy", "Animation", "Adventure"],
		studio: "The Walt Disney Company",
		link: "https://www.bilibili.com/bangumi/media/md26368676",
		progress: 1,
		totalEpisodes: 1,
		startDate: "2025-11",
		endDate: "2025-11",
	},
	{
		title: "SPY x FAMILY",
		status: "completed",
		rating: 9.7,
		cover: "/assets/anime/SPY x FAMILY.webp",
		description:
			"Everyone has a hidden side. This is an era where nations around the world are secretly engaged in intense intelligence warfare.",
		episodes: "25 episodes",
		year: "2022",
		genre: ["Anime Adaptation", "Battle", "Comedy", "Slice of Life"],
		studio: "WIT STUDIO × CloverWorks",
		link: "https://www.bilibili.com/bangumi/media/md28237119",
		progress: 25,
		totalEpisodes: 25,
		startDate: "2022-04",
		endDate: "2022-07",
	},
	{
		title: "SPY x FAMILY Season 2",
		status: "completed",
		rating: 9.7,
		cover: "/assets/anime/SPY x FAMILY_2.webp",
		description:
			"Everyone has a hidden side. This is an era where nations around the world are secretly engaged in intense intelligence warfare.",
		episodes: "12 episodes",
		year: "2023",
		genre: ["Anime Adaptation", "Battle", "Comedy", "Slice of Life"],
		studio: "WIT STUDIO × CloverWorks",
		link: "https://www.bilibili.com/bangumi/media/md21086686",
		progress: 12,
		totalEpisodes: 12,
		startDate: "2023-10",
		endDate: "2023-12",
	},
	{
		title: "SPY x FAMILY Season 3",
		status: "watching",
		rating: 9.7,
		cover: "/assets/anime/SPY x FAMILY_3.webp",
		description:
			"Everyone has a hidden side. This is an era where nations around the world are secretly engaged in intense intelligence warfare.",
		episodes: "13 episodes",
		year: "2025",
		genre: ["Anime Adaptation", "Battle", "Comedy", "Slice of Life"],
		studio: "WIT STUDIO × CloverWorks",
		link: "https://www.bilibili.com/bangumi/media/md27709925",
		progress: 7,
		totalEpisodes: 13,
		startDate: "2025-10",
		endDate: "2025-12",
	},
	{
		title: "Natsume's Book of Friends",
		status: "completed",
		rating: 9.8,
		cover: "/assets/anime/Natsume's Book of Friends.webp",
		description:
			"High school student Takashi Natsume has had the ability to see yokai since childhood.",
		episodes: "13 episodes",
		year: "2008",
		genre: ["Fantasy", "Healing", "Tear-jerker", "Slice of Life"],
		studio: "Brain's･Base",
		link: "https://www.bilibili.com/bangumi/media/md1660",
		progress: 13,
		totalEpisodes: 13,
		startDate: "2021-07",
		endDate: "2021-07",
	},
	{
		title: "Natsume's Book of Friends Season 7",
		status: "completed",
		rating: 9.9,
		cover: "/assets/anime/Natsume's Book of Friends_7.webp",
		description:
			"High school student Takashi Natsume has had the ability to see yokai since childhood.",
		episodes: "13 episodes",
		year: "2024",
		genre: ["Fantasy", "Healing", "Tear-jerker", "Slice of Life"],
		studio: "Brain's･Base",
		link: "https://www.bilibili.com/bangumi/media/md23053814",
		progress: 13,
		totalEpisodes: 13,
		startDate: "2024-10",
		endDate: "2024-12",
	},
];

export default localAnimeList;
