import type { DiaryDataConfig } from "../../types/config";

// 日记数据用户配置
export const userDiaryDataConfig: Partial<DiaryDataConfig> = {
	items: [
		{
			id: 1, // 唯一标识
			content: "Welcome to Blue Archive !", // 日记内容
			date: "2026-04-10T12:00:00Z", // 发布日期（ISO 格式）
			images: ["/images/diary/2026-4-10.webp"], // 配图路径列表
		},
	],
};
