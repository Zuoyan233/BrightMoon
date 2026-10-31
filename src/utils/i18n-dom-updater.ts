/**
 * DOM 国际化辅助 - 先应用本地字典替换，再交由 translate.js 处理剩余文本
 */

import type I18nKey from "@i18n/i18nKey";
import { allTranslations } from "@i18n/translation";
import { siteConfig } from "@/config";
import { translateToLangMap } from "@/utils/language-utils";

// 反向查找表：翻译文本 -> i18n 键
const textToKeyMap = new Map<string, I18nKey>();

// 模板查找表：含占位符的翻译文本 -> i18n 键
const templateToKeyMap = new Map<string, I18nKey>();

const PLACEHOLDER_PATTERN = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g;

function escapeRegExp(text: string): string {
	return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function compileTemplate(template: string): RegExp {
	let result = "";
	let lastIndex = 0;
	for (const match of template.matchAll(PLACEHOLDER_PATTERN)) {
		const index = match.index ?? 0;
		result += escapeRegExp(template.slice(lastIndex, index));
		result += "([^\\s]+?)";
		lastIndex = index + match[0].length;
	}
	result += escapeRegExp(template.slice(lastIndex));
	return new RegExp(`^${result}$`);
}

function fillTemplate(template: string, params: string[]): string {
	let index = 0;
	return template.replace(PLACEHOLDER_PATTERN, () => params[index++] ?? "");
}

function matchTemplate(
	text: string,
): { key: I18nKey; params: string[] } | null {
	if (!text.includes(" ")) return null;

	for (const [template, key] of templateToKeyMap) {
		const pattern = compileTemplate(template);
		const result = pattern.exec(text);
		if (result) {
			return { key, params: result.slice(1) };
		}
	}
	return null;
}

function buildReverseMap(_lang: string): void {
	if (templateToKeyMap.size > 0) return;

	for (const translations of Object.values(allTranslations)) {
		for (const [key, value] of Object.entries(translations)) {
			const trimmed = (value as string).trim();
			if (!trimmed || textToKeyMap.has(trimmed)) continue;
			textToKeyMap.set(trimmed, key as I18nKey);

			if (PLACEHOLDER_PATTERN.test(trimmed)) {
				PLACEHOLDER_PATTERN.lastIndex = 0;
				if (!templateToKeyMap.has(trimmed)) {
					templateToKeyMap.set(trimmed, key as I18nKey);
				}
			}
		}
	}
}

const skipTags = new Set(["script", "style", "code", "pre", "noscript"]);

function* walkTextNodes(root: Node): Generator<Text> {
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
		acceptNode(node: Text) {
			const trimmed = node.textContent?.trim();
			if (!trimmed) return NodeFilter.FILTER_REJECT;

			const parent = node.parentElement;
			if (!parent) return NodeFilter.FILTER_REJECT;

			if (skipTags.has(parent.tagName.toLowerCase())) {
				return NodeFilter.FILTER_REJECT;
			}

			if (parent.hasAttribute("data-i18n-handled")) {
				return NodeFilter.FILTER_REJECT;
			}

			if (parent.closest("#translate-panel")) {
				return NodeFilter.FILTER_REJECT;
			}

			return NodeFilter.FILTER_ACCEPT;
		},
	});

	let node = walker.nextNode() as Text | null;
	while (node) {
		yield node;
		node = walker.nextNode() as Text | null;
	}
}

function clearMarkerOnElement(element: Element): void {
	element.removeAttribute("data-i18n-handled");
	element.classList.remove("ignore");
}

/**
 * Clear the markers added during the last DOM i18n pass.
 */
export function clearI18nMarkers(root: ParentNode = document): void {
	if (root instanceof Element && root.hasAttribute("data-i18n-handled")) {
		clearMarkerOnElement(root);
	}

	root.querySelectorAll("[data-i18n-handled]").forEach((element) => {
		clearMarkerOnElement(element);
	});
}

/**
 * Replace matching DOM text with the local i18n dictionary.
 */
