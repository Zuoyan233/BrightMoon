import type { UpgradeConfig } from "../../types/config";

export const defaultUpgradeConfig: UpgradeConfig = {
	protected: [
		// 升级时受保护的文件路径（不会被覆盖）
		"src/config/user/**", // 用户配置
		"src/content/**", // 用户内容
		"src/assets/images/**", // 用户图片
		"src/config/user/friends-data.ts", // 友链数据
		"src/config/user/diary-data.ts", // 日记数据
		"src/config/user/projects-data.ts", // 项目数据
		"src/config/user/skills-data.ts", // 技能数据
		"src/config/user/timeline-data.ts", // 时间线数据
		"src/config/user/anime-data.ts", // 番剧数据
		"src/config/user/bilibili-data.json", // Bilibili 番剧数据
		"src/config/user/bangumi-data.json", // Bangumi 番剧数据
		"src/config/user/anime-data.json", // 动漫数据
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
