<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { onDestroy, onMount } from "svelte";
import { siteConfig } from "@/config";
import { getTranslateLanguageFromConfig } from "@/utils/language-utils";
import { translationManager } from "@/utils/translation-manager";

let { title = "" }: { title?: string } = $props();

let isOpen = false;
let translatePanel: HTMLElement | undefined = $state();
let currentLanguage = $state("");
// 支持的语言列表
const languages = [
	{ code: "chinese_simplified", name: "简体中文", icon: "🇨🇳" },
	{ code: "chinese_traditional", name: "繁體中文", icon: "🇹🇼" },
	{ code: "english", name: "English", icon: "🇺🇸" },
	{ code: "japanese", name: "日本語", icon: "🇯🇵" },
	{ code: "korean", name: "한국어", icon: "🇰🇷" },
	{ code: "french", name: "Français", icon: "🇫🇷" },
	{ code: "deutsch", name: "Deutsch", icon: "🇩🇪" },
	{ code: "spanish", name: "Español", icon: "🇪🇸" },
	{ code: "russian", name: "Русский", icon: "🇷🇺" },
	{ code: "arabic", name: "العربية", icon: "🇸🇦" },
	{ code: "vietnamese", name: "Việt Nam", icon: "🇻🇳" },
	{ code: "thai", name: "ภาษาไทย", icon: "🇹🇭" },
	{ code: "turkish", name: "Türkçe", icon: "🇹🇷" },
	{ code: "indonesian", name: "Indonesia", icon: "🇮🇩" },
];

// 根据配置文件的语言设置获取默认翻译语言
const defaultTranslateLanguage = getTranslateLanguageFromConfig(
	siteConfig.lang,
);

function togglePanel() {
	isOpen = !isOpen;
	const panel = translatePanel;
	if (panel) {
		panel.style.willChange = "transform, opacity";
		panel.classList.toggle("float-panel-closed", !isOpen);
		setTimeout(() => {
			panel.style.willChange = "auto";
		}, 100);
	}
}

async function changeLanguage(languageCode: string) {
	currentLanguage = languageCode;

	isOpen = false;
	const panel = translatePanel;
	if (panel) {
		panel.style.willChange = "transform, opacity";
		panel.classList.add("float-panel-closed");
		setTimeout(() => {
			panel.style.willChange = "auto";
		}, 100);
	}

	try {
		await translationManager.setLanguage(languageCode);
	} catch (error) {
		console.error("[Translate] Failed to change language:", error);
	}
}

// 点击外部关闭面板
function handleClickOutside(event: MouseEvent) {
	const target = event.target as HTMLElement;
	const panel = translatePanel;
	if (
		panel &&
		!panel.contains(target) &&
		!target.closest("#translate-switch")
	) {
		isOpen = false;
		panel.style.willChange = "transform, opacity";
		panel.classList.add("float-panel-closed");
		setTimeout(() => {
			panel.style.willChange = "auto";
		}, 100);
	}
}

// Sync the button state with the shared translation manager on mount.
onMount(() => {
	document.addEventListener("click", handleClickOutside);

	currentLanguage =
		translationManager.getTargetLanguage() || defaultTranslateLanguage;
	void translationManager.init();
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
        title={title}
        class="group btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" 
        id="translate-switch"
        onclick={togglePanel}
    >
        <Icon icon="material-symbols:translate" class="text-[1.25rem] transition-all duration-250 ease-in-out text-black/75 dark:text-white/75 group-hover:text-[var(--primary)]"/>
    </button>

    <!-- 翻译面板 -->
    <div 
        bind:this={translatePanel}
        id="translate-panel" 
        class="float-panel-closed absolute top-[4.38rem] right-0 z-50 w-64 bg-[var(--card-bg)] rounded-[var(--radius-large)] shadow-lg p-4"
    >
    <!-- 标题 -->
	<div class="flex flex-row gap-2 mb-3 items-center justify-between">
		<div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
			before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
			before:absolute before:-left-3 before:top-[0.33rem]"
		>
			{i18n(I18nKey.translateHeader)}
		</div>
	</div>
        <div class="ignore grid grid-cols-1 gap-2 max-h-64 overflow-y-auto scrollbar-hide">
            {#each languages as lang}
                <button
                    class="group flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--btn-plain-bg-hover)] transition-colors text-left w-full {currentLanguage === lang.code ? 'bg-[var(--btn-plain-bg-hover)] border-1 border-[var(--primary)]' : ''}"
                    onclick={() => changeLanguage(lang.code)}
                >
                    <span class="text-lg transition text-black/75 dark:text-white/75 group-hover:text-[var(--primary)]" style={currentLanguage === lang.code ? 'color: var(--primary)' : ''}>{lang.icon}</span>
                    <span class="text-sm font-bold transition text-black/75 dark:text-white/75 group-hover:text-[var(--primary)] {currentLanguage === lang.code ? 'font-bold' : ''}" style={currentLanguage === lang.code ? 'color: var(--primary)' : ''}>{lang.name}</span>
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