/**
 * 底部面包屑导航条脚本
 */

// 防止重复初始化标志
let breadcrumbInitialized = false;

// 当前配置语言（语言切换时更新）
let currentConfigLang = "";

/** 获取 i18n 翻译文本：按当前语言查找，回退到配置语言 */
function getI18nText(key) {
	const translations = window.__i18n?.translations || {};
	const configLang =
		currentConfigLang || (window.__i18n ? window.__i18n.resolveLang() : "en");
	return (
		translations[configLang]?.[key] ||
		translations[window.__i18n?.configLang]?.[key] ||
		""
	);
}

/** 更新展开/折叠按钮的 title 提示文本（根据当前展开状态） */
function updateBreadcrumbTitle() {
	const pill = document.getElementById("breadcrumb-pill");
	const bar = document.getElementById("bottom-breadcrumb-bar");
	if (!pill || !bar) return;

	const isExpanded = bar.classList.contains("expanded");
	const key = isExpanded ? "breadcrumbCollapse" : "breadcrumbExpand";
	const text = getI18nText(key);
	if (text) {
		pill.setAttribute("title", text);
	}
}

// 事件处理器引用（用于清理旧绑定，避免重复）
let outsideClickHandler = null;
let pillClickHandler = null;
let linkClickHandler = null;
let currentBar = null;

/**
 * 绑定底部面包屑交互事件：
 * - pill 点击：展开/折叠
 * - 外部点击：折叠
 * - 链接点击：导航后折叠
 */
function bindBottomBreadcrumbEvents() {
	const bar = document.getElementById("bottom-breadcrumb-bar");
	if (!bar) return;

	// 如果 bar 变了，清理旧 bar 上的事件
	if (currentBar && currentBar !== bar) {
		if (pillClickHandler)
			currentBar.removeEventListener("click", pillClickHandler);
		if (linkClickHandler)
			currentBar.removeEventListener("click", linkClickHandler);
	}
	currentBar = bar;

	// 清理当前 bar 上旧的事件（避免重复绑定）
	if (pillClickHandler) bar.removeEventListener("click", pillClickHandler);
	if (linkClickHandler) bar.removeEventListener("click", linkClickHandler);
	if (outsideClickHandler)
		document.removeEventListener("click", outsideClickHandler);

	pillClickHandler = (e) => {
		const pill = e.target.closest("#breadcrumb-pill");
		if (pill) {
			e.stopPropagation();
			bar.classList.toggle("expanded");
			updateBreadcrumbTitle();
		}
	};
	bar.addEventListener("click", pillClickHandler);

	outsideClickHandler = (e) => {
		if (!bar.contains(e.target)) {
			if (bar.classList.contains("expanded")) {
				bar.classList.remove("expanded");
				updateBreadcrumbTitle();
			}
		}
	};
	document.addEventListener("click", outsideClickHandler);

	linkClickHandler = (e) => {
		const target = e.target;
		if (target.closest("a")) {
			setTimeout(() => {
				bar.classList.remove("expanded");
				updateBreadcrumbTitle();
			}, 150);
		}
	};
	bar.addEventListener("click", linkClickHandler);
}

/** 初始化底部面包屑：监听语言切换事件，更新文案 */
function initBottomBreadcrumb() {
	if (breadcrumbInitialized) return;
	breadcrumbInitialized = true;

	document.addEventListener("translate:applied", () => {
		currentConfigLang = window.__i18n ? window.__i18n.resolveLang() : "en";
		updateBreadcrumbTitle();
	});

	currentConfigLang = window.__i18n ? window.__i18n.resolveLang() : "en";
	updateBreadcrumbTitle();
}

// sessionStorage 键名：导航栈和待跳转索引
const SITE_NAV_STACK = "siteNavStack";
const SITE_NAV_PENDING = "siteNavPendingIdx";

/** 使用 Swup 或原生导航跳转到指定 URL，并记录目标索引 */
function navigateTo(url, targetIndex) {
	sessionStorage.setItem(SITE_NAV_PENDING, String(targetIndex));
	if (window.swup) {
		try {
			window.swup.navigate(url);
			return;
		} catch (_e) {}
	}
	window.location.href = url;
}

