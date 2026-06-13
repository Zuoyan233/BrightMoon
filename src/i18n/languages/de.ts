import Key from "../i18nKey";
import type { Translation } from "../translation";

export const de: Translation = {
	[Key.home]: "Startseite",
	[Key.about]: "Über",
	[Key.archive]: "Archiv",
	[Key.search]: "Suche",
	[Key.feedback]: "Feedback",
	[Key.other]: "Sonstiges",

	// Übersetzungspanel-Titel
	[Key.translateHeader]: "Sprache auswählen",

	// Titel der Navigationsleiste
	[Key.navLinks]: "Links",
	[Key.navMy]: "Mein",
	[Key.navAbout]: "Über",
	[Key.sponsors]: "Sponsoren",
	[Key.navOthers]: "Andere",

	[Key.tags]: "Schlagwörter",
	[Key.categories]: "Kategorien",
	[Key.recentPosts]: "Letzte Beiträge",

	// Inhaltsverzeichnis
	[Key.tocTitle]: "Inhaltsverzeichnis",

	// Ankündigung
	[Key.announcement]: "Ankündigung",
	[Key.announcementClose]: "Schließen",

	[Key.comments]: "Kommentare",
	[Key.friends]: "Freunde",
	[Key.friendsSubtitle]: "Entdecke weitere tolle Websites",
	[Key.friendsSearchPlaceholder]: "Name oder Beschreibung suchen...",
	[Key.friendsFilterAll]: "Alle",
	[Key.friendsNoResults]: "Keine passenden Freunde gefunden",
	[Key.friendsVisit]: "Besuchen",
	[Key.friendsCopyLink]: "Link kopieren",
	[Key.friendsCopySuccess]: "Kopiert",
	[Key.friendsTags]: "Schlagwörter",
	[Key.untitled]: "Ohne Titel",
	[Key.uncategorized]: "Nicht kategorisiert",
	[Key.noTags]: "Keine Schlagwörter",

	[Key.wordCount]: "Wort",
	[Key.wordsCount]: "Wörter",
	[Key.minuteCount]: "Minute",
	[Key.minutesCount]: "Minuten",
	[Key.postCount]: "Beitrag",
	[Key.postsCount]: "Beiträge",

	[Key.appearance]: "Darstellung",
	[Key.themeColor]: "Theme-Farbe",
	[Key.sakuraEffect]: "Kirschblüten-Effekt",
	[Key.wavesEffect]: "Welleneffekt",
	[Key.wavesPerformanceMode]: "Leistungsmodus",

	[Key.lightMode]: "Hell",
	[Key.darkMode]: "Dunkel",
	[Key.systemMode]: "System",

	[Key.more]: "Mehr",

	[Key.author]: "Autor",
	[Key.publishedAt]: "Veröffentlicht am",
	[Key.license]: "Lizenz",
	[Key.anime]: "Anime",
	[Key.diary]: "Tagebuch",

	// Anime-Seite
	[Key.animeTitle]: "Meine Anime-Liste",
	[Key.animeSubtitle]: "Dokumentiere meine Anime-Reise",
	[Key.animeStatusWatching]: "Schaut",
	[Key.animeStatusCompleted]: "Abgeschlossen",
	[Key.animeStatusPlanned]: "Geplant",
	[Key.animeStatusOnHold]: "Pausiert",
	[Key.animeStatusDropped]: "Abgebrochen",
	[Key.animeFilterAll]: "Alle",
	[Key.animeYear]: "Jahr",
	[Key.animeStudio]: "Studio",
	[Key.animeEmpty]: "Keine Anime-Daten verfügbar",
	[Key.animeEmptyBangumi]:
		"Bitte überprüfe die Bangumi-Konfiguration oder die Netzwerkverbindung",
	[Key.animeEmptyBilibili]:
		"Bilibili-Daten sind leer. Bitte führe `pnpm run update-bilibili` aus, um Daten zu erhalten",
	[Key.animeSetBangumiUserId]:
		"Bitte setze deine Bangumi-Benutzer-ID in der Datei src/config.ts",
	[Key.animeSetBilibiliVmId]:
		"Bitte setze deine Bilibili-vmID in der Datei src/config.ts",
	[Key.animeEmptyLocal]:
		"Bitte füge Anime-Informationen in der Datei src/data/anime.ts hinzu",

	// Tagebuch-Seite
	[Key.diarySubtitle]: "Teile das Leben, jederzeit und überall",
	[Key.diaryCount]: "Tagebucheinträge",
	[Key.diaryReply]: "Antworten",
	[Key.diaryTips]: "Es werden nur die letzten 30 Tagebucheinträge angezeigt",
	[Key.diaryMinutesAgo]: "Minuten her",
	[Key.diaryHoursAgo]: "Stunden her",
	[Key.diaryDaysAgo]: "Tagen her",

	// 404-Seite
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "Seite nicht gefunden",
	[Key.notFoundDescription]:
		"Entschuldigung, die von Ihnen besuchte Seite existiert nicht oder wurde verschoben.",
	[Key.backToHome]: "Zurück zur Startseite",

	// Musikplayer
	[Key.musicPlayer]: "Musikplayer",
	[Key.musicPlayerShow]: "Musikplayer anzeigen",
	[Key.musicPlayerHide]: "Musikplayer ausblenden",
	[Key.musicPlayerExpand]: "Musikplayer erweitern",
	[Key.musicPlayerCollapse]: "Musikplayer zusammenfalten",
	[Key.musicPlayerPause]: "Pause",
	[Key.musicPlayerPlay]: "Abspielen",
	[Key.musicPlayerPrevious]: "Vorheriger",
	[Key.musicPlayerNext]: "Nächster",
	[Key.musicPlayerShuffle]: "Zufallswiedergabe",
	[Key.musicPlayerRepeat]: "Alle wiederholen",
	[Key.musicPlayerRepeatOne]: "Einen wiederholen",
	[Key.musicPlayerVolume]: "Lautstärkeregelung",
	[Key.musicPlayerProgress]: "Wiedergabefortschritt",
	[Key.musicPlayerCover]: "Cover",
	[Key.musicPlayerPlaylist]: "Wiedergabeliste",
	[Key.musicPlayerLoading]: "Laden...",
	[Key.musicPlayerErrorPlaylist]: "Wiedergabeliste konnte nicht geladen werden",
	[Key.musicPlayerErrorSong]:
		"Aktueller Song konnte nicht geladen werden, nächster wird versucht",
	[Key.musicPlayerErrorEmpty]: "Keine verfügbaren Songs in der Wiedergabeliste",
	[Key.unknownSong]: "Unbekannter Song",
	[Key.unknownArtist]: "Unbekannter Künstler",

	// Alben-Seite
	[Key.albums]: "Alben",
	[Key.albumsSubtitle]: "Halte die schönen Momente des Lebens fest",
	[Key.albumsEmpty]: "Kein Inhalt",
	[Key.albumsEmptyDesc]:
		"Es wurden noch keine Alben erstellt. Füge ein paar schöne Erinnerungen hinzu!",
	[Key.albumsBackToList]: "Zurück zu den Alben",
	[Key.albumsPhotoCount]: "Foto",
	[Key.albumsPhotosCount]: "Fotos",
	[Key.hiddenAlbum]: "Verstecktes Album",
	[Key.hideAlbumTip]:
		"Dieses Album ist als versteckt eingestellt und wird nicht in der Albenliste angezeigt, kann aber weiterhin über einen direkten Link aufgerufen werden",

	// Geräte-Seite
	[Key.devices]: "Meine Geräte",
	[Key.devicesSubtitle]: "Hier sind die Geräte, die ich im Alltag verwende",
	[Key.devicesViewDetails]: "Details anzeigen",

	// Projekte-Seite
	[Key.projects]: "Projekte",
	[Key.projectsSubtitle]: "Mein Entwicklungsprojekt-Portfolio",
	[Key.projectsAll]: "Alle",
	[Key.projectsWeb]: "Webanwendungen",
	[Key.projectsMobile]: "Mobile Anwendungen",
	[Key.projectsDesktop]: "Desktop-Anwendungen",
	[Key.projectsOther]: "Andere",
	[Key.projectTechStack]: "Technologie-Stack",
	[Key.projectLiveDemo]: "Live-Demo",
	[Key.projectSourceCode]: "Quellcode",
	[Key.projectDescription]: "Projektbeschreibung",
	[Key.projectStatus]: "Status",
	[Key.projectStatusCompleted]: "Abgeschlossen",
	[Key.projectStatusInProgress]: "In Bearbeitung",
	[Key.projectStatusPlanned]: "Geplant",
	[Key.projectsTotal]: "Projekte insgesamt",
	[Key.projectsCompleted]: "Abgeschlossen",
	[Key.projectsInProgress]: "In Bearbeitung",
	[Key.projectsTechStack]: "Technologie-Stack-Statistiken",
	[Key.projectsFeatured]: "Ausgewählte Projekte",
	[Key.projectsPlanned]: "Geplant",
	[Key.projectsDemo]: "Live-Demo",
	[Key.projectsSource]: "Quellcode",
	[Key.projectsVisit]: "Projekt besuchen",
	[Key.projectsGitHub]: "GitHub",

	// RSS-Seite
	[Key.rss]: "RSS-Feed",
	[Key.rssDescription]: "Abonnieren Sie, um die neuesten Updates zu erhalten",
	[Key.rssSubtitle]:
		"Abonnieren Sie per RSS, um die neuesten Artikel und Updates sofort zu erhalten",
	[Key.rssLink]: "RSS-Link",
	[Key.rssCopyToReader]: "Link in Ihren RSS-Reader kopieren",
	[Key.rssCopyLink]: "Kopieren",
	[Key.rssLatestPosts]: "Neueste Beiträge",
	[Key.rssWhatIsRSS]: "Was ist RSS?",
	[Key.rssWhatIsRSSDescription]:
		"RSS (Really Simple Syndication) ist ein Standardformat für die Veröffentlichung häufig aktualisierter Inhalte. Mit RSS können Sie:",
	[Key.rssBenefit1]:
		"Aktuelle Website-Inhalte rechtzeitig erhalten, ohne manuell vorbeizuschauen",
	[Key.rssBenefit2]: "Abonnements mehrerer Websites an einem Ort verwalten",
	[Key.rssBenefit3]: "Wichtige Updates und Artikel nicht verpassen",
	[Key.rssBenefit4]: "Ein werbefreies, sauberes Leseerlebnis genießen",
	[Key.rssHowToUse]:
		"Es wird empfohlen, Feedly, Inoreader oder andere RSS-Reader zu verwenden, um diese Seite zu abonnieren.",
	[Key.rssCopied]: "RSS-Link in die Zwischenablage kopiert!",
	[Key.rssCopyFailed]:
		"Kopieren fehlgeschlagen, bitte kopieren Sie den Link manuell",

	// Atom-Seite
	[Key.atom]: "Atom-Feed",
	[Key.atomDescription]: "Abonnieren Sie, um die neuesten Updates zu erhalten",
	[Key.atomSubtitle]:
		"Abonnieren Sie per Atom, um die neuesten Artikel und Updates sofort zu erhalten",
	[Key.atomLink]: "Atom-Link",
	[Key.atomCopyToReader]: "Link in Ihren Atom-Reader kopieren",
	[Key.atomCopyLink]: "Kopieren",
	[Key.atomLatestPosts]: "Neueste Beiträge",
	[Key.atomWhatIsAtom]: "Was ist Atom?",
	[Key.atomWhatIsAtomDescription]:
		"Atom (Atom Syndication Format) ist ein XML-basierter Standard zur Beschreibung von Feeds und deren Einträgen. Mit Atom können Sie:",
	[Key.atomBenefit1]:
		"Aktuelle Website-Inhalte rechtzeitig erhalten, ohne manuell vorbeizuschauen",
	[Key.atomBenefit2]: "Abonnements mehrerer Websites an einem Ort verwalten",
	[Key.atomBenefit3]: "Wichtige Updates und Artikel nicht verpassen",
	[Key.atomBenefit4]: "Ein werbefreies, sauberes Leseerlebnis genießen",
	[Key.atomHowToUse]:
		"Es wird empfohlen, Feedly, Inoreader oder andere Atom-Reader zu verwenden, um diese Seite zu abonnieren.",
	[Key.atomCopied]: "Atom-Link in die Zwischenablage kopiert!",
	[Key.atomCopyFailed]:
		"Kopieren fehlgeschlagen, bitte kopieren Sie den Link manuell",

	// Hintergrundbild-Modus
	[Key.wallpaperMode]: "Hintergrundbild-Modus",
	[Key.wallpaperBanner]: "Banner-Modus",
	[Key.wallpaperFullscreen]: "Vollbild-Modus",
	[Key.wallpaperNone]: "Hintergrundbild ausblenden",
	[Key.wallpaperPosition]: "Hintergrundbild-Position",
	[Key.wallpaperPositionTop]: "Oben",
	[Key.wallpaperPositionCenter]: "Mitte",
	[Key.wallpaperPositionBottom]: "Unten",
	[Key.wallpaperOpacity]: "Deckkraft",
	[Key.wallpaperBlur]: "Weichzeichnung",
	[Key.cardOpacity]: "Karten-Deckkraft",

	// Navigationsleisten-Stil
	[Key.navbarTransparentMode]: "Navigationsleisten-Stil",
	[Key.navbarTransparentSemi]: "Mattglas",
	[Key.navbarTransparentFull]: "Transparent",
	[Key.navbarTransparentSemifull]: "Dynamisch",

	// Fähigkeiten-Seite
	[Key.skills]: "Fähigkeiten",
	[Key.skillsSubtitle]: "Meine technischen Fähigkeiten und Expertise",
	[Key.skillsFrontend]: "Frontend-Entwicklung",
	[Key.skillsBackend]: "Backend-Entwicklung",
	[Key.skillsDatabase]: "Datenbank",
	[Key.skillsTools]: "Entwicklungswerkzeuge",
	[Key.skillsOther]: "Weitere Fähigkeiten",
	[Key.skillLevel]: "Kenntnisstufe",
	[Key.skillLevelBeginner]: "Anfänger",
	[Key.skillLevelIntermediate]: "Fortgeschritten",
	[Key.skillLevelAdvanced]: "Erweitert",
	[Key.skillLevelExpert]: "Experte",
	[Key.skillExperience]: "Erfahrung",
	[Key.skillYears]: "Jahre",
	[Key.skillMonths]: "Monate",
	[Key.skillsTotal]: "Fähigkeiten insgesamt",
	[Key.skillsExpert]: "Expertenniveau",
	[Key.skillsAdvanced]: "Erweitert",
	[Key.skillsIntermediate]: "Fortgeschritten",
	[Key.skillsBeginner]: "Anfänger",
	[Key.skillsAdvancedTitle]: "Professionelle Fähigkeiten",
	[Key.skillsProjects]: "Verwandte Projekte",
	[Key.skillsDistribution]: "Fähigkeitsverteilung",
	[Key.skillsByLevel]: "Nach Stufe",
	[Key.skillsByCategory]: "Nach Kategorie",
	[Key.noData]: "Keine Daten",

	// Zeitleiste-Seite
	[Key.timeline]: "Zeitleiste",
	[Key.timelineSubtitle]: "Meine Wachstumsreise und wichtige Meilensteine",
	[Key.timelineEducation]: "Ausbildung",
	[Key.timelineWork]: "Berufserfahrung",
	[Key.timelineProject]: "Projekterfahrung",
	[Key.timelineAchievement]: "Errungenschaften",
	[Key.timelinePresent]: "Heute",
	[Key.timelineLocation]: "Ort",
	[Key.timelineDescription]: "Detaillierte Beschreibung",
	[Key.timelineMonths]: "Monate",
	[Key.timelineYears]: "Jahre",
	[Key.timelineTotal]: "Insgesamt",
	[Key.timelineProjects]: "Projekte",
	[Key.timelineExperience]: "Berufserfahrung",
	[Key.timelineCurrent]: "Aktueller Status",
	[Key.timelineHistory]: "Verlauf",
	[Key.timelineAchievements]: "Errungenschaften",
	[Key.timelineStartDate]: "Startdatum",
	[Key.timelineDuration]: "Dauer",

	// Feedback-Seite - Modul „Kontakt zum Webmaster“
	[Key.contactMe]: "Kontakt zum Webmaster",
	[Key.contactEmail]: "Kontaktieren Sie den Webmaster per E-Mail",
	[Key.contactSocialFriends]:
		"Kontaktieren Sie den Webmaster, indem Sie ihn als Freund in sozialen Netzwerken hinzufügen",
	[Key.addFriends]: "Jetzt einen Freund hinzufügen",

	// Sponsoring-Seite
	[Key.sponsorsNotice1]:
		"Wenn Sie die Inhalte der Website hilfreich finden, unterstützen Sie bitte meine Arbeit auf folgende Weise, um dabei zu helfen, bessere Inhalte zu erstellen. Alle Sponsoringbeiträge werden für die Website-Wartung, Serverkosten und die Erstellung von Inhalten verwendet.",
	[Key.sponsorsNotice2]:
		"Vielen Dank für Ihre Unterstützung der BrightMoon Blog-Projektinhaltsentwicklung!",
	[Key.wechatPay]: "WeChat",
	[Key.aliPay]: "Alipay",
	[Key.scanPayQRcode]: "Zum Bezahlen scannen",
	[Key.sponsorsPartner]: "Sponsoring-Partner",
	[Key.otherSupportOptions]: "Weitere Unterstützungsmöglichkeiten",
	[Key.shareBlog]: "Teilen Sie meinen Blog mit mehr Freunden",
	[Key.leaveComment]:
		"Hinterlassen Sie Ihre Gedanken im Kommentarbereich unter dem Artikel",
	[Key.subscribeToArticles]:
		"Abonnieren Sie RSS und Atom, um die neuesten Artikel zu erhalten",

	// Passwortschutz
	[Key.passwordProtected]: "Passwortgeschützt",
	[Key.passwordProtectedTitle]: "Dieser Inhalt ist passwortgeschützt",
	[Key.passwordProtectedDescription]:
		"Bitte geben Sie das Passwort ein, um den geschützten Inhalt anzuzeigen",
	[Key.passwordPlaceholder]: "Passwort eingeben",
	[Key.passwordUnlock]: "Entsperren",
	[Key.passwordUnlocking]: "Entsperre...",
	[Key.passwordIncorrect]: "Falsches Passwort, bitte versuchen Sie es erneut",
	[Key.passwordDecryptError]:
		"Entschlüsselung fehlgeschlagen, bitte überprüfen Sie, ob das Passwort korrekt ist",
	[Key.passwordRequired]: "Bitte geben Sie das Passwort ein",
	[Key.passwordVerifying]: "Überprüfe...",
	[Key.passwordDecryptFailed]:
		"Entschlüsselung fehlgeschlagen, bitte überprüfen Sie das Passwort",
	[Key.passwordDecryptRetry]:
		"Entschlüsselung fehlgeschlagen, bitte versuchen Sie es erneut",
	[Key.passwordUnlockButton]: "Entsperren",
	[Key.copyFailed]: "Kopieren fehlgeschlagen:",
	[Key.syntaxHighlightFailed]: "Syntaxhervorhebung fehlgeschlagen:",
	[Key.autoSyntaxHighlightFailed]:
		"Automatische Syntaxhervorhebung ebenfalls fehlgeschlagen:",
	[Key.decryptionError]:
		"Ein Fehler ist während der Entschlüsselung aufgetreten:",

	// Karte „Zeitpunkt der letzten Bearbeitung“
	[Key.lastModifiedPrefix]: "Zeit seit der letzten Bearbeitung: ",
	[Key.lastModifiedOutdated]:
		"Einige Informationen sind möglicherweise veraltet",
	[Key.year]: "J",
	[Key.month]: "M",
	[Key.day]: "T",
	[Key.hour]: "Std",
	[Key.minute]: "Min",
	[Key.second]: "Sek",

	// Seitenstatistiken
	[Key.siteStats]: "Seitenstatistiken",
	[Key.siteStatsPostCount]: "Beiträge",
	[Key.siteStatsCategoryCount]: "Kategorien",
	[Key.siteStatsTagCount]: "Schlagwörter",
	[Key.siteStatsTotalWords]: "Wörter insgesamt",
	[Key.siteStatsRunningDays]: "Betriebstage",
	[Key.siteStatsLastUpdate]: "Letzte Aktivität",
	[Key.siteStatsDaysAgo]: "vor {days} Tagen",
	[Key.siteStatsDays]: "{days} Tage",
	[Key.siteStatsCurrentDate]: "Datum",
	[Key.siteStatsDateFormat]: "{month}/{day}/{year}",
	[Key.siteStatsCurrentTime]: "Zeit",
	[Key.siteStatsTimePeriodMorning]: "Morgen",
	[Key.siteStatsTimePeriodNoon]: "Mittag",
	[Key.siteStatsTimePeriodAfternoon]: "Nachmittag",
	[Key.siteStatsTimePeriodEvening]: "Abend",
	[Key.siteStatsTimePeriodNight]: "Nacht",
	[Key.siteStatsAm]: "AM",
	[Key.siteStatsPm]: "PM",
	[Key.siteStatsSeason]: "Jahreszeit",
	[Key.siteStatsSeasonSpring]: "Frühling",
	[Key.siteStatsSeasonSummer]: "Sommer",
	[Key.siteStatsSeasonAutumn]: "Herbst",
	[Key.siteStatsSeasonWinter]: "Winter",

	// Kalender-Komponente
	[Key.calendarSunday]: "So",
	[Key.calendarMonday]: "Mo",
	[Key.calendarTuesday]: "Di",
	[Key.calendarWednesday]: "Mi",
	[Key.calendarThursday]: "Do",
	[Key.calendarFriday]: "Fr",
	[Key.calendarSaturday]: "Sa",
	[Key.calendarJanuary]: "Jan",
	[Key.calendarFebruary]: "Feb",
	[Key.calendarMarch]: "Mär",
	[Key.calendarApril]: "Apr",
	[Key.calendarMay]: "Mai",
	[Key.calendarJune]: "Jun",
	[Key.calendarJuly]: "Jul",
	[Key.calendarAugust]: "Aug",
	[Key.calendarSeptember]: "Sep",
	[Key.calendarOctober]: "Okt",
	[Key.calendarNovember]: "Nov",
	[Key.calendarDecember]: "Dez",

	// Teilen-Funktionalität
	[Key.shareArticle]: "Teilen",
	[Key.generatingPoster]: "Poster wird generiert...",
	[Key.copied]: "Kopiert",
	[Key.copyLink]: "Link kopieren",
	[Key.savePoster]: "Poster speichern",
	[Key.scanToRead]: "Zum Lesen scannen",
	[Key.shareOnSocial]: "Teilen",
	[Key.shareOnSocialDescription]:
		"Wenn dieser Artikel Ihnen geholfen hat, teilen Sie ihn bitte mit anderen!",

	// Profilstatistiken
	[Key.profileStatsLoading]: "Lade Statistiken...",
	[Key.profileStatsPageViews]: "Seitenaufrufe",
	[Key.profileStatsVisits]: "Besuche",
	[Key.profileStatsUnavailable]: "Statistiken nicht verfügbar",

	// Seitenaufrufs-Statistiken
	[Key.pageViewsLoading]: "Lade Statistiken...",
	[Key.pageViewsUnavailable]: "Statistiken nicht verfügbar",

	// Beitragslisten-Layout
	[Key.postListLayout]: "Beitragslisten-Layout",
	[Key.listMode]: "Liste",
	[Key.gridMode]: "Raster",

	// Externe Link-Warnung
	[Key.leaveSite]: "Seite verlassen",
	[Key.goToExternalLink]: "Sie sind dabei, einen externen Link zu besuchen:",
	[Key.warningText]:
		"Bitte achten Sie auf die Sicherheit Ihres Kontos und Ihrer Vermögenswerte",
	[Key.confirmText]: "Weiter besuchen",
	[Key.cancelText]: "Abbrechen",

	// Freunde auf sozialen Medien hinzufügen
	[Key.contactMethod1]: "Wechat",
	[Key.contactMethod2]: "QQ",
	[Key.contactMethod3]: "Telegram",
	[Key.scanContact1]:
		"Scannen Sie den QR-Code, um einen WeChat-Freund hinzuzufügen",
	[Key.scanContact2]:
		"Scannen Sie den QR-Code, um einen QQ-Freund hinzuzufügen",
	[Key.scanContact3]:
		"Scannen Sie den QR-Code, um einen Telegram-Freund hinzuzufügen",

	// Wetter-Komponente
	[Key.weather]: "Wetter",
	[Key.weatherNoApiKey]:
		"Bitte fügen Sie den WeatherAPI-Schlüssel in src/config.ts hinzu",
	[Key.weatherLocationDisabled]:
		"Der Wetterortungsdienst wurde aufgrund der Ablehnung der Datenschutzvereinbarung deaktiviert",
	[Key.weatherWaitingConsent]: "Warte auf Autorisierung der Wetterortung...",
	[Key.weatherLoading]: "Wetter wird geladen...",
	[Key.weatherLoadFailed]: "Laden fehlgeschlagen",
	[Key.weatherRetry]: "Erneut versuchen",
	[Key.weatherSearchPlaceholder]: "Stadt suchen...",
	[Key.weatherHumidity]: "Luftfeuchtigkeit",
	[Key.weatherWind]: "Wind",
	[Key.weatherFeelsLike]: "Gefühlt",
	[Key.weatherUV]: "UV-Index",
	[Key.weatherVisibility]: "Sichtweite",
	[Key.weatherForecast]: "7-Tage-Vorhersage",
	[Key.weatherToday]: "Heute",
	[Key.weatherHigh]: "Hoch",
	[Key.weatherLow]: "Niedrig",
	[Key.weatherCelsius]: "°C",
	[Key.weatherFahrenheit]: "°F",
	[Key.weatherKmh]: "km/h",
	[Key.weatherMph]: "mph",
	[Key.weatherChangeLocation]: "Standort ändern",
	[Key.weatherDetectLocation]: "Standort erkennen",

	// Wetterbedingungen
	[Key.weatherCondSunny]: "Sonnig",
	[Key.weatherCondPartlyCloudy]: "Teilweise bewölkt",
	[Key.weatherCondCloudy]: "Bewölkt",
	[Key.weatherCondFog]: "Nebel",
	[Key.weatherCondDrizzle]: "Nieselregen",
	[Key.weatherCondRain]: "Regen",
	[Key.weatherCondHeavyRain]: "Starkregen",
	[Key.weatherCondSnow]: "Schnee",
	[Key.weatherCondHeavySnow]: "Starker Schneefall",
	[Key.weatherCondSleet]: "Schneeregen",
	[Key.weatherCondThunderstorm]: "Gewitter",
	[Key.weatherCondHail]: "Hagel",
	[Key.weatherCondDust]: "Staub",

	// Cookie-Einwilligung
	[Key.cookieConsentTitle]: "Wir respektieren Ihre Privatsphäre",
	[Key.cookieConsentDescription]:
		"BrightMoon verwendet Cookies, um Gerätekennungen und andere Daten zu speichern und darauf zuzugreifen, um unsere Dienste und Werbung bereitzustellen, aufrechtzuerhalten und zu verbessern. Sie können «Akzeptieren» wählen, um diese Verwendungen zuzustimmen, oder auf «Alle ablehnen» klicken, um nicht wesentliche Cookies abzulehnen.",
	[Key.cookieConsentIpInfo]: "Ihr Standort wird ermittelt...",
	[Key.cookieConsentAccept]: "Akzeptieren",
	[Key.cookieConsentReject]: "Alle ablehnen",

	// Twikoo-Kommentarsystem
	[Key.twikooInitializing]: "Twikoo-Kommentarsystem wird initialisiert...",
	[Key.twikooNotConfigured]:
		"Twikoo-Kommentarsystem ist noch nicht konfiguriert",
	[Key.twikooConfigHint]:
		"Bitte konfigurieren Sie das Twikoo-Kommentarsystem in src/config.ts",
	[Key.twikooPrivacyRejected]:
		"Das Twikoo-Kommentarsystem wurde deaktiviert, da die Datenschutzvereinbarung abgelehnt wurde",
};
