/**
 * OG 图片生成 - 为每篇文章生成 Open Graph 社交分享图
 */

import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import * as fs from "node:fs";
import type { APIContext, GetStaticPaths } from "astro";
import satori from "satori";
import sharp from "sharp";
import { removeFileExtension } from "@/utils/url-utils";

import { profileConfig, siteConfig } from "../../config";

// 定义字体权重和样式
type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type FontStyle = "normal" | "italic";
interface FontOptions {
	data: Buffer | ArrayBuffer;
	name: string;
	weight?: Weight;
	style?: FontStyle;
	lang?: string;
}

// 预渲染所有文章的 OG 图片
export const prerender = true;

// 生成所有文章的 OG 图片
export const getStaticPaths: GetStaticPaths = async () => {
	if (!siteConfig.generateOgImages) {
		return [];
	}

	const allPosts = await getCollection("posts");
	const publishedPosts = allPosts.filter((post) => !post.data.draft);

	return publishedPosts.map((post) => {
		// 将 id 转换为 slug（移除扩展名）以匹配路由参数
		const slug = removeFileExtension(post.id);
		return {
			params: { slug },
			props: { post },
		};
	});
};

// 缓存字体文件
let fontCache: { regular: Buffer | null; bold: Buffer | null } | null = null;

// 从 Google Fonts 获取 Noto Sans SC 字体
async function fetchNotoSansSCFonts() {
	if (fontCache) {
		return fontCache;
	}

	try {
		const cssResp = await fetch(
			"https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap",
		);
		if (!cssResp.ok) throw new Error("Failed to fetch Google Fonts CSS");
		const cssText = await cssResp.text();

		const getUrlForWeight = (weight: number) => {
			const blockRe = new RegExp(
				`@font-face\\s*{[^}]*font-weight:\\s*${weight}[^}]*}`,
				"g",
			);
			const match = cssText.match(blockRe);
			if (!match || match.length === 0) return null;
			const urlMatch = match[0].match(/url\((https:[^)]+)\)/);
			return urlMatch ? urlMatch[1] : null;
		};

		const regularUrl = getUrlForWeight(400);
		const boldUrl = getUrlForWeight(700);

		if (!regularUrl || !boldUrl) {
			console.warn(
				"Could not find font urls in Google Fonts CSS; falling back to no fonts.",
			);
			fontCache = { regular: null, bold: null };
			return fontCache;
		}

		const [rResp, bResp] = await Promise.all([
			fetch(regularUrl),
			fetch(boldUrl),
		]);
		if (!rResp.ok || !bResp.ok) {
			console.warn(
				"Failed to download font files from Google; falling back to no fonts.",
			);
			fontCache = { regular: null, bold: null };
			return fontCache;
		}

		const rBuf = Buffer.from(await rResp.arrayBuffer());
		const bBuf = Buffer.from(await bResp.arrayBuffer());

		fontCache = { regular: rBuf, bold: bBuf };
		return fontCache;
	} catch (err) {
		console.warn("Error fetching fonts:", err);
		fontCache = { regular: null, bold: null };
		return fontCache;
	}
}

