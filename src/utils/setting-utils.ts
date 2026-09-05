import {
	DARK_MODE,
	DEFAULT_THEME,
	LIGHT_MODE,
	NAVBAR_TRANSPARENT_SEMI,
	SYSTEM_MODE,
	WALLPAPER_BANNER,
	WALLPAPER_FULLSCREEN,
	WALLPAPER_FULLSCREEN_BANNER,
	WALLPAPER_NONE,
} from "@constants/constants";
import { siteConfig } from "@/config";
import type { LIGHT_DARK_MODE, WALLPAPER_MODE } from "@/types/config";
export type NAVBAR_TRANSPARENT_MODE = "semi" | "full" | "semifull";
export type WALLPAPER_POSITION = "top" | "center" | "bottom";

export function getDefaultHue(): number {
	const fallback = "250";
	const configCarrier = document.getElementById("config-carrier");
	// 在Swup页面切换时，config-carrier可能不存在，使用默认值
	if (!configCarrier) {
		return Number.parseInt(fallback, 10);
	}
	return Number.parseInt(configCarrier.dataset.hue || fallback, 10);
}

export function getHue(): number {
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored, 10) : getDefaultHue();
}

export function setHue(hue: number): void {
	localStorage.setItem("hue", String(hue));
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--hue", String(hue));
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
	// 获取当前主题状态的完整信息
	const currentIsDark = document.documentElement.classList.contains("dark");
	const currentTheme = document.documentElement.getAttribute("data-theme");

	// 计算目标主题状态
	let targetIsDark = false;
	switch (theme) {
		case LIGHT_MODE:
			targetIsDark = false;
			break;
		case DARK_MODE:
			targetIsDark = true;
			break;
		case SYSTEM_MODE:
			targetIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			break;
		default:
			targetIsDark = currentIsDark;
			break;
	}

	// 检测是否真的需要主题切换：
	// 1. dark类状态是否改变
	// 2. expressiveCode主题是否需要更新
	const needsThemeChange = currentIsDark !== targetIsDark;
	const expectedTheme = targetIsDark ? "github-dark" : "github-light";
	const needsCodeThemeUpdate = currentTheme !== expectedTheme;

	// 如果既不需要主题切换也不需要代码主题更新，直接返回
	if (!needsThemeChange && !needsCodeThemeUpdate) {
		return;
	}

	// 定义实际执行主题切换的函数
	const performThemeChange = () => {
		// 应用主题变化
		if (needsThemeChange) {
			if (targetIsDark) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		}

		// Set the theme for Expressive Code based on current mode
		// 只在必要时更新 data-theme 属性以减少重绘
		if (needsCodeThemeUpdate) {
			const expressiveTheme = targetIsDark ? "github-dark" : "github-light";
			document.documentElement.setAttribute("data-theme", expressiveTheme);
		}
	};

	// 检查浏览器是否支持 View Transitions API
	if (
		needsThemeChange &&
		document.startViewTransition &&
		!window.matchMedia("(prefers-reduced-motion: reduce)").matches
	) {
		// 添加标记类，表示正在使用 View Transitions
		document.documentElement.classList.add(
			"is-theme-transitioning",
			"use-view-transition",
		);

		// 使用 View Transitions API 实现平滑过渡
		const transition = document.startViewTransition(() => {
			performThemeChange();
		});

		// 在过渡完成后移除标记类（使用 finished promise 确保完全同步）
		transition.finished
			.then(() => {
				// 使用 microtask 确保在下一个事件循环前完成清理
				queueMicrotask(() => {
					document.documentElement.classList.remove(
						"is-theme-transitioning",
						"use-view-transition",
					);
				});
			})
			.catch(() => {
				// 如果过渡被中断，也要清理状态
				document.documentElement.classList.remove(
					"is-theme-transitioning",
					"use-view-transition",
				);
			});
	} else {
		// 不支持 View Transitions API 或用户偏好减少动画，使用传统方式
		// 只在需要主题切换时添加过渡保护
		if (needsThemeChange) {
			document.documentElement.classList.add("is-theme-transitioning");
		}

		performThemeChange();

		// 使用 requestAnimationFrame 确保在下一帧移除过渡保护类
		if (needsThemeChange) {
			requestAnimationFrame(() => {
				document.documentElement.classList.remove("is-theme-transitioning");
			});
		}
	}
}

// 系统主题变化监听器引用
let systemThemeListener: ((e: MediaQueryListEvent) => void) | null = null;

function addSystemThemeListener() {
	removeSystemThemeListener();
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	systemThemeListener = (e: MediaQueryListEvent) => {
		const isDark = e.matches;
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		// 同步代码块主题
		const expressiveTheme = isDark ? "github-dark" : "github-light";
		document.documentElement.setAttribute("data-theme", expressiveTheme);
	};
	mediaQuery.addEventListener("change", systemThemeListener);
}

function removeSystemThemeListener() {
	if (systemThemeListener) {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.removeEventListener("change", systemThemeListener);
		systemThemeListener = null;
	}
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
	localStorage.setItem("theme", theme);

	// 管理系统主题监听器
	if (theme === SYSTEM_MODE) {
		addSystemThemeListener();
	} else {
		removeSystemThemeListener();
	}

	applyThemeToDocument(theme);
}

