import type { UmamiConfig } from "../../types/config";

export const defaultUmamiConfig: UmamiConfig = {
	enabled: false, // 启用 Umami 统计
	apiKey: import.meta.env.UMAMI_API_KEY || "api_xxxxxxxx", // Umami API Key，从环境变量获取
	baseUrl: "https://api.umami.is", // Umami API 基础 URL
	scripts: `
<script defer src="XXXX.XXX" data-website-id="ABCD1234"></script>
  `.trim(), // Umami 跟踪脚本，请替换为你的实际脚本
};
