/**
 * Atom 订阅源生成 - 输出 Atom 1.0 格式的文章订阅源
 */

import { getImage } from "astro:assets";
// import { getCollection } from "astro:content";
import type { APIContext, ImageMetadata } from "astro";
import MarkdownIt from "markdown-it";
import { parse as htmlParser } from "node-html-parser";
import sanitizeHtml from "sanitize-html";
import { profileConfig, siteConfig } from "@/config";
import { getSortedPosts } from "@/utils/content-utils";
import { initPostIdMap } from "@/utils/permalink-utils";
import { getPostUrl } from "@/utils/url-utils";

const markdownParser = new MarkdownIt();

// 动态导入图片集合
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
	"/src/content/**/*.{jpeg,jpg,png,gif,webp}",
);

export async function GET(context: APIContext) {
	if (!context.site) {
		throw Error("site not set");
	}

	// 过滤掉加密文章和草稿文章
	const posts = (await getSortedPosts()).filter(
		(post) => !post.data.encrypted && post.data.draft !== true,
	);

	// 初始化文章 ID 映射（用于 permalink 功能）
	initPostIdMap(posts);

	// 创建Atom feed头部
	let atomFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${siteConfig.title}</title>
  <subtitle>${siteConfig.subtitle || "No description"}</subtitle>
  <link href="${context.site}" rel="alternate" type="text/html"/>
  <link href="${new URL("atom.xml", context.site)}" rel="self" type="application/atom+xml"/>
  <id>${context.site}</id>
  <updated>${new Date().toISOString()}</updated>
  <language>${siteConfig.lang}</language>`;

	for (const post of posts) {
		// 将 Markdown 渲染为 HTML
		const body = markdownParser.render(String(post.body ?? ""));
		// 解析 HTML 为 DOM 结构以便查找图片
		const html = htmlParser.parse(body);
		// 获取所有 img 标签
		const images = html.querySelectorAll("img");

		for (const img of images) {
			const src = img.getAttribute("src");
			if (!src) continue;

			// 处理内容相对路径图片，转换为构建后的 _astro 路径
			if (
				src.startsWith("./") ||
				src.startsWith("../") ||
				(!src.startsWith("http") && !src.startsWith("/"))
			) {
				let importPath: string | null = null;

				if (src.startsWith("./")) {
					// 相对于文章文件目录的路径
					const prefixRemoved = src.slice(2);
					const postPath = post.id;
					const postDir = postPath.includes("/") ? postPath.split("/")[0] : "";

					if (postDir) {
						// 子目录中的文章
						importPath = `/src/content/posts/${postDir}/${prefixRemoved}`;
					} else {
						// 直接在 posts 目录中的文章
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
						// 子目录中的文章
						importPath = `/src/content/posts/${postDir}/${src}`;
					} else {
						// 直接在 posts 目录中的文章
						importPath = `/src/content/posts/${src}`;
					}
				}

				// 通过 glob 映射加载并优化图片
				const imageMod = await imagesGlob[importPath]?.()?.then(
					(res) => res.default,
				);
				if (imageMod) {
					// 成功加载：替换为优化后的绝对 URL
					const optimizedImg = await getImage({ src: imageMod });
					img.setAttribute("src", new URL(optimizedImg.src, context.site).href);
				} else {
					// 调试：记录失败的导入路径
					console.log(
						`Failed to load image: ${importPath} for post: ${post.id}`,
					);
				}
			} else if (src.startsWith("/")) {
				// 以 `/` 开头的图片位于 public 目录
				img.setAttribute("src", new URL(src, context.site).href);
			}
		}

		// 添加Atom条目
		const postUrl = new URL(getPostUrl(post), context.site).href;
		// 对修正图片路径后的 HTML 进行安全过滤
		const content = sanitizeHtml(html.toString(), {
			allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
		});

		atomFeed += `
  <entry>
    <title>${post.data.title}</title>
    <link href="${postUrl}" rel="alternate" type="text/html"/>
    <id>${postUrl}</id>
    <published>${post.data.published.toISOString()}</published>
    <updated>${post.data.updated?.toISOString() || post.data.published.toISOString()}</updated>
    <summary>${post.data.description || ""}</summary>
    <content type="html"><![CDATA[${content}]]></content>
    <author>
      <name>${profileConfig.name}</name>
    </author>`;

		// 添加分类标签
		if (post.data.category) {
			atomFeed += `
    <category term="${post.data.category}"></category>`;
		}

		atomFeed += `
  </entry>`;
	}

	// 关闭 Atom feed
	atomFeed += `
</feed>`;

	return new Response(atomFeed, {
		headers: {
			"Content-Type": "application/atom+xml; charset=utf-8",
		},
	});
}
