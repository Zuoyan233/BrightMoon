// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

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
