import type { PermalinkConfig } from "../../types/config";

export const defaultPermalinkConfig: PermalinkConfig = {
	enable: false, // 启用自定义永久链接格式
	format: "%postname%", // 永久链接格式，支持 %postname% 文章标题、%year% 年份等占位符
};
