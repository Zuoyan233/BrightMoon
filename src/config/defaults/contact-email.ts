import type { ContactEmailConfig } from "../../types/config";

export const defaultContactEmailConfig: ContactEmailConfig = {
	emails: [
		// 电子邮箱配置，请在 src/config/user/contact-email.ts 中修改
		{
			email: "演示邮箱1，请在src/config/user.ts中修改你的电子邮箱",
			link: "https://example.mail.com/", // 邮箱服务链接
		},
		{
			email: "演示邮箱2，请在src/config/user.ts中修改你的电子邮箱",
			link: "https://example.mail.com/",
		},
	],
};
