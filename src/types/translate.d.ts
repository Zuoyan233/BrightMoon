/* ===== translate.js 外部类型声明 ===== */

interface TranslateLifecycle {
	execute: {
		trigger: Array<(data: Record<string, unknown>) => boolean | undefined>;
		finally: Array<(data: Record<string, unknown>) => void>;
		renderFinish: Array<(uuid: string, to: string) => void>;
	};
}

interface TranslateNodeData {
	get: (node: Node) => Record<string, unknown> | undefined;
	set: (node: Node, data: Record<string, unknown>) => void;
}

interface TranslateNode {
	data: TranslateNodeData;
}

type TranslateListener = {
	start: () => void;
	isStart: boolean;
};

type TranslateService = {
	use: (service: string) => void;
};

type TranslateLanguage = {
	translateLocal: boolean;
	setLocal: (language: string) => void;
	getCurrent: () => string;
	getLocal: () => string;
};

type TranslateIgnoreClass = {
	data: string[];
	conditionFunction: Record<
		string,
		(element: HTMLElement, data?: Record<string, unknown>) => boolean
	>;
	push: (
		className: string,
		conditionFunction?:
			| ((element: HTMLElement, data?: Record<string, unknown>) => boolean)
			| null,
	) => void;
};

type TranslateIgnore = {
	class: TranslateIgnoreClass;
	tag: string[];
};

type TranslateSelectLanguageTag = {
	show: boolean;
	refreshRender?: () => void;
};

type TranslateStorage = {
	set: (key: string, value: string) => void;
};

type TranslateWaitingExecute = {
	use: boolean;
	queue: HTMLElement[][];
	add: (docs: HTMLElement[]) => void;
	get: () => HTMLElement[] | null;
};

/** translate.js 完整类型定义 */
interface TranslateInstance {
	reset: () => void | Promise<void>;
	changeLanguage: (language: string) => void;
	service: TranslateService;
	language: TranslateLanguage;
	setAutoDiscriminateLocalLanguage: () => void;
	ignore: TranslateIgnore;
	selectLanguageTag: TranslateSelectLanguageTag;
	listener: TranslateListener;
	execute: (docs?: HTMLElement | HTMLElement[] | Node | Node[]) => void;
	to: string;
	storage: TranslateStorage;
	/** 内部执行状态：0=空闲, >0 表示正在执行中 */
	state: number;
	/** 内部排队机制（默认启用，我们用 enqueue 替代） */
	waitingExecute?: TranslateWaitingExecute;
	/** 生命周期钩子 */
	lifecycle?: TranslateLifecycle;
	/** Node 数据 */
	node?: TranslateNode;
}

/* ===== Global Window 扩展 ===== */

declare global {
	interface TranslationRefreshOptions {
		root?: HTMLElement;
		reason?: string;
		force?: boolean;
	}

	type TranslationRenderer = () => void | Promise<void>;

	interface TranslationManagerInstance {
		/** 初始化翻译系统 */
		init: () => Promise<void>;
		/** 切换语言并立即执行翻译 */
		setLanguage: (language: string) => Promise<void>;
		/** 防抖刷新翻译 */
		refresh: (options?: TranslationRefreshOptions) => Promise<void>;
		/** 注册翻译前需要执行的渲染器（翻译前刷新组件 DOM） */
		onRefresh: (key: string, renderer: TranslationRenderer) => () => void;
		/** 是否已激活翻译 */
		isActive: () => boolean;
		/** 获取当前目标语言（translate.js 格式） */
		getTargetLanguage: () => string | null;
		/** 获取 Twikoo 语言代码 */
		getTwikooLanguage: () => string;
		/** 获取当前配置语言（i18n 字典格式，从目标语言推断） */
		getConfigLanguage: () => string;
	}

	interface Window {
		translate?: TranslateInstance;
		translationManager?: TranslationManagerInstance;
		runtime?: () => void;
	}
}

export {};
