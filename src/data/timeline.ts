// 时间线数据配置文件
// 用于管理时间线页面的数据

export interface TimelineItem {
	id: string; // 时间线项目唯一标识
	title: string; // 标题
	description: string; // 描述
	type: "education" | "work" | "project" | "achievement"; // 类型：教育 / 工作 / 项目 / 成就
	startDate: string; // 开始日期
	endDate?: string; // 结束日期（为空表示当前进行中）
	location?: string; // 地点
	organization?: string; // 组织 / 公司 / 学校名称
	position?: string; // 职位 / 学位
	skills?: string[]; // 相关技能
	achievements?: string[]; // 成就列表
	links?: {
		name: string; // 链接名称
		url: string; // 链接地址
		type: "website" | "certificate" | "project" | "other"; // 链接类型
	}[];
	icon?: string; // Iconify 图标名称
	color?: string; // 卡片主题色，格式为 #RRGGBB
	featured?: boolean; // 是否为精选项目
}

// 获取时间线统计数据
export const getTimelineStats = () => {
	const total = timelineData.length;
	const byType = {
		education: timelineData.filter((item) => item.type === "education").length,
		work: timelineData.filter((item) => item.type === "work").length,
		project: timelineData.filter((item) => item.type === "project").length,
		achievement: timelineData.filter((item) => item.type === "achievement")
			.length,
	};

	return { total, byType };
};

// 根据类型获取时间线项目
export const getTimelineByType = (type?: string) => {
	if (!type || type === "all") {
		return timelineData.sort(
			(a, b) =>
				new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
		);
	}
	return timelineData
		.filter((item) => item.type === type)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
		);
};

// 获取精选时间线项目
export const getFeaturedTimeline = () => {
	return timelineData
		.filter((item) => item.featured)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
		);
};

// 时间线数据（此处填写内容）
export const timelineData: TimelineItem[] = [
	{
		id: "current-study", // 时间线项目唯一标识
		title: "计算机应用技术", // 标题
		description:
			"专注于 Web 开发和 UI 设计，毕业前评选一二级校级奖学金、优秀毕业生与优秀毕业设计，是读书生涯最高光时刻", // 描述
		type: "education", // 类型：教育 / 工作 / 项目 / 成就
		startDate: "2021-09-11", // 开始日期
		endDate: "2024-06-21", // 结束日期
		location: "广州从化", // 地点
		organization: "广州城建职业学院", // 组织 / 公司 / 学校名称
		skills: ["JavaScript", "HTML", "CSS", "UI", "Node.JS", "MySQL"], // 相关技能
		achievements: [], // 成就列表
		icon: "material-symbols:school", // Iconify 图标名称
		color: "#059669", // 卡片主题色，格式为 #RRGGBB
		featured: true, // 是否为精选项目
	},
	{
		id: "work",
		title: "中国邮政",
		description: "人生第一份工作，开始邮政人打工生活，现在已经毕业",
		type: "work",
		startDate: "2024-11-14",
		endDate: "2025-08-01",
		location: "佛山顺德",
		organization: "开始工作",
		skills: ["邮件分拣", "破损验单", "售后工单"],
		achievements: [],
		icon: "material-symbols:work",
		color: "#DC2626",
		featured: true,
	},
	{
		id: "web-develop",
		title: "BrightMoon",
		description:
			"个人开发的开源项目，采用 Astro 框架、Mizuki 主题开源项目基础上二次开发。目前网站成功上线，已有副业收入",
		type: "project",
		startDate: "2025-10-01",
		location: "佛山顺德",
		organization: "独立开发者",
		skills: ["Astro", "TypeScript", "Tailwind CSS", "MongoDB", "Svelte"],
		achievements: [],
		icon: "material-symbols:code",
		color: "#7C3AED",
		featured: true,
	},
];
