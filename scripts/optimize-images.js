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
		const taskRegex =
			/\{\s*name:\s*["'](.+?)["'],\s*dir:\s*["'](.+?)["'],\s*(sourceDir:\s*["'](.+?)["'],\s*)?maxWidth:\s*(\d+),\s*maxHeight:\s*(\d+),\s*(recursive:\s*(true|false),?\s*)?\}/g;

		let taskMatch = taskRegex.exec(tasksStr);
		while (taskMatch !== null) {
			tasks.push({
				name: taskMatch[1],
				dir: taskMatch[2],
				sourceDir: taskMatch[4] || undefined,
				maxWidth: Number.parseInt(taskMatch[5], 10),
				maxHeight: Number.parseInt(taskMatch[6], 10),
				recursive: taskMatch[8] === "true" ? true : undefined,
			});
			taskMatch = taskRegex.exec(tasksStr);
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
			console.log("  ℹ Directory not found, skipping...");
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

	console.log("✓ Image optimization complete!\n");
}

main().catch(console.error);
