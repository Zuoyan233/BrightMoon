/**
 * 语言映射工具函数
 * 集中管理配置文件语言代码到各服务语言代码的映射
 */

// 配置文件语言代码到翻译服务语言代码的映射
export const langToTranslateMap: Record<string, string> = {
	zh_CN: "chinese_simplified",
	zh_TW: "chinese_traditional",
	en: "english",
	ja: "japanese",
	ko: "korean",
	fr: "french",
	de: "deutsch",
	ru: "russian",
};

// 翻译服务语言代码到配置文件语言代码的映射
export const translateToLangMap: Record<string, string> = {
	chinese_simplified: "zh_CN",
	chinese_traditional: "zh_TW",
	english: "en",
	japanese: "ja",
	korean: "ko",
	french: "fr",
	deutsch: "de",
	russian: "ru",
};

// 配置文件语言代码到 Locale 的映射（用于日期格式化等）
export const langToLocaleMap: Record<string, string> = {
	zh_CN: "zh-CN",
	zh_TW: "zh-TW",
	en: "en-US",
	ja: "ja-JP",
	ko: "ko-KR",
	fr: "fr-FR",
	de: "de-DE",
	ru: "ru-RU",
};

// 配置文件语言代码到 Twikoo 语言代码的映射
export const langToTwikooMap: Record<string, string> = {
	zh_CN: "zh-CN",
	zh_TW: "zh-TW",
	en: "en",
	ja: "ja",
	ko: "ko",
	fr: "fr",
	de: "de",
	ru: "ru",
};

// 配置文件语言代码到 WeatherAPI 语言代码的映射
export const langToWeatherApiMap: Record<string, string> = {
	en: "en",
	zh_CN: "zh",
	zh_TW: "zh",
	ja: "ja",
	ko: "ko",
	fr: "fr",
	de: "de",
	ru: "ru",
};

/**
 * 获取语言的显示名称
 * @param langCode 语言代码（配置文件格式或翻译服务格式）
 * @returns 语言的显示名称
 */
export function getLanguageDisplayName(langCode: string): string {
	const languageNames: Record<string, string> = {
		zh_CN: "简体中文",
		zh_TW: "繁體中文",
		en: "English",
		ja: "日本語",
		ko: "한국어",
		fr: "Français",
		de: "Deutsch",
		ru: "Русский",
		chinese_simplified: "简体中文",
		chinese_traditional: "繁體中文",
		english: "English",
		japanese: "日本語",
		korean: "한국어",
		french: "Français",
		deutsch: "Deutsch",
		russian: "Русский",
	};

	return languageNames[langCode] || langCode;
}

/**
 * 将配置文件的语言代码转换为翻译服务的语言代码
 * @param configLang 配置文件中的语言代码
 * @returns 翻译服务的语言代码
 */
export function getTranslateLanguageFromConfig(configLang: string): string {
	return langToTranslateMap[configLang] || "chinese_simplified";
}

/**
 * 将翻译服务的语言代码转换为配置文件的语言代码
 * @param translateLang 翻译服务的语言代码
 * @returns 配置文件中的语言代码
 */
export function getConfigLanguageFromTranslate(translateLang: string): string {
	return translateToLangMap[translateLang] || "zh_CN";
}

/**
 * 将配置文件的语言代码转换为 Locale 标识（用于日期格式化等）
 * @param configLang 配置文件中的语言代码
 * @returns Locale 标识（如 zh-CN、en-US）
 */
export function getLocaleFromConfig(configLang: string): string {
	return langToLocaleMap[configLang] || "en-US";
}

/**
 * 将配置文件的语言代码转换为 Twikoo 可用的语言代码
 * @param configLang 配置文件中的语言代码
 * @returns Twikoo 语言代码
 */
export function getTwikooLanguageFromConfig(configLang: string): string {
	return langToTwikooMap[configLang] || configLang;
}

/**
 * 将配置文件的语言代码转换为 WeatherAPI 的语言代码
 * @param configLang 配置文件中的语言代码
 * @returns WeatherAPI 语言代码
 */
export function getWeatherApiLanguageFromConfig(configLang: string): string {
	return langToWeatherApiMap[configLang] || "en";
}
