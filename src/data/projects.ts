// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	visitUrl?: string; // 添加前往项目链接字段
}

export const projectsData: Project[] = [
	{
		id: "BrightMoon",
		title: "BrightMoon",
		description:
			"Modern static blog theme with distinctive anime-style features. Powered by Astro framework.",
		image: "",
		category: "web",
		techStack: ["Astro", "TypeScript", "Tailwind CSS", "MongoDB", "Svelte"],
		status: "completed",
		liveDemo: "https://www.zuoyanblogs.xyz/",
		sourceCode: "https://github.com/Zuoyan233", // 更改为GitHub链接
		visitUrl: "https://github.com/Zuoyan233/BrightMoon", // 添加前往项目链接
		startDate: "2025-10-01",
		endDate: "2025-12-06",
		featured: true,
		tags: ["Blog", "Theme", "Open Source"],
	},
];

// Get project statistics
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

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