// 生成 OG 图片
export async function GET({
	props,
}: APIContext<{ post: CollectionEntry<"posts"> }>) {
	const { post } = props;

	// 运行时从 Google Fonts 获取字体（woff2 格式）
	const { regular: fontRegular, bold: fontBold } = await fetchNotoSansSCFonts();

	// 头像和图标：从磁盘读取（小资源）
	const avatarBuffer = fs.readFileSync(`./src/${profileConfig.avatar}`);
	const avatarBase64 = `data:image/png;base64,${avatarBuffer.toString("base64")}`;

	let iconPath = "./public/favicon/favicon.ico";
	if (siteConfig.favicon.length > 0) {
		iconPath = `./public${siteConfig.favicon[0].src}`;
	}

	// 读取图标文件
	const iconBuffer = fs.readFileSync(iconPath);
	const iconBase64 = `data:image/png;base64,${iconBuffer.toString("base64")}`;

	// 颜色方案
	const hue = siteConfig.appearance.hue;
	const primaryColor = `hsl(${hue}, 90%, 65%)`;
	const textColor = "hsl(0, 0%, 95%)";

	// 文字颜色
	const subtleTextColor = `hsl(${hue}, 10%, 75%)`;
	const backgroundColor = `hsl(${hue}, 15%, 12%)`;

	// 文章发布日期
	const pubDate = post.data.published.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	// 文章描述
	const description = post.data.description;

	// 定义 SVG 模板
	const template = {
		type: "div",
		props: {
			style: {
				height: "100%", // 图片高度
				width: "100%", // 图片宽度
				display: "flex", // 垂直居中
				flexDirection: "column", // 垂直居中
				backgroundColor: backgroundColor, // 背景颜色
				fontFamily:
					'"Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // 字体
				padding: "60px", // 内边距
			},

			// 文字叠加
			children: [
				{
					type: "div", // 文字叠加容器
					props: {
						style: {
							width: "100%", // 文字叠加容器宽度
							display: "flex", // 垂直居中
							alignItems: "center", // 垂直居中
							gap: "20px", // 文字叠加容器间距
						},
						children: [
							{
								type: "img", // 文字叠加图标
								props: {
									src: iconBase64, // 文字叠加图标
									width: 48, // 文字叠加图标宽度
									height: 48, // 文字叠加图标高度
									style: { borderRadius: "10px" }, // 文字叠加图标圆角
								},
							},
							{
								type: "div", // 文字叠加标题
								props: {
									style: {
										fontSize: "36px", // 文字叠加标题字体大小
										fontWeight: 600, // 文字叠加标题字体粗细
										color: subtleTextColor, // 文字叠加标题字体颜色
									},
									children: siteConfig.title, // 文字叠加标题内容
								},
							},
						],
					},
				},

				{
					type: "div", // 文字叠加内容
					props: {
						style: {
							display: "flex", // 垂直居中
							flexDirection: "column", // 垂直居中
							justifyContent: "center", // 垂直居中
							flexGrow: 1, // 文字叠加内容宽度
							gap: "20px", // 文字叠加内容间距
						},
						children: [
							{
								type: "div", // 文字叠加内容标题
								props: {
									style: {
										display: "flex", // 垂直居中
										alignItems: "flex-start", // 垂直居中
									},
									children: [
										{
											type: "div", // 文字叠加内容标题线
											props: {
												style: {
													width: "10px", // 文字叠加内容标题线宽度
													height: "68px", // 文字叠加内容标题线高度
													backgroundColor: primaryColor, // 文字叠加内容标题线颜色
													borderRadius: "6px", // 文字叠加内容标题线圆角
													marginTop: "14px", // 文字叠加内容标题线间距
												},
											},
										},
										{
											type: "div", // 文字叠加内容标题文字
											props: {
												style: {
													fontSize: "72px", // 文字叠加内容标题文字字体大小
													fontWeight: 700, // 文字叠加内容标题文字字体粗细
													lineHeight: 1.2, // 文字叠加内容标题文字行高
													color: textColor, // 文字叠加内容标题文字字体颜色
													marginLeft: "25px", // 文字叠加内容标题文字间距
													display: "-webkit-box", // 文字叠加内容标题文字显示模式
													overflow: "hidden", // 文字叠加内容标题文字溢出处理
													textOverflow: "ellipsis", // 文字叠加内容标题文字溢出处理
													lineClamp: 3, // 文字叠加内容标题文字行数
													WebkitLineClamp: 3, // 文字叠加内容标题文字行数
													WebkitBoxOrient: "vertical", // 文字叠加内容标题文字方向
												},
												children: post.data.title, // 文字叠加内容标题文字内容
											},
										},
									],
								},
							},
							description && {
								type: "div", // 文字叠加内容描述
								props: {
									style: {
										fontSize: "32px", // 文字叠加内容描述字体大小
										lineHeight: 1.5, // 文字叠加内容描述行高
										color: subtleTextColor, // 文字叠加内容描述字体颜色
										paddingLeft: "35px", // 文字叠加内容描述内边距
										display: "-webkit-box", // 文字叠加内容描述显示模式
										overflow: "hidden", // 文字叠加内容描述溢出处理
										textOverflow: "ellipsis", // 文字叠加内容描述溢出处理
										lineClamp: 2, // 文字叠加内容描述行数
										WebkitLineClamp: 2, // 文字叠加内容描述行数
										WebkitBoxOrient: "vertical", // 文字叠加内容描述方向
									},
									children: description, // 文字叠加内容描述内容
								},
							},
						],
					},
				},
				{
					type: "div", // 文字叠加内容作者发布时间
					props: {
						style: {
							display: "flex", // 垂直居中
							justifyContent: "space-between", // 垂直居中
							alignItems: "center", // 垂直居中
							width: "100%", // 文字叠加容器宽度
						},
						children: [
							{
								type: "div", // 文字叠加内容作者
								props: {
									style: {
										display: "flex", // 垂直居中
										alignItems: "center", // 垂直居中
										gap: "20px", // 文字叠加内容作者间距间距
									},
									children: [
										{
											type: "img", // 文字叠加内容作者头像
											props: {
												src: avatarBase64, // 文字叠加内容作者头像
												width: 60, // 文字叠加内容作者头像宽度
												height: 60, // 文字叠加内容作者头像高度
												style: { borderRadius: "50%" }, // 文字叠加内容作者头像圆角
											},
										},
										{
											type: "div", // 文字叠加内容作者文字
											props: {
												style: {
													fontSize: "28px", // 文字叠加内容作者文字字体大小
													fontWeight: 600, // 文字叠加内容作者文字字体粗细
													color: textColor, // 文字叠加内容作者文字字体颜色
												},
												children: profileConfig.name, // 文字叠加内容作者文字内容
											},
										},
									],
								},
							},
							{
								type: "div", // 文字叠加内容发布时间
								props: {
									style: {
										fontSize: "28px", // 文字叠加内容发布时间字体大小
										color: subtleTextColor, // 文字叠加内容发布时间字体颜色
									},
									children: pubDate, // 文字叠加内容发布时间内容
								},
							},
						],
					},
				},
			],
		},
	};

	// 加载字体
	const fonts: FontOptions[] = [];
	if (fontRegular) {
		fonts.push({
			name: "Noto Sans SC",
			data: fontRegular,
			weight: 400,
			style: "normal",
		});
	}
	if (fontBold) {
		fonts.push({
			name: "Noto Sans SC",
			data: fontBold,
			weight: 700,
			style: "normal",
		});
	}

	// 渲染 SVG 图片
	const svg = await satori(template, {
		width: 1200,
		height: 630,
		fonts,
	});

	// 转换为 PNG 格式
	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	// 返回 PNG 图片
	return new Response(new Uint8Array(png), {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
