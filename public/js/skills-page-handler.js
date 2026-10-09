// 技能页面筛选脚本
// 以经典脚本内联引用，Swup 每次切换页面后由 ScriptsPlugin 重新执行，确保事件正常绑定

(() => {
	// 初始化筛选功能
	function initSkillsFilter() {
		const filterBtns = document.querySelectorAll(
			"#skills-filter-tabs .filter-tag",
		);
		if (filterBtns.length === 0) {
			return false;
		}
		const skillCategories = document.querySelectorAll(".skill-category");
		const emptyState = document.getElementById("skills-empty");
		const skillsContent = document.getElementById("skills-content");

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

					// 筛选技能分类
					let visibleCount = 0;
					skillCategories.forEach((category) => {
						const categoryType = category.getAttribute("data-category");
						if (filter === "all" || categoryType === filter) {
							category.classList.remove("hidden-category");
							visibleCount++;
						} else {
							category.classList.add("hidden-category");
						}
					});

					// 处理专业技能区域（在 skills-content 外部）
					const advancedSection = document.querySelector(
						'[data-category="advanced"]',
					);
					if (advancedSection) {
						if (filter === "all" || filter === "advanced") {
							advancedSection.classList.remove("hidden-category");
							if (filter === "advanced") {
								visibleCount++;
							}
						} else {
							advancedSection.classList.add("hidden-category");
						}
					}

					// 显示/隐藏空状态
					if (emptyState) {
						if (visibleCount === 0) {
							emptyState.classList.remove("hidden");
						} else {
							emptyState.classList.add("hidden");
						}
					}
					if (skillsContent) {
						const isAdvancedOnly = filter === "advanced";
						const hasOtherCategories = Array.from(skillCategories).some(
							(cat) =>
								!cat.classList.contains("hidden-category") &&
								cat.getAttribute("data-category") !== "advanced",
						);
						if (visibleCount === 0 || (isAdvancedOnly && !hasOtherCategories)) {
							skillsContent.classList.add("hidden");
						} else {
							skillsContent.classList.remove("hidden");
						}
					}
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
	function initSkillsPage() {
		if (initSkillsFilter()) {
			loadIcons();
			return;
		}
		// 页面 DOM 尚未就绪时重试
		if (initSkillsPage.retryCount === undefined) {
			initSkillsPage.retryCount = 0;
		}
		if (initSkillsPage.retryCount < 5) {
			initSkillsPage.retryCount++;
			setTimeout(initSkillsPage, 100);
		}
	}

	// DOM 就绪时执行（脚本位于页面底部，通常直接执行）
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initSkillsPage);
	} else {
		initSkillsPage();
	}
})();
