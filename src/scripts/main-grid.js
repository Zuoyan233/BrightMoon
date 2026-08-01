/**
 * 主网格布局脚本
 * 管理壁纸模式切换、TOC 响应式控制、导航栏透明模式、文章列表布局切换、Swup 页面过渡等
 */

const configEl = document.documentElement;
const configStr = configEl.dataset.mainGridConfig;
const config = configStr ? JSON.parse(configStr) : {};
const {
	navbarTransparentMode,
	defaultWallpaperMode,
	defaultBannerPosition,
	defaultPostListLayout,
	BANNER_HEIGHT,
	responsiveTocModes,
} = config;

// 初始化半透明滚动检测函数（如果不存在）
if (typeof window.initSemifullScrollDetection !== "function") {
	window.initSemifullScrollDetection = () => {
		const navbar = document.getElementById("navbar");
		if (!navbar) return;

		const handleScroll = () => {
			const scrollTop = window.scrollY;
			if (scrollTop > 50) {
				navbar.classList.add("navbar-solid");
			} else {
				navbar.classList.remove("navbar-solid");
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // 立即执行一次
	};
}

// TOC 响应式控制函数
function updateTOCDisplay() {
	const width = window.innerWidth;
	let deviceType = "desktop";

	if (width < 768) {
		deviceType = "mobile";
	} else if (width >= 768 && width < 1280) {
		deviceType = "tablet";
	}

	const currentMode = responsiveTocModes[deviceType];

	// 获取左侧边栏中的 TOC widget
	const tocWidget = document.querySelector(
		'widget-layout[data-id="toc-widget"]',
	);
	// 移动端始终使用 float 模式
	if (deviceType === "mobile") {
		// 显示浮动 TOC
		const floatingTOC = document.querySelector(".floating-toc-wrapper");
		if (floatingTOC) {
			floatingTOC.style.display = "";
		}
		// 隐藏侧边栏 TOC widget
		if (tocWidget) {
			tocWidget.dataset.hiddenByToc = "true";
			tocWidget.style.display = "none";
		}
		return;
	}

	// 平板端根据配置决定模式
	if (deviceType === "tablet") {
		document.body.setAttribute("data-toc-mode", currentMode);

		if (currentMode === "sidebar") {
			// 平板端 sidebar 模式：隐藏浮动 TOC，显示侧边栏 TOC
			const floatingTOC = document.querySelector(".floating-toc-wrapper");
			if (floatingTOC) {
				floatingTOC.style.display = "none";
			}
			if (tocWidget) {
				// 检查当前页面是否为文章页（只有文章页才显示侧边栏 TOC）
				const isPostPage =
					window.location.pathname.includes("/posts/") ||
					document.querySelector(".custom-md, .markdown-content") !== null;
				if (isPostPage) {
					if (tocWidget.dataset.hiddenByToc === "true") {
						tocWidget.dataset.hiddenByToc = "";
						tocWidget.style.display = "";
					}
				} else {
					// 非文章页确保 TOC 隐藏
					tocWidget.style.display = "none";
					tocWidget.dataset.hiddenByToc = "false";
				}
			}
		} else {
			// 平板端 float 模式：显示浮动 TOC，隐藏侧边栏 TOC
			const floatingTOC = document.querySelector(".floating-toc-wrapper");
			if (floatingTOC) {
				floatingTOC.style.display = "";
			}
			if (tocWidget) {
				tocWidget.dataset.hiddenByToc = "true";
				tocWidget.style.display = "none";
			}
		}

		const tocContainer = document.getElementById("responsive-toc-container");
		if (tocContainer) {
			tocContainer.setAttribute("data-current-device", deviceType);
			tocContainer.setAttribute("data-current-mode", currentMode);
		}
		return;
	}

	// 桌面端逻辑
	document.body.setAttribute("data-toc-mode", currentMode);

	if (currentMode === "float") {
		// 桌面端 float 模式：显示浮动 TOC，隐藏侧边栏 TOC
		const floatingTOC = document.querySelector(".floating-toc-wrapper");
		if (floatingTOC) {
			floatingTOC.style.display = "";
		}
		if (tocWidget) {
			tocWidget.dataset.hiddenByToc = "true";
			tocWidget.style.display = "none";
		}
	} else {
		// 桌面端 sidebar 模式：隐藏浮动 TOC，显示侧边栏 TOC
		const floatingTOC = document.querySelector(".floating-toc-wrapper");
		if (floatingTOC) {
			floatingTOC.style.display = "none";
		}
		if (tocWidget) {
			// 检查当前页面是否为文章页（只有文章页才显示侧边栏 TOC）
			const isPostPage =
				window.location.pathname.includes("/posts/") ||
				document.querySelector(".custom-md, .markdown-content") !== null;
			if (isPostPage) {
				// 仅在 TOC 被本函数隐藏时才恢复显示，避免覆盖 TOC 组件自身的隐藏逻辑
				if (tocWidget.dataset.hiddenByToc === "true") {
					tocWidget.dataset.hiddenByToc = "";
					tocWidget.style.display = "";
				}
				// 如果 TOC 还没加载完成，让它自然显示（TOC 组件加载后会自行决定是否隐藏）
				// 如果 TOC 已加载且无内容，TOC 组件已将 widget-layout 隐藏，不需要额外处理
			} else {
				// 非文章页确保 TOC 隐藏
				tocWidget.style.display = "none";
				tocWidget.dataset.hiddenByToc = "false";
			}
		}
	}

	const tocContainer = document.getElementById("responsive-toc-container");
	if (tocContainer) {
		tocContainer.setAttribute("data-current-device", deviceType);
		tocContainer.setAttribute("data-current-mode", currentMode);
	}
}

// 监听窗口大小变化（防抖处理）
let resizeTimeout;
window.addEventListener("resize", () => {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(() => {
		requestAnimationFrame(updateTOCDisplay);
	}, 150);
});

// 判断是否为主页或分页首页（如 /2/、/3/ 等纯数字段路径）
function isHomeOrPaginatedHome() {
	const p = window.location.pathname;
	if (p === "/" || p === "") return true;
	const cleaned = p.replace(/^\/+|\/+$/g, "");
	return /^\d+$/.test(cleaned);
}

// 统一处理 Swup 页面切换
const handleSwupPageView = () => {
	applyWallpaperMode();

	// 延迟更新 TOC 显示，等待新页面内容渲染完成
	setTimeout(() => {
		updateTOCDisplay();
	}, 150);

	requestAnimationFrame(() => {
		const mainGrid = document.getElementById("main-grid");
		if (mainGrid) {
			const savedLayout = localStorage.getItem("postListLayout");
			const currentLayout = savedLayout || defaultPostListLayout;
			mainGrid.setAttribute("data-layout-mode", currentLayout);

			const rightSidebar = document.querySelector(".right-sidebar-container");
			if (rightSidebar) {
				if (currentLayout === "grid") {
					rightSidebar.classList.add("hidden-in-grid-mode");
					if (window.innerWidth >= 1280) {
						rightSidebar.style.display = "none";
					}
				} else {
					rightSidebar.classList.remove("hidden-in-grid-mode");
					rightSidebar.style.display = "";
				}
			}
		}

		// Swup 切换时重新随机选取主页/分页首页推荐项
		if (isHomeOrPaginatedHome()) {
			if (typeof window.injectHomepageSuggestion === "function") {
				window.injectHomepageSuggestion();
			}
		}
	});
};

document.addEventListener("swup:page:view", handleSwupPageView);

// 初始化 TOC 显示
updateTOCDisplay();

// 监听 TOC 加载完成事件，更新显示状态
document.addEventListener("toc:loaded", updateTOCDisplay);
document.addEventListener("toc:unloaded", updateTOCDisplay);

// 监听壁纸模式切换
window.addEventListener("wallpaper-mode-change", updateTOCDisplay);

// 主页推荐项随机选取函数（供初始加载和 Swup 切换共用）
window.injectHomepageSuggestion = () => {
	// 只在主页或分页首页执行
	if (!isHomeOrPaginatedHome()) return;

	var dataScript = document.getElementById("homepage-suggestion-data");
	if (!dataScript) return;
	var candidates;
	try {
		candidates = JSON.parse(dataScript.textContent || "[]");
	} catch (_e) {
		return;
	}
	if (!candidates || candidates.length === 0) return;

	// 移除之前动态插入的推荐项（保留面包屑容器中除了首页按钮和分隔符之外的内容）
	var breadcrumbContainer = document.querySelector(".breadcrumb-container");
	if (!breadcrumbContainer) return;

	// 移除所有动态插入的推荐项（标记为 data-dynamic-suggestion 的元素）
	var existingSuggestions = breadcrumbContainer.querySelectorAll(
		"[data-dynamic-suggestion]",
	);
	existingSuggestions.forEach((el) => {
		el.remove();
	});

	// 随机选取一个
	var chosen = candidates[Math.floor(Math.random() * candidates.length)];
	if (!chosen) return;

	// 使用 iconify-icon 渲染图标
	var iconHtml = chosen.icon
		? '<span class="flex items-center justify-center w-8 h-8 mr-2 rounded-lg bg-[var(--btn-plain-bg-hover)] group-hover:bg-[var(--primary)] transition-colors duration-200">' +
			'<iconify-icon icon="' +
			chosen.icon +
			'" class="text-xl leading-none shrink-0 text-[var(--btn-content)] transition-colors duration-200 group-hover:text-white" style="width:1.25rem;height:1.25rem"></iconify-icon>' +
			"</span>"
		: "";

	var suggestionHtml = chosen.suggestionLabel
		? '<span class="suggestion-prefix shrink-0">' +
			chosen.suggestionLabel +
			'</span><span class="shrink-0">: </span>'
		: "";

	var href = chosen.href || "#";

	var itemHtml =
		'<div data-dynamic-suggestion class="flex items-center text-[var(--primary)] opacity-50 shrink-0">' +
		'<iconify-icon icon="material-symbols:chevron-right-rounded" class="text-xl leading-none" style="width:1.25rem;height:1.25rem"></iconify-icon>' +
		"</div>" +
		'<a href="' +
		href +
		'" title="' +
		chosen.label +
		'" data-dynamic-suggestion class="group flex items-center gap-1 rounded-lg transition-all duration-200 ease-out whitespace-nowrap shrink-0 px-2 py-2 cursor-pointer border-none bg-transparent text-sm text-neutral-500 dark:text-neutral-400 no-underline hover:bg-[var(--btn-plain-bg-hover)] hover:text-[var(--primary)] dark:hover:text-[var(--primary)]">' +
		iconHtml +
		'<span class="leading-none inline-flex items-center gap-1">' +
		suggestionHtml +
		"<span>" +
		chosen.label +
		"</span>" +
		"</span>" +
		"</a>";

	breadcrumbContainer.insertAdjacentHTML("beforeend", itemHtml);
};

// 立即执行，在页面渲染前应用壁纸模式、导航栏透明模式和布局模式，避免闪烁
(() => {
	var wallpaperMode =
		localStorage.getItem("wallpaperMode") || defaultWallpaperMode;
	var body = document.body;

	// 立即应用导航栏透明模式（优先 localStorage，其次 config）
	var navbarMode =
		localStorage.getItem("navbarTransparentMode") || navbarTransparentMode;
	var navbar = document.getElementById("navbar");
	if (navbar) {
		navbar.setAttribute("data-transparent-mode", navbarMode);
	}

	// 立即应用 body 类，确保首次渲染就是正确的状态
	switch (wallpaperMode) {
		case "banner":
			body.classList.add("enable-banner");
			body.classList.remove("wallpaper-transparent", "no-banner-mode");
			break;
		case "fullscreen":
			body.classList.remove("enable-banner");
			body.classList.add("wallpaper-transparent", "no-banner-mode");
			break;
		case "none":
			body.classList.remove("enable-banner", "wallpaper-transparent");
			body.classList.add("no-banner-mode");
			break;
	}

	// 立即调整主内容区域位置和布局模式（避免闪烁和位置错误）
	// 使用 requestAnimationFrame 确保 DOM 准备好
	requestAnimationFrame(() => {
		const mainContent = document.querySelector(
			".absolute.w-full.z-30.pointer-events-none",
		);
		if (mainContent) {
			if (wallpaperMode === "banner") {
				// 让主内容区域从banner顶部开始，这样波浪线会自然覆盖内容上部
				mainContent.style.top = `${BANNER_HEIGHT}vh`;
			} else {
				// fullscreen 或 none 模式
				mainContent.style.top = "5.5rem";
			}
		}

		// 非 banner 模式时隐藏图片来源文本
		const bannerCredit = document.getElementById("banner-credit");
		if (bannerCredit && wallpaperMode !== "banner") {
			bannerCredit.style.display = "none";
		}

		// 立即应用布局模式，避免闪烁
		const mainGrid = document.getElementById("main-grid");
		if (mainGrid) {
			const savedLayout = localStorage.getItem("postListLayout");
			const currentLayout = savedLayout || defaultPostListLayout;
			mainGrid.setAttribute("data-layout-mode", currentLayout);

			// 根据布局模式显示或隐藏右侧边栏（仅桌面端隐藏，平板和移动端不隐藏）
			const rightSidebar = document.querySelector(".right-sidebar-container");
			if (rightSidebar) {
				if (currentLayout === "grid") {
					rightSidebar.classList.add("hidden-in-grid-mode");
					if (window.innerWidth >= 1280) {
						rightSidebar.style.display = "none";
					}
				} else {
					rightSidebar.classList.remove("hidden-in-grid-mode");
					rightSidebar.style.display = "";
				}
			}

			// 同时更新文章列表容器的CSS类
			const postListContainer = document.getElementById("post-list-container");
			if (postListContainer) {
				postListContainer.classList.remove("list-mode", "grid-mode");

				if (currentLayout === "grid") {
					postListContainer.classList.add("grid-mode");
					postListContainer.classList.add(
						"grid",
						"grid-cols-1",
						"xl:grid-cols-2",
						"gap-6",
					);
					postListContainer.classList.remove("flex", "flex-col");
				} else {
					postListContainer.classList.add("list-mode");
					postListContainer.classList.add("flex", "flex-col");
					postListContainer.classList.remove(
						"grid",
						"grid-cols-1",
						"xl:grid-cols-2",
						"gap-6",
					);
				}
			}
		}
	});
})();

// 在 DOM 加载后执行
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", applyWallpaperMode);
} else {
	applyWallpaperMode();
}

function applyWallpaperMode() {
	var wallpaperMode =
		localStorage.getItem("wallpaperMode") || defaultWallpaperMode;
	var bannerWrapper = document.getElementById("banner-wrapper");
	var fullscreenWallpaper = document.querySelector(
		"[data-fullscreen-wallpaper]",
	);
	var navbar = document.getElementById("navbar");
	var body = document.body;
	var mainContent = document.querySelector(
		".absolute.w-full.z-30.pointer-events-none",
	);
	var bannerCredit = document.getElementById("banner-credit");
	var userNavbarMode;

	if (mainContent) {
		mainContent.classList.remove("no-banner-layout");
	}

	switch (wallpaperMode) {
		case "banner":
			if (bannerWrapper) {
				bannerWrapper.style.opacity = "1";
				bannerWrapper.style.pointerEvents = "";
			}
			if (fullscreenWallpaper) {
				fullscreenWallpaper.classList.add("wallpaper-hiding");
			}
			if (bannerCredit) {
				bannerCredit.style.display = "";
			}
			if (mainContent) {
				mainContent.style.removeProperty("top");
			}
			body.classList.remove("wallpaper-transparent");
			body.classList.remove("no-banner-mode");
			body.classList.add("enable-banner");
			if (navbar) {
				navbar.removeAttribute("data-dynamic-transparent");
				userNavbarMode =
					localStorage.getItem("navbarTransparentMode") ||
					navbarTransparentMode;
				navbar.setAttribute("data-transparent-mode", userNavbarMode);
				if (
					userNavbarMode === "semifull" &&
					window.initSemifullScrollDetection
				) {
					window.initSemifullScrollDetection();
				} else {
					navbar.classList.remove("scrolled");
				}
			}
			break;

		case "fullscreen":
			if (bannerWrapper) {
				bannerWrapper.style.opacity = "0";
				bannerWrapper.style.pointerEvents = "none";
			}
			if (fullscreenWallpaper) {
				fullscreenWallpaper.classList.remove("wallpaper-hiding");
			}
			if (bannerCredit) {
				bannerCredit.style.display = "none";
			}
			if (mainContent) {
				mainContent.style.removeProperty("top");
			}
			body.classList.remove("enable-banner");
			body.classList.add("wallpaper-transparent");
			body.classList.add("no-banner-mode");
			if (navbar) {
				navbar.setAttribute("data-dynamic-transparent", "semi");
				navbar.removeAttribute("data-transparent-mode");
			}
			break;

		case "none":
			if (bannerWrapper) {
				bannerWrapper.style.opacity = "0";
				bannerWrapper.style.pointerEvents = "none";
			}
			if (fullscreenWallpaper) {
				fullscreenWallpaper.classList.add("wallpaper-hiding");
			}
			if (bannerCredit) {
				bannerCredit.style.display = "none";
			}
			if (mainContent) {
				mainContent.style.removeProperty("top");
			}
			body.classList.remove("enable-banner");
			body.classList.remove("wallpaper-transparent");
			body.classList.add("no-banner-mode");
			if (navbar) {
				navbar.setAttribute("data-dynamic-transparent", "none");
				navbar.removeAttribute("data-transparent-mode");
			}
			break;
	}
}

// 监听壁纸模式变化，立即应用（不重载页面）
window.addEventListener("wallpaper-mode-change", (_event) => {
	applyWallpaperMode();
});

// 动态应用横幅位置
function applyBannerPosition(position) {
	var bannerWrapper = document.getElementById("banner-wrapper");
	if (!bannerWrapper) return;
	var images = bannerWrapper.querySelectorAll("img");
	images.forEach((img) => {
		img.style.objectPosition = position;
	});
	// 更新 bannerOffset CSS 变量
	var BANNER_HEIGHT_EXTEND = 30;
	var offsets = {
		top: `${BANNER_HEIGHT_EXTEND}vh`,
		center: `${BANNER_HEIGHT_EXTEND / 2}vh`,
		bottom: "0",
	};
	document.documentElement.style.setProperty(
		"--bannerOffset",
		offsets[position] || offsets.center,
	);
}

// 初始应用横幅位置
(() => {
	var storedBannerPosition = localStorage.getItem("bannerPosition");
	var bannerPosition = storedBannerPosition || defaultBannerPosition;
	applyBannerPosition(bannerPosition);
})();

// 监听横幅位置变化
window.addEventListener("banner-position-change", (event) => {
	if (event?.detail?.position) {
		applyBannerPosition(event.detail.position);
	}
});

// 监听导航栏透明模式变化，立即应用
window.addEventListener("navbar-transparent-mode-change", (event) => {
	var mode;
	var navbar;
	if (event?.detail?.mode) {
		mode = event.detail.mode;
		navbar = document.getElementById("navbar");
		if (navbar) {
			// 先将之前的所有动态设置清理
			navbar.removeAttribute("data-dynamic-transparent");
			navbar.setAttribute("data-transparent-mode", mode);
			// 如果是 semifull 模式，重新初始化滚动检测
			if (mode === "semifull" && window.initSemifullScrollDetection) {
				window.initSemifullScrollDetection();
			}
			// 如果是其他模式，清除 .scrolled 类
			if (mode !== "semifull") {
				navbar.classList.remove("scrolled");
			}
		}
	}
});

// 支持 Swup 页面过渡 - 在内容替换之前就应用布局，避免闪烁
function setupSwupLayoutSync() {
	if (typeof window !== "undefined" && window.swup) {
		// 关键：在 content:replace 之前（animation:out:start）就准备好布局状态
		window.swup.hooks.on("animation:out:start", () => {
			// 保存当前布局状态，以便在新页面中立即应用
			const savedLayout = localStorage.getItem("postListLayout");
			if (savedLayout) {
				window.__pendingLayoutMode = savedLayout;
			}
		});

		// 在内容替换后立即应用布局，不等待其他脚本
		window.swup.hooks.on("content:replace", () => {
			const mainGrid = document.getElementById("main-grid");
			if (mainGrid) {
				const currentLayout =
					window.__pendingLayoutMode ||
					localStorage.getItem("postListLayout") ||
					defaultPostListLayout;
				mainGrid.setAttribute("data-layout-mode", currentLayout);

				const rightSidebar = document.querySelector(".right-sidebar-container");
				if (rightSidebar) {
					if (currentLayout === "grid") {
						rightSidebar.classList.add("hidden-in-grid-mode");
						if (window.innerWidth >= 1280) {
							rightSidebar.style.display = "none";
						}
					} else {
						rightSidebar.classList.remove("hidden-in-grid-mode");
						rightSidebar.style.display = "";
					}
				}

				// 关键：同时更新文章列表容器的CSS类
				const postListContainer = document.getElementById(
					"post-list-container",
				);
				if (postListContainer) {
					// 移除现有布局类
					postListContainer.classList.remove("list-mode", "grid-mode");

					if (currentLayout === "grid") {
						postListContainer.classList.add("grid-mode");
						postListContainer.classList.add(
							"grid",
							"grid-cols-1",
							"xl:grid-cols-2",
							"gap-6",
						);
						postListContainer.classList.remove("flex", "flex-col");
					} else {
						postListContainer.classList.add("list-mode");
						postListContainer.classList.add("flex", "flex-col");
						postListContainer.classList.remove(
							"grid",
							"grid-cols-1",
							"xl:grid-cols-2",
							"gap-6",
						);
					}
				}

				// 清除临时状态
				delete window.__pendingLayoutMode;
			}
		});

		return true;
	}
	return false;
}

// 尝试立即设置，如果失败则延迟重试
if (!setupSwupLayoutSync()) {
	const checkSwup = setInterval(() => {
		if (setupSwupLayoutSync()) {
			clearInterval(checkSwup);
		}
	}, 50);

	setTimeout(() => {
		clearInterval(checkSwup);
	}, 2000);
}

// 在页面完全加载后，再次确认布局模式是否正确
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		const mainGrid = document.getElementById("main-grid");
		if (mainGrid) {
			const savedLayout = localStorage.getItem("postListLayout");
			const currentLayout = savedLayout || defaultPostListLayout;
			mainGrid.setAttribute("data-layout-mode", currentLayout);

			if (currentLayout === "grid") {
				const rightSidebar = document.querySelector(".right-sidebar-container");
				if (rightSidebar) {
					rightSidebar.classList.add("hidden-in-grid-mode");
					if (window.innerWidth >= 1280) {
						rightSidebar.style.display = "none";
					}
				}
			}
		}
	});
}

