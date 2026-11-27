import type { ImageOptimizeConfig } from "../../types/config";

export const defaultImageOptimizeConfig: ImageOptimizeConfig = {
	imageQuality: 80, // 图片压缩质量（0-100）
	tasks: [
		// 图片优化任务列表
		{
			name: "Desktop Banner", // 桌面端横幅图片
			sourceDir: "public/assets/desktop-banner", // 源目录
			dir: "dist/assets/desktop-banner", // 构建时目标目录
			maxWidth: 1920, // 最大宽度
			maxHeight: 1080, // 最大高度
			formats: ["webp"], // 输出格式
			recursive: true, // 是否递归处理子目录
		},
		{
			name: "Mobile Banner", // 移动端横幅图片
			sourceDir: "public/assets/mobile-banner",
			dir: "dist/assets/mobile-banner",
			maxWidth: 800,
			maxHeight: 1200,
			formats: ["webp"],
			recursive: true,
		},
		{
			name: "Home Images", // 首页图片
			sourceDir: "public/assets/home",
			dir: "dist/assets/home",
			maxWidth: 256,
			maxHeight: 256,
			formats: ["webp"],
			recursive: true,
		},
		{
			name: "Avatar", // 头像图片
			sourceDir: "src/assets/images",
			dir: "dist/_astro",
			maxWidth: 256,
			maxHeight: 256,
			formats: ["webp"],
			recursive: true,
		},
		{
			name: "Anime Covers", // 番剧封面
			sourceDir: "public/assets/anime",
			dir: "dist/assets/anime",
			maxWidth: 450,
			maxHeight: 600,
			formats: ["webp"],
			recursive: true,
		},
		{
			name: "Albums", // 相册图片
			sourceDir: "public/images/albums",
			dir: "dist/images/albums",
			maxWidth: 1920,
			maxHeight: 1080,
			formats: ["webp"],
			recursive: true,
		},
		{
			name: "Post Covers", // 文章封面
			sourceDir: "src/content/posts",
			dir: "dist/_astro",
			maxWidth: 1920,
			maxHeight: 1080,
			formats: ["webp"],
			recursive: true,
		},
		{
			name: "Posts", // 文章图片
			sourceDir: "public/images/posts",
			dir: "dist/images/posts",
			maxWidth: 1920,
			maxHeight: 1080,
			formats: ["webp"],
			recursive: true,
		},
		{
			name: "Sponsors", // 赞助二维码
			sourceDir: "public/images/sponsors",
			dir: "dist/images/sponsors",
			maxWidth: 600,
			maxHeight: 600,
			formats: ["webp"],
			recursive: true,
		},
		{
			name: "Contact QR", // 联系方式二维码
			sourceDir: "public/images/contact",
			dir: "dist/images/contact",
			maxWidth: 600,
			maxHeight: 600,
			formats: ["webp"],
			recursive: true,
		},
		{
			name: "Diary", // 日记图片
			sourceDir: "public/images/diary",
			dir: "dist/images/diary",
			maxWidth: 1920,
			maxHeight: 1080,
			formats: ["webp"],
			recursive: true,
		},
	],
};
