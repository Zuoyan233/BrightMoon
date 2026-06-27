/**
 * DOM i18n helper.
 * Apply local dictionary replacements first, then let translate.js
 * handle the remaining text.
 */

import type I18nKey from "@i18n/i18nKey";
import { ar } from "@i18n/languages/ar";
import { de } from "@i18n/languages/de";
import { en } from "@i18n/languages/en";
import { es } from "@i18n/languages/es";
import { fr } from "@i18n/languages/fr";
import { id } from "@i18n/languages/id";
import { ja } from "@i18n/languages/ja";
import { ko } from "@i18n/languages/ko";
import { ru } from "@i18n/languages/ru";
import { th } from "@i18n/languages/th";
import { tr } from "@i18n/languages/tr";
import { vi } from "@i18n/languages/vi";
import { zh_CN } from "@i18n/languages/zh_CN";
import { zh_TW } from "@i18n/languages/zh_TW";
import { siteConfig } from "@/config";
import { translateToLangMap } from "@/utils/language-utils";

// Reuse the loaded dictionaries instead of importing the same files repeatedly.
export const allTranslations: Record<string, Record<string, string>> = {
	en,
	zh_CN,
	zh_TW,
	ja,
	ko,
	es,
	fr,
	de,
	ru,
	ar,
	th,
	vi,
	tr,
	id,
};

// Reverse lookup table: translated text -> i18n key.
const textToKeyMap = new Map<string, I18nKey>();

function buildReverseMap(_lang: string): void {
	for (const translations of Object.values(allTranslations)) {
		for (const [key, value] of Object.entries(translations)) {
			const trimmed = (value as string).trim();
			if (trimmed && !textToKeyMap.has(trimmed)) {
				textToKeyMap.set(trimmed, key as I18nKey);
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
			if (translated && translated !== text) {
				textNode.textContent = translated;
				replacedCount++;

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
			// Ignore runtime refresh errors for partially mounted DOM.
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
 * Convert translate.js language codes to local i18n codes before applying DOM replacements.
 */
export function applyI18nForTranslate(
	translateLangCode: string,
	root?: HTMLElement,
): number {
	const configLang = translateToLangMap[translateLangCode] || translateLangCode;
	return applyI18nToDOM(configLang, root);
}
