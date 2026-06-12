<script lang="ts">
import {
	WALLPAPER_BANNER,
	WALLPAPER_FULLSCREEN,
	WALLPAPER_NONE,
} from "@constants/constants";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { getSakuraStatus, toggleSakura } from "@utils/sakura-manager";
import type {
	NAVBAR_TRANSPARENT_MODE,
	POST_LIST_LAYOUT_MODE,
	WALLPAPER_POSITION,
} from "@utils/setting-utils";
import {
	getDefaultHue,
	getHue,
	getStoredBannerPosition,
	getStoredNavbarTransparentMode,
	getStoredPostListLayout,
	getStoredSakuraEnabled,
	getStoredWallpaperBlur,
	getStoredWallpaperMode,
	getStoredWallpaperOpacity,
	getStoredWallpaperPosition,
	getStoredWavesEnabled,
	getStoredWavesPerformanceMode,
	setBannerPosition,
	setHue,
	setNavbarTransparentMode,
	setPostListLayout,
	setSakuraEnabled,
	setWallpaperBlur,
	setWallpaperMode,
	setWallpaperOpacity,
	setWallpaperPosition,
	setWavesEnabled,
	setWavesPerformanceMode,
} from "@utils/setting-utils";
import { onMount, tick } from "svelte";
import type { WALLPAPER_MODE } from "@/types/config";
import { translationManager } from "@/utils/translation-manager";

let hue = 250;
let defaultHue = 250;
let isMounted = false;

// 樱花状态
let sakuraEnabled = false;
// 樱花功能是否可用（由 sakuraConfig.enable 控制）
let sakuraAvailable = true;

// 水波纹状态
let wavesEnabled = false;
let wavesPerformanceMode = true;
// 水波纹功能是否可用（由 config 控制）
let wavesAvailable = true;

// 壁纸模式
let currentWallpaperMode: WALLPAPER_MODE = WALLPAPER_BANNER;

// 横幅位置（banner模式时有效）
let currentBannerPosition: WALLPAPER_POSITION = "center";

// 壁纸位置（全屏壁纸时有效）
let currentWallpaperPosition: WALLPAPER_POSITION = "center";

// 壁纸透明度（全屏壁纸时有效）
let currentWallpaperOpacity = 1;
let defaultWallpaperOpacity = 100;

// 壁纸模糊程度（全屏壁纸时有效）
let currentWallpaperBlur = 20;
let defaultWallpaperBlur = 20;

// 壁纸切换按钮在面板中的显示控制
let wallpaperShowSwitch = "both";

// 文章列表布局
let postListLayout: POST_LIST_LAYOUT_MODE = "list";

// 文章列表布局开关（由 config 控制）
let postListLayoutAllowSwitch = true;

// 导航栏透明模式
let navbarTransparentMode: NAVBAR_TRANSPARENT_MODE = "semi";

function selectNavbarTransparentMode(mode: NAVBAR_TRANSPARENT_MODE) {
	navbarTransparentMode = mode;
	setNavbarTransparentMode(mode);
}

function navbarTransparentModeLabel(mode: string): string {
	switch (mode) {
		case "semi":
			return i18n(I18nKey.navbarTransparentSemi);
		case "full":
			return i18n(I18nKey.navbarTransparentFull);
		case "semifull":
			return i18n(I18nKey.navbarTransparentSemifull);
		default:
			return mode;
	}
}

function resetHue() {
	hue = defaultHue;
}

function resetWallpaperOpacity() {
	currentWallpaperOpacity = defaultWallpaperOpacity;
	setWallpaperOpacity(currentWallpaperOpacity);
	tick().then(() => {
		const fill = document.querySelector(
			"#opacitySlider [data-fill]",
		) as HTMLElement;
		if (fill) fill.style.width = `${sliderFillPercent("opacity")}%`;
	});
}

function resetWallpaperBlur() {
	currentWallpaperBlur = defaultWallpaperBlur;
	setWallpaperBlur((currentWallpaperBlur * 40) / 100);
	tick().then(() => {
		const fill = document.querySelector(
			"#blurSlider [data-fill]",
		) as HTMLElement;
		if (fill) fill.style.width = `${sliderFillPercent("blur")}%`;
	});
}

function toggleSakuraEffect() {
	toggleSakura();
	// toggleSakura 内部会切换启用/停用状态，刷新 UI 状态
	sakuraEnabled = getSakuraStatus();
	setSakuraEnabled(sakuraEnabled);
}

function toggleWavesEffect() {
	wavesEnabled = !wavesEnabled;
	setWavesEnabled(wavesEnabled);
	const headerWaves = document.getElementById("header-waves");
	if (headerWaves) {
		headerWaves.style.display = wavesEnabled ? "" : "none";
	}
}

