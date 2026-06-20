import Key from "../i18nKey";
import type { Translation } from "../translation";

export const ar: Translation = {
	[Key.home]: "الرئيسية",
	[Key.about]: "حول",
	[Key.archive]: "الأرشيف",
	[Key.search]: "بحث",
	[Key.feedback]: "ملاحظات",
	[Key.other]: "أخرى",

	// Translation panel title
	[Key.translateHeader]: "اختر اللغة",

	// Navigation bar titles
	[Key.navLinks]: "روابط",
	[Key.navMy]: "خاصتي",
	[Key.navAbout]: "حول",
	[Key.sponsors]: "الداعمون",
	[Key.navOthers]: "أخرى",

	[Key.tags]: "الوسوم",
	[Key.categories]: "التصنيفات",
	[Key.recentPosts]: "أحدث المشاركات",

	// Table of Contents
	[Key.tocTitle]: "جدول المحتويات",

	// Announcement
	[Key.announcement]: "إعلان",
	[Key.announcementClose]: "إغلاق",

	[Key.comments]: "التعليقات",
	[Key.friends]: "الأصدقاء",
	[Key.friendsSubtitle]: "اكتشف المزيد من المواقع الرائعة",
	[Key.friendsSearchPlaceholder]: "ابحث عن اسم الصديق أو وصفه...",
	[Key.friendsFilterAll]: "الكل",
	[Key.friendsNoResults]: "لم يتم العثور على أصدقاء مطابقين",
	[Key.friendsVisit]: "زيارة",
	[Key.friendsCopyLink]: "نسخ الرابط",
	[Key.friendsCopySuccess]: "تم النسخ",
	[Key.friendsTags]: "الوسوم",
	[Key.untitled]: "بدون عنوان",
	[Key.uncategorized]: "غير مصنف",
	[Key.noTags]: "لا توجد وسوم",

	[Key.wordCount]: "كلمة",
	[Key.wordsCount]: "كلمات",
	[Key.minuteCount]: "دقيقة",
	[Key.minutesCount]: "دقائق",
	[Key.postCount]: "منشور",
	[Key.postsCount]: "منشورات",

	[Key.appearance]: "المظهر",
	[Key.themeSwitch]: "تبديل الثيم",
	[Key.themeColor]: "لون المظهر",
	[Key.sakuraEffect]: "تأثير الساكورا",
	[Key.wavesEffect]: "تأثير الأمواج",
	[Key.wavesPerformanceMode]: "وضع الأداء",

	[Key.lightMode]: "فاتح",
	[Key.darkMode]: "داكن",
	[Key.systemMode]: "النظام",

	[Key.more]: "المزيد",

	[Key.author]: "المؤلف",
	[Key.publishedAt]: "نُشر في",
	[Key.license]: "الترخيص",
	[Key.anime]: "الأنمي",
	[Key.diary]: "المذكرات",

	// Anime Page
	[Key.animeTitle]: "قائمة الأنمي الخاصة بي",
	[Key.animeSubtitle]: "سجل رحلة الأنمي الخاصة بي",
	[Key.animeStatusWatching]: "يُشاهد",
	[Key.animeStatusCompleted]: "مكتمل",
	[Key.animeStatusPlanned]: "مخطط له",
	[Key.animeStatusOnHold]: "معلق",
	[Key.animeStatusDropped]: "تم التوقف",
	[Key.animeFilterAll]: "الكل",
	[Key.animeYear]: "السنة",
	[Key.animeStudio]: "الاستوديو",
	[Key.animeEmpty]: "لا توجد بيانات أنمي متاحة",
	[Key.animeEmptyBangumi]: "يرجى التحقق من إعدادات Bangumi أو الاتصال بالشبكة",
	[Key.animeEmptyBilibili]:
		"بيانات Bilibili فارغة. يرجى تشغيل `pnpm run update-bilibili` للحصول على البيانات",
	[Key.animeSetBangumiUserId]:
		"يرجى تعيين معرف مستخدم Bangumi الخاص بك في ملف src/config.ts",
	[Key.animeSetBilibiliVmId]:
		"يرجى تعيين معرف vm الخاص بـ Bilibili في ملف src/config.ts",
	[Key.animeEmptyLocal]: "يرجى إضافة معلومات الأنمي في ملف src/data/anime.ts",

	// Diary Page
	[Key.diarySubtitle]: "شارك الحياة، في أي وقت وفي أي مكان",
	[Key.diaryCount]: "مدخلة في المذكرات",
	[Key.diaryReply]: "رد",
	[Key.diaryTips]: "يتم عرض أحدث 30 مدخلة فقط من المذكرات",
	[Key.diaryMinutesAgo]: "دقيقة مضت",
	[Key.diaryHoursAgo]: "ساعة مضت",
	[Key.diaryDaysAgo]: "يوم مضى",

	// 404 Page
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "الصفحة غير موجودة",
	[Key.notFoundDescription]:
		"عذرًا، الصفحة التي قمت بزيارتها غير موجودة أو تم نقلها.",
	[Key.backToHome]: "العودة إلى الرئيسية",

	// Music Player
	[Key.musicPlayer]: "مشغل الموسيقى",
	[Key.musicPlayerShow]: "إظهار مشغل الموسيقى",
	[Key.musicPlayerHide]: "إخفاء مشغل الموسيقى",
	[Key.musicPlayerExpand]: "توسيع مشغل الموسيقى",
	[Key.musicPlayerCollapse]: "طي مشغل الموسيقى",
	[Key.musicPlayerPause]: "إيقاف مؤقت",
	[Key.musicPlayerPlay]: "تشغيل",
	[Key.musicPlayerPrevious]: "السابق",
	[Key.musicPlayerNext]: "التالي",
	[Key.musicPlayerShuffle]: "خلط",
	[Key.musicPlayerRepeat]: "تكرار الكل",
	[Key.musicPlayerRepeatOne]: "تكرار واحد",
	[Key.musicPlayerVolume]: "التحكم في مستوى الصوت",
	[Key.musicPlayerMute]: "كتم الصوت",
	[Key.musicPlayerUnmute]: "إلغاء كتم الصوت",
	[Key.musicPlayerProgress]: "تقدم التشغيل",
	[Key.musicPlayerCover]: "الغلاف",
	[Key.musicPlayerPlaylist]: "قائمة التشغيل",
	[Key.musicPlayerLoading]: "جاري التحميل...",
	[Key.musicPlayerErrorPlaylist]: "فشل في جلب قائمة التشغيل",
	[Key.musicPlayerErrorSong]:
		"فشل في تحميل الأغنية الحالية، جاري تجربة التالية",
	[Key.musicPlayerErrorEmpty]: "لا توجد أغانٍ متاحة في قائمة التشغيل",
	[Key.unknownSong]: "أغنية غير معروفة",
	[Key.unknownArtist]: "فنان غير معروف",

	// Albums Page
	[Key.albums]: "الألبومات",
	[Key.albumsSubtitle]: "سجل اللحظات الجميلة في الحياة",
	[Key.albumsEmpty]: "لا يوجد محتوى",
	[Key.albumsEmptyDesc]:
		"لم يتم إنشاء أي ألبومات بعد. أضف بعض الذكريات الجميلة!",
	[Key.albumsBackToList]: "العودة إلى الألبومات",
	[Key.albumsPhotoCount]: "صورة",
	[Key.albumsPhotosCount]: "صور",
	[Key.hiddenAlbum]: "الألبوم المخفي",
	[Key.hideAlbumTip]:
		"تم ضبط هذا الألبوم على وضع المخفي، ولن يظهر في قائمة الألبومات، ولكن لا يزال من الممكن الوصول إليه عبر رابط مباشر",

	// Devices Page
	[Key.devices]: "أجهزتي",
	[Key.devicesSubtitle]: "هذه هي الأجهزة التي أستخدمها في حياتي اليومية",
	[Key.devicesViewDetails]: "عرض التفاصيل",

	// Projects Page
	[Key.projects]: "المشاريع",
	[Key.projectsSubtitle]: "محفظة مشاريعي التطويرية",
	[Key.projectsAll]: "الكل",
	[Key.projectsWeb]: "تطبيقات الويب",
	[Key.projectsMobile]: "تطبيقات الهاتف المحمول",
	[Key.projectsDesktop]: "تطبيقات سطح المكتب",
	[Key.projectsOther]: "أخرى",
	[Key.projectTechStack]: "مجموعة التقنيات",
	[Key.projectLiveDemo]: "عرض مباشر",
	[Key.projectSourceCode]: "الكود المصدري",
	[Key.projectDescription]: "وصف المشروع",
	[Key.projectStatus]: "الحالة",
	[Key.projectStatusCompleted]: "مكتمل",
	[Key.projectStatusInProgress]: "قيد التطوير",
	[Key.projectStatusPlanned]: "مخطط له",
	[Key.projectsTotal]: "إجمالي المشاريع",
	[Key.projectsCompleted]: "مكتمل",
	[Key.projectsInProgress]: "قيد التطوير",
	[Key.projectsTechStack]: "إحصائيات مجموعة التقنيات",
	[Key.projectsFeatured]: "المشاريع المميزة",
	[Key.projectsPlanned]: "مخطط له",
	[Key.projectsDemo]: "عرض مباشر",
	[Key.projectsSource]: "الكود المصدري",
	[Key.projectsVisit]: "زيارة المشروع",
	[Key.projectsGitHub]: "GitHub",

	// RSS Page
	[Key.rss]: "خلاصة RSS",
	[Key.rssDescription]: "اشترك للحصول على أحدث التحديثات",
	[Key.rssSubtitle]: "اشترك عبر RSS للحصول على أحدث المقالات والتحديثات فورًا",
	[Key.rssLink]: "رابط RSS",
	[Key.rssCopyToReader]: "انسخ الرابط إلى قارئ RSS الخاص بك",
	[Key.rssCopyLink]: "نسخ",
	[Key.rssLatestPosts]: "أحدث المشاركات",
	[Key.rssWhatIsRSS]: "ما هو RSS؟",
	[Key.rssWhatIsRSSDescription]:
		"RSS (Really Simple Syndication) هو تنسيق قياسي لنشر المحتوى الذي يتم تحديثه بشكل متكرر. باستخدام RSS، يمكنك:",
	[Key.rssBenefit1]:
		"الحصول على أحدث محتوى الموقع في الوقت المناسب دون الحاجة للزيارة اليدوية",
	[Key.rssBenefit2]: "إدارة الاشتراكات لمواقع متعددة في مكان واحد",
	[Key.rssBenefit3]: "تجنب فقدان التحديثات والمقالات الهامة",
	[Key.rssBenefit4]: "الاستمتاع بتجربة قراءة نظيفة وخالية من الإعلانات",
	[Key.rssHowToUse]:
		"يُوصى باستخدام Feedly أو Inoreader أو أي قارئ RSS آخر للاشتراك في هذا الموقع.",
	[Key.rssCopied]: "تم نسخ رابط RSS إلى الحافظة!",
	[Key.rssCopyFailed]: "فشل النسخ، يرجى نسخ الرابط يدويًا",

	// Atom Page
	[Key.atom]: "خلاصة Atom",
	[Key.atomDescription]: "اشترك للحصول على أحدث التحديثات",
	[Key.atomSubtitle]: "اشترك عبر Atom للحصول على أحدث المقالات والتحديثات فورًا",
	[Key.atomLink]: "رابط Atom",
	[Key.atomCopyToReader]: "انسخ الرابط إلى قارئ Atom الخاص بك",
	[Key.atomCopyLink]: "نسخ",
	[Key.atomLatestPosts]: "أحدث المشاركات",
	[Key.atomWhatIsAtom]: "ما هو Atom؟",
	[Key.atomWhatIsAtomDescription]:
		"Atom (Atom Syndication Format) هو معيار قائم على XML لوصف الخلاصات وعناصرها. باستخدام Atom، يمكنك:",
	[Key.atomBenefit1]:
		"الحصول على أحدث محتوى الموقع في الوقت المناسب دون الحاجة للزيارة اليدوية",
	[Key.atomBenefit2]: "إدارة الاشتراكات لمواقع متعددة في مكان واحد",
	[Key.atomBenefit3]: "تجنب فقدان التحديثات والمقالات الهامة",
	[Key.atomBenefit4]: "الاستمتاع بتجربة قراءة نظيفة وخالية من الإعلانات",
	[Key.atomHowToUse]:
		"يُوصى باستخدام Feedly أو Inoreader أو أي قارئ Atom آخر للاشتراك في هذا الموقع.",
	[Key.atomCopied]: "تم نسخ رابط Atom إلى الحافظة!",
	[Key.atomCopyFailed]: "فشل النسخ، يرجى نسخ الرابط يدويًا",

	// Wallpaper mode
	[Key.wallpaperMode]: "وضع الخلفية",
	[Key.wallpaperBanner]: "وضع الشريط",
	[Key.wallpaperFullscreen]: "وضع ملء الشاشة",
	[Key.wallpaperNone]: "إخفاء الخلفية",
	[Key.wallpaperPosition]: "موضع الخلفية",
	[Key.wallpaperPositionTop]: "أعلى",
	[Key.wallpaperPositionCenter]: "وسط",
	[Key.wallpaperPositionBottom]: "أسفل",
	[Key.wallpaperOpacity]: "شفافية الخلفية",
	[Key.wallpaperBlur]: "تمويه الخلفية",
	[Key.cardOpacity]: "عتامة البطاقات",

	// Navbar transparent mode
	[Key.navbarTransparentMode]: "نمط شريط التنقل",
	[Key.navbarTransparentSemi]: "مُجَمَّد",
	[Key.navbarTransparentFull]: "شفاف",
	[Key.navbarTransparentSemifull]: "ديناميكي",

	// Skills Page
	[Key.skills]: "المهارات",
	[Key.skillsSubtitle]: "مهاراتي التقنية وخبراتي",
	[Key.skillsFrontend]: "تطوير الواجهة الأمامية",
	[Key.skillsBackend]: "تطوير الواجهة الخلفية",
	[Key.skillsDatabase]: "قاعدة البيانات",
	[Key.skillsTools]: "أدوات التطوير",
	[Key.skillsOther]: "مهارات أخرى",
	[Key.skillLevel]: "الكفاءة",
	[Key.skillLevelBeginner]: "مبتدئ",
	[Key.skillLevelIntermediate]: "متوسط",
	[Key.skillLevelAdvanced]: "متقدم",
	[Key.skillLevelExpert]: "خبير",
	[Key.skillExperience]: "الخبرة",
	[Key.skillYears]: "سنوات",
	[Key.skillMonths]: "أشهر",
	[Key.skillsTotal]: "إجمالي المهارات",
	[Key.skillsExpert]: "مستوى الخبير",
	[Key.skillsAdvanced]: "متقدم",
	[Key.skillsIntermediate]: "متوسط",
	[Key.skillsBeginner]: "مبتدئ",
	[Key.skillsAdvancedTitle]: "المهارات الاحترافية",
	[Key.skillsProjects]: "المشاريع ذات الصلة",
	[Key.skillsDistribution]: "توزيع المهارات",
	[Key.skillsByLevel]: "حسب المستوى",
	[Key.skillsByCategory]: "حسب الفئة",
	[Key.noData]: "لا توجد بيانات",

	// Timeline Page
	[Key.timeline]: "الخط الزمني",
	[Key.timelineSubtitle]: "رحلتي في النمو والمعالم الهامة",
	[Key.timelineEducation]: "التعليم",
	[Key.timelineWork]: "الخبرات العملية",
	[Key.timelineProject]: "الخبرات في المشاريع",
	[Key.timelineAchievement]: "الإنجازات",
	[Key.timelinePresent]: "الحاضر",
	[Key.timelineLocation]: "الموقع",
	[Key.timelineDescription]: "وصف مفصل",
	[Key.timelineMonths]: "أشهر",
	[Key.timelineYears]: "سنوات",
	[Key.timelineTotal]: "الإجمالي",
	[Key.timelineProjects]: "المشاريع",
	[Key.timelineExperience]: "الخبرات العملية",
	[Key.timelineCurrent]: "الوضع الحالي",
	[Key.timelineHistory]: "التاريخ",
	[Key.timelineAchievements]: "الإنجازات",
	[Key.timelineStartDate]: "تاريخ البدء",
	[Key.timelineDuration]: "المدة",

	// Feedback Page - Contact the webmaster Module
	[Key.contactMe]: "اتصل بمدير الموقع",
	[Key.contactEmail]: "اتصل بمدير الموقع عبر البريد الإلكتروني",
	[Key.contactSocialFriends]:
		"تواصل مع مدير الموقع عن طريق إضافته كصديق على وسائل التواصل الاجتماعي",
	[Key.addFriends]: "أضف صديقًا الآن",

	// Sponsorship Page
	[Key.sponsorsNotice1]:
		"إذا وجدت محتوى الموقع مفيدًا، يرجى دعم عملي من خلال الطرق التالية للمساعدة في إنشاء محتوى أفضل. سيتم استخدام جميع التبرعات لصيانة الموقع وتكاليف الخادم وإنشاء المحتوى.",
	[Key.sponsorsNotice2]: "شكرًا لدعمكم لتطوير محتوى مدونة BrightMoon!",
	[Key.wechatPay]: "WeChat",
	[Key.aliPay]: "Alipay",
	[Key.scanPayQRcode]: "امسح للدفع",
	[Key.sponsorsPartner]: "شركاء الدعم",
	[Key.otherSupportOptions]: "طرق دعم أخرى",
	[Key.shareBlog]: "شارك مدونتي مع المزيد من الأصدقاء",
	[Key.leaveComment]: "اترك أفكارك في قسم التعليقات أسفل المقال",
	[Key.subscribeToArticles]: "اشترك في RSS و Atom للحصول على أحدث المقالات",

	// Password Protection
	[Key.passwordProtected]: "محمي بكلمة مرور",
	[Key.passwordProtectedTitle]: "هذا المحتوى محمي بكلمة مرور",
	[Key.passwordProtectedDescription]:
		"يرجى إدخال كلمة المرور لعرض المحتوى المحمي",
	[Key.passwordPlaceholder]: "أدخل كلمة المرور",
	[Key.passwordUnlock]: "فتح",
	[Key.passwordUnlocking]: "جاري الفتح...",
	[Key.passwordIncorrect]: "كلمة مرور غير صحيحة، يرجى المحاولة مرة أخرى",
	[Key.passwordDecryptError]: "فشل فك التشفير، يرجى التحقق من صحة كلمة المرور",
	[Key.passwordRequired]: "يرجى إدخال كلمة المرور",
	[Key.passwordVerifying]: "جاري التحقق...",
	[Key.passwordDecryptFailed]: "فشل فك التشفير، يرجى التحقق من كلمة المرور",
	[Key.passwordDecryptRetry]: "فشل فك التشفير، يرجى المحاولة مرة أخرى",
	[Key.passwordUnlockButton]: "فتح",
	[Key.copyFailed]: "فشل النسخ:",
	[Key.syntaxHighlightFailed]: "فشل تمييز بناء الجملة:",
	[Key.autoSyntaxHighlightFailed]: "فشل تمييز بناء الجملة التلقائي أيضًا:",
	[Key.decryptionError]: "حدث خطأ أثناء فك التشفير:",

	// Last Modified Time Card
	[Key.lastModifiedPrefix]: "الوقت منذ آخر تعديل: ",
	[Key.lastModifiedOutdated]: "قد تكون بعض المعلومات قديمة",
	[Key.year]: "س",
	[Key.month]: "ش",
	[Key.day]: "ي",
	[Key.hour]: "س",
	[Key.minute]: "د",
	[Key.second]: "ث",

	// Site Stats
	[Key.siteStats]: "إحصائيات الموقع",
	[Key.siteStatsPostCount]: "المقالات",
	[Key.siteStatsCategoryCount]: "التصنيفات",
	[Key.siteStatsTagCount]: "الوسوم",
	[Key.siteStatsTotalWords]: "إجمالي الكلمات",
	[Key.siteStatsRunningDays]: "أيام التشغيل",
	[Key.siteStatsLastUpdate]: "آخر نشاط",
	[Key.siteStatsDaysAgo]: "منذ {days} يوم",
	[Key.siteStatsDays]: "{days} يوم",
	[Key.siteStatsCurrentDate]: "التاريخ",
	[Key.siteStatsDateFormat]: "{month}/{day}/{year}",
	[Key.siteStatsCurrentTime]: "الوقت",
	[Key.siteStatsTimePeriodMorning]: "صباحاً",
	[Key.siteStatsTimePeriodNoon]: "ظهراً",
	[Key.siteStatsTimePeriodAfternoon]: "بعد الظهر",
	[Key.siteStatsTimePeriodEvening]: "مساءً",
	[Key.siteStatsTimePeriodNight]: "ليلاً",
	[Key.siteStatsAm]: "ص",
	[Key.siteStatsPm]: "م",
	[Key.siteStatsSeason]: "الموسم",
	[Key.siteStatsSeasonSpring]: "الربيع",
	[Key.siteStatsSeasonSummer]: "الصيف",
	[Key.siteStatsSeasonAutumn]: "الخريف",
	[Key.siteStatsSeasonWinter]: "الشتاء",

	// Calendar Component
	[Key.calendarSunday]: "أحد",
	[Key.calendarMonday]: "إثنين",
	[Key.calendarTuesday]: "ثلاثاء",
	[Key.calendarWednesday]: "أربعاء",
	[Key.calendarThursday]: "خميس",
	[Key.calendarFriday]: "جمعة",
	[Key.calendarSaturday]: "سبت",
	[Key.calendarJanuary]: "يناير",
	[Key.calendarFebruary]: "فبراير",
	[Key.calendarMarch]: "مارس",
	[Key.calendarApril]: "أبريل",
	[Key.calendarMay]: "مايو",
	[Key.calendarJune]: "يونيو",
	[Key.calendarJuly]: "يوليو",
	[Key.calendarAugust]: "أغسطس",
	[Key.calendarSeptember]: "سبتمبر",
	[Key.calendarOctober]: "أكتوبر",
	[Key.calendarNovember]: "نوفمبر",
	[Key.calendarDecember]: "ديسمبر",

	// Share Functionality
	[Key.shareArticle]: "مشاركة",
	[Key.generatingPoster]: "جاري إنشاء الملصق...",
	[Key.copied]: "تم النسخ",
	[Key.copyLink]: "نسخ الرابط",
	[Key.savePoster]: "حفظ الملصق",
	[Key.scanToRead]: "امسح للقراءة",
	[Key.shareOnSocial]: "مشاركة",
	[Key.shareOnSocialDescription]:
		"إذا ساعدك هذا المقال، يرجى مشاركته مع الآخرين!",

	// Profile Stats
	[Key.profileStatsLoading]: "جاري تحميل الإحصائيات...",
	[Key.profileStatsPageViews]: "مشاهدات الصفحة",
	[Key.profileStatsVisits]: "الزيارات",
	[Key.profileStatsUnavailable]: "الإحصائيات غير متاحة",

	// Page Views Stats
	[Key.pageViewsLoading]: "جاري تحميل الإحصائيات...",
	[Key.pageViewsUnavailable]: "الإحصائيات غير متاحة",

	// تخطيط قائمة المقالات
	[Key.postListLayout]: "تخطيط قائمة المقالات",
	[Key.listMode]: "قائمة",
	[Key.gridMode]: "شبكة",

	// External Link Warning
	[Key.leaveSite]: "مغادرة هذا الموقع",
	[Key.goToExternalLink]: "أنت على وشك زيارة رابط خارجي:",
	[Key.warningText]: "يرجى الانتباه إلى أمان حسابك وأصولك",
	[Key.confirmText]: "المتابعة للزيارة",
	[Key.cancelText]: "إلغاء",

	// إضافة أصدقاء على وسائل التواصل الاجتماعي
	[Key.contactMethod1]: "Wechat",
	[Key.contactMethod2]: "QQ",
	[Key.contactMethod3]: "Telegram",
	[Key.scanContact1]: "امسح رمز QR لإضافة صديق على WeChat",
	[Key.scanContact2]: "امسح رمز QR لإضافة صديق على QQ",
	[Key.scanContact3]: "امسح رمز QR لإضافة صديق على Telegram",

	// مكون الطقس
	[Key.weather]: "الطقس",
	[Key.weatherNoApiKey]: "يرجى إضافة مفتاح WeatherAPI في src/config.ts",
	[Key.weatherLocationDisabled]:
		"تتم تعطيل خدمة تحديد المواقع للطقس بسبب رفض اتفاقية الخصوصية",
	[Key.weatherWaitingConsent]: "ففي انتظار التفويض لتحديد مواقع الطقس...",
	[Key.weatherLoading]: "جاري تحميل الطقس...",
	[Key.weatherLoadFailed]: "فشل التحميل",
	[Key.weatherRetry]: "إعادة المحاولة",
	[Key.weatherSearchPlaceholder]: "البحث عن مدينة...",
	[Key.weatherHumidity]: "الرطوبة",
	[Key.weatherWind]: "الرياح",
	[Key.weatherFeelsLike]: "يبدو وكأنه",
	[Key.weatherUV]: "مؤشر الأشعة فوق البنفسجية",
	[Key.weatherVisibility]: "الرؤية",
	[Key.weatherForecast]: "توقعات 7 أيام",
	[Key.weatherToday]: "اليوم",
	[Key.weatherHigh]: "عالي",
	[Key.weatherLow]: "منخفض",
	[Key.weatherCelsius]: "°م",
	[Key.weatherFahrenheit]: "°ف",
	[Key.weatherKmh]: "كم/س",
	[Key.weatherMph]: "ميل/س",
	[Key.weatherChangeLocation]: "تغيير الموقع",
	[Key.weatherDetectLocation]: "اكتشاف الموقع",

	// حالات الطقس
	[Key.weatherCondSunny]: "مشمس",
	[Key.weatherCondPartlyCloudy]: "غائم جزئياً",
	[Key.weatherCondCloudy]: "غائم",
	[Key.weatherCondFog]: "ضباب",
	[Key.weatherCondDrizzle]: "رذاذ",
	[Key.weatherCondRain]: "مطر",
	[Key.weatherCondHeavyRain]: "مطر غزير",
	[Key.weatherCondSnow]: "ثلج",
	[Key.weatherCondHeavySnow]: "ثلج كثيف",
	[Key.weatherCondSleet]: "مطر جليدي",
	[Key.weatherCondThunderstorm]: "عاصفة رعدية",
	[Key.weatherCondHail]: "بَرَد",
	[Key.weatherCondDust]: "غبار",

	// موافقة ملفات تعريف الارتباط
	[Key.cookieConsentTitle]: "نحن نقدر خصوصيتك",
	[Key.cookieConsentDescription]:
		"يستخدم BrightMoon ملفات تعريف الارتباط لتخزين والوصول إلى معرفات الأجهزة والبيانات الأخرى لتقديم وصيانة وتحسين خدماتنا وإعلاناتنا. يمكنك اختيار «قبول» للموافقة على هذه الاستخدامات، أو النقر على «رفض الكل» لرفض ملفات تعريف الارتباط غير الأساسية.",
	[Key.cookieConsentIpInfo]: "جارٍ تحديد موقعك...",
	[Key.cookieConsentAccept]: "قبول",
	[Key.cookieConsentReject]: "رفض الكل",

	// نظام التعليقات Twikoo
	[Key.twikooInitializing]: "جارٍ تهيئة نظام تعليقات Twikoo...",
	[Key.twikooNotConfigured]: "نظام التعليقات Twikoo لم يتم تكوينه بعد",
	[Key.twikooConfigHint]: "يرجى تكوين نظام التعليقات Twikoo في src/config.ts",
	[Key.twikooPrivacyRejected]:
		"تمم تعطيل نظام تعليقات Twikoo بسبب رفض اتفاقية الخصوصية",
};
