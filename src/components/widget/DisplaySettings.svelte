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
} from "@utils/setting-utils";
import {
	getDefaultHue,
	getHue,
	getStoredNavbarTransparentMode,
	getStoredPostListLayout,
	getStoredSakuraEnabled,
	getStoredWallpaperMode,
	setHue,
	setNavbarTransparentMode,
	setPostListLayout,
	setSakuraEnabled,
	setWallpaperMode,
} from "@utils/setting-utils";
import { onMount } from "svelte";
import type { WALLPAPER_MODE } from "@/types/config";

let hue = 250;
let defaultHue = 250;
let isMounted = false;

// 樱花状态
let sakuraEnabled = false;
// 樱花功能是否可用（由 sakuraConfig.enable 控制）
let sakuraAvailable = true;

// 壁纸模式
let currentWallpaperMode: WALLPAPER_MODE = WALLPAPER_BANNER;

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

function toggleSakuraEffect() {
	toggleSakura();
	// toggleSakura 内部会切换启用/停用状态，刷新 UI 状态
	sakuraEnabled = getSakuraStatus();
	setSakuraEnabled(sakuraEnabled);
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

	// 读取文章列表布局
	postListLayout = getStoredPostListLayout();

	// 读取樱花可用性（sakuraConfig.enable 控制面板是否显示该选项）
	const configCarrier = document.getElementById("config-carrier");
	if (configCarrier?.dataset.sakuraAvailable) {
		sakuraAvailable = configCarrier.dataset.sakuraAvailable === "true";
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

$: navbarDisabled = currentWallpaperMode !== WALLPAPER_BANNER;

$: if (isMounted && (hue || hue === 0)) {
	setHue(hue);
}
</script>

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

<!-- 导航栏透明模式选择 -->
<div class="mb-4 transition-all duration-200" class:opacity-40={navbarDisabled} class:pointer-events-none={navbarDisabled}>
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

{#if postListLayoutAllowSwitch}
<!-- 文章列表布局切换（仅在桌面端显示） -->
<div class="hidden lg:block">
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
