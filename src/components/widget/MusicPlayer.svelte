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
	lrc?: string;
	duration: number;
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

function getInitialCurrentSong(): Song {
	const mode = musicPlayerConfig.mode ?? "meting";
	if (mode === "local") {
		const list = musicPlayerConfig.localPlaylist;
		if (list.length > 0) {
			const first = list[0];
			return {
				id: Number(first.id) || 1,
				title: first.title || i18n(Key.unknownSong),
				artist: first.artist || i18n(Key.unknownArtist),
				cover: first.cover || "/favicon/Vinyl record.ico",
				url: first.url || "",
				lrc: first.lrc,
				duration: first.duration || 0,
			};
		}
	}
	return {
		id: 0,
		title: i18n(Key.unknownSong),
		artist: i18n(Key.unknownArtist),
		cover: "/favicon/Vinyl record.ico",
		url: "",
		duration: 0,
	};
}

// 当前播放的歌曲信息
let sharedCurrentSong: Song = $state(getInitialCurrentSong());

// 记录已初始化（防止多个实例重复加载播放列表）
let sharedInitialized = $state(false);

// 记录初始化时的模式，用于检测模式切换后重新初始化
let sharedInitializedMode: string | null = null;

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
	} else if (sharedLyrics.length === 0 && !sharedLyricsLoading && song.lrc) {
		sharedFetchLyrics(song);
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
			const lrcPath = song.lrc.startsWith("/") ? song.lrc : `/${song.lrc}`;
			const res = await fetch(lrcPath);
			if (!res.ok) throw new Error("lyrics fetch failed");
			lrcText = await res.text();
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
	const mode = musicPlayerConfig.mode ?? "meting";
	// 如果已经初始化且模式没有变化，则跳过
	if (sharedInitialized && sharedInitializedMode === mode) return;
	sharedInitialized = true;
	sharedInitializedMode = mode;

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

// 外部传入的 props
let { class: className = "" }: { class?: string } = $props();

// 这些状态只影响当前实例的 UI，不影响播放核心状态

let showPlaylist = $state(musicPlayerConfig.showPlaylist);
let showLyrics = $state(musicPlayerConfig.showLyrics ?? false);
let showSettings = $state(false);

let isLocalMode = $derived(musicPlayerConfig.mode === "local");
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
		showLyrics = false;
		showPlaylist = false;
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
	sharedInitializedMode = null;
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

function inferAudioExt(url: string, mimeType: string): string {
	const urlExtMatch = url.match(/\.(\w+)(?:\?|$)/);
	if (urlExtMatch) {
		const ext = urlExtMatch[1].toLowerCase();
		if (ext === "m4a") return "m4a";
	}
	const mimeMap: Record<string, string> = {
		"audio/mp4": "m4a",
		"audio/x-m4a": "m4a",
	};
	if (mimeMap[mimeType.toLowerCase()]) return "m4a";
	return "mp3";
}

async function fetchCoverImage(coverUrl: string): Promise<{ data: ArrayBuffer; mime: string } | null> {
	if (!coverUrl) return null;
	try {
		const proxyUrl = coverUrl.startsWith("http://") || coverUrl.startsWith("https://")
			? `${musicPlayerConfig.coverProxy || ""}${encodeURIComponent(coverUrl)}`
			: getAssetPath(coverUrl);
		const res = await fetch(proxyUrl);
		if (!res.ok) return null;
		const mime = res.headers.get("content-type") || "image/jpeg";
		const data = await res.arrayBuffer();
		if (data.byteLength === 0) return null;
		return { data, mime };
	} catch (error) {
		if (coverUrl.startsWith("http://") || coverUrl.startsWith("https://")) {
			showSharedErrorMessage(Key.musicPlayerErrorCoverCORS);
		}
		return null;
	}
}

function buildId3v2ApicFrame(imageData: ArrayBuffer, imageMime: string): Uint8Array {
	const mimeStr = (imageMime.includes("png") ? "image/png" : "image/jpeg") + "\0";
	const mimeBytes = new TextEncoder().encode(mimeStr);
	const frameDataLen = 1 + mimeBytes.length + 1 + 1 + imageData.byteLength;
	const frame = new Uint8Array(10 + frameDataLen);
	const view = new DataView(frame.buffer);
	frame[0] = 0x41; frame[1] = 0x50; frame[2] = 0x49; frame[3] = 0x43;
	view.setUint32(4, frameDataLen);
	frame[8] = 0; frame[9] = 0;
	frame[10] = 0;
	frame.set(mimeBytes, 11);
	let off = 11 + mimeBytes.length;
	frame[off++] = 3;
	frame[off++] = 0;
	frame.set(new Uint8Array(imageData), off);
	return frame;
}

function embedMp3Cover(audioData: ArrayBuffer, imageData: ArrayBuffer, imageMime: string): ArrayBuffer {
	const bytes = new Uint8Array(audioData);
	const hasId3 = bytes.length >= 10 && bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33;
	const apicFrame = buildId3v2ApicFrame(imageData, imageMime);

	if (hasId3) {
		const version = bytes[3];
		const tagBodySize = ((bytes[6] & 0x7f) << 21) | ((bytes[7] & 0x7f) << 14) | ((bytes[8] & 0x7f) << 7) | (bytes[9] & 0x7f);
		const tagTotal = 10 + tagBodySize;
		const frames: Uint8Array[] = [];
		let pos = 10;
		while (pos + 10 <= tagTotal) {
			if (bytes[pos] === 0) break;
			const id = String.fromCharCode(bytes[pos], bytes[pos + 1], bytes[pos + 2], bytes[pos + 3]);
			let fsize: number;
			if (version === 4) {
				fsize = ((bytes[pos + 4] & 0x7f) << 21) | ((bytes[pos + 5] & 0x7f) << 14) | ((bytes[pos + 6] & 0x7f) << 7) | (bytes[pos + 7] & 0x7f);
			} else {
				fsize = (bytes[pos + 4] << 24) | (bytes[pos + 5] << 16) | (bytes[pos + 6] << 8) | bytes[pos + 7];
			}
			if (fsize <= 0 || pos + 10 + fsize > tagTotal) break;
			if (id !== "APIC") frames.push(bytes.slice(pos, pos + 10 + fsize));
			pos += 10 + fsize;
		}
		frames.push(apicFrame);
		const totalFrameBytes = frames.reduce((s, f) => s + f.length, 0);
		const newTag = new Uint8Array(10 + totalFrameBytes);
		newTag[0] = 0x49; newTag[1] = 0x44; newTag[2] = 0x33;
		newTag[3] = 3; newTag[4] = 0; newTag[5] = 0;
		newTag[6] = (totalFrameBytes >> 21) & 0x7f;
		newTag[7] = (totalFrameBytes >> 14) & 0x7f;
		newTag[8] = (totalFrameBytes >> 7) & 0x7f;
		newTag[9] = totalFrameBytes & 0x7f;
		let w = 10;
		for (const f of frames) { newTag.set(f, w); w += f.length; }
		const result = new Uint8Array(newTag.length + (audioData.byteLength - tagTotal));
		result.set(newTag);
		result.set(bytes.subarray(tagTotal), newTag.length);
		return result.buffer as ArrayBuffer;
	}

	const totalFrameBytes = apicFrame.length;
	const tag = new Uint8Array(10 + totalFrameBytes);
	tag[0] = 0x49; tag[1] = 0x44; tag[2] = 0x33;
	tag[3] = 3; tag[4] = 0; tag[5] = 0;
	tag[6] = (totalFrameBytes >> 21) & 0x7f;
	tag[7] = (totalFrameBytes >> 14) & 0x7f;
	tag[8] = (totalFrameBytes >> 7) & 0x7f;
	tag[9] = totalFrameBytes & 0x7f;
	tag.set(apicFrame, 10);
	const result = new Uint8Array(tag.length + audioData.byteLength);
	result.set(tag);
	result.set(bytes, tag.length);
	return result.buffer;
}

function mp4FindAtom(data: Uint8Array, start: number, end: number, type: string): { offset: number; size: number } | null {
	let pos = start;
	while (pos + 8 <= end && pos + 8 <= data.length) {
		const size = (data[pos] << 24) | (data[pos + 1] << 16) | (data[pos + 2] << 8) | data[pos + 3];
		const t = String.fromCharCode(data[pos + 4], data[pos + 5], data[pos + 6], data[pos + 7]);
		if (t === type) return { offset: pos, size };
		if (size < 8 || pos + size > end) break;
		pos += size;
	}
	return null;
}

function mp4FindAllAtoms(data: Uint8Array, start: number, end: number, type: string): { offset: number; size: number }[] {
	const results: { offset: number; size: number }[] = [];
	let pos = start;
	while (pos + 8 <= end && pos + 8 <= data.length) {
		const size = (data[pos] << 24) | (data[pos + 1] << 16) | (data[pos + 2] << 8) | data[pos + 3];
		const t = String.fromCharCode(data[pos + 4], data[pos + 5], data[pos + 6], data[pos + 7]);
		if (t === type) results.push({ offset: pos, size });
		if (size < 8 || pos + size > end) break;
		pos += size;
	}
	return results;
}

function m4aUpdateStcoOffsets(data: Uint8Array, moovStart: number, moovEnd: number, delta: number) {
	const traks = mp4FindAllAtoms(data, moovStart + 8, moovEnd, "trak");
	for (const trak of traks) {
		const mdia = mp4FindAtom(data, trak.offset + 8, trak.offset + trak.size, "mdia");
		if (!mdia) continue;
		const minf = mp4FindAtom(data, mdia.offset + 8, mdia.offset + mdia.size, "minf");
		if (!minf) continue;
		const stbl = mp4FindAtom(data, minf.offset + 8, minf.offset + minf.size, "stbl");
		if (!stbl) continue;

		const stco = mp4FindAtom(data, stbl.offset + 8, stbl.offset + stbl.size, "stco");
		if (stco) {
			const entryCount = (data[stco.offset + 12] << 24) | (data[stco.offset + 13] << 16) | (data[stco.offset + 14] << 8) | data[stco.offset + 15];
			for (let i = 0; i < entryCount; i++) {
				const off = stco.offset + 16 + i * 4;
				const oldVal = (data[off] << 24) | (data[off + 1] << 16) | (data[off + 2] << 8) | data[off + 3];
				const newVal = oldVal + delta;
				data[off] = (newVal >> 24) & 0xff;
				data[off + 1] = (newVal >> 16) & 0xff;
				data[off + 2] = (newVal >> 8) & 0xff;
				data[off + 3] = newVal & 0xff;
			}
		}

		const co64 = mp4FindAtom(data, stbl.offset + 8, stbl.offset + stbl.size, "co64");
		if (co64) {
			const entryCount = (data[co64.offset + 12] << 24) | (data[co64.offset + 13] << 16) | (data[co64.offset + 14] << 8) | data[co64.offset + 15];
			for (let i = 0; i < entryCount; i++) {
				const off = co64.offset + 16 + i * 8;
				const hi = (data[off] << 24) | (data[off + 1] << 16) | (data[off + 2] << 8) | data[off + 3];
				const lo = (data[off + 4] << 24) | (data[off + 5] << 16) | (data[off + 6] << 8) | data[off + 7];
				const oldVal = (BigInt(hi) << BigInt(32)) | BigInt(lo >>> 0);
				const newVal = oldVal + BigInt(delta);
				const newHi = Number(newVal >> BigInt(32));
				const newLo = Number(newVal & BigInt(0xffffffff));
				data[off] = (newHi >> 24) & 0xff;
				data[off + 1] = (newHi >> 16) & 0xff;
				data[off + 2] = (newHi >> 8) & 0xff;
				data[off + 3] = newHi & 0xff;
				data[off + 4] = (newLo >> 24) & 0xff;
				data[off + 5] = (newLo >> 16) & 0xff;
				data[off + 6] = (newLo >> 8) & 0xff;
				data[off + 7] = newLo & 0xff;
			}
		}
	}
}

function mp4WriteSize(data: Uint8Array, offset: number, size: number) {
	data[offset] = (size >> 24) & 0xff;
	data[offset + 1] = (size >> 16) & 0xff;
	data[offset + 2] = (size >> 8) & 0xff;
	data[offset + 3] = size & 0xff;
}

function buildCovrAtom(imageData: ArrayBuffer, imageMime: string): Uint8Array {
	const typeFlag = imageMime.includes("png") ? 0x0e : 0x0d;
	const dataAtomSize = 8 + 1 + 3 + 4 + imageData.byteLength;
	const dataAtom = new Uint8Array(dataAtomSize);
	mp4WriteSize(dataAtom, 0, dataAtomSize);
	dataAtom[4] = 0x64; dataAtom[5] = 0x61; dataAtom[6] = 0x74; dataAtom[7] = 0x61;
	dataAtom[8] = 0;
	dataAtom[9] = 0; dataAtom[10] = 0; dataAtom[11] = typeFlag;
	dataAtom[12] = 0; dataAtom[13] = 0; dataAtom[14] = 0; dataAtom[15] = 0;
	dataAtom.set(new Uint8Array(imageData), 16);
	const covrSize = 8 + dataAtomSize;
	const covr = new Uint8Array(covrSize);
	mp4WriteSize(covr, 0, covrSize);
	covr[4] = 0x63; covr[5] = 0x6f; covr[6] = 0x76; covr[7] = 0x72;
	covr.set(dataAtom, 8);
	return covr;
}

function m4aBuildIlstAtom(imageData: ArrayBuffer, imageMime: string): Uint8Array {
	const covr = buildCovrAtom(imageData, imageMime);
	const ilst = new Uint8Array(8 + covr.length);
	mp4WriteSize(ilst, 0, ilst.length);
	ilst[4] = 0x69; ilst[5] = 0x6c; ilst[6] = 0x73; ilst[7] = 0x74;
	ilst.set(covr, 8);
	return ilst;
}

function m4aBuildMetaAtom(imageData: ArrayBuffer, imageMime: string): Uint8Array {
	const hdlr = new Uint8Array(33);
	mp4WriteSize(hdlr, 0, 33);
	hdlr[4] = 0x68; hdlr[5] = 0x64; hdlr[6] = 0x6c; hdlr[7] = 0x72;
	hdlr[16] = 0x6d; hdlr[17] = 0x64; hdlr[18] = 0x69; hdlr[19] = 0x72;
	const ilst = m4aBuildIlstAtom(imageData, imageMime);
	const meta = new Uint8Array(8 + 4 + hdlr.length + ilst.length);
	mp4WriteSize(meta, 0, meta.length);
	meta[4] = 0x6d; meta[5] = 0x65; meta[6] = 0x74; meta[7] = 0x61;
	meta.set(hdlr, 12);
	meta.set(ilst, 12 + hdlr.length);
	return meta;
}

function m4aInsertAndResize(data: Uint8Array, insertPos: number, insertData: Uint8Array, parentOffsets: number[]): Uint8Array {
	const result = new Uint8Array(data.length + insertData.length);
	result.set(data.subarray(0, insertPos));
	result.set(insertData, insertPos);
	result.set(data.subarray(insertPos), insertPos + insertData.length);
	for (const off of parentOffsets) {
		const old = (result[off] << 24) | (result[off + 1] << 16) | (result[off + 2] << 8) | result[off + 3];
		mp4WriteSize(result, off, old + insertData.length);
	}
	return result;
}

function embedM4aCover(audioData: ArrayBuffer, imageData: ArrayBuffer, imageMime: string): ArrayBuffer {
	const data = new Uint8Array(audioData);
	const moov = mp4FindAtom(data, 0, data.length, "moov");
	if (!moov) return audioData;

	const mdat = mp4FindAtom(data, 0, data.length, "mdat");
	const moovBeforeMdat = mdat ? moov.offset < mdat.offset : false;

	const moovEnd = moov.offset + moov.size;
	const udta = mp4FindAtom(data, moov.offset + 8, moovEnd, "udta");

	if (!udta) {
		const metaAtom = m4aBuildMetaAtom(imageData, imageMime);
		const udtaAtom = new Uint8Array(8 + metaAtom.length);
		mp4WriteSize(udtaAtom, 0, udtaAtom.length);
		udtaAtom[4] = 0x75; udtaAtom[5] = 0x64; udtaAtom[6] = 0x74; udtaAtom[7] = 0x61;
		udtaAtom.set(metaAtom, 8);
		const result = m4aInsertAndResize(data, moovEnd, udtaAtom, [moov.offset]);
		if (moovBeforeMdat) m4aUpdateStcoOffsets(result, moov.offset, moovEnd + udtaAtom.length, udtaAtom.length);
		return result as unknown as ArrayBuffer;
	}

	const meta = mp4FindAtom(data, udta.offset + 8, udta.offset + udta.size, "meta");
	if (!meta) {
		const metaAtom = m4aBuildMetaAtom(imageData, imageMime);
		const insertPos = udta.offset + udta.size;
		const result = m4aInsertAndResize(data, insertPos, metaAtom, [udta.offset, moov.offset]);
		if (moovBeforeMdat) m4aUpdateStcoOffsets(result, moov.offset, moovEnd + metaAtom.length, metaAtom.length);
		return result as unknown as ArrayBuffer;
	}

	const metaChildrenStart = meta.offset + 12;
	const metaChildrenEnd = meta.offset + meta.size;
	const ilst = mp4FindAtom(data, metaChildrenStart, metaChildrenEnd, "ilst");
	if (!ilst) {
		const ilstAtom = m4aBuildIlstAtom(imageData, imageMime);
		const insertPos = meta.offset + meta.size;
		const result = m4aInsertAndResize(data, insertPos, ilstAtom, [meta.offset, udta.offset, moov.offset]);
		if (moovBeforeMdat) m4aUpdateStcoOffsets(result, moov.offset, moovEnd + ilstAtom.length, ilstAtom.length);
		return result as unknown as ArrayBuffer;
	}

	const covr = mp4FindAtom(data, ilst.offset + 8, ilst.offset + ilst.size, "covr");
	const covrAtom = buildCovrAtom(imageData, imageMime);

	if (covr) {
		const delta = covrAtom.length - covr.size;
		const result = new Uint8Array(data.length + delta);
		result.set(data.subarray(0, covr.offset));
		result.set(covrAtom, covr.offset);
		result.set(data.subarray(covr.offset + covr.size), covr.offset + covrAtom.length);
		for (const off of [ilst.offset, meta.offset, udta.offset, moov.offset]) {
			const old = (result[off] << 24) | (result[off + 1] << 16) | (result[off + 2] << 8) | result[off + 3];
			mp4WriteSize(result, off, old + delta);
		}
		if (moovBeforeMdat) m4aUpdateStcoOffsets(result, moov.offset, moovEnd + delta, delta);
		return result.buffer as ArrayBuffer;
	}

	const insertPos = ilst.offset + ilst.size;
	const result = m4aInsertAndResize(data, insertPos, covrAtom, [ilst.offset, meta.offset, udta.offset, moov.offset]);
	if (moovBeforeMdat) m4aUpdateStcoOffsets(result, moov.offset, moovEnd + covrAtom.length, covrAtom.length);
	return result as unknown as ArrayBuffer;
}

async function downloadCurrentSong() {
	const song = sharedCurrentSong;
	if (!song.url) return;

	const baseName = sanitizeFilename(`${song.artist} - ${song.title}`);

	try {
		const audioRes = await fetch(getAssetPath(song.url));
		if (!audioRes.ok) throw new Error("audio fetch failed");
		const audioBlob = await audioRes.blob();
		const ext = inferAudioExt(song.url, audioBlob.type);
		let audioData = await audioBlob.arrayBuffer();

		const cover = await fetchCoverImage(song.cover);
		if (cover) {
			try {
				if (ext === "mp3") {
					audioData = embedMp3Cover(audioData, cover.data, cover.mime);
				} else if (ext === "m4a") {
					audioData = embedM4aCover(audioData, cover.data, cover.mime);
				}
			} catch (e) {
				console.warn("Failed to embed cover:", e);
			}
		}

		const audioUrl = URL.createObjectURL(new Blob([audioData], { type: audioBlob.type }));
		const a = document.createElement("a");
		a.href = audioUrl;
		a.download = `${baseName}.${ext}`;
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

	const containerHeight = container.clientHeight;
	const targetHeight = target.clientHeight;
	const scrollTop = target.offsetTop - containerHeight / 2 + targetHeight / 2;

	container.scrollTo({
		top: Math.max(0, scrollTop),
		behavior,
	});
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

	// 监听音乐播放器面板关闭，收起歌词和播放列表面板
	const musicPanel = document.getElementById("music-player-panel");
	if (musicPanel) {
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === "attributes" && mutation.attributeName === "class") {
					if (musicPanel.classList.contains("float-panel-closed")) {
						showLyrics = false;
						showPlaylist = false;
					}
				}
			}
		});
		observer.observe(musicPanel, { attributes: true, attributeFilter: ["class"] });
		onDestroy(() => observer.disconnect());
	}
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
<div class="pb-4 card-base {className}">
    <div class="font-bold transition text-lg text-neutral-900 dark:text-neutral-100 relative ml-8 mt-4 mb-2 flex items-center justify-between pr-4
        before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
        before:absolute before:left-[-16px] before:top-[5.5px]">
        <span>{i18n(Key.musicPlayer)}</span>
        {#if !isLocalMode}
        <button data-settings-btn class="btn-plain w-7 h-7 rounded-lg flex items-center justify-center"
                class:btn-active={showSettings}
                onclick={toggleSettings}
                title={i18n(Key.musicPlayerSettings)}>
            <Icon icon="material-symbols:settings-outline-rounded" class="text-xl" />
        </button>
        {/if}
    </div>
    {#if showSettings && !isLocalMode}
    <div class="px-4 mb-2" transition:slide={{ duration: 200, axis: 'y' }}>
        <div bind:this={settingsPanel} class="rounded-lg p-3 bg-[oklch(0.95_0.025_var(--hue))] dark:bg-[oklch(0.33_0.035_var(--hue))] space-y-3">
			<div class="flex items-center gap-2">
					<label for="mp-settings-type" class="text-sm font-bold text-[oklch(0.55_0.12_var(--hue))] dark:text-white/80 w-16 shrink-0">{settingsTypeLabel}</label>
					<select id="mp-settings-type" bind:value={settingsType}
							class="mp-select flex-1 text-sm px-2 py-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--line-divider)] text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-[var(--primary)] transition-colors">
						<option value="playlist">{settingsPlaylistLabel}</option>
						<option value="song">{settingsSongLabel}</option>
						<option value="album">{settingsAlbumLabel}</option>
						<option value="artist">{settingsArtistLabel}</option>
					</select>
			</div>
            <div class="flex items-center gap-2">
                <label for="mp-settings-id" class="text-sm font-bold text-[oklch(0.55_0.12_var(--hue))] dark:text-white/80 w-16 shrink-0">{settingsIdLabel}</label>
                <input id="mp-settings-id" type="text" bind:value={settingsId}
                       class="w-full flex-1 text-sm px-2 py-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--line-divider)] text-neutral-700 dark:text-neutral-300 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[var(--primary)] transition-colors" />
            </div>
            <div class="flex items-center gap-2">
                <label for="mp-settings-server" class="text-sm font-bold text-[oklch(0.55_0.12_var(--hue))] dark:text-white/80 w-16 shrink-0">{settingsServerLabel}</label>
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
            </div>
        </div>

		<div class="flex justify-between mb-2">
                <div class="text-xs text-50 whitespace-nowrap">
                    {formatTime(sharedCurrentTime)}
                </div>
                <div class="text-xs text-50 whitespace-nowrap">
                    {formatTime(sharedDuration)}
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
                 aria-valuenow={sharedDuration > 0 ? Math.min(sharedCurrentTime / sharedDuration * 100, 100) : 0}>
                <div class="h-full bg-[var(--primary)] rounded-full transition-all"
                     class:duration-100={!isProgressDragging}
                     class:duration-0={isProgressDragging}
                     style="width: {sharedDuration > 0 ? Math.min((sharedCurrentTime / sharedDuration) * 100, 100) : 0}%"></div>

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
                    onclick={(e) => { e.stopPropagation(); toggleRepeat(); }}>
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
            <button class="btn-plain w-8 h-8 rounded-lg" onclick={(e) => { e.stopPropagation(); toggleMute(); }} title={muteTitle}>
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
                <div class="h-full bg-[var(--primary)] rounded-full"
                     class:transition-all={!isVolumeDragging}
                     class:duration-200={!isVolumeDragging}
                     class:opacity-50={sharedIsMuted}
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
                             data-current={index === sharedCurrentIndex ? "true" : undefined}
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
.progress-section div,
.bottom-controls > div {
    transition: transform 0.2s ease;
}

.progress-section div:hover,
.bottom-controls > div:hover {
    transform: scaleY(1.3);
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
