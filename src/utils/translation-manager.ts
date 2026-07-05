import { siteConfig } from "@/config";
import { applyI18nToDOM, clearI18nMarkers } from "@/utils/i18n-dom-updater";
import {
	getConfigLanguageFromTranslate,
	getTranslateLanguageFromConfig,
	getTwikooLanguageFromConfig,
} from "@/utils/language-utils";

// 类型

type RefreshOptions = { root?: HTMLElement; reason?: string };
type Renderer = () => void | Promise<void>;

// 常量

const SCRIPT_ID = "translate-script";
const IDLE_TIMEOUT_MS = 30_000;
const SRC_LANG =
	siteConfig.translate?.defaultLanguage ||
	getTranslateLanguageFromConfig(siteConfig.lang);

// 模块级状态

let scriptLoading: Promise<void> | null = null;
let initPromise: Promise<void> | null = null;
let configured = false;
let active = false;
let currentLang: string | null = null;
let queue = Promise.resolve();
const renderers = new Map<string, Renderer>();
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let debouncePromise: Promise<void> | null = null;
let debounceResolve: (() => void) | null = null;

// 工具函数

const isBrowser = () =>
	typeof window !== "undefined" && typeof document !== "undefined";

const raf = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

const isConnected = (el: HTMLElement) =>
	el.isConnected && document.contains(el);

const getSourceLanguage = (): string =>
	window.translate?.language?.getLocal?.() || SRC_LANG;

const needRemote = (lang: string) => lang !== getSourceLanguage();

const toDocs = (root?: HTMLElement): HTMLElement[] | undefined =>
	root ? [root] : undefined;

const pushUnique = (arr: string[], vals?: string[]) => {
	if (!vals?.length) return;
	for (const v of vals) {
		if (!arr.includes(v)) arr.push(v);
	}
};

const enqueue = (task: () => Promise<void>) => {
	const next = queue.catch(() => undefined).then(task);
	queue = next.then(
		() => undefined,
		() => undefined,
	);
	return next;
};

// 等待 translate 空闲

let idleId = 0;

const waitIdle = (timeout = IDLE_TIMEOUT_MS): Promise<void> => {
	const t = window.translate;
	if (!t || t.state === 0) return Promise.resolve();
	const id = ++idleId;
	const startTime = performance.now();
	return new Promise<void>((resolve) => {
		const check = () => {
			if (
				t.state === 0 ||
				performance.now() - startTime >= timeout ||
				id !== idleId
			) {
				resolve();
				return;
			}
			requestAnimationFrame(check);
		};
		requestAnimationFrame(check);
	});
};

// 标题翻译代理

const createTitleProxy = () => {
	const titleEl = document.querySelector("title");
	const text = titleEl?.textContent?.trim();
	if (!text) return null;
	const el = document.createElement("div");
	el.id = "__tt_proxy";
	el.style.cssText =
		"position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden";
	el.textContent = text;
	document.body.appendChild(el);
	return { proxy: el, titleEl, text };
};

const applyTitle = async (
	p: NonNullable<ReturnType<typeof createTitleProxy>>,
) => {
	const { proxy, titleEl, text } = p;
	await new Promise<void>((resolve) => {
		const timer = setTimeout(() => {
			obs.disconnect();
			resolve();
		}, 3000);
		const obs = new MutationObserver(() => {
			clearTimeout(timer);
			obs.disconnect();
			resolve();
		});
		obs.observe(proxy, { characterData: true, childList: true, subtree: true });
	});
	const translated = proxy.textContent?.trim();
	if (translated && translated !== text && titleEl) {
		titleEl.textContent = translated;
		document.title = translated;
	}
	proxy.remove();
};

// 加载 / 配置 translate.js

const loadScript = (): Promise<void> => {
	if (!isBrowser()) return Promise.resolve();
	if (window.translate) return Promise.resolve();
	if (scriptLoading) return scriptLoading;

	scriptLoading = new Promise<void>((resolve, reject) => {
		const existing = document.getElementById(
			SCRIPT_ID,
		) as HTMLScriptElement | null;
		const ready = () =>
			window.translate ? resolve() : reject(new Error("translate not found"));
		const fail = () => {
			scriptLoading = null;
			reject(new Error("script load failed"));
		};
		if (existing) {
			existing.addEventListener("load", ready, { once: true });
			existing.addEventListener("error", fail, { once: true });
			return;
		}
		const s = document.createElement("script");
		s.id = SCRIPT_ID;
		s.src = "/translate.js";
		s.async = true;
		s.addEventListener("load", ready, { once: true });
		s.addEventListener("error", fail, { once: true });
		document.head.appendChild(s);
	});
	return scriptLoading;
};

