import type { ProjectsDataConfig } from "../../types/config";

// 项目数据默认配置
export const defaultProjectsDataConfig: ProjectsDataConfig = {
	items: [
		{
			id: "BrightMoon", // 项目唯一标识
			title: "BrightMoon", // 项目名称
			description:
				"Modern static blog theme with distinctive anime-style features. Powered by Astro framework.", // 项目描述
			image: "", // 项目封面图路径
			category: "web", // 项目分类：web=网站，mobile=移动端，desktop=桌面端，other=其他
			techStack: ["Astro", "TypeScript", "Tailwind CSS", "MongoDB", "Svelte"], // 技术栈列表
			status: "completed", // 项目状态：completed=已完成，in-progress=进行中，planned=计划中
			liveDemo: "https://www.zuoyanblog.dpdns.org/", // 在线演示地址
			sourceCode: "https://github.com/Zuoyan233", // 源码仓库地址
			visitUrl: "https://github.com/Zuoyan233/BrightMoon", // 项目访问链接
			startDate: "2025-10-01", // 项目开始日期
			endDate: "2025-12-06", // 项目结束日期
			featured: true, // 是否为精选项目
			tags: ["Blog", "Theme", "Open Source"], // 项目标签
		},
	],
};
