/**
 * 单图 Banner 随机选取脚本
 */

(() => {
	// 查找 Banner 容器元素
	const container = document.getElementById("banner-single-container");
	if (!container) return;

	// 解析数据属性中的图片数组
	const desktopImages = JSON.parse(container.dataset.desktopImages || "[]");
	const mobileImages = JSON.parse(container.dataset.mobileImages || "[]");
	const position = container.dataset.position || "center";

	// 随机获取图片：从数组中随机选择一个图片，避免重复
	const getRandomImage = (images, storageKey) => {
		if (Array.isArray(images)) {
			if (images.length === 0) return null;
			if (images.length === 1) return images[0];

			const lastIndex = sessionStorage.getItem(storageKey);
			let newIndex;

			do {
				newIndex = Math.floor(Math.random() * images.length);
			} while (newIndex === Number.parseInt(lastIndex || "-1", 10));

			sessionStorage.setItem(storageKey, newIndex.toString());
			return images[newIndex];
		}
		return images || null;
	};

	// 随机获取桌面端和移动端图片
	const desktopSrc = getRandomImage(desktopImages, "banner_desktop_index");
	const mobileSrc = getRandomImage(mobileImages, "banner_mobile_index");

	// 渲染图片：根据配置位置和图片源创建图片元素
	if (mobileSrc) {
		const mobileImg = document.createElement("img");
		mobileImg.alt = "Mobile banner image of the blog";
		mobileImg.className =
			"block md:hidden object-cover h-full w-full transition duration-300 opacity-100";
		mobileImg.src = mobileSrc;
		mobileImg.loading = "eager";
		mobileImg.fetchPriority = "high";
		mobileImg.dataset.position = position;
		container.appendChild(mobileImg);
	}

	// 渲染桌面端图片：根据配置位置和图片源创建图片元素
	if (desktopSrc) {
		const desktopImg = document.createElement("img");
		desktopImg.id = "banner";
		desktopImg.alt = "Desktop banner image of the blog";
		desktopImg.className =
			"hidden md:block object-cover h-full w-full transition duration-300 opacity-100";
		desktopImg.src = desktopSrc;
		desktopImg.loading = "eager";
		desktopImg.fetchPriority = "high";
		desktopImg.dataset.position = position;
		container.appendChild(desktopImg);
	}
})();
