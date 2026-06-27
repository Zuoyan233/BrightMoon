/**
 * 动画工具类 - 提供页面切换和组件动画的统一管理
 */

export interface AnimationConfig {
	duration?: number;
	delay?: number;
	easing?: string;
	direction?: "up" | "down" | "left" | "right";
}

export class AnimationManager {
	private static instance: AnimationManager;
	private isAnimating = false;
	private animationQueue: (() => void)[] = [];
	private gpuCleanupRegistered = false;

	static getInstance(): AnimationManager {
		if (!AnimationManager.instance) {
			AnimationManager.instance = new AnimationManager();
		}
		return AnimationManager.instance;
	}

	/**
	 * 初始化动画系统
	 */
	init(): void {
		this.setupSwupIntegration();
		this.setupScrollAnimations();
		this.setupGPUCleanup();
		console.log("🎨 Animation Manager initialized");
	}

	/**
	 * 注册全局 GPU 层自动清理
	 *
	 * 监听 animationend / transitionend 事件，在动画结束后
	 * 自动添加 .animation-complete 类来释放 GPU 合成层。
	 * 使用事件委托，只注册一次。
	 */
	private setupGPUCleanup(): void {
		if (this.gpuCleanupRegistered) return;
		this.gpuCleanupRegistered = true;

		const cleanupTargets = [
			".onload-animation",
			".transition-slide-in",
			".card-animation",
			".nav-animation",
		].join(",");

		// animationend: 处理 CSS animation (onload-animation 等)
		document.addEventListener(
			"animationend",
			(e: Event) => {
				const target = e.target as HTMLElement;
				if (!target) return;
				// 只处理匹配的元素，且排除 stagger 延迟中尚未开始的
				if (target.matches(cleanupTargets) || target.closest(cleanupTargets)) {
					const el = target.matches(cleanupTargets)
						? target
						: (target.closest(cleanupTargets) as HTMLElement);
					if (el) {
						el.classList.add("animation-complete");
					}
				}
			},
			{ passive: true },
		);

		// transitionend: 处理 CSS transition (transition-slide-in, card-animation 等)
		document.addEventListener(
			"transitionend",
			(e: Event) => {
				const target = e.target as HTMLElement;
				if (!target) return;
				// 只处理 transform 和 opacity 的 transition 结束
				if (
					e instanceof TransitionEvent &&
					(e.propertyName === "transform" || e.propertyName === "opacity")
				) {
					if (
						target.matches(cleanupTargets) ||
						target.closest(cleanupTargets)
					) {
						const el = target.matches(cleanupTargets)
							? target
							: (target.closest(cleanupTargets) as HTMLElement);
						if (el) {
							el.classList.add("animation-complete");
						}
					}
				}
			},
			{ passive: true },
		);
	}

	/**
	 * 设置 Swup 集成
	 */
	private setupSwupIntegration(): void {
		if (typeof window !== "undefined" && window.swup) {
			const swup = window.swup;

			// 页面离开动画
			swup.hooks.on("animation:out:start", () => {
				this.triggerPageLeaveAnimation();
			});

			// 页面进入动画
			swup.hooks.on("animation:in:start", () => {
				this.triggerPageEnterAnimation();
			});

			// 内容替换后重新初始化动画
			swup.hooks.on("content:replace", () => {
				setTimeout(() => {
					this.initializePageAnimations();
				}, 50);
			});
		}
	}

	/**
	 * 触发页面离开动画
	 *
	 * 离开动画由 Swup CSS 状态机驱动（html.is-animating.is-leaving .transition-leaving），
	 * 此处仅设置 JS 侧的状态标记，阻止动画队列在过渡期间执行。
	 */
	private triggerPageLeaveAnimation(): void {
		this.isAnimating = true;
	}

	/**
	 * 触发页面进入动画
	 *
	 * 动画时长从 CSS 变量 --tf-duration 读取，与 transition.css 保持同步。
	 * 进入动画结束后清理状态并释放动画队列。
	 */
	private triggerPageEnterAnimation(): void {
		document.documentElement.classList.remove("is-leaving");
		document.documentElement.classList.add("is-entering");

		// 从 CSS 变量读取动画时长，与 transition.css 的 --tf-duration 同步
		const duration = this.getCSSDuration();

		setTimeout(() => {
			document.documentElement.classList.remove("is-entering");
			this.isAnimating = false;
			this.processAnimationQueue();
		}, duration);
	}

	/**
	 * 从 CSS 变量 --tf-duration 读取动画时长（ms）
	 */
	private getCSSDuration(): number {
		const raw = getComputedStyle(document.documentElement)
			.getPropertyValue("--tf-duration")
			.trim();
		// 支持 "400ms" 或 "0.4s" 或纯数字 "400"
		if (raw.endsWith("ms")) {
			return Number.parseInt(raw, 10) || 400;
		}
		if (raw.endsWith("s")) {
			return (Number.parseFloat(raw) || 0.4) * 1000;
		}
		return Number.parseInt(raw, 10) || 400;
	}

