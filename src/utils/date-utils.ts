import { siteConfig } from "../config";
import { getLocaleFromConfig } from "./language-utils";

export function formatDateToYYYYMMDD(date: Date): string {
	return date.toISOString().substring(0, 10);
}

// 国际化日期格式化函数
export function formatDateI18n(dateString: string): string {
	const date = new Date(dateString);
	const lang = siteConfig.lang || "en";

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const locale = getLocaleFromConfig(lang);
	return date.toLocaleDateString(locale, options);
}