export function getStoredTheme(): LIGHT_DARK_MODE {
	return (localStorage.getItem("theme") as LIGHT_DARK_MODE) || DEFAULT_THEME;
}

const VALID_WALLPAPER_MODES: WALLPAPER_MODE[] = [
	WALLPAPER_BANNER,
	WALLPAPER_FULLSCREEN,
	WALLPAPER_FULLSCREEN_BANNER,
	WALLPAPER_NONE,
];

export function isFullscreenWallpaperMode(mode: WALLPAPER_MODE): boolean {
	return mode === WALLPAPER_FULLSCREEN || mode === WALLPAPER_FULLSCREEN_BANNER;
}

export function getStoredWallpaperMode(): WALLPAPER_MODE {
	const stored = localStorage.getItem("wallpaperMode") as WALLPAPER_MODE | null;
	const defaultMode = siteConfig.appearance.wallpaperMode.defaultMode;
	if (stored && VALID_WALLPAPER_MODES.includes(stored)) {
		return stored;
	}
	return defaultMode;
}

export function setWallpaperMode(mode: WALLPAPER_MODE): void {
	localStorage.setItem("wallpaperMode", mode);
	// 触发自定义事件通知其他组件壁纸模式已改变
	window.dispatchEvent(
		new CustomEvent("wallpaper-mode-change", { detail: { mode } }),
	);
}

export function getStoredBannerPosition(): WALLPAPER_POSITION {
	const stored = localStorage.getItem(
		"bannerPosition",
	) as WALLPAPER_POSITION | null;
	if (stored === "top" || stored === "center" || stored === "bottom") {
		return stored;
	}
	return siteConfig.appearance.wallpaperMode.defaultBannerPosition || "center";
}

export function setBannerPosition(position: WALLPAPER_POSITION): void {
	localStorage.setItem("bannerPosition", position);
	window.dispatchEvent(
		new CustomEvent("banner-position-change", { detail: { position } }),
	);
}

export function getStoredWallpaperPosition(): WALLPAPER_POSITION {
	const stored = localStorage.getItem(
		"wallpaperPosition",
	) as WALLPAPER_POSITION | null;
	if (stored === "top" || stored === "center" || stored === "bottom") {
		return stored;
	}
	return (
		siteConfig.appearance.wallpaperMode.defaultFullscreenPosition || "center"
	);
}

export function setWallpaperPosition(position: WALLPAPER_POSITION): void {
	localStorage.setItem("wallpaperPosition", position);
	// 触发自定义事件通知其他组件壁纸位置已改变
	window.dispatchEvent(
		new CustomEvent("wallpaper-position-change", { detail: { position } }),
	);
}

export function getStoredWallpaperOpacity(): number {
	const stored = localStorage.getItem("wallpaperOpacity");
	if (stored !== null) {
		const val = Number.parseFloat(stored);
		if (!Number.isNaN(val)) return Math.max(20, Math.min(100, val));
	}
	return Math.max(
		20,
		Math.min(
			100,
			(siteConfig.appearance.wallpaperMode.defaultOpacity ?? 1) * 100,
		),
	);
}

export function setWallpaperOpacity(opacity: number): void {
	localStorage.setItem("wallpaperOpacity", String(opacity));
	window.dispatchEvent(
		new CustomEvent("wallpaper-opacity-change", { detail: { opacity } }),
	);
}

export function getStoredWallpaperBlur(): number {
	const stored = localStorage.getItem("wallpaperBlur");
	if (stored !== null) {
		const val = Number.parseFloat(stored);
		if (!Number.isNaN(val)) return Math.max(0, Math.min(40, val));
	}
	return Math.max(
		0,
		Math.min(40, siteConfig.appearance.wallpaperMode.defaultBlur ?? 8),
	);
}

export function setWallpaperBlur(blur: number): void {
	localStorage.setItem("wallpaperBlur", String(blur));
	window.dispatchEvent(
		new CustomEvent("wallpaper-blur-change", { detail: { blur } }),
	);
}

export function getStoredCardOpacity(): number {
	const stored = localStorage.getItem("cardOpacity");
	if (stored !== null) {
		const val = Number.parseFloat(stored);
		if (!Number.isNaN(val)) return Math.max(20, Math.min(100, val));
	}
	return Math.max(
		20,
		Math.min(
			100,
			(siteConfig.appearance.wallpaperMode.defaultCardOpacity ?? 0.8) * 100,
		),
	);
}

export function setCardOpacity(opacity: number): void {
	localStorage.setItem("cardOpacity", String(opacity));
	window.dispatchEvent(
		new CustomEvent("card-opacity-change", { detail: { opacity } }),
	);
}

