/**
 * 日历数据 API - 返回文章发布日期的 JSON 数据
 */

import { getSortedPosts } from "../../utils/content-utils";

// 获取所有文章的发布日期
export async function GET() {
	// 获取所有文章
	const posts = await getSortedPosts();

	// 提取所有文章的发布日期
	const allPostsData = posts.map((post) => {
		const date = new Date(post.data.published);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");

		return {
			id: post.id,
			title: post.data.title,
			date: `${year}-${month}-${day}`,
		};
	});

	// 返回 JSON 数据
	return new Response(JSON.stringify(allPostsData), {
		headers: {
			"Content-Type": "application/json",
		},
	});
}
