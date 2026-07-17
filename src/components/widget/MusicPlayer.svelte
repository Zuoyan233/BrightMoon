<script lang="ts">
import Icon from "@iconify/svelte";
import { onDestroy, onMount, tick } from "svelte";
import { slide } from "svelte/transition";
// 从配置文件中导入音乐播放器配置
import { musicPlayerConfig, siteConfig } from "../../config";
// 导入国际化相关的 Key 和 i18n 实例
import Key from "../../i18n/i18nKey";
import { getTranslation, i18n } from "../../i18n/translation";
import { translationManager } from "../../utils/translation-manager";

// 音乐播放器模式，从配置中获取或使用默认值，可选 "local" 或 "meting"
let mode = musicPlayerConfig.mode ?? "meting";
// Meting API 地址，部分音乐平台可能不支持并且速度可能慢，也可以自建 Meting API
let meting_api = musicPlayerConfig.meting_api;
// Meting API 的 ID，从配置中获取或使用默认值
let meting_id = musicPlayerConfig.id ?? "766208154";
// Meting API 的服务器，从配置中获取或使用默认值，有的meting的api源支持更多平台，一般来说，netease=网易云音乐，tencent=QQ音乐，kugou=酷狗音乐，xiami=虾米音乐，baidu=百度音乐
let meting_server = musicPlayerConfig.server ?? "netease";
// Meting API 的类型，从配置中获取或使用默认值
let meting_type = musicPlayerConfig.type ?? "playlist";

// 播放状态
let isPlaying = musicPlayerConfig.isPlaying;
// 播放器是否展开
let isExpanded = musicPlayerConfig.isExpanded;
// 播放器是否隐藏
let isHidden = musicPlayerConfig.isHidden;
// 是否显示播放列表
let showPlaylist = musicPlayerConfig.showPlaylist;
let showLyrics = musicPlayerConfig.showLyrics ?? false;
let playerRoot: HTMLElement;

type LyricLine = {
	time: number;
	text: string;
};

let lyrics: LyricLine[] = [];
let currentLyricIndex = -1;
let lyricsLoading = false;
let noLyricsFound = false;

// 当前播放时间
let currentTime = musicPlayerConfig.currentTime;
// 歌曲总时长
let duration = musicPlayerConfig.duration;
// 音量
let volume = musicPlayerConfig.volume;
// 是否静音
let isMuted = musicPlayerConfig.isMuted;
// 是否正在加载
let isLoading = musicPlayerConfig.isLoading;
// 是否随机播放
let isShuffled = musicPlayerConfig.isShuffled;
// 循环模式
let isRepeating = musicPlayerConfig.isRepeating;
// 错误信息
let errorMessage = musicPlayerConfig.errorMessage;
// 是否显示错误信息，默认为 false
let showError = musicPlayerConfig.showError;

// 当前歌曲信息
let currentSong = {
	title: i18n(Key.unknownSong),
	artist: i18n(Key.unknownArtist),
	cover: "/favicon/Vinyl record.ico",
	url: "",
	duration: 0,
};

type Song = {
	id: number;
	title: string;
	artist: string;
	cover: string;
	url: string;
	duration: number;
	lrc?: string;
};

let playlist: Song[] = [];
let currentIndex = 0;
let audio: HTMLAudioElement;
let progressBar: HTMLElement;
let volumeBar: HTMLElement;

// 翻译适配
let i18nVersion = 0;
let unregisterTranslationRenderer = () => {};

$: currentI18n =
	i18nVersion > -1
		? getTranslation(
				translationManager.isActive()
					? translationManager.getConfigLanguage()
					: siteConfig.lang || "en",
			)
		: null;
$: shuffleTitle = currentI18n?.[Key.musicPlayerShuffle] ?? "";
$: previousTitle = currentI18n?.[Key.musicPlayerPrevious] ?? "";
$: playTitle = currentI18n
	? isLoading
		? currentI18n[Key.musicPlayerLoading]
		: isPlaying
			? currentI18n[Key.musicPlayerPause]
			: currentI18n[Key.musicPlayerPlay]
	: "";
