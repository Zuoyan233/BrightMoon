import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置已拆分为 user/ 和 defaults/ 目录，按优先级依次读取
const CONFIG_DIR = path.join(__dirname, "../src/config");

// 是否启用 cn-font-split 的调试日志
const FONT_SPLIT_DEBUG = false;

// 移除行注释与块注释，避免被注释掉的配置被误匹配
function stripComments(code) {
	return code
		.replace(/\/\*[\s\S]*?\*\//g, "")
		.replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
}

// 读取配置文件内容
function readConfigContents() {
	const dirs = ["user", "defaults"];
	const contents = [];
	for (const dir of dirs) {
		const dirPath = path.join(CONFIG_DIR, dir);
		if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
			const files = fs
				.readdirSync(dirPath)
				.filter((f) => f.endsWith(".ts") && f !== "index.ts");
			for (const file of files) {
				contents.push(
					stripComments(fs.readFileSync(path.join(dirPath, file), "utf-8")),
				);
			}
		}
	}
	return contents;
}

// 按优先级在配置文件中匹配（user/ > defaults/）
function matchConfig(regex) {
	for (const content of readConfigContents()) {
		const match = content.match(regex);
		if (match) return match;
	}
	return null;
}

// 读取配置文件获取字体配置
async function getConfig() {
	const fontConfigMatch = matchConfig(/font:\s*\{([\s\S]*?)\n\s*\},/);
	if (!fontConfigMatch) {
		console.log("⚠ Font config not found, skipped.");
		return { fonts: [] };
	}

	const fontConfigStr = fontConfigMatch[1];
	const fonts = [];

	// 提取 enableCompress
	const compressMatch = fontConfigStr.match(/enableCompress:\s*(true|false)/);
	const enableCompress = compressMatch ? compressMatch[1] === "true" : false;

	// 提取 fontFamily 与 fontWeight（用于生成的 @font-face）
	const fontFamilyMatch = fontConfigStr.match(/fontFamily:\s*["'](.+?)["']/);
	const fontWeightMatch = fontConfigStr.match(/fontWeight:\s*["'](.+?)["']/);
	const fontFamily = fontFamilyMatch ? fontFamilyMatch[1] : "";
	const fontWeight = fontWeightMatch ? fontWeightMatch[1] : "500";

	// 提取 localFonts 数组
	const localFontsMatch = fontConfigStr.match(/localFonts:\s*\[(.*?)\]/s);
	let localFonts = [];

	if (localFontsMatch?.[1].trim()) {
		// 提取数组中的字符串
		const fontsStr = localFontsMatch[1];
		localFonts =
			fontsStr.match(/["']([^"']+)["']/g)?.map((s) => s.replace(/["']/g, "")) ||
			[];
	}

	if (enableCompress && localFonts.length > 0) {
		fonts.push({
			type: "font",
			files: localFonts,
			enableCompress,
		});
	}

	return { fonts, fontFamily, fontWeight };
}

// 使用 cn-font-split 将字体按 unicode-range 分块输出到 dist 目录
async function compressFonts() {
	try {
		// 读取配置
		const { fonts, fontFamily, fontWeight } = await getConfig();

		if (fonts.length === 0) {
			console.log(
				"⚠ No fonts to split (enableCompress=false or localFonts is empty).\n",
			);
			return;
		}

		// 检查 dist 目录是否存在
		const distDir = path.join(__dirname, "../dist");
		if (!fs.existsSync(distDir)) {
			console.log(
				"⚠ dist directory does not exist, please run astro build first.\n",
			);
			return;
		}

		const { fontSplit } = await (async () => {
			// cn-font-split 在 import 时会无条件打印运行时选择信息，临时屏蔽
			const originalLog = console.log;
			console.log = () => {};
			try {
				return await import("cn-font-split");
			} finally {
				console.log = originalLog;
			}
		})();

		console.log("Starting font chunking...");

		let totalOriginalSize = 0;
		let totalChunkedSize = 0;
		let processedCount = 0;
		const errors = [];

		for (const fontConfig of fonts) {
			for (const fontFile of fontConfig.files) {
				const fontSrc = path.join(__dirname, "../public/assets/font", fontFile);
				const ext = path.extname(fontFile).toLowerCase();
				const baseName = path.basename(fontFile, ext);

				if (!fs.existsSync(fontSrc)) {
					const errorMsg = `✗ Config error: Font file does not exist in config: "${fontFile}"\n   Expected path: public/assets/font/${fontFile}\n   \n   Please check:\n   1. Is the filename correct (case sensitive)?\n   2. Is the file in public/assets/font/?\n   3. Is font.localFonts in src/config/user/site.ts correct?\n`;

					errors.push(errorMsg);
					console.log(`\n${errorMsg}\n`);
					continue;
				}

				const originalSize = fs.statSync(fontSrc).size;
				totalOriginalSize += originalSize;

				// 每个字体的分块输出到独立目录，入口 CSS 固定为 result.css
				const outDir = path.join(distDir, "assets/font", baseName);
				if (fs.existsSync(outDir)) {
					fs.rmSync(outDir, { recursive: true, force: true });
				}
				fs.mkdirSync(outDir, { recursive: true });

				console.log(
					`Splitting ${fontFile} (chunks → assets/font/${baseName}/)...`,
				);

				try {
					// 屏蔽 cn-font-split 内部 console 的日志
					const originalConsole = {
						log: console.log,
						time: console.time,
						timeEnd: console.timeEnd,
						info: console.info,
					};
					if (!FONT_SPLIT_DEBUG) {
						const noop = () => {};
						console.log = noop;
						console.time = noop;
						console.timeEnd = noop;
						console.info = noop;
					}
					try {
						await fontSplit({
							input: fs.readFileSync(fontSrc),
							outDir,
							targetType: "woff2",
							testHtml: false,
							reporter: false,
							// 默认关闭逐文件与进度日志，仅保留脚本自身的汇总输出；调试时随之开启
							silent: !FONT_SPLIT_DEBUG,
							css: {
								// 与 siteConfig.font.fontFamily 对齐，避免使用字体内部命名
								fontFamily:
									fontFamily || baseName.replace(/-[A-Za-z0-9]+$/, ""),
								fontWeight,
								fontDisplay: "swap",
							},
						});
					} finally {
						console.log = originalConsole.log;
						console.time = originalConsole.time;
						console.timeEnd = originalConsole.timeEnd;
						console.info = originalConsole.info;
					}
				} catch (splitError) {
					errors.push(
						`✗ Font splitting failed for ${fontFile}: ${splitError.message}\n`,
					);
					console.log(
						`\n✗ Font splitting failed for ${fontFile}: ${splitError.message}\n`,
					);
					continue;
				}

				// 统计分块产物
				const chunkFiles = fs
					.readdirSync(outDir)
					.filter((f) => f.endsWith(".woff2") || f.endsWith(".css"));
				const cssFile = chunkFiles.find((f) => f.endsWith(".css"));

				if (!cssFile) {
					errors.push(
						`✗ Font splitting produced no CSS entry for ${fontFile}.\n`,
					);
					continue;
				}

				const chunkedSize = chunkFiles.reduce(
					(sum, f) => sum + fs.statSync(path.join(outDir, f)).size,
					0,
				);
				totalChunkedSize += chunkedSize;
				processedCount++;

				// 分块成功后删除 dist 中由 public 拷贝来的全量源文件（页面仅引用 result.css，保留会白占部署体积）
				const distSourceCopy = path.join(distDir, "assets/font", fontFile);
				if (fs.existsSync(distSourceCopy)) {
					fs.rmSync(distSourceCopy);
				}

				console.log(
					`✓ ${fontFile} → ${baseName}/${cssFile} (${chunkFiles.length - 1} chunks, ${(chunkedSize / 1024).toFixed(2)} KB from ${(originalSize / 1024).toFixed(2)} KB)`,
				);
			}
		}

		// 输出总结
		if (errors.length > 0) {
			console.log("\n✗ Font chunking encountered errors!");
			console.log(`${errors.length} errors, please fix and retry.\n`);

			// 列出实际存在的字体文件
			const fontDir = path.join(__dirname, "../public/assets/font");
			if (fs.existsSync(fontDir)) {
				const actualFiles = fs
					.readdirSync(fontDir)
					.filter((f) =>
						[".ttf", ".otf", ".woff", ".woff2"].includes(
							path.extname(f).toLowerCase(),
						),
					);

				if (actualFiles.length > 0) {
					console.log("Available font files:");
					for (const f of actualFiles) {
						console.log(`  - ${f}`);
					}
				} else {
					console.log("⚠ font directory is empty\n");
				}
			}

			process.exit(1);
		}

		if (processedCount > 0) {
			console.log(
				`\n✓ Font chunking complete! Files processed: ${processedCount}, Total size: ${(totalChunkedSize / 1024).toFixed(2)} KB (source ${(totalOriginalSize / 1024).toFixed(2)} KB)\n`,
			);
		} else {
			console.log("⚠ No font files processed.\n");
		}
	} catch (error) {
		console.error("\n✗ Font chunking failed:", error);
		process.exit(1);
	}
	// FFI 清理在 Windows 上偶发 access violation 崩溃，成功后显式退出避免污染构建链
	process.exit(0);
}

// 运行分块
compressFonts();
