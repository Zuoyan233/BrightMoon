/**
 * RSS 订阅源生成 - 输出 RSS 2.0 格式的文章订阅源
 */

import { getImage } from "astro:assets";
// import { getCollection } from "astro:content";
import type { RSSFeedItem } from "@astrojs/rss";
import rss from "@astrojs/rss";
import type { APIContext, ImageMetadata } from "astro";
import MarkdownIt from "markdown-it";
import { parse as htmlParser } from "node-html-parser";
import sanitizeHtml from "sanitize-html";
import { siteConfig } from "@/config";
import { getSortedPosts } from "@/utils/content-utils";
import { initPostIdMap } from "@/utils/permalink-utils";
import { getPostUrl } from "@/utils/url-utils";

const markdownParser = new MarkdownIt();

// 动态导入图片集合
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
	"/src/content/**/*.{jpeg,jpg,png,gif,webp}", // include posts and assets
);

export async function GET(context: APIContext) {
	if (!context.site) {
		throw Error("site not set");
	}

	// 使用与站点列表相同的排序（置顶优先，然后按发布日期降序）
	const posts = (await getSortedPosts()).filter((post) => !post.data.encrypted);

	// 初始化文章 ID 映射（用于 permalink 功能）
	initPostIdMap(posts);

	const feed: RSSFeedItem[] = [];

	for (const post of posts) {
		const body = markdownParser.render(String(post.body ?? ""));
		const html = htmlParser.parse(body);
		const images = html.querySelectorAll("img");

		for (const img of images) {
			const src = img.getAttribute("src");
			if (!src) continue;

			if (
				src.startsWith("./") ||
				src.startsWith("../") ||
				(!src.startsWith("http") && !src.startsWith("/"))
			) {
				let importPath: string | null = null;

				if (src.startsWith("./")) {
					const prefixRemoved = src.slice(2);
					const postPath = post.id; // This gives us the full path like "bestimageapi/index.md"
					const postDir = postPath.includes("/") ? postPath.split("/")[0] : "";

					if (postDir) {
						importPath = `/src/content/posts/${postDir}/${prefixRemoved}`;
					} else {
						importPath = `/src/content/posts/${prefixRemoved}`;
					}
				} else if (src.startsWith("../")) {
					// 如 ../assets/images/xxx -> 相对于 /src/content/
					const cleaned = src.replace(/^\.\.\//, "");
					importPath = `/src/content/${cleaned}`;
				} else {
					// 直接文件名（无 ./ 前缀）- 假定与文章在同一目录
					const postPath = post.id; // 完整路径如 "bestimageapi/index.md"
					const postDir = postPath.includes("/") ? postPath.split("/")[0] : "";

					if (postDir) {
						importPath = `/src/content/posts/${postDir}/${src}`;
					} else {
						importPath = `/src/content/posts/${src}`;
					}
				}

				const imageMod = await imagesGlob[importPath]?.()?.then(
					(res) => res.default,
				);
				if (imageMod) {
					const optimizedImg = await getImage({ src: imageMod });
					img.setAttribute("src", new URL(optimizedImg.src, context.site).href);
				} else {
					console.log(
						`Failed to load image: ${importPath} for post: ${post.id}`,
					);
				}
			} else if (src.startsWith("/")) {
				img.setAttribute("src", new URL(src, context.site).href);
			}
		}

		feed.push({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.published,
			link: getPostUrl(post),
			// 对修正图片路径后的 HTML 进行安全过滤
			content: sanitizeHtml(html.toString(), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
			}),
		});
	}

	return rss({
		title: siteConfig.title,
		description: siteConfig.subtitle || "No description",
		site: context.site,
		items: feed,
		customData: `<language>${siteConfig.lang}</language>`,
	});
}
