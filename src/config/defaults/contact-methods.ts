import type { ContactMethods } from "../../types/config";

export const defaultContactMethods: ContactMethods = [
	// 联系方式配置，支持微信、QQ、Telegram 等
	{
		method: "wechat",
		label: "WeChat",
		icon: "simple-icons:wechat",
		qrCode: "/images/contact/wechat friend.webp", // 二维码图片路径
		account: "your_wechat_id", // 微信号
		link: "",
		tip: "Scan the QR code to add a WeChat friend", // 提示文本
	},
	{
		method: "qq",
		label: "QQ",
		icon: "simple-icons:qq",
		qrCode: "/images/contact/qq friend.webp", // 二维码图片路径
		account: "your_qq_number", // QQ 号
		link: "",
		tip: "Scan the QR code to add a QQ friend",
	},
	{
		method: "telegram",
		label: "Telegram",
		icon: "simple-icons:telegram",
		qrCode: "/images/contact/telegram friend.webp", // 二维码图片路径
		account: "@your_telegram", // Telegram 用户名
		link: "https://t.me/your_telegram", // Telegram 链接
		tip: "Scan the QR code to add a Telegram friend",
	},
];
