import type { SkillsDataConfig } from "../../types/config";

// 技能数据用户配置
export const userSkillsDataConfig: Partial<SkillsDataConfig> = {
	items: [
		// 前端技能
		{
			id: "javascript", // 技能唯一标识
			name: "JavaScript", // 技能名称
			description:
				"Modern JavaScript development, including ES6+ syntax, asynchronous programming, and modular development.", // 技能描述
			icon: "logos:javascript", // Iconify 图标名称
			category: "frontend", // 技能分类：frontend=前端，backend=后端，database=数据库，tools=工具，other=其他
			level: "intermediate", // 掌握程度：beginner=入门，intermediate=熟练，advanced=精通，expert=专家
			experience: { years: 3, months: 6 }, // 经验时长
			projects: ["portfolio-website", "data-visualization-tool"], // 关联的项目 ID
			color: "#F7DF1E", // 卡片主题色，格式为 #RRGGBB
		},
		{
			id: "typescript",
			name: "TypeScript",
			description:
				"A type-safe superset of JavaScript that improves code quality and development efficiency.",
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
			description:
				"An easy-to-learn and use progressive JavaScript framework, ideal for rapid development.",
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
			description:
				"A modern static site generator that supports multi-framework integration with excellent performance.",
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
			description:
				"A CSS preprocessor that provides advanced features like variables, nesting, and mixins.",
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
				"A JavaScript runtime environment based on the Chrome V8 engine, used for server-side development.",
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
			description:
				"A modern object-oriented programming language developed by Microsoft, suitable for the .NET ecosystem.",
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
				"A high-performance systems programming language widely used in game development, system software, and embedded development.",
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
			description:
				"A widely used server-side scripting language, especially suitable for web development.",
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
				"The world's most popular open-source relational database management system, widely used in web applications.",
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
			description:
				"A document-oriented NoSQL database with a flexible data model.",
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
			description:
				"A distributed version control system, an essential tool for code management and team collaboration.",
			icon: "logos:git-icon",
			category: "tools",
			level: "intermediate",
			experience: { years: 3, months: 0 },
			color: "#F05032",
		},
		{
			id: "vscode",
			name: "VS Code",
			description:
				"A lightweight yet powerful code editor with a rich plugin ecosystem.",
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
				"A professional JavaScript and web development IDE by JetBrains, featuring intelligent code assistance.",
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
			description:
				"The world's most popular web server software, a stable and reliable HTTP server.",
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
				"A Java Servlet container and web server, the standard deployment environment for Java web applications.",
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
			description:
				"An open-source operating system, the preferred choice for server deployment and development environments.",
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
			description: "Professional image editing and design software.",
			icon: "logos:adobe-photoshop",
			category: "tools",
			level: "intermediate",
			experience: { years: 2, months: 6 },
			projects: ["ui-design", "image-processing"],
			color: "#31A8FF",
		},
	],
};