export function applyI18nToDOM(
	targetI18nLangCode: string,
	root: HTMLElement = document.body,
	sourceLangCode?: string,
): number {
	// 从源语言构建反向映射（默认使用站点配置语言）
	const sourceLang = sourceLangCode || siteConfig.lang;
	buildReverseMap(sourceLang);

	const targetTranslation = allTranslations[targetI18nLangCode];
	if (!targetTranslation) {
		console.warn(
			`i18n DOM updater: no translation found for "${targetI18nLangCode}"`,
		);
		return 0;
	}

	let replacedCount = 0;

	for (const textNode of walkTextNodes(root)) {
		const text = textNode.textContent?.trim() || "";
		const key = textToKeyMap.get(text);

		if (key && targetTranslation[key] !== undefined) {
			const translated = targetTranslation[key];
			if (translated) {
				if (translated !== text) {
					textNode.textContent = translated;
					replacedCount++;
				}

				// 文本已正确时同样打标记，防止 translate.js 对已翻译文本二次翻译
				const parent = textNode.parentElement;
				if (parent) {
					parent.classList.add("ignore");
					parent.setAttribute("data-i18n-handled", "true");
				}
			}
			continue;
		}

		const templateMatch = matchTemplate(text);
		if (templateMatch) {
			const targetTemplate = targetTranslation[templateMatch.key];
			if (targetTemplate) {
				const translated = fillTemplate(targetTemplate, templateMatch.params);
				if (translated !== text) {
					textNode.textContent = translated;
					replacedCount++;
				}

				const parent = textNode.parentElement;
				if (parent) {
					parent.classList.add("ignore");
					parent.setAttribute("data-i18n-handled", "true");
				}
			}
		}
	}

	let placeholderCount = 0;
	const inputsWithPlaceholder = root.querySelectorAll(
		"input[placeholder],textarea[placeholder]",
	);
	for (const element of inputsWithPlaceholder) {
		const value = element.getAttribute("placeholder")?.trim();
		if (!value) continue;

		const key = textToKeyMap.get(value);
		if (
			key &&
			targetTranslation[key] !== undefined &&
			targetTranslation[key] !== value
		) {
			element.setAttribute("placeholder", targetTranslation[key]);
			placeholderCount++;
			element.classList.add("ignore");
			element.setAttribute("data-i18n-handled", "true");
		}
	}

	let titleAttrCount = 0;
	const elementsWithTitle = root.querySelectorAll("[title]");
	for (const element of elementsWithTitle) {
		const value = element.getAttribute("title")?.trim();
		if (!value) continue;

		const key = textToKeyMap.get(value);
		if (
			key &&
			targetTranslation[key] !== undefined &&
			targetTranslation[key] !== value
		) {
			element.setAttribute("title", targetTranslation[key]);
			titleAttrCount++;
			element.classList.add("ignore");
			element.setAttribute("data-i18n-handled", "true");
		}
	}

	let ariaLabelCount = 0;
	const elementsWithAriaLabel = root.querySelectorAll("[aria-label]");
	for (const element of elementsWithAriaLabel) {
		const value = element.getAttribute("aria-label")?.trim();
		if (!value) continue;

		const key = textToKeyMap.get(value);
		if (
			key &&
			targetTranslation[key] !== undefined &&
			targetTranslation[key] !== value
		) {
			element.setAttribute("aria-label", targetTranslation[key]);
			ariaLabelCount++;
			element.classList.add("ignore");
			element.setAttribute("data-i18n-handled", "true");
		}
	}

	let dataAttrCount = 0;
	const elementsWithData = root.querySelectorAll(
		"[data-prefix],[data-year],[data-month],[data-day],[data-hour],[data-minute],[data-second],[data-copied-text],[data-failed-text]",
	);
	for (const element of elementsWithData) {
		for (const attr of element.getAttributeNames()) {
			if (!attr.startsWith("data-")) continue;

			const value = element.getAttribute(attr)?.trim();
			if (!value) continue;

			const key = textToKeyMap.get(value);
			if (
				key &&
				targetTranslation[key] !== undefined &&
				targetTranslation[key] !== value
			) {
				element.setAttribute(attr, targetTranslation[key]);
				dataAttrCount++;
			}
		}
	}

	if (typeof window.runtime === "function") {
		try {
			window.runtime();
		} catch {
			// 忽略部分挂载 DOM 的运行时刷新错误
		}
	}

	return (
		replacedCount +
		placeholderCount +
		titleAttrCount +
		ariaLabelCount +
		dataAttrCount
	);
}

/**
 * 将 translate.js 语言代码转换为本地 i18n 代码后再应用 DOM 替换
 */
export function applyI18nForTranslate(
	translateLangCode: string,
	root?: HTMLElement,
): number {
	const configLang = translateToLangMap[translateLangCode] || translateLangCode;
	return applyI18nToDOM(configLang, root);
}
