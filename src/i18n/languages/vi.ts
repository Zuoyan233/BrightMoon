import Key from "../i18nKey";
import type { Translation } from "../translation";

export const vi: Translation = {
	[Key.home]: "Trang chủ",
	[Key.about]: "Giới thiệu",
	[Key.archive]: "Lưu trữ",
	[Key.search]: "Tìm kiếm",
	[Key.feedback]: "Phản hồi",
	[Key.other]: "Khác",

	// Tiêu đề bảng dịch
	[Key.translateHeader]: "Chọn ngôn ngữ",

	// Tiêu đề thanh điều hướng
	[Key.navLinks]: "Liên kết",
	[Key.navMy]: "Của tôi",
	[Key.navAbout]: "Giới thiệu",
	[Key.sponsors]: "Nhà tài trợ",
	[Key.navOthers]: "Khác",

	[Key.tags]: "Thẻ",
	[Key.categories]: "Danh mục",
	[Key.recentPosts]: "Bài viết gần đây",

	// Mục lục
	[Key.tocTitle]: "Mục lục",

	// Thông báo
	[Key.announcement]: "Thông báo",
	[Key.announcementClose]: "Đóng",

	[Key.comments]: "Bình luận",
	[Key.friends]: "Bạn bè",
	[Key.friendsSubtitle]: "Khám phá thêm nhiều trang web tuyệt vời",
	[Key.friendsSearchPlaceholder]: "Tìm kiếm tên hoặc mô tả của bạn...",
	[Key.friendsFilterAll]: "Tất cả",
	[Key.friendsNoResults]: "Không tìm thấy bạn phù hợp",
	[Key.friendsVisit]: "Truy cập",
	[Key.friendsCopyLink]: "Sao chép liên kết",
	[Key.friendsCopySuccess]: "Đã sao chép",
	[Key.friendsTags]: "Thẻ",
	[Key.untitled]: "Không có tiêu đề",
	[Key.uncategorized]: "Chưa phân loại",
	[Key.noTags]: "Không có thẻ",

	[Key.wordCount]: "từ",
	[Key.wordsCount]: "từ",
	[Key.minuteCount]: "phút",
	[Key.minutesCount]: "phút",
	[Key.postCount]: "bài viết",
	[Key.postsCount]: "bài viết",

	[Key.appearance]: "Cá nhân hóa",
	[Key.themeSwitch]: "Chuyển đổi chủ đề",
	[Key.themeColor]: "Màu chủ đề",
	[Key.sakuraEffect]: "Hiệu ứng hoa anh đào",
	[Key.wavesEffect]: "Hiệu ứng sóng",
	[Key.wavesPerformanceMode]: "Chế độ hiệu suất",
	[Key.homeText]: "Hiển thị biểu ngữ",

	[Key.lightMode]: "Sáng",
	[Key.darkMode]: "Tối",
	[Key.systemMode]: "Hệ thống",

	[Key.more]: "Thêm",

	[Key.author]: "Tác giả",
	[Key.publishedAt]: "Đăng lúc",
	[Key.license]: "Giấy phép",
	[Key.anime]: "Anime",
	[Key.diary]: "Nhật ký",

	// Trang Anime
	[Key.animeTitle]: "Danh sách Anime của tôi",
	[Key.animeSubtitle]: "Ghi lại hành trình xem anime của tôi",
	[Key.animeStatusWatching]: "Đang xem",
	[Key.animeStatusCompleted]: "Đã xem",
	[Key.animeStatusPlanned]: "Dự định",
	[Key.animeStatusOnHold]: "Tạm dừng",
	[Key.animeStatusDropped]: "Bỏ qua",
	[Key.animeFilterAll]: "Tất cả",
	[Key.animeYear]: "Năm",
	[Key.animeStudio]: "Studio",
	[Key.animeEmpty]: "Không có dữ liệu anime",
	[Key.animeEmptyBangumi]:
		"Vui lòng kiểm tra cấu hình Bangumi hoặc kết nối mạng",
	[Key.animeEmptyBilibili]:
		"Dữ liệu Bilibili trống. Vui lòng chạy `pnpm run update-bilibili` để lấy dữ liệu",
	[Key.animeSetBangumiUserId]:
		"Vui lòng thiết lập Bangumi userID của bạn trong tệp src/config/user.ts",
	[Key.animeSetBilibiliVmId]:
		"Vui lòng thiết lập Bilibili vmID của bạn trong tệp src/config/user.ts",
	[Key.animeEmptyLocal]:
		"Vui lòng thêm thông tin anime trong tệp src/data/anime.ts",

	// Trang Nhật ký
	[Key.diarySubtitle]: "Chia sẻ cuộc sống, mọi lúc mọi nơi",
	[Key.diaryCount]: "bài nhật ký",
	[Key.diaryReply]: "Phản hồi",
	[Key.diaryTips]: "Chỉ hiển thị 30 bài nhật ký gần nhất",
	[Key.diaryMinutesAgo]: "phút trước",
	[Key.diaryHoursAgo]: "giờ trước",
	[Key.diaryDaysAgo]: "ngày trước",

	// Trang 404
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "Không tìm thấy trang",
	[Key.notFoundDescription]:
		"Xin lỗi, trang bạn truy cập không tồn tại hoặc đã bị di chuyển.",
	[Key.backToHome]: "Quay lại trang chủ",

	// Trình phát nhạc
	[Key.musicPlayer]: "Trình phát nhạc",
	[Key.musicPlayerShow]: "Hiện trình phát nhạc",
	[Key.musicPlayerHide]: "Ẩn trình phát nhạc",
	[Key.musicPlayerExpand]: "Mở rộng trình phát nhạc",
	[Key.musicPlayerCollapse]: "Thu gọn trình phát nhạc",
	[Key.musicPlayerPause]: "Tạm dừng",
	[Key.musicPlayerPlay]: "Phát",
	[Key.musicPlayerPrevious]: "Bài trước",
	[Key.musicPlayerNext]: "Bài tiếp",
	[Key.musicPlayerShuffle]: "Phát ngẫu nhiên",
	[Key.musicPlayerRepeat]: "Phát lại tất cả",
	[Key.musicPlayerRepeatOne]: "Phát lại một bài",
	[Key.musicPlayerVolume]: "Điều chỉnh âm lượng",
	[Key.musicPlayerMute]: "Tắt tiếng",
	[Key.musicPlayerUnmute]: "Bật tiếng",
	[Key.musicPlayerProgress]: "Tiến độ phát",
	[Key.musicPlayerCover]: "Ảnh bìa",
	[Key.musicPlayerPlaylist]: "Danh sách phát",
	[Key.musicPlayerLoading]: "Đang tải...",
	[Key.musicPlayerErrorPlaylist]: "Không thể tải danh sách phát",
	[Key.musicPlayerErrorSong]:
		"Không thể tải bài hát hiện tại, đang thử bài tiếp",
	[Key.musicPlayerErrorEmpty]: "Không có bài hát nào trong danh sách phát",
	[Key.musicPlayerLyrics]: "Lời bài hát",
	[Key.musicPlayerLyricsShow]: "Hiện lời bài hát",
	[Key.musicPlayerLyricsHide]: "Ẩn lời bài hát",
	[Key.musicPlayerNoLyrics]: "Không có lời bài hát",
	[Key.musicPlayerLocateCurrent]: "Đi đến bài hát hiện tại",
	[Key.unknownSong]: "Bài hát không rõ",
	[Key.unknownArtist]: "Nghệ sĩ không rõ",

	// Trang Album
	[Key.albums]: "Album",
	[Key.albumsSubtitle]: "Ghi lại những khoảnh khắc đẹp trong cuộc sống",
	[Key.albumsEmpty]: "Không có nội dung",
	[Key.albumsEmptyDesc]:
		"Chưa có album nào được tạo. Hãy thêm những kỷ niệm đẹp nhé!",
	[Key.albumsBackToList]: "Quay lại danh sách Album",
	[Key.albumsPhotoCount]: "ảnh",
	[Key.albumsPhotosCount]: "ảnh",
	[Key.hiddenAlbum]: "Album ẩn",
	[Key.hideAlbumTip]:
		"Album này được đặt ở chế độ ẩn và sẽ không xuất hiện trong danh sách album, nhưng vẫn có thể truy cập qua liên kết trực tiếp",

	// Thiết bị
	[Key.devices]: "Thiết bị của tôi",
	[Key.devicesSubtitle]: "Đây là những thiết bị tôi sử dụng hàng ngày",
	[Key.devicesViewDetails]: "Xem chi tiết",

	// Trang Dự án
	[Key.projects]: "Dự án",
	[Key.projectsSubtitle]: "Danh mục các dự án phát triển của tôi",
	[Key.projectsAll]: "Tất cả",
	[Key.projectsWeb]: "Ứng dụng Web",
	[Key.projectsMobile]: "Ứng dụng Di động",
	[Key.projectsDesktop]: "Ứng dụng Máy tính",
	[Key.projectsOther]: "Khác",
	[Key.projectTechStack]: "Công nghệ sử dụng",
	[Key.projectLiveDemo]: "Bản demo trực tiếp",
	[Key.projectSourceCode]: "Mã nguồn",
	[Key.projectDescription]: "Mô tả dự án",
	[Key.projectStatus]: "Trạng thái",
	[Key.projectStatusCompleted]: "Hoàn thành",
	[Key.projectStatusInProgress]: "Đang phát triển",
	[Key.projectStatusPlanned]: "Đã lên kế hoạch",
	[Key.projectsTotal]: "Tổng số dự án",
	[Key.projectsCompleted]: "Đã hoàn thành",
	[Key.projectsInProgress]: "Đang phát triển",
	[Key.projectsTechStack]: "Thống kê công nghệ",
	[Key.projectsFeatured]: "Dự án nổi bật",
	[Key.projectsPlanned]: "Đã lên kế hoạch",
	[Key.projectsDemo]: "Bản demo",
	[Key.projectsSource]: "Mã nguồn",
	[Key.projectsVisit]: "Truy cập dự án",
	[Key.projectsGitHub]: "GitHub",

	// RSS
	[Key.rss]: "RSS Feed",
	[Key.rssDescription]: "Đăng ký để nhận cập nhật mới nhất",
	[Key.rssSubtitle]:
		"Đăng ký qua RSS để nhận ngay bài viết và cập nhật mới nhất",
	[Key.rssLink]: "Liên kết RSS",
	[Key.rssCopyToReader]: "Sao chép liên kết vào trình đọc RSS của bạn",
	[Key.rssCopyLink]: "Sao chép",
	[Key.rssLatestPosts]: "Bài viết mới nhất",
	[Key.rssWhatIsRSS]: "RSS là gì?",
	[Key.rssWhatIsRSSDescription]:
		"RSS (Really Simple Syndication) là một định dạng chuẩn để xuất bản nội dung thường xuyên cập nhật. Với RSS, bạn có thể:",
	[Key.rssBenefit1]:
		"Nhận nội dung mới từ trang web kịp thời mà không cần phải truy cập thủ công",
	[Key.rssBenefit2]: "Quản lý đăng ký từ nhiều trang web chỉ trong một nơi",
	[Key.rssBenefit3]: "Không bỏ lỡ các bài viết và cập nhật quan trọng",
	[Key.rssBenefit4]: "Tận hưởng trải nghiệm đọc sạch sẽ, không quảng cáo",
	[Key.rssHowToUse]:
		"Nên sử dụng Feedly, Inoreader hoặc các trình đọc RSS khác để đăng ký trang này.",
	[Key.rssCopied]: "Đã sao chép liên kết RSS vào bộ nhớ tạm",
	[Key.rssCopyFailed]: "Sao chép thất bại, vui lòng sao chép liên kết thủ công",

	// Trang Atom
	[Key.atom]: "Atom Feed",
	[Key.atomDescription]: "Đăng ký để nhận cập nhật mới nhất",
	[Key.atomSubtitle]:
		"Đăng ký qua Atom để nhận ngay bài viết và cập nhật mới nhất",
	[Key.atomLink]: "Liên kết Atom",
	[Key.atomCopyToReader]: "Sao chép liên kết vào trình đọc Atom của bạn",
	[Key.atomCopyLink]: "Sao chép",
	[Key.atomLatestPosts]: "Bài viết mới nhất",
	[Key.atomWhatIsAtom]: "Atom là gì?",
	[Key.atomWhatIsAtomDescription]:
		"Atom (Atom Syndication Format) là một tiêu chuẩn dựa trên XML để mô tả nguồn cấp và các mục. Với Atom, bạn có thể:",
	[Key.atomBenefit1]:
		"Nhận nội dung mới từ trang web kịp thời mà không cần phải truy cập thủ công",
	[Key.atomBenefit2]: "Quản lý đăng ký từ nhiều trang web chỉ trong một nơi",
	[Key.atomBenefit3]: "Không bỏ lỡ các bài viết và cập nhật quan trọng",
	[Key.atomBenefit4]: "Tận hưởng trải nghiệm đọc sạch sẽ, không quảng cáo",
	[Key.atomHowToUse]:
		"Nên sử dụng Feedly, Inoreader hoặc các trình đọc Atom khác để đăng ký trang này.",
	[Key.atomCopied]: "Đã sao chép liên kết Atom vào bộ nhớ tạm",
	[Key.atomCopyFailed]:
		"Sao chép thất bại, vui lòng sao chép liên kết thủ công",

	// Chế độ hình nền
	[Key.wallpaperMode]: "Chế độ hình nền",
	[Key.wallpaperBanner]: "Chế độ Banner",
	[Key.wallpaperFullscreen]: "Chế độ Toàn màn hình",
	[Key.wallpaperFullscreenBanner]: "Biểu ngữ Toàn màn hình",
	[Key.wallpaperNone]: "Ẩn hình nền",
	[Key.wallpaperPosition]: "Vị trí hình nền",
	[Key.wallpaperPositionTop]: "Trên cùng",
	[Key.wallpaperPositionCenter]: "Giữa",
	[Key.wallpaperPositionBottom]: "Dưới cùng",
	[Key.wallpaperOpacity]: "Độ trong suốt nền",
	[Key.wallpaperBlur]: "Làm mờ nền",
	[Key.cardOpacity]: "Độ mờ thẻ",

	// Chế độ thanh điều hướng trong suốt
	[Key.navbarTransparentMode]: "Kiểu thanh điều hướng",
	[Key.navbarTransparentSemi]: "Mờ sương",
	[Key.navbarTransparentFull]: "Trong suốt",
	[Key.navbarTransparentSemifull]: "Động",

	// Trang Kỹ năng
	[Key.skills]: "Kỹ năng",
	[Key.skillsSubtitle]: "Kỹ năng kỹ thuật và chuyên môn của tôi",
	[Key.skillsFrontend]: "Phát triển Frontend",
	[Key.skillsBackend]: "Phát triển Backend",
	[Key.skillsDatabase]: "Cơ sở dữ liệu",
	[Key.skillsTools]: "Công cụ phát triển",
	[Key.skillsOther]: "Kỹ năng khác",
	[Key.skillLevel]: "Mức độ thành thạo",
	[Key.skillLevelBeginner]: "Cơ bản",
	[Key.skillLevelIntermediate]: "Trung cấp",
	[Key.skillLevelAdvanced]: "Nâng cao",
	[Key.skillLevelExpert]: "Chuyên gia",
	[Key.skillExperience]: "Kinh nghiệm",
	[Key.skillYears]: "năm",
	[Key.skillMonths]: "tháng",
	[Key.skillsTotal]: "Tổng số kỹ năng",
	[Key.skillsExpert]: "Cấp độ Chuyên gia",
	[Key.skillsAdvanced]: "Nâng cao",
	[Key.skillsIntermediate]: "Trung cấp",
	[Key.skillsBeginner]: "Cơ bản",
	[Key.skillsAdvancedTitle]: "Kỹ năng chuyên môn",
	[Key.skillsProjects]: "Dự án liên quan",
	[Key.skillsDistribution]: "Phân bố kỹ năng",
	[Key.skillsByLevel]: "Theo cấp độ",
	[Key.skillsByCategory]: "Theo danh mục",
	[Key.noData]: "Không có dữ liệu",

	// Trang Dòng thời gian
	[Key.timeline]: "Dòng thời gian",
	[Key.timelineSubtitle]: "Hành trình phát triển và những cột mốc quan trọng",
	[Key.timelineEducation]: "Học vấn",
	[Key.timelineWork]: "Kinh nghiệm làm việc",
	[Key.timelineProject]: "Kinh nghiệm dự án",
	[Key.timelineAchievement]: "Thành tựu",
	[Key.timelinePresent]: "Hiện tại",
	[Key.timelineLocation]: "Địa điểm",
	[Key.timelineDescription]: "Mô tả chi tiết",
	[Key.timelineMonths]: "tháng",
	[Key.timelineYears]: "năm",
	[Key.timelineTotal]: "Tổng cộng",
	[Key.timelineProjects]: "Dự án",
	[Key.timelineExperience]: "Kinh nghiệm làm việc",
	[Key.timelineCurrent]: "Trạng thái hiện tại",
	[Key.timelineHistory]: "Lịch sử",
	[Key.timelineAchievements]: "Thành tựu",
	[Key.timelineStartDate]: "Ngày bắt đầu",
	[Key.timelineDuration]: "Thời gian",

	// Trang Phản hồi - Mô-đun liên hệ quản trị viên
	[Key.contactMe]: "Liên hệ quản trị viên",
	[Key.contactEmail]: "Liên hệ quản trị viên qua email",
	[Key.contactSocialFriends]:
		"Liên hệ quản trị viên bằng cách thêm làm bạn bè trên mạng xã hội",
	[Key.addFriends]: "Thêm bạn ngay",

	// Trang Tài trợ
	[Key.sponsorsNotice1]:
		"Nếu bạn thấy nội dung trang web hữu ích, vui lòng hỗ trợ công việc của tôi thông qua các phương thức sau để giúp tạo ra nội dung tốt hơn. Mọi khoản tài trợ sẽ được sử dụng cho việc duy trì trang web, chi phí máy chủ và sáng tạo nội dung.",
	[Key.sponsorsNotice2]:
		"Cảm ơn bạn đã hỗ trợ phát triển nội dung dự án blog BrightMoon!",
	[Key.wechatPay]: "WeChat",
	[Key.aliPay]: "Alipay",
	[Key.scanPayQRcode]: "Quét mã để thanh toán",
	[Key.sponsorsPartner]: "Đối tác tài trợ",
	[Key.otherSupportOptions]: "Các phương thức hỗ trợ khác",
	[Key.shareBlog]: "Chia sẻ blog của tôi với nhiều bạn bè hơn",
	[Key.leaveComment]:
		"Để lại suy nghĩ của bạn trong phần bình luận bên dưới bài viết",
	[Key.subscribeToArticles]: "Đăng ký RSS và Atom để nhận bài viết mới nhất",

	// Bảo vệ mật khẩu
	[Key.passwordProtected]: "Được bảo vệ bằng mật khẩu",
	[Key.passwordProtectedTitle]: "Nội dung này được bảo vệ bằng mật khẩu",
	[Key.passwordProtectedDescription]:
		"Vui lòng nhập mật khẩu để xem nội dung được bảo vệ",
	[Key.passwordPlaceholder]: "Nhập mật khẩu",
	[Key.passwordUnlock]: "Mở khóa",
	[Key.passwordUnlocking]: "Đang mở khóa...",
	[Key.passwordIncorrect]: "Mật khẩu không đúng, vui lòng thử lại",
	[Key.passwordDecryptError]:
		"Giải mã thất bại, vui lòng kiểm tra mật khẩu có đúng không",
	[Key.passwordRequired]: "Vui lòng nhập mật khẩu",
	[Key.passwordVerifying]: "Đang xác minh...",
	[Key.passwordDecryptFailed]: "Giải mã thất bại, vui lòng kiểm tra mật khẩu",
	[Key.passwordDecryptRetry]: "Giải mã thất bại, vui lòng thử lại",
	[Key.passwordUnlockButton]: "Mở khóa",
	[Key.passwordHintLabel]: "Gợi ý mật khẩu",
	[Key.copyFailed]: "Sao chép thất bại:",
	[Key.syntaxHighlightFailed]: "Tô màu cú pháp thất bại:",
	[Key.autoSyntaxHighlightFailed]: "Tô màu cú pháp tự động cũng thất bại:",
	[Key.decryptionError]: "Đã xảy ra lỗi trong quá trình giải mã:",

	// Thẻ thời gian chỉnh sửa lần cuối
	[Key.lastModifiedPrefix]: "Thời gian kể từ lần chỉnh sửa cuối: ",
	[Key.lastModifiedOutdated]: "Một số thông tin có thể đã cũ",
	[Key.year]: "n",
	[Key.month]: "t",
	[Key.day]: "n",
	[Key.hour]: "g",
	[Key.minute]: "ph",
	[Key.second]: "gi",

	// Thống kê trang web
	[Key.siteStats]: "Thống kê trang web",
	[Key.siteStatsPostCount]: "Bài viết",
	[Key.siteStatsCategoryCount]: "Danh mục",
	[Key.siteStatsTagCount]: "Thẻ",
	[Key.siteStatsTotalWords]: "Tổng số từ",
	[Key.siteStatsRunningDays]: "Số ngày hoạt động",
	[Key.siteStatsLastUpdate]: "Hoạt động gần nhất",
	[Key.siteStatsDaysAgo]: "{days} ngày trước",
	[Key.siteStatsDays]: "{days} ngày",
	[Key.siteStatsCurrentDate]: "Ngày",
	[Key.siteStatsDateFormat]: "{year}/{month}/{day}",
	[Key.siteStatsCurrentTime]: "Giờ",
	[Key.siteStatsTimePeriodMorning]: "Buổi sáng",
	[Key.siteStatsTimePeriodNoon]: "Buổi trưa",
	[Key.siteStatsTimePeriodAfternoon]: "Buổi chiều",
	[Key.siteStatsTimePeriodEvening]: "Chạng vạng",
	[Key.siteStatsTimePeriodNight]: "Buổi tối",
	[Key.siteStatsAm]: "SA",
	[Key.siteStatsPm]: "CH",
	[Key.siteStatsSeason]: "Mùa",
	[Key.siteStatsSeasonSpring]: "Mùa xuân",
	[Key.siteStatsSeasonSummer]: "Mùa hè",
	[Key.siteStatsSeasonAutumn]: "Mùa thu",
	[Key.siteStatsSeasonWinter]: "Mùa đông",

	// Thành phần lịch
	[Key.calendarPrevMonth]: "Tháng trước",
	[Key.calendarNextMonth]: "Tháng sau",
	[Key.calendarBackToToday]: "Quay về hôm nay",
	[Key.calendarSunday]: "CN",
	[Key.calendarMonday]: "T2",
	[Key.calendarTuesday]: "T3",
	[Key.calendarWednesday]: "T4",
	[Key.calendarThursday]: "T5",
	[Key.calendarFriday]: "T6",
	[Key.calendarSaturday]: "T7",
	[Key.calendarJanuary]: "Thg1",
	[Key.calendarFebruary]: "Thg2",
	[Key.calendarMarch]: "Thg3",
	[Key.calendarApril]: "Thg4",
	[Key.calendarMay]: "Thg5",
	[Key.calendarJune]: "Thg6",
	[Key.calendarJuly]: "Thg7",
	[Key.calendarAugust]: "Thg8",
	[Key.calendarSeptember]: "Thg9",
	[Key.calendarOctober]: "Thg10",
	[Key.calendarNovember]: "Thg11",
	[Key.calendarDecember]: "Thg12",

	// Chia sẻ
	[Key.shareArticle]: "Chia sẻ",
	[Key.generatingPoster]: "Đang tạo poster...",
	[Key.copied]: "Đã sao chép",
	[Key.copyLink]: "Sao chép liên kết",
	[Key.savePoster]: "Lưu poster",
	[Key.scanToRead]: "Quét mã để đọc",
	[Key.shareOnSocial]: "Chia sẻ",
	[Key.shareOnSocialDescription]:
		"Nếu bài viết này hữu ích với bạn, hãy chia sẻ nó với người khác!",

	// Thống kê hồ sơ
	[Key.profileStatsLoading]: "Đang tải thống kê...",
	[Key.profileStatsPageViews]: "Lượt xem trang",
	[Key.profileStatsVisits]: "Lượt truy cập",
	[Key.profileStatsUnavailable]: "Không có thống kê",

	// Thống kê lượt xem
	[Key.pageViewsLoading]: "Đang tải thống kê...",
	[Key.pageViewsUnavailable]: "Không có thống kê",

	// Bố cục danh sách bài viết
	[Key.postListLayout]: "Bố cục danh sách bài viết",
	[Key.listMode]: "Danh sách",
	[Key.gridMode]: "Lưới",

	// Cảnh báo liên kết ngoài
	[Key.leaveSite]: "Rời khỏi trang này",
	[Key.goToExternalLink]: "Bạn sắp truy cập liên kết bên ngoài:",
	[Key.warningText]: "Vui lòng chú ý bảo mật tài khoản và tài sản của bạn",
	[Key.confirmText]: "Tiếp tục truy cập",
	[Key.cancelText]: "Hủy bỏ",

	// Thêm bạn bè trên mạng xã hội
	[Key.copyAccount]: "Sao chép tài khoản",
	[Key.copyAccountSuccess]: "Đã sao chép vào clipboard",
	[Key.openAppAdd]: "Mở trong ứng dụng",

	// Thành phần thời tiết
	[Key.weather]: "Thời tiết",
	[Key.weatherNoApiKey]:
		"Vui lòng thêm khóa WeatherAPI trong src/config/user.ts",
	[Key.weatherLocationDisabled]:
		"Dịch vụ định vị thời tiết đã bị tắt do từ chối thỏa thuận quyền riêng tư",
	[Key.weatherWaitingConsent]: "Đang chờ cấp quyền định vị thời tiết...",
	[Key.weatherDefaultLocationHint]:
		"Đã từ chối đồng ý quyền riêng tư, đang dùng vị trí mặc định",
	[Key.weatherDefaultLocationConfirm]: "OK",
	[Key.weatherLoading]: "Đang tải thời tiết...",
	[Key.weatherLoadFailed]: "Tải thất bại",
	[Key.weatherRetry]: "Thử lại",
	[Key.weatherSearchPlaceholder]: "Tìm kiếm thành phố...",
	[Key.weatherHumidity]: "Độ ẩm",
	[Key.weatherWind]: "Gió",
	[Key.weatherFeelsLike]: "Nhiệt độ cảm nhận",
	[Key.weatherUV]: "Chỉ số UV",
	[Key.weatherVisibility]: "Tầm nhìn",
	[Key.weatherForecast]: "Dự báo thời tiết",
	[Key.weatherToday]: "Hôm nay",
	[Key.weatherHigh]: "Cao",
	[Key.weatherLow]: "Thấp",
	[Key.weatherCelsius]: "°C",
	[Key.weatherFahrenheit]: "°F",
	[Key.weatherKmh]: "km/h",
	[Key.weatherMph]: "mph",
	[Key.weatherChangeLocation]: "Thay đổi vị trí",
	[Key.weatherDetectLocation]: "Phát hiện vị trí",

	// Tình trạng thời tiết
	[Key.weatherCondSunny]: "Nắng",
	[Key.weatherCondPartlyCloudy]: "Ít mây",
	[Key.weatherCondCloudy]: "Nhiều mây",
	[Key.weatherCondFog]: "Sương mù",
	[Key.weatherCondDrizzle]: "Mưa phun",
	[Key.weatherCondRain]: "Mưa",
	[Key.weatherCondHeavyRain]: "Mưa to",
	[Key.weatherCondSnow]: "Tuyết",
	[Key.weatherCondHeavySnow]: "Tuyết lớn",
	[Key.weatherCondSleet]: "Mưa tuyết",
	[Key.weatherCondThunderstorm]: "Dông",
	[Key.weatherCondHail]: "Mưa đá",
	[Key.weatherCondDust]: "Bụi",

	// Đồng ý Cookie
	[Key.cookieConsentTitle]: "Chúng Tôi Tôn Trọng Quyền Riêng Tư Của Bạn",
	[Key.cookieConsentDescription]:
		"BrightMoon sử dụng cookie để lưu trữ và truy cập các mã định danh thiết bị và dữ liệu khác nhằm cung cấp, duy trì và cải thiện dịch vụ và quảng cáo của chúng tôi. Bạn có thể chọn «Chấp nhận» để đồng ý với các mục đích này, hoặc nhấp «Từ chối tất cả» để từ chối cookie không cần thiết.",
	[Key.cookieConsentIpInfo]: "Đang phát hiện vị trí của bạn...",
	[Key.cookieConsentIpTimeout]:
		"Phát hiện vị trí hết thời gian, vui lòng thử lại sau",
	[Key.cookieConsentAccept]: "Chấp nhận",
	[Key.cookieConsentReject]: "Từ chối tất cả",

	// Hệ thống bình luận Twikoo
	[Key.twikooInitializing]: "Đang khởi tạo hệ thống bình luận Twikoo...",
	[Key.twikooNotConfigured]: "Hệ thống bình luận Twikoo chưa được cấu hình",
	[Key.twikooConfigHint]:
		"Vui lòng cấu hình hệ thống bình luận Twikoo trong src/config/user.ts",
	[Key.twikooPrivacyRejected]:
		"Hệ thống bình luận Twikoo đã bị tắt do từ chối thỏa thuận quyền riêng tư",

	// Kiểm tra phiên bản
	[Key.versionCheck]: "Kiểm tra cập nhật",
	[Key.versionLatest]: "Đã là phiên bản mới nhất",
	[Key.versionNewVersion]: "Có phiên bản mới",
	[Key.versionChecking]: "Đang kiểm tra...",
	[Key.versionCheckError]: "Kiểm tra thất bại",
	[Key.versionPreRelease]: "Beta",
	[Key.versionCheckFailedTitle]: "Kiểm tra cập nhật thất bại",
	[Key.versionCheckFailedDesc]:
		"Không thể kiểm tra cập nhật, thường do giới hạn tần suất API kho lưu trữ từ xa hoặc chưa điền địa chỉ API kho lưu trữ từ xa. Vui lòng thử lại sau",
	[Key.versionCheckSuccessTitle]: "Kiểm tra thành công",
	[Key.versionCheckSuccessDesc]:
		"Không tìm thấy phiên bản mới. Bạn đang sử dụng phiên bản mới nhất.",
	[Key.versionDownload]: "Tải xuống phiên bản mới nhất",
	[Key.versionUpdateWarning]:
		"Khuyên dùng công cụ nâng cấp framework blog BrightMoon. Vui lòng sao lưu dữ liệu trước khi nâng cấp",

	// Điều hướng Breadcrumb
	[Key.suggestion]: "Có thể bạn muốn truy cập",
	[Key.navBack]: "Quay lại trang trước",
	[Key.navForward]: "Đến trang tiếp theo",

	// Nút "Về đầu trang"
	[Key.backToTop]: "Về đầu trang",
};
