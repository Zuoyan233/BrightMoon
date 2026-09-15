import type { LicenseConfig } from "../../types/config";

export const defaultLicenseConfig: LicenseConfig = {
	enable: true, // 启用文章底部版权声明
	name: "CC BY-NC-SA 4.0", // 许可证名称
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/", // 许可证链接
};
