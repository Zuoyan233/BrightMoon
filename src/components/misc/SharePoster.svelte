<script lang="ts">
import Icon from "@iconify/svelte";
import QRCode from "qrcode";
import { onDestroy, onMount, tick } from "svelte";
import I18nKey from "../../i18n/i18nKey";
import { i18n } from "../../i18n/translation";
import { applyI18nToDOM, clearI18nMarkers } from "../../utils/i18n-dom-updater";
import { getConfigLanguageFromTranslate } from "../../utils/language-utils";
import { translationManager } from "../../utils/translation-manager";

// 组件属性接口
export let title: string;
export let author: string;
export let description = "";
export let pubDate: string;
export let coverImage: string | null = null;
export let url: string;
export let siteTitle: string;
export let avatar: string | null = null;

// 常量
const SCALE = 2;
const WIDTH = 425 * SCALE;
const PADDING = 24 * SCALE;
const CONTENT_WIDTH = WIDTH - PADDING * 2;
const FONT_FAMILY = "'Roboto', sans-serif";

// 状态变量
let showModal = false;
let posterImage: string | null = null;
let themeColor = "#558e88";
let copied = false;
let modalElement: HTMLElement;
let shareRootEl: HTMLElement;
let unregisterTranslationRenderer = () => {};

// 复制反馈持续时间
const COPY_FEEDBACK_DURATION = 2000;

// 刷新组件 DOM翻译内容
function refreshI18nOnShare() {
	if (!translationManager.isActive()) return;
	const translateTo = translationManager.getTargetLanguage();
	if (!translateTo) return;
	const configLang = getConfigLanguageFromTranslate(translateTo);

	if (shareRootEl) {
		clearI18nMarkers(shareRootEl);
		applyI18nToDOM(configLang, shareRootEl);
	}
	if (modalElement) {
		clearI18nMarkers(modalElement);
		applyI18nToDOM(configLang, modalElement);
	}
}

// 组件挂载时初始化分享海报
onMount(() => {
	const temp = document.createElement("div");
	temp.style.color = "var(--primary)";
	temp.style.display = "none";
	document.body.appendChild(temp);
	const computedColor = getComputedStyle(temp).color;
	document.body.removeChild(temp);

	if (computedColor) {
		themeColor = computedColor;
	}

	unregisterTranslationRenderer = translationManager.onRefresh(
		"share-poster",
		refreshI18nOnShare,
	);

	if (translationManager.isActive()) {
		void tick().then(() => refreshI18nOnShare());
	}
});

// 组件卸载时注销翻译刷新监听器
onDestroy(() => {
	unregisterTranslationRenderer();
});

// 刷新分享海报内容
$: if (showModal) {
	void tick().then(() => {
		if (modalElement) {
			void translationManager.refresh();
		}
	});
}

// 加载图片
async function loadImage(src: string): Promise<HTMLImageElement | null> {
	return new Promise((resolve) => {
		const img = new Image();
		img.crossOrigin = "anonymous";

		img.onload = () => resolve(img);
		img.onerror = () => {
			if (src.includes("images.weserv.nl")) {
				resolve(null);
				return;
			}

			const proxyImg = new Image();
			proxyImg.crossOrigin = "anonymous";
			proxyImg.onload = () => resolve(proxyImg);
			proxyImg.onerror = () => resolve(null);
			proxyImg.src = `https://images.weserv.nl/?url=${encodeURIComponent(src)}&output=png`;
		};

		img.src = src;
	});
}

// 计算文本换行
function getLines(
	ctx: CanvasRenderingContext2D,
	text: string,
	maxWidth: number,
): string[] {
	const lines: string[] = [];
	let currentLine = "";

	for (const char of text) {
		if (ctx.measureText(currentLine + char).width < maxWidth) {
			currentLine += char;
		} else {
			lines.push(currentLine);
			currentLine = char;
		}
	}

	if (currentLine) lines.push(currentLine);
	return lines;
}

// 绘制圆角矩形
function drawRoundedRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	radius: number,
): void {
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
}

// 解析日期字符串
type DateObj = { day: string; month: string; year: string };
function parseDate(dateStr: string): DateObj | null {
	try {
		const d = new Date(dateStr);
		if (Number.isNaN(d.getTime())) return null;

		return {
			day: d.getDate().toString().padStart(2, "0"),
			month: (d.getMonth() + 1).toString().padStart(2, "0"),
			year: d.getFullYear().toString(),
		};
	} catch {
		return null;
	}
}

