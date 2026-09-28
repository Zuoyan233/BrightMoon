<script lang="ts" module>
import { musicPlayerConfig } from "../../config";
import Key from "../../i18n/i18nKey";
import { i18n } from "../../i18n/translation";

type Song = {
	id: number;
	title: string;
	artist: string;
	cover: string;
	url: string;
	duration: number;
	lrc?: string;
};

type LyricLine = {
	time: number;
	text: string;
};

// 所有 MusicPlayer 实例共享这些状态，确保侧边栏和顶部面板完全同步
let sharedAudio: HTMLAudioElement | null = null;

let sharedPlaylist: Song[] = $state([]); // 播放列表
let sharedCurrentIndex = $state(0); // 当前播放歌曲在列表中的索引
let sharedIsPlaying = $state(musicPlayerConfig.isPlaying); // 是否正在播放
let sharedCurrentTime = $state(musicPlayerConfig.currentTime); // 当前播放时间（秒）
let sharedDuration = $state(musicPlayerConfig.duration); // 当前歌曲总时长（秒）
let sharedVolume = $state(musicPlayerConfig.volume); // 音量（0~1）
let sharedIsMuted = $state(musicPlayerConfig.isMuted); // 是否静音
let sharedIsLoading = $state(musicPlayerConfig.isLoading); // 是否正在加载音频
let sharedIsShuffled = $state(musicPlayerConfig.isShuffled); // 是否开启随机播放
let sharedIsRepeating = $state(musicPlayerConfig.isRepeating); // 是否开启循环播放
let sharedShowError = $state(musicPlayerConfig.showError); // 是否显示错误提示
let sharedErrorKey: string | null = $state(null); // 当前错误的 i18n key
let sharedLyrics: LyricLine[] = $state([]); // 解析后的歌词行列表
let sharedCurrentLyricIndex = $state(-1); // 当前高亮歌词行索引
let sharedLyricsLoading = $state(false); // 歌词是否正在加载
let sharedNoLyricsFound = $state(false); // 是否未找到歌词
let sharedWillAutoPlay = $state(false); // 是否将在加载后自动播放
let sharedAutoplayFailed = $state(false); // 自动播放是否因浏览器策略失败

// 当前播放的歌曲信息
let sharedCurrentSong: Song = $state({
	id: 0,
	title: i18n(Key.unknownSong),
	artist: i18n(Key.unknownArtist),
	cover: "/favicon/Vinyl record.ico",
	url: "",
	duration: 0,
});

// 记录已初始化（防止多个实例重复加载播放列表）
let sharedInitialized = $state(false);

// 实例计数，用于管理 audio 元素生命周期
let instanceCount = 0;

function getSharedAudio(): HTMLAudioElement {
	if (!sharedAudio) {
		sharedAudio = new Audio();
		sharedAudio.preload = "auto";
		setupAudioListeners(sharedAudio);
	}
	return sharedAudio;
}

function setupAudioListeners(audio: HTMLAudioElement) {
	audio.addEventListener("play", () => {
		sharedIsPlaying = true;
	});
	audio.addEventListener("pause", () => {
		sharedIsPlaying = false;
	});
	audio.addEventListener("timeupdate", () => {
		sharedCurrentTime = audio.currentTime;
		updateSharedCurrentLyricIndex();
	});
	audio.addEventListener("ended", () => {
		handleSharedAudioEnded();
	});
	audio.addEventListener("error", () => {
		handleSharedLoadError();
	});
	audio.addEventListener("loadeddata", () => {
		handleSharedLoadSuccess();
	});
	audio.addEventListener("loadstart", () => {});
}

function handleSharedLoadSuccess() {
	const audio = sharedAudio;
	if (!audio) return;
	sharedIsLoading = false;
	if (audio.duration && audio.duration > 1) {
		sharedDuration = Math.floor(audio.duration);
		if (sharedPlaylist[sharedCurrentIndex]) {
			sharedPlaylist[sharedCurrentIndex].duration = sharedDuration;
		}
		sharedCurrentSong = { ...sharedCurrentSong, duration: sharedDuration };
	}

	if (sharedWillAutoPlay || sharedIsPlaying) {
		const playPromise = audio.play();
		if (playPromise !== undefined) {
			playPromise.catch((error) => {
				console.warn("自动播放被拦截，等待用户交互:", error);
				sharedAutoplayFailed = true;
				sharedIsPlaying = false;
			});
		}
	}
}

function handleSharedLoadError() {
	if (!sharedCurrentSong.url) return;
	sharedIsLoading = false;
	showSharedErrorMessage(Key.musicPlayerErrorSong);

	const shouldContinue = sharedIsPlaying || sharedWillAutoPlay;
	if (sharedPlaylist.length > 1) {
		setTimeout(() => sharedNextSong(shouldContinue), 1000);
	} else {
		showSharedErrorMessage(Key.musicPlayerErrorEmpty);
	}
}

function handleSharedAudioEnded() {
	const audio = sharedAudio;
	if (!audio) return;
	if (sharedIsRepeating === 1) {
		audio.currentTime = 0;
		audio.play().catch(() => {});
	} else if (sharedIsRepeating === 2 || sharedIsShuffled) {
		sharedNextSong(true);
	} else {
		sharedIsPlaying = false;
	}
}

function updateSharedCurrentLyricIndex() {
	if (sharedLyrics.length === 0 || !sharedAudio) return;
	const time = sharedAudio.currentTime;
	for (let i = sharedLyrics.length - 1; i >= 0; i--) {
		if (time >= sharedLyrics[i].time) {
			sharedCurrentLyricIndex = i;
			return;
		}
	}
	sharedCurrentLyricIndex = -1;
}

function sharedTogglePlay() {
	const audio = getSharedAudio();
	if (!sharedCurrentSong.url) return;
	if (sharedIsPlaying) {
		audio.pause();
	} else {
		audio.play().catch(() => {});
	}
}

