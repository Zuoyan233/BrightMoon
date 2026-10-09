// 技能数据配置文件
// 用于管理技能展示页面的数据

export interface Skill {
	id: string; // 技能唯一标识
	name: string; // 技能名称
	description: string; // 技能描述
	icon: string; // Iconify 图标名称
	category: "frontend" | "backend" | "database" | "tools" | "other"; // 技能分类
	level: "beginner" | "intermediate" | "advanced" | "expert"; // 掌握程度：入门 / 中级 / 高级 / 专家
	experience: {
		years: number; // 经验年数
		months: number; // 经验月数
	};
	projects?: string[]; // 关联的项目 ID
	certifications?: string[]; // 相关证书
	color?: string; // 卡片主题色，格式为 #RRGGBB
}

// 获取技能统计信息
export const getSkillStats = () => {
	const total = skillsData.length;
	const byLevel = {
		beginner: skillsData.filter((s) => s.level === "beginner").length,
		intermediate: skillsData.filter((s) => s.level === "intermediate").length,
		advanced: skillsData.filter((s) => s.level === "advanced").length,
		expert: skillsData.filter((s) => s.level === "expert").length,
	};
	const byCategory = {
		frontend: skillsData.filter((s) => s.category === "frontend").length,
		backend: skillsData.filter((s) => s.category === "backend").length,
		database: skillsData.filter((s) => s.category === "database").length,
		tools: skillsData.filter((s) => s.category === "tools").length,
		other: skillsData.filter((s) => s.category === "other").length,
	};

	return { total, byLevel, byCategory };
};

// 获取指定分类的技能
export const getSkillsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return skillsData;
	}
	return skillsData.filter((s) => s.category === category);
};

// 获取高级技能
export const getAdvancedSkills = () => {
	return skillsData.filter(
		(s) => s.level === "advanced" || s.level === "expert",
	);
};

// 获取总经验
export const getTotalExperience = () => {
	const totalMonths = skillsData.reduce((total, skill) => {
		return total + skill.experience.years * 12 + skill.experience.months;
	}, 0);
	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};

