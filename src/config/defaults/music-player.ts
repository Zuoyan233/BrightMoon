import type { MusicPlayerConfig } from "../../types/config";

export const defaultMusicPlayerConfig: MusicPlayerConfig = {
	enable: true, // 启用音乐播放器
	mode: "meting", // 播放器模式："meting" 使用 MetingJS API，"local" 使用本地音乐列表
	meting_api:
		"https://meting.mysqil.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r", // MetingJS API 地址
	id: "766208154", // 歌单 ID
	server: "netease", // 音乐平台："netease" 网易云音乐，"tencent" QQ音乐，"kugou" 酷狗，"baidu" 百度
	type: "playlist", // 类型："playlist" 歌单，"song" 单曲，"album" 专辑，"artist" 歌手
	localPlaylist: [
		// 本地音乐列表（mode 为 "local" 时生效）
		{
			id: 1,
			title: "", // 歌曲标题
			artist: "", // 歌手
			cover: "", // 封面图片 URL
			url: "", // 音频文件 URL
			duration: 240, // 时长（秒）
		},
	],
	currentTime: 0, // 当前播放时间
	duration: 0, // 总时长
	volume: 1, // 音量，0-1
	isRepeating: 2, // 循环模式：0=不循环，1=单曲循环，2=列表循环
	errorMessage: "", // 错误信息
	showError: false, // 显示错误信息
	isPlaying: false, // 是否正在播放
	isExpanded: false, // 是否展开播放器
	isHidden: false, // 是否隐藏播放器
	showPlaylist: false, // 显示播放列表
	isMuted: false, // 是否静音
	isLoading: false, // 是否加载中
	isShuffled: false, // 是否随机播放
	showLyrics: false, // 显示歌词
};