function toggleWavesPerformanceMode() {
	wavesPerformanceMode = !wavesPerformanceMode;
	setWavesPerformanceMode(wavesPerformanceMode);
	const headerWaves = document.getElementById("header-waves");
	if (headerWaves) {
		if (wavesPerformanceMode) {
			headerWaves.classList.add("waves-performance-mode");
		} else {
			headerWaves.classList.remove("waves-performance-mode");
		}
	}
}

function selectWallpaperMode(mode: WALLPAPER_MODE) {
	currentWallpaperMode = mode;
	setWallpaperMode(mode);
}

function wallpaperModeLabel(mode: string): string {
	switch (mode) {
		case WALLPAPER_BANNER:
			return i18n(I18nKey.wallpaperBanner);
		case WALLPAPER_FULLSCREEN:
			return i18n(I18nKey.wallpaperFullscreen);
		case WALLPAPER_NONE:
			return i18n(I18nKey.wallpaperNone);
		default:
			return mode;
	}
}

function selectBannerPosition(position: WALLPAPER_POSITION) {
	currentBannerPosition = position;
	setBannerPosition(position);
}

function selectWallpaperPosition(position: WALLPAPER_POSITION) {
	currentWallpaperPosition = position;
	setWallpaperPosition(position);
}

function wallpaperPositionLabel(position: string): string {
	switch (position) {
		case "top":
			return i18n(I18nKey.wallpaperPositionTop);
		case "center":
			return i18n(I18nKey.wallpaperPositionCenter);
		case "bottom":
			return i18n(I18nKey.wallpaperPositionBottom);
		default:
			return position;
	}
}

function onOpacityChange() {
	setWallpaperOpacity(currentWallpaperOpacity);
}

function onBlurChange() {
	setWallpaperBlur((currentWallpaperBlur * 40) / 100);
}

// 自定义滑块拖拽状态
let activeSlider: string | null = null;
let activeSliderBar: HTMLElement | null = null;
let activeSliderFill: HTMLElement | null = null;

function clampValue(
	value: number,
	min: number,
	max: number,
	step: number,
): number {
	const clamped = Math.min(max, Math.max(min, value));
	return Math.round(clamped / step) * step;
}

function getSliderRange(type: string): {
	min: number;
	max: number;
	step: number;
} {
	switch (type) {
		case "opacity":
			return { min: 20, max: 100, step: 5 };
		case "blur":
			return { min: 0, max: 100, step: 5 };
		default:
			return { min: 0, max: 100, step: 1 };
	}
}

function handleSliderStart(e: MouseEvent, type: string) {
	const target = e.currentTarget;
	if (!(target instanceof HTMLElement)) return;
	activeSlider = type;
	activeSliderBar = target;
	activeSliderFill = target.querySelector("[data-fill]") as HTMLElement;
	updateSliderFromEvent(e, type);
}

function handleSliderMove(e: MouseEvent) {
	if (!activeSlider || !activeSliderBar || !activeSliderFill) return;
	updateSliderFromEvent(e, activeSlider);
}

function handleSliderEnd() {
	activeSlider = null;
	activeSliderBar = null;
	activeSliderFill = null;
}

function updateSliderFromEvent(e: MouseEvent, type: string) {
	const bar = activeSliderBar;
	const fill = activeSliderFill;
	if (!bar || !fill) return;
	const rect = bar.getBoundingClientRect();
	const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
	const { min, max, step } = getSliderRange(type);
	const value = clampValue(min + ratio * (max - min), min, max, step);

	// 直接更新DOM宽度，绕过Svelte异步响应式
	fill.style.width = `${(ratio * 100).toFixed(1)}%`;

	switch (type) {
		case "opacity":
			currentWallpaperOpacity = value;
			setWallpaperOpacity(value);
			break;
		case "blur":
			currentWallpaperBlur = value;
			setWallpaperBlur((value * 40) / 100);
			break;
	}
}

function sliderFillPercent(type: string): number {
	switch (type) {
		case "opacity": {
			const range = getSliderRange("opacity");
			return Math.min(
				100,
				Math.max(
					0,
					((currentWallpaperOpacity - range.min) / (range.max - range.min)) *
						100,
				),
			);
		}
		case "blur":
			return Math.min(100, Math.max(0, currentWallpaperBlur));
		default:
			return 0;
	}
}

function selectPostListLayout(mode: POST_LIST_LAYOUT_MODE) {
	postListLayout = mode;
	setPostListLayout(mode);
}

// 检查壁纸切换是否应该在当前设备上显示
let showWallpaperSection = true;
function checkWallpaperVisibility() {
	switch (wallpaperShowSwitch) {
		case "off":
			showWallpaperSection = false;
			break;
		case "mobile":
			showWallpaperSection = window.innerWidth < 768;
			break;
		case "desktop":
			showWallpaperSection = window.innerWidth >= 768;
			break;
		case "both":
			showWallpaperSection = true;
			break;
	}
}

