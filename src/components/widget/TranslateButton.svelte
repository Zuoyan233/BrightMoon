<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { onDestroy, onMount } from "svelte";
import { siteConfig } from "@/config";
import { getTranslateLanguageFromConfig } from "@/utils/language-utils";

let isOpen = false;
let translatePanel: HTMLElement;
let currentLanguage = "";

// 支持的语言列表（与 translate.js v2 语言编码一致）
const languages = [
	{ code: "chinese_simplified", name: "简体中文", icon: "🇨🇳" },
	{ code: "chinese_traditional", name: "繁體中文", icon: "🇹🇼" },
	{ code: "english", name: "English", icon: "🇺🇸" },
	{ code: "japanese", name: "日本語", icon: "🇯🇵" },
	{ code: "korean", name: "한국어", icon: "🇰🇷" },
	{ code: "french", name: "Français", icon: "🇫🇷" },
	{ code: "german", name: "Deutsch", icon: "🇩🇪" },
	{ code: "spanish", name: "Español", icon: "🇪🇸" },
	{ code: "russian", name: "Русский", icon: "🇷🇺" },
	{ code: "arabic", name: "العربية", icon: "🇸🇦" },
	{ code: "vietnamese", name: "Việt Nam", icon: "🇻🇳" },
	{ code: "thai", name: "ภาษาไทย", icon: "🇹🇭" },
	{ code: "turkish", name: "Türkçe", icon: "🇹🇷" },
	{ code: "indonesian", name: "Indonesia", icon: "🇮🇩" },
];

// 站点配置的本地语言对应的 translate.js 语言编码
const defaultTranslateLanguage = getTranslateLanguageFromConfig(
	siteConfig.lang,
);

function togglePanel() {
	isOpen = !isOpen;
	if (translatePanel) {
		translatePanel.classList.toggle("float-panel-closed", !isOpen);
	}
}

/**
 * 切换翻译语言
 *
 * 核心策略：changeLanguage 期间临时禁用 MutationObserver，翻译完成后再恢复
 * 这样避免三个问题：
 *   1. Observer 在翻译进行中触发 execute → "翻译未完结"排队提示
 *   2. 翻译进行中 DOM 被修改 → node 在 translate.node 中找不到
 *   3. 短时间内多次 execute → 服务端"2秒内请求超过2次"防护拦截
 *
 * 流程：
 *   1. 断开 MutationObserver（设置 listener.use = false 阻止自动重连）
 *   2. 调用 changeLanguage（内部 reset + execute）
 *   3. 3 秒后重连 Observer（翻译已完成，Observer 持续监控后续 DOM 变化）
 */
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

async function changeLanguage(languageCode: string) {
	try {
		// 懒加载 translate.js
		if (typeof window.loadTranslateScript === "function") {
			await window.loadTranslateScript();
		}

		const translate = window.translate;
		if (!translate) {
			console.warn("translate.js is not loaded yet");
			return;
		}

		// 取消上一次的重连定时器（防止快速连续点击导致多个定时器叠加）
		if (reconnectTimer) {
			clearTimeout(reconnectTimer);
			reconnectTimer = null;
		}

		// 如果目标语言与本地语言相同，启用本地语言翻译
		const localLang = translate.language?.getLocal?.();
		if (languageCode === localLang && translate.language) {
			translate.language.translateLocal = true;
		}

		// 1. 断开 MutationObserver，防止翻译进行中 Observer 触发额外 execute
		window.translateManager?.disconnectListener();

		// 2. 调用 changeLanguage（内部 reset → execute 完成全流程）
		if (typeof translate.changeLanguage === "function") {
			translate.changeLanguage(languageCode);
		} else {
			translate.to = languageCode;
			translate.execute();
		}

		// 3. 翻译完成后（3秒）重连 MutationObserver
		//    Observer 会持续监控后续 DOM 变化（Svelte 水合、动态内容等）并自动翻译
		//    reconnectListener 内部会在重连后执行一次补翻译，覆盖遗漏节点
		reconnectTimer = setTimeout(() => {
			reconnectTimer = null;
			window.translateManager?.reconnectListener(0);
		}, 3000);

		// 更新当前语言状态
		currentLanguage = languageCode;
	} catch (error) {
		console.error("Failed to change translation language:", error);
	}

	// 关闭面板
	isOpen = false;
	if (translatePanel) {
		translatePanel.classList.add("float-panel-closed");
	}
}

// 点击外部关闭面板
function handleClickOutside(event: MouseEvent) {
	const target = event.target as HTMLElement;
	if (
		translatePanel &&
		!translatePanel.contains(target) &&
		!target.closest("#translate-switch")
	) {
		isOpen = false;
		translatePanel.classList.add("float-panel-closed");
	}
}

/**
 * 同步当前语言状态
 * 直接读取 translate.to 获取实际翻译目标语言
 * 不使用 getCurrent()，因为它依赖 storage.get('to')，可能在页面刷新后返回过期的 localStorage 值
 */
function syncCurrentLanguage() {
	if (window.translate) {
		const to = window.translate.to;
		if (to) {
			currentLanguage = to;
			return;
		}
	}
	currentLanguage = defaultTranslateLanguage;
}

onMount(() => {
	document.addEventListener("click", handleClickOutside);
	syncCurrentLanguage();
});

onDestroy(() => {
	document.removeEventListener("click", handleClickOutside);
});
</script>

{#if siteConfig.translate?.enable}
<div class="relative">
    <!-- 翻译按钮 -->
    <button 
        aria-label="Language Translation" 
        class="group btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" 
        id="translate-switch"
        on:click={togglePanel}
    >
        <Icon icon="material-symbols:translate" class="text-[1.25rem] transition-all duration-250 ease-in-out text-black/75 dark:text-white/75 group-hover:text-[var(--primary)]"/>
</button>

    <!-- 翻译面板 -->
    <div 
        bind:this={translatePanel}
        id="translate-panel" 
        class="float-panel-closed absolute top-[3.5rem] right-0 z-50 w-64 bg-[var(--float-panel-bg)] rounded-[var(--radius-large)] shadow-lg border border-[var(--line-divider)] p-4"
    >
        <div class="text-sm font-medium text-[var(--primary)] mb-3">
            {i18n(I18nKey.translateHeader)}
        </div>
        <div class="ignore grid grid-cols-1 gap-2 max-h-64 overflow-y-auto scrollbar-hide">
            {#each languages as lang}
                <button
                    class="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--btn-plain-bg-hover)] transition-colors text-left w-full {currentLanguage === lang.code ? 'bg-[var(--btn-plain-bg-hover)] border-1 border-[var(--primary)]' : '' }"
                    on:click={() => changeLanguage(lang.code)}
                >
                    <span class="text-lg transition text-black/75 dark:text-white/75">{lang.icon}</span>
                    <span class="text-sm transition text-black/75 dark:text-white/75 {currentLanguage === lang.code ? 'font-medium text-[var(--primary)]' : ''}">{lang.name}</span>
                    {#if currentLanguage === lang.code}
                        <span class="ml-auto text-[var(--primary)]">✓</span>
                    {/if}
                </button>
            {/each}
        </div>
    </div>
</div>
{/if}

<style>
#translate-panel {
    transform-origin: top right;
}

.float-panel-closed {
    opacity: 0;
    pointer-events: none;
    transform: scale(0.95) translateY(-10px);
    transition: all 0.1s ease-out;
}

#translate-panel:not(.float-panel-closed) {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1) translateY(0);
    transition: all 0.1s ease-out;
}

/* 隐藏滚动条 */
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>