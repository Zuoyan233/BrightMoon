import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const CONFIG_DIR = path.join(__dirname, "../src/config");

function readConfigContents() {
	const files = ["user.ts", "defaults.ts"];
	const contents = [];
	for (const file of files) {
		const filePath = path.join(CONFIG_DIR, file);
		if (fs.existsSync(filePath)) {
			const raw = fs.readFileSync(filePath, "utf-8");
			contents.push(raw.replace(/\/\/.*$/gm, ""));
		}
	}
	return contents;
}

function matchConfig(regex) {
	for (const content of readConfigContents()) {
		const match = content.match(regex);
		if (match) return match;
	}
	return null;
}

function getImageOptimizeConfig() {
	const webpQualityMatch = matchConfig(/webpQuality:\s*(\d+)/);
	const webpQuality = webpQualityMatch
		? Number.parseInt(webpQualityMatch[1], 10)
		: 80;

	const tasks = [];

	for (const content of readConfigContents()) {
		const tasksBlockMatch = content.match(
			/tasks:\s*\[([\s\S]*?)\n\t\],\s*\n\};/,
		);
		if (!tasksBlockMatch) continue;

		const tasksStr = tasksBlockMatch[1];
		// 逐对象提取字段，不依赖属性书写顺序
		const blockRegex = /\{[^{}]+\}/g;

		let blockMatch = blockRegex.exec(tasksStr);
		while (blockMatch !== null) {
			const block = blockMatch[0];
			const getString = (key) => {
				const m = block.match(new RegExp(`\\b${key}:\\s*["'](.+?)["']`));
				return m ? m[1] : undefined;
			};
			const getNumber = (key) => {
				const m = block.match(new RegExp(`\\b${key}:\\s*(\\d+)`));
				return m ? Number.parseInt(m[1], 10) : undefined;
			};

			const name = getString("name");
			const dir = getString("dir");
			if (name && dir) {
				tasks.push({
					name,
					dir,
					sourceDir: getString("sourceDir"),
					maxWidth: getNumber("maxWidth"),
					maxHeight: getNumber("maxHeight"),
					recursive: /\brecursive:\s*true/.test(block)
						? true
						: undefined,
				});
			}
			blockMatch = blockRegex.exec(tasksStr);
		}

		if (tasks.length > 0) break;
	}

	return { webpQuality, tasks };
}

const config = getImageOptimizeConfig();
const WEBP_QUALITY = config.webpQuality;

// 显式模式：--source 强制处理源目录，--dist 强制处理构建产物，缺省按 dist 是否存在自动判断
const forceMode = process.argv.includes("--source")
	? "source"
	: process.argv.includes("--dist")
		? "dist"
		: "auto";

function isBuiltMode() {
	if (forceMode === "source") return false;
	if (forceMode === "dist") return true;
	return fs.existsSync(path.join(projectRoot, "dist"));
}

const tasks = config.tasks.map((task) => ({
	...task,
	dir: path.join(projectRoot, task.dir),
	// 构建产物目录对应的源目录（dist/xxx -> public/xxx），用于未构建时的回退处理
	publicDir: /^[\\/]?dist[\\/]/.test(task.dir)
		? path.join(projectRoot, task.dir.replace(/^[\\/]?dist[\\/]/, "public/"))
		: undefined,
	...(task.sourceDir && { sourceDir: path.join(projectRoot, task.sourceDir) }),
}));

// 未成功处理记录（构建后未找到产物 / 文件缺失 / 处理报错），结束后统一提示
const issues = [];

async function safeOptimizeImage(taskName, filePath, maxWidth, maxHeight) {
	try {
		await optimizeImage(filePath, maxWidth, maxHeight);
	} catch (err) {
		const rel = path.relative(projectRoot, filePath);
		// 标注该文件来自构建产物（dist）还是源目录（public/src），便于定位
		const origin = rel.startsWith("dist") ? "post-build" : "standalone";
		issues.push(`[error] ${taskName}: (${origin}) ${rel} (${err.message})`);
		console.log(`  ✗ ${path.basename(filePath)}: ${err.message}`);
	}
}

