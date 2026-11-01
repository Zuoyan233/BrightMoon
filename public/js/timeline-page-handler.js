// 时间线页面筛选脚本
// 以经典脚本内联引用，Swup 每次切换页面后由 ScriptsPlugin 重新执行，确保事件正常绑定

(() => {
	// 初始化筛选功能
	function initTimelineFilter() {
		const filterBtns = document.querySelectorAll(
			"#timeline-filter-tabs .filter-tag",
		);
		if (filterBtns.length === 0) {
			return false;
		}
		const timelineItems = document.querySelectorAll(".timeline-item");
		const emptyState = document.getElementById("timeline-empty");
		const timelineContent = document.getElementById("timeline-content");

		filterBtns.forEach((btn) => {
			// 防止重复绑定
			if (!btn.dataset.filterBound) {
				btn.dataset.filterBound = "1";

				btn.addEventListener("click", () => {
					const filter = btn.getAttribute("data-filter");

					// 更新按钮状态
					filterBtns.forEach((b) => {
						b.classList.remove("active");
					});
					btn.classList.add("active");

					// 筛选时间线项
					let visibleCount = 0;
					timelineItems.forEach((item) => {
						const itemType = item.getAttribute("data-type");
						if (filter === "all" || itemType === filter) {
							item.classList.remove("hidden-item");
							visibleCount++;
						} else {
							item.classList.add("hidden-item");
						}
					});

					// 显示/隐藏空状态
					emptyState?.classList.toggle("hidden", visibleCount !== 0);
					timelineContent?.classList.toggle("hidden", visibleCount === 0);
				});
			}
		});

		return true;
	}

	// 图标加载
	function loadIcons() {
		if (window.__iconifyLoader) {
			window.__iconifyLoader.load().catch(console.error);
		}
	}

	// 页面初始化
	function initTimelinePage() {
		if (initTimelineFilter()) {
			loadIcons();
			return;
		}
		// 页面 DOM 尚未就绪时重试
		if (initTimelinePage.retryCount === undefined) {
			initTimelinePage.retryCount = 0;
		}
		if (initTimelinePage.retryCount < 5) {
			initTimelinePage.retryCount++;
			setTimeout(initTimelinePage, 100);
		}
	}

	// DOM 就绪时执行（脚本位于页面底部，通常直接执行）
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initTimelinePage);
	} else {
		initTimelinePage();
	}
})();
