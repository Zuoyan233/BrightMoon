import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const WEBP_QUALITY = 80;

const tasks = [
	{
		name: "Desktop Banner",
		dir: path.join(projectRoot, "public", "assets", "desktop-banner"),
		maxWidth: 1920,
		maxHeight: 1080,
		recursive: true,
	},
	{
		name: "Mobile Banner",
		dir: path.join(projectRoot, "public", "assets", "mobile-banner"),
		maxWidth: 800,
		maxHeight: 1200,
		recursive: true,
	},
	{
		name: "Home Images",
		dir: path.join(projectRoot, "public", "assets", "home"),
		files: [
			{ pattern: "home favicon.webp", maxWidth: 48, maxHeight: 48 },
			{ pattern: "home.webp", maxWidth: 256, maxHeight: 256 },
		],
	},
	{
		name: "Avatar",
		dir: path.join(projectRoot, "src", "assets", "images"),
		singleFile: "avatar.webp",
		maxWidth: 256,
		maxHeight: 256,
		recursive: true,
	},
	{
		name: "Anime Covers",
		dir: path.join(projectRoot, "public", "assets", "anime"),
		maxWidth: 450,
		maxHeight: 600,
		recursive: true,
	},
	{
		name: "Albums",
		dir: path.join(projectRoot, "public", "images", "albums"),
		maxWidth: 1920,
		maxHeight: 1080,
		recursive: true,
	},
	{
		name: "Posts",
		dir: path.join(projectRoot, "public", "images", "posts"),
		maxWidth: 1920,
		maxHeight: 1080,
		recursive: true,
	},
	{
		name: "Post Covers",
		dir: path.join(projectRoot, "src", "content", "posts"),
		maxWidth: 1920,
		maxHeight: 1080,
		recursive: true,
	},
	{
		name: "Sponsors",
		dir: path.join(projectRoot, "public", "images", "sponsors"),
		maxWidth: 600,
		maxHeight: 600,
		recursive: true,
	},
	{
		name: "Contact QR",
		dir: path.join(projectRoot, "public", "images", "contact"),
		maxWidth: 600,
		maxHeight: 600,
		recursive: true,
	},
	{
		name: "Diary",
		dir: path.join(projectRoot, "public", "images", "diary"),
		maxWidth: 1920,
		maxHeight: 1080,
		recursive: true,
	},
	{
		name: "Device",
		dir: path.join(projectRoot, "public", "images", "device"),
		maxWidth: 800,
		maxHeight: 800,
		recursive: true,
	},
];

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
	console.log("Optimizing images for build...\n");

	for (const task of tasks) {
		console.log(`${task.name}:`);
		if (!fs.existsSync(task.dir)) {
			console.log("  - Directory not found, skipping");
			continue;
		}

		if (task.singleFile) {
			const filePath = path.join(task.dir, task.singleFile);
			if (fs.existsSync(filePath)) {
				await optimizeImage(filePath, task.maxWidth, task.maxHeight);
			} else {
				console.log("  - File not found, skipping");
			}
			continue;
		}

		if (task.files) {
			for (const fc of task.files) {
				const filePath = path.join(task.dir, fc.pattern);
				if (fs.existsSync(filePath)) {
					await optimizeImage(filePath, fc.maxWidth, fc.maxHeight);
				} else {
					console.log(`  - ${fc.pattern} not found, skipping`);
				}
			}
			continue;
		}

		const files = fs
			.readdirSync(task.dir, { recursive: task.recursive })
			.filter((f) => /\.(webp|jpg|jpeg|png)$/i.test(f));
		for (const file of files) {
			await optimizeImage(
				path.join(task.dir, file),
				task.maxWidth,
				task.maxHeight,
			);
		}
	}

	console.log("\nImage optimization complete.");
}

main().catch(console.error);
