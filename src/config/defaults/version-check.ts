import type { VersionCheckConfig } from "../../types/config";

export const defaultVersionCheckConfig: VersionCheckConfig = {
	enable: true, // 启用版本检查功能
	autoCheck: true, // 自动检查更新
	apiUrl:
		"https://api.github.com/repos/Zuoyan233/BrightMoon/releases?per_page=5", // GitHub Releases API 地址
	versionPrefixPattern: "^(CE_V|v)", // 版本号前缀匹配正则
};
