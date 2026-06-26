/**
 * 单图 Banner 随机选取脚本
 * 从配置的图片数组中随机选择桌面端和移动端 Banner 图片并渲染
 */

(() => {
	const container = document.getElementById("banner-single-container");
	if (!container) return;

	const desktopImages = JSON.parse(container.dataset.desktopImages || "[]");
	const mobileImages = JSON.parse(container.dataset.mobileImages || "[]");
	const position = container.dataset.position || "center";

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

	const desktopSrc = getRandomImage(desktopImages, "banner_desktop_index");
	const mobileSrc = getRandomImage(mobileImages, "banner_mobile_index");

	if (mobileSrc) {
		const mobileImg = document.createElement("img");
		mobileImg.alt = "Mobile banner image of the blog";
		mobileImg.className =
			"block md:hidden object-cover h-full w-full transition duration-700 opacity-100";
		mobileImg.src = mobileSrc;
		mobileImg.loading = "eager";
		mobileImg.dataset.position = position;
		container.appendChild(mobileImg);
	}

	if (desktopSrc) {
		const desktopImg = document.createElement("img");
		desktopImg.id = "banner";
		desktopImg.alt = "Desktop banner image of the blog";
		desktopImg.className =
			"hidden md:block object-cover h-full w-full transition duration-700 opacity-100";
		desktopImg.src = desktopSrc;
		desktopImg.loading = "eager";
		desktopImg.dataset.position = position;
		container.appendChild(desktopImg);
	}
})();
