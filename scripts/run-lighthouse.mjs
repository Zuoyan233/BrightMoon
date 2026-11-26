import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { loadEnv } from "./load-env.js";

loadEnv();

// 检查构建产物是否存在
const distDir = path.resolve(process.cwd(), "dist");
if (!fs.existsSync(distDir)) {
	console.error("\n✗ Dist not found. Please run `pnpm build` first.\n");
	process.exit(1);
}

const browserPath = process.env.CHROME_PATH;
if (!browserPath) {
	console.error("\n✗ CHROME_PATH is not set. Please add it to .env\n");
	process.exit(1);
}
if (!fs.existsSync(browserPath)) {
	console.error(`\n✗ CHROME_PATH points to a non-existent file: ${browserPath}\n`);
	process.exit(1);
}

const port = process.argv[2] || "4321";
const url = `http://localhost:${port}/`;

const runs = [
	{ formFactor: "mobile", out: "lighthouse-report-mobile.html" },
	{ formFactor: "desktop", out: "lighthouse-report-desktop.html" },
];

function runLH({ formFactor, out }) {
	return new Promise((resolve, reject) => {
		const args = [
			url,
			"--output=html",
			`--output-path=./${out}`,
			`--form-factor=${formFactor}`,
			"--throttling-method=provided",
		...(formFactor === "desktop"
			? [
					"--screen-emulation.mobile=false",
					"--screen-emulation.width=1350",
					"--screen-emulation.height=940",
					"--screen-emulation.deviceScaleFactor=1",
				]
			: []),
			"--chrome-flags=--headless",
		];
		const child = spawn(`pnpm exec lighthouse ${args.join(" ")}`, {
			stdio: "inherit",
			shell: true,
		});
		child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`lighthouse ${formFactor} exited with ${code}`))));
	});
}

// 等待本地服务器就绪
async function waitServerReady(maxAttempts = 30) {
	for (let i = 0; i < maxAttempts; i++) {
		try {
			const res = await fetch(url, { method: "HEAD" });
			if (res.ok || res.status === 405) return true;
		} catch {
			// 尚未就绪，继续等待
		}
		await new Promise((r) => setTimeout(r, 500));
	}
	return false;
}

// 启动 preview 服务器
const server = spawn(`pnpm exec astro preview --port ${port}`, {
	stdio: "inherit",
	shell: true,
});

let exitCode = 0;
try {
	const ready = await waitServerReady();
	if (!ready) throw new Error(`\n✗ Server not ready at ${url} after timeout\n`);
	console.log(`\nℹ Server ready at ${url}, starting Lighthouse tests in 5 seconds...`);
	await new Promise((r) => setTimeout(r, 5000));
	for (const r of runs) {
		console.log(`\nℹ Running Lighthouse (${r.formFactor})`);
		await runLH(r);
	}
	console.log(`\n✓ Done. Reports: ${runs.map((r) => r.out).join(", ")}`);
} catch (e) {
	console.error(e.message);
	exitCode = 1;
} finally {
	// 关闭 preview 服务器进程树（Windows 下 shell:true 需要整个进程树终止）
	if (process.platform === "win32") {
		spawn("taskkill", ["/pid", String(server.pid), "/f", "/t"]);
	} else {
		server.kill("SIGTERM");
	}
}
process.exit(exitCode);
