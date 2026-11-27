import type { ContactEmailConfig } from "../../types/config";

export const defaultContactEmailConfig: ContactEmailConfig = {
	emails: [
		// 电子邮箱配置，请在 src/config/user/contact-email.ts 中修改
		{
			email: "Demo email 1, please change your email in src/config/user.ts", // 电子邮箱
			link: "https://example.mail.com/", // 邮箱服务链接
		},
		{
			email: "Demo email 2, please change your email in src/config/user.ts",
			link: "https://example.mail.com/",
		},
	],
};
