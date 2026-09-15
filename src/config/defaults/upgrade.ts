import type { UpgradeConfig } from "../../types/config";

export const defaultUpgradeConfig: UpgradeConfig = {
	protected: [
		// 升级时受保护的文件路径（不会被覆盖）
		"src/config/user/**", // 用户配置
		"src/content/**", // 用户内容
		"src/assets/images/**", // 用户图片
		"src/data/friends.ts", // 友链数据
		"src/data/diary.ts", // 日记数据
		"src/data/projects.ts", // 项目数据
		"src/data/skills.ts", // 技能数据
		"src/data/timeline.ts", // 时间线数据
		"src/data/anime.ts", // 番剧数据
		"src/data/bilibili-data.json", // Bilibili 番剧数据
		"src/data/bangumi-data.json", // Bangumi 番剧数据
		"src/data/anime-data.json", // 动漫数据
		"public/assets/anime/**", // 番剧资源
		"public/assets/css/**", // 自定义 CSS
		"public/assets/desktop-banner/**", // 桌面横幅
		"public/assets/font/**", // 字体文件
		"public/assets/home/**", // 首页资源
		"public/assets/mobile-banner/**", // 移动横幅
		"public/favicon/**", // 网站图标
		"public/images/**", // 图片资源
		"public/pio/**", // 看板娘资源
		".env", // 环境变量
		".vscode/**", // VS Code 配置
		".npmrc", // npm 配置
	],
	ignore: [
		// 升级时忽略的文件路径
		".git/**",
		"node_modules/**",
		".astro/**",
		"dist/**",
		".upgrade-tmp/**",
		"update/**",
		"backup/**",
	],
	httpTimeout: 30000, // HTTP 请求超时时间（毫秒）
};