async function optimizeImage(filePath, maxWidth, maxHeight) {
	const input = fs.readFileSync(filePath);
	const meta = await sharp(input).metadata();
	const originalSize = input.length;
	const ext = path.extname(filePath).toLowerCase();
	const needsConvert = ext !== ".webp";

	const ratio = Math.min(maxWidth / meta.width, maxHeight / meta.height, 1);

	if (ratio >= 1 && !needsConvert) {
		console.log(
			`  ✓ ${path.basename(filePath)}: already optimal (${meta.width}x${meta.height})`,
		);
		return;
	}

	const newWidth = Math.round(meta.width * ratio);
	const newHeight = Math.round(meta.height * ratio);
	const output = await sharp(input)
		.resize(newWidth, newHeight, { fit: "inside", withoutEnlargement: true })
		.webp({ quality: WEBP_QUALITY })
		.toBuffer();

	if (needsConvert) {
		const newPath = `${filePath.slice(0, -ext.length)}.webp`;
		fs.writeFileSync(newPath, output);
		fs.unlinkSync(filePath);
		console.log(
			`  ✓ ${path.basename(filePath)} → ${path.basename(newPath)}: ${meta.width}x${meta.height} → ${newWidth}x${newHeight} | ${(originalSize / 1024).toFixed(1)} KiB → ${(output.length / 1024).toFixed(1)} KiB (-${((1 - output.length / originalSize) * 100).toFixed(1)}%)`,
		);
	} else {
		fs.writeFileSync(filePath, output);
		const savings = ((1 - output.length / originalSize) * 100).toFixed(1);
		console.log(
			`  ✓ ${path.basename(filePath)}: ${meta.width}x${meta.height} → ${newWidth}x${newHeight} | ${(originalSize / 1024).toFixed(1)} KiB → ${(output.length / 1024).toFixed(1)} KiB (-${savings}%)`,
		);
	}
}