// 技能数据（此处填写内容）
export const skillsData: Skill[] = [
	// 前端技能
	{
		id: "javascript", // 技能唯一标识
		name: "JavaScript", // 技能名称
		description: "现代 JavaScript 开发，包括 ES6+ 语法、异步编程和模块化开发。", // 技能描述
		icon: "logos:javascript", // Iconify 图标名称
		category: "frontend", // 技能分类
		level: "intermediate", // 掌握程度：入门 / 中级 / 高级 / 专家
		experience: { years: 3, months: 6 }, // 经验年数和月数
		projects: ["portfolio-website", "data-visualization-tool"], // 关联的项目 ID
		color: "#F7DF1E", // 卡片主题色，格式为 #RRGGBB
	},
	{
		id: "typescript",
		name: "TypeScript",
		description:
			"JavaScript 的一个类型安全的超集，可以提高代码质量和开发效率。",
		icon: "logos:typescript-icon",
		category: "frontend",
		level: "intermediate",
		experience: { years: 2, months: 8 },
		projects: ["portfolio-website", "task-manager-app"],
		color: "#3178C6",
	},
	{
		id: "vue",
		name: "Vue.js",
		description: "一个易于学习和使用的渐进式 JavaScript 框架，适合快速开发。",
		icon: "logos:vue",
		category: "frontend",
		level: "beginner",
		experience: { years: 1, months: 8 },
		projects: ["data-visualization-tool"],
		color: "#4FC08D",
	},
	{
		id: "astro",
		name: "Astro",
		description: "一款支持多框架集成且性能卓越的现代化静态网站生成器。",
		icon: "logos:astro-icon",
		category: "frontend",
		level: "intermediate",
		experience: { years: 1, months: 2 },
		projects: ["BrightMoon"],
		color: "#FF5D01",
	},
	{
		id: "sass",
		name: "Sass/SCSS",
		description: "一款 CSS 预处理器，提供变量、嵌套和 mixin 等高级功能。",
		icon: "logos:sass",
		category: "frontend",
		level: "intermediate",
		experience: { years: 2, months: 3 },
		projects: ["legacy-website"],
		color: "#CF649A",
	},

	// 后端技能
	{
		id: "nodejs",
		name: "Node.js",
		description:
			"基于 Chrome V8 引擎的 JavaScript 运行时环境，用于服务器端开发。",
		icon: "logos:nodejs-icon",
		category: "backend",
		level: "intermediate",
		experience: { years: 2, months: 3 },
		projects: ["data-visualization-tool", "e-commerce-platform"],
		color: "#339933",
	},
	{
		id: "csharp",
		name: "C#",
		description: "由微软开发的现代面向对象编程语言，适用于 .NET 生态系统。",
		icon: "devicon:csharp",
		category: "backend",
		level: "intermediate",
		experience: { years: 1, months: 6 },
		projects: ["desktop-application", "web-api"],
		color: "#239120",
	},
	{
		id: "cpp",
		name: "C++",
		description:
			"一种高性能系统编程语言，广泛应用于游戏开发、系统软件和嵌入式开发。",
		icon: "logos:c-plusplus",
		category: "backend",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		projects: ["game-engine", "system-optimization"],
		color: "#00599C",
	},
	{
		id: "php",
		name: "PHP",
		description: "一种广泛使用的服务器端脚本语言，尤其适用于 Web 开发。",
		icon: "logos:php",
		category: "backend",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		projects: ["cms-system", "e-commerce-backend"],
		color: "#777BB4",
	},

	// 数据库技能
	{
		id: "mysql",
		name: "MySQL",
		description:
			"全球最流行的开源关系数据库管理系统，广泛应用于 Web 应用程序。",
		icon: "logos:mysql-icon",
		category: "database",
		level: "advanced",
		experience: { years: 2, months: 6 },
		projects: ["e-commerce-platform", "blog-system"],
		color: "#4479A1",
	},
	{
		id: "mongodb",
		name: "MongoDB",
		description: "一款面向文档的NoSQL数据库，具有灵活的数据模型。",
		icon: "logos:mongodb-icon",
		category: "database",
		level: "intermediate",
		experience: { years: 1, months: 2 },
		color: "#47A248",
	},

	// 工具技能
	{
		id: "git",
		name: "Git",
		description: "分布式版本控制系统，是代码管理和团队协作的重要工具。",
		icon: "logos:git-icon",
		category: "tools",
		level: "intermediate",
		experience: { years: 3, months: 0 },
		color: "#F05032",
	},
	{
		id: "vscode",
		name: "VS Code",
		description: "一款轻量级但功能强大的代码编辑器，拥有丰富的插件生态系统。",
		icon: "logos:visual-studio-code",
		category: "tools",
		level: "expert",
		experience: { years: 3, months: 6 },
		color: "#007ACC",
	},
	{
		id: "webstorm",
		name: "WebStorm",
		description:
			"JetBrains 开发的专业 JavaScript 和 Web 开发 IDE，具有智能代码辅助功能。",
		icon: "logos:webstorm",
		category: "tools",
		level: "beginner",
		experience: { years: 2, months: 0 },
		projects: ["react-project", "vue-project"],
		color: "#00CDD7",
	},
	{
		id: "apache",
		name: "Apache HTTP Server",
		description: "全球最流行的网络服务器软件，稳定可靠的HTTP服务器。",
		icon: "logos:apache",
		category: "tools",
		level: "intermediate",
		experience: { years: 1, months: 6 },
		projects: ["traditional-web-server", "php-hosting"],
		color: "#D22128",
	},
	{
		id: "tomcat",
		name: "Apache Tomcat",
		description:
			"Java Servlet 容器和 Web 服务器，是 Java Web 应用程序的标准部署环境。",
		icon: "logos:tomcat",
		category: "tools",
		level: "intermediate",
		experience: { years: 1, months: 4 },
		projects: ["java-web-app", "servlet-container"],
		color: "#F8DC75",
	},
	{
		id: "linux",
		name: "Linux",
		description: "开源操作系统，是服务器部署和开发环境的首选。",
		icon: "logos:linux-tux",
		category: "tools",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		projects: ["server-management", "shell-scripting"],
		color: "#FCC624",
	},
	{
		id: "photoshop",
		name: "Photoshop",
		description: "专业图像编辑和设计软件。",
		icon: "logos:adobe-photoshop",
		category: "tools",
		level: "intermediate",
		experience: { years: 2, months: 6 },
		projects: ["ui-design", "image-processing"],
		color: "#31A8FF",
	},
];
