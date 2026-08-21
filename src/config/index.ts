/**
 * BrightMoon 配置入口（合并默认值与用户覆盖）
 *
 * 本文件由框架维护，请勿在此处修改个人配置：
 *   - 默认值请见 src/config/defaults.ts（升级时会被覆盖）
 *   - 用户配置请见 src/config/user.ts（升级时受保护）
 *
 * 业务代码无需改动，仍然从 '@/config' 或 '../config' 引入同名导出。
 */

import type {
	AddpaymentConfig,
	AnnouncementConfig,
	CommentConfig,
	ContactEmailConfig,
	ContactMethods,
	ExpressiveCodeConfig,
	ExternalLinkConfirmConfig,
	FooterConfig,
	LicenseConfig,
	MusicPlayerConfig,
	NavBarConfig,
	PermalinkConfig,
	PioConfig,
	ProfileConfig,
	SakuraConfig,
	ShareConfig,
	SidebarLayoutConfig,
	SiteConfig,
	UmamiConfig,
	UpgradeConfig,
	VersionCheckConfig,
	WeatherConfig,
} from "../types/config";
import {
	defaultAddpaymentConfig,
	defaultAnnouncementConfig,
	defaultCommentConfig,
	defaultContactEmailConfig,
	defaultContactMethods,
	defaultExpressiveCodeConfig,
	defaultExternalLinkConfirmConfig,
	defaultFooterConfig,
	defaultLicenseConfig,
	defaultMusicPlayerConfig,
	defaultNavBarConfig,
	defaultPermalinkConfig,
	defaultPioConfig,
	defaultProfileConfig,
	defaultSakuraConfig,
	defaultShareConfig,
	defaultSidebarLayoutConfig,
	defaultSiteConfig,
	defaultUmamiConfig,
	defaultUpgradeConfig,
	defaultVersionCheckConfig,
	defaultWeatherConfig,
} from "./defaults";
import { userConfig } from "./user";

/**
 * 深合并工具：递归合并 override 中的值到 base 中
 * @param base - 默认值（来自 config/defaults.ts）
 * @param override - 用户覆盖值（来自 config/user.ts）
 * @returns 合并后的配置对象
 */
function deepMerge<T>(base: T, override: Partial<T> | undefined): T {
	if (override === undefined || override === null) return base;

	// 数组或非纯对象直接替换
	if (Array.isArray(override) || typeof override !== "object") {
		return override as T;
	}

	// base 不是对象则直接返回 override
	if (typeof base !== "object" || base === null || Array.isArray(base)) {
		return override as T;
	}

	// 递归合并对象
	const result: Record<string, unknown> = {
		...(base as Record<string, unknown>),
	};
	for (const key of Object.keys(override as Record<string, unknown>)) {
		const baseVal = (base as Record<string, unknown>)[key];
		const overrideVal = (override as Record<string, unknown>)[key];
		if (
			typeof baseVal === "object" &&
			baseVal !== null &&
			!Array.isArray(baseVal) &&
			typeof overrideVal === "object" &&
			overrideVal !== null &&
			!Array.isArray(overrideVal)
		) {
			result[key] = deepMerge(baseVal, overrideVal as Partial<typeof baseVal>);
		} else if (overrideVal !== undefined) {
			result[key] = overrideVal;
		}
	}
	return result as T;
}

// 导出合并后的配置（保持与原 config.ts 完全相同的导出名）

export const siteConfig: SiteConfig = deepMerge(
	defaultSiteConfig,
	userConfig.siteConfig,
);

export const navBarConfig: NavBarConfig = deepMerge(
	defaultNavBarConfig,
	userConfig.navBarConfig,
);

export const profileConfig: ProfileConfig = deepMerge(
	defaultProfileConfig,
	userConfig.profileConfig,
);

export const licenseConfig: LicenseConfig = deepMerge(
	defaultLicenseConfig,
	userConfig.licenseConfig,
);

export const permalinkConfig: PermalinkConfig = deepMerge(
	defaultPermalinkConfig,
	userConfig.permalinkConfig,
);

export const expressiveCodeConfig: ExpressiveCodeConfig = deepMerge(
	defaultExpressiveCodeConfig,
	userConfig.expressiveCodeConfig,
);

export const commentConfig: CommentConfig = deepMerge(
	defaultCommentConfig,
	userConfig.commentConfig,
);

export const shareConfig: ShareConfig = deepMerge(
	defaultShareConfig,
	userConfig.shareConfig,
);

export const externalLinkConfirmConfig: ExternalLinkConfirmConfig = deepMerge(
	defaultExternalLinkConfirmConfig,
	userConfig.externalLinkConfirmConfig,
);

export const contactEmailConfig: ContactEmailConfig = deepMerge(
	defaultContactEmailConfig,
	userConfig.contactEmailConfig,
);

export const contactMethods: ContactMethods = deepMerge(
	defaultContactMethods,
	userConfig.contactMethods,
);

export const addpaymentConfig: AddpaymentConfig = deepMerge(
	defaultAddpaymentConfig,
	userConfig.addpaymentConfig,
);

export const announcementConfig: AnnouncementConfig = deepMerge(
	defaultAnnouncementConfig,
	userConfig.announcementConfig,
);

export const musicPlayerConfig: MusicPlayerConfig = deepMerge(
	defaultMusicPlayerConfig,
	userConfig.musicPlayerConfig,
);

export const footerConfig: FooterConfig = deepMerge(
	defaultFooterConfig,
	userConfig.footerConfig,
);

export const versionCheckConfig: VersionCheckConfig = deepMerge(
	defaultVersionCheckConfig,
	userConfig.versionCheckConfig,
);

export const upgradeConfig: UpgradeConfig = deepMerge(
	defaultUpgradeConfig,
	userConfig.upgradeConfig,
);

export const weatherConfig: WeatherConfig = deepMerge(
	defaultWeatherConfig,
	userConfig.weatherConfig,
);

export const sidebarLayoutConfig: SidebarLayoutConfig = deepMerge(
	defaultSidebarLayoutConfig,
	userConfig.sidebarLayoutConfig,
);

export const sakuraConfig: SakuraConfig = deepMerge(
	defaultSakuraConfig,
	userConfig.sakuraConfig,
);

export const pioConfig: PioConfig = deepMerge(
	defaultPioConfig,
	userConfig.pioConfig,
);

export const umamiConfig: UmamiConfig = deepMerge(
	defaultUmamiConfig,
	userConfig.umamiConfig,
);
