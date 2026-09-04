import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const USER_CONFIG_PATH = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"../src/config/user.ts",
);
const DEFAULTS_CONFIG_PATH = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"../src/config/defaults.ts",
);

async function tryReadModeFromFile(filePath) {
	try {
		const configContent = await fs.readFile(filePath, "utf-8");
		const match = configContent.match(
			/anime:\s*\{[^{}]*?mode:\s*["']([^"']*)["']/,
		);
		if (!match) return null;
		// 模式为空时直接使用 local
		return match[1] === "" ? "local" : match[1];
	} catch {
		return null;
	}
}

async function getAnimeModeFromConfig() {
	const userMode = await tryReadModeFromFile(USER_CONFIG_PATH);
	if (userMode) return userMode;
	const defaultMode = await tryReadModeFromFile(DEFAULTS_CONFIG_PATH);
	if (defaultMode) return defaultMode;
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
