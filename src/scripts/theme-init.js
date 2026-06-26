/**
 * 主题初始化脚本
 * 在页面渲染前同步执行，防止主题闪烁。
 * 负责主题模式切换、色调加载、Banner 偏移计算、页面缩放调整
 */
(() => {
	// Load the theme from local storage
	const theme = localStorage.getItem("theme") || "system";
	let isDark = false;
	switch (theme) {
		case "light":
			document.documentElement.classList.remove("dark");
			isDark = false;
			break;
		case "dark":
			document.documentElement.classList.add("dark");
			isDark = true;
			break;
		case "system":
			isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			if (isDark) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			break;
	}

	// Set the theme for Expressive Code based on current mode
	const expressiveTheme = isDark ? "github-dark" : "github-light";
	const currentTheme = document.documentElement.getAttribute("data-theme");
	// 只在主题不同时才更新，避免触发不必要的重绘
	if (currentTheme !== expressiveTheme) {
		document.documentElement.setAttribute("data-theme", expressiveTheme);
	}

	// Load the hue from local storage
	const configHue = document.documentElement.dataset.configHue;
	const hue = localStorage.getItem("hue") || configHue;
	document.documentElement.style.setProperty("--hue", hue);

	// calculate the --banner-height-extend, which needs to be a multiple of 4 to avoid blurry text
	const BANNER_HEIGHT_EXTEND = 30;
	let offset = Math.floor(window.innerHeight * (BANNER_HEIGHT_EXTEND / 100));
	offset = offset - (offset % 4);
	document.documentElement.style.setProperty(
		"--banner-height-extend",
		`${offset}px`,
	);

	// 自动缩放逻辑 (Moved from MainGridLayout to here for earlier execution)
	(() => {
		const pageScalingStr = document.documentElement.dataset.pageScaling;
		if (!pageScalingStr) return;
		const pageScaling = JSON.parse(pageScalingStr);
		if (pageScaling?.enable) {
			function adjustPageScale() {
				const isTouch =
					(window.matchMedia &&
						(window.matchMedia("(pointer:coarse)").matches ||
							window.matchMedia("(hover: none)").matches)) ||
					"ontouchstart" in window;
				const isPortrait = window.matchMedia?.(
					"(orientation: portrait)",
				).matches;
				const isTabletLike = isTouch || window.innerWidth <= 1280;
				if (isTabletLike || isPortrait) {
					document.documentElement.style.fontSize = "";
					return;
				}
				const targetWidth = pageScaling.targetWidth || 2000;
				const currentWidth = document.documentElement.clientWidth;
				let scale = currentWidth / targetWidth;
				if (scale > 1) scale = 1;
				if (scale < 0.85) scale = 0.85;
				document.documentElement.style.fontSize = `${scale * 100}%`;
			}

			// 立即执行一次
			adjustPageScale();

			// 监听窗口大小变化
			window.addEventListener("resize", adjustPageScale);

			// Swup 页面切换后也需要检查
			document.addEventListener("swup:page:view", adjustPageScale);
			window.addEventListener("orientationchange", adjustPageScale);
		}
	})();
})();
