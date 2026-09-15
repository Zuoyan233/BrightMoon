import type { SakuraConfig } from "../../types/config";

export const defaultSakuraConfig: SakuraConfig = {
	enable: true, // 启用樱花飘落特效
	uiDefaultEnabled: false, // UI 默认启用状态
	sakuraNum: 10, // 同时飘落的樱花数量
	limitTimes: -1, // 飘落次数限制，-1 为无限
	size: {
		min: 0.5, // 最小尺寸
		max: 1.1, // 最大尺寸
	},
	opacity: {
		min: 0.3, // 最小透明度
		max: 0.9, // 最大透明度
	},
	speed: {
		horizontal: {
			min: -1.7, // 水平最小速度
			max: -1.2, // 水平最大速度
		},
		vertical: {
			min: 1.5, // 垂直最小速度
			max: 2.2, // 垂直最大速度
		},
		rotation: 0.03, // 旋转速度
		fadeSpeed: 0.03, // 淡出速度
	},
	zIndex: 100, // 层级
};
