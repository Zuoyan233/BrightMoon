import type { AddpaymentConfig } from "../../types/config";

export const defaultAddpaymentConfig: AddpaymentConfig = {
	methods: [
		{
			name: "Alipay", // 支付方式名称
			icon: "simple-icons:alipay", // 图标名称，支持 astro-icon，例如 "simple-icons:alipay"
			qrCode: "/images/sponsors/alipay.webp", // 支付码图片路径
			color: "bg-blue-500", // 图标背景色，例如 "bg-blue-500"
		},
		{
			name: "WeChat",
			icon: "simple-icons:wechat",
			qrCode: "/images/sponsors/wechat pay.webp",
			color: "bg-green-500",
		},
	],
};