function sharedToggleShuffle() {
	sharedIsShuffled = !sharedIsShuffled;
	if (sharedIsShuffled) {
		sharedIsRepeating = 0;
	}
}

function sharedToggleRepeat() {
	sharedIsRepeating = (sharedIsRepeating + 1) % 3;
	if (sharedIsRepeating !== 0) {
		sharedIsShuffled = false;
	}
}

function sharedPreviousSong() {
	if (sharedPlaylist.length <= 1) return;
	const newIndex =
		sharedCurrentIndex > 0 ? sharedCurrentIndex - 1 : sharedPlaylist.length - 1;
	sharedPlaySong(newIndex);
}

function sharedNextSong(autoPlay = true) {
	if (sharedPlaylist.length <= 1) return;
	let newIndex: number;
	if (sharedIsShuffled) {
		do {
			newIndex = Math.floor(Math.random() * sharedPlaylist.length);
		} while (newIndex === sharedCurrentIndex && sharedPlaylist.length > 1);
	} else {
		newIndex =
			sharedCurrentIndex < sharedPlaylist.length - 1
				? sharedCurrentIndex + 1
				: 0;
	}
	sharedPlaySong(newIndex, autoPlay);
}

function sharedPlaySong(index: number, autoPlay = true) {
	if (index < 0 || index >= sharedPlaylist.length) return;
	sharedWillAutoPlay = autoPlay;
	sharedCurrentIndex = index;
	sharedLoadSong(sharedPlaylist[sharedCurrentIndex]);
}

function sharedLoadSong(song: Song) {
	if (!song) return;
	if (song.url !== sharedCurrentSong.url) {
		sharedCurrentSong = { ...song };
		if (song.url) {
			sharedIsLoading = true;
		} else {
			sharedIsLoading = false;
		}
		sharedFetchLyrics(song);
		const audio = getSharedAudio();
		audio.src =
			song.url.startsWith("http://") ||
			song.url.startsWith("https://") ||
			song.url.startsWith("/")
				? song.url
				: `/${song.url}`;
		audio.load();
	}
}

function sharedToggleMute() {
	sharedIsMuted = !sharedIsMuted;
	if (sharedAudio) {
		sharedAudio.muted = sharedIsMuted;
	}
}

function sharedSetVolume(vol: number) {
	sharedVolume = vol;
	if (sharedAudio) {
		sharedAudio.volume = vol;
	}
}

function sharedSetCurrentTime(time: number) {
	sharedCurrentTime = time;
	if (sharedAudio) {
		sharedAudio.currentTime = time;
	}
}

function showSharedErrorMessage(key: string) {
	sharedErrorKey = key;
	sharedShowError = true;
	setTimeout(() => {
		sharedShowError = false;
	}, 3000);
}

function hideSharedError() {
	sharedShowError = false;
}

function sharedHandleUserInteraction() {
	if (sharedAutoplayFailed && sharedAudio) {
		const playPromise = sharedAudio.play();
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					sharedAutoplayFailed = false;
				})
				.catch(() => {});
		}
	}
}

function parseLrc(lrcText: string): LyricLine[] {
	const lines = lrcText.split("\n");
	const result: LyricLine[] = [];
	const timeRegex = /\[(\d{2}):(\d{2})(?:[.:](\d{2,3}))?\]/g;

	for (const line of lines) {
		const trimmed = line.trim();
		if (
			!trimmed ||
			trimmed.startsWith("[ti:") ||
			trimmed.startsWith("[ar:") ||
			trimmed.startsWith("[al:") ||
			trimmed.startsWith("[by:") ||
			trimmed.startsWith("[offset:")
		) {
			continue;
		}

		const matches = [...trimmed.matchAll(timeRegex)];
		if (matches.length === 0) continue;

		const text = trimmed.replace(timeRegex, "").trim();
		if (!text) continue;

		for (const match of matches) {
			const minutes = Number.parseInt(match[1], 10);
			const seconds = Number.parseInt(match[2], 10);
			let milliseconds = 0;
			if (match[3]) {
				const msStr = match[3];
				milliseconds =
					msStr.length === 2
						? Number.parseInt(msStr, 10) * 10
						: Number.parseInt(msStr, 10);
			}
			const time = minutes * 60 + seconds + milliseconds / 1000;
			result.push({ time, text });
		}
	}

	result.sort((a, b) => a.time - b.time);
	return result;
}

async function sharedFetchLyrics(song: Song) {
	sharedLyrics = [];
	sharedCurrentLyricIndex = -1;
	sharedNoLyricsFound = false;

	if (!song.lrc) {
		sharedNoLyricsFound = true;
		return;
	}

	sharedLyricsLoading = true;
	try {
		let lrcText: string;
		if (song.lrc.startsWith("http://") || song.lrc.startsWith("https://")) {
			const res = await fetch(song.lrc);
			if (!res.ok) throw new Error("lyrics fetch failed");
			lrcText = await res.text();
		} else {
			lrcText = song.lrc;
		}

		const parsed = parseLrc(lrcText);
		if (parsed.length === 0) {
			sharedNoLyricsFound = true;
		} else {
			sharedLyrics = parsed;
		}
	} catch {
		sharedNoLyricsFound = true;
	} finally {
		sharedLyricsLoading = false;
	}
}