	/**
	 * 初始化页面动画（Swup 内容替换后调用）
	 *
	 * 使用双帧 RAF 重触发 CSS animation，零阻塞主线程：
	 * 1. Frame N:   移除 .animation-complete，设置 animation: none
	 * 2. Frame N+1: 浏览器自然完成布局（不阻塞，不强制回流）
	 * 3. Frame N+2: 恢复 animation，CSS keyframes 重新播放
	 * 4. animationend 事件自动清理 GPU 层
	 */
	private initializePageAnimations(): void {
		const animatedElements =
			document.querySelectorAll<HTMLElement>(".onload-animation");

		// Phase 1: 批量移除动画状态，清理 GPU 层标记
		for (const el of animatedElements) {
			el.classList.remove("animation-complete");
			el.style.animation = "none";
		}

		// Phase 2: 双帧 RAF，让浏览器在帧间隙自然完成布局，然后恢复动画
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				for (const el of animatedElements) {
					el.style.animation = "";
				}
			});
		});

		// 重新初始化侧边栏组件
		this.initializeSidebarComponents();
	}

	/**
	 * 初始化侧边栏组件
	 */
	private initializeSidebarComponents(): void {
		// 查找页面中的侧边栏元素
		const sidebar = document.getElementById("sidebar");
		if (sidebar) {
			// 触发自定义事件，通知侧边栏重新初始化
			const event = new CustomEvent("sidebar:init");
			sidebar.dispatchEvent(event);
		}

		// 触发全局事件，通知所有组件重新初始化
		const globalEvent = new CustomEvent("page:reinit");
		document.dispatchEvent(globalEvent);
	}

	/**
	 * 设置滚动动画
	 */
	private setupScrollAnimations(): void {
		if (typeof window === "undefined") return;

		const observerOptions = {
			root: null,
			rootMargin: "0px 0px -100px 0px",
			threshold: 0.1,
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("in-view");
					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		// 观察所有需要滚动动画的元素
		const scrollElements = document.querySelectorAll(".animate-on-scroll");
		scrollElements.forEach((element) => {
			observer.observe(element);
		});
	}

	/**
	 * 添加动画到队列
	 */
	queueAnimation(callback: () => void): void {
		if (this.isAnimating) {
			this.animationQueue.push(callback);
		} else {
			callback();
		}
	}

	/**
	 * 处理动画队列
	 */
	private processAnimationQueue(): void {
		while (this.animationQueue.length > 0) {
			const callback = this.animationQueue.shift();
			if (callback) {
				callback();
			}
		}
	}

	/**
	 * 创建自定义动画
	 *
	 * 自动管理 GPU 层：
	 * - 动画开始时添加 will-change
	 * - transitionend 自动清理（由 setupGPUCleanup 全局处理）
	 */
	createAnimation(element: HTMLElement, config: AnimationConfig): void {
		const {
			duration = 400,
			delay = 0,
			easing = "cubic-bezier(0.4, 0, 0.2, 1)",
			direction = "up",
		} = config;

		const transforms: Record<string, string> = {
			up: "translateY(1.5rem)",
			down: "translateY(-1.5rem)",
			left: "translateX(1.5rem)",
			right: "translateX(-1.5rem)",
		};

		// 清理上一次动画的 GPU 层标记
		element.classList.remove("animation-complete");

		// 设置初始状态
		element.style.opacity = "0";
		element.style.transform = transforms[direction];
		element.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;

		// 动画期间启用 GPU 加速
		element.style.willChange = "transform, opacity";

		setTimeout(() => {
			element.style.opacity = "1";
			element.style.transform = "translate(0, 0)";
		}, delay);

		// transitionend 时由全局 setupGPUCleanup 自动清理 will-change
	}

	// batchAnimate is deprecated, use staggerAnimations instead
	// batchAnimate(
	// 	elements: NodeListOf<Element> | Element[],
	// 	config: AnimationConfig & { stagger?: number } = {},
	// ): void {
	// 	const { stagger = 50, ...animationConfig } = config;
	//
	// 	elements.forEach((element, index) => {
	// 		this.createAnimation(element as HTMLElement, {
	// 			...animationConfig,
	// 			delay: (animationConfig.delay || 0) + index * stagger,
	// 		});
	// 	});
	// }

	/**
	 * 批量动画
	 */
	staggerAnimations(
		elements: NodeListOf<Element> | HTMLElement[],
		config: AnimationConfig & { stagger?: number } = {},
	): void {
		const { stagger = 50, ...animationConfig } = config;

		elements.forEach((element: Element | HTMLElement, index: number) => {
			this.createAnimation(element as HTMLElement, {
				...animationConfig,
				delay: (animationConfig.delay || 0) + index * stagger,
			});
		});
	}

	/**
	 * 检查是否正在动画
	 */
	isCurrentlyAnimating(): boolean {
		return this.isAnimating;
	}
}

// 导出单例实例
export const animationManager = AnimationManager.getInstance();

// 自动初始化
if (typeof window !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => {
			animationManager.init();
		});
	} else {
		animationManager.init();
	}
}
