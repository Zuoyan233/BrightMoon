import Key from "../i18nKey";
import type { Translation } from "../translation";

export const tr: Translation = {
	[Key.home]: "Ana Sayfa",
	[Key.about]: "Hakkımda",
	[Key.archive]: "Arşiv",
	[Key.search]: "Ara",
	[Key.feedback]: "Geri Bildirim",
	[Key.other]: "Diğer",

	// Çeviri paneli başlığı
	[Key.translateHeader]: "Dil Seçin",

	// Navigasyon çubuğu başlıkları
	[Key.navLinks]: "Bağlantılar",
	[Key.navMy]: "Benim",
	[Key.navAbout]: "Hakkımda",
	[Key.sponsors]: "Sponsorlar",
	[Key.navOthers]: "Diğerleri",

	[Key.tags]: "Etiketler",
	[Key.categories]: "Kategoriler",
	[Key.recentPosts]: "Son Gönderiler",

	// İçindekiler
	[Key.tocTitle]: "İçindekiler",

	// Duyuru
	[Key.announcement]: "Duyuru",
	[Key.announcementClose]: "Kapat",

	[Key.comments]: "Yorumlar",
	[Key.friends]: "Arkadaşlar",
	[Key.friendsSubtitle]: "Daha fazla harika web sitesi keşfedin",
	[Key.friendsSearchPlaceholder]: "Arkadaşın adını veya açıklamasını ara...",
	[Key.friendsFilterAll]: "Tümü",
	[Key.friendsNoResults]: "Eşleşen arkadaş bulunamadı",
	[Key.friendsVisit]: "Ziyaret Et",
	[Key.friendsCopyLink]: "Bağlantıyı Kopyala",
	[Key.friendsCopySuccess]: "Kopyalandı",
	[Key.friendsTags]: "Etiketler",
	[Key.untitled]: "Başlıksız",
	[Key.uncategorized]: "Kategorisiz",
	[Key.noTags]: "Etiket Yok",

	[Key.wordCount]: "kelime",
	[Key.wordsCount]: "kelime",
	[Key.minuteCount]: "dakika",
	[Key.minutesCount]: "dakika",
	[Key.postCount]: "gönderi",
	[Key.postsCount]: "gönderi",

	[Key.appearance]: "Görünüm",
	[Key.themeSwitch]: "Tema Değiştir",
	[Key.themeColor]: "Tema Rengi",
	[Key.sakuraEffect]: "Sakura Efekti",
	[Key.wavesEffect]: "Dalga Efekti",
	[Key.wavesPerformanceMode]: "Performans Modu",

	[Key.lightMode]: "Açık",
	[Key.darkMode]: "Koyu",
	[Key.systemMode]: "Sistem",

	[Key.more]: "Daha Fazla",

	[Key.author]: "Yazar",
	[Key.publishedAt]: "Yayınlanma Tarihi",
	[Key.license]: "Lisans",
	[Key.anime]: "Anime",
	[Key.diary]: "Günlük",

	// Anime Sayfası
	[Key.animeTitle]: "Anime Listem",
	[Key.animeSubtitle]: "Anime yolculuğumu kaydet",
	[Key.animeStatusWatching]: "İzliyorum",
	[Key.animeStatusCompleted]: "Tamamlandı",
	[Key.animeStatusPlanned]: "Planlanan",
	[Key.animeStatusOnHold]: "Beklemede",
	[Key.animeStatusDropped]: "Bırakıldı",
	[Key.animeFilterAll]: "Tümü",
	[Key.animeYear]: "Yıl",
	[Key.animeStudio]: "Stüdyo",
	[Key.animeEmpty]: "Anime verisi mevcut değil",
	[Key.animeEmptyBangumi]:
		"Lütfen Bangumi yapılandırmasını veya ağ bağlantısını kontrol edin",
	[Key.animeEmptyBilibili]:
		"Bilibili verisi boş. Veri almak için lütfen `pnpm run update-bilibili` komutunu çalıştırın",
	[Key.animeSetBangumiUserId]:
		"Lütfen src/config/user.ts dosyasında Bangumi kullanıcı kimliğinizi ayarlayın",
	[Key.animeSetBilibiliVmId]:
		"Lütfen src/config/user.ts dosyasında Bilibili vm kimliğinizi ayarlayın",
	[Key.animeEmptyLocal]:
		"Lütfen src/data/anime.ts dosyasına anime bilgisi ekleyin",

	// Günlük Sayfası
	[Key.diarySubtitle]: "Hayatı paylaş, her zaman, her yerde",
	[Key.diaryCount]: "günlük kaydı",
	[Key.diaryReply]: "Cevapla",
	[Key.diaryTips]: "Sadece son 30 günlük kaydı gösterir",
	[Key.diaryMinutesAgo]: "dakika önce",
	[Key.diaryHoursAgo]: "saat önce",
	[Key.diaryDaysAgo]: "gün önce",

	// 404 Sayfası
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "Sayfa Bulunamadı",
	[Key.notFoundDescription]:
		"Üzgünüz, ziyaret ettiğiniz sayfa mevcut değil veya taşınmış olabilir.",
	[Key.backToHome]: "Ana Sayfaya Dön",

	// Müzik Çalar
	[Key.musicPlayer]: "Müzik Çalar",
	[Key.musicPlayerShow]: "Müzik Çaları Göster",
	[Key.musicPlayerHide]: "Müzik Çaları Gizle",
	[Key.musicPlayerExpand]: "Müzik Çaları Genişlet",
	[Key.musicPlayerCollapse]: "Müzik Çaları Daralt",
	[Key.musicPlayerPause]: "Duraklat",
	[Key.musicPlayerPlay]: "Oynat",
	[Key.musicPlayerPrevious]: "Önceki",
	[Key.musicPlayerNext]: "Sonraki",
	[Key.musicPlayerShuffle]: "Karıştır",
	[Key.musicPlayerRepeat]: "Tümünü Tekrarla",
	[Key.musicPlayerRepeatOne]: "Birini Tekrarla",
	[Key.musicPlayerVolume]: "Ses Kontrolü",
	[Key.musicPlayerMute]: "Sessize Al",
	[Key.musicPlayerUnmute]: "Sesi Aç",
	[Key.musicPlayerProgress]: "Oynatma İlerlemesi",
	[Key.musicPlayerCover]: "Kapak",
	[Key.musicPlayerPlaylist]: "Çalma Listesi",
	[Key.musicPlayerLoading]: "Yükleniyor...",
	[Key.musicPlayerErrorPlaylist]: "Çalma listesi alınamadı",
	[Key.musicPlayerErrorSong]: "Geçerli şarkı yüklenemedi, sonraki deneniyor",
	[Key.musicPlayerErrorEmpty]: "Çalma listesinde uygun şarkı yok",
	[Key.musicPlayerLyrics]: "Şarkı Sözleri",
	[Key.musicPlayerLyricsShow]: "Sözleri Göster",
	[Key.musicPlayerLyricsHide]: "Sözleri Gizle",
	[Key.musicPlayerNoLyrics]: "Şarkı sözü yok",
	[Key.musicPlayerLocateCurrent]: "Geçerli şarkıya git",
	[Key.unknownSong]: "Bilinmeyen Şarkı",
	[Key.unknownArtist]: "Bilinmeyen Sanatçı",

	// Albümler Sayfası
	[Key.albums]: "Albümler",
	[Key.albumsSubtitle]: "Hayatın güzel anlarını kaydet",
	[Key.albumsEmpty]: "İçerik yok",
	[Key.albumsEmptyDesc]:
		"Henüz albüm oluşturulmamış. Git biraz güzel anı ekle!",
	[Key.albumsBackToList]: "Albümlere Dön",
	[Key.albumsPhotoCount]: "fotoğraf",
	[Key.albumsPhotosCount]: "fotoğraf",
	[Key.hiddenAlbum]: "Gizli Albüm",
	[Key.hideAlbumTip]:
		"Bu albüm gizli olarak ayarlandı ve albüm listesinde görünmeyecek, ancak doğrudan bir bağlantı üzerinden erişilebilir durumda",

	// Cihazlar Sayfası
	[Key.devices]: "Cihazlarım",
	[Key.devicesSubtitle]: "Günlük hayatımda kullandığım cihazlar",
	[Key.devicesViewDetails]: "Detayları Görüntüle",

	// Projeler Sayfası
	[Key.projects]: "Projeler",
	[Key.projectsSubtitle]: "Geliştirme proje portfolyom",
	[Key.projectsAll]: "Tümü",
	[Key.projectsWeb]: "Web Uygulamaları",
	[Key.projectsMobile]: "Mobil Uygulamalar",
	[Key.projectsDesktop]: "Masaüstü Uygulamaları",
	[Key.projectsOther]: "Diğer",
	[Key.projectTechStack]: "Teknoloji Yığını",
	[Key.projectLiveDemo]: "Canlı Demo",
	[Key.projectSourceCode]: "Kaynak Kodu",
	[Key.projectDescription]: "Proje Açıklaması",
	[Key.projectStatus]: "Durum",
	[Key.projectStatusCompleted]: "Tamamlandı",
	[Key.projectStatusInProgress]: "Devam Ediyor",
	[Key.projectStatusPlanned]: "Planlanan",
	[Key.projectsTotal]: "Toplam Proje",
	[Key.projectsCompleted]: "Tamamlanan",
	[Key.projectsInProgress]: "Devam Eden",
	[Key.projectsTechStack]: "Teknoloji Yığını İstatistikleri",
	[Key.projectsFeatured]: "Öne Çıkan Projeler",
	[Key.projectsPlanned]: "Planlanan",
	[Key.projectsDemo]: "Canlı Demo",
	[Key.projectsSource]: "Kaynak Kodu",
	[Key.projectsVisit]: "Projeyi Ziyaret Et",
	[Key.projectsGitHub]: "GitHub",

	// RSS Sayfası
	[Key.rss]: "RSS Beslemesi",
	[Key.rssDescription]: "En son güncellemeleri almak için abone olun",
	[Key.rssSubtitle]:
		"En son makaleleri ve güncellemeleri anında almak için RSS ile abone olun",
	[Key.rssLink]: "RSS Bağlantısı",
	[Key.rssCopyToReader]: "RSS okuyucunuza bağlantıyı kopyalayın",
	[Key.rssCopyLink]: "Kopyala",
	[Key.rssLatestPosts]: "Son Gönderiler",
	[Key.rssWhatIsRSS]: "RSS Nedir?",
	[Key.rssWhatIsRSSDescription]:
		"RSS (Gerçekten Basit Bildirim Sistemi), sık güncellenen içeriklerin yayınlanması için standart bir formattır. RSS ile şunları yapabilirsiniz:",
	[Key.rssBenefit1]:
		"Manuel olarak ziyaret etmeden web sitesinin en son içeriğini zamanında alın",
	[Key.rssBenefit2]:
		"Birden fazla web sitesine olan abonelikleri tek bir yerde yönetin",
	[Key.rssBenefit3]: "Önemli güncellemeleri ve makaleleri kaçırmayın",
	[Key.rssBenefit4]: "Reklamsız, temiz bir okuma deneyiminin keyfini çıkarın",
	[Key.rssHowToUse]:
		"Bu siteye abone olmak için Feedly, Inoreader veya diğer RSS okuyucularını kullanmanız önerilir.",
	[Key.rssCopied]: "RSS bağlantısı panoya kopyalandı!",
	[Key.rssCopyFailed]:
		"Kopyalama başarısız oldu, lütfen bağlantıyı manuel olarak kopyalayın",

	// Atom Sayfası
	[Key.atom]: "Atom Beslemesi",
	[Key.atomDescription]: "En son güncellemeleri almak için abone olun",
	[Key.atomSubtitle]:
		"En son makaleleri ve güncellemeleri anında almak için Atom ile abone olun",
	[Key.atomLink]: "Atom Bağlantısı",
	[Key.atomCopyToReader]: "Atom okuyucunuza bağlantıyı kopyalayın",
	[Key.atomCopyLink]: "Kopyala",
	[Key.atomLatestPosts]: "Son Gönderiler",
	[Key.atomWhatIsAtom]: "Atom Nedir?",
	[Key.atomWhatIsAtomDescription]:
		"Atom (Atom Bildirim Formatı), beslemeleri ve öğelerini tanımlamak için XML tabanlı bir standarttır. Atom ile şunları yapabilirsiniz:",
	[Key.atomBenefit1]:
		"Manuel olarak ziyaret etmeden web sitesinin en son içeriğini zamanında alın",
	[Key.atomBenefit2]:
		"Birden fazla web sitesine olan abonelikleri tek bir yerde yönetin",
	[Key.atomBenefit3]: "Önemli güncellemeleri ve makaleleri kaçırmayın",
	[Key.atomBenefit4]: "Reklamsız, temiz bir okuma deneyiminin keyfini çıkarın",
	[Key.atomHowToUse]:
		"Bu siteye abone olmak için Feedly, Inoreader veya diğer Atom okuyucularını kullanmanız önerilir.",
	[Key.atomCopied]: "Atom bağlantısı panoya kopyalandı!",
	[Key.atomCopyFailed]:
		"Kopyalama başarısız oldu, lütfen bağlantıyı manuel olarak kopyalayın",

	// Duvar Kağıdı modu
	[Key.wallpaperMode]: "Duvar Kağıdı Modu",
	[Key.wallpaperBanner]: "Afiş Modu",
	[Key.wallpaperFullscreen]: "Tam Ekran Modu",
	[Key.wallpaperNone]: "Duvar Kağıdını Gizle",
	[Key.wallpaperPosition]: "Duvar Kağıdı Konumu",
	[Key.wallpaperPositionTop]: "Üst",
	[Key.wallpaperPositionCenter]: "Orta",
	[Key.wallpaperPositionBottom]: "Alt",
	[Key.wallpaperOpacity]: "Arka Plan Opaklığı",
	[Key.wallpaperBlur]: "Arka Plan Bulanıklığı",
	[Key.cardOpacity]: "Kart Opaklığı",

	// Gezinti çubuğu şeffaf modu
	[Key.navbarTransparentMode]: "Gezinti Çubuğu Stili",
	[Key.navbarTransparentSemi]: "Buzlu Cam",
	[Key.navbarTransparentFull]: "Şeffaf",
	[Key.navbarTransparentSemifull]: "Dinamik",

	// Yetenekler Sayfası
	[Key.skills]: "Yetenekler",
	[Key.skillsSubtitle]: "Teknik becerilerim ve uzmanlık alanlarım",
	[Key.skillsFrontend]: "Ön Yüz Geliştirme",
	[Key.skillsBackend]: "Arka Yüz Geliştirme",
	[Key.skillsDatabase]: "Veritabanı",
	[Key.skillsTools]: "Geliştirme Araçları",
	[Key.skillsOther]: "Diğer Beceriler",
	[Key.skillLevel]: "Yeterlilik",
	[Key.skillLevelBeginner]: "Başlangıç",
	[Key.skillLevelIntermediate]: "Orta",
	[Key.skillLevelAdvanced]: "İleri",
	[Key.skillLevelExpert]: "Uzman",
	[Key.skillExperience]: "Deneyim",
	[Key.skillYears]: "yıl",
	[Key.skillMonths]: "ay",
	[Key.skillsTotal]: "Toplam Beceri",
	[Key.skillsExpert]: "Uzman Seviyesi",
	[Key.skillsAdvanced]: "İleri",
	[Key.skillsIntermediate]: "Orta",
	[Key.skillsBeginner]: "Başlangıç",
	[Key.skillsAdvancedTitle]: "Profesyonel Beceriler",
	[Key.skillsProjects]: "İlgili Projeler",
	[Key.skillsDistribution]: "Beceri Dağılımı",
	[Key.skillsByLevel]: "Seviyeye Göre",
	[Key.skillsByCategory]: "Kategoriye Göre",
	[Key.noData]: "Veri yok",

	// Zaman Çizelgesi Sayfası
	[Key.timeline]: "Zaman Çizelgesi",
	[Key.timelineSubtitle]: "Büyüme yolculuğum ve önemli kilometre taşlarım",
	[Key.timelineEducation]: "Eğitim",
	[Key.timelineWork]: "İş Deneyimi",
	[Key.timelineProject]: "Proje Deneyimi",
	[Key.timelineAchievement]: "Başarılar",
	[Key.timelinePresent]: "Günümüz",
	[Key.timelineLocation]: "Konum",
	[Key.timelineDescription]: "Detaylı Açıklama",
	[Key.timelineMonths]: "ay",
	[Key.timelineYears]: "yıl",
	[Key.timelineTotal]: "Toplam",
	[Key.timelineProjects]: "Proje",
	[Key.timelineExperience]: "İş Deneyimi",
	[Key.timelineCurrent]: "Güncel Durum",
	[Key.timelineHistory]: "Geçmiş",
	[Key.timelineAchievements]: "Başarılar",
	[Key.timelineStartDate]: "Başlangıç Tarihi",
	[Key.timelineDuration]: "Süre",

	// Geri Bildirim Sayfası - Webmaster ile İletişim Modülü
	[Key.contactMe]: "Webmaster ile iletişime geçin",
	[Key.contactEmail]: "Webmaster ile e-posta yoluyla iletişime geçin",
	[Key.contactSocialFriends]:
		"Webmaster'ı sosyal medyada arkadaş olarak ekleyerek iletişime geçin",
	[Key.addFriends]: "Şimdi arkadaş ekleyin",

	// Sponsorluk Sayfası
	[Key.sponsorsNotice1]:
		"Web sitesi içeriğini faydalı buluyorsanız, daha iyi içerikler oluşturmama yardımcı olmak için aşağıdaki yöntemlerle çalışmalarımı destekleyebilirsiniz. Tüm sponsorluklar web sitesi bakımı, sunucu maliyetleri ve içerik oluşturma için kullanılacaktır.",
	[Key.sponsorsNotice2]:
		"BrightMoon blog projesi içerik gelişimini desteklediğiniz için teşekkür ederiz!",
	[Key.wechatPay]: "WeChat",
	[Key.aliPay]: "Alipay",
	[Key.scanPayQRcode]: "Ödeme için Tara",
	[Key.sponsorsPartner]: "Sponsor Ortakları",
	[Key.otherSupportOptions]: "Diğer destek yöntemleri",
	[Key.shareBlog]: "Blogumu daha fazla arkadaşımla paylaş",
	[Key.leaveComment]:
		"Makalenin altındaki yorumlar bölümünde düşüncelerinizi belirtin",
	[Key.subscribeToArticles]:
		"En son makaleleri almak için RSS ve Atom'a abone olun",

	// Şifre Koruması
	[Key.passwordProtected]: "Şifre Korumalı",
	[Key.passwordProtectedTitle]: "Bu içerik şifre korumalıdır",
	[Key.passwordProtectedDescription]:
		"Korumalı içeriği görüntülemek için lütfen şifreyi girin",
	[Key.passwordPlaceholder]: "Şifreyi girin",
	[Key.passwordUnlock]: "Kilidi Aç",
	[Key.passwordUnlocking]: "Kilit açılıyor...",
	[Key.passwordIncorrect]: "Şifre yanlış, lütfen tekrar deneyin",
	[Key.passwordDecryptError]:
		"Şifre çözme başarısız oldu, lütfen şifrenin doğru olup olmadığını kontrol edin",
	[Key.passwordRequired]: "Lütfen şifreyi girin",
	[Key.passwordVerifying]: "Doğrulanıyor...",
	[Key.passwordDecryptFailed]:
		"Şifre çözme başarısız oldu, lütfen şifreyi kontrol edin",
	[Key.passwordDecryptRetry]:
		"Şifre çözme başarısız oldu, lütfen tekrar deneyin",
	[Key.passwordUnlockButton]: "Kilidi Aç",
	[Key.passwordHintLabel]: "Şifre İpucu",
	[Key.copyFailed]: "Kopyalama başarısız oldu:",
	[Key.syntaxHighlightFailed]: "Sözdizimi vurgulaması başarısız oldu:",
	[Key.autoSyntaxHighlightFailed]:
		"Otomatik sözdizimi vurgulaması da başarısız oldu:",
	[Key.decryptionError]: "Şifre çözme sırasında bir hata oluştu:",

	// Son Düzenlenme Zamanı Kartı
	[Key.lastModifiedPrefix]: "Son düzenlenme süresi: ",
	[Key.lastModifiedOutdated]: "Bazı bilgiler güncel olmayabilir",
	[Key.year]: "y",
	[Key.month]: "a",
	[Key.day]: "g",
	[Key.hour]: "s",
	[Key.minute]: "dk",
	[Key.second]: "sn",

	// Site İstatistikleri
	[Key.siteStats]: "Site İstatistikleri",
	[Key.siteStatsPostCount]: "Gönderiler",
	[Key.siteStatsCategoryCount]: "Kategoriler",
	[Key.siteStatsTagCount]: "Etiketler",
	[Key.siteStatsTotalWords]: "Toplam Kelime",
	[Key.siteStatsRunningDays]: "Çalışma Günü",
	[Key.siteStatsLastUpdate]: "Son Aktivite",
	[Key.siteStatsDaysAgo]: "{days} gün önce",
	[Key.siteStatsDays]: "{days} gün",
	[Key.siteStatsCurrentDate]: "Tarih",
	[Key.siteStatsDateFormat]: "{month}/{day}/{year}",
	[Key.siteStatsCurrentTime]: "Saat",
	[Key.siteStatsTimePeriodMorning]: "Sabah",
	[Key.siteStatsTimePeriodNoon]: "Öğle",
	[Key.siteStatsTimePeriodAfternoon]: "Öğleden sonra",
	[Key.siteStatsTimePeriodEvening]: "Akşam",
	[Key.siteStatsTimePeriodNight]: "Gece",
	[Key.siteStatsAm]: "ÖÖ",
	[Key.siteStatsPm]: "ÖS",
	[Key.siteStatsSeason]: "Mevsim",
	[Key.siteStatsSeasonSpring]: "İlkbahar",
	[Key.siteStatsSeasonSummer]: "Yaz",
	[Key.siteStatsSeasonAutumn]: "Sonbahar",
	[Key.siteStatsSeasonWinter]: "Kış",

	// Takvim Bileşeni
	[Key.calendarPrevMonth]: "Önceki ay",
	[Key.calendarNextMonth]: "Sonraki ay",
	[Key.calendarBackToToday]: "Bugüne dön",
	[Key.calendarSunday]: "Paz",
	[Key.calendarMonday]: "Pzt",
	[Key.calendarTuesday]: "Sal",
	[Key.calendarWednesday]: "Çar",
	[Key.calendarThursday]: "Per",
	[Key.calendarFriday]: "Cum",
	[Key.calendarSaturday]: "Cmt",
	[Key.calendarJanuary]: "Oca",
	[Key.calendarFebruary]: "Şub",
	[Key.calendarMarch]: "Mar",
	[Key.calendarApril]: "Nis",
	[Key.calendarMay]: "May",
	[Key.calendarJune]: "Haz",
	[Key.calendarJuly]: "Tem",
	[Key.calendarAugust]: "Ağu",
	[Key.calendarSeptember]: "Eyl",
	[Key.calendarOctober]: "Eki",
	[Key.calendarNovember]: "Kas",
	[Key.calendarDecember]: "Ara",

	// Paylaşım İşlevleri
	[Key.shareArticle]: "Paylaş",
	[Key.generatingPoster]: "Poster oluşturuluyor...",
	[Key.copied]: "Kopyalandı",
	[Key.copyLink]: "Bağlantıyı Kopyala",
	[Key.savePoster]: "Posteri Kaydet",
	[Key.scanToRead]: "Okumak için Tara",
	[Key.shareOnSocial]: "Paylaş",
	[Key.shareOnSocialDescription]:
		"Bu makale size yardımcı olduysa, lütfen başkalarıyla paylaşın!",

	// Profil İstatistikleri
	[Key.profileStatsLoading]: "İstatistikler yükleniyor...",
	[Key.profileStatsPageViews]: "Sayfa görüntüleme",
	[Key.profileStatsVisits]: "Ziyaretler",
	[Key.profileStatsUnavailable]: "İstatistikler mevcut değil",

	// Sayfa Görüntüleme İstatistikleri
	[Key.pageViewsLoading]: "İstatistikler yükleniyor...",
	[Key.pageViewsUnavailable]: "İstatistikler mevcut değil",

	// Gönderi Düzeni
	[Key.postListLayout]: "Gönderi Düzeni",
	[Key.listMode]: "Liste",
	[Key.gridMode]: "Izgara",

	// Harici Bağlantı Uyarısı
	[Key.leaveSite]: "Bu siteden ayrıl",
	[Key.goToExternalLink]: "Harici bir bağlantıya gitmek üzeresiniz:",
	[Key.warningText]: "Hesap ve varlık güvenliğinize dikkat edin",
	[Key.confirmText]: "Ziyarete Devam Et",
	[Key.cancelText]: "İptal",

	// Sosyal medyada arkadaş ekleme
	[Key.contactMethod1]: "Wechat",
	[Key.contactMethod2]: "QQ",
	[Key.contactMethod3]: "Telegram",
	[Key.scanContact1]: "Arkadaş eklemek için QR kodu tarayın WeChat",
	[Key.scanContact2]: "Arkadaş eklemek için QR kodu tarayın QQ",
	[Key.scanContact3]: "Arkadaş eklemek için QR kodu tarayın Telegram",

	// Hava durumu bileşeni
	[Key.weather]: "Hava Durumu",
	[Key.weatherNoApiKey]:
		"Lütfen src/config/user.ts dosyasına WeatherAPI anahtarını ekleyin",
	[Key.weatherLocationDisabled]:
		"Gizlilik sözleşmesinin reddedilmesi nedeniyle hava durumu konum hizmeti devre dışı bırakıldı",
	[Key.weatherWaitingConsent]: "Hava durumu konum yetkisi bekleniyor...",
	[Key.weatherDefaultLocationHint]:
		"Gizlilik onayı reddedildi, varsayılan konum kullanılıyor",
	[Key.weatherDefaultLocationConfirm]: "Tamam",
	[Key.weatherLoading]: "Hava durumu yükleniyor...",
	[Key.weatherLoadFailed]: "Yükleme başarısız",
	[Key.weatherRetry]: "Tekrar Dene",
	[Key.weatherSearchPlaceholder]: "Şehir ara...",
	[Key.weatherHumidity]: "Nem",
	[Key.weatherWind]: "Rüzgar",
	[Key.weatherFeelsLike]: "Hissedilen",
	[Key.weatherUV]: "UV İndeksi",
	[Key.weatherVisibility]: "Görüş Mesafesi",
	[Key.weatherForecast]: "7 Günlük Tahmin",
	[Key.weatherToday]: "Bugün",
	[Key.weatherHigh]: "Yüksek",
	[Key.weatherLow]: "Düşük",
	[Key.weatherCelsius]: "°C",
	[Key.weatherFahrenheit]: "°F",
	[Key.weatherKmh]: "km/s",
	[Key.weatherMph]: "mph",
	[Key.weatherChangeLocation]: "Konum Değiştir",
	[Key.weatherDetectLocation]: "Konumu Algıla",

	// Hava Durumu Koşulları
	[Key.weatherCondSunny]: "Güneşli",
	[Key.weatherCondPartlyCloudy]: "Parçalı Bulutlu",
	[Key.weatherCondCloudy]: "Bulutlu",
	[Key.weatherCondFog]: "Sisli",
	[Key.weatherCondDrizzle]: "Çisenti",
	[Key.weatherCondRain]: "Yağmurlu",
	[Key.weatherCondHeavyRain]: "Şiddetli Yağmur",
	[Key.weatherCondSnow]: "Karlı",
	[Key.weatherCondHeavySnow]: "Yoğun Kar",
	[Key.weatherCondSleet]: "Sulu Kar",
	[Key.weatherCondThunderstorm]: "Gök Gürültülü Fırtına",
	[Key.weatherCondHail]: "Dolu",
	[Key.weatherCondDust]: "Toz",

	// Çerez Onayı
	[Key.cookieConsentTitle]: "Gizliliğinize Değer Veriyoruz",
	[Key.cookieConsentDescription]:
		"BrightMoon, hizmetlerimizi ve reklamlarımızı sağlamak, sürdürmek ve geliştirmek için cihaz tanımlayıcıları ve diğer verileri depolamak ve erişmek amacıyla çerezleri kullanır. Bu kullanımlara onay vermek için «Kabul Et» seçeneğini seçebilir veya gerekli olmayan çerezleri reddetmek için «Tümünü Reddet» düğmesine tıklayabilirsiniz.",
	[Key.cookieConsentIpInfo]: "Konumunuz belirleniyor...",
	[Key.cookieConsentIpTimeout]:
		"Konum tespiti zaman aşımına uğradı, lütfen tekrar deneyin",
	[Key.cookieConsentAccept]: "Kabul Et",
	[Key.cookieConsentReject]: "Tümünü Reddet",

	// Twikoo Yorum Sistemi
	[Key.twikooInitializing]: "Twikoo yorum sistemi başlatılıyor...",
	[Key.twikooNotConfigured]: "Twikoo yorum sistemi henüz yapılandırılmadı",
	[Key.twikooConfigHint]:
		"Lütfen Twikoo yorum sistemini src/config/user.ts dosyasında yapılandırın",
	[Key.twikooPrivacyRejected]:
		"Gizlilik sözleşmesinin reddedilmesi nedeniyle Twikoo yorum sistemi kapatılmıştır",

	// Sürüm Kontrolü
	[Key.versionCheck]: "Güncellemeleri kontrol et",
	[Key.versionLatest]: "Güncel",
	[Key.versionNewVersion]: "Yeni sürüm mevcut",
	[Key.versionChecking]: "Kontrol ediliyor...",
	[Key.versionCheckError]: "Kontrol başarısız",
	[Key.versionPreRelease]: "Beta",
	[Key.versionCheckFailedTitle]: "Güncelleme Kontrolü Başarısız",
	[Key.versionCheckFailedDesc]:
		"Güncellemeler kontrol edilemiyor, genellikle uzak depo API hız sınırlaması veya uzak depo API adresinin yapılandırılmamış olması nedeniyle. Lütfen daha sonra tekrar deneyin",
	[Key.versionCheckSuccessTitle]: "Kontrol başarılı",
	[Key.versionCheckSuccessDesc]:
		"Yeni sürüm bulunamadı. Güncel sürümü kullanıyorsunuz",
	[Key.versionDownload]: "Son Sürümü İndir",
	[Key.versionUpdateWarning]:
		"BrightMoon blog framework yükseltme aracının kullanılması önerilir. Lütfen yükseltmeden önce verilerinizi yedekleyin.",

	// Ekmek kırıntısı gezinmesi
	[Key.suggestion]: "Belki ziyaret etmek istersiniz",
	[Key.navBack]: "Önceki sayfaya dön",
	[Key.navForward]: "Sonraki sayfaya git",
};
