// 右侧边栏布局管理器
// 用于在网格模式下隐藏右侧边栏

let _layoutAC = null; // AbortController for cleanup

/**
 * 初始化页面布局
 */
function initPageLayout() {
	// 清理旧的监听器（Swup导航会重复调用此函数）
	if (_layoutAC) {
		_layoutAC.abort();
	}
	_layoutAC = new AbortController();
	const { signal } = _layoutAC;

	// 获取布局配置 - 从 main-grid 的 data-layout-mode 属性读取默认布局
	const mainGrid = document.getElementById("main-grid");
	const defaultLayoutMode = mainGrid
		? mainGrid.getAttribute("data-layout-mode")
		: "list";
	const defaultPostListLayout =
		localStorage.getItem("postListLayout") || defaultLayoutMode;

	// 如果默认布局是网格模式，则隐藏右侧边栏
	if (defaultPostListLayout === "grid") {
		hideRightSidebar();
	} else {
		showRightSidebar();
	}

	// 监听布局切换事件
	window.addEventListener(
		"layoutChange",
		(event) => {
			const layout = event.detail.layout;
			if (layout === "grid") {
				hideRightSidebar();
			} else {
				showRightSidebar();
			}
		},
		{ signal },
	);

	// 监听本地存储变化（用于跨标签页同步）
	window.addEventListener(
		"storage",
		(event) => {
			if (event.key === "postListLayout") {
				if (event.newValue === "grid") {
					hideRightSidebar();
				} else {
					showRightSidebar();
				}
			}
		},
		{ signal },
	);

	// 监听页面导航事件
	document.addEventListener(
		"astro:page-load",
		() => {
			setTimeout(() => {
				const mainGrid = document.getElementById("main-grid");
				const defaultLayoutMode = mainGrid
					? mainGrid.getAttribute("data-layout-mode")
					: "list";
				const currentLayout =
					localStorage.getItem("postListLayout") || defaultLayoutMode;
				if (currentLayout === "grid") {
					hideRightSidebar();
				} else {
					showRightSidebar();
				}
			}, 100);
		},
		{ signal },
	);

	// 监听SWUP导航事件
	document.addEventListener(
		"swup:contentReplaced",
		() => {
			setTimeout(() => {
				const mainGrid = document.getElementById("main-grid");
				const defaultLayoutMode = mainGrid
					? mainGrid.getAttribute("data-layout-mode")
					: "list";
				const currentLayout =
					localStorage.getItem("postListLayout") || defaultLayoutMode;
				if (currentLayout === "grid") {
					hideRightSidebar();
				} else {
					showRightSidebar();
				}
			}, 100);
		},
		{ signal },
	);
}

/**
 * 判断当前是否为桌面端（>= 1280px）
 */
function isDesktop() {
	return window.innerWidth >= 1280;
}

/**
 * 隐藏右侧边栏（仅桌面端生效）
 */
function hideRightSidebar() {
	const rightSidebar = document.querySelector(".right-sidebar-container");
	if (rightSidebar) {
		// 添加隐藏类（CSS仅在桌面端生效）
		rightSidebar.classList.add("hidden-in-grid-mode");

		// 仅桌面端设置 display: none
		if (isDesktop()) {
			rightSidebar.style.display = "none";
		}

		// 调整主网格布局（仅桌面端）
		if (isDesktop()) {
			const mainGrid = document.getElementById("main-grid");
			if (mainGrid) {
				mainGrid.style.gridTemplateColumns = "17.5rem 1fr";
			}
		}
		const mainGrid = document.getElementById("main-grid");
		if (mainGrid) {
			mainGrid.setAttribute("data-layout-mode", "grid");
		}
	}
}

/**
 * 显示右侧边栏
 */
function showRightSidebar() {
	const rightSidebar = document.querySelector(".right-sidebar-container");
	if (rightSidebar) {
		// 移除隐藏类
		rightSidebar.classList.remove("hidden-in-grid-mode");

		// 恢复显示
		rightSidebar.style.display = "";

		// 恢复主网格布局（仅桌面端需要重置内联样式）
		if (isDesktop()) {
			const mainGrid = document.getElementById("main-grid");
			if (mainGrid) {
				mainGrid.style.gridTemplateColumns = "";
			}
		}
		const mainGrid = document.getElementById("main-grid");
		if (mainGrid) {
			mainGrid.setAttribute("data-layout-mode", "list");
		}
	}
}

// 页面加载完成后初始化
function initialize() {
	const pageType =
		document.documentElement.getAttribute("data-page-type") || "projects";
	initPageLayout(pageType);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initialize);
} else {
	initialize();
}

// 导出函数供其他脚本使用
if (typeof module !== "undefined" && module.exports) {
	module.exports = {
		initPageLayout,
		hideRightSidebar,
		showRightSidebar,
	};
}

// 同时也挂载到 window 对象，以便在浏览器环境中直接调用
if (typeof window !== "undefined") {
	window.rightSidebarLayout = {
		initPageLayout,
		hideRightSidebar,
		showRightSidebar,
	};
}
