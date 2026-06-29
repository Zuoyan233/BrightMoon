/**
 * 版本更新检测模块
 *
 * 1. 负责检查当前版本与远程最新版本，解析对比版本号，弹窗提示用户更新。
 * 2. 支持 semver 格式版本号（含预发布标识），内置简易 Markdown 渲染用于展示更新日志。
 * 3. 与 i18n 翻译系统集成，支持多语言 UI 文案。
 */
const SENTINEL = "\uE000";

let lastCheckResult = null;

class VersionChecker {
	constructor(options) {
		this.config = {
			currentVersion: options.currentVersion || "",
			versionCheckApiUrl: options.versionCheckApiUrl || "",
			versionPrefixPattern: options.versionPrefixPattern || "^[vV]",
			autoCheck: options.autoCheck !== undefined ? options.autoCheck : false,
			versionTranslations: options.versionTranslations || {},
			translateToLangMap: options.translateToLangMap || {},
			defaultLang: options.defaultLang || "en",
		};
		this.bodyFailedDialog = null;
		this.bodySuccessDialog = null;
		this.bodyNewDialog = null;
		this.init();
	}

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
					' class="text-[1rem] font-bold mt-3 mb-1 text-black/90 dark:text-white/90">' +
					this.inlineFormat(headingMatch[2]) +
					"</h" +
					lvl +
					">";
				i++;
				continue;
			}
			if (/^[-*]\s/.test(line)) {
				const items = [];
				while (i < lines.length && /^[-*]\s/.test(lines[i])) {
					items.push(lines[i].replace(/^[-*]\s+/, ""));
					i++;
				}
				html +=
					'<ul class="list-disc pl-5 my-1 text-[#374151] dark:text-[#D1D5DB]">' +
					items.map((it) => `<li>${this.inlineFormat(it)}</li>`).join("") +
					"</ul>";
				continue;
			}
			if (/^\d+\.\s/.test(line)) {
				const items = [];
				while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
					items.push(lines[i].replace(/^\d+\.\s+/, ""));
					i++;
				}
				html +=
					'<ol class="list-decimal pl-5 my-1 text-[#374151] dark:text-[#D1D5DB]">' +
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
					this.inlineFormat(paraLines.join("<br>")) +
					"</p>";
		}
		return html;
	}

	inlineFormat(text) {
		return text
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(
				/`([^`]+)`/g,
				'<code class="text-[0.85em] bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded text-[var(--primary)] font-mono">$1</code>',
			)
			.replace(
				/\*\*(.+?)\*\*/g,
				'<strong class="text-[#111827] dark:text-white/100">$1</strong>',
			)
			.replace(
				/__(.+?)__/g,
				'<strong class="text-[#111827] dark:text-white/100">$1</strong>',
			)
			.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, "<em>$1</em>")
			.replace(/(?<!_)_([^_]+?)_(?!_)/g, "<em>$1</em>")
			.replace(/~~(.+?)~~/g, '<del class="opacity-50">$1</del>')
			.replace(
				/\[([^\]]+)\]\(([^)]+)\)/g,
				'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[var(--primary)] hover:underline font-medium">$1</a>',
			);
	}

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

	getLang() {
		const translateTo =
			window.translationManager?.getTargetLanguage() || window.translate?.to;
		if (translateTo) {
			return (
				this.config.translateToLangMap[translateTo] || this.config.defaultLang
			);
		}
		return this.config.defaultLang;
	}

	getTr(key) {
		const lang = this.getLang();
		return (
			this.config.versionTranslations[lang]?.[key] ||
			this.config.versionTranslations.en?.[key] ||
			key
		);
	}

	showDialog(dialog) {
		if (!dialog) return;
		dialog.showModal();
		requestAnimationFrame(() => {
			dialog.classList.add("dialog-show");
		});
	}

	hideDialog(dialog) {
		if (!dialog) return;
		dialog.classList.remove("dialog-show");
		setTimeout(() => {
			dialog.close();
		}, 250);
	}

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
