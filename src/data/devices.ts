// 设备数据配置文件
// 用于管理设备展示页面的数据

export interface Device {
	name: string; // 设备名称
	image: string; // 设备图片路径
	specs: string; // 规格配置
	description: string; // 设备描述
	link: string; // 产品官网链接
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

// 设备数据（此处填写内容）
export const devicesData: DeviceCategory = {
	Xiaomi: [
		{
			name: "Xiaomi 17 Pro Max",
			image: "/images/device/Xiaomi 17 Pro Max.webp",
			specs: "Green / 16G + 1TB",
			description:
				"Snapdragon 8 Elite Gen 5 Mobile Platform, Leica Master Imaging, Xiaomi Jinsha River Battery, Smart Back Display.",
			link: "https://www.mi.com/prod/xiaomi-17-pro-max",
		},
	],
};
