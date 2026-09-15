import type { CommentConfig } from "../../types/config";
import { SITE_LANG } from "./constants";

export const defaultCommentConfig: CommentConfig = {
	enable: false, // 启用评论功能
	twikoo: {
		envId: "https://example-twikoo.top/", // Twikoo 环境 ID，部署后请替换为你的 Twikoo 服务地址
		lang: SITE_LANG, // 评论语言，跟随站点语言设置
	},
};
