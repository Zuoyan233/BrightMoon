<script lang="ts">
import {
	DARK_MODE,
	DEFAULT_THEME,
	LIGHT_MODE,
	SYSTEM_MODE,
} from "@constants/constants";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { getStoredTheme, setTheme } from "@utils/setting-utils";
import { onDestroy, onMount } from "svelte";
import type { LIGHT_DARK_MODE } from "@/types/config.ts";

let { title = "" }: { title?: string } = $props();

let isOpen = false;
let themePanel: HTMLElement;
let currentMode: LIGHT_DARK_MODE = $state(DEFAULT_THEME);

const themeOptions: {
	mode: LIGHT_DARK_MODE;
	icon: string;
	labelKey: I18nKey;
}[] = [
	{
		mode: LIGHT_MODE,
		icon: "material-symbols:wb-sunny-outline-rounded",
		labelKey: I18nKey.lightMode,
	},
	{
		mode: DARK_MODE,
		icon: "material-symbols:dark-mode-outline-rounded",
		labelKey: I18nKey.darkMode,
	},
	{
		mode: SYSTEM_MODE,
		icon: "material-symbols:brightness-auto-outline",
		labelKey: I18nKey.systemMode,
	},
];

function getButtonIcon(): string {
	return (
		themeOptions.find((o) => o.mode === currentMode)?.icon ||
		themeOptions[0].icon
	);
}

function getButtonIconClass(): string {
	return "text-[1.25rem] transition-all duration-250 ease-in-out text-black/75 dark:text-white/75 group-hover:text-[var(--primary)]";
}

function togglePanel() {
	isOpen = !isOpen;
	if (themePanel) {
		themePanel.classList.toggle("float-panel-closed", !isOpen);
	}
}

function selectTheme(mode: LIGHT_DARK_MODE) {
	isOpen = false;
	if (themePanel) {
		themePanel.classList.add("float-panel-closed");
	}
	currentMode = mode;
	setTheme(mode);
}

function handleClickOutside(event: MouseEvent) {
	const target = event.target as HTMLElement;
	if (
		themePanel &&
		!themePanel.contains(target) &&
		!target.closest("#scheme-switch")
	) {
		isOpen = false;
		themePanel.classList.add("float-panel-closed");
	}
}

// 监听来自其他页面/组件的主题存储变化
function handleStorageChange(e: StorageEvent) {
	if (e.key === "theme") {
		const newMode = e.newValue as LIGHT_DARK_MODE | null;
		if (newMode) {
			currentMode = newMode;
		}
	}
}

onMount(() => {
	currentMode = getStoredTheme();
	document.addEventListener("click", handleClickOutside);
	window.addEventListener("storage", handleStorageChange);

	// 确保系统主题变化监听器已注册（inline script 不会注册监听器）
	if (currentMode === SYSTEM_MODE) {
		setTheme(SYSTEM_MODE);
	}

	return () => {
		document.removeEventListener("click", handleClickOutside);
		window.removeEventListener("storage", handleStorageChange);
	};
});

onDestroy(() => {
	document.removeEventListener("click", handleClickOutside);
	window.removeEventListener("storage", handleStorageChange);
});
</script>

<div class="relative">
	<!-- 主题切换按钮 -->
	<button
		aria-label="Theme Switch"
		title={title}
		class="group btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
		id="scheme-switch"
		onclick={togglePanel}
	>
		<Icon icon={getButtonIcon()} class={getButtonIconClass()} />
	</button>

	<!-- 主题选择下拉面板 -->
	<div
		bind:this={themePanel}
		id="theme-panel"
		class="float-panel-closed absolute top-[4.38rem] right-0 z-50 w-48 bg-[var(--card-bg)] rounded-[var(--radius-large)] shadow-lg p-3"
	>
		<div class="ignore grid grid-cols-1 gap-1">
			{#each themeOptions as option}
				<button
					class="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left w-full
						{currentMode === option.mode
							? 'bg-[var(--btn-plain-bg-hover)]'
							: 'hover:bg-[var(--btn-plain-bg-hover)]'}"
					onclick={() => selectTheme(option.mode)}
				>
					<Icon
						icon={option.icon}
						class={'text-xl transition-all duration-200' + (currentMode === option.mode ? ' text-[var(--primary)]' : ' text-black/75 dark:text-white/75 group-hover:text-[var(--primary)]')}
					/>
					<span
						class={'text-base font-bold transition-all duration-200' + (currentMode === option.mode ? ' text-[var(--primary)] font-bold' : ' text-black/75 dark:text-white/75 group-hover:text-[var(--primary)]')}
					>
						{i18n(option.labelKey)}
					</span>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
#theme-panel{
	transform-origin: top right;
}

.float-panel-closed {
	opacity: 0;
	pointer-events: none;
	transform: scale(0.95) translateY(-10px);
	transition: all 0.1s ease-out;
}

#theme-panel:not(.float-panel-closed) {
	opacity: 1;
	pointer-events: auto;
	transform: scale(1) translateY(0);
	transition: all 0.1s ease-out;
}
</style>
