import type { ContactEmailConfig } from "../../types/config";

export const userContactEmailConfig: Partial<ContactEmailConfig> = {
	emails: [
		// 电子邮箱配置，请修改为你的真实邮箱
		{
			email: "Demo email 1, please change your email in src/config/user.ts",
			link: "https://example.mail.com/", // 邮箱服务链接
		},
		{
			email: "Demo email 2, please change your email in src/config/user.ts",
			link: "https://example.mail.com/",
		},
	],
};
