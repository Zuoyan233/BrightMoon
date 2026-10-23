/**
 * 版本更新检测模块
 */

// 代码块占位符：用于 simpleMarkdown 中临时替换代码块，避免行内格式干扰
const SENTINEL = "\uE000";

// 缓存上次检查结果，供页面切换后恢复 UI 状态
let lastCheckResult = null;

class VersionChecker {
	/**
	 * @param {object} options - 配置项
	 * @param {string} options.currentVersion - 当前版本号
	 * @param {string} options.versionCheckApiUrl - GitHub Releases API 地址
	 * @param {string} options.versionPrefixPattern - 版本号前缀正则（如 "^[vV]" 匹配 v1.0.0）
	 * @param {boolean} options.autoCheck - 是否自动检查更新
	 * @param {object} options.versionTranslations - 多语言翻译映射表
	 * @param {string} options.configLang - 默认语言
	 */
	constructor(options) {
		this.config = {
			currentVersion: options.currentVersion || "",
			versionCheckApiUrl: options.versionCheckApiUrl || "",
			versionPrefixPattern: options.versionPrefixPattern || "^[vV]",
			autoCheck: options.autoCheck !== undefined ? options.autoCheck : false,
			versionTranslations: options.versionTranslations || {},
			configLang: options.configLang || "en",
		};
		// 三个对话框的 DOM 引用（失败、已是最新、发现新版本）
		this.bodyFailedDialog = null;
		this.bodySuccessDialog = null;
		this.bodyNewDialog = null;
		this.init();
	}

	/**
	 * 解析 semver 版本号为结构化对象
	 * 支持预发布标识，如 "1.2.3-beta.1" → { parts: [1,2,3], pre: ["beta",1] }
	 * @param {string} v - 版本号字符串
	 * @returns {{ parts: number[], pre: (number|string)[]|null }|null}
	 */
	parseVersion(v) {
		const cleaned = v.replace(
			new RegExp(this.config.versionPrefixPattern, "i"),
			"",
		);
		const dashIdx = cleaned.indexOf("-");
		let preParts = null;
		let numericPart = cleaned;
		if (dashIdx > 0) {
			const preStr = cleaned.substring(dashIdx + 1);
			numericPart = cleaned.substring(0, dashIdx);
			preParts = preStr.split(".").map((p) => {
				const n = Number(p);
				return Number.isNaN(n) ? p : n;
			});
		}
		const parts = numericPart.split(".").map(Number);
		if (parts.length < 3) return null;
		for (let i = 0; i < parts.length; i++) {
			if (Number.isNaN(parts[i])) return null;
		}
		return { parts: parts, pre: preParts };
	}

	/**
	 * 比较两个解析后的版本号
	 * @returns {number} 1 表示 a>b，-1 表示 a<b，0 表示相等
	 * 预发布版本优先级低于同数字版本（1.0.0 > 1.0.0-beta）
	 */
	compareVersion(a, b) {
		if (!a || !b) return 0;
		for (let i = 0; i < Math.max(a.parts.length, b.parts.length); i++) {
			const av = a.parts[i] || 0;
			const bv = b.parts[i] || 0;
			if (av > bv) return 1;
			if (av < bv) return -1;
		}
		if (!a.pre && !b.pre) return 0;
		if (!a.pre) return 1;
		if (!b.pre) return -1;
		for (let i = 0; i < Math.max(a.pre.length, b.pre.length); i++) {
			const ap = a.pre[i];
			const bp = b.pre[i];
			if (ap === undefined && bp === undefined) continue;
			if (ap === undefined) return -1;
			if (bp === undefined) return 1;
			const aIsNum = typeof ap === "number";
			const bIsNum = typeof bp === "number";
			if (aIsNum && bIsNum) {
				if (ap > bp) return 1;
				if (ap < bp) return -1;
			} else if (aIsNum) {
				return -1;
			} else if (bIsNum) {
				return 1;
			} else {
				if (ap > bp) return 1;
				if (ap < bp) return -1;
			}
		}
		return 0;
	}

