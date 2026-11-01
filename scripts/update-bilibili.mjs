import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import axios from "axios";

//	Bilibili API 基础 URL
const API_BASE = "https://api.bilibili.com/x/space/bangumi/follow/list";
const PAGE_SIZE = 30;
const CONFIG_DIR = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"../src/config",
);

// 输出文件路径
const OUTPUT_FILE = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"../src/config/user/bilibili-data.json",
);

// 状态映射: 1=想看, 2=在看, 3=已看
const STATUS_MAP = {
	1: "planned",
	2: "watching",
	3: "completed",
};

// 延迟函数
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 带重试机制的请求
async function withRetry(apiCall, retries = 3) {
	for (let i = 0; i < retries; i++) {
		try {
			return await apiCall();
		} catch (error) {
			if (i === retries - 1) throw error;
			await delay(1000);
			console.warn(`Request failed, retrying attempt ${i + 1}...`);
		}
	}
}

// 读取所有配置文件内容
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

// 匹配配置文件中的正则表达式
async function matchConfig(regex) {
	for (const content of await readAllConfigContents()) {
		const match = content.match(regex);
		if (match) return match;
	}
	return null;
}

// 从配置文件中获取用户 ID
async function getUserIdFromConfig() {
	const vmidRegex =
		/anime:\s*\{[\s\S]*?bilibili:\s*\{[\s\S]*?vmId:\s*["']([^"']+)["']/;

	const match = await matchConfig(vmidRegex);
	if (match && match[1] !== "your-bilibili-id" && match[1].trim() !== "") {
		return match[1];
	}

	throw new Error("Could not find anime.bilibili.vmId in config files");
}

// 从配置文件中获取 SESSDATA
async function getSessdataFromConfig() {
	const regex =
		/anime:\s*\{[\s\S]*?bilibili:\s*\{[\s\S]*?SESSDATA:\s*["']([^"']*)["']/;

	const match = await matchConfig(regex);
	return match ? match[1] : "";
}

// 从配置文件中获取封面镜像
async function getCoverMirrorFromConfig() {
	const regex =
		/anime:\s*\{[\s\S]*?bilibili:\s*\{[\s\S]*?coverMirror:\s*["']([^"']*)["']/;

	const match = await matchConfig(regex);
	return match ? match[1] : "";
}

// 从配置文件中获取是否使用 WebP 格式
async function getUseWebpFromConfig() {
	const regex =
		/anime:\s*\{[\s\S]*?bilibili:\s*\{[\s\S]*?useWebp:\s*(true|false)/;

	const match = await matchConfig(regex);
	return match ? match[1] !== "false" : true;
}

// 从配置文件中获取动画模式
async function getAnimeModeFromConfig() {
	const modeRegex = /anime:\s*\{[^{}]*?mode:\s*["']([^"']*)["']/;

	const match = await matchConfig(modeRegex);
	return match ? match[1] || "local" : "local";
}

// 获取数据页数
async function getDataPage(vmid, status, typeNum = 1) {
	const response = await withRetry(() =>
		axios.get(
			`${API_BASE}?type=${typeNum}&follow_status=${status}&vmid=${vmid}&ps=1&pn=1`,
		),
	);

	if (response?.data?.code === 0 && response?.data?.data?.total !== undefined) {
		return {
			success: true,
			data: Math.ceil(response.data.data.total / PAGE_SIZE) + 1,
		};
	}
	return {
		success: false,
		data: response?.data?.message || "Failed to fetch data",
	};
}

// 获取数据
async function getData(
	vmid,
	status,
	typeNum,
	pn,
	useWebp,
	coverMirror,
	SESSDATA,
) {
	const headers = SESSDATA ? { cookie: `SESSDATA=${SESSDATA};` } : {};

	const response = await withRetry(() =>
		axios.get(
			`${API_BASE}?type=${typeNum}&follow_status=${status}&vmid=${vmid}&ps=${PAGE_SIZE}&pn=${pn}`,
			{ headers },
		),
	);

	if (response?.data?.code !== 0) {
		throw new Error(
			`Failed to fetch data: ${response?.data?.message || "Unknown error"}\n`,
		);
	}

	return (response?.data?.data?.list || []).map((bangumi) => {
		// 处理封面图
		let cover = bangumi?.cover || "";
		if (cover) {
			try {
				// 确保使用 https
				if (cover.startsWith("http://")) {
					cover = cover.replace("http://", "https://");
				}
				// 如果需要使用镜像源
				if (coverMirror) {
					cover = `${coverMirror}${cover}`;
				}
				// 如果需要WebP格式
				if (useWebp && !cover.includes("@")) {
					try {
						const urlObj = new URL(cover);
						// 如果路径中还没有尺寸参数，添加WebP优化参数
						if (!urlObj.pathname.includes("@")) {
							urlObj.pathname += "@220w_280h.webp";
							cover = urlObj.toString();
							if (coverMirror) {
								cover = `${coverMirror}${cover}`;
							}
						}
					} catch {
						// URL解析失败，使用原始封面
					}
				}
			} catch {
				// URL处理失败，使用原始封面
			}
		}

		// 处理观看进度
		let progress = 0;
		if (bangumi?.progress) {
			// progress可能是字符串如"1/14"或数字或空字符串
			if (typeof bangumi.progress === "string" && bangumi.progress.trim()) {
				const progressMatch = bangumi.progress.match(/(\d+)/);
				if (progressMatch) {
					progress = Number.parseInt(progressMatch[1], 10) || 0;
				}
			} else if (typeof bangumi.progress === "number") {
				progress = bangumi.progress;
			}
		}

		// 总集数
		const totalEpisodes = bangumi?.total_count || 0;
		const progressPercent =
			totalEpisodes > 0 && progress > 0
				? Math.round((progress / totalEpisodes) * 100)
				: 0;

		// 描述（从evaluate或summary字段获取）
		let description = bangumi?.evaluate || bangumi?.summary || "";
		// 清理描述中的特殊字符和换行
		if (description) {
			description = description
				.replace(/\u003c/g, "<")
				.replace(/\u003e/g, ">")
				.replace(/\n/g, " ")
				.trim();
		}

		// 提取年份（从发布时间或发布日期）
		let year = "";
		if (bangumi?.publish?.release_date) {
			// 优先使用release_date，格式如 "2018-07-08"
			const dateMatch = bangumi.publish.release_date.match(/^(\d{4})/);
			if (dateMatch) {
				year = dateMatch[1];
			}
		} else if (bangumi?.publish?.pub_time) {
			// 如果release_date不存在，使用pub_time，格式如 "2018-07-08 00:30:00"
			const dateMatch = bangumi.publish.pub_time.match(/^(\d{4})/);
			if (dateMatch) {
				year = dateMatch[1];
			}
		}

		// 提取地区/制作信息（作为studio）
		let studio = "";
		if (bangumi?.areas && bangumi.areas.length > 0) {
			studio = bangumi.areas[0].name || "";
		}

		// 提取类型/标签（使用styles数组）
		const genre = [];
		if (bangumi?.styles && Array.isArray(bangumi.styles)) {
			// 使用styles作为genre
			genre.push(...bangumi.styles);
		}
		// 如果没有styles，使用season_type_name作为备选
		if (genre.length === 0 && bangumi?.season_type_name) {
			genre.push(bangumi.season_type_name);
		}
		// 如果还是没有，使用"未知"
		if (genre.length === 0) {
			genre.push("Unknown");
		}

		// 构建链接（优先使用url字段，否则使用season_id）
		let link = "#";
		if (bangumi?.url) {
			link = bangumi.url;
		} else if (bangumi?.season_id) {
			link = `https://www.bilibili.com/bangumi/play/ss${bangumi.season_id}`;
		} else if (bangumi?.media_id) {
			link = `https://www.bilibili.com/bangumi/media/md${bangumi.media_id}/`;
		}

		// 返回处理后的数据
		return {
			title: bangumi?.title || "Unknown",
			status: STATUS_MAP[status] || "planned",
			rating: bangumi?.rating?.score
				? Number.parseFloat(bangumi.rating.score.toFixed(1))
				: 0,
			cover: cover,
			description: description,
			year: year,
			studio: studio,
			genre: genre,
			link: link,
			progress: progress,
			totalEpisodes: totalEpisodes,
			progressPercent: progressPercent,
		};
	});
}

// 处理数据
async function processData(
	vmid,
	status,
	typeNum,
	useWebp,
	coverMirror,
	SESSDATA,
) {
	const page = await getDataPage(vmid, status, typeNum);
	if (!page?.success) {
		console.error("Get bangumi data error:", page?.data);
		return [];
	}

	const list = [];
	const totalPages = page.data - 1;

	for (let i = 1; i < page.data; i++) {
		process.stdout.write(`ℹ Fetching page ${i}/${totalPages}...\r`);
		const data = await getData(
			vmid,
			status,
			typeNum,
			i,
			useWebp,
			coverMirror,
			SESSDATA,
		);
		list.push(...data);
		await delay(300); // 延迟避免请求过快
	}
	return list;
}

// 主函数
async function main() {
	// 初始化
	console.log("Initializing Bilibili data update script...\n");

	// 从配置文件中获取动画模式
	const animeMode = await getAnimeModeFromConfig();
	if (animeMode !== "bilibili") {
		console.log(
			`Detected current anime mode is "${animeMode}", skipping Bilibili data update.\n`,
		);
		return;
	}

	// 从配置文件中获取用户 ID
	const VMID = await getUserIdFromConfig();
	if (!VMID) {
		console.error(
			"✘ Bilibili vmId is not set. Please set it in src/config/user/site.ts\n",
		);
		process.exit(1);
	}
	console.log(`Read User ID: ${VMID}`);

	const SESSDATA = await getSessdataFromConfig();
	const coverMirror = await getCoverMirrorFromConfig();
	const useWebp = await getUseWebpFromConfig();

	// 获取三种状态的数据 (1=想看, 2=在看, 3=已看)
	console.log("\nFetching Bilibili bangumi data...");
	const planned = await processData(VMID, 1, 1, useWebp, coverMirror, SESSDATA);
	const watching = await processData(
		VMID,
		2,
		1,
		useWebp,
		coverMirror,
		SESSDATA,
	);

	// 获取已看数据
	const completed = await processData(
		VMID,
		3,
		1,
		useWebp,
		coverMirror,
		SESSDATA,
	);

	// 合并所有数据
	const finalAnimeList = [...planned, ...watching, ...completed];

	// 进度输出完成后换行，避免被后续输出覆盖
	console.log("\n");

	const dir = path.dirname(OUTPUT_FILE);
	try {
		await fs.access(dir);
	} catch {
		await fs.mkdir(dir, { recursive: true });
	}

	// 写入数据到文件
	await fs.writeFile(OUTPUT_FILE, JSON.stringify(finalAnimeList, null, 2));
	console.log(`Total collected: ${finalAnimeList.length} anime series:`);
	console.log(`- Planned: ${planned.length}`);
	console.log(`- Watching: ${watching.length}`);
	console.log(`- Completed: ${completed.length}`);
	console.log();
	console.log(`Update complete! Data saved to: ${OUTPUT_FILE}\n`);
}

// 处理异常
main().catch((err) => {
	console.error("\n✘ Script execution error:");
	console.error(err);
	process.exit(1);
});