// Sakura (樱花) 特效持久化
export function getStoredSakuraEnabled(): boolean {
	// 当外观固定时（appearance.fixed = true），强制使用配置值，忽略用户偏好
	const configCarrier = document.getElementById("config-carrier");
	if (configCarrier?.dataset.appearanceFixed === "true") {
		return configCarrier?.dataset.sakuraEnabled === "true";
	}

	const stored = localStorage.getItem("sakuraEnabled");
	if (stored !== null) {
		return stored === "true";
	}
	// 用户未操作过开关时，使用配置的默认状态
	return configCarrier?.dataset.sakuraDefaultEnabled === "true";
}

export function setSakuraEnabled(enabled: boolean): void {
	localStorage.setItem("sakuraEnabled", String(enabled));
}

export type POST_LIST_LAYOUT_MODE = "list" | "grid";

export function getStoredPostListLayout(): POST_LIST_LAYOUT_MODE {
	const stored = localStorage.getItem(
		"postListLayout",
	) as POST_LIST_LAYOUT_MODE | null;
	if (stored === "list" || stored === "grid") {
		return stored;
	}
	// 从 config-carrier 读取默认值
	const configCarrier = document.getElementById("config-carrier");
	if (configCarrier?.dataset.postListLayoutDefault === "grid") {
		return "grid";
	}
	return "list";
}

export function setPostListLayout(layout: POST_LIST_LAYOUT_MODE): void {
	localStorage.setItem("postListLayout", layout);
	sessionStorage.setItem("postListLayout", layout);
	// 触发自定义事件通知其他组件布局已改变
	window.dispatchEvent(new CustomEvent("layoutChange", { detail: { layout } }));
}

// Navbar transparent mode
export function getDefaultNavbarTransparentMode(): NAVBAR_TRANSPARENT_MODE {
	const configCarrier = document.getElementById("config-carrier");
	if (!configCarrier) {
		return NAVBAR_TRANSPARENT_SEMI;
	}
	return (
		(configCarrier.dataset.navbarTransparentMode as NAVBAR_TRANSPARENT_MODE) ||
		NAVBAR_TRANSPARENT_SEMI
	);
}

export function getStoredNavbarTransparentMode(): NAVBAR_TRANSPARENT_MODE {
	// 当外观固定时（appearance.fixed = true），强制使用配置值，忽略用户偏好
	const configCarrier = document.getElementById("config-carrier");
	if (configCarrier?.dataset.appearanceFixed === "true") {
		return getDefaultNavbarTransparentMode();
	}

	const stored = localStorage.getItem(
		"navbarTransparentMode",
	) as NAVBAR_TRANSPARENT_MODE | null;
	if (stored && ["semi", "full", "semifull"].includes(stored)) {
		return stored;
	}
	// 从 config-carrier 读取默认值
	return getDefaultNavbarTransparentMode();
}

export function setNavbarTransparentMode(mode: NAVBAR_TRANSPARENT_MODE): void {
	localStorage.setItem("navbarTransparentMode", mode);
	// 触发自定义事件通知其他组件 navbar 透明模式已改变
	window.dispatchEvent(
		new CustomEvent("navbar-transparent-mode-change", { detail: { mode } }),
	);
}

// Waves (水波纹) 特效持久化
export function getStoredWavesEnabled(): boolean {
	const configCarrier = document.getElementById("config-carrier");
	if (configCarrier?.dataset.appearanceFixed === "true") {
		return configCarrier?.dataset.wavesEnabled === "true";
	}
	const stored = localStorage.getItem("wavesEnabled");
	if (stored !== null) {
		return stored === "true";
	}
	return configCarrier?.dataset.wavesEnabled === "true";
}

export function setWavesEnabled(enabled: boolean): void {
	localStorage.setItem("wavesEnabled", String(enabled));
	window.dispatchEvent(
		new CustomEvent("waves-enabled-change", { detail: { enabled } }),
	);
}

export function getStoredWavesPerformanceMode(): boolean {
	const configCarrier = document.getElementById("config-carrier");
	if (configCarrier?.dataset.appearanceFixed === "true") {
		return configCarrier?.dataset.wavesPerformanceMode === "true";
	}
	const stored = localStorage.getItem("wavesPerformanceMode");
	if (stored !== null) {
		return stored === "true";
	}
	return configCarrier?.dataset.wavesPerformanceMode === "true";
}

export function setWavesPerformanceMode(enabled: boolean): void {
	localStorage.setItem("wavesPerformanceMode", String(enabled));
	window.dispatchEvent(
		new CustomEvent("waves-performance-mode-change", { detail: { enabled } }),
	);
}

export function getStoredHomeTextEnabled(): boolean {
	const configCarrier = document.getElementById("config-carrier");
	if (configCarrier?.dataset.appearanceFixed === "true") {
		return configCarrier?.dataset.homeTextAvailable === "true";
	}
	const stored = localStorage.getItem("homeTextEnabled");
	if (stored !== null) {
		return stored === "true";
	}
	return configCarrier?.dataset.homeTextAvailable === "true";
}

export function setHomeTextEnabled(enabled: boolean): void {
	localStorage.setItem("homeTextEnabled", String(enabled));
	window.dispatchEvent(
		new CustomEvent("home-text-enabled-change", { detail: { enabled } }),
	);
}
