// 项目数据配置文件
// 用于管理项目展示页面的数据

export interface Project {
	id: string; // 项目唯一标识
	title: string; // 项目名称
	description: string; // 项目描述
	image: string; // 项目封面图路径
	category: "web" | "mobile" | "desktop" | "other"; // 项目分类
	techStack: string[]; // 技术栈列表
	status: "completed" | "in-progress" | "planned"; // 项目状态：已完成 / 进行中 / 计划中
	liveDemo?: string; // 在线演示地址
	sourceCode?: string; // 源码仓库地址
	startDate: string; // 项目开始日期
	endDate?: string; // 项目结束日期
	featured?: boolean; // 是否为精选项目
	tags?: string[]; // 项目标签
	visitUrl?: string; // 项目访问链接
}

// 获取项目统计数据
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter((p) => p.status === "completed").length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// 根据分类获取项目
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// 获取精选项目
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// 获取所有技术栈
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};

// 项目数据（此处填写内容）
export const projectsData: Project[] = [
	{
		id: "BrightMoon", // 项目唯一标识
		title: "BrightMoon", // 项目名称
		description:
			"Modern static blog theme with distinctive anime-style features. Powered by Astro framework.", // 项目描述
		image: "", // 项目封面图路径
		category: "web", // 项目分类
		techStack: ["Astro", "TypeScript", "Tailwind CSS", "MongoDB", "Svelte"], // 技术栈列表
		status: "completed", // 项目状态：已完成 / 进行中 / 计划中
		liveDemo: "https://www.zuoyanblogs.xyz/", // 在线演示地址
		sourceCode: "https://github.com/Zuoyan233", // 源码仓库地址
		visitUrl: "https://github.com/Zuoyan233/BrightMoon", // 项目访问链接
		startDate: "2025-10-01", // 项目开始日期
		endDate: "2025-12-06", // 项目结束日期
		featured: true, // 是否为精选项目
		tags: ["Blog", "Theme", "Open Source"], // 项目标签
	},
];