	/**
	 * 简易 Markdown → HTML 渲染器
	 * 支持：代码块、标题、无序/有序列表（含嵌套）、段落、行内格式（加粗/斜体/删除线/行内代码/链接）
	 * @param {string} md - Markdown 文本
	 * @returns {string} HTML 字符串
	 */
	simpleMarkdown(md) {
		if (!md) return "";
		let html = "";
		const codeBlocks = [];
		const processedMd = md.replace(/```[\s\S]*?```/g, (m) => {
			const idx = codeBlocks.length;
			let content = m.slice(3, -3);
			const firstNewline = content.indexOf("\n");
			let lang = "";
			if (firstNewline > 0 && !/\s/.test(content.substring(0, firstNewline))) {
				lang = content.substring(0, firstNewline).trim();
				content = content.substring(firstNewline + 1);
			} else if (firstNewline === 0) {
				content = content.substring(1);
			}
			const escaped = content
				.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;");
			codeBlocks.push(
				'<pre class="overflow-x-auto text-[0.85rem] leading-snug bg-black/5 dark:bg-white/5 rounded-md p-2 my-1 text-[var(--btn-plain)]"><code' +
					(lang ? ` class="language-${lang}"` : "") +
					">" +
					escaped +
					"</code></pre>",
			);
			return `${SENTINEL}CB${idx}${SENTINEL}`;
		});
		const lines = processedMd.split("\n");
		let i = 0;
		const cbPattern = new RegExp(`^${SENTINEL}CB(\\d+)${SENTINEL}$`);
		const cbTestPattern = new RegExp(`^${SENTINEL}CB`);
		while (i < lines.length) {
			const line = lines[i];
			const cbMatch = line.match(cbPattern);
			if (cbMatch) {
				html += codeBlocks[Number.parseInt(cbMatch[1], 10)];
				i++;
				continue;
			}
			const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
			if (headingMatch) {
				const lvl = headingMatch[1].length;
				html +=
					"<h" +
					lvl +
					' class="text-[1rem] font-bold mt-3 mb-1 text-[#111827] dark:text-[#FFFFFF]">' +
					this.inlineFormat(headingMatch[2]) +
					"</h" +
					lvl +
					">";
				i++;
				continue;
			}
			const listMatch = line.match(/^(\s*)[-*]\s/);
			if (listMatch) {
				const baseIndent = listMatch[1].length;
				const items = [];
				while (i < lines.length) {
					const m = lines[i].match(/^(\s*)[-*]\s/);
					if (!m) break;
					const indent = m[1].length;
					if (indent < baseIndent) break;
					items.push({ text: lines[i].replace(/^\s*[-*]\s+/, ""), indent });
					i++;
				}
				html += this.buildNestedList(items, "ul");
				continue;
			}
			if (/^\d+\.\s/.test(line)) {
				const items = [];
				while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
					items.push(lines[i].replace(/^\d+\.\s+/, ""));
					i++;
				}
				html +=
					'<ol class="list-decimal pl-5 my-1 text-[#374151] dark:text-[#D1D5DB] marker:text-[var(--primary)] dark:marker:text-[var(--primary)]">' +
					items.map((it) => `<li>${this.inlineFormat(it)}</li>`).join("") +
					"</ol>";
				continue;
			}
			if (line.trim() === "") {
				i++;
				continue;
			}
			const paraLines = [];
			while (
				i < lines.length &&
				lines[i].trim() !== "" &&
				!/^#{1,6}\s/.test(lines[i]) &&
				!/^[-*]\s/.test(lines[i]) &&
				!/^\d+\.\s/.test(lines[i]) &&
				!cbTestPattern.test(lines[i])
			) {
				paraLines.push(lines[i]);
				i++;
			}
			if (paraLines.length > 0)
				html +=
					'<p class="my-1">' +
					paraLines.map((line) => this.inlineFormat(line)).join("<br>") +
					"</p>";
		}
		return html;
	}

	/** 行内格式化：转义 HTML + 渲染行内代码、加粗、斜体、删除线、链接 */
	inlineFormat(text) {
		return text
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(
				/`([^`]+)`/g,
				'<code class="text-[0.85em] bg-[var(--inline-code-bg)] text-[var(--inline-code-color)] px-1 py-0.5 rounded-md font-mono">$1</code>',
			)
			.replace(
				/\*\*(.+?)\*\*/g,
				'<strong class="text-[#111827] dark:text-[#FFFFFF]">$1</strong>',
			)
			.replace(
				/__(.+?)__/g,
				'<strong class="text-[#111827] dark:text-[#FFFFFF]">$1</strong>',
			)
			.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, "<em>$1</em>")
			.replace(/(?<!_)_([^_]+?)_(?!_)/g, "<em>$1</em>")
			.replace(/~~(.+?)~~/g, '<del class="opacity-50">$1</del>')
			.replace(
				/\[([^\]]+)\]\(([^)]+)\)/g,
				'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[var(--primary)] font-medium underline decoration-[var(--link-underline)] decoration-1 decoration-dashed underline-offset-4 hover:bg-[var(--btn-plain-bg-hover)] hover:decoration-transparent">$1</a>',
			);
	}

	/** 递归构建嵌套列表 HTML（根据缩进层级） */
	buildNestedList(items, tag) {
		let html = `<${tag} class="list-disc pl-5 my-1 text-[#374151] dark:text-[#D1D5DB] marker:text-[var(--primary)] dark:marker:text-[var(--primary)]">`;
		let idx = 0;
		while (idx < items.length) {
			const item = items[idx];
			const nextItems = [];
			let j = idx + 1;
			while (j < items.length && items[j].indent > item.indent) {
				nextItems.push(items[j]);
				j++;
			}
			if (nextItems.length > 0) {
				html += `<li>${this.inlineFormat(item.text)}${this.buildNestedList(nextItems, tag)}</li>`;
				idx = j;
			} else {
				html += `<li>${this.inlineFormat(item.text)}</li>`;
				idx++;
			}
		}
		html += `</${tag}>`;
		return html;
	}

	/** 从 Release 对象中提取下载链接：优先 .zip，否则取首个 asset，最后回退 zipball_url */
	getDownloadUrl(r) {
		if (r.assets && r.assets.length > 0) {
			let zipAsset = null;
			for (let i = 0; i < r.assets.length; i++) {
				if (r.assets[i].name.endsWith(".zip")) {
					zipAsset = r.assets[i];
					break;
				}
			}
			return zipAsset
				? zipAsset.browser_download_url
				: r.assets[0].browser_download_url;
		}
		return r.zipball_url;
	}

	/**
	 * 处理 GitHub Releases 数据，判断是否有可用更新
	 * 优先选择稳定版更新；若预发布版版本号更高则选预发布版
	 * @param {object[]} releases - GitHub Releases 数组
	 * @returns {{ status: string, updateTag?: string, isBeta?: boolean, updateBody?: string, updateHtmlUrl?: string, updateDownloadUrl?: string }}
	 */
	processReleaseData(releases) {
		let stable = null;
		let pre = null;
		for (let i = 0; i < releases.length; i++) {
			if (!releases[i].draft && !releases[i].prerelease && !stable)
				stable = releases[i];
			if (!releases[i].draft && releases[i].prerelease && !pre)
				pre = releases[i];
		}
		const curVer = this.parseVersion(this.config.currentVersion);
		let stableUpdate = null;
		let preUpdate = null;

		if (stable) {
			const stableVer = this.parseVersion(stable.tag_name);
			if (stableVer && this.compareVersion(stableVer, curVer) > 0) {
				stableUpdate = { release: stable, ver: stableVer };
			}
		}

		if (pre) {
			const preVer = this.parseVersion(pre.tag_name);
			if (preVer && this.compareVersion(preVer, curVer) > 0) {
				preUpdate = { release: pre, ver: preVer };
			}
		}

		let best = null;
		if (stableUpdate && preUpdate) {
			best =
				this.compareVersion(preUpdate.ver, stableUpdate.ver) > 0
					? { rel: preUpdate.release, isBeta: true }
					: { rel: stableUpdate.release, isBeta: false };
		} else if (stableUpdate) {
			best = { rel: stableUpdate.release, isBeta: false };
		} else if (preUpdate) {
			best = { rel: preUpdate.release, isBeta: true };
		}

		if (best) {
			return {
				status: "newversion",
				updateTag: best.rel.tag_name,
				isBeta: best.isBeta,
				updateBody: best.rel.body || "",
				updateHtmlUrl: best.rel.html_url || "",
				updateDownloadUrl: this.getDownloadUrl(best.rel),
			};
		}

		return { status: "uptodate" };
	}

	/** 获取当前语言：优先使用 i18n 系统解析，否则回退到配置语言 */
	getLang() {
		return window.__i18n ? window.__i18n.resolveLang() : this.config.configLang;
	}

	/** 获取翻译文本：按当前语言查找，回退到配置语言 */
	getTr(key) {
		const lang = this.getLang();
		return (
			this.config.versionTranslations[lang]?.[key] ||
			this.config.versionTranslations[this.config.configLang]?.[key] ||
			""
		);
	}

	/** 显示对话框：调用 showModal 并添加动画类 */
	showDialog(dialog) {
		if (!dialog) return;
		dialog.showModal();
		requestAnimationFrame(() => {
			dialog.classList.add("dialog-show");
		});
	}

	/** 隐藏对话框：移除动画类，250ms 后关闭 */
	hideDialog(dialog) {
		if (!dialog) return;
		dialog.classList.remove("dialog-show");
		setTimeout(() => {
			dialog.close();
		}, 250);
	}

	/**
	 * 初始化对话框 DOM：将页面中的对话框移到 body 下（避免 Swup 替换内容时丢失），
	 * 多个同类对话框只保留第一个
	 */
	setupDialogs() {
		const allFailedDialogs = document.querySelectorAll(
			".version-check-failed-dialog",
		);
		for (let d = 0; d < allFailedDialogs.length; d++) {
			if (d === 0) {
				this.bodyFailedDialog = allFailedDialogs[d];
				this.bodyFailedDialog.remove();
				document.body.appendChild(this.bodyFailedDialog);
			} else {
				allFailedDialogs[d].remove();
			}
		}

		const allSuccessDialogs = document.querySelectorAll(
			".version-check-success-dialog",
		);
		for (let d = 0; d < allSuccessDialogs.length; d++) {
			if (d === 0) {
				this.bodySuccessDialog = allSuccessDialogs[d];
				this.bodySuccessDialog.remove();
				document.body.appendChild(this.bodySuccessDialog);
			} else {
				allSuccessDialogs[d].remove();
			}
		}

		const allNewDialogs = document.querySelectorAll(
			".version-check-new-dialog",
		);
		for (let d = 0; d < allNewDialogs.length; d++) {
			if (d === 0) {
				this.bodyNewDialog = allNewDialogs[d];
				this.bodyNewDialog.remove();
				document.body.appendChild(this.bodyNewDialog);
			} else {
				allNewDialogs[d].remove();
			}
		}
	}

	/** 为三个对话框绑定关闭事件：关闭按钮、点击 backdrop、关闭后重置状态 */
	setupDialogEventListeners() {
		if (this.bodyFailedDialog) {
			const failedClose = this.bodyFailedDialog.querySelector(
				".version-check-failed-close",
			);
			const closeFailed = () => {
				this.hideDialog(this.bodyFailedDialog);
				lastCheckResult = null;
				this.resetAllWidgets();
			};
			if (failedClose) {
				failedClose.onclick = closeFailed;
			}
			this.bodyFailedDialog.onclick = (event) => {
				if (event.target === this.bodyFailedDialog) closeFailed();
			};
		}

		if (this.bodySuccessDialog) {
			const successClose = this.bodySuccessDialog.querySelector(
				".version-check-success-close",
			);
			const closeSuccess = () => {
				this.hideDialog(this.bodySuccessDialog);
				lastCheckResult = null;
				this.resetAllWidgets();
			};
			if (successClose) {
				successClose.onclick = closeSuccess;
			}
			this.bodySuccessDialog.onclick = (event) => {
				if (event.target === this.bodySuccessDialog) closeSuccess();
			};
		}

		if (this.bodyNewDialog) {
			const newClose = this.bodyNewDialog.querySelector(
				".version-check-new-close",
			);
			if (newClose) {
				newClose.onclick = () => {
					this.hideDialog(this.bodyNewDialog);
					lastCheckResult = null;
					this.resetAllWidgets();
				};
			}
			this.bodyNewDialog.onclick = (event) => {
				if (event.target === this.bodyNewDialog) {
					this.hideDialog(this.bodyNewDialog);
					lastCheckResult = null;
					this.resetAllWidgets();
				}
			};
		}
	}

	/** 重置所有版本检查小部件到初始状态（默认图标 + "检查更新"文案） */
	resetAllWidgets() {
		const widgets = document.querySelectorAll(".version-check-widget");
		for (let w = 0; w < widgets.length; w++) {
			const widget = widgets[w];
			const textEl = widget.querySelector(".version-check-text");
			const btn = widget.querySelector(".version-check-btn");
			const iconDefault = widget.querySelector(".icon-default");
			const iconUpToDate = widget.querySelector(".icon-uptodate");
			const iconNew = widget.querySelector(".icon-new");
			const iconError = widget.querySelector(".icon-error");
			const dot = widget.querySelector(".version-dot");

			[iconDefault, iconUpToDate, iconNew, iconError].forEach((el) => {
				if (el) el.classList.add("hidden");
			});
			if (iconDefault) iconDefault.classList.remove("hidden");

			if (textEl) {
				textEl.setAttribute("data-i18n-key", "versionCheck");
				textEl.textContent = this.getTr("versionCheck");
			}
			if (btn) {
				btn.title = this.getTr("versionCheck");
				if (widget._versionCheckFn) {
					btn.onclick = widget._versionCheckFn;
				}
			}
			if (dot) dot.classList.add("hidden");
		}
	}

	/**
	 * 初始化所有版本检查小部件：绑定点击事件、恢复上次检查结果、自动检查
	 * 每个小部件包含按钮、文案、状态图标和更新提示点
	 */
	setupWidgets() {
		const self = this;
		const widgets = document.querySelectorAll(".version-check-widget");
		for (let w = 0; w < widgets.length; w++) {
			((widget) => {
				const btn = widget.querySelector(".version-check-btn");
				const textEl = widget.querySelector(".version-check-text");
				const iconDefault = widget.querySelector(".icon-default");
				const iconUpToDate = widget.querySelector(".icon-uptodate");
				const iconNew = widget.querySelector(".icon-new");
				const iconError = widget.querySelector(".icon-error");
				const dot = widget.querySelector(".version-dot");

				function showIcon(iconEl) {
					[iconDefault, iconUpToDate, iconNew, iconError].forEach((el) => {
						if (el) el.classList.add("hidden");
					});
					if (iconEl) iconEl.classList.remove("hidden");
				}

				function restoreLastCheckResult() {
					if (!lastCheckResult) return;
					if (lastCheckResult.status === "newversion") {
						textEl.setAttribute("data-i18n-key", "versionNewVersion");
						textEl.textContent = self.getTr("versionNewVersion");
						btn.title = self.getTr("versionNewVersion");
						showIcon(iconNew);
						if (dot) dot.classList.remove("hidden");
						btn.onclick = () => {
							if (!self.bodyNewDialog) return;
							const titleEl = self.bodyNewDialog.querySelector(
								".version-new-dialog-title",
							);
							const bodyEl = self.bodyNewDialog.querySelector(
								".version-new-dialog-body",
							);
							const downloadLink = self.bodyNewDialog.querySelector(
								".version-check-new-download",
							);
							const githubLink = self.bodyNewDialog.querySelector(
								".version-check-new-github",
							);
							const newTagEl =
								self.bodyNewDialog.querySelector(".version-new-tag");
							const preBadgeEl =
								self.bodyNewDialog.querySelector(".version-pre-badge");
							if (titleEl)
								titleEl.textContent = self.getTr("versionNewVersion");
							if (newTagEl)
								newTagEl.textContent = `BrightMoon ${lastCheckResult.updateTag}`;
							if (preBadgeEl) {
								if (lastCheckResult.isBeta) {
									preBadgeEl.classList.remove("hidden");
								} else {
									preBadgeEl.classList.add("hidden");
								}
							}
							if (bodyEl)
								bodyEl.innerHTML =
									self.simpleMarkdown(lastCheckResult.updateBody) ||
									`<p>${self.getTr("versionNewVersion")}</p>`;
							if (downloadLink)
								downloadLink.onclick = () => {
									window.open(
										lastCheckResult.updateDownloadUrl ||
											lastCheckResult.updateHtmlUrl,
										"_blank",
										"noopener,noreferrer",
									);
								};
							if (githubLink) githubLink.href = lastCheckResult.updateHtmlUrl;
							self.showDialog(self.bodyNewDialog);
							if (window.translationManager?.isActive()) {
								setTimeout(() => {
									const t = window.translate;
									if (t?.execute) {
										t.execute([self.bodyNewDialog]);
									}
								}, 300);
							}
						};
					} else if (lastCheckResult.status === "uptodate") {
						textEl.setAttribute("data-i18n-key", "versionLatest");
						textEl.textContent = self.getTr("versionLatest");
						btn.title = self.getTr("versionLatest");
						showIcon(iconUpToDate);
						btn.onclick = () => {
							self.showDialog(self.bodySuccessDialog);
						};
					} else if (lastCheckResult.status === "error") {
						textEl.setAttribute("data-i18n-key", "versionCheckError");
						textEl.textContent = self.getTr("versionCheckError");
						btn.title = self.getTr("versionCheckFailedTitle");
						showIcon(iconError);
						btn.onclick = () => {
							self.showDialog(self.bodyFailedDialog);
						};
					}
				}

				let checking = false;

				function checkForUpdates() {
					if (checking) return;
					checking = true;

					if (!self.config.versionCheckApiUrl) {
						textEl.setAttribute("data-i18n-key", "versionCheckError");
						textEl.textContent = self.getTr("versionCheckError");
						btn.title = self.getTr("versionCheckFailedTitle");
						showIcon(iconError);
						btn.onclick = () => {
							self.showDialog(self.bodyFailedDialog);
						};
						checking = false;
						return;
					}

					textEl.setAttribute("data-i18n-key", "versionChecking");
					textEl.textContent = self.getTr("versionChecking");
					showIcon(iconDefault);

					fetch(self.config.versionCheckApiUrl, {
						headers: { Accept: "application/vnd.github.v3+json" },
					})
						.then((resp) => {
							if (!resp.ok) throw new Error("API request failed");
							return resp.json();
						})
						.then((releases) => {
							if (!Array.isArray(releases) || releases.length === 0)
								throw new Error("No releases");
							const result = self.processReleaseData(releases);
							lastCheckResult = result;

							if (result.status === "newversion") {
								textEl.setAttribute("data-i18n-key", "versionNewVersion");
								textEl.textContent = self.getTr("versionNewVersion");
								btn.title = self.getTr("versionNewVersion");
								showIcon(iconNew);
								if (dot) dot.classList.remove("hidden");

								btn.onclick = () => {
									if (!self.bodyNewDialog) return;
									const titleEl = self.bodyNewDialog.querySelector(
										".version-new-dialog-title",
									);
									const bodyEl = self.bodyNewDialog.querySelector(
										".version-new-dialog-body",
									);
									const downloadLink = self.bodyNewDialog.querySelector(
										".version-check-new-download",
									);
									const githubLink = self.bodyNewDialog.querySelector(
										".version-check-new-github",
									);
									const newTagEl =
										self.bodyNewDialog.querySelector(".version-new-tag");
									const preBadgeEl =
										self.bodyNewDialog.querySelector(".version-pre-badge");
									if (titleEl)
										titleEl.textContent = self.getTr("versionNewVersion");
									if (newTagEl) newTagEl.textContent = result.updateTag;
									if (preBadgeEl) {
										if (result.isBeta) {
											preBadgeEl.classList.remove("hidden");
										} else {
											preBadgeEl.classList.add("hidden");
										}
									}
									if (bodyEl)
										bodyEl.innerHTML =
											self.simpleMarkdown(result.updateBody) ||
											`<p>${self.getTr("versionNewVersion")}</p>`;
									if (downloadLink)
										downloadLink.onclick = () => {
											window.open(
												result.updateDownloadUrl || result.updateHtmlUrl,
												"_blank",
												"noopener,noreferrer",
											);
										};
									if (githubLink) githubLink.href = result.updateHtmlUrl;
									self.showDialog(self.bodyNewDialog);
									if (window.translationManager?.isActive()) {
										setTimeout(() => {
											const t = window.translate;
											if (t?.execute) {
												t.execute([self.bodyNewDialog]);
											}
										}, 300);
									}
								};
							} else {
								textEl.setAttribute("data-i18n-key", "versionLatest");
								textEl.textContent = self.getTr("versionLatest");
								btn.title = self.getTr("versionLatest");
								showIcon(iconUpToDate);

								btn.onclick = () => {
									self.showDialog(self.bodySuccessDialog);
								};
							}
						})
						.catch(() => {
							lastCheckResult = { status: "error" };
							textEl.setAttribute("data-i18n-key", "versionCheckError");
							textEl.textContent = self.getTr("versionCheckError");
							btn.title = self.getTr("versionCheckFailedTitle");
							showIcon(iconError);

							btn.onclick = () => {
								self.showDialog(self.bodyFailedDialog);
							};
						})
						.finally(() => {
							checking = false;
						});
				}

				if (!btn || !textEl) return;

				widget._versionCheckFn = checkForUpdates;
				btn.onclick = checkForUpdates;
				restoreLastCheckResult();

				if (self.config.autoCheck && self.config.versionCheckApiUrl) {
					setTimeout(() => {
						checkForUpdates();
					}, 500);
				}
			})(widgets[w]);
		}
	}

	/** 注册翻译刷新回调：语言切换时更新所有小部件文案 */
	registerVersionCheckRenderer() {
		const self = this;
		function renderer() {
			const allWidgets = document.querySelectorAll(".version-check-widget");
			for (let i = 0; i < allWidgets.length; i++) {
				const textEl = allWidgets[i].querySelector(".version-check-text");
				const btn = allWidgets[i].querySelector(".version-check-btn");
				if (textEl) {
					const key = textEl.getAttribute("data-i18n-key");
					if (key === "versionCheckError" && btn) {
						textEl.textContent = self.getTr("versionCheckError");
						btn.title = self.getTr("versionCheckFailedTitle");
					} else if (key) {
						textEl.textContent = self.getTr(key);
						if (btn) btn.title = self.getTr(key);
					}
				}
			}
		}

		if (!window.translationManager) return;
		window.translationManager.onRefresh("versionCheck", renderer);
	}

	/** 入口：DOM 就绪后初始化对话框、事件、小部件、翻译渲染和 Swup 集成 */
	init() {
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", () => {
				this.setupDialogs();
				this.setupDialogEventListeners();
				this.setupWidgets();
				this.registerVersionCheckRenderer();
				this.reinitializeOnSwupContentReplace();
			});
		} else {
			this.setupDialogs();
			this.setupDialogEventListeners();
			this.setupWidgets();
			this.registerVersionCheckRenderer();
			this.reinitializeOnSwupContentReplace();
		}
		document.addEventListener(
			"translation-manager:ready",
			() => {
				this.registerVersionCheckRenderer();
			},
			{ once: true },
		);
	}

	/** 手动触发自动检查（延迟 500ms 模拟点击） */
	tryAutoCheck() {
		if (!this.config.autoCheck) return;
		if (!this.config.versionCheckApiUrl) return;
		const btn = document.querySelector(".version-check-btn");
		if (btn) {
			setTimeout(() => {
				btn.click();
			}, 500);
		}
	}

	/** Swup / Astro 页面切换后重新初始化所有组件 */
	reinitializeOnSwupContentReplace() {
		if (typeof window !== "undefined" && window.swup && window.swup.hooks) {
			window.swup.hooks.on("content:replace", () => {
				setTimeout(() => {
					this.setupDialogs();
					this.setupDialogEventListeners();
					this.setupWidgets();
					this.registerVersionCheckRenderer();
				}, 0);
			});
		}
		document.addEventListener("astro:page-load", () => {
			this.setupDialogs();
			this.setupDialogEventListeners();
			this.setupWidgets();
			this.registerVersionCheckRenderer();
		});
	}
}

export default VersionChecker;
