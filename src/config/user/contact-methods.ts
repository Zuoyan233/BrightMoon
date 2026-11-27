import type { ContactMethods } from "../../types/config";

export const userContactMethods: Partial<ContactMethods> = [
	// 联系方式配置，支持微信、QQ、Telegram 等
	{
		method: "wechat", // 联系方式方法
		label: "WeChat", // 显示名称
		icon: "simple-icons:wechat", // 图标名称，格式为 "simple-icons:图标名称"
		qrCode: "/images/contact/wechat friend.webp", // 图片路径
		account: "your_wechat_id", // 社交好友账号
		link: "", // 外部链接
		tip: "Scan the QR code to add a WeChat friend.", // 提示文本
	},
	{
		method: "qq",
		label: "QQ",
		icon: "simple-icons:qq",
		qrCode: "/images/contact/qq friend.webp",
		account: "your_qq_number",
		link: "",
		tip: "Scan the QR code to add a QQ friend.",
	},
	{
		method: "telegram",
		label: "Telegram",
		icon: "simple-icons:telegram",
		qrCode: "/images/contact/telegram friend.webp",
		account: "@your_telegram",
		link: "https://t.me/your_telegram",
		tip: "Scan the QR code to add a Telegram friend.",
	},
];