$: nextTitle = currentI18n?.[Key.musicPlayerNext] ?? "";
$: showTitle = currentI18n?.[Key.musicPlayerShow] ?? "";
$: hideTitle = currentI18n?.[Key.musicPlayerHide] ?? "";
$: expandTitle = currentI18n?.[Key.musicPlayerExpand] ?? "";
$: collapseTitle = currentI18n?.[Key.musicPlayerCollapse] ?? "";
$: playlistTitle = currentI18n?.[Key.musicPlayerPlaylist] ?? "";
$: progressTitle = currentI18n?.[Key.musicPlayerProgress] ?? "";
$: volumeTitle = currentI18n?.[Key.musicPlayerVolume] ?? "";
$: repeatTitle = currentI18n
	? isRepeating === 1
		? currentI18n[Key.musicPlayerRepeatOne]
		: currentI18n[Key.musicPlayerRepeat]
	: "";
$: muteTitle = currentI18n
	? isMuted
		? currentI18n[Key.musicPlayerUnmute]
		: currentI18n[Key.musicPlayerMute]
	: "";
$: lyricsTitle = currentI18n
	? showLyrics
		? currentI18n[Key.musicPlayerLyricsHide]
		: currentI18n[Key.musicPlayerLyricsShow]
	: "";

$: if (showPlaylist) {
	void tick().then(() => {
		if (playerRoot) {
			void translationManager.refresh({
				root: playerRoot,
				reason: "music-player-playlist",
			});
		}
	});
}

$: if (showLyrics && currentLyricIndex >= 0) {
	void tick().then(() => {
		const container = playerRoot?.querySelector(".lyrics-scroll");
		if (!container) return;
		const activeLine = container.children[currentLyricIndex] as HTMLElement;
		if (activeLine) {
			activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	});
}

function refreshI18n() {
	i18nVersion++;
}

// 本地播放列表
const localPlaylist = [
	{
		id: 1,
		title: "",
		artist: "",
		cover: "",
		url: "",
		duration: 240,
	},
];

async function fetchMetingPlaylist() {
	if (!meting_api || !meting_id) return;
	isLoading = true;
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
		playlist = list.map(
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
					id: song.id,
					title,
					artist,
					cover: song.pic ?? "",
					url: song.url ?? "",
					duration: dur,
					lrc: song.lrc,
				};
			},
		);
		if (playlist.length > 0) {
			loadSong(playlist[0]);
		}
		isLoading = false;
	} catch (e) {
		showErrorMessage(i18n(Key.musicPlayerErrorPlaylist));
		isLoading = false;
	}
}

function togglePlay() {
	if (!audio || !currentSong.url) return;
	if (isPlaying) {
		audio.pause();
	} else {
		audio.play().catch(() => {});
	}
}

function toggleExpanded() {
	isExpanded = !isExpanded;
	if (isExpanded) {
		showPlaylist = false;
		isHidden = false;
	}
}

function toggleHidden() {
	isHidden = !isHidden;
	if (isHidden) {
		isExpanded = false;
		showPlaylist = false;
	}
}

function togglePlaylist() {
	showPlaylist = !showPlaylist;
	if (showPlaylist) {
		showLyrics = false;
	}
}

function toggleShuffle() {
	isShuffled = !isShuffled;
	if (isShuffled) {
		isRepeating = 0;
	}
}

function toggleRepeat() {
	isRepeating = (isRepeating + 1) % 3;
	if (isRepeating !== 0) {
		isShuffled = false;
	}
}

function previousSong() {
	if (playlist.length <= 1) return;
	const newIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
	playSong(newIndex);
}