/**
 * 为克隆的面包屑中的前进/后退按钮绑定事件
 * 维护 sessionStorage 中的导航栈，处理前进/后退/新页面等场景
 */
function bindNavButtons(container) {
	const backBtn = container.querySelector("#nav-back");
	const forwardBtn = container.querySelector("#nav-forward");
	if (!backBtn || !forwardBtn) return;

	const currentPath = window.location.pathname + window.location.search;

	let navStack = null;
	try {
		navStack = JSON.parse(sessionStorage.getItem(SITE_NAV_STACK) || "null");
	} catch (_e) {
		navStack = null;
	}

	let pendingIdx = null;
	try {
		pendingIdx = Number.parseInt(
			sessionStorage.getItem(SITE_NAV_PENDING) || "",
			10,
		);
		if (Number.isNaN(pendingIdx)) pendingIdx = null;
		sessionStorage.removeItem(SITE_NAV_PENDING);
	} catch (_e) {}

	if (
		pendingIdx !== null &&
		navStack &&
		navStack.paths[pendingIdx] === currentPath
	) {
		navStack.index = pendingIdx;
	} else if (!navStack || !Array.isArray(navStack.paths)) {
		navStack = { paths: [currentPath], index: 0 };
	} else if (
		navStack.index > 0 &&
		navStack.paths[navStack.index - 1] === currentPath
	) {
		navStack.index--;
	} else if (
		navStack.index < navStack.paths.length - 1 &&
		navStack.paths[navStack.index + 1] === currentPath
	) {
		navStack.index++;
	} else if (navStack.paths[navStack.index] === currentPath) {
		// same page
	} else {
		navStack.paths = navStack.paths.slice(0, navStack.index + 1);
		navStack.paths.push(currentPath);
		navStack.index = navStack.paths.length - 1;
	}

	sessionStorage.setItem(SITE_NAV_STACK, JSON.stringify(navStack));

	backBtn.disabled = navStack.index <= 0;
	forwardBtn.disabled = navStack.index >= navStack.paths.length - 1;

	backBtn.onclick = () => {
		let stack = null;
		try {
			stack = JSON.parse(sessionStorage.getItem(SITE_NAV_STACK) || "null");
		} catch (_e) {
			stack = null;
		}
		if (stack && stack.index > 0) {
			navigateTo(stack.paths[stack.index - 1], stack.index - 1);
		}
	};

	forwardBtn.onclick = () => {
		let stack = null;
		try {
			stack = JSON.parse(sessionStorage.getItem(SITE_NAV_STACK) || "null");
		} catch (_e) {
			stack = null;
		}
		if (stack && stack.index < stack.paths.length - 1) {
			navigateTo(stack.paths[stack.index + 1], stack.index + 1);
		}
	};
}

/**
 * 同步底部面包屑内容：从隐藏的 breadcrumb-source 克隆 HTML，
 * 绑定导航按钮，并在首页注入随机推荐项
 */
function syncBottomBreadcrumb() {
	const source = document.getElementById("breadcrumb-source");
	const bar = document.getElementById("bottom-breadcrumb-bar");
	const contentDiv = document.getElementById("breadcrumb-full-content");
	if (!contentDiv) return;

	if (!source || !bar) {
		// 当前页面没有面包屑，隐藏底部导航条
		if (bar) bar.style.display = "none";
		return;
	}

	// 显示底部导航条
	bar.style.display = "flex";

	// 复制隐藏的 Breadcrumb 组件的 HTML
	const breadcrumbEl = source.querySelector(".breadcrumb-container");
	if (breadcrumbEl) {
		// 克隆节点以避免修改原始元素
		const cloned = breadcrumbEl.cloneNode(true);
		contentDiv.innerHTML = "";
		contentDiv.appendChild(cloned);
	} else {
		// 回退：直接复制内部 HTML
		contentDiv.innerHTML = source.innerHTML;
	}

	// 为克隆的前进/后退按钮绑定事件
	bindNavButtons(contentDiv);

	// 检查是否是首页，如果是则注入推荐项
	const dataEl = document.getElementById("homepage-suggestion-data");
	if (dataEl) {
		// 先移除克隆面包屑里已有的推荐项，避免重复
		const existingContainer = contentDiv.querySelector(".breadcrumb-container");
		if (existingContainer) {
			const existingLinks = existingContainer.querySelectorAll("a");
			existingLinks.forEach((link) => {
				if (link.querySelector(".suggestion-prefix")) {
					// 移除该推荐链接及其前面的分隔符
					const prev = link.previousElementSibling;
					if (prev && prev.tagName === "DIV") prev.remove();
					link.remove();
				}
			});
		}
		injectHomepageSuggestion(dataEl);
	}
}

