import type { SidebarLayoutConfig } from "../../types/config";
import { defaultSiteConfig } from "./site";
import { defaultWeatherConfig } from "./weather";

export const defaultSidebarLayoutConfig: SidebarLayoutConfig = {
	position: "both", // 侧边栏位置："left" 仅左侧，"right" 仅右侧，"both" 双侧

	components: [
		// 侧边栏组件配置，按 order 排序
		{
			type: "profile", // 个人资料组件
			enable: true,
			order: 1,
			position: "top", // 位置："top" 顶部，"sticky" 粘性
			sidebar: "left", // 所属侧边栏："left" 左侧，"right" 右侧
			class: "onload-animation", // CSS 类名
			animationDelay: 0, // 动画延迟（毫秒）
		},
		{
			type: "announcement", // 公告组件
			enable: true,
			order: 2,
			position: "top",
			sidebar: "left",
			class: "onload-animation",
			animationDelay: 50,
		},
		{
			type: "categories", // 分类组件
			enable: true,
			order: 3,
			position: "top",
			sidebar: "left",
			class: "onload-animation",
			animationDelay: 150,
			responsive: {
				collapseThreshold: 5, // 超过此数量时折叠
			},
		},
		{
			type: "tags", // 标签组件
			enable: true,
			order: 4,
			position: "top",
			sidebar: "left",
			class: "onload-animation",
			animationDelay: 250,
			responsive: {
				collapseThreshold: 20,
			},
		},
		{
			type: "toc", // 目录组件
			enable: defaultSiteConfig.toc.enable,
			order: 5,
			position: "sticky",
			sidebar: "left",
			class: "onload-animation",
			animationDelay: 300,
		},
		{
			type: "site-stats", // 站点统计组件
			enable: true,
			order: 6,
			position: "sticky",
			sidebar: "right",
			class: "onload-animation",
			animationDelay: 200,
		},
		{
			type: "calendar", // 日历组件
			enable: true,
			order: 7,
			position: "sticky",
			sidebar: "right",
			class: "onload-animation",
			animationDelay: 250,
		},
		{
			type: "weather", // 天气组件
			enable: defaultWeatherConfig.enable,
			order: 4,
			position: "top",
			sidebar: "left",
			class: "onload-animation",
			animationDelay: 300,
		},
	],

	defaultAnimation: {
		// 默认动画配置
		enable: true, // 启用入场动画
		baseDelay: 0, // 基础延迟（毫秒）
		increment: 50, // 每个组件递增延迟（毫秒）
	},

	responsive: {
		// 响应式配置
		breakpoints: {
			mobile: 744, // 移动端断点（px）
			tablet: 1280, // 平板端断点（px）
			desktop: 1280, // 桌面端断点（px）
		},
		layout: {
			mobile: "sidebar", // 移动端布局
			tablet: "sidebar", // 平板端布局
			desktop: "sidebar", // 桌面端布局
		},
	},
};