function nextSong(autoPlay = true) {
	if (playlist.length <= 1) return;

	let newIndex: number;
	if (isShuffled) {
		do {
			newIndex = Math.floor(Math.random() * playlist.length);
		} while (newIndex === currentIndex && playlist.length > 1);
	} else {
		newIndex = currentIndex < playlist.length - 1 ? currentIndex + 1 : 0;
	}
	playSong(newIndex, autoPlay);
}

// 记录切歌时的播放意图，用于解决加载失败时的状态传递问题
let willAutoPlay = false;

function playSong(index: number, autoPlay = true) {
	if (index < 0 || index >= playlist.length) return;

	willAutoPlay = autoPlay;
	currentIndex = index;
	loadSong(playlist[currentIndex]);
}

function getAssetPath(path: string): string {
	if (path.startsWith("http://") || path.startsWith("https://")) return path;
	if (path.startsWith("/")) return path;
	return `/${path}`;
}

function loadSong(song: typeof currentSong) {
	if (!song) return;
	if (song.url !== currentSong.url) {
		currentSong = { ...song };
		if (song.url) {
			isLoading = true;
		} else {
			isLoading = false;
		}
		fetchLyrics(song as Song);
	}
}

// 标记是否因浏览器策略导致自动播放失败
let autoplayFailed = false;

function handleLoadSuccess() {
	isLoading = false;
	if (audio?.duration && audio.duration > 1) {
		duration = Math.floor(audio.duration);
		if (playlist[currentIndex]) playlist[currentIndex].duration = duration;
		currentSong.duration = duration;
	}

	if (willAutoPlay || isPlaying) {
		const playPromise = audio.play();
		if (playPromise !== undefined) {
			playPromise.catch((error) => {
				console.warn("自动播放被拦截，等待用户交互:", error);
				autoplayFailed = true;
				isPlaying = false;
			});
		}
	}
}

function handleUserInteraction() {
	if (autoplayFailed && audio) {
		const playPromise = audio.play();
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					autoplayFailed = false;
				})
				.catch(() => {});
		}
	}
}

function handleLoadError(_event: Event) {
	if (!currentSong.url) return;
	isLoading = false;
	showErrorMessage(i18n(Key.musicPlayerErrorSong));

	const shouldContinue = isPlaying || willAutoPlay;
	if (playlist.length > 1) {
		setTimeout(() => nextSong(shouldContinue), 1000);
	} else {
		showErrorMessage(i18n(Key.musicPlayerErrorEmpty));
	}
}

function handleLoadStart() {}

function handleAudioEnded() {
	if (isRepeating === 1) {
		audio.currentTime = 0;
		audio.play().catch(() => {});
	} else if (isRepeating === 2 || isShuffled) {
		nextSong(true);
	} else {
		isPlaying = false;
	}
}

function showErrorMessage(message: string) {
	errorMessage = message;
	showError = true;
	setTimeout(() => {
		showError = false;
	}, 3000);
}
function hideError() {
	showError = false;
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

async function fetchLyrics(song: Song) {
	lyrics = [];
	currentLyricIndex = -1;
	noLyricsFound = false;

	if (!song.lrc) {
		noLyricsFound = true;
		return;
	}

	lyricsLoading = true;
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
			noLyricsFound = true;
		} else {
			lyrics = parsed;
		}
	} catch {
		noLyricsFound = true;
	} finally {
		lyricsLoading = false;
	}
}

function toggleLyrics() {
	showLyrics = !showLyrics;
	if (showLyrics) {
		showPlaylist = false;
	}
}

function updateCurrentLyricIndex() {
	if (lyrics.length === 0 || !audio) return;
	const time = audio.currentTime;
	for (let i = lyrics.length - 1; i >= 0; i--) {
		if (time >= lyrics[i].time) {
			currentLyricIndex = i;
			return;
		}
	}
	currentLyricIndex = -1;
}

