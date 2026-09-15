import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CONFIG_DIR = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"../src/config",
);

async function readAllConfigContents() {
	const dirs = ["user", "defaults"];
	const contents = [];
	for (const dir of dirs) {
		const dirPath = path.join(CONFIG_DIR, dir);
		try {
			const files = await fs.readdir(dirPath);
			for (const file of files.filter(
				(f) => f.endsWith(".ts") && f !== "index.ts",
			)) {
				contents.push(await fs.readFile(path.join(dirPath, file), "utf-8"));
			}
		} catch {}
	}
	return contents;
}

async function getAnimeModeFromConfig() {
	const modeRegex = /anime:\s*\{[^{}]*?mode:\s*["']([^"']*)["']/;
	for (const content of await readAllConfigContents()) {
		const match = content.match(modeRegex);
		if (match) return match[1] === "" ? "local" : match[1];
	}
	return "local";
}

function runScript(scriptPath) {
	return new Promise((resolve, reject) => {
		const script = spawn("node", [scriptPath], {
			stdio: "inherit",
			shell: false,
		});

		script.on("close", (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`Script exited with code ${code}`));
			}
		});

		script.on("error", (err) => {
			reject(err);
		});
	});
}

async function main() {
	const mode = await getAnimeModeFromConfig();
	const scriptsDir = path.dirname(fileURLToPath(import.meta.url));

	if (mode === "bilibili") {
		console.log("Detected anime mode: bilibili, running update-bilibili.mjs\n");
		await runScript(path.join(scriptsDir, "update-bilibili.mjs"));
	} else if (mode === "bangumi") {
		console.log("Detected anime mode: bangumi, running update-bangumi.mjs\n");
		await runScript(path.join(scriptsDir, "update-bangumi.mjs"));
	} else {
		console.log(`Anime mode is "${mode}", skipping data update.\n`);
	}
}

main().catch((err) => {
	console.error("\n✘ Script execution error:");
	console.error(err);
	process.exit(1);
});
