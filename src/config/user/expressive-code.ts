import type { ExpressiveCodeConfig } from "../../types/config";

export const userExpressiveCodeConfig: Partial<ExpressiveCodeConfig> = {
	theme: "github-dark", // 代码块主题
	hideDuringThemeTransition: true, // 主题切换时隐藏代码块过渡动画
};
