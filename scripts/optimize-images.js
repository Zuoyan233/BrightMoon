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

const tasks = config.tasks.map((task) => ({
	...task,
	dir: path.join(projectRoot, task.dir),
	// 构建产物目录对应的源目录（dist/xxx -> public/xxx），用于未构建时的回退处理
	publicDir: /^[\\/]?dist[\\/]/.test(task.dir)
		? path.join(projectRoot, task.dir.replace(/^[\\/]?dist[\\/]/, "public/"))
		: undefined,
	...(task.sourceDir && { sourceDir: path.join(projectRoot, task.sourceDir) }),
}));

async function optimizeImage(filePath, maxWidth, maxHeight) {
	const input = fs.readFileSync(filePath);
	const meta = await sharp(input).metadata();
	const originalSize = input.length;
	const ext = path.extname(filePath).toLowerCase();
	const needsConvert = ext !== ".webp";

	const ratio = Math.min(maxWidth / meta.width, maxHeight / meta.height, 1);

	if (ratio >= 1 && !needsConvert) {
		console.log(
			`  ✓ ${path.basename(filePath)}: already optimal (${meta.width}x${meta.height}).`,
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
			`  ✓ ${path.basename(filePath)} → ${path.basename(newPath)}: ${meta.width}x${meta.height} → ${newWidth}x${newHeight} | ${(originalSize / 1024).toFixed(1)} KiB → ${(output.length / 1024).toFixed(1)} KiB (-${((1 - output.length / originalSize) * 100).toFixed(1)}%).`,
		);
	} else {
		fs.writeFileSync(filePath, output);
		const savings = ((1 - output.length / originalSize) * 100).toFixed(1);
		console.log(
			`  ✓ ${path.basename(filePath)}: ${meta.width}x${meta.height} → ${newWidth}x${newHeight} | ${(originalSize / 1024).toFixed(1)} KiB → ${(output.length / 1024).toFixed(1)} KiB (-${savings}%).`,
		);
	}
}

async function main() {
	console.log("Optimizing images for build...");

	if (tasks.length === 0) {
		console.log(
			"\n⚠ Image optimize config not found, skipping optimization.\n",
		);
		return;
	}

	for (const task of tasks) {
		console.log(`\n${task.name}:`);
		if (!fs.existsSync(task.dir)) {
			// 未构建（dist 不存在）时回退到源目录直接处理项目图片
			const fallbackDir =
				(task.sourceDir && fs.existsSync(task.sourceDir) && task.sourceDir) ||
				(task.publicDir && fs.existsSync(task.publicDir) && task.publicDir) ||
				null;

			if (!fallbackDir) {
				console.log("  ℹ Directory not found, skipping...");
				continue;
			}

			console.log(
				`  ℹ Using source directory (not built yet): ${path.relative(projectRoot, fallbackDir)}`,
			);
			const fallbackFiles = fs
				.readdirSync(fallbackDir, { recursive: true })
				.filter((f) => /\.(webp|jpg|jpeg|png)$/i.test(f));
			if (fallbackFiles.length === 0) {
				console.log("  ℹ No source images found, skipping...");
				continue;
			}
			for (const file of fallbackFiles) {
				await optimizeImage(
					path.join(fallbackDir, file),
					task.maxWidth,
					task.maxHeight,
				);
			}
			continue;
		}

		if (task.singleFile) {
			const filePath = path.join(task.dir, task.singleFile);
			if (fs.existsSync(filePath)) {
				await optimizeImage(filePath, task.maxWidth, task.maxHeight);
			} else {
				console.log("  ℹ File not found, skipping...");
			}
			continue;
		}

		if (task.sourceDir) {
			if (!fs.existsSync(task.sourceDir)) {
				console.log("  ℹ Source directory not found, skipping...");
				continue;
			}
			const sourceFiles = fs
				.readdirSync(task.sourceDir, { recursive: true })
				.filter((f) => /\.(webp|jpg|jpeg|png)$/i.test(f));
			if (sourceFiles.length === 0) {
				console.log("  ℹ No source images found, skipping...");
				continue;
			}
			for (const sourceFile of sourceFiles) {
				const basename = path.basename(sourceFile, path.extname(sourceFile));
				const regex = new RegExp(
					`^${basename.replace(/\./g, "\\.")}\\..*\\.webp$`,
				);
				const matched = fs.readdirSync(task.dir).filter((f) => regex.test(f));
				if (matched.length === 0) {
					console.log(`  ℹ ${basename}: no matching output, skipping...`);
				}
				for (const file of matched) {
					await optimizeImage(
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
					await optimizeImage(filePath, fc.maxWidth, fc.maxHeight);
				} else {
					console.log(`  ℹ ${fc.pattern} not found, skipping...`);
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
			await optimizeImage(
				path.join(task.dir, file),
				task.maxWidth,
				task.maxHeight,
			);
		}
	}

	console.log("\n✓ Image optimization complete!\n");
}

main().catch(console.error);
