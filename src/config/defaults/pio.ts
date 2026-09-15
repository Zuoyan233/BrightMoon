import type { PioConfig } from "../../types/config";

export const defaultPioConfig: PioConfig = {
	enable: true, // 启用看板娘（Live2D）
	models: ["/pio/models/mikoto/mikoto.model.json"], // Live2D 模型路径列表
	position: "left", // 看板娘位置："left" 左下角，"right" 右下角
	width: 280, // 看板娘宽度（px）
	height: 310, // 看板娘高度（px）
	mode: "draggable", // 交互模式："draggable" 可拖拽，"fixed" 固定，"auto" 自动
	hiddenOnMobile: true, // 移动端隐藏看板娘
	dialog: {
		// 看板娘对话配置
		welcome: "Welcome to the BrightMoon!", // 欢迎语
		touch: [
			// 触摸时的对话
			"What are you doing?",
			"Do not touch me!",
			"HENTAI!",
			"Don't defile me!",
		],
		home: "Click here to return to the homepage !", // 点击首页时的对话
		skin: ["Have you seen my new outfit ?", "This looks really good !"], // 切换皮肤时的对话
		close: "QWQ , Next see you again~", // 关闭时的对话
		link: "https://github.com/Zuoyan233/BrightMoon", // 点击看板娘跳转链接
	},
};