async function sharedFetchMetingPlaylist() {
	const meting_api = musicPlayerConfig.meting_api;
	const meting_id = musicPlayerConfig.id ?? "766208154";
	const meting_server = musicPlayerConfig.server ?? "netease";
	const meting_type = musicPlayerConfig.type ?? "playlist";

	if (!meting_api || !meting_id) return;
	sharedIsLoading = true;
	const apiUrl = meting_api
		.replace(":server", meting_server)
		.replace(":type", meting_type)
		.replace(":id", meting_id)
		.replace(":auth", "")
		.replace(":r", Date.now().toString());
	try {
		const res = await fetch(apiUrl);
		if (!res.ok) throw new Error("meting api error");
		const list = await res.json();
		sharedPlaylist = list.map(
			(song: {
				id?: string;
				name?: string;
				title?: string;
				artist?: string;
				author?: string;
				duration?: number;
				pic?: string;
				url?: string;
				lrc?: string;
			}) => {
				let title = song.name ?? song.title ?? i18n(Key.unknownSong);
				let artist = song.artist ?? song.author ?? i18n(Key.unknownArtist);
				let dur = song.duration ?? 0;
				if (dur > 10000) dur = Math.floor(dur / 1000);
				if (!Number.isFinite(dur) || dur <= 0) dur = 0;
				return {
					id: Number(song.id) || 0,
					title,
					artist,
					cover: song.pic ?? "",
					url: song.url ?? "",
					duration: dur,
					lrc: song.lrc,
				};
			},
		);
		if (sharedPlaylist.length > 0) {
			sharedLoadSong(sharedPlaylist[0]);
		}
		sharedIsLoading = false;
	} catch (e) {
		showSharedErrorMessage(Key.musicPlayerErrorPlaylist);
		sharedIsLoading = false;
	}
}

function sharedInitPlaylist() {
	if (sharedInitialized) return;
	sharedInitialized = true;

	const mode = musicPlayerConfig.mode ?? "meting";
	if (mode === "meting") {
		sharedFetchMetingPlaylist();
	} else {
		const localPlaylist = musicPlayerConfig.localPlaylist;
		sharedPlaylist = [...localPlaylist];
		if (sharedPlaylist.length > 0) {
			sharedLoadSong(sharedPlaylist[0]);
		} else {
			showSharedErrorMessage(Key.musicPlayerErrorEmpty);
		}
	}
}
</script>

<script lang="ts">
import Icon from "@iconify/svelte";
import { onDestroy, onMount, tick } from "svelte";
import { slide } from "svelte/transition";
import { siteConfig } from "../../config";
import { getTranslation } from "../../i18n/translation";
import { translationManager } from "../../utils/translation-manager";

// 这些状态只影响当前实例的 UI，不影响播放核心状态

let showPlaylist = $state(musicPlayerConfig.showPlaylist);
let showLyrics = $state(musicPlayerConfig.showLyrics ?? false);
let showSettings = $state(false);
let settingsId = $state(musicPlayerConfig.id ?? "766208154");
let settingsServer = $state(musicPlayerConfig.server ?? "netease");
let settingsType = $state(musicPlayerConfig.type ?? "playlist");
let settingsPanel: HTMLElement | undefined = $state();
let playerRoot: HTMLElement | undefined = $state();

// 播放列表封面懒加载（每个实例独立管理自己的可见区域）
let visiblePlaylistIndices = $state(new Set<number>());
let playlistScrollContainer: HTMLElement;
let playlistImgObserver: IntersectionObserver;

// 拖拽状态（每个实例独立）
let isProgressDragging = $state(false);
let isProgressPointerDown = $state(false);
let progressBarRect: DOMRect | null = null;
let progressRafId: number | null = null;

let isVolumeDragging = $state(false);
let isPointerDown = $state(false);
let volumeBarRect: DOMRect | null = null;
let rafId: number | null = null;

// DOM 引用
let progressBar: HTMLElement | undefined = $state();
let volumeBar: HTMLElement | undefined = $state();

// 翻译适配
let i18nVersion = $state(0);
let unregisterTranslationRenderer = () => {};
let rendererKey = $state("");

// 计算属性
let currentI18n = $derived(
	i18nVersion > -1
		? getTranslation(
				translationManager.isActive()
					? translationManager.getConfigLanguage()
					: siteConfig.lang || "en",
			)
		: null,
);
let shuffleTitle = $derived(currentI18n?.[Key.musicPlayerShuffle] ?? "");
let previousTitle = $derived(currentI18n?.[Key.musicPlayerPrevious] ?? "");
let playTitle = $derived(
	currentI18n
		? sharedIsLoading
			? currentI18n[Key.musicPlayerLoading]
			: sharedIsPlaying
				? currentI18n[Key.musicPlayerPause]
				: currentI18n[Key.musicPlayerPlay]
		: "",
);
let nextTitle = $derived(currentI18n?.[Key.musicPlayerNext] ?? "");
let playlistTitle = $derived(currentI18n?.[Key.musicPlayerPlaylist] ?? "");
let locateTitle = $derived(currentI18n?.[Key.musicPlayerLocateCurrent] ?? "");
let progressTitle = $derived(currentI18n?.[Key.musicPlayerProgress] ?? "");
let volumeTitle = $derived(currentI18n?.[Key.musicPlayerVolume] ?? "");
let repeatTitle = $derived(
	currentI18n
		? sharedIsRepeating === 1
			? currentI18n[Key.musicPlayerRepeatOne]
			: currentI18n[Key.musicPlayerRepeat]
		: "",
);
let muteTitle = $derived(
	currentI18n
		? sharedIsMuted
			? currentI18n[Key.musicPlayerUnmute]
			: currentI18n[Key.musicPlayerMute]
		: "",
);
let lyricsTitle = $derived(
	currentI18n
		? showLyrics
			? currentI18n[Key.musicPlayerLyricsHide]
			: currentI18n[Key.musicPlayerLyricsShow]
		: "",
);
let downloadTitle = $derived(currentI18n?.[Key.musicPlayerDownload] ?? "");
let errorMessage = $derived(
	sharedErrorKey && currentI18n ? (currentI18n[sharedErrorKey as keyof typeof currentI18n] ?? "") : "",
);
let settingsIdLabel = $derived(currentI18n?.[Key.musicPlayerSettingsId] ?? "");
let settingsServerLabel = $derived(currentI18n?.[Key.musicPlayerSettingsServer] ?? "");
let settingsTypeLabel = $derived(currentI18n?.[Key.musicPlayerSettingsType] ?? "");
let settingsApplyLabel = $derived(currentI18n?.[Key.musicPlayerSettingsApply] ?? "");
let settingsCancelLabel = $derived(currentI18n?.[Key.cancelText] ?? "");
let settingsNeteaseLabel = $derived(currentI18n?.[Key.musicPlayerServerNetease] ?? "");
let settingsTencentLabel = $derived(currentI18n?.[Key.musicPlayerServerTencent] ?? "");
let settingsKugouLabel = $derived(currentI18n?.[Key.musicPlayerServerKugou] ?? "");
let settingsPlaylistLabel = $derived(currentI18n?.[Key.musicPlayerTypePlaylist] ?? "");
let settingsSongLabel = $derived(currentI18n?.[Key.musicPlayerTypeSong] ?? "");
let settingsAlbumLabel = $derived(currentI18n?.[Key.musicPlayerTypeAlbum] ?? "");
let settingsArtistLabel = $derived(currentI18n?.[Key.musicPlayerTypeArtist] ?? "");