onMount(() => {
	isMounted = true;
	defaultHue = getDefaultHue();
	hue = getHue();

	// 读取樱花状态：优先 localStorage，其次 config
	sakuraEnabled = getStoredSakuraEnabled();

	// 读取壁纸模式
	currentWallpaperMode = getStoredWallpaperMode();

	// 读取横幅位置
	currentBannerPosition = getStoredBannerPosition();

	// 读取壁纸位置
	currentWallpaperPosition = getStoredWallpaperPosition();

	// 读取壁纸透明度
	currentWallpaperOpacity = getStoredWallpaperOpacity();
	defaultWallpaperOpacity = currentWallpaperOpacity;

	// 读取壁纸模糊程度
	currentWallpaperBlur = Math.round((getStoredWallpaperBlur() / 40) * 100);
	defaultWallpaperBlur = currentWallpaperBlur;

	// 读取文章列表布局
	postListLayout = getStoredPostListLayout();

	// 读取樱花可用性（sakuraConfig.enable 控制面板是否显示该选项）
	const configCarrier = document.getElementById("config-carrier");
	if (configCarrier?.dataset.sakuraAvailable) {
		sakuraAvailable = configCarrier.dataset.sakuraAvailable === "true";
	}

	// 读取水波纹状态
	wavesEnabled = getStoredWavesEnabled();
	wavesPerformanceMode = getStoredWavesPerformanceMode();
	if (configCarrier?.dataset.wavesEnabled) {
		wavesAvailable = configCarrier.dataset.wavesEnabled === "true";
	}

	// 读取壁纸显示设置
	if (configCarrier?.dataset.wallpaperShowSwitch) {
		wallpaperShowSwitch = configCarrier.dataset.wallpaperShowSwitch;
	}

	// 读取 allowSwitch 配置
	if (configCarrier?.dataset.postListLayoutAllowSwitch) {
		postListLayoutAllowSwitch =
			configCarrier.dataset.postListLayoutAllowSwitch === "true";
	}

	// 读取导航栏透明模式
	navbarTransparentMode = getStoredNavbarTransparentMode();

	// 初始化壁纸区域可见性
	checkWallpaperVisibility();

	// 监听窗口大小变化
	window.addEventListener("resize", checkWallpaperVisibility);

	return () => {
		window.removeEventListener("resize", checkWallpaperVisibility);
	};
});

// 壁纸模式变化时，刷新翻译以确保新出现的 UI 元素被正确翻译
let lastWallpaperModeForTranslation: WALLPAPER_MODE | null = null;
$: if (isMounted && currentWallpaperMode !== lastWallpaperModeForTranslation) {
	lastWallpaperModeForTranslation = currentWallpaperMode;
	void tick().then(() => {
		translationManager.refresh();
	});
}

// 水波纹开关变化时，刷新翻译以确保新出现的性能模式 UI 元素被正确翻译
let lastWavesEnabledForTranslation: boolean | null = null;
$: if (isMounted && wavesEnabled !== lastWavesEnabledForTranslation) {
	lastWavesEnabledForTranslation = wavesEnabled;
	void tick().then(() => {
		translationManager.refresh();
	});
}

$: if (isMounted && (hue || hue === 0)) {
	setHue(hue);
}
</script>

<svelte:window on:mousemove={handleSliderMove} on:mouseup={handleSliderEnd} />

<div id="display-setting" class="float-panel float-panel-closed absolute transition-all w-80 right-4 px-4 py-4">
	<!-- 标题 -->
	<div class="flex flex-row gap-2 mb-3 items-center justify-between">
		<div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
			before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
			before:absolute before:-left-3 before:top-[0.33rem]"
		>
			{i18n(I18nKey.appearance)}
		</div>
	</div>

	<!-- 主题色选择区域 -->
	<div class="mb-3">
		<div class="flex flex-row gap-2 mb-2 items-center justify-between">
			<div class="flex items-center gap-2">
				<Icon icon="material-symbols:colorize-outline" class="text-[var(--btn-content)] text-lg" />
				<span class="text-base font-bold text-neutral-700 dark:text-neutral-300">
					{i18n(I18nKey.themeColor)}
				</span>
			</div>
			<div class="flex gap-1">
				<button aria-label="Reset to Default" class="btn-regular w-7 h-7 rounded-md active:scale-90"
					class:opacity-0={hue === defaultHue} class:pointer-events-none={hue === defaultHue} on:click={resetHue}>
					<div class="text-[var(--btn-content)]">
						<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
					</div>
				</button>
				<div id="hueValue" class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
					font-bold text-sm items-center text-[var(--btn-content)]">
					{hue}
				</div>
			</div>
		</div>
		<div class="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none">
			<input aria-label="Hue Slider" type="range" min="0" max="360" bind:value={hue}
				class="slider" id="colorSlider" step="5" style="width: 100%">
		</div>
	</div>