const configure = () => {
	const t = window.translate;
	if (!t || configured) return;
	const cfg = siteConfig.translate;
	if (cfg?.service && t.service) t.service.use(cfg.service);
	if (cfg?.defaultLanguage && t.language)
		t.language.setLocal(cfg.defaultLanguage);
	if (cfg?.autoDiscriminate && t.setAutoDiscriminateLocalLanguage)
		t.setAutoDiscriminateLocalLanguage();
	if (t.ignore?.class?.push && Array.isArray(cfg?.ignoreClasses)) {
		for (const cls of cfg.ignoreClasses) {
			if (!t.ignore.class.data.includes(cls)) {
				t.ignore.class.push(cls, null);
			}
		}
	}
	if (Array.isArray(t.ignore?.tag)) pushUnique(t.ignore.tag, cfg?.ignoreTags);
	if (t.selectLanguageTag) {
		t.selectLanguageTag.show = cfg?.showSelectTag !== false;
		t.selectLanguageTag.refreshRender?.();
	}
	if (t.storage?.set) t.storage.set = () => {};
	if (t.waitingExecute) t.waitingExecute.use = false;
	configured = true;
};

const init = async () => {
	if (!siteConfig.translate?.enable || !isBrowser()) return;
	if (configured && window.translate) return;
	if (initPromise) return initPromise;
	initPromise = loadScript()
		.then(configure)
		.catch((e) => {
			initPromise = null;
			throw e;
		});
	return initPromise;
};

// 核心翻译流程

const runRenderers = async () => {
	for (const fn of renderers.values()) await fn();
};

const execTranslate = async (docs?: HTMLElement[]) => {
	const t = window.translate;
	if (!t) return;
	await waitIdle();
	if (docs?.length) {
		const valid = docs.filter((d) => isConnected(d));
		t.execute(valid.length ? valid : undefined);
	} else {
		t.execute();
	}
	await waitIdle();
};

const applyLang = async (lang: string, opts: RefreshOptions = {}) => {
	const root = opts.root ?? document.body;
	if (opts.root && !isConnected(opts.root)) return;

	const t = window.translate;

	clearI18nMarkers(root);
	await runRenderers();

	const cfgLang = getConfigLanguageFromTranslate(lang);
	applyI18nToDOM(cfgLang, root);

	if (t) t.to = lang;

	if (!t || !needRemote(lang)) {
		document.dispatchEvent(
			new CustomEvent("translate:applied", {
				detail: { lang, reason: opts.reason },
			}),
		);
		return;
	}

	const titleData = createTitleProxy();
	const docs = toDocs(opts.root);
	try {
		const targets: HTMLElement[] = [];
		if (docs?.length) targets.push(...docs);
		if (titleData) targets.push(titleData.proxy);
		await execTranslate(targets.length ? targets : undefined);
		if (titleData) await applyTitle(titleData);
	} catch (e) {
		console.error("[Translate] exec failed:", e);
	}
	document.dispatchEvent(
		new CustomEvent("translate:applied", {
			detail: { lang, reason: opts.reason },
		}),
	);
};

const resetAndApply = async (lang: string) => {
	await init().catch(() => {});
	const t = window.translate;
	if (t?.reset) {
		try {
			await t.reset();
			await raf();
		} catch (e) {
			console.error("[Translate] reset failed:", e);
		}
	}
	await applyLang(lang, { root: document.body, reason: "set-language" });
};

// 公开 API

export const translationManager: TranslationManagerInstance = {
	init(): Promise<void> {
		if (!siteConfig.translate?.enable || !isBrowser()) return Promise.resolve();
		return init();
	},

	setLanguage(language: string): Promise<void> {
		currentLang = language;
		active = true;
		return enqueue(() => resetAndApply(language));
	},

	refresh(options: RefreshOptions = {}): Promise<void> {
		if (!active || !currentLang || !isBrowser()) return Promise.resolve();
		if (debounceTimer) clearTimeout(debounceTimer);
		if (!debouncePromise) {
			debouncePromise = new Promise<void>((r) => {
				debounceResolve = r;
			});
		}
		debounceTimer = setTimeout(() => {
			debounceTimer = null;
			const r = debounceResolve;
			debouncePromise = null;
			debounceResolve = null;
			enqueue(async () => {
				await init().catch(() => {});
				if (!currentLang) return;
				await applyLang(currentLang, {
					root: options.root,
					reason: options.reason ?? "refresh",
				});
			})
				.then(() => r?.())
				.catch(() => r?.());
		}, 0);
		return debouncePromise;
	},

	onRefresh(key: string, renderer: Renderer): () => void {
		renderers.set(key, renderer);
		return () => {
			if (renderers.get(key) === renderer) renderers.delete(key);
		};
	},

	isActive(): boolean {
		return active;
	},

	getTargetLanguage(): string | null {
		return currentLang;
	},

	getTwikooLanguage(): string {
		if (!currentLang) return getTwikooLanguageFromConfig(siteConfig.lang);
		return getTwikooLanguageFromConfig(
			getConfigLanguageFromTranslate(currentLang),
		);
	},

	getConfigLanguage(): string {
		if (!currentLang) return siteConfig.lang;
		return getConfigLanguageFromTranslate(currentLang);
	},
};

// 浏览器端自动注册
if (isBrowser()) {
	(
		window as Window & { translationManager: TranslationManagerInstance }
	).translationManager = translationManager;
	document.dispatchEvent(new CustomEvent("translation-manager:ready"));
}
