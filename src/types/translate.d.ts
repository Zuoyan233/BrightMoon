declare global {
	interface Window {
		translate?: {
			/** 版本号 */
			version: string;
			/** 重置翻译状态，还原已翻译文本。config.selectLanguageRefreshRender 控制是否重绘 select */
			reset: (config?: {
				selectLanguageRefreshRender?: boolean;
				notTranslateTip?: boolean;
			}) => void;
			/** 切换翻译语言，内部自动完成 reset + execute 全流程 */
			changeLanguage: (language: string) => void;
			/** 翻译服务配置 */
			service: {
				use: (service: string) => void;
				name: string;
			};
			/** 语言相关 API */
			language: {
				/** 是否允许翻译本地语言（当目标语言与本地语言相同时需设为 true） */
				translateLocal: boolean;
				/** 设置本地语言（当前网页的原始语言） */
				setLocal: (language: string) => void;
				/** 获取当前翻译目标语言，优先从 storage 读取，回退到 getLocal() */
				getCurrent: () => string;
				/** 获取本地语言 */
				getLocal: () => string;
				/** 设置默认翻译目标语言 */
				setDefaultTo: (language: string) => void;
				/** 本地语言编码 */
				local: string;
				/** 默认翻译目标语言编码 */
				defaultTo: string;
			};
			/** 自动识别用户本地语言 */
			setAutoDiscriminateLocalLanguage: () => void;
			/** 自动识别标记 */
			autoDiscriminateLocalLanguage: boolean;
			/** 忽略翻译的配置 */
			ignore: {
				class: {
					data: string[];
					conditionFunction: Record<string, (element: Element) => boolean>;
					push: (className: string) => void;
				};
				tag: string[];
				id: string[];
				text: string[];
			};
			/** 语言选择标签配置 */
			selectLanguageTag: {
				show: boolean;
				languages: string;
				documentId: string;
				refreshRender?: () => void;
			};
			/** DOM 变化监听器 */
			listener: {
				/** 启用监听（设置 listener.use = true） */
				start: () => void;
				/** MutationObserver 回调 */
				callback?: (mutations: MutationRecord[]) => void;
				/** 手动添加 MutationObserver 监听 */
				addListener?: () => void;
				/** 当前是否已启动监听 */
				isStart?: boolean;
				/** 是否启用监听 */
				use?: boolean;
				/** MutationObserver 实例 */
				observer?: MutationObserver | null;
				/** 重置监听状态，断开 MutationObserver */
				reset: () => void;
			};
			/** 执行翻译 */
			execute: (docs?: Document[]) => void;
			/** 翻译目标语言 */
			to: string;
			/** 存储操作 */
			storage: {
				set: (key: string, value: string) => void;
				get: (key: string) => string | null;
			};
			/** 节点数据 */
			node: {
				data: Map<unknown, unknown> | null;
				get: (node: unknown) => unknown;
				delete: (node: unknown) => void;
			};
		};
		loadTranslateScript?: () => Promise<void>;
		/** 翻译管理器：统一封装 translate.js 的辅助操作 */
		translateManager?: {
			/** 手动触发一次翻译（逃生口，补充 Observer 已覆盖大部分场景） */
			triggerTranslate: () => void;
			/** 断开 MutationObserver，设置 listener.use = false 阻止自动重连 */
			disconnectListener: () => void;
			/** 延迟重连 MutationObserver，恢复 listener.use = true 并调用 addListener() */
			reconnectListener: (delay?: number) => void;
		};
	}
}

export {};