// 生成分享海报
async function generatePoster() {
	showModal = true;

	// 使用 requestAnimationFrame 确保 DOM 更新后再添加显示类
	await tick();
	requestAnimationFrame(() => {
		if (modalElement) {
			modalElement.classList.add("modal-show");
		}
	});

	if (posterImage) return;

	try {
		const qrCodeUrl = await QRCode.toDataURL(url, {
			margin: 1,
			width: 100 * SCALE,
			color: { dark: "#000000", light: "#ffffff" },
		});

		const [qrImg, coverImg, avatarImg] = await Promise.all([
			loadImage(qrCodeUrl),
			coverImage ? loadImage(coverImage) : Promise.resolve(null),
			avatar ? loadImage(avatar) : Promise.resolve(null),
		]);

		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Canvas context not available");

		// 计算布局高度
		const coverHeight = (coverImage ? 200 : 120) * SCALE;
		const titleFontSize = 24 * SCALE;
		const descFontSize = 14 * SCALE;
		const qrSize = 80 * SCALE;
		const footerHeight = qrSize;

		ctx.font = `700 ${titleFontSize}px ${FONT_FAMILY}`;
		const titleLines = getLines(ctx, title, CONTENT_WIDTH);
		const titleLineHeight = 30 * SCALE;
		const titleHeight = titleLines.length * titleLineHeight;

		let descHeight = 0;
		if (description) {
			ctx.font = `${descFontSize}px ${FONT_FAMILY}`;
			const descLines = getLines(ctx, description, CONTENT_WIDTH - 16 * SCALE);
			descHeight = Math.min(descLines.length, 6) * (25 * SCALE);
		}

		const canvasHeight =
			coverHeight +
			PADDING +
			titleHeight +
			16 * SCALE +
			descHeight +
			(description ? 24 * SCALE : 8 * SCALE) +
			24 * SCALE +
			footerHeight +
			PADDING;

		canvas.width = WIDTH;
		canvas.height = canvasHeight;

		// 绘制背景
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// 绘制装饰性圆
		ctx.save();
		ctx.globalAlpha = 0.1;
		ctx.fillStyle = themeColor;
		ctx.beginPath();
		ctx.arc(WIDTH - 25 * SCALE, 25 * SCALE, 75 * SCALE, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(10 * SCALE, canvas.height - 10 * SCALE, 50 * SCALE, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();

		// 绘制封面图片
		if (coverImg) {
			const imgRatio = coverImg.width / coverImg.height;
			const targetRatio = WIDTH / coverHeight;
			let sx: number;
			let sy: number;
			let sWidth: number;
			let sHeight: number;

			if (imgRatio > targetRatio) {
				sHeight = coverImg.height;
				sWidth = sHeight * targetRatio;
				sx = (coverImg.width - sWidth) / 2;
				sy = 0;
			} else {
				sWidth = coverImg.width;
				sHeight = sWidth / targetRatio;
				sx = 0;
				sy = (coverImg.height - sHeight) / 2;
			}
			ctx.drawImage(
				coverImg,
				sx,
				sy,
				sWidth,
				sHeight,
				0,
				0,
				WIDTH,
				coverHeight,
			);
		} else {
			ctx.save();
			ctx.fillStyle = themeColor;
			ctx.globalAlpha = 0.2;
			ctx.fillRect(0, 0, WIDTH, coverHeight);
			ctx.restore();
		}

		// 绘制日期标签
		const dateObj = parseDate(pubDate);
		if (dateObj) {
			const dateBoxW = 60 * SCALE;
			const dateBoxH = 60 * SCALE;
			const dateBoxX = PADDING;
			const dateBoxY = coverHeight - dateBoxH;

			ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
			drawRoundedRect(ctx, dateBoxX, dateBoxY, dateBoxW, dateBoxH, 4 * SCALE);
			ctx.fill();

			ctx.fillStyle = "#ffffff";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = `700 ${30 * SCALE}px ${FONT_FAMILY}`;
			ctx.fillText(dateObj.day, dateBoxX + dateBoxW / 2, dateBoxY + 24 * SCALE);

			ctx.beginPath();
			ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
			ctx.lineWidth = 1 * SCALE;
			ctx.moveTo(dateBoxX + 10 * SCALE, dateBoxY + 42 * SCALE);
			ctx.lineTo(dateBoxX + dateBoxW - 10 * SCALE, dateBoxY + 42 * SCALE);
			ctx.stroke();

			ctx.font = `${10 * SCALE}px ${FONT_FAMILY}`;
			ctx.fillText(
				`${dateObj.year} ${dateObj.month}`,
				dateBoxX + dateBoxW / 2,
				dateBoxY + 51 * SCALE,
			);
		}

		// 绘制标题
		let drawY = coverHeight + PADDING;
		ctx.textBaseline = "top";
		ctx.textAlign = "left";
		ctx.font = `700 ${titleFontSize}px ${FONT_FAMILY}`;
		ctx.fillStyle = "#111827";
		for (const line of titleLines) {
			ctx.fillText(line, PADDING, drawY);
			drawY += titleLineHeight;
		}
		drawY += 16 * SCALE - (titleLineHeight - titleFontSize);

		// 绘制描述
		if (description) {
			ctx.fillStyle = "#e5e7eb";
			drawRoundedRect(
				ctx,
				PADDING,
				drawY - 8 * SCALE,
				4 * SCALE,
				descHeight + 8 * SCALE,
				2 * SCALE,
			);
			ctx.fill();

			ctx.font = `${descFontSize}px ${FONT_FAMILY}`;
			ctx.fillStyle = "#4b5563";
			const descLines = getLines(ctx, description, CONTENT_WIDTH - 16 * SCALE);
			for (const line of descLines.slice(0, 6)) {
				ctx.fillText(line, PADDING + 16 * SCALE, drawY);
				drawY += 25 * SCALE;
			}
		} else {
			drawY += 8 * SCALE;
		}

		// 绘制分隔线
		drawY += 24 * SCALE;
		ctx.beginPath();
		ctx.strokeStyle = "#f3f4f6";
		ctx.lineWidth = 1 * SCALE;
		ctx.moveTo(PADDING, drawY);
		ctx.lineTo(WIDTH - PADDING, drawY);
		ctx.stroke();
		drawY += 16 * SCALE;

		// 绘制页脚
		const footerY = drawY;
		const qrX = WIDTH - PADDING - qrSize;

		// 绘制二维码背景
		ctx.fillStyle = "#ffffff";
		ctx.shadowColor = "rgba(0, 0, 0, 0.05)";
		ctx.shadowBlur = 4 * SCALE;
		ctx.shadowOffsetY = 2 * SCALE;
		drawRoundedRect(ctx, qrX, footerY, qrSize, qrSize, 4 * SCALE);
		ctx.fill();
		ctx.shadowColor = "transparent";

		// 绘制二维码图片
		if (qrImg) {
			const qrInnerSize = 76 * SCALE;
			const qrPadding = (qrSize - qrInnerSize) / 2;
			ctx.drawImage(
				qrImg,
				qrX + qrPadding,
				footerY + qrPadding,
				qrInnerSize,
				qrInnerSize,
			);
		}

		// 绘制作者头像
		if (avatarImg) {
			ctx.save();
			const avatarSize = 64 * SCALE;
			const avatarX = PADDING;
			ctx.beginPath();
			ctx.arc(
				avatarX + avatarSize / 2,
				footerY + avatarSize / 2,
				avatarSize / 2,
				0,
				Math.PI * 2,
			);
			ctx.closePath();
			ctx.clip();
			ctx.drawImage(avatarImg, avatarX, footerY, avatarSize, avatarSize);
			ctx.restore();

			ctx.beginPath();
			ctx.arc(
				avatarX + avatarSize / 2,
				footerY + avatarSize / 2,
				avatarSize / 2,
				0,
				Math.PI * 2,
			);
			ctx.strokeStyle = "#ffffff";
			ctx.lineWidth = 2 * SCALE;
			ctx.stroke();
		}

		// 绘制作者文本
		const avatarOffset = avatar ? 64 * SCALE + 16 * SCALE : 0;
		const textX = PADDING + avatarOffset;

		ctx.fillStyle = "#9ca3af";
		ctx.font = `${12 * SCALE}px ${FONT_FAMILY}`;
		ctx.fillText(i18n(I18nKey.author), textX, footerY + 4 * SCALE);

		ctx.fillStyle = "#1f2937";
		ctx.font = `700 ${20 * SCALE}px ${FONT_FAMILY}`;
		ctx.fillText(author, textX, footerY + 20 * SCALE);

		// 绘制站点标题文本
		ctx.fillStyle = "#9ca3af";
		ctx.font = `${12 * SCALE}px ${FONT_FAMILY}`;
		ctx.fillText(i18n(I18nKey.scanToRead), textX, footerY + 44 * SCALE);

		ctx.fillStyle = "#1f2937";
		ctx.font = `700 ${20 * SCALE}px ${FONT_FAMILY}`;
		ctx.fillText(siteTitle, textX, footerY + 60 * SCALE);

		posterImage = canvas.toDataURL("image/png");
	} catch (error) {
		console.error("Failed to generate poster:", error);
	} finally {
	}
}

// 下载海报
function downloadPoster() {
	if (posterImage) {
		const a = document.createElement("a");
		a.href = posterImage;
		a.download = `poster-${title.replace(/\s+/g, "-")}.png`;
		a.click();
	}
}

// 关闭弹窗
function closeModal() {
	if (modalElement) {
		modalElement.classList.remove("modal-show");
		setTimeout(() => {
			showModal = false;
		}, 300); // 与动画持续时间一致
	}
}

// 复制链接到剪贴板
async function copyLink() {
	try {
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(url);
		} else {
			const textarea = document.createElement("textarea");
			textarea.value = url;
			textarea.style.position = "fixed";
			textarea.style.left = "-9999px";
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			document.body.removeChild(textarea);
		}

		copied = true;
		tick().then(() => refreshI18nOnShare());
		setTimeout(() => {
			copied = false;
			tick().then(() => refreshI18nOnShare());
		}, COPY_FEEDBACK_DURATION);
	} catch (error) {
		console.error("Failed to copy link:", error);
	}
}

// 弹窗容器
function portal(node: HTMLElement) {
	document.body.appendChild(node);
	modalElement = node;
	return {
		destroy() {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		},
	};
}
</script>

<div bind:this={shareRootEl} class="inline-flex items-center gap-3">
  <button 
    class="btn-regular px-6 py-3 rounded-lg inline-flex items-center gap-2"
    on:click={generatePoster}
    aria-label="Generate Share Poster"
  >
    <span>{i18n(I18nKey.shareArticle)}</span>
  </button>

  <a 
    class="btn-regular px-6 py-3 rounded-lg inline-flex items-center gap-2"
    href="/sponsors/"
  >
    <span>{i18n(I18nKey.sponsors)}</span>
  </a>
</div>

{#if showModal}

  <!-- 分享海报弹窗 -->
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div 
    use:portal 
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)] opacity-0 modal-show:opacity-100"
    class:modal-show={false} 
    on:click={closeModal}
    on:keydown={(e) => { if (e.key === 'Escape') closeModal(); }}
    role="dialog"
    tabindex="-1"
  >

  <!-- 分享海报弹窗内容 -->
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div 
      class="bg-white dark:bg-gray-800 rounded-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] opacity-0 scale-95 translate-y-2.5 modal-show:opacity-100 modal-show:scale-100 modal-show:translate-y-0"
      on:click|stopPropagation
    >
      <div class="p-6 flex justify-center bg-gray-50 dark:bg-[oklch(0.23_0.015_var(--hue))] min-h-[200px] items-center">
        {#if posterImage}
          <img src={posterImage} alt="Poster" class="max-w-full h-auto shadow-lg rounded-lg" />
        {:else}
           <div class="flex flex-col items-center gap-3">
             <div class="w-8 h-8 border-2 border-gray-200 rounded-full animate-spin" style="border-top-color: {themeColor}"></div>
             <span class="text-sm text-gray-500">{i18n(I18nKey.generatingPoster)}</span>
           </div>
        {/if}
      </div>
      
      <div class="p-4 border-t border-black/5 dark:border-white/10 dark:bg-[oklch(0.23_0.015_var(--hue))] grid grid-cols-2 gap-3">
        <button 
          class="py-3 btn-regular text-[var(--btn-content)] dark:text-white/75 rounded-xl font-mediumactive:scale-[0.98] transition-all flex items-center justify-center gap-2"
          on:click={copyLink}
        >
          {#if copied}
            <Icon icon="material-symbols:check" width="20" height="20" />
            <span>{i18n(I18nKey.copied)}</span>
          {:else}
            <Icon icon="material-symbols:link" width="20" height="20" />
            <span>{i18n(I18nKey.copyLink)}</span>
          {/if}
        </button>
        <button 
          class="py-3 btn-regular text-[var(--btn-content)] dark:text-white/75 rounded-xl font-mediumactive:scale-[0.98] transition-all flex items-center justify-center gap-2"
          on:click={downloadPoster}
          disabled={!posterImage}
        >
          <Icon icon="material-symbols:download" width="20" height="20" />
          {i18n(I18nKey.savePoster)}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* 自定义修饰符规则 */
  .modal-show {
    opacity: 1 !important;
  }
  
  .modal-show > div {
    opacity: 1 !important;
    transform: scale(1) translateY(0) !important;
  }
</style>
