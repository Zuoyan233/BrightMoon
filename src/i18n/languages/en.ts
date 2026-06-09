import Key from "../i18nKey";
import type { Translation } from "../translation";

export const en: Translation = {
	[Key.home]: "Home",
	[Key.about]: "About",
	[Key.archive]: "Archive",
	[Key.search]: "Search",
	[Key.feedback]: "Feedback",
	[Key.other]: "Other",

	// Translation panel title
	[Key.translateHeader]: "Select Language",

	// Navigation bar titles
	[Key.navLinks]: "Links",
	[Key.navMy]: "My",
	[Key.navAbout]: "About",
	[Key.sponsors]: "Sponsors",
	[Key.navOthers]: "Others",

	[Key.tags]: "Tags",
	[Key.categories]: "Categories",
	[Key.recentPosts]: "Recent Posts",

	// TOC
	[Key.tocTitle]: "Table of Contents",

	// Announcement
	[Key.announcement]: "Announcement",
	[Key.announcementClose]: "Close",

	[Key.comments]: "Comments",
	[Key.friends]: "Friends",
	[Key.friendsSubtitle]: "Discover more great websites",
	[Key.friendsSearchPlaceholder]: "Search friend's name or description...",
	[Key.friendsFilterAll]: "All",
	[Key.friendsNoResults]: "No matching friends found",
	[Key.friendsVisit]: "Visit",
	[Key.friendsCopyLink]: "Copy Link",
	[Key.friendsCopySuccess]: "Copied",
	[Key.friendsTags]: "Tags",
	[Key.untitled]: "Untitled",
	[Key.uncategorized]: "Uncategorized",
	[Key.noTags]: "No Tags",

	[Key.wordCount]: "word",
	[Key.wordsCount]: "words",
	[Key.minuteCount]: "minute",
	[Key.minutesCount]: "minutes",
	[Key.postCount]: "post",
	[Key.postsCount]: "posts",

	[Key.appearance]: "Appearance",
	[Key.themeColor]: "Theme Color",
	[Key.sakuraEffect]: "Sakura Effect",

	[Key.lightMode]: "Light",
	[Key.darkMode]: "Dark",
	[Key.systemMode]: "System",

	[Key.more]: "More",

	[Key.author]: "Author",
	[Key.publishedAt]: "Published at",
	[Key.license]: "License",
	[Key.anime]: "Anime",
	[Key.diary]: "Diary",

	// Anime Page
	[Key.animeTitle]: "My Anime List",
	[Key.animeSubtitle]: "Record my anime journey",
	[Key.animeStatusWatching]: "Watching",
	[Key.animeStatusCompleted]: "Completed",
	[Key.animeStatusPlanned]: "Planned",
	[Key.animeStatusOnHold]: "On Hold",
	[Key.animeStatusDropped]: "Dropped",
	[Key.animeFilterAll]: "All",
	[Key.animeYear]: "Year",
	[Key.animeStudio]: "Studio",
	[Key.animeEmpty]: "No anime data available",
	[Key.animeEmptyBangumi]:
		"Please check Bangumi configuration or network connection",
	[Key.animeEmptyBilibili]:
		"Bilibili data is empty. Please run `pnpm run update-bilibili` to get data",
	[Key.animeSetBangumiUserId]:
		"Please set your Bangumi userID in the src/config.ts file",
	[Key.animeSetBilibiliVmId]:
		"Please set your Bilibili vmID in the src/config.ts file",
	[Key.animeEmptyLocal]:
		"Please add anime information in src/data/anime.ts file",

	// Diary Page
	[Key.diarySubtitle]: "Share life, anytime, anywhere",
	[Key.diaryCount]: "diary entries",
	[Key.diaryReply]: "Reply",
	[Key.diaryTips]: "Only show the latest 30 diary entries",
	[Key.diaryMinutesAgo]: "minutes ago",
	[Key.diaryHoursAgo]: "hours ago",
	[Key.diaryDaysAgo]: "days ago",

	// 404 Page
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "Page Not Found",
	[Key.notFoundDescription]:
		"Sorry, the page you visited does not exist or has been moved.",
	[Key.backToHome]: "Back to Home",

	// Music Player
	[Key.musicPlayer]: "Music Player",
	[Key.musicPlayerShow]: "Show Music Player",
	[Key.musicPlayerHide]: "Hide Music Player",
	[Key.musicPlayerExpand]: "Expand Music Player",
	[Key.musicPlayerCollapse]: "Collapse Music Player",
	[Key.musicPlayerPause]: "Pause",
	[Key.musicPlayerPlay]: "Play",
	[Key.musicPlayerPrevious]: "Previous",
	[Key.musicPlayerNext]: "Next",
	[Key.musicPlayerShuffle]: "Shuffle",
	[Key.musicPlayerRepeat]: "Repeat All",
	[Key.musicPlayerRepeatOne]: "Repeat One",
	[Key.musicPlayerVolume]: "Volume Control",
	[Key.musicPlayerProgress]: "Playback Progress",
	[Key.musicPlayerCover]: "Cover",
	[Key.musicPlayerPlaylist]: "Playlist",
	[Key.musicPlayerLoading]: "Loading...",
	[Key.musicPlayerErrorPlaylist]: "Failed to fetch playlist",
	[Key.musicPlayerErrorSong]: "Failed to load current song, trying next",
	[Key.musicPlayerErrorEmpty]: "No available songs in playlist",
	[Key.unknownSong]: "Unknown Song",
	[Key.unknownArtist]: "Unknown Artist",

	// Albums Page
	[Key.albums]: "Albums",
	[Key.albumsSubtitle]: "Record beautiful moments in life",
	[Key.albumsEmpty]: "No content",
	[Key.albumsEmptyDesc]:
		"No albums have been created yet. Go add some beautiful memories!",
	[Key.albumsBackToList]: "Back to Albums",
	[Key.albumsPhotoCount]: "photos",
	[Key.albumsPhotosCount]: "photos",
	[Key.hiddenAlbum]: "Hidden Album",
	[Key.hideAlbumTip]:
		"This album is set to hidden and will not appear in the album list, but can still be accessed via a direct link",

	// Devices Page
	[Key.devices]: "My Devices",
	[Key.devicesSubtitle]: "Here are the devices I use in my daily life",
	[Key.devicesViewDetails]: "View Details",

	// Projects Page
	[Key.projects]: "Projects",
	[Key.projectsSubtitle]: "My development project portfolio",
	[Key.projectsAll]: "All",
	[Key.projectsWeb]: "Web Applications",
	[Key.projectsMobile]: "Mobile Applications",
	[Key.projectsDesktop]: "Desktop Applications",
	[Key.projectsOther]: "Other",
	[Key.projectTechStack]: "Tech Stack",
	[Key.projectLiveDemo]: "Live Demo",
	[Key.projectSourceCode]: "Source Code",
	[Key.projectDescription]: "Project Description",
	[Key.projectStatus]: "Status",
	[Key.projectStatusCompleted]: "Completed",
	[Key.projectStatusInProgress]: "In Progress",
	[Key.projectStatusPlanned]: "Planned",
	[Key.projectsTotal]: "Total Projects",
	[Key.projectsCompleted]: "Completed",
	[Key.projectsInProgress]: "In Progress",
	[Key.projectsTechStack]: "Tech Stack Statistics",
	[Key.projectsFeatured]: "Featured Projects",
	[Key.projectsPlanned]: "Planned",
	[Key.projectsDemo]: "Live Demo",
	[Key.projectsSource]: "Source Code",
	[Key.projectsVisit]: "Visit Project",
	[Key.projectsGitHub]: "GitHub",

	// RSS Page
	[Key.rss]: "RSS Feed",
	[Key.rssDescription]: "Subscribe to get latest updates",
	[Key.rssSubtitle]:
		"Subscribe via RSS to get the latest articles and updates immediately",
	[Key.rssLink]: "RSS Link",
	[Key.rssCopyToReader]: "Copy link to your RSS reader",
	[Key.rssCopyLink]: "Copy",
	[Key.rssLatestPosts]: "Latest Posts",
	[Key.rssWhatIsRSS]: "What is RSS?",
	[Key.rssWhatIsRSSDescription]:
		"RSS (Really Simple Syndication) is a standard format for publishing frequently updated content. With RSS, you can:",
	[Key.rssBenefit1]:
		"Get latest website content in time without manually visiting",
	[Key.rssBenefit2]: "Manage subscriptions to multiple websites in one place",
	[Key.rssBenefit3]: "Avoid missing important updates and articles",
	[Key.rssBenefit4]: "Enjoy an ad-free, clean reading experience",
	[Key.rssHowToUse]:
		"It is recommended to use Feedly, Inoreader or other RSS readers to subscribe to this site.",
	[Key.rssCopied]: "RSS link copied to clipboard!",
	[Key.rssCopyFailed]: "Copy failed, please copy the link manually",

	// Atom Page
	[Key.atom]: "Atom Feed",
	[Key.atomDescription]: "Subscribe to get latest updates",
	[Key.atomSubtitle]:
		"Subscribe via Atom to get the latest articles and updates immediately",
	[Key.atomLink]: "Atom Link",
	[Key.atomCopyToReader]: "Copy link to your Atom reader",
	[Key.atomCopyLink]: "Copy",
	[Key.atomLatestPosts]: "Latest Posts",
	[Key.atomWhatIsAtom]: "What is Atom?",
	[Key.atomWhatIsAtomDescription]:
		"Atom (Atom Syndication Format) is an XML-based standard for describing feeds and their items. With Atom, you can:",
	[Key.atomBenefit1]:
		"Get latest website content in time without manually visiting",
	[Key.atomBenefit2]: "Manage subscriptions to multiple websites in one place",
	[Key.atomBenefit3]: "Avoid missing important updates and articles",
	[Key.atomBenefit4]: "Enjoy an ad-free, clean reading experience",
	[Key.atomHowToUse]:
		"It is recommended to use Feedly, Inoreader or other Atom readers to subscribe to this site.",
	[Key.atomCopied]: "Atom link copied to clipboard!",
	[Key.atomCopyFailed]: "Copy failed, please copy the link manually",

	// Wallpaper mode
	[Key.wallpaperMode]: "Wallpaper Mode",
	[Key.wallpaperBanner]: "Banner Mode",
	[Key.wallpaperFullscreen]: "Fullscreen Mode",
	[Key.wallpaperNone]: "Hide Wallpaper",

	// Navbar transparent mode
	[Key.navbarTransparentMode]: "Navbar Style",
	[Key.navbarTransparentSemi]: "Frosted",
	[Key.navbarTransparentFull]: "Transparent",
	[Key.navbarTransparentSemifull]: "Dynamic",

	// Skills Page
	[Key.skills]: "Skills",
	[Key.skillsSubtitle]: "My technical skills and expertise",
	[Key.skillsFrontend]: "Frontend Development",
	[Key.skillsBackend]: "Backend Development",
	[Key.skillsDatabase]: "Database",
	[Key.skillsTools]: "Development Tools",
	[Key.skillsOther]: "Other Skills",
	[Key.skillLevel]: "Proficiency",
	[Key.skillLevelBeginner]: "Beginner",
	[Key.skillLevelIntermediate]: "Intermediate",
	[Key.skillLevelAdvanced]: "Advanced",
	[Key.skillLevelExpert]: "Expert",
	[Key.skillExperience]: "Experience",
	[Key.skillYears]: "years",
	[Key.skillMonths]: "months",
	[Key.skillsTotal]: "Total Skills",
	[Key.skillsExpert]: "Expert Level",
	[Key.skillsAdvanced]: "Advanced",
	[Key.skillsIntermediate]: "Intermediate",
	[Key.skillsBeginner]: "Beginner",
	[Key.skillsAdvancedTitle]: "Professional Skills",
	[Key.skillsProjects]: "Related Projects",
	[Key.skillsDistribution]: "Skill Distribution",
	[Key.skillsByLevel]: "By Level",
	[Key.skillsByCategory]: "By Category",
	[Key.noData]: "No data",

	// Timeline Page
	[Key.timeline]: "Timeline",
	[Key.timelineSubtitle]: "My growth journey and important milestones",
	[Key.timelineEducation]: "Education",
	[Key.timelineWork]: "Work Experience",
	[Key.timelineProject]: "Project Experience",
	[Key.timelineAchievement]: "Achievements",
	[Key.timelinePresent]: "Present",
	[Key.timelineLocation]: "Location",
	[Key.timelineDescription]: "Detailed Description",
	[Key.timelineMonths]: "months",
	[Key.timelineYears]: "years",
	[Key.timelineTotal]: "Total",
	[Key.timelineProjects]: "Projects",
	[Key.timelineExperience]: "Work Experience",
	[Key.timelineCurrent]: "Current Status",
	[Key.timelineHistory]: "History",
	[Key.timelineAchievements]: "Achievements",
	[Key.timelineStartDate]: "Start Date",
	[Key.timelineDuration]: "Duration",

	// Feedback Page - Contact the webmaster Module
	[Key.contactMe]: "Contact the webmaster",
	[Key.contactEmail]: "Contact the webmaster via email",
	[Key.contactSocialFriends]:
		"Contact the webmaster by adding them as a social media friend",
	[Key.addFriends]: "Add a friend now",

	// Sponsorship Page
	[Key.sponsorsNotice1]:
		"If you find the website content helpful, please support my work through the following methods to help create better content. All sponsorships will be used for website maintenance, server costs, and content creation.",
	[Key.sponsorsNotice2]:
		"Thank you for supporting the BrightMoon blog project content development!",
	[Key.wechatPay]: "WeChat",
	[Key.aliPay]: "Alipay",
	[Key.scanPayQRcode]: "Scan to Pay",
	[Key.sponsorsPartner]: "Sponsors Partner",
	[Key.otherSupportOptions]: "Other support methods",
	[Key.shareBlog]: "Share my blog with more friends",
	[Key.leaveComment]:
		"Leave your thoughts in the comments section below the article",
	[Key.subscribeToArticles]:
		"Subscribe to RSS and Atom to get the latest articles",

	// Password Protection
	[Key.passwordProtected]: "Password Protected",
	[Key.passwordProtectedTitle]: "This content is password protected",
	[Key.passwordProtectedDescription]:
		"Please enter the password to view the protected content",
	[Key.passwordPlaceholder]: "Enter password",
	[Key.passwordUnlock]: "Unlock",
	[Key.passwordUnlocking]: "Unlocking...",
	[Key.passwordIncorrect]: "Incorrect password, please try again",
	[Key.passwordDecryptError]:
		"Decryption failed, please check if the password is correct",
	[Key.passwordRequired]: "Please enter the password",
	[Key.passwordVerifying]: "Verifying...",
	[Key.passwordDecryptFailed]: "Decryption failed, please check the password",
	[Key.passwordDecryptRetry]: "Decryption failed, please try again",
	[Key.passwordUnlockButton]: "Unlock",
	[Key.copyFailed]: "Copy failed:",
	[Key.syntaxHighlightFailed]: "Syntax highlighting failed:",
	[Key.autoSyntaxHighlightFailed]: "Automatic syntax highlighting also failed:",
	[Key.decryptionError]: "An error occurred during decryption:",

	// Last Modified Time Card
	[Key.lastModifiedPrefix]: "Time since last edit: ",
	[Key.lastModifiedOutdated]: "Some information may be outdated",
	[Key.year]: "y",
	[Key.month]: "m",
	[Key.day]: "d",
	[Key.hour]: "h",
	[Key.minute]: "min",
	[Key.second]: "s",

	// Site Stats
	[Key.siteStats]: "Site Statistics",
	[Key.siteStatsPostCount]: "Posts",
	[Key.siteStatsCategoryCount]: "Categories",
	[Key.siteStatsTagCount]: "Tags",
	[Key.siteStatsTotalWords]: "Total Words",
	[Key.siteStatsRunningDays]: "Running Days",
	[Key.siteStatsLastUpdate]: "Last Activity",
	[Key.siteStatsDaysAgo]: "{days} days ago",
	[Key.siteStatsDays]: "{days} days",
	[Key.siteStatsCurrentDate]: "Date",
	[Key.siteStatsDateFormat]: "{month}/{day}/{year}",
	[Key.siteStatsCurrentTime]: "Time",
	[Key.siteStatsTimePeriodMorning]: "Moring",
	[Key.siteStatsTimePeriodNoon]: "Noon",
	[Key.siteStatsTimePeriodAfternoon]: "Afternoon",
	[Key.siteStatsTimePeriodEvening]: "Evening",
	[Key.siteStatsTimePeriodNight]: "Night",
	[Key.siteStatsAm]: "AM",
	[Key.siteStatsPm]: "PM",
	[Key.siteStatsSeason]: "Season",
	[Key.siteStatsSeasonSpring]: "Spring",
	[Key.siteStatsSeasonSummer]: "Summer",
	[Key.siteStatsSeasonAutumn]: "Autumn",
	[Key.siteStatsSeasonWinter]: "Winter",

	// Calendar Component
	[Key.calendarSunday]: "Sun",
	[Key.calendarMonday]: "Mon",
	[Key.calendarTuesday]: "Tue",
	[Key.calendarWednesday]: "Wed",
	[Key.calendarThursday]: "Thu",
	[Key.calendarFriday]: "Fri",
	[Key.calendarSaturday]: "Sat",
	[Key.calendarJanuary]: "Jan",
	[Key.calendarFebruary]: "Feb",
	[Key.calendarMarch]: "Mar",
	[Key.calendarApril]: "Apr",
	[Key.calendarMay]: "May",
	[Key.calendarJune]: "Jun",
	[Key.calendarJuly]: "Jul",
	[Key.calendarAugust]: "Aug",
	[Key.calendarSeptember]: "Sep",
	[Key.calendarOctober]: "Oct",
	[Key.calendarNovember]: "Nov",
	[Key.calendarDecember]: "Dec",

	// Share Functionality
	[Key.shareArticle]: "Share",
	[Key.generatingPoster]: "Generating poster...",
	[Key.copied]: "Copied",
	[Key.copyLink]: "Copy Link",
	[Key.savePoster]: "Save Poster",
	[Key.scanToRead]: "Scan to Read",
	[Key.shareOnSocial]: "Share",
	[Key.shareOnSocialDescription]:
		"If this article helped you, please share it with others!",

	// Profile Stats
	[Key.profileStatsLoading]: "Loading stats...",
	[Key.profileStatsPageViews]: "Page views",
	[Key.profileStatsVisits]: "Visits",
	[Key.profileStatsUnavailable]: "Stats unavailable",

	// Page Views Stats
	[Key.pageViewsLoading]: "Loading stats...",
	[Key.pageViewsUnavailable]: "Stats unavailable",

	// Post List Layout
	[Key.postListLayout]: "Post Layout",
	[Key.listMode]: "List",
	[Key.gridMode]: "Grid",

	// External Link Warning
	[Key.leaveSite]: "Leave this site",
	[Key.goToExternalLink]: "You are about to visit an external link:",
	[Key.warningText]: "Please be aware of your account and asset security",
	[Key.confirmText]: "Continue to visit",
	[Key.cancelText]: "Cancel",

	// Add friends on social media
	[Key.contactMethod1]: "Wechat",
	[Key.contactMethod2]: "QQ",
	[Key.contactMethod3]: "Telegram",
	[Key.scanContact1]: "Scan the QR code to add a WeChat friend",
	[Key.scanContact2]: "Scan the QR code to add a QQ friend",
	[Key.scanContact3]: "Scan the QR code to add a Telegram friend",

	// Weather Component
	[Key.weather]: "Weather",
	[Key.weatherNoApiKey]: "Please add WeatherAPI key in src/config.ts",
	[Key.weatherLoading]: "Loading weather...",
	[Key.weatherLoadFailed]: "Failed to load weather",
	[Key.weatherRetry]: "Retry",
	[Key.weatherSearchPlaceholder]: "Search city...",
	[Key.weatherHumidity]: "Humidity",
	[Key.weatherWind]: "Wind",
	[Key.weatherFeelsLike]: "Feels Like",
	[Key.weatherUV]: "UV Index",
	[Key.weatherVisibility]: "Visibility",
	[Key.weatherForecast]: "7-Day Forecast",
	[Key.weatherToday]: "Today",
	[Key.weatherHigh]: "High",
	[Key.weatherLow]: "Low",
	[Key.weatherCelsius]: "°C",
	[Key.weatherFahrenheit]: "°F",
	[Key.weatherKmh]: "km/h",
	[Key.weatherMph]: "mph",
	[Key.weatherChangeLocation]: "Change Location",
	[Key.weatherDetectLocation]: "Detect Location",

	// Weather Conditions
	[Key.weatherCondSunny]: "Sunny",
	[Key.weatherCondPartlyCloudy]: "Partly Cloudy",
	[Key.weatherCondCloudy]: "Cloudy",
	[Key.weatherCondFog]: "Fog",
	[Key.weatherCondDrizzle]: "Drizzle",
	[Key.weatherCondRain]: "Rain",
	[Key.weatherCondHeavyRain]: "Heavy Rain",
	[Key.weatherCondSnow]: "Snow",
	[Key.weatherCondHeavySnow]: "Heavy Snow",
	[Key.weatherCondSleet]: "Sleet",
	[Key.weatherCondThunderstorm]: "Thunderstorm",
	[Key.weatherCondHail]: "Ice Pellets",
};