{#if sakuraAvailable}
	<!-- 樱花特效开关 -->
	<div class="mb-3 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<Icon icon="material-symbols:blur-on" class="text-[var(--btn-content)] text-lg" />
			<span class="text-base font-bold text-neutral-700 dark:text-neutral-300">
				{i18n(I18nKey.sakuraEffect)}
			</span>
		</div>
		<button
			class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
				focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-1"
			class:bg-[var(--primary)]={sakuraEnabled}
			class:bg-neutral-300={!sakuraEnabled}
			class:dark:bg-neutral-600={!sakuraEnabled}
			on:click={toggleSakuraEffect}
			aria-label={i18n(I18nKey.sakuraEffect)}
			role="switch"
			aria-checked={sakuraEnabled}
		>
			<span
				class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
				class:translate-x-6={sakuraEnabled}
				class:translate-x-1={!sakuraEnabled}
			></span>
		</button>
	</div>
{/if}

{#if wavesAvailable && currentWallpaperMode === WALLPAPER_BANNER}
	<!-- 水波纹特效开关 -->
	<div class="mb-3 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<Icon icon="material-symbols:waves" class="text-[var(--btn-content)] text-lg" />
			<span class="text-base font-bold text-neutral-700 dark:text-neutral-300">
				{i18n(I18nKey.wavesEffect)}
			</span>
		</div>
		<button
			class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
				focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-1"
			class:bg-[var(--primary)]={wavesEnabled}
			class:bg-neutral-300={!wavesEnabled}
			class:dark:bg-neutral-600={!wavesEnabled}
			on:click={toggleWavesEffect}
			aria-label={i18n(I18nKey.wavesEffect)}
			role="switch"
			aria-checked={wavesEnabled}
		>
			<span
				class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
				class:translate-x-6={wavesEnabled}
				class:translate-x-1={!wavesEnabled}
			></span>
		</button>
	</div>

    {#if wavesEnabled}
	<!-- 水波纹性能模式开关 -->
	<div class="mb-3 flex items-center justify-between pl-4">
		<div class="flex items-center gap-2">
			<Icon icon="material-symbols:speed" class="text-[var(--btn-content)] text-lg" />
			<span class="text-base font-bold text-neutral-700 dark:text-neutral-300">
				{i18n(I18nKey.wavesPerformanceMode)}
			</span>
		</div>
		<button
			class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
				focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-1"
			class:bg-[var(--primary)]={wavesPerformanceMode}
			class:bg-neutral-300={!wavesPerformanceMode}
			class:dark:bg-neutral-600={!wavesPerformanceMode}
			on:click={toggleWavesPerformanceMode}
			aria-label={i18n(I18nKey.wavesPerformanceMode)}
			role="switch"
			aria-checked={wavesPerformanceMode}
		>
			<span
				class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
				class:translate-x-6={wavesPerformanceMode}
				class:translate-x-1={!wavesPerformanceMode}
			></span>
		</button>
	</div>
	{/if}
{/if}

{#if showWallpaperSection}
		<!-- 壁纸模式选择 -->
		 <div class="flex items-center gap-2 mb-3">
				<Icon icon="material-symbols:wallpaper" class="text-[var(--btn-content)] text-lg" />
				<span class="text-base font-bold text-neutral-700 dark:text-neutral-300">
					{i18n(I18nKey.wallpaperMode)}
				</span>
		</div>
		<div class="mb-3">
			<div class="grid grid-cols-3 gap-2">
			<button
				class="flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs transition-all duration-200
					border-2 relative text-neutral-600 dark:text-neutral-300"
				class:bg-[var(--primary)]={currentWallpaperMode === WALLPAPER_BANNER}
				class:border-[var(--primary)]={currentWallpaperMode === WALLPAPER_BANNER}
				class:!text-white={currentWallpaperMode === WALLPAPER_BANNER}
				class:border-transparent={currentWallpaperMode !== WALLPAPER_BANNER}
				class:hover:border-[var(--primary)]={currentWallpaperMode !== WALLPAPER_BANNER}
				class:hover:text-[var(--primary)]={currentWallpaperMode !== WALLPAPER_BANNER}
				class:dark:hover:text-[var(--primary)]={currentWallpaperMode !== WALLPAPER_BANNER}
				on:click={() => selectWallpaperMode(WALLPAPER_BANNER)}
			>
				<Icon icon="material-symbols:image-outline" class={'text-lg' + (currentWallpaperMode === WALLPAPER_BANNER ? ' text-white' : '')} />
				<span>{wallpaperModeLabel(WALLPAPER_BANNER)}</span>
			</button>
			<button
				class="flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs transition-all duration-200
					border-2 relative text-neutral-600 dark:text-neutral-300"
				class:bg-[var(--primary)]={currentWallpaperMode === WALLPAPER_FULLSCREEN}
				class:border-[var(--primary)]={currentWallpaperMode === WALLPAPER_FULLSCREEN}
				class:!text-white={currentWallpaperMode === WALLPAPER_FULLSCREEN}
				class:border-transparent={currentWallpaperMode !== WALLPAPER_FULLSCREEN}
				class:hover:border-[var(--primary)]={currentWallpaperMode !== WALLPAPER_FULLSCREEN}
				class:hover:text-[var(--primary)]={currentWallpaperMode !== WALLPAPER_FULLSCREEN}
				class:dark:hover:text-[var(--primary)]={currentWallpaperMode !== WALLPAPER_FULLSCREEN}
				on:click={() => selectWallpaperMode(WALLPAPER_FULLSCREEN)}
			>
				<Icon icon="material-symbols:wallpaper" class={'text-lg' + (currentWallpaperMode === WALLPAPER_FULLSCREEN ? ' text-white' : '')} />
				<span>{wallpaperModeLabel(WALLPAPER_FULLSCREEN)}</span>
			</button>
			<button
				class="flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs transition-all duration-200
					border-2 relative text-neutral-600 dark:text-neutral-300"
				class:bg-[var(--primary)]={currentWallpaperMode === WALLPAPER_NONE}
				class:border-[var(--primary)]={currentWallpaperMode === WALLPAPER_NONE}
				class:!text-white={currentWallpaperMode === WALLPAPER_NONE}
				class:border-transparent={currentWallpaperMode !== WALLPAPER_NONE}
				class:hover:border-[var(--primary)]={currentWallpaperMode !== WALLPAPER_NONE}
				class:hover:text-[var(--primary)]={currentWallpaperMode !== WALLPAPER_NONE}
				class:dark:hover:text-[var(--primary)]={currentWallpaperMode !== WALLPAPER_NONE}
				on:click={() => selectWallpaperMode(WALLPAPER_NONE)}
			>
				<Icon icon="material-symbols:hide-image-outline" class={'text-lg' + (currentWallpaperMode === WALLPAPER_NONE ? ' text-white' : '')} />
				<span>{wallpaperModeLabel(WALLPAPER_NONE)}</span>
			</button>
			</div>
		</div>
{/if}

{#if showWallpaperSection && currentWallpaperMode === WALLPAPER_BANNER}
		<!-- 横幅位置选择（banner模式时显示） -->
		<div>
			<div class="flex items-center gap-2 mb-3">
				<Icon icon="material-symbols:vertical-align-center" class="text-[var(--btn-content)] text-lg" />
				<span class="text-base font-bold text-neutral-700 dark:text-neutral-300">
					{i18n(I18nKey.wallpaperPosition)}
				</span>
			</div>
			<div class="mb-3">
				<div class="grid grid-cols-3 gap-2">
				<button
					class="flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs transition-all duration-200
						border-2 relative text-neutral-600 dark:text-neutral-300"
					class:bg-[var(--primary)]={currentBannerPosition === "top"}
					class:border-[var(--primary)]={currentBannerPosition === "top"}
					class:!text-white={currentBannerPosition === "top"}
					class:border-transparent={currentBannerPosition !== "top"}
					class:hover:border-[var(--primary)]={currentBannerPosition !== "top"}
					class:hover:text-[var(--primary)]={currentBannerPosition !== "top"}
					class:dark:hover:text-[var(--primary)]={currentBannerPosition !== "top"}
					on:click={() => selectBannerPosition("top")}
				>
					<Icon icon="material-symbols:vertical-align-top" class={'text-lg' + (currentBannerPosition === 'top' ? ' text-white' : '')} />
					<span>{wallpaperPositionLabel("top")}</span>
				</button>
				<button
					class="flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs transition-all duration-200
						border-2 relative text-neutral-600 dark:text-neutral-300"
					class:bg-[var(--primary)]={currentBannerPosition === "center"}
					class:border-[var(--primary)]={currentBannerPosition === "center"}
					class:!text-white={currentBannerPosition === "center"}
					class:border-transparent={currentBannerPosition !== "center"}
					class:hover:border-[var(--primary)]={currentBannerPosition !== "center"}
					class:hover:text-[var(--primary)]={currentBannerPosition !== "center"}
					class:dark:hover:text-[var(--primary)]={currentBannerPosition !== "center"}
					on:click={() => selectBannerPosition("center")}
				>
					<Icon icon="material-symbols:vertical-align-center" class={'text-lg' + (currentBannerPosition === 'center' ? ' text-white' : '')} />
					<span>{wallpaperPositionLabel("center")}</span>
				</button>
				<button
					class="flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs transition-all duration-200
						border-2 relative text-neutral-600 dark:text-neutral-300"
					class:bg-[var(--primary)]={currentBannerPosition === "bottom"}
					class:border-[var(--primary)]={currentBannerPosition === "bottom"}
					class:!text-white={currentBannerPosition === "bottom"}
					class:border-transparent={currentBannerPosition !== "bottom"}
					class:hover:border-[var(--primary)]={currentBannerPosition !== "bottom"}
					class:hover:text-[var(--primary)]={currentBannerPosition !== "bottom"}
					class:dark:hover:text-[var(--primary)]={currentBannerPosition !== "bottom"}
					on:click={() => selectBannerPosition("bottom")}
				>
					<Icon icon="material-symbols:vertical-align-bottom" class={'text-lg' + (currentBannerPosition === 'bottom' ? ' text-white' : '')} />
					<span>{wallpaperPositionLabel("bottom")}</span>
				</button>
				</div>
			</div>
		</div>
{/if}

{#if showWallpaperSection && currentWallpaperMode === WALLPAPER_FULLSCREEN}
		<!-- 壁纸位置选择（仅全屏壁纸时显示，移动端隐藏） -->
		<div class="hidden lg:block">
			<div class="flex items-center gap-2 mb-3">
				<Icon icon="material-symbols:vertical-align-center" class="text-[var(--btn-content)] text-lg" />
				<span class="text-base font-bold text-neutral-700 dark:text-neutral-300">
					{i18n(I18nKey.wallpaperPosition)}
				</span>
			</div>
			<div class="mb-3">
				<div class="grid grid-cols-3 gap-2">
				<button
					class="flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs transition-all duration-200
						border-2 relative text-neutral-600 dark:text-neutral-300"
					class:bg-[var(--primary)]={currentWallpaperPosition === "top"}
					class:border-[var(--primary)]={currentWallpaperPosition === "top"}
					class:!text-white={currentWallpaperPosition === "top"}
					class:border-transparent={currentWallpaperPosition !== "top"}
					class:hover:border-[var(--primary)]={currentWallpaperPosition !== "top"}
					class:hover:text-[var(--primary)]={currentWallpaperPosition !== "top"}
					class:dark:hover:text-[var(--primary)]={currentWallpaperPosition !== "top"}
					on:click={() => selectWallpaperPosition("top")}
				>
					<Icon icon="material-symbols:vertical-align-top" class={'text-lg' + (currentWallpaperPosition === 'top' ? ' text-white' : '')} />
					<span>{wallpaperPositionLabel("top")}</span>
				</button>
				<button
					class="flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs transition-all duration-200
						border-2 relative text-neutral-600 dark:text-neutral-300"
					class:bg-[var(--primary)]={currentWallpaperPosition === "center"}
					class:border-[var(--primary)]={currentWallpaperPosition === "center"}
					class:!text-white={currentWallpaperPosition === "center"}
					class:border-transparent={currentWallpaperPosition !== "center"}
					class:hover:border-[var(--primary)]={currentWallpaperPosition !== "center"}
					class:hover:text-[var(--primary)]={currentWallpaperPosition !== "center"}
					class:dark:hover:text-[var(--primary)]={currentWallpaperPosition !== "center"}
					on:click={() => selectWallpaperPosition("center")}
				>
					<Icon icon="material-symbols:vertical-align-center" class={'text-lg' + (currentWallpaperPosition === 'center' ? ' text-white' : '')} />
					<span>{wallpaperPositionLabel("center")}</span>
				</button>
				<button
					class="flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs transition-all duration-200
						border-2 relative text-neutral-600 dark:text-neutral-300"
					class:bg-[var(--primary)]={currentWallpaperPosition === "bottom"}
					class:border-[var(--primary)]={currentWallpaperPosition === "bottom"}
					class:!text-white={currentWallpaperPosition === "bottom"}
					class:border-transparent={currentWallpaperPosition !== "bottom"}
					class:hover:border-[var(--primary)]={currentWallpaperPosition !== "bottom"}
					class:hover:text-[var(--primary)]={currentWallpaperPosition !== "bottom"}
					class:dark:hover:text-[var(--primary)]={currentWallpaperPosition !== "bottom"}
					on:click={() => selectWallpaperPosition("bottom")}
				>
					<Icon icon="material-symbols:vertical-align-bottom" class={'text-lg' + (currentWallpaperPosition === 'bottom' ? ' text-white' : '')} />
					<span>{wallpaperPositionLabel("bottom")}</span>
				</button>
				</div>
			</div>
		</div>
{/if}

{#if showWallpaperSection && currentWallpaperMode === WALLPAPER_FULLSCREEN}
		<!-- 壁纸透明度 -->
		<div class="flex items-center gap-2 mb-2">
			<Icon icon="material-symbols:opacity" class="text-[var(--btn-content)] text-lg" />
			<span class="text-base font-bold text-neutral-700 dark:text-neutral-300">
				{i18n(I18nKey.wallpaperOpacity)}
			</span>
			<div class="ml-auto flex gap-1">
				<button aria-label="Reset to Default" class="btn-regular w-7 h-7 rounded-md active:scale-90"
					class:opacity-0={currentWallpaperOpacity === defaultWallpaperOpacity} class:pointer-events-none={currentWallpaperOpacity === defaultWallpaperOpacity} on:click={resetWallpaperOpacity}>
					<div class="text-[var(--btn-content)]">
						<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
					</div>
				</button>
			</div>
		</div>
		<div class="flex items-center gap-2 mb-3">
			<div id="opacitySlider" class="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded select-none"
				role="slider" tabindex="0"
				aria-label={i18n(I18nKey.wallpaperOpacity)}
				aria-valuenow={currentWallpaperOpacity}
				aria-valuemin="20" aria-valuemax="100"
				on:mousedown={(e) => handleSliderStart(e, "opacity")}
			>
				<div data-fill class="h-full rounded select-none bg-[var(--primary)]"
					style="width: {sliderFillPercent('opacity')}%"
				></div>
			</div>
			<div id="opacityValue" class="ignore transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
				font-bold text-xs items-center text-[var(--btn-content)]">
				{currentWallpaperOpacity}%
			</div>
		</div>

		<!-- 壁纸模糊程度 -->
		<div class="flex items-center gap-2 mb-2">
			<Icon icon="material-symbols:blur-on" class="text-[var(--btn-content)] text-lg" />
			<span class="text-base font-bold text-neutral-700 dark:text-neutral-300">
				{i18n(I18nKey.wallpaperBlur)}
			</span>
			<div class="ml-auto flex gap-1">
				<button aria-label="Reset to Default" class="btn-regular w-7 h-7 rounded-md active:scale-90"
					class:opacity-0={currentWallpaperBlur === defaultWallpaperBlur} class:pointer-events-none={currentWallpaperBlur === defaultWallpaperBlur} on:click={resetWallpaperBlur}>
					<div class="text-[var(--btn-content)]">
						<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
					</div>
				</button>
			</div>
		</div>
		<div class="flex items-center gap-2 mb-3">
			<div id="blurSlider" class="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded select-none"
				role="slider" tabindex="0"
				aria-label={i18n(I18nKey.wallpaperBlur)}
				aria-valuenow={currentWallpaperBlur}
				aria-valuemin="0" aria-valuemax="100"
				on:mousedown={(e) => handleSliderStart(e, "blur")}
			>
				<div data-fill class="h-full rounded select-none bg-[var(--primary)]"
					style="width: {sliderFillPercent('blur')}%"
				></div>
			</div>
			<div id="blurValue" class="ignore transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
				font-bold text-xs items-center text-[var(--btn-content)]">
				{currentWallpaperBlur}%
			</div>
		</div>

{/if}

{#if currentWallpaperMode === WALLPAPER_BANNER}
<!-- 导航栏透明模式选择 -->
<div class="mb-4 transition-all duration-200">
	<div class="flex items-center gap-2 mb-3">
		<Icon icon="material-symbols:menu-rounded" class="text-[var(--btn-content)] text-lg" />
		<span class="text-base font-bold text-neutral-700 dark:text-neutral-300">
			{i18n(I18nKey.navbarTransparentMode)}
		</span>
	</div>
	<div class="grid grid-cols-3 gap-2">
		<button
			class="flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs transition-all duration-200
				border-2 relative text-neutral-600 dark:text-neutral-300"
			class:bg-[var(--primary)]={navbarTransparentMode === "semi"}
			class:border-[var(--primary)]={navbarTransparentMode === "semi"}
			class:!text-white={navbarTransparentMode === "semi"}
			class:border-transparent={navbarTransparentMode !== "semi"}
			class:hover:border-[var(--primary)]={navbarTransparentMode !== "semi"}
			class:hover:text-[var(--primary)]={navbarTransparentMode !== "semi"}
			class:dark:hover:text-[var(--primary)]={navbarTransparentMode !== "semi"}
			on:click={() => selectNavbarTransparentMode("semi")}
		>
			<Icon icon="material-symbols:blur-on" class={'text-lg' + (navbarTransparentMode === 'semi' ? ' text-white' : '')} />
			<span>{navbarTransparentModeLabel("semi")}</span>
		</button>
		<button
			class="flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs transition-all duration-200
				border-2 relative text-neutral-600 dark:text-neutral-300"
			class:bg-[var(--primary)]={navbarTransparentMode === "full"}
			class:border-[var(--primary)]={navbarTransparentMode === "full"}
			class:!text-white={navbarTransparentMode === "full"}
			class:border-transparent={navbarTransparentMode !== "full"}
			class:hover:border-[var(--primary)]={navbarTransparentMode !== "full"}
			class:hover:text-[var(--primary)]={navbarTransparentMode !== "full"}
			class:dark:hover:text-[var(--primary)]={navbarTransparentMode !== "full"}
			on:click={() => selectNavbarTransparentMode("full")}
		>
			<Icon icon="material-symbols:blur-off" class={'text-lg' + (navbarTransparentMode === 'full' ? ' text-white' : '')} />
			<span>{navbarTransparentModeLabel("full")}</span>
		</button>
		<button
			class="flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs transition-all duration-200
				border-2 relative text-neutral-600 dark:text-neutral-300"
			class:bg-[var(--primary)]={navbarTransparentMode === "semifull"}
			class:border-[var(--primary)]={navbarTransparentMode === "semifull"}
			class:!text-white={navbarTransparentMode === "semifull"}
			class:border-transparent={navbarTransparentMode !== "semifull"}
			class:hover:border-[var(--primary)]={navbarTransparentMode !== "semifull"}
			class:hover:text-[var(--primary)]={navbarTransparentMode !== "semifull"}
			class:dark:hover:text-[var(--primary)]={navbarTransparentMode !== "semifull"}
			on:click={() => selectNavbarTransparentMode("semifull")}
		>
			<Icon icon="material-symbols:blur-circular" class={'text-lg' + (navbarTransparentMode === 'semifull' ? ' text-white' : '')} />
			<span>{navbarTransparentModeLabel("semifull")}</span>
		</button>
	</div>
</div>
{/if}

{#if postListLayoutAllowSwitch}
<!-- 文章列表布局切换（仅在桌面端显示） -->
<div class="hidden md:block">
	<div class="flex items-center gap-2 mb-3">
	<div class="flex items-center gap-2">
		<Icon icon="material-symbols:grid-view-outline" class="text-[var(--btn-content)] text-lg" />
		<span class="text-base font-bold text-neutral-700 dark:text-neutral-300">
			{i18n(I18nKey.postListLayout)}
		</span>
	</div>
</div>
<div class="mb-3 grid grid-cols-2 gap-3">
	<button
		class="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm transition-all duration-200
			border-2 relative text-neutral-600 dark:text-neutral-300"
		class:bg-[var(--primary)]={postListLayout === "list"}
		class:border-[var(--primary)]={postListLayout === "list"}
		class:!text-white={postListLayout === "list"}
		class:border-transparent={postListLayout !== "list"}
		class:hover:border-[var(--primary)]={postListLayout !== "list"}
		class:hover:text-[var(--primary)]={postListLayout !== "list"}
		class:dark:hover:text-[var(--primary)]={postListLayout !== "list"}
		on:click={() => selectPostListLayout("list")}
	>
		<Icon icon="material-symbols:format-list-bulleted" class={'text-base' + (postListLayout === 'list' ? ' text-white' : '')} />
		<span>{i18n(I18nKey.listMode)}</span>
	</button>
	<button
		class="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm transition-all duration-200
			border-2 relative text-neutral-600 dark:text-neutral-300"
		class:bg-[var(--primary)]={postListLayout === "grid"}
		class:border-[var(--primary)]={postListLayout === "grid"}
		class:!text-white={postListLayout === "grid"}
		class:border-transparent={postListLayout !== "grid"}
		class:hover:border-[var(--primary)]={postListLayout !== "grid"}
		class:hover:text-[var(--primary)]={postListLayout !== "grid"}
		class:dark:hover:text-[var(--primary)]={postListLayout !== "grid"}
		on:click={() => selectPostListLayout("grid")}
	>
		<Icon icon="material-symbols:grid-view-outline" class={'text-base' + (postListLayout === 'grid' ? ' text-white' : '')} />
		<span>{i18n(I18nKey.gridMode)}</span>
	</button>
</div>
</div>
{/if}
</div>


<style lang="stylus">
	#display-setting
		input[type="range"]
			-webkit-appearance none
			height 1.5rem
			background-image var(--color-selection-bar)
			transition background-image 0.15s ease-in-out

			/* Input Thumb */
			&::-webkit-slider-thumb
				-webkit-appearance none
				height 1rem
				width 0.5rem
				border-radius 0.125rem
				background rgba(255, 255, 255, 0.7)
				box-shadow none
				&:hover
					background rgba(255, 255, 255, 0.8)
				&:active
					background rgba(255, 255, 255, 0.6)

			&::-moz-range-thumb
				-webkit-appearance none
				height 1rem
				width 0.5rem
				border-radius 0.125rem
				border-width 0
				background rgba(255, 255, 255, 0.7)
				box-shadow none
				&:hover
					background rgba(255, 255, 255, 0.8)
				&:active
					background rgba(255, 255, 255, 0.6)

			&::-ms-thumb
				-webkit-appearance none
				height 1rem
				width 0.5rem
				border-radius 0.125rem
				background rgba(255, 255, 255, 0.7)
				box-shadow none
				&:hover
					background rgba(255, 255, 255, 0.8)
				&:active
					background rgba(255, 255, 255, 0.6)

</style>