// 响应式效果
$effect(() => {
	if (showPlaylist) {
		void tick().then(() => {
			setupPlaylistObserver();
		});
	} else {
		teardownPlaylistObserver();
	}
});

$effect(() => {
	if (showLyrics && sharedCurrentLyricIndex >= 0) {
		void tick().then(() => {
			const container = playerRoot?.querySelector(".lyrics-scroll") as HTMLElement | null;
			if (!container) return;
			const activeLine = container.children[sharedCurrentLyricIndex] as HTMLElement | undefined;
			if (!activeLine) return;

			const containerHeight = container.clientHeight;
			const lineHeight = activeLine.clientHeight;
			const scrollTop = activeLine.offsetTop - containerHeight / 2 + lineHeight / 2;

			container.scrollTo({
				top: Math.max(0, scrollTop),
				behavior: "smooth",
			});
		});
	}
});

// 同步 audio 元素的 volume 和 muted 属性
$effect(() => {
	if (sharedAudio) {
		sharedAudio.volume = sharedVolume;
	}
});

$effect(() => {
	if (sharedAudio) {
		sharedAudio.muted = sharedIsMuted;
	}
});

// 歌词加载完成后，等待 DOM 更新，然后触发翻译刷新
$effect(() => {
	if (!sharedLyricsLoading && sharedLyrics.length > 0 && translationManager.isActive() && playerRoot) {
		void tick().then(() => {
			void translationManager.refresh({ root: playerRoot, reason: "lyrics-loaded" });
		});
	}
});

function refreshI18n() {
	i18nVersion++;
}

function togglePlay() {
	sharedTogglePlay();
}

function togglePlaylist() {
	showPlaylist = !showPlaylist;
	if (showPlaylist) {
		showLyrics = false;
		void tick().then(() => {
			setTimeout(() => scrollToCurrentSong("smooth"), 320);
		});
	}
}

function toggleLyrics() {
	showLyrics = !showLyrics;
	if (showLyrics) {
		showPlaylist = false;
		// 展开歌词后，如果翻译已激活，触发翻译刷新
		if (translationManager.isActive() && sharedLyrics.length > 0 && playerRoot) {
			void tick().then(() => {
				void translationManager.refresh({ root: playerRoot, reason: "lyrics-shown" });
			});
		}
	}
}

function toggleSettings() {
	showSettings = !showSettings;
	if (showSettings) {
		settingsId = musicPlayerConfig.id ?? "766208154";
		settingsServer = musicPlayerConfig.server ?? "netease";
		settingsType = musicPlayerConfig.type ?? "playlist";
	}
}

function applySettings() {
	musicPlayerConfig.id = settingsId;
	musicPlayerConfig.server = settingsServer;
	musicPlayerConfig.type = settingsType;
	sharedInitialized = false;
	sharedPlaylist = [];
	sharedCurrentIndex = 0;
	sharedIsPlaying = false;
	if (sharedAudio) {
		sharedAudio.pause();
		sharedAudio.src = "";
	}
	sharedCurrentSong = {
		id: 0,
		title: i18n(Key.unknownSong),
		artist: i18n(Key.unknownArtist),
		cover: "/favicon/Vinyl record.ico",
		url: "",
		duration: 0,
	};
	sharedInitPlaylist();
	showSettings = false;
}

function toggleShuffle() {
	sharedToggleShuffle();
}

function toggleRepeat() {
	sharedToggleRepeat();
}

function previousSong() {
	sharedPreviousSong();
}

function nextSong() {
	sharedNextSong();
}

function playSong(index: number) {
	sharedPlaySong(index);
}

function toggleMute() {
	sharedToggleMute();
}

function sanitizeFilename(name: string): string {
	return name.replace(/[\\/:*?"<>|]/g, "_").trim() || "untitled";
}

async function downloadCurrentSong() {
	const song = sharedCurrentSong;
	if (!song.url) return;

	const baseName = sanitizeFilename(`${song.artist} - ${song.title}`);

	try {
		const audioRes = await fetch(getAssetPath(song.url));
		if (!audioRes.ok) throw new Error("audio fetch failed");
		const audioBlob = await audioRes.blob();
		const audioUrl = URL.createObjectURL(audioBlob);
		const a = document.createElement("a");
		a.href = audioUrl;
		a.download = `${baseName}.mp3`;
		a.click();
		URL.revokeObjectURL(audioUrl);
	} catch (e) {
		console.warn("Failed to download audio:", e);
	}

	if (sharedLyrics.length > 0) {
		const lrcLines = sharedLyrics.map((line) => {
			const mins = Math.floor(line.time / 60);
			const secs = Math.floor(line.time % 60);
			const ms = Math.round((line.time % 1) * 1000);
			return `[${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}]${line.text}`;
		});
		const lrcText = lrcLines.join("\n");
		const lrcBlob = new Blob([lrcText], { type: "text/plain;charset=utf-8" });
		const lrcUrl = URL.createObjectURL(lrcBlob);
		const a = document.createElement("a");
		a.href = lrcUrl;
		a.download = `${baseName}.lrc`;
		a.click();
		URL.revokeObjectURL(lrcUrl);
	}
}

function hideError() {
	hideSharedError();
}

function setupPlaylistObserver() {
	teardownPlaylistObserver();
	const container = playerRoot?.querySelector(
		".playlist-inline",
	) as HTMLElement;
	if (!container) return;
	playlistScrollContainer = container;

	playlistImgObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const index = Number((entry.target as HTMLElement).dataset.index);
				if (entry.isIntersecting) {
					visiblePlaylistIndices.add(index);
				} else {
					visiblePlaylistIndices.delete(index);
				}
			}
			if (entries.length > 0) {
				visiblePlaylistIndices = new Set(visiblePlaylistIndices);
			}
		},
		{ root: container, rootMargin: "80px 0px" },
	);

	container.querySelectorAll(".playlist-img-observe").forEach((el) => {
		playlistImgObserver.observe(el);
	});
}

