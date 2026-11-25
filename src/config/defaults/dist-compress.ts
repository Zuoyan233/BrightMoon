import type { DistCompressConfig } from "../../types/config";

export const defaultDistCompressConfig: DistCompressConfig = {
	enable: true, // 是否启用构建后预压缩（生成 .br/.gz 文件）
	output: "both", // 压缩输出格式："both" 同时生成 .br 与 .gz，"brotli" 仅生成 .br，"gzip" 仅生成 .gz
	brotliQuality: 11, // Brotli 压缩等级（0-11），11 为最高等级，体积最小但构建耗时最长
	gzipLevel: 9, // Gzip 压缩等级（0-9）
	minSize: 1024, // 小于 1KB 的文件压缩收益可忽略，跳过
	maxSize: 16 * 1024 * 1024, // 大于 16MB 的文件压缩耗时长且收益递减，跳过
	excludeExtensions: [
		// 已是压缩格式，无需再压
		".woff",
		".woff2",
		".ttf",
		".otf",
		".png",
		".jpg",
		".jpeg",
		".webp",
		".avif",
		".gif",
		".mp3",
		".mp4",
		".webm",
		".ogg",
		".wav",
		".br",
		".gz",
		".zip",
		".moc",
		".mtn",
		".model.json",
		".wasm",
		".pdf",
	],
};