async function main() {
	console.log("Optimizing images for build...");
	console.log(
		`\nMode: ${forceMode === "auto" ? "auto-detected" : forceMode} (${isBuiltMode() ? "post-build, processing dist outputs" : "standalone, processing source dirs"})`,
	);

	if (tasks.length === 0) {
		console.log(
			"\n⚠ Image optimize config not found, skipping optimization.\n",
		);
		return;
	}

	for (const task of tasks) {
		console.log(`\n${task.name}:`);
		// 以模式判断结果决定处理对象
		const isBuilt = isBuiltMode();

		if (!isBuilt) {
			// 单独运行（未构建）：直接处理源目录，dist 残留产物不参与
			const isDistDir = task.publicDir !== undefined;
			const targetDir =
				(task.sourceDir && fs.existsSync(task.sourceDir) && task.sourceDir) ||
				(isDistDir &&
					task.publicDir &&
					fs.existsSync(task.publicDir) &&
					task.publicDir) ||
				(!isDistDir && fs.existsSync(task.dir) && task.dir) ||
				null;

			if (!targetDir) {
				console.log("  ℹ Directory not found, skipping...");
				const missingDir = task.sourceDir || task.publicDir || task.dir;
				issues.push(
					`[missing-dir] ${task.name}: (standalone, dist not built) source dir "${path.relative(projectRoot, missingDir)}" not found`,
				);
				continue;
			}

			const sourceFiles = fs
				.readdirSync(targetDir, { recursive: true })
				.filter((f) => /\.(webp|jpg|jpeg|png)$/i.test(f));
			if (sourceFiles.length === 0) {
				console.log("  ℹ No source images found, skipping...");
				continue;
			}
			for (const file of sourceFiles) {
				await safeOptimizeImage(
					task.name,
					path.join(targetDir, file),
					task.maxWidth,
					task.maxHeight,
				);
			}
			continue;
		}

		if (!fs.existsSync(task.dir)) {
			// 构建后：只处理 dist 产物，产物目录缺失直接报告，不回退源目录
			console.log("  ℹ Output directory not found, skipping...");
			const sourceDesc = task.sourceDir || task.publicDir || "n/a";
			issues.push(
				`[missing-dir] ${task.name}: (post-build) output dir "${path.relative(projectRoot, task.dir)}" not found (source: ${sourceDesc})`,
			);
			continue;
		}

		if (task.singleFile) {
			const filePath = path.join(task.dir, task.singleFile);
			if (fs.existsSync(filePath)) {
				await safeOptimizeImage(task.name, filePath, task.maxWidth, task.maxHeight);
			} else {
				console.log("  ℹ File not found, skipping...");
				issues.push(
					`[missing-file] ${task.name}: (post-build) ${path.relative(projectRoot, filePath)} not found`,
				);
			}
			continue;
		}

		if (task.sourceDir) {
			if (!fs.existsSync(task.sourceDir)) {
				console.log("  ℹ Source directory not found, skipping...");
				// 构建后模式：dist 存在，按源目录索引产物，缺失的是源目录
				issues.push(
					`[missing-dir] ${task.name}: (post-build) source dir "${path.relative(projectRoot, task.sourceDir)}" not found`,
				);
				continue;
			}
			const sourceFiles = fs
				.readdirSync(task.sourceDir, { recursive: true })
				.filter((f) => /\.(webp|jpg|jpeg|png)$/i.test(f));
			if (sourceFiles.length === 0) {
				console.log("  ℹ No source images found, skipping...");
				continue;
			}
			// 递归索引构建产物目录（与源目录扫描方式一致，支持子目录）
			const distFiles = fs
				.readdirSync(task.dir, { recursive: true })
				.filter((f) => /\.(webp|jpg|jpeg|png)$/i.test(f));
			// dist/_astro 为扁平目录，哈希产物不保留源目录结构
			const isFlatAstroDir = path.basename(task.dir) === "_astro";
			for (const sourceFile of sourceFiles) {
				const sourceExt = path.extname(sourceFile);
				const basename = path.basename(sourceFile, sourceExt);
				const relDir = path.dirname(sourceFile);
				const matched = distFiles.filter((df) => {
					const dfExt = path.extname(df);
					const dfBasename = path.basename(df, dfExt);
					const dfDir = path.dirname(df);
					// 同名产物：public 目录原样拷贝，目录结构与源一致
					if (dfDir === relDir && dfBasename === basename && dfExt === sourceExt)
						return true;
					// Astro 哈希产物（basename.hash.webp），不依赖正则避免特殊字符问题
					if (
						/\.webp$/i.test(df) &&
						dfBasename.startsWith(`${basename}.`) &&
						(dfDir === relDir || isFlatAstroDir)
					)
						return true;
					return false;
				});
				if (matched.length === 0) {
					console.log(`  ℹ ${sourceFile}: no matching output, skipping...`);
					// 构建后模式：源文件存在，但在 dist 产物目录中找不到对应输出
					issues.push(
						`[no-output] ${task.name}: (post-build) "${sourceFile}" has no matching output in ${path.relative(projectRoot, task.dir)}`,
					);
				}
				for (const file of matched) {
					await safeOptimizeImage(
						task.name,
						path.join(task.dir, file),
						task.maxWidth,
						task.maxHeight,
					);
				}
			}
			continue;
		}

		if (task.files) {
			for (const fc of task.files) {
				const filePath = path.join(task.dir, fc.pattern);
				if (fs.existsSync(filePath)) {
					await safeOptimizeImage(
						task.name,
						filePath,
						fc.maxWidth,
						fc.maxHeight,
					);
				} else {
					console.log(`  ℹ ${fc.pattern} not found, skipping...`);
					issues.push(
						`[missing-file] ${task.name}: (post-build) ${path.relative(projectRoot, path.join(task.dir, fc.pattern))} not found`,
					);
				}
			}
			continue;
		}

		const files = fs
			.readdirSync(task.dir, { recursive: task.recursive })
			.filter((f) => /\.(webp|jpg|jpeg|png)$/i.test(f));
		if (files.length === 0) {
			console.log("  ℹ No images found in directory, skipping...");
			continue;
		}
		for (const file of files) {
			await safeOptimizeImage(
				task.name,
				path.join(task.dir, file),
				task.maxWidth,
				task.maxHeight,
			);
		}
	}

	if (issues.length > 0) {
		console.log(
			`\n⚠ Image optimization completed with ${issues.length} unprocessed item(s):`,
		);
		for (const issue of issues) {
			console.log(`  ✗ ${issue}`);
		}
		console.log(
			" \nℹ These images were not optimized. Check imageOptimizeConfig in src/config/user.ts if this is unexpected, or verify the files exist (missing files will be skipped).\n",
		);
	} else {
		console.log("\n✓ Image optimization complete!\n");
	}
}

main().catch(console.error);