function teardownPlaylistObserver() {
	if (playlistImgObserver) {
		playlistImgObserver.disconnect();
		playlistImgObserver = undefined as unknown as IntersectionObserver;
	}
	visiblePlaylistIndices = new Set();
	playlistScrollContainer = undefined as unknown as HTMLElement;
}

function scrollToCurrentSong(behavior: ScrollBehavior = "smooth") {
	const container = playerRoot?.querySelector(
		".playlist-inline",
	) as HTMLElement | null;
	if (!container) return;
	const items = container.querySelectorAll(".playlist-item");
	const target = items[sharedCurrentIndex] as HTMLElement | undefined;
	if (!target) return;

	target.scrollIntoView({ behavior, block: "center" });
}

function getAssetPath(path: string): string {
	if (path.startsWith("http://") || path.startsWith("https://")) return path;
	if (path.startsWith("/")) return path;
	return `/${path}`;
}

function startProgressDrag(event: PointerEvent) {
	if (!sharedAudio || !progressBar || !sharedDuration) return;
	event.preventDefault();

	isProgressPointerDown = true;
	progressBar.setPointerCapture(event.pointerId);

	progressBarRect = progressBar.getBoundingClientRect();
	updateProgressLogic(event.clientX);
}

function handleProgressMove(event: PointerEvent) {
	if (!isProgressPointerDown) return;
	event.preventDefault();

	isProgressDragging = true;
	if (progressRafId) return;

	progressRafId = requestAnimationFrame(() => {
		updateProgressLogic(event.clientX);
		progressRafId = null;
	});
}

function stopProgressDrag(event: PointerEvent) {
	if (!isProgressPointerDown) return;
	isProgressPointerDown = false;
	isProgressDragging = false;
	progressBarRect = null;
	if (progressBar) {
		progressBar.releasePointerCapture(event.pointerId);
	}

	if (progressRafId) {
		cancelAnimationFrame(progressRafId);
		progressRafId = null;
	}
}

function updateProgressLogic(clientX: number) {
	if (!sharedAudio || !progressBar || !sharedDuration) return;

	const rect = progressBarRect || progressBar.getBoundingClientRect();
	const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
	const newTime = percent * sharedDuration;
	sharedSetCurrentTime(newTime);
}

function startVolumeDrag(event: PointerEvent) {
	if (!volumeBar || sharedIsMuted) return;
	event.preventDefault();

	isPointerDown = true;
	volumeBar.setPointerCapture(event.pointerId);

	volumeBarRect = volumeBar.getBoundingClientRect();
	updateVolumeLogic(event.clientX);
}

function handleVolumeMove(event: PointerEvent) {
	if (!isPointerDown) return;
	event.preventDefault();

	isVolumeDragging = true;
	if (rafId) return;

	rafId = requestAnimationFrame(() => {
		updateVolumeLogic(event.clientX);
		rafId = null;
	});
}

function stopVolumeDrag(event: PointerEvent) {
	if (!isPointerDown) return;
	isPointerDown = false;
	isVolumeDragging = false;
	volumeBarRect = null;
	if (volumeBar) {
		volumeBar.releasePointerCapture(event.pointerId);
	}

	if (rafId) {
		cancelAnimationFrame(rafId);
		rafId = null;
	}
}

function updateVolumeLogic(clientX: number) {
	if (!sharedAudio || !volumeBar) return;

	const rect = volumeBarRect || volumeBar.getBoundingClientRect();
	const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
	sharedSetVolume(percent);
}

