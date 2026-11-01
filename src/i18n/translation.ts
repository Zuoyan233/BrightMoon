/**
 * 翻译函数 - 根据语言键获取对应翻译文本
 */

import { siteConfig } from "../config";
import type I18nKey from "./i18nKey";
import { de } from "./languages/de";
import { en } from "./languages/en";
import { fr } from "./languages/fr";
import { ja } from "./languages/ja";
import { ko } from "./languages/ko";
import { ru } from "./languages/ru";
import { zh_CN } from "./languages/zh_CN";
import { zh_TW } from "./languages/zh_TW";

export type Translation = {
	[K in I18nKey]: string;
};

// 统一的语言字典注册表
export const allTranslations: Record<string, Translation> = {
	en,
	zh_CN,
	zh_TW,
	ja,
	ko,
	fr,
	de,
	ru,
};

// 兜底翻译字典：从用户配置（config/user）或默认配置（config/defaults）中的站点语言读取
const defaultTranslation = allTranslations[siteConfig.lang];

// 语言码查找表
const map: { [key: string]: Translation } = {
	en,
	en_us: en,
	en_gb: en,
	en_au: en,
	zh_cn: zh_CN,
	zh_tw: zh_TW,
	ja,
	ja_jp: ja,
	ko,
	ko_kr: ko,
	fr,
	de,
	ru,
};

export function getTranslation(lang: string): Translation {
	return map[lang.toLowerCase()] || defaultTranslation;
}

export function i18n(key: I18nKey): string {
	const lang = siteConfig.lang || "en";
	return getTranslation(lang)[key];
}
