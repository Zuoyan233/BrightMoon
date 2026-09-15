import type { AnnouncementConfig } from "../../types/config";

export const userAnnouncementConfig: Partial<AnnouncementConfig> = {
	title: "", // 公告标题，留空则不显示标题
	content: "Welcome to BrightMoon! Modern, feature-rich static blog.", // 公告内容
	closable: true, // 是否允许用户关闭公告
	link: {
		enable: false, // 启用公告链接
		text: "View more", // 链接文本
		url: "/about/", // 链接地址
		external: false, // 是否为外部链接
	},
};