function formatTime(seconds: number): string {
	if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const interactionEvents = ["click", "keydown", "touchstart"];
onMount(() => {
	instanceCount++;
	interactionEvents.forEach((event) => {
		document.addEventListener(event, sharedHandleUserInteraction, { capture: true });
	});

	rendererKey = `music-player-${Math.random().toString(36).slice(2, 9)}`;
	unregisterTranslationRenderer = translationManager.onRefresh(
		rendererKey,
		refreshI18n,
	);

	if (!musicPlayerConfig.enable) {
		return;
	}

	// 初始化共享播放列表（只执行一次）
	sharedInitPlaylist();

	// 确保 audio 元素已创建并同步状态
	const audio = getSharedAudio();
	if (sharedCurrentSong.url && audio.src !== sharedCurrentSong.url) {
		audio.src = getAssetPath(sharedCurrentSong.url);
	}
	audio.volume = sharedVolume;
	audio.muted = sharedIsMuted;

	// 监听点击外部收起设置面板
	document.addEventListener("click", handleClickOutside, { capture: true });
});

function handleClickOutside(event: MouseEvent) {
	if (!showSettings) return;
	if (!settingsPanel) return;
	const target = event.target as Node;
	if (settingsPanel.contains(target)) return;
	// 如果点击的是设置按钮，让按钮自己的 onclick 处理 toggle
	const settingsBtn = playerRoot?.querySelector('[data-settings-btn]');
	if (settingsBtn && (settingsBtn === target || settingsBtn.contains(target))) return;
	showSettings = false;
}

onDestroy(() => {
	instanceCount--;
	unregisterTranslationRenderer();
	teardownPlaylistObserver();
	if (typeof document !== "undefined") {
		interactionEvents.forEach((event) => {
			document.removeEventListener(event, sharedHandleUserInteraction, {
				capture: true,
			});
		});
		document.removeEventListener("click", handleClickOutside, { capture: true });
	}
	// 只有当所有实例都销毁时才清理 audio
	if (instanceCount <= 0 && sharedAudio) {
		sharedAudio.pause();
		sharedAudio.src = "";
		sharedAudio = null;
	}
});
</script>

<svelte:window 
    on:pointermove={(e) => { handleProgressMove(e); handleVolumeMove(e); }} 
    on:pointerup={(e) => { stopProgressDrag(e); stopVolumeDrag(e); }} 
/>

{#if musicPlayerConfig.enable}
<div class="pb-4 card-base">
    <div class="font-bold transition text-lg text-neutral-900 dark:text-neutral-100 relative ml-8 mt-4 mb-2 flex items-center justify-between pr-4
        before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
        before:absolute before:left-[-16px] before:top-[5.5px]">
        <span>{i18n(Key.musicPlayer)}</span>
        <button data-settings-btn class="btn-plain w-7 h-7 rounded-lg flex items-center justify-center"
                class:btn-active={showSettings}
                onclick={toggleSettings}
                title={i18n(Key.musicPlayerSettings)}>
            <Icon icon="material-symbols:settings-outline-rounded" class="text-xl" />
        </button>
    </div>
    {#if showSettings}
    <div class="px-4 mb-2" transition:slide={{ duration: 200, axis: 'y' }}>
        <div bind:this={settingsPanel} class="rounded-lg p-3 bg-[oklch(0.95_0.025_var(--hue))] dark:bg-[oklch(0.33_0.035_var(--hue))] space-y-3">
			<div class="flex items-center gap-2">
					<label for="mp-settings-type" class="text-sm text-[oklch(0.55_0.12_var(--hue))] dark:text-white/80 w-16 shrink-0">{settingsTypeLabel}</label>
					<select id="mp-settings-type" bind:value={settingsType}
							class="mp-select flex-1 text-sm px-2 py-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--line-divider)] text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-[var(--primary)] transition-colors">
						<option value="playlist">{settingsPlaylistLabel}</option>
						<option value="song">{settingsSongLabel}</option>
						<option value="album">{settingsAlbumLabel}</option>
						<option value="artist">{settingsArtistLabel}</option>
					</select>
			</div>
            <div class="flex items-center gap-2">
                <label for="mp-settings-id" class="text-sm text-[oklch(0.55_0.12_var(--hue))] dark:text-white/80 w-16 shrink-0">{settingsIdLabel}</label>
                <input id="mp-settings-id" type="text" bind:value={settingsId}
                       class="w-full flex-1 text-sm px-2 py-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--line-divider)] text-neutral-700 dark:text-neutral-300 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[var(--primary)] transition-colors" />
            </div>
            <div class="flex items-center gap-2">
                <label for="mp-settings-server" class="text-sm text-[oklch(0.55_0.12_var(--hue))] dark:text-white/80 w-16 shrink-0">{settingsServerLabel}</label>
                <select id="mp-settings-server" bind:value={settingsServer}
                        class="mp-select flex-1 text-sm px-2 py-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--line-divider)] text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-[var(--primary)] transition-colors">
                    <option value="netease">{settingsNeteaseLabel}</option>
                    <option value="tencent">{settingsTencentLabel}</option>
                    <option value="kugou">{settingsKugouLabel}</option>
                </select>
            </div>
            <div class="flex justify-center gap-3">
                <button class="px-6 py-2 rounded-lg text-sm font-base bg-[var(--primary)] text-white hover:opacity-90 active:scale-95 transition-all"
                        onclick={applySettings}>
                    {settingsApplyLabel}
                </button>
                <button class="px-6 py-2 rounded-lg text-sm font-base bg-[var(--btn-regular-bg)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white active:scale-95 transition-all"
                        onclick={() => showSettings = false}>
                    {settingsCancelLabel}
                </button>
            </div>
        </div>
    </div>
    {/if}
    <div class="px-4">
        {#if sharedShowError}
        <div class="mb-2 transition-all duration-300"
             transition:slide={{ duration: 300, axis: 'y' }}>
            <div class="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
                <Icon icon="material-symbols:error" class="text-xl flex-shrink-0" />
                <span class="text-sm flex-1">{errorMessage}</span>
                <button onclick={hideError} class="text-white/80 hover:text-white transition-colors">
                    <Icon icon="material-symbols:close" class="text-lg" />
                </button>
            </div>
        </div>
        {/if}

        <div bind:this={playerRoot}
             class="music-player w-full transition-all duration-300 ease-in-out">
        <div class="flex items-center gap-4 mb-4">
            <div class="cover-container relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src={getAssetPath(sharedCurrentSong.cover)} alt={i18n(Key.musicPlayerCover)} title={i18n(Key.musicPlayerCover)}
                     class="w-full h-full object-cover transition-transform duration-300"
                     class:spinning={sharedIsPlaying && !sharedIsLoading}
                     class:animate-pulse={sharedIsLoading} />
            </div>
            <div class="flex-1 min-w-0">
                <div class="ignore song-title text-lg font-bold text-90 truncate mb-1" title={sharedCurrentSong.title}>{sharedCurrentSong.title}</div>
                <div class="ignore song-artist text-sm text-50 truncate" title={sharedCurrentSong.artist}>{sharedCurrentSong.artist}</div>
                <div class="text-xs text-30 mt-1">
                    {formatTime(sharedCurrentTime)} / {formatTime(sharedDuration)}
                </div>
            </div>
        </div>
        <div class="progress-section mb-4">
            <div class="progress-bar flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer touch-none relative"
                 bind:this={progressBar}
                 onpointerdown={startProgressDrag}
                 onkeydown={(e) => {
                     if (e.key === 'Enter' || e.key === ' ') {
                         e.preventDefault();
                         const percent = 0.5;
                         const newTime = percent * sharedDuration;
                         sharedSetCurrentTime(newTime);
                     }
                 }}
                 role="slider"
                 tabindex="0"
                 title={progressTitle}
                 aria-valuemin="0"
                 aria-valuemax="100"
                 aria-valuenow={sharedDuration > 0 ? (sharedCurrentTime / sharedDuration * 100) : 0}>
                <div class="h-full bg-[var(--primary)] rounded-full transition-all"
                     class:duration-100={!isProgressDragging}
                     class:duration-0={isProgressDragging}
                     style="width: {sharedDuration > 0 ? (sharedCurrentTime / sharedDuration) * 100 : 0}%"></div>

            </div>
        </div>
        {#if showLyrics}
            <div class="lyrics-section mb-4 overflow-hidden rounded-lg max-h-[200px] bg-[oklch(0.95_0.025_var(--hue))] dark:bg-[oklch(0.33_0.035_var(--hue))]" transition:slide={{ duration: 300, axis: 'y' }}>
                {#if sharedLyricsLoading}
                    <div class="flex items-center justify-center py-8 text-50">
                        <Icon icon="eos-icons:loading" class="text-lg animate-spin mr-2" />
                        <span class="text-sm">{currentI18n?.[Key.musicPlayerLoading] ?? ""}</span>
                    </div>
                {:else if sharedNoLyricsFound}
                    <div class="flex items-center justify-center py-8 text-50">
                        <Icon icon="material-symbols:lyrics-off" class="text-lg mr-2" />
                        <span class="text-sm">{currentI18n?.[Key.musicPlayerNoLyrics] ?? ""}</span>
                    </div>
                {:else if sharedLyrics.length > 0}
                    <div class="lyrics-scroll overflow-y-auto hide-scrollbar py-3 px-2 max-h-[200px]">
                        {#each sharedLyrics as line, index}
                            <div class="lyric-line px-3 py-1.5 rounded-md transition-all duration-300 text-sm text-center leading-normal whitespace-normal break-words hover:text-[var(--primary)]"
                                 class:text-[var(--primary)]={index === sharedCurrentLyricIndex}
                                 class:text-90={index !== sharedCurrentLyricIndex}
                                 class:font-bold={index === sharedCurrentLyricIndex}
                                 class:scale-105={index === sharedCurrentLyricIndex}
                                 class:opacity-50={index !== sharedCurrentLyricIndex && Math.abs(index - sharedCurrentLyricIndex) > 2}
                                 role="button"
                                 tabindex="0"
                                 onclick={() => {
                                     sharedSetCurrentTime(line.time);
                                 }}
                                 onkeydown={(e) => {
                                     if (e.key === 'Enter' || e.key === ' ') {
                                         e.preventDefault();
                                         sharedSetCurrentTime(line.time);
                                     }
                                 }}>
                                {line.text}
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
        <div class="controls flex items-center justify-center gap-2 mb-4">
            <button class="w-10 h-10 rounded-lg"
                    class:btn-regular={sharedIsShuffled}
                    class:btn-plain={!sharedIsShuffled}
                    onclick={toggleShuffle}
                    title={shuffleTitle}
                    disabled={sharedPlaylist.length <= 1}>
                <Icon icon="material-symbols:shuffle" class="text-lg" />
            </button>
            <button class="btn-plain w-10 h-10 rounded-lg" onclick={previousSong}
                    title={previousTitle}
                    disabled={sharedPlaylist.length <= 1}>
                <Icon icon="material-symbols:skip-previous" class="text-xl" />
            </button>
            <button class="btn-regular w-12 h-12 rounded-full"
                    class:opacity-50={sharedIsLoading}
                    disabled={sharedIsLoading}
                    title={playTitle}
                    onclick={togglePlay}>
                {#if sharedIsLoading}
                    <Icon icon="eos-icons:loading" class="text-xl" />
                {:else if sharedIsPlaying}
                    <Icon icon="material-symbols:pause" class="text-xl" />
                {:else}
                    <Icon icon="material-symbols:play-arrow" class="text-xl" />
                {/if}
            </button>
            <button class="btn-plain w-10 h-10 rounded-lg" onclick={nextSong}
                    title={nextTitle}
                    disabled={sharedPlaylist.length <= 1}>
                <Icon icon="material-symbols:skip-next" class="text-xl" />
            </button>
            <button class="w-10 h-10 rounded-lg"
                    class:btn-regular={sharedIsRepeating > 0}
                    class:btn-plain={sharedIsRepeating === 0}
                    title={repeatTitle}
                    onclick={toggleRepeat}>
                {#if sharedIsRepeating === 1}
                    <Icon icon="material-symbols:repeat-one" class="text-lg" />
                {:else if sharedIsRepeating === 2}
                    <Icon icon="material-symbols:repeat" class="text-lg" />
                {:else}
                    <Icon icon="material-symbols:repeat" class="text-lg opacity-50" />
                {/if}
            </button>
        </div>
        <div class="bottom-controls flex items-center gap-2">
            <button class="btn-plain w-8 h-8 rounded-lg" onclick={toggleMute} title={muteTitle}>
                {#if sharedIsMuted || sharedVolume === 0}
                    <Icon icon="material-symbols:volume-off" class="text-lg" />
                {:else if sharedVolume < 0.5}
                    <Icon icon="material-symbols:volume-down" class="text-lg" />
                {:else}
                    <Icon icon="material-symbols:volume-up" class="text-lg" />
                {/if}
            </button>
            <div class="flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer touch-none transition-opacity duration-300"
                 class:opacity-50={sharedIsMuted}
                 class:pointer-events-none={sharedIsMuted}
                 bind:this={volumeBar}
                 onpointerdown={startVolumeDrag}
                 onkeydown={(e) => {
                     if (e.key === 'Enter' || e.key === ' ') {
                         e.preventDefault();
						 if (e.key === 'Enter') toggleMute();
                     }
                 }}
                 role="slider"
                 tabindex="0"
                 title={volumeTitle}
                 aria-valuemin="0"
                 aria-valuemax="100"
                 aria-valuenow={sharedVolume * 100}>
                <div class="h-full bg-[var(--primary)] rounded-full transition-all"
                     class:duration-100={!isVolumeDragging}
                     class:duration-0={isVolumeDragging}
                     style="width: {sharedVolume * 100}%"></div>
            </div>
            <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center disabled:cursor-not-allowed disabled:text-neutral-300 disabled:dark:text-neutral-600 disabled:hover:bg-transparent disabled:hover:text-neutral-300 disabled:hover:dark:text-neutral-600"
                    class:btn-active={showLyrics}
                    disabled={sharedIsLoading || sharedPlaylist.length === 0}
                    onclick={toggleLyrics}
                    title={lyricsTitle}>
                <Icon icon="material-symbols:lyrics" class="text-lg" />
            </button>
            <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center disabled:cursor-not-allowed disabled:text-neutral-300 disabled:dark:text-neutral-600 disabled:hover:bg-transparent disabled:hover:text-neutral-300 disabled:hover:dark:text-neutral-600"
                    disabled={!sharedCurrentSong.url}
                    onclick={downloadCurrentSong}
                    title={downloadTitle}>
                <Icon icon="material-symbols:cloud-download" class="text-lg" />
            </button>
            <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center disabled:cursor-not-allowed disabled:text-neutral-300 disabled:dark:text-neutral-600 disabled:hover:bg-transparent disabled:hover:text-neutral-300 disabled:hover:dark:text-neutral-600"
                    class:btn-active={showPlaylist}
                    disabled={sharedIsLoading || sharedPlaylist.length === 0}
                    onclick={togglePlaylist}
                    title={playlistTitle}>
                <Icon icon="material-symbols:queue-music" class="text-lg" />
            </button>
        </div>
        {#if showPlaylist}
            <div class="playlist-section relative mt-4 overflow-hidden rounded-lg max-h-[240px] bg-[oklch(0.95_0.025_var(--hue))] dark:bg-[oklch(0.33_0.035_var(--hue))]" transition:slide={{ duration: 300, axis: 'y' }}>
                <div class="playlist-inline overflow-y-auto hide-scrollbar py-2" style="max-height: 240px;">
                    {#each sharedPlaylist as song, index}
                        <div class="playlist-item group flex items-center gap-3 px-3 py-2"
                             class:bg-[var(--btn-plain-bg)]={index === sharedCurrentIndex}
                             onclick={() => playSong(index)}
                             onkeydown={(e) => {
                                 if (e.key === 'Enter' || e.key === ' ') {
                                     e.preventDefault();
                                     playSong(index);
                                 }
                             }}
                             role="button"
                             tabindex="0"
                             aria-label="play {song.title} - {song.artist}">
                            <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                {#if index === sharedCurrentIndex && sharedIsPlaying}
                                    <Icon icon="material-symbols:graphic-eq" class="text-[var(--primary)] animate-pulse" />
                                {:else if index === sharedCurrentIndex}
                                    <Icon icon="material-symbols:pause" class="text-[var(--primary)]" />
                                {:else}
                                    <span class="text-sm text-[var(--content-meta)] transition-colors duration-300 group-hover:text-[var(--primary)]">{index + 1}</span>
                                {/if}
                            </div>
                            <div class="w-10 h-10 rounded-lg overflow-hidden bg-[var(--btn-regular-bg)] flex-shrink-0 playlist-img-observe" data-index={index}>
                                {#if visiblePlaylistIndices.has(index)}
                                    <img src={getAssetPath(song.cover)} alt={song.title} class="w-full h-full object-cover" />
                                {/if}
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="font-bold truncate text-sm ignore transition-colors duration-300 group-hover:text-[var(--primary)]" class:text-[var(--primary)]={index === sharedCurrentIndex} class:text-90={index !== sharedCurrentIndex} title={song.title}>
                                    {song.title}
                                </div>
                                <div class="text-xs text-[var(--content-meta)] truncate ignore transition-colors duration-300 group-hover:text-[var(--primary)]" class:text-[var(--primary)]={index === sharedCurrentIndex} title={song.artist}>
                                    {song.artist}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
                <button
                    class="absolute bottom-3 right-2 w-8 h-8 rounded-full bg-[var(--btn-plain-bg)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white flex items-center justify-center transition-all duration-200 z-10"
                    onclick={() => scrollToCurrentSong()}
                    title={locateTitle}>
                    <Icon icon="material-symbols:my-location" class="text-lg" />
                </button>
            </div>
        {/if}
    </div>
</div>
</div>
{/if}

<style>
.music-player {
    user-select: none;
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
    0%, 100% {
        opacity: 1;
	}
    50% {
        opacity: 0.5;
	}
}
.progress-section div:hover,
.bottom-controls > div:hover {
    transform: scaleY(1.2);
    transition: transform 0.2s ease;
}

.playlist-item {
	content-visibility: auto;
	contain-intrinsic-size: auto 52px;
}

@media (hover: none) and (pointer: coarse) {
    .music-player button,
    .playlist-item {
        min-height: 44px;
	}
    .progress-section > div,
    .bottom-controls > div:nth-child(2) {
        height: 12px;
	}
}

@keyframes spin-continuous {
    from {
        transform: rotate(0deg);
	}
    to {
        transform: rotate(360deg);
	}
}

.cover-container img {
    animation: spin-continuous 3s linear infinite;
    animation-play-state: paused;
}

.cover-container img.spinning {
    animation-play-state: running;
}

.btn-active {
    color: var(--primary) !important;
}

.lyrics-scroll {
    position: relative;
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
    mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
}

.playlist-inline {
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
    mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
}

.lyrics-scroll::-webkit-scrollbar {
    width: 4px;
}

.lyrics-scroll::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 2px;
}

.lyrics-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.mp-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px center;
    padding-right: 24px;
}
</style>