function setProgress(event: MouseEvent) {
	if (!audio || !progressBar) return;
	const rect = progressBar.getBoundingClientRect();
	const percent = (event.clientX - rect.left) / rect.width;
	const newTime = percent * duration;
	audio.currentTime = newTime;
	currentTime = newTime;
}

let isVolumeDragging = false;
let isPointerDown = false;
let volumeBarRect: DOMRect | null = null;
let rafId: number | null = null;

function startVolumeDrag(event: PointerEvent) {
	if (!volumeBar || isMuted) return;
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
	if (!audio || !volumeBar) return;

	const rect = volumeBarRect || volumeBar.getBoundingClientRect();
	const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
	volume = percent;
}

function toggleMute() {
	isMuted = !isMuted;
}

function formatTime(seconds: number): string {
	if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const interactionEvents = ["click", "keydown", "touchstart"];
onMount(() => {
	interactionEvents.forEach((event) => {
		document.addEventListener(event, handleUserInteraction, { capture: true });
	});

	unregisterTranslationRenderer = translationManager.onRefresh(
		"music-player",
		refreshI18n,
	);

	if (!musicPlayerConfig.enable) {
		return;
	}
	if (mode === "meting") {
		fetchMetingPlaylist();
	} else {
		// 使用本地播放列表，不发送任何API请求
		playlist = [...localPlaylist];
		if (playlist.length > 0) {
			loadSong(playlist[0]);
		} else {
			showErrorMessage("The local playlist is empty");
		}
	}
});

onDestroy(() => {
	unregisterTranslationRenderer();
	if (typeof document !== "undefined") {
		interactionEvents.forEach((event) => {
			document.removeEventListener(event, handleUserInteraction, {
				capture: true,
			});
		});
	}
});
</script>

<audio
	bind:this={audio}
	src={getAssetPath(currentSong.url)}
	bind:volume
	bind:muted={isMuted}
	on:play={() => isPlaying = true}
	on:pause={() => isPlaying = false}
	on:timeupdate={() => { currentTime = audio.currentTime; updateCurrentLyricIndex(); }}
	on:ended={handleAudioEnded}
	on:error={handleLoadError}
	on:loadeddata={handleLoadSuccess}
	on:loadstart={handleLoadStart}
	preload="auto"
></audio>

<svelte:window 
    on:pointermove={handleVolumeMove} 
    on:pointerup={stopVolumeDrag} 
/>

{#if musicPlayerConfig.enable}
{#if showError}
<div class="fixed right-4 z-[60] max-w-sm transition-all duration-300"
     style="bottom: {isExpanded && playerRoot ? playerRoot.offsetHeight + 240 : 100}px">
    <div class="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up">
        <Icon icon="material-symbols:error" class="text-xl flex-shrink-0" />
        <span class="text-sm flex-1">{errorMessage}</span>
        <button on:click={hideError} class="text-white/80 hover:text-white transition-colors">
            <Icon icon="material-symbols:close" class="text-lg" />
        </button>
    </div>
</div>
{/if}

<div bind:this={playerRoot}
     class="music-player fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out"
     class:expanded={isExpanded}
     class:hidden-mode={isHidden}>

    <!-- 隐藏状态的小圆球 -->
    <div class="orb-player w-12 h-12 bg-[var(--primary)] rounded-full shadow-lg cursor-pointer transition-all duration-500 ease-in-out flex items-center justify-center hover:scale-110 active:scale-95"
         class:opacity-0={!isHidden}
         class:scale-0={!isHidden}
         class:pointer-events-none={!isHidden}
         on:click={toggleHidden}
         on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
				toggleHidden();
            }
         }}
         role="button"
         tabindex="0"
         title={showTitle}>
        {#if isLoading}
            <Icon icon="eos-icons:loading" class="text-white text-lg" />
        {:else if isPlaying}
            <div class="flex space-x-0.5">
                <div class="w-0.5 h-3 bg-white rounded-full animate-pulse"></div>
                <div class="w-0.5 h-4 bg-white rounded-full animate-pulse" style="animation-delay: 150ms;"></div>
                <div class="w-0.5 h-2 bg-white rounded-full animate-pulse" style="animation-delay: 300ms;"></div>
            </div>
        {:else}
            <Icon icon="material-symbols:music-note" class="text-white text-lg" />
        {/if}
    </div>
    <!-- 收缩状态的迷你播放器（封面圆形） -->
    <div class="mini-player card-base bg-[var(--float-panel-bg)] shadow-xl rounded-2xl p-3 transition-all duration-500 ease-in-out"
         class:opacity-0={isExpanded || isHidden}
         class:scale-95={isExpanded || isHidden}
         class:pointer-events-none={isExpanded || isHidden}>
        <div class="flex items-center gap-3">
            <!-- 封面区域：点击控制播放/暂停 -->
            <div class="cover-container relative w-12 h-12 rounded-full overflow-hidden cursor-pointer"
                 on:click={togglePlay}
                 on:keydown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
						togglePlay();
                    }
                 }}
                 role="button"
                 tabindex="0"
                 title={playTitle}>
                <img src={getAssetPath(currentSong.cover)} alt={i18n(Key.musicPlayerCover)}
                     class="w-full h-full object-cover transition-transform duration-300"
                     class:spinning={isPlaying && !isLoading}
                     class:animate-pulse={isLoading} />
                <div class="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    {#if isLoading}
                        <Icon icon="eos-icons:loading" class="text-white text-xl" />
                    {:else if isPlaying}
                        <Icon icon="material-symbols:pause" class="text-white text-xl" />
                    {:else}
                        <Icon icon="material-symbols:play-arrow" class="text-white text-xl" />
                    {/if}
                </div>
            </div>
            <!-- 歌曲信息区域：点击展开播放器 -->
            <div class="flex-1 min-w-0 cursor-pointer"
                 on:click={toggleExpanded}
                 on:keydown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
						toggleExpanded();
                    }
                 }}
                 role="button"
                 tabindex="0"
                 >
                <div class="ignore text-sm font-medium text-90 truncate" title={currentSong.title}>{currentSong.title}</div>
                <div class="ignore text-xs text-50 truncate " title={currentSong.artist}>{currentSong.artist}</div>
            </div>
            <div class="flex items-center gap-1">
                <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"
                        on:click|stopPropagation={toggleHidden}
                        title={hideTitle}>
                    <Icon icon="material-symbols:visibility-off" class="text-lg" />
                </button>
                <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"
                        on:click|stopPropagation={toggleExpanded}
                        title={expandTitle}>
                    <Icon icon="material-symbols:expand-less" class="text-lg" />
                </button>
            </div>
        </div>
    </div>
    <!-- 展开状态的完整播放器（封面圆形） -->
    <div class="expanded-player card-base bg-[var(--float-panel-bg)] shadow-xl rounded-2xl p-4 transition-all duration-500 ease-in-out"
         class:opacity-0={!isExpanded}
         class:scale-95={!isExpanded}
         class:pointer-events-none={!isExpanded}>
        <div class="flex items-center gap-4 mb-4">
            <div class="cover-container relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src={getAssetPath(currentSong.cover)} alt={i18n(Key.musicPlayerCover)}
                     class="w-full h-full object-cover transition-transform duration-300"
                     class:spinning={isPlaying && !isLoading}
                     class:animate-pulse={isLoading} />
            </div>
            <div class="flex-1 min-w-0">
                <div class="ignore song-title text-lg font-bold text-90 truncate mb-1" title={currentSong.title}>{currentSong.title}</div>
                <div class="ignore song-artist text-sm text-50 truncate" title={currentSong.artist}>{currentSong.artist}</div>
                <div class="text-xs text-30 mt-1">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
            </div>
            
        </div>
        <div class="progress-section mb-4">
            <div class="progress-bar flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer"
                 bind:this={progressBar}
                 on:click={setProgress}
                 on:keydown={(e) => {
                     if (e.key === 'Enter' || e.key === ' ') {
                         e.preventDefault();
                         const percent = 0.5;
                         const newTime = percent * duration;
						 if (audio) {
                             audio.currentTime = newTime;
							 currentTime = newTime;
                         }
                     }
                 }}
                 role="slider"
                 tabindex="0"
                 title={progressTitle}
                 aria-valuemin="0"
                 aria-valuemax="100"
                 aria-valuenow={duration > 0 ? (currentTime / duration * 100) : 0}>
                <div class="h-full bg-[var(--primary)] rounded-full transition-all duration-100"
                     style="width: {duration > 0 ? (currentTime / duration) * 100 : 0}%"></div>
            </div>
        </div>
        {#if showLyrics}
            <div class="lyrics-section mb-4 overflow-hidden rounded-lg max-h-[200px] bg-[oklch(0.95_0.025_var(--hue))] dark:bg-[oklch(0.33_0.035_var(--hue))]" transition:slide={{ duration: 300, axis: 'y' }}>
                {#if lyricsLoading}
                    <div class="flex items-center justify-center py-8 text-50">
                        <Icon icon="eos-icons:loading" class="text-lg animate-spin mr-2" />
                        <span class="text-sm">{currentI18n?.[Key.musicPlayerLoading] ?? ""}</span>
                    </div>
                {:else if noLyricsFound}
                    <div class="flex items-center justify-center py-8 text-50">
                        <Icon icon="material-symbols:lyrics-off" class="text-lg mr-2" />
                        <span class="text-sm">{currentI18n?.[Key.musicPlayerNoLyrics] ?? ""}</span>
                    </div>
                {:else if lyrics.length > 0}
                    <div class="lyrics-scroll overflow-y-auto hide-scrollbar py-3 px-2 max-h-[200px]">
                        {#each lyrics as line, index}
                            <div class="lyric-line px-3 py-1.5 rounded-md transition-all duration-300 text-sm text-center leading-normal whitespace-normal break-words hover:text-[var(--primary)]"
                                 class:text-[var(--primary)]={index === currentLyricIndex}
                                 class:text-90={index !== currentLyricIndex}
                                 class:font-bold={index === currentLyricIndex}
                                 class:scale-105={index === currentLyricIndex}
                                 class:opacity-50={index !== currentLyricIndex && Math.abs(index - currentLyricIndex) > 2}
                                 role="button"
                                 tabindex="0"
                                 on:click={() => {
                                     if (audio) {
                                         audio.currentTime = line.time;
                                         currentTime = line.time;
                                     }
                                 }}
                                 on:keydown={(e) => {
                                     if (e.key === 'Enter' || e.key === ' ') {
                                         e.preventDefault();
                                         if (audio) {
                                             audio.currentTime = line.time;
                                             currentTime = line.time;
                                         }
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
                    class:btn-regular={isShuffled}
                    class:btn-plain={!isShuffled}
                    on:click={toggleShuffle}
                    title={shuffleTitle}
                    disabled={playlist.length <= 1}>
                <Icon icon="material-symbols:shuffle" class="text-lg" />
            </button>
            <button class="btn-plain w-10 h-10 rounded-lg" on:click={previousSong}
                    title={previousTitle}
                    disabled={playlist.length <= 1}>
                <Icon icon="material-symbols:skip-previous" class="text-xl" />
            </button>
            <button class="btn-regular w-12 h-12 rounded-full"
                    class:opacity-50={isLoading}
                    disabled={isLoading}
                    title={playTitle}
                    on:click={togglePlay}>
                {#if isLoading}
                    <Icon icon="eos-icons:loading" class="text-xl" />
                {:else if isPlaying}
                    <Icon icon="material-symbols:pause" class="text-xl" />
                {:else}
                    <Icon icon="material-symbols:play-arrow" class="text-xl" />
                {/if}
            </button>
            <button class="btn-plain w-10 h-10 rounded-lg" on:click={() => nextSong()}
                    title={nextTitle}
                    disabled={playlist.length <= 1}>
                <Icon icon="material-symbols:skip-next" class="text-xl" />
            </button>
            <button class="w-10 h-10 rounded-lg"
                    class:btn-regular={isRepeating > 0}
                    class:btn-plain={isRepeating === 0}
                    title={repeatTitle}
                    on:click={toggleRepeat}>
                {#if isRepeating === 1}
                    <Icon icon="material-symbols:repeat-one" class="text-lg" />
                {:else if isRepeating === 2}
                    <Icon icon="material-symbols:repeat" class="text-lg" />
                {:else}
                    <Icon icon="material-symbols:repeat" class="text-lg opacity-50" />
                {/if}
            </button>
        </div>
        <div class="bottom-controls flex items-center gap-2">
            <button class="btn-plain w-8 h-8 rounded-lg" on:click={toggleMute} title={muteTitle}>
                {#if isMuted || volume === 0}
                    <Icon icon="material-symbols:volume-off" class="text-lg" />
                {:else if volume < 0.5}
                    <Icon icon="material-symbols:volume-down" class="text-lg" />
                {:else}
                    <Icon icon="material-symbols:volume-up" class="text-lg" />
                {/if}
            </button>
            <div class="flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer touch-none transition-opacity duration-300"
                 class:opacity-50={isMuted}
                 class:pointer-events-none={isMuted}
                 bind:this={volumeBar}
                 on:pointerdown={startVolumeDrag}
                 on:keydown={(e) => {
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
                 aria-valuenow={volume * 100}>
                <div class="h-full bg-[var(--primary)] rounded-full transition-all"
                     class:duration-100={!isVolumeDragging}
                     class:duration-0={isVolumeDragging}
                     style="width: {volume * 100}%"></div>
            </div>
            <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"
                    class:btn-active={showLyrics}
                    on:click={toggleLyrics}
                    title={lyricsTitle}>
                <Icon icon="material-symbols:lyrics" class="text-lg" />
            </button>
            <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"
                    class:btn-active={showPlaylist}
                    on:click={togglePlaylist}
                    title={playlistTitle}>
                <Icon icon="material-symbols:queue-music" class="text-lg" />
            </button>
            <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"
                    on:click={toggleHidden}
                    title={hideTitle}>
                <Icon icon="material-symbols:visibility-off" class="text-lg" />
            </button>
            <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"
                    on:click={toggleExpanded}
                    title={collapseTitle}>
                <Icon icon="material-symbols:expand-more" class="text-lg" />
            </button>
        </div>
        {#if showPlaylist}
            <div class="playlist-section mt-4 overflow-hidden rounded-lg max-h-[240px] bg-[oklch(0.95_0.025_var(--hue))] dark:bg-[oklch(0.33_0.035_var(--hue))]" transition:slide={{ duration: 300, axis: 'y' }}>
                <div class="playlist-inline overflow-y-auto hide-scrollbar py-2" style="max-height: 240px;">
                    {#each playlist as song, index}
                        <div class="playlist-item group flex items-center gap-3 px-3 py-2"
                             class:bg-[var(--btn-plain-bg)]={index === currentIndex}
                             on:click={() => playSong(index)}
                             on:keydown={(e) => {
                                 if (e.key === 'Enter' || e.key === ' ') {
                                     e.preventDefault();
                                     playSong(index);
                                 }
                             }}
                             role="button"
                             tabindex="0"
                             aria-label="play {song.title} - {song.artist}">
                            <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                {#if index === currentIndex && isPlaying}
                                    <Icon icon="material-symbols:graphic-eq" class="text-[var(--primary)] animate-pulse" />
                                {:else if index === currentIndex}
                                    <Icon icon="material-symbols:pause" class="text-[var(--primary)]" />
                                {:else}
                                    <span class="text-sm text-[var(--content-meta)] transition-colors duration-300 group-hover:text-[var(--primary)]">{index + 1}</span>
                                {/if}
                            </div>
                            <div class="w-10 h-10 rounded-lg overflow-hidden bg-[var(--btn-regular-bg)] flex-shrink-0">
                                <img src={getAssetPath(song.cover)} alt={song.title} loading="lazy" class="w-full h-full object-cover" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="font-medium truncate text-sm ignore transition-colors duration-300 group-hover:text-[var(--primary)]" class:text-[var(--primary)]={index === currentIndex} class:text-90={index !== currentIndex}>
                                    {song.title}
                                </div>
                                <div class="text-xs text-[var(--content-meta)] truncate ignore transition-colors duration-300 group-hover:text-[var(--primary)]" class:text-[var(--primary)]={index === currentIndex}>
                                    {song.artist}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
.orb-player {
	position: relative;
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}
.orb-player::before {
	content: '';
	position: absolute;
	inset: -0.125rem;
	background: linear-gradient(45deg, var(--primary), transparent, var(--primary));
	border-radius: 50%;
	z-index: -1;
	opacity: 0;
	transition: opacity 0.3s ease;
}
.orb-player:hover::before {
	opacity: 0.3;
	animation: rotate 2s linear infinite;
}
.orb-player .animate-pulse {
	animation: musicWave 1.5s ease-in-out infinite;
}
@keyframes rotate {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}
@keyframes musicWave {
	0%, 100% { transform: scaleY(0.5); }
	50% { transform: scaleY(1); }
}
.music-player.hidden-mode {
	width: 3rem;
	height: 3rem;
}
.music-player {
    max-width: 20rem;
    user-select: none;
}
.mini-player {
    width: 17.5rem;
    position: absolute;
    bottom: 0;
    right: 0;
    /*left: 0;*/
}
.expanded-player {
    width: 20rem;
    position: absolute;
    bottom: 0;
    right: 0;
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
@media (max-width: 744px) {
    .music-player {
        max-width: 280px !important;
        /*left: 0.5rem !important;*/
        bottom: 0.5rem !important;
        right: 0.5rem !important;
	}
    .mini-player {
        width: 280px;
    }
    .music-player.expanded {
        width: calc(100vw - 16px);
        max-width: none;
        /*left: 0.5rem !important;*/
        right: 0.5rem !important;
	}
    .controls {
        gap: 8px;
	}
    .controls button {
        width: 36px;
        height: 36px;
	}
    .controls button:nth-child(3) {
        width: 44px;
        height: 44px;
	}
}
@media (max-width: 480px) {
    .music-player {
        max-width: 260px;
	}
    .song-title {
        font-size: 14px;
	}
    .song-artist {
        font-size: 12px;
	}
    .controls {
        gap: 6px;
        margin-bottom: 12px;
	}
    .controls button {
        width: 32px;
        height: 32px;
	}
    .controls button:nth-child(3) {
        width: 40px;
        height: 40px;
	}
    .playlist-item {
        padding: 8px 12px;
	}
    .playlist-item .w-10 {
        width: 32px;
        height: 32px;
	}
}
@keyframes slide-up {
    from {
        transform: translateY(100%);
        opacity: 0;
	}
    to {
        transform: translateY(0);
        opacity: 1;
	}
}
.animate-slide-up {
    animation: slide-up 0.3s ease-out;
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
/* 自定义旋转动画，停止时保持当前位置 */
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

/* 让主题色按钮更有视觉反馈 */
button.bg-\[var\(--primary\)\] {
    box-shadow: 0 0 0 2px var(--primary);
	border: none;
}

.btn-active {
    color: var(--primary) !important;
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
</style>
{/if}