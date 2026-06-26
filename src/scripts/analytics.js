/**
 * 第三方分析脚本
 * 包含 Google Tag Manager 和 Microsoft Clarity，通过 requestIdleCallback 延迟加载
 */
(() => {
	// 使用 requestIdleCallback 延迟加载第三方脚本
	function loadAnalytics() {
		// Google Tag Manager
		((w, d, s, l, i) => {
			w[l] = w[l] || [];
			w[l].push({
				"gtm.start": Date.now(),
				event: "gtm.js",
			});
			var f = d.getElementsByTagName(s)[0];
			var j = d.createElement(s);
			var dl = l !== "dataLayer" ? `&l=${l}` : "";
			j.async = true;
			j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
			f.parentNode.insertBefore(j, f);
		})(window, document, "script", "dataLayer", "GTM-KRX3XGVH");

		// Clarity
		((c, l, a, r, i, _t, _y) => {
			c[a] =
				c[a] ||
				((...args) => {
					c[a].q = c[a].q || [];
					c[a].q.push(args);
				});
			const t = l.createElement(r);
			t.async = 1;
			t.src = `https://www.clarity.ms/tag/${i}`;
			const y = l.getElementsByTagName(r)[0];
			y.parentNode.insertBefore(t, y);
		})(window, document, "clarity", "script", "tjr3vkhj8i");
	}

	// 在浏览器空闲时加载，或者在 3 秒后加载
	if ("requestIdleCallback" in window) {
		requestIdleCallback(loadAnalytics, { timeout: 3000 });
	} else {
		setTimeout(loadAnalytics, 3000);
	}
})();
