/**
 * Astro 内容集合定义 - 文章与页面内容的 schema 与加载配置
 */

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postsCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),
		pinned: z.boolean().optional().default(false),
		comment: z.boolean().optional().default(true),
		priority: z.number().optional(),
		author: z.string().optional().default(""),
		sourceLink: z.string().optional().default(""),
		licenseName: z.string().optional().default(""),
		licenseUrl: z.string().optional().default(""),

		/* 页面加密字段 */
		encrypted: z.boolean().optional().default(false),
		password: z.string().optional().default(""),
		passwordHint: z.string().optional().default(""),

		/* 文章别名 */
		alias: z.string().optional(),

		/* Custom permalink - 自定义固定链接，优先级高于 alias */
		permalink: z.string().optional(),

		/* 上一篇标题标题字段 */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),

		/* 下一篇标题标题字段 */
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});
const specCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/spec" }),
	schema: z.object({}),
});
export const collections = {
	posts: postsCollection,
	spec: specCollection,
};
