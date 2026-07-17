import Key from "../i18nKey";
import type { Translation } from "../translation";

export const ko: Translation = {
	[Key.home]: "홈",
	[Key.about]: "소개",
	[Key.archive]: "아카이브",
	[Key.search]: "검색",
	[Key.feedback]: "피드백",
	[Key.other]: "기타",

	// 번역 패널 제목
	[Key.translateHeader]: "언어 선택",

	// 탐색 모음 제목
	[Key.navLinks]: "링크",
	[Key.navMy]: "마이",
	[Key.navAbout]: "소개",
	[Key.sponsors]: "후원자",
	[Key.navOthers]: "기타",

	[Key.tags]: "태그",
	[Key.categories]: "카테고리",
	[Key.recentPosts]: "최근 게시물",

	// 목차
	[Key.tocTitle]: "목차",

	// 공지사항
	[Key.announcement]: "공지사항",
	[Key.announcementClose]: "닫기",

	[Key.comments]: "댓글",
	[Key.friends]: "친구 블로그",
	[Key.friendsSubtitle]: "다양한 웹사이트를 발견해보세요",
	[Key.friendsSearchPlaceholder]: "친구 이름 또는 설명 검색...",
	[Key.friendsFilterAll]: "전체",
	[Key.friendsNoResults]: "일치하는 친구를 찾을 수 없습니다",
	[Key.friendsVisit]: "방문하기",
	[Key.friendsCopyLink]: "링크 복사",
	[Key.friendsCopySuccess]: "복사됨",
	[Key.friendsTags]: "태그",
	[Key.untitled]: "제목 없음",
	[Key.uncategorized]: "분류되지 않음",
	[Key.noTags]: "태그 없음",

	[Key.wordCount]: "단어",
	[Key.wordsCount]: "단어",
	[Key.minuteCount]: "분",
	[Key.minutesCount]: "분",
	[Key.postCount]: "게시물",
	[Key.postsCount]: "게시물",

	[Key.appearance]: "개인 설정",
	[Key.themeSwitch]: "테마 전환",
	[Key.themeColor]: "테마 색상",
	[Key.sakuraEffect]: "벚꽃 효과",
	[Key.wavesEffect]: "물결 효과",
	[Key.wavesPerformanceMode]: "성능 모드",

	[Key.lightMode]: "라이트 모드",
	[Key.darkMode]: "다크 모드",
	[Key.systemMode]: "시스템 설정",

	[Key.more]: "더 보기",

	[Key.author]: "작성자",
	[Key.publishedAt]: "게시일",
	[Key.license]: "라이선스",
	[Key.anime]: "애니메이션",
	[Key.diary]: "일기",

	// 애니메이션 페이지
	[Key.animeTitle]: "내 애니메이션 목록",
	[Key.animeSubtitle]: "나의 애니메이션 여정을 기록합니다",
	[Key.animeStatusWatching]: "시청 중",
	[Key.animeStatusCompleted]: "완료",
	[Key.animeStatusPlanned]: "보고 싶은",
	[Key.animeStatusOnHold]: "보류",
	[Key.animeStatusDropped]: "시청 중단",
	[Key.animeFilterAll]: "전체",
	[Key.animeYear]: "연도",
	[Key.animeStudio]: "제작사",
	[Key.animeEmpty]: "애니메이션 데이터가 없습니다",
	[Key.animeEmptyBangumi]: "Bangumi 설정 또는 네트워크 연결을 확인해주세요",
	[Key.animeEmptyBilibili]:
		"Bilibili 데이터가 비어 있습니다. `pnpm run update-bilibili`를 실행하여 데이터를 가져오세요",
	[Key.animeSetBangumiUserId]:
		"src/config.ts 파일에 Bangumi 사용자 ID를 설정해주세요",
	[Key.animeSetBilibiliVmId]:
		"src/config.ts 파일에 Bilibili vmID를 설정해주세요",
	[Key.animeEmptyLocal]:
		"src/data/anime.ts 파일에 애니메이션 정보를 추가해주세요",

	// 일기 페이지
	[Key.diarySubtitle]: "언제 어디서나 삶을 공유하세요",
	[Key.diaryCount]: "개의 일기",
	[Key.diaryReply]: "댓글",
	[Key.diaryTips]: "최신 30개의 일기만 표시됩니다",
	[Key.diaryMinutesAgo]: "분 전",
	[Key.diaryHoursAgo]: "시간 전",
	[Key.diaryDaysAgo]: "일 전",

	// 404 페이지
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "페이지를 찾을 수 없습니다",
	[Key.notFoundDescription]:
		"죄송합니다. 방문하신 페이지가 존재하지 않거나 이동되었습니다.",
	[Key.backToHome]: "홈으로 돌아가기",

	// 뮤직 플레이어
	[Key.musicPlayer]: "뮤직 플레이어",
	[Key.musicPlayerShow]: "뮤직 플레이어 표시",
	[Key.musicPlayerHide]: "뮤직 플레이어 숨기기",
	[Key.musicPlayerExpand]: "뮤직 플레이어 확장",
	[Key.musicPlayerCollapse]: "뮤직 플레이어 축소",
	[Key.musicPlayerPause]: "일시정지",
	[Key.musicPlayerPlay]: "재생",
	[Key.musicPlayerPrevious]: "이전 곡",
	[Key.musicPlayerNext]: "다음 곡",
	[Key.musicPlayerShuffle]: "셔플",
	[Key.musicPlayerRepeat]: "전체 반복",
	[Key.musicPlayerRepeatOne]: "한 곡 반복",
	[Key.musicPlayerVolume]: "볼륨 조절",
	[Key.musicPlayerMute]: "음소거",
	[Key.musicPlayerUnmute]: "음소거 해제",
	[Key.musicPlayerProgress]: "재생 진행률",
	[Key.musicPlayerCover]: "커버",
	[Key.musicPlayerPlaylist]: "재생목록",
	[Key.musicPlayerLoading]: "로딩 중...",
	[Key.musicPlayerErrorPlaylist]: "재생목록을 불러오지 못했습니다",
	[Key.musicPlayerErrorSong]:
		"현재 곡을 불러오지 못했습니다. 다음 곡을 재생합니다",
	[Key.musicPlayerErrorEmpty]: "재생목록에 사용 가능한 곡이 없습니다",
	[Key.musicPlayerLyrics]: "가사",
	[Key.musicPlayerLyricsShow]: "가사 보기",
	[Key.musicPlayerLyricsHide]: "가사 숨기기",
	[Key.musicPlayerNoLyrics]: "가사 없음",
	[Key.unknownSong]: "알 수 없는 곡",
	[Key.unknownArtist]: "알 수 없는 아티스트",

	// 앨범 페이지
	[Key.albums]: "앨범",
	[Key.albumsSubtitle]: "삶의 아름다운 순간을 기록합니다",
	[Key.albumsEmpty]: "내용 없음",
	[Key.albumsEmptyDesc]:
		"아직 생성된 앨범이 없습니다. 아름다운 추억을 추가해보세요!",
	[Key.albumsBackToList]: "앨범 목록으로 돌아가기",
	[Key.albumsPhotoCount]: "장",
	[Key.albumsPhotosCount]: "장",
	[Key.hiddenAlbum]: "숨김 앨범",
	[Key.hideAlbumTip]:
		"이 앨범은 숨김으로 설정되어 앨범 목록에 표시되지 않지만, 직접 링크를 통해 계속 접근할 수 있습니다",

	// 기기 페이지
	[Key.devices]: "내 기기",
	[Key.devicesSubtitle]: "일상에서 사용하는 기기들을 소개합니다",
	[Key.devicesViewDetails]: "자세히 보기",

	// 프로젝트 페이지
	[Key.projects]: "프로젝트",
	[Key.projectsSubtitle]: "나의 개발 프로젝트 포트폴리오",
	[Key.projectsAll]: "전체",
	[Key.projectsWeb]: "웹 애플리케이션",
	[Key.projectsMobile]: "모바일 애플리케이션",
	[Key.projectsDesktop]: "데스크톱 애플리케이션",
	[Key.projectsOther]: "기타",
	[Key.projectTechStack]: "기술 스택",
	[Key.projectLiveDemo]: "라이브 데모",
	[Key.projectSourceCode]: "소스 코드",
	[Key.projectDescription]: "프로젝트 설명",
	[Key.projectStatus]: "상태",
	[Key.projectStatusCompleted]: "완료",
	[Key.projectStatusInProgress]: "진행 중",
	[Key.projectStatusPlanned]: "계획됨",
	[Key.projectsTotal]: "전체 프로젝트",
	[Key.projectsCompleted]: "완료됨",
	[Key.projectsInProgress]: "진행 중",
	[Key.projectsTechStack]: "기술 스택 통계",
	[Key.projectsFeatured]: "주요 프로젝트",
	[Key.projectsPlanned]: "계획됨",
	[Key.projectsDemo]: "라이브 데모",
	[Key.projectsSource]: "소스 코드",
	[Key.projectsVisit]: "프로젝트 방문",
	[Key.projectsGitHub]: "GitHub",

	// RSS 페이지
	[Key.rss]: "RSS 피드",
	[Key.rssDescription]: "구독하여 최신 업데이트를 받아보세요",
	[Key.rssSubtitle]: "RSS로 구독하여 최신 글과 업데이트를 즉시 받아보세요",
	[Key.rssLink]: "RSS 링크",
	[Key.rssCopyToReader]: "RSS 리더기에 링크 복사",
	[Key.rssCopyLink]: "복사",
	[Key.rssLatestPosts]: "최신 게시물",
	[Key.rssWhatIsRSS]: "RSS란 무엇인가요?",
	[Key.rssWhatIsRSSDescription]:
		"RSS(Really Simple Syndication)는 자주 업데이트되는 콘텐츠를 게시하기 위한 표준 형식입니다. RSS를 통해 다음과 같은 혜택을 누릴 수 있습니다:",
	[Key.rssBenefit1]:
		"직접 방문하지 않고도 최신 웹사이트 콘텐츠를 확인할 수 있습니다",
	[Key.rssBenefit2]: "여러 웹사이트 구독을 한 곳에서 관리할 수 있습니다",
	[Key.rssBenefit3]: "중요한 업데이트와 글을 놓치지 않을 수 있습니다",
	[Key.rssBenefit4]: "광고 없는 깔끔한 독서 경험을 즐길 수 있습니다",
	[Key.rssHowToUse]:
		"Feedly, Inoreader 등의 RSS 리더기를 사용하여 이 사이트를 구독하는 것을 권장합니다.",
	[Key.rssCopied]: "RSS 링크가 클립보드에 복사되었습니다!",
	[Key.rssCopyFailed]: "복사 실패, 링크를 수동으로 복사해주세요",

	// Atom 페이지
	[Key.atom]: "Atom 피드",
	[Key.atomDescription]: "구독하여 최신 업데이트를 받아보세요",
	[Key.atomSubtitle]: "Atom으로 구독하여 최신 글과 업데이트를 즉시 받아보세요",
	[Key.atomLink]: "Atom 링크",
	[Key.atomCopyToReader]: "Atom 리더기에 링크 복사",
	[Key.atomCopyLink]: "복사",
	[Key.atomLatestPosts]: "최신 게시물",
	[Key.atomWhatIsAtom]: "Atom이란 무엇인가요?",
	[Key.atomWhatIsAtomDescription]:
		"Atom(Atom Syndication Format)은 피드와 그 항목을 설명하기 위한 XML 기반 표준입니다. Atom을 통해 다음과 같은 혜택을 누릴 수 있습니다:",
	[Key.atomBenefit1]:
		"직접 방문하지 않고도 최신 웹사이트 콘텐츠를 확인할 수 있습니다",
	[Key.atomBenefit2]: "여러 웹사이트 구독을 한 곳에서 관리할 수 있습니다",
	[Key.atomBenefit3]: "중요한 업데이트와 글을 놓치지 않을 수 있습니다",
	[Key.atomBenefit4]: "광고 없는 깔끔한 독서 경험을 즐길 수 있습니다",
	[Key.atomHowToUse]:
		"Feedly, Inoreader 등의 Atom 리더기를 사용하여 이 사이트를 구독하는 것을 권장합니다.",
	[Key.atomCopied]: "Atom 링크가 클립보드에 복사되었습니다!",
	[Key.atomCopyFailed]: "복사 실패, 링크를 수동으로 복사해주세요",

	// 배경화면 모드
	[Key.wallpaperMode]: "배경화면 모드",
	[Key.wallpaperBanner]: "배너 모드",
	[Key.wallpaperFullscreen]: "전체 화면 모드",
	[Key.wallpaperNone]: "배경화면 숨기기",
	[Key.wallpaperPosition]: "배경화면 위치",
	[Key.wallpaperPositionTop]: "상단",
	[Key.wallpaperPositionCenter]: "중앙",
	[Key.wallpaperPositionBottom]: "하단",
	[Key.wallpaperOpacity]: "배경 투명도",
	[Key.wallpaperBlur]: "배경 흐림",
	[Key.cardOpacity]: "카드 투명도",

	// 네비게이션 바 투명 모드
	[Key.navbarTransparentMode]: "네비게이션 바 스타일",
	[Key.navbarTransparentSemi]: "유리 효과",
	[Key.navbarTransparentFull]: "투명",
	[Key.navbarTransparentSemifull]: "동적 투명",

	// 기술 페이지
	[Key.skills]: "기술",
	[Key.skillsSubtitle]: "나의 기술 스택과 전문 분야",
	[Key.skillsFrontend]: "프론트엔드 개발",
	[Key.skillsBackend]: "백엔드 개발",
	[Key.skillsDatabase]: "데이터베이스",
	[Key.skillsTools]: "개발 도구",
	[Key.skillsOther]: "기타 기술",
	[Key.skillLevel]: "숙련도",
	[Key.skillLevelBeginner]: "입문자",
	[Key.skillLevelIntermediate]: "중급",
	[Key.skillLevelAdvanced]: "고급",
	[Key.skillLevelExpert]: "전문가",
	[Key.skillExperience]: "경험",
	[Key.skillYears]: "년",
	[Key.skillMonths]: "개월",
	[Key.skillsTotal]: "전체 기술",
	[Key.skillsExpert]: "전문가 수준",
	[Key.skillsAdvanced]: "고급",
	[Key.skillsIntermediate]: "중급",
	[Key.skillsBeginner]: "입문자",
	[Key.skillsAdvancedTitle]: "전문 기술",
	[Key.skillsProjects]: "관련 프로젝트",
	[Key.skillsDistribution]: "기술 분포",
	[Key.skillsByLevel]: "수준별",
	[Key.skillsByCategory]: "분야별",
	[Key.noData]: "데이터 없음",

	// 타임라인 페이지
	[Key.timeline]: "타임라인",
	[Key.timelineSubtitle]: "나의 성장 여정과 중요한 이정표",
	[Key.timelineEducation]: "교육",
	[Key.timelineWork]: "경력",
	[Key.timelineProject]: "프로젝트 경험",
	[Key.timelineAchievement]: "성과",
	[Key.timelinePresent]: "현재",
	[Key.timelineLocation]: "위치",
	[Key.timelineDescription]: "상세 설명",
	[Key.timelineMonths]: "개월",
	[Key.timelineYears]: "년",
	[Key.timelineTotal]: "합계",
	[Key.timelineProjects]: "프로젝트",
	[Key.timelineExperience]: "경력",
	[Key.timelineCurrent]: "현재 상태",
	[Key.timelineHistory]: "히스토리",
	[Key.timelineAchievements]: "성과",
	[Key.timelineStartDate]: "시작일",
	[Key.timelineDuration]: "기간",

	// 피드백 페이지 - 웹마스터 연락 모듈
	[Key.contactMe]: "웹마스터에게 연락하기",
	[Key.contactEmail]: "이메일로 웹마스터에게 연락하기",
	[Key.contactSocialFriends]: "소셜 미디어 친구 추가로 웹마스터에게 연락하기",
	[Key.addFriends]: "친구 추가하기",

	// 후원 페이지
	[Key.sponsorsNotice1]:
		"웹사이트 콘텐츠가 도움이 되셨다면, 아래 방법으로 제 작업을 후원해주세요. 더 나은 콘텐츠 제작에 도움이 됩니다. 모든 후원금은 웹사이트 유지보수, 서버 비용 및 콘텐츠 제작에 사용됩니다.",
	[Key.sponsorsNotice2]:
		"BrightMoon 블로그 프로젝트 콘텐츠 개발을 후원해주셔서 감사합니다!",
	[Key.wechatPay]: "WeChat",
	[Key.aliPay]: "Alipay",
	[Key.scanPayQRcode]: "스캔하여 결제",
	[Key.sponsorsPartner]: "후원 파트너",
	[Key.otherSupportOptions]: "다른 후원 방법",
	[Key.shareBlog]: "내 블로그를 더 많은 친구들과 공유하기",
	[Key.leaveComment]: "게시물 아래 댓글란에 의견 남기기",
	[Key.subscribeToArticles]: "RSS 및 Atom을 구독하여 최신 게시물 받아보기",

	// 비밀번호 보호
	[Key.passwordProtected]: "비밀번호로 보호됨",
	[Key.passwordProtectedTitle]: "이 콘텐츠는 비밀번호로 보호되어 있습니다",
	[Key.passwordProtectedDescription]:
		"보호된 콘텐츠를 보려면 비밀번호를 입력해주세요",
	[Key.passwordPlaceholder]: "비밀번호 입력",
	[Key.passwordUnlock]: "잠금 해제",
	[Key.passwordUnlocking]: "잠금 해제 중...",
	[Key.passwordIncorrect]: "비밀번호가 올바르지 않습니다. 다시 시도해주세요",
	[Key.passwordDecryptError]:
		"복호화에 실패했습니다. 비밀번호가 올바른지 확인해주세요",
	[Key.passwordRequired]: "비밀번호를 입력해주세요",
	[Key.passwordVerifying]: "확인 중...",
	[Key.passwordDecryptFailed]: "복호화에 실패했습니다. 비밀번호를 확인해주세요",
	[Key.passwordDecryptRetry]: "복호화에 실패했습니다. 다시 시도해주세요",
	[Key.passwordUnlockButton]: "잠금 해제",
	[Key.copyFailed]: "복사 실패:",
	[Key.syntaxHighlightFailed]: "구문 강조 실패:",
	[Key.autoSyntaxHighlightFailed]: "자동 구문 강조도 실패했습니다:",
	[Key.decryptionError]: "복호화 중 오류가 발생했습니다:",

	// 마지막 수정 시간 카드
	[Key.lastModifiedPrefix]: "마지막 편집 후 경과 시간: ",
	[Key.lastModifiedOutdated]: "일부 정보는 오래되었을 수 있습니다",
	[Key.year]: "년",
	[Key.month]: "개월",
	[Key.day]: "일",
	[Key.hour]: "시간",
	[Key.minute]: "분",
	[Key.second]: "초",

	// 사이트 통계
	[Key.siteStats]: "사이트 통계",
	[Key.siteStatsPostCount]: "게시물 수",
	[Key.siteStatsCategoryCount]: "카테고리 수",
	[Key.siteStatsTagCount]: "태그 수",
	[Key.siteStatsTotalWords]: "총 글자 수",
	[Key.siteStatsRunningDays]: "운영 일수",
	[Key.siteStatsLastUpdate]: "마지막 활동",
	[Key.siteStatsDaysAgo]: "{days}일 전",
	[Key.siteStatsDays]: "{days}일",
	[Key.siteStatsCurrentDate]: "날짜",
	[Key.siteStatsDateFormat]: "{year}/{month}/{day}",
	[Key.siteStatsCurrentTime]: "시간",
	[Key.siteStatsTimePeriodMorning]: "아침",
	[Key.siteStatsTimePeriodNoon]: "정오",
	[Key.siteStatsTimePeriodAfternoon]: "오후",
	[Key.siteStatsTimePeriodEvening]: "저녁",
	[Key.siteStatsTimePeriodNight]: "밤",
	[Key.siteStatsAm]: "오전",
	[Key.siteStatsPm]: "오후",
	[Key.siteStatsSeason]: "계절",
	[Key.siteStatsSeasonSpring]: "봄",
	[Key.siteStatsSeasonSummer]: "여름",
	[Key.siteStatsSeasonAutumn]: "가을",
	[Key.siteStatsSeasonWinter]: "겨울",

	// 캘린더 컴포넌트
	[Key.calendarPrevMonth]: "이전 달",
	[Key.calendarNextMonth]: "다음 달",
	[Key.calendarBackToToday]: "오늘로 돌아가기",
	[Key.calendarSunday]: "일",
	[Key.calendarMonday]: "월",
	[Key.calendarTuesday]: "화",
	[Key.calendarWednesday]: "수",
	[Key.calendarThursday]: "목",
	[Key.calendarFriday]: "금",
	[Key.calendarSaturday]: "토",
	[Key.calendarJanuary]: "1월",
	[Key.calendarFebruary]: "2월",
	[Key.calendarMarch]: "3월",
	[Key.calendarApril]: "4월",
	[Key.calendarMay]: "5월",
	[Key.calendarJune]: "6월",
	[Key.calendarJuly]: "7월",
	[Key.calendarAugust]: "8월",
	[Key.calendarSeptember]: "9월",
	[Key.calendarOctober]: "10월",
	[Key.calendarNovember]: "11월",
	[Key.calendarDecember]: "12월",

	// 공유 기능
	[Key.shareArticle]: "공유하기",
	[Key.generatingPoster]: "포스터 생성 중...",
	[Key.copied]: "복사됨",
	[Key.copyLink]: "링크 복사",
	[Key.savePoster]: "포스터 저장",
	[Key.scanToRead]: "스캔하여 읽기",
	[Key.shareOnSocial]: "공유하기",
	[Key.shareOnSocialDescription]:
		"이 글이 도움이 되셨다면 다른 사람들과 공유해주세요!",

	// 프로필 통계
	[Key.profileStatsLoading]: "통계 불러오는 중...",
	[Key.profileStatsPageViews]: "페이지 조회수",
	[Key.profileStatsVisits]: "방문수",
	[Key.profileStatsUnavailable]: "통계를 사용할 수 없습니다",

	// 페이지 조회수 통계
	[Key.pageViewsLoading]: "통계 불러오는 중...",
	[Key.pageViewsUnavailable]: "통계를 사용할 수 없습니다",

	// 게시물 목록 레이아웃
	[Key.postListLayout]: "게시물 목록 레이아웃",
	[Key.listMode]: "목록",
	[Key.gridMode]: "그리드",

	// 외부 링크 경고
	[Key.leaveSite]: "사이트 떠나기",
	[Key.goToExternalLink]: "다음 외부 링크로 이동하려고 합니다:",
	[Key.warningText]: "계정 및 자산 보안에 유의하시기 바랍니다",
	[Key.confirmText]: "계속 방문하기",
	[Key.cancelText]: "취소",

	// 소셜 미디어에서 친구 추가하기
	[Key.contactMethod1]: "Wechat",
	[Key.contactMethod2]: "QQ",
	[Key.contactMethod3]: "Telegram",
	[Key.scanContact1]: "QR 코드를 스캔하여 WeChat 친구 추가",
	[Key.scanContact2]: "QR 코드를 스캔하여 QQ 친구 추가",
	[Key.scanContact3]: "QR 코드를 스캔하여 Telegram 친구 추가",

	// 날씨 컴포넌트
	[Key.weather]: "날씨",
	[Key.weatherNoApiKey]: "src/config.ts 에 WeatherAPI 키를 추가하세요",
	[Key.weatherLocationDisabled]:
		"개인정보 계약을 거부하여 날씨 위치 서비스가 비활성화되었습니다",
	[Key.weatherWaitingConsent]: "날씨 위치 권한을 기다리는 중...",
	[Key.weatherDefaultLocationHint]:
		"개인정보 동의 거부로 기본 위치로 날씨를 가져오는 중",
	[Key.weatherDefaultLocationConfirm]: "확인",
	[Key.weatherLoading]: "날씨를 불러오는 중...",
	[Key.weatherLoadFailed]: "불러오기 실패",
	[Key.weatherRetry]: "재시도",
	[Key.weatherSearchPlaceholder]: "도시 검색...",
	[Key.weatherHumidity]: "습도",
	[Key.weatherWind]: "바람",
	[Key.weatherFeelsLike]: "체감온도",
	[Key.weatherUV]: "자외선 지수",
	[Key.weatherVisibility]: "가시거리",
	[Key.weatherForecast]: "7일 예보",
	[Key.weatherToday]: "오늘",
	[Key.weatherHigh]: "최고",
	[Key.weatherLow]: "최저",
	[Key.weatherCelsius]: "°C",
	[Key.weatherFahrenheit]: "°F",
	[Key.weatherKmh]: "km/h",
	[Key.weatherMph]: "mph",
	[Key.weatherChangeLocation]: "지역 변경",
	[Key.weatherDetectLocation]: "현재 위치 감지",

	// 날씨 상태
	[Key.weatherCondSunny]: "맑음",
	[Key.weatherCondPartlyCloudy]: "부분적 흐림",
	[Key.weatherCondCloudy]: "흐림",
	[Key.weatherCondFog]: "안개",
	[Key.weatherCondDrizzle]: "이슬비",
	[Key.weatherCondRain]: "비",
	[Key.weatherCondHeavyRain]: "폭우",
	[Key.weatherCondSnow]: "눈",
	[Key.weatherCondHeavySnow]: "폭설",
	[Key.weatherCondSleet]: "진눈깨비",
	[Key.weatherCondThunderstorm]: "뇌우",
	[Key.weatherCondHail]: "우박",
	[Key.weatherCondDust]: "황사",

	// Cookie 개인정보 알림
	[Key.cookieConsentTitle]: "개인정보 보호",
	[Key.cookieConsentDescription]:
		"BrightMoon 는 서비스 및 광고 제공, 유지보수, 개선을 위해 Cookie를 사용하여 기기 식별자 등의 데이터를 저장하고 접근합니다. 「수락」을 선택하거나 「모두 거부」를 클릭하여 불필요한 Cookie를 거부할 수 있습니다.",
	[Key.cookieConsentIpInfo]: "위치 정보 확인 중...",
	[Key.cookieConsentIpTimeout]: "위치 정보 확인 시간이 초과되었습니다",
	[Key.cookieConsentAccept]: "수락",
	[Key.cookieConsentReject]: "모두 거부",

	// Twikoo 댓글 시스템
	[Key.twikooInitializing]: "Twikoo 댓글 시스템 초기화 중...",
	[Key.twikooNotConfigured]: "Twikoo 댓글 시스템이 아직 구성되지 않았습니다",
	[Key.twikooConfigHint]: "src/config.ts 에서 Twikoo 댓글 시스템을 구성하세요",
	[Key.twikooPrivacyRejected]:
		"개인정보 계약을 거부하여 Twikoo 댓글 시스템이 비활성화되었습니다",

	// 버전 업데이트 확인
	[Key.versionCheck]: "업데이트 확인",
	[Key.versionLatest]: "최신 버전입니다",
	[Key.versionNewVersion]: "새 버전이 있습니다",
	[Key.versionChecking]: "확인 중...",
	[Key.versionCheckError]: "확인 실패",
	[Key.versionPreRelease]: "베타",
	[Key.versionCheckFailedTitle]: "업데이트 확인 실패",
	[Key.versionCheckFailedDesc]:
		"업데이트를 확인할 수 없습니다. 일반적으로 원격 저장소 API 속도 제한 또는 원격 저장소 API 주소가 설정되지 않아 발생합니다. 나중에 다시 시도해 주세요",
	[Key.versionCheckSuccessTitle]: "확인 성공",
	[Key.versionCheckSuccessDesc]:
		"현재 새 버전이 발견되지 않았습니다. 최신 버전입니다",
	[Key.versionDownload]: "최신 버전 다운로드",
	[Key.versionUpdateWarning]:
		"BrightMoon 블로그 프레임워크 업그레이드 도구 사용을 권장합니다. 업그레이드 전 데이터를 백업하세요",

	// 브레드크럼 내비게이션
	[Key.suggestion]: "방문하고 싶을 수도 있습니다",
	[Key.navBack]: "이전 페이지로",
	[Key.navForward]: "다음 페이지로",
};