// Feed 页面复制链接按钮 — 使用事件委托，确保 Swup 页面切换后仍然有效
document.addEventListener("click", (e) => {
	const btn = e.target.closest("[data-copy-feed]");
	if (!btn) return;

	const url = btn.getAttribute("data-url");
	if (!url) return;

	const originalHTML = btn.dataset.originalHtml || btn.innerHTML;
	const originalText =
		btn.getAttribute("data-original-text") || btn.textContent?.trim() || "";
	const copiedText = btn.getAttribute("data-copied-text") || originalText;
	const failedText = btn.getAttribute("data-failed-text") || originalText;

	if (!btn.dataset.originalHtml) {
		btn.dataset.originalHtml = originalHTML;
	}

	navigator.clipboard
		.writeText(url)
		.then(() => {
			btn.innerHTML = `<span class="inline-flex items-center justify-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><polyline points="20 6 9 17 4 12"/></svg><span>${copiedText}</span></span>`;
			btn.style.cssText =
				"background-color: var(--success-color, #10b981) !important; border-color: transparent; box-shadow: none;";

			setTimeout(() => {
				btn.innerHTML = originalHTML;
				btn.style.cssText = "";
			}, 2000);
		})
		.catch((err) => {
			console.error("Copy failed:", err);
			btn.innerHTML = `<span class="inline-flex items-center justify-center gap-1.5"><Icon name="material-symbols:error" class="text-base" /><span>${failedText}</span></span>`;
			btn.style.cssText =
				"background-color: var(--error-color, #ef4444) !important; border-color: transparent; box-shadow: none;";

			setTimeout(() => {
				btn.innerHTML = originalHTML;
				btn.style.cssText = "";
			}, 2000);
		});
});
