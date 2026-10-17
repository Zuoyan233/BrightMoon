import type { TimelineDataConfig } from "../../types/config";

// 时间线数据默认配置（示例数据，升级时会被覆盖）
export const defaultTimelineDataConfig: TimelineDataConfig = {
	// 时间线项目列表
	items: [
		{
			id: "current-study", // 时间线项目唯一标识
			title: "Computer Application Technology", // 标题
			description:
				"Focused on Web development and UI design. Before graduation, was awarded first and second-class university scholarships, Outstanding Graduate, and Outstanding Graduation Design — the most glorious moments of my academic career.", // 描述
			type: "education", // 类型：education=教育，work=工作，project=项目，achievement=成就
			startDate: "2021-09-11", // 开始日期
			endDate: "2024-06-21", // 结束日期
			location: "Guangzhou From", // 地点
			organization: "Guangzhou City Construction College", // 组织/公司/学校名称
			skills: ["JavaScript", "HTML", "CSS", "UI", "Node.JS", "MySQL"], // 相关技能
			achievements: [], // 成就列表
			icon: "material-symbols:school", // Iconify 图标名称
			color: "#059669", // 卡片主题色，格式为 #RRGGBB
			featured: true, // 是否为精选项目
		},
		{
			id: "work",
			title: "My first job",
			description:
				"First job, started working as a postal worker.Now graduated",
			type: "work",
			startDate: "2024-11-14",
			endDate: "2025-08-01",
			location: "Foshan Shunyi",
			organization: "China Post",
			skills: ["Mail sorting", "Damage Verification", "After-sales Work"],
			achievements: [],
			icon: "material-symbols:work",
			color: "#DC2626",
			featured: true,
		},
		{
			id: "web-develop",
			title: "BrightMoon",
			description:
				"Developed a personal open-source project using the Astro framework, Mizuki theme, and secondary development based on the open-source project. Currently, the website is successfully online, and there are secondary incomes.",
			type: "project",
			startDate: "2025-10-01",
			location: "Foshan Shunyi",
			organization: "Independent Developer",
			skills: ["Astro", "TypeScript", "Tailwind CSS", "MongoDB", "Svelte"],
			achievements: [],
			icon: "material-symbols:code",
			color: "#7C3AED",
			featured: true,
		},
	],
};
