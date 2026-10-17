import type { DevicesDataConfig } from "../../types/config";

// 设备数据默认配置
export const defaultDevicesDataConfig: DevicesDataConfig = {
	// 设备分类：键名为分类名称，值为该分类下的设备配置列表
	Xiaomi: [
		{
			name: "Xiaomi 17 Pro Max", // 设备名称
			image: "/images/device/Xiaomi 17 Pro Max.webp", // 设备图片路径
			specs: "Green / 16G + 1TB", // 规格配置
			description:
				"Snapdragon 8 Elite Gen 5 Mobile Platform, Leica Master Imaging, Xiaomi Jinsha River Battery, Smart Back Display.", // 设备描述
			link: "https://www.mi.com/prod/xiaomi-17-pro-max", // 产品官网链接
		},
	],
};
