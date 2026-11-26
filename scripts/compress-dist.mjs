// 构建后预压缩脚本：为 dist/ 中的文本资源生成 .br 和 .gz 文件
import fs from "node:fs";
import { extname, join } from "node:path";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";

const CONFIG_DIR = join(import.meta.dirname, "..", "src", "config");

// 移除行注释与块注释，避免被注释掉的配置被误匹配
function stripComments(code) {
	return code
		.replace(/\/\*[\s\S]*?\*\//g, "")
		.replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
}

function readConfigContents() {
	const contents = [];
	for (const dir of ["user", "defaults"]) {
		const filePath = join(CONFIG_DIR, dir, "dist-compress.ts");
		if (fs.existsSync(filePath)) {
			contents.push(stripComments(fs.readFileSync(filePath, "utf-8")));
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

// 解析数字（支持 1024 或 16 * 1024 * 1024 之类的简单乘法表达式）
function parseNumber(key, fallback) {
	const match = matchConfig(new RegExp(`\\b${key}:\\s*([\\d\\s*]+)\\s*,`));
	if (!match) return fallback;
	const value = match[1].split("*").reduce((acc, part) => {
		const n = Number.parseInt(part.trim(), 10);
		return Number.isNaN(n) ? acc : acc * n;
	}, 1);
	return Number.isNaN(value) || value <= 0 ? fallback : value;
}

function parseBoolean(key, fallback) {
	const match = matchConfig(new RegExp(`\\b${key}:\\s*(true|false)`));
	return match ? match[1] === "true" : fallback;
}

function parseExtensions(fallback) {
	const match = matchConfig(/excludeExtensions:\s*\[([\s\S]*?)\]/);
	if (!match?.[1]?.trim()) return fallback;
	const exts = (match[1].match(/["']([^"']+)["']/g) || [])
		.map((s) => s.replace(/["']/g, ""))
		.filter(Boolean);
	return exts.length > 0 ? exts : fallback;
}

const config = {
	enable: parseBoolean("enable", true),
	output: matchConfig(/\boutput:\s*["'](both|brotli|gzip)["']/)?.[1] || "both",
	brotliQuality: parseNumber("brotliQuality", 11),
	gzipLevel: parseNumber("gzipLevel", 9),
	minSize: parseNumber("minSize", 1024),
	maxSize: parseNumber("maxSize", 16 * 1024 * 1024),
	excludeExtensions: parseExtensions([]),
};

const SKIP_EXTENSIONS = new Set(config.excludeExtensions);

if (!config.enable) {
	console.log(
		"⚠ Dist compression disabled by config (distCompressConfig.enable), skipping.",
	);
	process.exit(0);
}

const distDir = join(import.meta.dirname, "..", "dist");
console.log("Starting dist compression...");

const collectFiles = (dir, base = "") => {
	const results = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const relativePath = base ? `${base}/${entry.name}` : entry.name;
		if (entry.isDirectory()) {
			results.push(...collectFiles(join(dir, entry.name), relativePath));
		} else {
			results.push({ relativePath, fullPath: join(dir, entry.name) });
		}
	}
	return results;
};

const files = collectFiles(distDir);
let fileCount = 0;
let totalBytes = 0;
let brTotalBytes = 0;
let gzTotalBytes = 0;

for (const { relativePath, fullPath } of files) {
	const size = fs.statSync(fullPath).size;
	if (size < config.minSize || size > config.maxSize) continue;
	if (SKIP_EXTENSIONS.has(extname(relativePath))) continue;

	const data = fs.readFileSync(fullPath);
	fileCount++;
	totalBytes += size;

	if (config.output === "both" || config.output === "brotli") {
		// Brotli 压缩（构建时一次性压缩，换取最小体积）
		const br = brotliCompressSync(data, {
			params: { [constants.BROTLI_PARAM_QUALITY]: config.brotliQuality },
		});
		if (br.length < size) {
			fs.writeFileSync(`${fullPath}.br`, br);
			brTotalBytes += br.length;
		}
	}

	if (config.output === "both" || config.output === "gzip") {
		const gz = gzipSync(data, { level: config.gzipLevel });
		if (gz.length < size) {
			fs.writeFileSync(`${fullPath}.gz`, gz);
			gzTotalBytes += gz.length;
		}
	}
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;

const parts = [];
if (config.output === "both" || config.output === "brotli") {
	parts.push(
		`brotli ${mb(brTotalBytes)} (-${((1 - brTotalBytes / totalBytes) * 100).toFixed(1)}%)`,
	);
}
if (config.output === "both" || config.output === "gzip") {
	parts.push(
		`gzip ${mb(gzTotalBytes)} (-${((1 - gzTotalBytes / totalBytes) * 100).toFixed(1)}%)`,
	);
}
console.log(
	`✓ Compressed ${fileCount} files (${mb(totalBytes)}) -> ${parts.join(", ")}`,
);