/**
 * 注入首页推荐项到底部面包屑
 * 从 homepage-suggestion-data 中随机选取一个候选项，生成分隔符 + 推荐链接
 */
function injectHomepageSuggestion(dataEl) {
	const container = document.getElementById("breadcrumb-full-content");
	if (!container) return;

	let candidates = [];
	try {
		candidates = JSON.parse(dataEl.textContent || "[]");
	} catch {
		return;
	}

	if (candidates.length === 0) return;

	const randomCandidate =
		candidates[Math.floor(Math.random() * candidates.length)];
	if (!randomCandidate) return;

	const suggestionText = getI18nText("suggestion");

	// 创建推荐项链接
	const suggestionLink = document.createElement("a");
	suggestionLink.href = randomCandidate.href;
	suggestionLink.title = randomCandidate.label;
	suggestionLink.className =
		"group flex items-center gap-1 rounded-lg transition-all duration-300 ease-out whitespace-nowrap shrink-0 px-2 py-2 cursor-pointer border-none bg-transparent text-sm text-75 no-underline hover:bg-[var(--btn-plain-bg-hover)] hover:text-[var(--primary)] dark:hover:text-[var(--primary)]";

	// 使用候选数据中指定的图标（如果有）
	if (randomCandidate.icon) {
		const iconSpan = document.createElement("span");
		iconSpan.className =
			"flex items-center justify-center w-8 h-8 mr-2 rounded-lg bg-[var(--btn-plain-bg-hover)] group-hover:bg-[var(--primary)] transition-colors duration-300";
		iconSpan.innerHTML =
			'<iconify-icon icon="' +
			randomCandidate.icon +
			'" class="text-xl leading-none shrink-0 text-[var(--btn-content)] transition-colors duration-300 group-hover:text-white" style="width:1.25rem;height:1.25rem"></iconify-icon>';
		suggestionLink.appendChild(iconSpan);
	}

	const textSpan = document.createElement("span");
	textSpan.className = "leading-none inline-flex items-center gap-1";
	// 使用候选数据中的 suggestionLabel（如果有），否则使用默认文本
	const itemSuggestionLabel = randomCandidate.suggestionLabel || suggestionText;
	textSpan.innerHTML =
		'<span class="suggestion-prefix shrink-0">' +
		itemSuggestionLabel +
		'</span><span class="shrink-0">: </span><span>' +
		randomCandidate.label +
		"</span>";

	suggestionLink.appendChild(textSpan);

	// 创建分隔符
	const separator = document.createElement("div");
	separator.className =
		"flex items-center text-[var(--primary)] opacity-50 shrink-0";
	separator.innerHTML =
		'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="text-xl leading-none"><path fill="currentColor" d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6z"/></svg>';

	// 获取面包屑容器并追加推荐项
	const breadcrumbContainer = container.querySelector(".breadcrumb-container");
	if (breadcrumbContainer) {
		breadcrumbContainer.appendChild(separator);
		breadcrumbContainer.appendChild(suggestionLink);
	}
}

/** 页面切换回调：同步面包屑内容、绑定事件、初始化、更新文案 */
function onPageChange() {
	syncBottomBreadcrumb();
	bindBottomBreadcrumbEvents();
	initBottomBreadcrumb();
	updateBreadcrumbTitle();
}

// 初始化
onPageChange();

// 监听 Swup 页面切换事件
document.addEventListener("swup:contentReplaced", onPageChange);
document.addEventListener("astro:page-load", onPageChange);
