import Key from "../i18nKey";
import type { Translation } from "../translation";

export const id: Translation = {
	[Key.home]: "Beranda",
	[Key.about]: "Tentang",
	[Key.archive]: "Arsip",
	[Key.search]: "Cari",
	[Key.feedback]: "Masukan",
	[Key.other]: "Lainnya",

	// Judul panel terjemahan
	[Key.translateHeader]: "Pilih Bahasa",

	// Judul bilah navigasi
	[Key.navLinks]: "Tautan",
	[Key.navMy]: "Saya",
	[Key.navAbout]: "Tentang",
	[Key.sponsors]: "Sponsor",
	[Key.navOthers]: "Lainnya",

	[Key.tags]: "Tag",
	[Key.categories]: "Kategori",
	[Key.recentPosts]: "Postingan Terbaru",

	// Daftar Isi
	[Key.tocTitle]: "Daftar Isi",

	// Pengumuman
	[Key.announcement]: "Pengumuman",
	[Key.announcementClose]: "Tutup",

	[Key.comments]: "Komentar",
	[Key.friends]: "Teman",
	[Key.friendsSubtitle]: "Temukan situs web hebat lainnya",
	[Key.friendsSearchPlaceholder]: "Cari nama teman atau deskripsi...",
	[Key.friendsFilterAll]: "Semua",
	[Key.friendsNoResults]: "Tidak ada teman yang cocok ditemukan",
	[Key.friendsVisit]: "Kunjungi",
	[Key.friendsCopyLink]: "Salin Tautan",
	[Key.friendsCopySuccess]: "Disalin",
	[Key.friendsTags]: "Tag",
	[Key.untitled]: "Tanpa Judul",
	[Key.uncategorized]: "Tidak Berkategori",
	[Key.noTags]: "Tidak Ada Tag",

	[Key.wordCount]: "kata",
	[Key.wordsCount]: "kata",
	[Key.minuteCount]: "menit",
	[Key.minutesCount]: "menit",
	[Key.postCount]: "postingan",
	[Key.postsCount]: "postingan",

	[Key.appearance]: "Tampilan",
	[Key.themeSwitch]: "Ganti Tema",
	[Key.themeColor]: "Warna Tema",
	[Key.sakuraEffect]: "Efek Sakura",
	[Key.wavesEffect]: "Efek Ombak",
	[Key.wavesPerformanceMode]: "Mode Performa",

	[Key.lightMode]: "Terang",
	[Key.darkMode]: "Gelap",
	[Key.systemMode]: "Sistem",

	[Key.more]: "Lainnya",

	[Key.author]: "Penulis",
	[Key.publishedAt]: "Dipublikasikan pada",
	[Key.license]: "Lisensi",
	[Key.anime]: "Anime",
	[Key.diary]: "Catatan Harian",

	// Halaman Anime
	[Key.animeTitle]: "Daftar Anime Saya",
	[Key.animeSubtitle]: "Rekam perjalanan anime saya",
	[Key.animeStatusWatching]: "Sedang Ditonton",
	[Key.animeStatusCompleted]: "Selesai",
	[Key.animeStatusPlanned]: "Direncanakan",
	[Key.animeStatusOnHold]: "Ditunda",
	[Key.animeStatusDropped]: "Dibatalkan",
	[Key.animeFilterAll]: "Semua",
	[Key.animeYear]: "Tahun",
	[Key.animeStudio]: "Studio",
	[Key.animeEmpty]: "Tidak ada data anime yang tersedia",
	[Key.animeEmptyBangumi]: "Periksa konfigurasi Bangumi atau koneksi jaringan",
	[Key.animeEmptyBilibili]:
		"Data Bilibili kosong. Jalankan `pnpm run update-bilibili` untuk mendapatkan data",
	[Key.animeSetBangumiUserId]:
		"Harap atur ID pengguna Bangumi Anda di file src/config.ts",
	[Key.animeSetBilibiliVmId]:
		"Harap atur vmID Bilibili Anda di file src/config.ts",
	[Key.animeEmptyLocal]:
		"Harap tambahkan informasi anime di file src/data/anime.ts",

	// Halaman Catatan Harian
	[Key.diarySubtitle]: "Berbagi kehidupan, kapan saja, di mana saja",
	[Key.diaryCount]: "entri catatan harian",
	[Key.diaryReply]: "Balas",
	[Key.diaryTips]: "Hanya menampilkan 30 entri catatan harian terbaru",
	[Key.diaryMinutesAgo]: "menit yang lalu",
	[Key.diaryHoursAgo]: "jam yang lalu",
	[Key.diaryDaysAgo]: "hari yang lalu",

	// Halaman 404
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "Halaman Tidak Ditemukan",
	[Key.notFoundDescription]:
		"Maaf, halaman yang Anda kunjungi tidak ada atau telah dipindahkan.",
	[Key.backToHome]: "Kembali ke Beranda",

	// Pemutar Musik
	[Key.musicPlayer]: "Pemutar Musik",
	[Key.musicPlayerShow]: "Tampilkan Pemutar Musik",
	[Key.musicPlayerHide]: "Sembunyikan Pemutar Musik",
	[Key.musicPlayerExpand]: "Perluas Pemutar Musik",
	[Key.musicPlayerCollapse]: "Ciutkan Pemutar Musik",
	[Key.musicPlayerPause]: "Jeda",
	[Key.musicPlayerPlay]: "Putar",
	[Key.musicPlayerPrevious]: "Sebelumnya",
	[Key.musicPlayerNext]: "Selanjutnya",
	[Key.musicPlayerShuffle]: "Acak",
	[Key.musicPlayerRepeat]: "Ulangi Semua",
	[Key.musicPlayerRepeatOne]: "Ulangi Satu",
	[Key.musicPlayerVolume]: "Kontrol Volume",
	[Key.musicPlayerMute]: "Bisu",
	[Key.musicPlayerUnmute]: "Aktifkan Suara",
	[Key.musicPlayerProgress]: "Kemajuan Pemutaran",
	[Key.musicPlayerCover]: "Sampul",
	[Key.musicPlayerPlaylist]: "Daftar Putar",
	[Key.musicPlayerLoading]: "Memuat...",
	[Key.musicPlayerErrorPlaylist]: "Gagal mengambil daftar putar",
	[Key.musicPlayerErrorSong]:
		"Gagal memuat lagu saat ini, mencoba lagu berikutnya",
	[Key.musicPlayerErrorEmpty]: "Tidak ada lagu tersedia di daftar putar",
	[Key.musicPlayerLyrics]: "Lirik",
	[Key.musicPlayerLyricsShow]: "Tampilkan Lirik",
	[Key.musicPlayerLyricsHide]: "Sembunyikan Lirik",
	[Key.musicPlayerNoLyrics]: "Lirik tidak tersedia",
	[Key.unknownSong]: "Lagu Tidak Dikenal",
	[Key.unknownArtist]: "Artis Tidak Dikenal",

	// Halaman Album
	[Key.albums]: "Album",
	[Key.albumsSubtitle]: "Rekam momen indah dalam hidup",
	[Key.albumsEmpty]: "Tidak ada konten",
	[Key.albumsEmptyDesc]:
		"Belum ada album yang dibuat. Yuk, tambahkan beberapa kenangan indah!",
	[Key.albumsBackToList]: "Kembali ke Album",
	[Key.albumsPhotoCount]: "foto",
	[Key.albumsPhotosCount]: "foto",
	[Key.hiddenAlbum]: "Album Tersembunyi",
	[Key.hideAlbumTip]:
		"Album ini diatur sebagai tersembunyi dan tidak akan muncul dalam daftar album, tetapi masih dapat diakses melalui tautan langsung",

	// Halaman Perangkat
	[Key.devices]: "Perangkat Saya",
	[Key.devicesSubtitle]:
		"Berikut adalah perangkat yang saya gunakan dalam kehidupan sehari-hari",
	[Key.devicesViewDetails]: "Lihat Detail",

	// Halaman Proyek
	[Key.projects]: "Proyek",
	[Key.projectsSubtitle]: "Portofolio proyek pengembangan saya",
	[Key.projectsAll]: "Semua",
	[Key.projectsWeb]: "Aplikasi Web",
	[Key.projectsMobile]: "Aplikasi Mobile",
	[Key.projectsDesktop]: "Aplikasi Desktop",
	[Key.projectsOther]: "Lainnya",
	[Key.projectTechStack]: "Tumpukan Teknologi",
	[Key.projectLiveDemo]: "Demo Langsung",
	[Key.projectSourceCode]: "Kode Sumber",
	[Key.projectDescription]: "Deskripsi Proyek",
	[Key.projectStatus]: "Status",
	[Key.projectStatusCompleted]: "Selesai",
	[Key.projectStatusInProgress]: "Dalam Pengerjaan",
	[Key.projectStatusPlanned]: "Direncanakan",
	[Key.projectsTotal]: "Total Proyek",
	[Key.projectsCompleted]: "Selesai",
	[Key.projectsInProgress]: "Dalam Pengerjaan",
	[Key.projectsTechStack]: "Statistik Tumpukan Teknologi",
	[Key.projectsFeatured]: "Proyek Unggulan",
	[Key.projectsPlanned]: "Direncanakan",
	[Key.projectsDemo]: "Demo Langsung",
	[Key.projectsSource]: "Kode Sumber",
	[Key.projectsVisit]: "Kunjungi Proyek",
	[Key.projectsGitHub]: "GitHub",

	// Halaman RSS
	[Key.rss]: "Umpan RSS",
	[Key.rssDescription]: "Berlangganan untuk mendapatkan pembaruan terbaru",
	[Key.rssSubtitle]:
		"Berlangganan melalui RSS untuk mendapatkan artikel dan pembaruan terbaru secara instan",
	[Key.rssLink]: "Tautan RSS",
	[Key.rssCopyToReader]: "Salin tautan ke pembaca RSS Anda",
	[Key.rssCopyLink]: "Salin",
	[Key.rssLatestPosts]: "Postingan Terbaru",
	[Key.rssWhatIsRSS]: "Apa itu RSS?",
	[Key.rssWhatIsRSSDescription]:
		"RSS (Really Simple Syndication) adalah format standar untuk mempublikasikan konten yang sering diperbarui. Dengan RSS, Anda dapat:",
	[Key.rssBenefit1]:
		"Mendapatkan konten situs web terbaru tepat waktu tanpa mengunjungi secara manual",
	[Key.rssBenefit2]: "Kelola langganan ke banyak situs web dalam satu tempat",
	[Key.rssBenefit3]: "Hindari kehilangan pembaruan dan artikel penting",
	[Key.rssBenefit4]: "Nikmati pengalaman membaca tanpa iklan dan bersih",
	[Key.rssHowToUse]:
		"Disarankan menggunakan Feedly, Inoreader, atau pembaca RSS lainnya untuk berlangganan situs ini.",
	[Key.rssCopied]: "Tautan RSS disalin ke papan klip!",
	[Key.rssCopyFailed]: "Salin gagal, silakan salin tautan secara manual",

	// Halaman Atom
	[Key.atom]: "Umpan Atom",
	[Key.atomDescription]: "Berlangganan untuk mendapatkan pembaruan terbaru",
	[Key.atomSubtitle]:
		"Berlangganan melalui Atom untuk mendapatkan artikel dan pembaruan terbaru secara instan",
	[Key.atomLink]: "Tautan Atom",
	[Key.atomCopyToReader]: "Salin tautan ke pembaca Atom Anda",
	[Key.atomCopyLink]: "Salin",
	[Key.atomLatestPosts]: "Postingan Terbaru",
	[Key.atomWhatIsAtom]: "Apa itu Atom?",
	[Key.atomWhatIsAtomDescription]:
		"Atom (Atom Syndication Format) adalah standar berbasis XML untuk mendeskripsikan umpan dan itemnya. Dengan Atom, Anda dapat:",
	[Key.atomBenefit1]:
		"Mendapatkan konten situs web terbaru tepat waktu tanpa mengunjungi secara manual",
	[Key.atomBenefit2]: "Kelola langganan ke banyak situs web dalam satu tempat",
	[Key.atomBenefit3]: "Hindari kehilangan pembaruan dan artikel penting",
	[Key.atomBenefit4]: "Nikmati pengalaman membaca tanpa iklan dan bersih",
	[Key.atomHowToUse]:
		"Disarankan menggunakan Feedly, Inoreader, atau pembaca Atom lainnya untuk berlangganan situs ini.",
	[Key.atomCopied]: "Tautan Atom disalin ke papan klip!",
	[Key.atomCopyFailed]: "Salin gagal, silakan salin tautan secara manual",

	// Mode Wallpaper
	[Key.wallpaperMode]: "Mode Wallpaper",
	[Key.wallpaperBanner]: "Mode Spanduk",
	[Key.wallpaperFullscreen]: "Mode Layar Penuh",
	[Key.wallpaperNone]: "Sembunyikan Wallpaper",
	[Key.wallpaperPosition]: "Posisi Wallpaper",
	[Key.wallpaperPositionTop]: "Atas",
	[Key.wallpaperPositionCenter]: "Tengah",
	[Key.wallpaperPositionBottom]: "Bawah",
	[Key.wallpaperOpacity]: "Opasitas Latar Belakang",
	[Key.wallpaperBlur]: "Keburaman Latar Belakang",
	[Key.cardOpacity]: "Opasitas Kartu",

	// Mode navbar transparan
	[Key.navbarTransparentMode]: "Gaya Navbar",
	[Key.navbarTransparentSemi]: "Buram",
	[Key.navbarTransparentFull]: "Transparan",
	[Key.navbarTransparentSemifull]: "Dinamis",

	// Halaman Keterampilan
	[Key.skills]: "Keterampilan",
	[Key.skillsSubtitle]: "Keterampilan teknis dan keahlian saya",
	[Key.skillsFrontend]: "Pengembangan Frontend",
	[Key.skillsBackend]: "Pengembangan Backend",
	[Key.skillsDatabase]: "Basis Data",
	[Key.skillsTools]: "Alat Pengembangan",
	[Key.skillsOther]: "Keterampilan Lainnya",
	[Key.skillLevel]: "Tingkat Kemahiran",
	[Key.skillLevelBeginner]: "Pemula",
	[Key.skillLevelIntermediate]: "Menengah",
	[Key.skillLevelAdvanced]: "Lanjutan",
	[Key.skillLevelExpert]: "Ahli",
	[Key.skillExperience]: "Pengalaman",
	[Key.skillYears]: "tahun",
	[Key.skillMonths]: "bulan",
	[Key.skillsTotal]: "Total Keterampilan",
	[Key.skillsExpert]: "Tingkat Ahli",
	[Key.skillsAdvanced]: "Lanjutan",
	[Key.skillsIntermediate]: "Menengah",
	[Key.skillsBeginner]: "Pemula",
	[Key.skillsAdvancedTitle]: "Keterampilan Profesional",
	[Key.skillsProjects]: "Proyek Terkait",
	[Key.skillsDistribution]: "Distribusi Keterampilan",
	[Key.skillsByLevel]: "Berdasarkan Tingkat",
	[Key.skillsByCategory]: "Berdasarkan Kategori",
	[Key.noData]: "Tidak ada data",

	// Halaman Linimasa
	[Key.timeline]: "Linimasa",
	[Key.timelineSubtitle]: "Perjalanan pertumbuhan dan tonggak penting saya",
	[Key.timelineEducation]: "Pendidikan",
	[Key.timelineWork]: "Pengalaman Kerja",
	[Key.timelineProject]: "Pengalaman Proyek",
	[Key.timelineAchievement]: "Pencapaian",
	[Key.timelinePresent]: "Sekarang",
	[Key.timelineLocation]: "Lokasi",
	[Key.timelineDescription]: "Deskripsi Detail",
	[Key.timelineMonths]: "bulan",
	[Key.timelineYears]: "tahun",
	[Key.timelineTotal]: "Total",
	[Key.timelineProjects]: "Proyek",
	[Key.timelineExperience]: "Pengalaman Kerja",
	[Key.timelineCurrent]: "Status Saat Ini",
	[Key.timelineHistory]: "Riwayat",
	[Key.timelineAchievements]: "Pencapaian",
	[Key.timelineStartDate]: "Tanggal Mulai",
	[Key.timelineDuration]: "Durasi",

	// Halaman Masukan - Modul Hubungi Webmaster
	[Key.contactMe]: "Hubungi Webmaster",
	[Key.contactEmail]: "Hubungi webmaster melalui email",
	[Key.contactSocialFriends]:
		"Hubungi webmaster dengan menambahkan sebagai teman media sosial",
	[Key.addFriends]: "Tambah teman sekarang",

	// Halaman Sponsor
	[Key.sponsorsNotice1]:
		"Jika Anda merasa konten situs web ini bermanfaat, dukunglah pekerjaan saya melalui cara-cara berikut untuk membantu menciptakan konten yang lebih baik. Semua sponsor akan digunakan untuk pemeliharaan situs web, biaya server, dan pembuatan konten.",
	[Key.sponsorsNotice2]:
		"Terima kasih telah mendukung pengembangan konten blog BrightMoon!",
	[Key.wechatPay]: "WeChat",
	[Key.aliPay]: "Alipay",
	[Key.scanPayQRcode]: "Pindai untuk Membayar",
	[Key.sponsorsPartner]: "Mitra Sponsor",
	[Key.otherSupportOptions]: "Metode dukungan lainnya",
	[Key.shareBlog]: "Bagikan blog saya dengan lebih banyak teman",
	[Key.leaveComment]:
		"Tinggalkan pemikiran Anda di bagian komentar di bawah artikel",
	[Key.subscribeToArticles]:
		"Berlangganan RSS dan Atom untuk mendapatkan artikel terbaru",

	// Perlindungan Kata Sandi
	[Key.passwordProtected]: "Dilindungi Kata Sandi",
	[Key.passwordProtectedTitle]: "Konten ini dilindungi kata sandi",
	[Key.passwordProtectedDescription]:
		"Harap masukkan kata sandi untuk melihat konten yang dilindungi",
	[Key.passwordPlaceholder]: "Masukkan kata sandi",
	[Key.passwordUnlock]: "Buka Kunci",
	[Key.passwordUnlocking]: "Membuka kunci...",
	[Key.passwordIncorrect]: "Kata sandi salah, silakan coba lagi",
	[Key.passwordDecryptError]:
		"Dekripsi gagal, periksa apakah kata sandi sudah benar",
	[Key.passwordRequired]: "Harap masukkan kata sandi",
	[Key.passwordVerifying]: "Memverifikasi...",
	[Key.passwordDecryptFailed]: "Dekripsi gagal, periksa kata sandi",
	[Key.passwordDecryptRetry]: "Dekripsi gagal, silakan coba lagi",
	[Key.passwordUnlockButton]: "Buka Kunci",
	[Key.copyFailed]: "Salin gagal:",
	[Key.syntaxHighlightFailed]: "Penyorotan sintaks gagal:",
	[Key.autoSyntaxHighlightFailed]: "Penyorotan sintaks otomatis juga gagal:",
	[Key.decryptionError]: "Terjadi kesalahan saat dekripsi:",

	// Kartu Waktu Terakhir Diedit
	[Key.lastModifiedPrefix]: "Waktu sejak suntingan terakhir: ",
	[Key.lastModifiedOutdated]: "Beberapa informasi mungkin sudah kedaluwarsa",
	[Key.year]: "th",
	[Key.month]: "bln",
	[Key.day]: "h",
	[Key.hour]: "j",
	[Key.minute]: "mnt",
	[Key.second]: "dtk",

	// Statistik Situs
	[Key.siteStats]: "Statistik Situs",
	[Key.siteStatsPostCount]: "Postingan",
	[Key.siteStatsCategoryCount]: "Kategori",
	[Key.siteStatsTagCount]: "Tag",
	[Key.siteStatsTotalWords]: "Total Kata",
	[Key.siteStatsRunningDays]: "Hari Berjalan",
	[Key.siteStatsLastUpdate]: "Aktivitas Terakhir",
	[Key.siteStatsDaysAgo]: "{days} hari yang lalu",
	[Key.siteStatsDays]: "{days} hari",
	[Key.siteStatsCurrentDate]: "Tanggal",
	[Key.siteStatsDateFormat]: "{month}/{day}/{year}",
	[Key.siteStatsCurrentTime]: "Waktu",
	[Key.siteStatsTimePeriodMorning]: "Pagi",
	[Key.siteStatsTimePeriodNoon]: "Siang",
	[Key.siteStatsTimePeriodAfternoon]: "Sore",
	[Key.siteStatsTimePeriodEvening]: "Senja",
	[Key.siteStatsTimePeriodNight]: "Malam",
	[Key.siteStatsAm]: "AM",
	[Key.siteStatsPm]: "PM",
	[Key.siteStatsSeason]: "Musim",
	[Key.siteStatsSeasonSpring]: "Musim semi",
	[Key.siteStatsSeasonSummer]: "Musim panas",
	[Key.siteStatsSeasonAutumn]: "Musim gugur",
	[Key.siteStatsSeasonWinter]: "Musim dingin",

	// Komponen Kalender
	[Key.calendarPrevMonth]: "Bulan sebelumnya",
	[Key.calendarNextMonth]: "Bulan berikutnya",
	[Key.calendarBackToToday]: "Kembali ke hari ini",
	[Key.calendarSunday]: "Min",
	[Key.calendarMonday]: "Sen",
	[Key.calendarTuesday]: "Sel",
	[Key.calendarWednesday]: "Rab",
	[Key.calendarThursday]: "Kam",
	[Key.calendarFriday]: "Jum",
	[Key.calendarSaturday]: "Sab",
	[Key.calendarJanuary]: "Jan",
	[Key.calendarFebruary]: "Feb",
	[Key.calendarMarch]: "Mar",
	[Key.calendarApril]: "Apr",
	[Key.calendarMay]: "Mei",
	[Key.calendarJune]: "Jun",
	[Key.calendarJuly]: "Jul",
	[Key.calendarAugust]: "Agu",
	[Key.calendarSeptember]: "Sep",
	[Key.calendarOctober]: "Okt",
	[Key.calendarNovember]: "Nov",
	[Key.calendarDecember]: "Des",

	// Fungsi Berbagi
	[Key.shareArticle]: "Bagikan",
	[Key.generatingPoster]: "Membuat poster...",
	[Key.copied]: "Disalin",
	[Key.copyLink]: "Salin Tautan",
	[Key.savePoster]: "Simpan Poster",
	[Key.scanToRead]: "Pindai untuk Membaca",
	[Key.shareOnSocial]: "Bagikan",
	[Key.shareOnSocialDescription]:
		"Jika artikel ini membantu Anda, bagikan dengan orang lain!",

	// Statistik Profil
	[Key.profileStatsLoading]: "Memuat statistik...",
	[Key.profileStatsPageViews]: "Tampilan halaman",
	[Key.profileStatsVisits]: "Kunjungan",
	[Key.profileStatsUnavailable]: "Statistik tidak tersedia",

	// Statistik Tampilan Halaman
	[Key.pageViewsLoading]: "Memuat statistik...",
	[Key.pageViewsUnavailable]: "Statistik tidak tersedia",

	// Tata Letak Daftar Posting
	[Key.postListLayout]: "Tata Letak Daftar Posting",
	[Key.listMode]: "Daftar",
	[Key.gridMode]: "Kisi",

	// Peringatan Tautan Eksternal
	[Key.leaveSite]: "Tinggalkan situs ini",
	[Key.goToExternalLink]: "Anda akan mengunjungi tautan eksternal:",
	[Key.warningText]: "Harap waspadai keamanan akun dan aset Anda",
	[Key.confirmText]: "Lanjutkan kunjungan",
	[Key.cancelText]: "Batal",

	// Tambahkan teman di media sosial
	[Key.contactMethod1]: "Wechat",
	[Key.contactMethod2]: "QQ",
	[Key.contactMethod3]: "Telegram",
	[Key.scanContact1]: "Pindai kode QR untuk menambahkan teman WeChat",
	[Key.scanContact2]: "Pindai kode QR untuk menambahkan teman QQ",
	[Key.scanContact3]: "Pindai kode QR untuk menambahkan teman Telegram",

	// Komponen cuaca
	[Key.weather]: "Cuaca",
	[Key.weatherNoApiKey]: "Silakan tambahkan kunci WeatherAPI di src/config.ts",
	[Key.weatherLocationDisabled]:
		"Layanan lokasi cuaca telah dinonaktifkan karena penolakan perjanjian privasi",
	[Key.weatherWaitingConsent]: "Menunggu otorisasi lokasi cuaca...",
	[Key.weatherDefaultLocationHint]:
		"Persetujuan privasi ditolak, menggunakan lokasi bawaan",
	[Key.weatherDefaultLocationConfirm]: "OK",
	[Key.weatherLoading]: "Memuat cuaca...",
	[Key.weatherLoadFailed]: "Gagal memuat",
	[Key.weatherRetry]: "Coba Lagi",
	[Key.weatherSearchPlaceholder]: "Cari kota...",
	[Key.weatherHumidity]: "Kelembapan",
	[Key.weatherWind]: "Angin",
	[Key.weatherFeelsLike]: "Terasa Seperti",
	[Key.weatherUV]: "Indeks UV",
	[Key.weatherVisibility]: "Jarak Pandang",
	[Key.weatherForecast]: "Prakiraan 7 Hari",
	[Key.weatherToday]: "Hari Ini",
	[Key.weatherHigh]: "Tinggi",
	[Key.weatherLow]: "Rendah",
	[Key.weatherCelsius]: "°C",
	[Key.weatherFahrenheit]: "°F",
	[Key.weatherKmh]: "km/j",
	[Key.weatherMph]: "mph",
	[Key.weatherChangeLocation]: "Ubah Lokasi",
	[Key.weatherDetectLocation]: "Deteksi Lokasi",

	// Kondisi Cuaca
	[Key.weatherCondSunny]: "Cerah",
	[Key.weatherCondPartlyCloudy]: "Berawan Sebagian",
	[Key.weatherCondCloudy]: "Berawan",
	[Key.weatherCondFog]: "Berkabut",
	[Key.weatherCondDrizzle]: "Gerimis",
	[Key.weatherCondRain]: "Hujan",
	[Key.weatherCondHeavyRain]: "Hujan Lebat",
	[Key.weatherCondSnow]: "Salju",
	[Key.weatherCondHeavySnow]: "Salju Lebat",
	[Key.weatherCondSleet]: "Hujan Salju",
	[Key.weatherCondThunderstorm]: "Badai Petir",
	[Key.weatherCondHail]: "Es",
	[Key.weatherCondDust]: "Debu",

	// Persetujuan Cookie
	[Key.cookieConsentTitle]: "Kami Menghargai Privasi Anda",
	[Key.cookieConsentDescription]:
		"BrightMoon menggunakan cookie untuk menyimpan dan mengakses pengidentifikasi perangkat serta data lainnya guna menyediakan, memelihara, dan meningkatkan layanan serta iklan kami. Anda dapat memilih «Terima» untuk menyetujui penggunaan ini, atau klik «Tolak Semua» untuk menolak cookie yang tidak penting.",
	[Key.cookieConsentIpInfo]: "Mendeteksi lokasi Anda...",
	[Key.cookieConsentIpTimeout]:
		"Deteksi lokasi waktu habis, silakan coba lagi nanti",
	[Key.cookieConsentAccept]: "Terima",
	[Key.cookieConsentReject]: "Tolak Semua",

	// Sistem Komentar Twikoo
	[Key.twikooInitializing]: "Menginisialisasi sistem komentar Twikoo...",
	[Key.twikooNotConfigured]: "Sistem komentar Twikoo belum dikonfigurasi",
	[Key.twikooConfigHint]:
		"Silakan konfigurasi sistem komentar Twikoo di src/config.ts",
	[Key.twikooPrivacyRejected]:
		"Sistem komentar Twikoo telah dinonaktifkan karena penolakan perjanjian privasi",

	// Pemeriksaan Versi
	[Key.versionCheck]: "Periksa Pembaruan",
	[Key.versionLatest]: "Versi terbaru",
	[Key.versionNewVersion]: "Versi baru tersedia",
	[Key.versionChecking]: "Memeriksa...",
	[Key.versionCheckError]: "Pemeriksaan gagal",
	[Key.versionPreRelease]: "Beta",
	[Key.versionCheckFailedTitle]: "Pemeriksaan Pembaruan Gagal",
	[Key.versionCheckFailedDesc]:
		"Tidak dapat memeriksa pembaruan, biasanya disebabkan oleh batasan kecepatan API repositori jarak jauh atau tidak adanya alamat API repositori jarak jauh yang dikonfigurasi. Silakan coba lagi nanti",
	[Key.versionCheckSuccessTitle]: "Pemeriksaan berhasil",
	[Key.versionCheckSuccessDesc]:
		"Tidak ada versi baru ditemukan. Anda sudah menggunakan versi terbaru",
	[Key.versionDownload]: "Unduh Versi Terbaru",
	[Key.versionUpdateWarning]:
		"Disarankan menggunakan alat peningkatan framework blog BrightMoon. Harap cadangkan data Anda sebelum meningkatkan.",

	// Navigasi remah roti
	[Key.suggestion]: "Mungkin Anda ingin mengunjungi",
	[Key.navBack]: "Kembali ke halaman sebelumnya",
	[Key.navForward]: "Ke halaman berikutnya",
};
