import Key from "../i18nKey";
import type { Translation } from "../translation";

export const fr: Translation = {
	[Key.home]: "Accueil",
	[Key.about]: "À propos",
	[Key.archive]: "Archives",
	[Key.search]: "Rechercher",
	[Key.feedback]: "Retour",
	[Key.other]: "Autre",

	// Titre du panneau de traduction
	[Key.translateHeader]: "Choisir la langue",

	// Titres de la barre de navigation
	[Key.navLinks]: "Liens",
	[Key.navMy]: "Mon espace",
	[Key.navAbout]: "À propos",
	[Key.sponsors]: "Sponsors",
	[Key.navOthers]: "Autres",

	[Key.tags]: "Tags",
	[Key.categories]: "Catégories",
	[Key.recentPosts]: "Articles récents",

	// Table des matières
	[Key.tocTitle]: "Table des matières",

	// Annonce
	[Key.announcement]: "Annonce",
	[Key.announcementClose]: "Fermer",

	[Key.comments]: "Commentaires",
	[Key.friends]: "Amis",
	[Key.friendsSubtitle]: "Découvrez d'autres sites web exceptionnels",
	[Key.friendsSearchPlaceholder]:
		"Rechercher un nom ou une description d'ami...",
	[Key.friendsFilterAll]: "Tous",
	[Key.friendsNoResults]: "Aucun ami correspondant trouvé",
	[Key.friendsVisit]: "Visiter",
	[Key.friendsCopyLink]: "Copier le lien",
	[Key.friendsCopySuccess]: "Copié",
	[Key.friendsTags]: "Tags",
	[Key.untitled]: "Sans titre",
	[Key.uncategorized]: "Non catégorisé",
	[Key.noTags]: "Aucun tag",

	[Key.wordCount]: "mot",
	[Key.wordsCount]: "mots",
	[Key.minuteCount]: "minute",
	[Key.minutesCount]: "minutes",
	[Key.postCount]: "article",
	[Key.postsCount]: "articles",

	[Key.appearance]: "Apparence",
	[Key.themeSwitch]: "Changer de thème",
	[Key.themeColor]: "Couleur du thème",
	[Key.sakuraEffect]: "Effet Sakura",
	[Key.wavesEffect]: "Effet de vagues",
	[Key.wavesPerformanceMode]: "Mode performance",

	[Key.lightMode]: "Clair",
	[Key.darkMode]: "Sombre",
	[Key.systemMode]: "Système",

	[Key.more]: "Plus",

	[Key.author]: "Auteur",
	[Key.publishedAt]: "Publié le",
	[Key.license]: "Licence",
	[Key.anime]: "Anime",
	[Key.diary]: "Journal",

	// Page Anime
	[Key.animeTitle]: "Ma liste d'anime",
	[Key.animeSubtitle]: "Enregistrer mon parcours anime",
	[Key.animeStatusWatching]: "En cours",
	[Key.animeStatusCompleted]: "Terminé",
	[Key.animeStatusPlanned]: "Planifié",
	[Key.animeStatusOnHold]: "En pause",
	[Key.animeStatusDropped]: "Abandonné",
	[Key.animeFilterAll]: "Tous",
	[Key.animeYear]: "Année",
	[Key.animeStudio]: "Studio",
	[Key.animeEmpty]: "Aucune donnée d'anime disponible",
	[Key.animeEmptyBangumi]:
		"Veuillez vérifier la configuration de Bangumi ou la connexion réseau",
	[Key.animeEmptyBilibili]:
		"Les données Bilibili sont vides. Veuillez exécuter `pnpm run update-bilibili` pour obtenir les données",
	[Key.animeSetBangumiUserId]:
		"Veuillez définir votre ID utilisateur Bangumi dans le fichier src/config/user.ts",
	[Key.animeSetBilibiliVmId]:
		"Veuillez définir votre vmID Bilibili dans le fichier src/config/user.ts",
	[Key.animeEmptyLocal]:
		"Veuillez ajouter les informations d'anime dans le fichier src/data/anime.ts",

	// Page Journal
	[Key.diarySubtitle]: "Partager la vie, à tout moment, n'importe où",
	[Key.diaryCount]: "entrées de journal",
	[Key.diaryReply]: "Répondre",
	[Key.diaryTips]: "Affiche uniquement les 30 dernières entrées du journal",
	[Key.diaryMinutesAgo]: "minutes",
	[Key.diaryHoursAgo]: "heures",
	[Key.diaryDaysAgo]: "jours",

	// Page 404
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "Page non trouvée",
	[Key.notFoundDescription]:
		"Désolé, la page que vous avez visitée n'existe pas ou a été déplacée.",
	[Key.backToHome]: "Retour à l'accueil",

	// Lecteur audio
	[Key.musicPlayer]: "Lecteur audio",
	[Key.musicPlayerShow]: "Afficher le lecteur audio",
	[Key.musicPlayerHide]: "Masquer le lecteur audio",
	[Key.musicPlayerExpand]: "Agrandir le lecteur audio",
	[Key.musicPlayerCollapse]: "Réduire le lecteur audio",
	[Key.musicPlayerPause]: "Pause",
	[Key.musicPlayerPlay]: "Lire",
	[Key.musicPlayerPrevious]: "Précédent",
	[Key.musicPlayerNext]: "Suivant",
	[Key.musicPlayerShuffle]: "Aléatoire",
	[Key.musicPlayerRepeat]: "Répéter tout",
	[Key.musicPlayerRepeatOne]: "Répéter un",
	[Key.musicPlayerVolume]: "Contrôle du volume",
	[Key.musicPlayerMute]: "Muet",
	[Key.musicPlayerUnmute]: "Réactiver le son",
	[Key.musicPlayerProgress]: "Progression de la lecture",
	[Key.musicPlayerCover]: "Couverture",
	[Key.musicPlayerPlaylist]: "Liste de lecture",
	[Key.musicPlayerLoading]: "Chargement...",
	[Key.musicPlayerErrorPlaylist]:
		"Échec de la récupération de la liste de lecture",
	[Key.musicPlayerErrorSong]:
		"Échec du chargement de la chanson en cours, tentative suivante",
	[Key.musicPlayerErrorEmpty]:
		"Aucune chanson disponible dans la liste de lecture",
	[Key.musicPlayerLyrics]: "Paroles",
	[Key.musicPlayerLyricsShow]: "Afficher les paroles",
	[Key.musicPlayerLyricsHide]: "Masquer les paroles",
	[Key.musicPlayerNoLyrics]: "Pas de paroles disponibles",
	[Key.musicPlayerLocateCurrent]: "Aller à la piste en cours",
	[Key.unknownSong]: "Chanson inconnue",
	[Key.unknownArtist]: "Artiste inconnu",

	// Page Albums
	[Key.albums]: "Albums",
	[Key.albumsSubtitle]: "Enregistrer les beaux moments de la vie",
	[Key.albumsEmpty]: "Aucun contenu",
	[Key.albumsEmptyDesc]:
		"Aucun album n'a encore été créé. Allez ajouter de beaux souvenirs !",
	[Key.albumsBackToList]: "Retour aux albums",
	[Key.albumsPhotoCount]: "photo",
	[Key.albumsPhotosCount]: "photos",
	[Key.hiddenAlbum]: "Album caché",
	[Key.hideAlbumTip]:
		"Cet album est réglé sur masqué et n'apparaîtra pas dans la liste des albums, mais il reste accessible via un lien direct",

	// Page Appareils
	[Key.devices]: "Mes appareils",
	[Key.devicesSubtitle]:
		"Voici les appareils que j'utilise dans ma vie quotidienne",
	[Key.devicesViewDetails]: "Voir les détails",

	// Page Projets
	[Key.projects]: "Projets",
	[Key.projectsSubtitle]: "Mon portfolio de projets de développement",
	[Key.projectsAll]: "Tous",
	[Key.projectsWeb]: "Applications web",
	[Key.projectsMobile]: "Applications mobiles",
	[Key.projectsDesktop]: "Applications de bureau",
	[Key.projectsOther]: "Autre",
	[Key.projectTechStack]: "Stack technique",
	[Key.projectLiveDemo]: "Démo en ligne",
	[Key.projectSourceCode]: "Code source",
	[Key.projectDescription]: "Description du projet",
	[Key.projectStatus]: "Statut",
	[Key.projectStatusCompleted]: "Terminé",
	[Key.projectStatusInProgress]: "En cours",
	[Key.projectStatusPlanned]: "Planifié",
	[Key.projectsTotal]: "Total des projets",
	[Key.projectsCompleted]: "Terminés",
	[Key.projectsInProgress]: "En cours",
	[Key.projectsTechStack]: "Statistiques des stacks techniques",
	[Key.projectsFeatured]: "Projets en vedette",
	[Key.projectsPlanned]: "Planifiés",
	[Key.projectsDemo]: "Démo en ligne",
	[Key.projectsSource]: "Code source",
	[Key.projectsVisit]: "Visiter le projet",
	[Key.projectsGitHub]: "GitHub",

	// Page RSS
	[Key.rss]: "Flux RSS",
	[Key.rssDescription]: "Abonnez-vous pour recevoir les dernières mises à jour",
	[Key.rssSubtitle]:
		"Abonnez-vous via RSS pour recevoir immédiatement les derniers articles et mises à jour",
	[Key.rssLink]: "Lien RSS",
	[Key.rssCopyToReader]: "Copier le lien dans votre lecteur RSS",
	[Key.rssCopyLink]: "Copier",
	[Key.rssLatestPosts]: "Derniers articles",
	[Key.rssWhatIsRSS]: "Qu'est-ce que RSS ?",
	[Key.rssWhatIsRSSDescription]:
		"RSS (Really Simple Syndication) est un format standard pour publier du contenu fréquemment mis à jour. Avec RSS, vous pouvez :",
	[Key.rssBenefit1]:
		"Obtenir les derniers contenus du site en temps réel sans avoir à visiter manuellement",
	[Key.rssBenefit2]: "Gérer les abonnements à plusieurs sites au même endroit",
	[Key.rssBenefit3]:
		"Éviter de manquer des mises à jour et des articles importants",
	[Key.rssBenefit4]:
		"Profiter d'une expérience de lecture sans publicité et épurée",
	[Key.rssHowToUse]:
		"Il est recommandé d'utiliser Feedly, Inoreader ou d'autres lecteurs RSS pour vous abonner à ce site.",
	[Key.rssCopied]: "Lien RSS copié dans le presse-papiers",
	[Key.rssCopyFailed]:
		"Échec de la copie, veuillez copier le lien manuellement",

	// Page Atom
	[Key.atom]: "Flux Atom",
	[Key.atomDescription]:
		"Abonnez-vous pour recevoir les dernières mises à jour",
	[Key.atomSubtitle]:
		"Abonnez-vous via Atom pour recevoir immédiatement les derniers articles et mises à jour",
	[Key.atomLink]: "Lien Atom",
	[Key.atomCopyToReader]: "Copier le lien dans votre lecteur Atom",
	[Key.atomCopyLink]: "Copier",
	[Key.atomLatestPosts]: "Derniers articles",
	[Key.atomWhatIsAtom]: "Qu'est-ce que Atom ?",
	[Key.atomWhatIsAtomDescription]:
		"Atom (Atom Syndication Format) est un standard basé sur XML pour décrire des flux et leurs éléments. Avec Atom, vous pouvez :",
	[Key.atomBenefit1]:
		"Obtenir les derniers contenus du site en temps réel sans avoir à visiter manuellement",
	[Key.atomBenefit2]: "Gérer les abonnements à plusieurs sites au même endroit",
	[Key.atomBenefit3]:
		"Éviter de manquer des mises à jour et des articles importants",
	[Key.atomBenefit4]:
		"Profiter d'une expérience de lecture sans publicité et épurée",
	[Key.atomHowToUse]:
		"Il est recommandé d'utiliser Feedly, Inoreader ou d'autres lecteurs Atom pour vous abonner à ce site.",
	[Key.atomCopied]: "Lien Atom copié dans le presse-papiers",
	[Key.atomCopyFailed]:
		"Échec de la copie, veuillez copier le lien manuellement",

	// Mode fond d'écran
	[Key.wallpaperMode]: "Mode fond d'écran",
	[Key.wallpaperBanner]: "Mode bannière",
	[Key.wallpaperFullscreen]: "Mode plein écran",
	[Key.wallpaperNone]: "Masquer le fond d'écran",
	[Key.wallpaperPosition]: "Position du fond d'écran",
	[Key.wallpaperPositionTop]: "Haut",
	[Key.wallpaperPositionCenter]: "Centre",
	[Key.wallpaperPositionBottom]: "Bas",
	[Key.wallpaperOpacity]: "Opacité de l'arrière-plan",
	[Key.wallpaperBlur]: "Flou de l'arrière-plan",
	[Key.cardOpacity]: "Opacité des cartes",

	// Mode barre de navigation transparente
	[Key.navbarTransparentMode]: "Style de la barre de navigation",
	[Key.navbarTransparentSemi]: "Verre dépoli",
	[Key.navbarTransparentFull]: "Transparent",
	[Key.navbarTransparentSemifull]: "Dynamique",

	// Page Compétences
	[Key.skills]: "Compétences",
	[Key.skillsSubtitle]: "Mes compétences techniques et mon expertise",
	[Key.skillsFrontend]: "Développement frontend",
	[Key.skillsBackend]: "Développement backend",
	[Key.skillsDatabase]: "Base de données",
	[Key.skillsTools]: "Outils de développement",
	[Key.skillsOther]: "Autres compétences",
	[Key.skillLevel]: "Niveau",
	[Key.skillLevelBeginner]: "Débutant",
	[Key.skillLevelIntermediate]: "Intermédiaire",
	[Key.skillLevelAdvanced]: "Avancé",
	[Key.skillLevelExpert]: "Expert",
	[Key.skillExperience]: "Expérience",
	[Key.skillYears]: "ans",
	[Key.skillMonths]: "mois",
	[Key.skillsTotal]: "Compétences totales",
	[Key.skillsExpert]: "Niveau expert",
	[Key.skillsAdvanced]: "Avancé",
	[Key.skillsIntermediate]: "Intermédiaire",
	[Key.skillsBeginner]: "Débutant",
	[Key.skillsAdvancedTitle]: "Compétences professionnelles",
	[Key.skillsProjects]: "Projets associés",
	[Key.skillsDistribution]: "Répartition des compétences",
	[Key.skillsByLevel]: "Par niveau",
	[Key.skillsByCategory]: "Par catégorie",
	[Key.noData]: "Aucune donnée",

	// Page Chronologie
	[Key.timeline]: "Chronologie",
	[Key.timelineSubtitle]:
		"Mon parcours de croissance et mes étapes importantes",
	[Key.timelineEducation]: "Formation",
	[Key.timelineWork]: "Expérience professionnelle",
	[Key.timelineProject]: "Expérience projet",
	[Key.timelineAchievement]: "Réalisations",
	[Key.timelinePresent]: "Présent",
	[Key.timelineLocation]: "Lieu",
	[Key.timelineDescription]: "Description détaillée",
	[Key.timelineMonths]: "mois",
	[Key.timelineYears]: "ans",
	[Key.timelineTotal]: "Total",
	[Key.timelineProjects]: "Projets",
	[Key.timelineExperience]: "Expérience professionnelle",
	[Key.timelineCurrent]: "Situation actuelle",
	[Key.timelineHistory]: "Historique",
	[Key.timelineAchievements]: "Réalisations",
	[Key.timelineStartDate]: "Date de début",
	[Key.timelineDuration]: "Durée",

	// Page Retour - Module Contacter le webmaster
	[Key.contactMe]: "Contacter le webmaster",
	[Key.contactEmail]: "Contacter le webmaster par e-mail",
	[Key.contactSocialFriends]:
		"Contacter le webmaster en l'ajoutant comme ami sur les réseaux sociaux",
	[Key.addFriends]: "Ajouter un ami maintenant",

	// Page Sponsoring
	[Key.sponsorsNotice1]:
		"Si vous trouvez le contenu du site utile, veuillez soutenir mon travail par les moyens suivants pour m'aider à créer un meilleur contenu. Tous les parrainages seront utilisés pour la maintenance du site, les coûts des serveurs et la création de contenu.",
	[Key.sponsorsNotice2]:
		"Merci de soutenir le développement du contenu du blog BrightMoon !",
	[Key.wechatPay]: "WeChat",
	[Key.aliPay]: "Alipay",
	[Key.scanPayQRcode]: "Scanner pour payer",
	[Key.sponsorsPartner]: "Partenaires sponsors",
	[Key.otherSupportOptions]: "Autres moyens de soutien",
	[Key.shareBlog]: "Partager mon blog avec plus d'amis",
	[Key.leaveComment]:
		"Laissez votre avis dans la section des commentaires sous l'article",
	[Key.subscribeToArticles]:
		"Abonnez-vous à RSS et Atom pour recevoir les derniers articles",

	// Protection par mot de passe
	[Key.passwordProtected]: "Protégé par mot de passe",
	[Key.passwordProtectedTitle]: "Ce contenu est protégé par mot de passe",
	[Key.passwordProtectedDescription]:
		"Veuillez entrer le mot de passe pour voir le contenu protégé",
	[Key.passwordPlaceholder]: "Entrer le mot de passe",
	[Key.passwordUnlock]: "Déverrouiller",
	[Key.passwordUnlocking]: "Déverrouillage...",
	[Key.passwordIncorrect]: "Mot de passe incorrect, veuillez réessayer",
	[Key.passwordDecryptError]:
		"Échec du déchiffrement, veuillez vérifier si le mot de passe est correct",
	[Key.passwordRequired]: "Veuillez entrer le mot de passe",
	[Key.passwordVerifying]: "Vérification...",
	[Key.passwordDecryptFailed]:
		"Échec du déchiffrement, veuillez vérifier le mot de passe",
	[Key.passwordDecryptRetry]: "Échec du déchiffrement, veuillez réessayer",
	[Key.passwordUnlockButton]: "Déverrouiller",
	[Key.passwordHintLabel]: "Indice du mot de passe",
	[Key.copyFailed]: "Échec de la copie :",
	[Key.syntaxHighlightFailed]: "Échec de la coloration syntaxique :",
	[Key.autoSyntaxHighlightFailed]:
		"La coloration syntaxique automatique a également échoué :",
	[Key.decryptionError]: "Une erreur s'est produite lors du déchiffrement :",

	// Carte de dernière modification
	[Key.lastModifiedPrefix]: "Temps depuis la dernière modification : ",
	[Key.lastModifiedOutdated]: "Certaines informations peuvent être obsolètes",
	[Key.year]: "a",
	[Key.month]: "m",
	[Key.day]: "j",
	[Key.hour]: "h",
	[Key.minute]: "min",
	[Key.second]: "s",

	// Statistiques du site
	[Key.siteStats]: "Statistiques du site",
	[Key.siteStatsPostCount]: "Articles",
	[Key.siteStatsCategoryCount]: "Catégories",
	[Key.siteStatsTagCount]: "Tags",
	[Key.siteStatsTotalWords]: "Nombre total de mots",
	[Key.siteStatsRunningDays]: "Jours de fonctionnement",
	[Key.siteStatsLastUpdate]: "Dernière activité",
	[Key.siteStatsDaysAgo]: "il y a {days} jours",
	[Key.siteStatsDays]: "{days} jours",
	[Key.siteStatsCurrentDate]: "Date",
	[Key.siteStatsDateFormat]: "{month}/{day}/{year}",
	[Key.siteStatsCurrentTime]: "Heure",
	[Key.siteStatsTimePeriodMorning]: "Matin",
	[Key.siteStatsTimePeriodNoon]: "Midi",
	[Key.siteStatsTimePeriodAfternoon]: "Après-midi",
	[Key.siteStatsTimePeriodEvening]: "Soirée",
	[Key.siteStatsTimePeriodNight]: "Nuit",
	[Key.siteStatsAm]: "AM",
	[Key.siteStatsPm]: "PM",
	[Key.siteStatsSeason]: "Saison",
	[Key.siteStatsSeasonSpring]: "Printemps",
	[Key.siteStatsSeasonSummer]: "Été",
	[Key.siteStatsSeasonAutumn]: "Automne",
	[Key.siteStatsSeasonWinter]: "Hiver",

	// Composant Calendrier
	[Key.calendarPrevMonth]: "Mois précédent",
	[Key.calendarNextMonth]: "Mois suivant",
	[Key.calendarBackToToday]: "Revenir à aujourd'hui",
	[Key.calendarSunday]: "Dim",
	[Key.calendarMonday]: "Lun",
	[Key.calendarTuesday]: "Mar",
	[Key.calendarWednesday]: "Mer",
	[Key.calendarThursday]: "Jeu",
	[Key.calendarFriday]: "Ven",
	[Key.calendarSaturday]: "Sam",
	[Key.calendarJanuary]: "Jan",
	[Key.calendarFebruary]: "Fév",
	[Key.calendarMarch]: "Mar",
	[Key.calendarApril]: "Avr",
	[Key.calendarMay]: "Mai",
	[Key.calendarJune]: "Juin",
	[Key.calendarJuly]: "Juil",
	[Key.calendarAugust]: "Aoû",
	[Key.calendarSeptember]: "Sep",
	[Key.calendarOctober]: "Oct",
	[Key.calendarNovember]: "Nov",
	[Key.calendarDecember]: "Déc",

	// Fonctionnalité de partage
	[Key.shareArticle]: "Partager",
	[Key.generatingPoster]: "Génération de l'affiche...",
	[Key.copied]: "Copié",
	[Key.copyLink]: "Copier le lien",
	[Key.savePoster]: "Enregistrer l'affiche",
	[Key.scanToRead]: "Scanner pour lire",
	[Key.shareOnSocial]: "Partager",
	[Key.shareOnSocialDescription]:
		"Si cet article vous a aidé, veuillez le partager avec d'autres !",

	// Statistiques du profil
	[Key.profileStatsLoading]: "Chargement des statistiques...",
	[Key.profileStatsPageViews]: "Vues de page",
	[Key.profileStatsVisits]: "Visites",
	[Key.profileStatsUnavailable]: "Statistiques indisponibles",

	// Statistiques des vues de page
	[Key.pageViewsLoading]: "Chargement des statistiques...",
	[Key.pageViewsUnavailable]: "Statistiques indisponibles",

	// Mise en page des articles
	[Key.postListLayout]: "Mise en page des articles",
	[Key.listMode]: "Liste",
	[Key.gridMode]: "Grille",

	// Avertissement de lien externe
	[Key.leaveSite]: "Quitter ce site",
	[Key.goToExternalLink]: "Vous allez visiter un lien externe :",
	[Key.warningText]:
		"Soyez attentif à la sécurité de votre compte et de vos actifs",
	[Key.confirmText]: "Continuer la visite",
	[Key.cancelText]: "Annuler",

	// Ajouter des amis sur les réseaux sociaux
	[Key.copyAccount]: "Copier le compte",
	[Key.copyAccountSuccess]: "Copié dans le presse-papiers",
	[Key.openAppAdd]: "Ouvrir dans l'application",

	// Composant météo
	[Key.weather]: "Météo",
	[Key.weatherNoApiKey]:
		"Veuillez ajouter la clé WeatherAPI dans src/config/user.ts",
	[Key.weatherLocationDisabled]:
		"Le service de localisation météo a été désactivé en raison du refus de l'accord de confidentialité",
	[Key.weatherWaitingConsent]:
		"En attente de l'autorisation de localisation météo...",
	[Key.weatherDefaultLocationHint]:
		"Consentement refusé, utilisation de l'emplacement par défaut pour la météo",
	[Key.weatherDefaultLocationConfirm]: "OK",
	[Key.weatherLoading]: "Chargement de la météo...",
	[Key.weatherLoadFailed]: "Échec du chargement",
	[Key.weatherRetry]: "Réessayer",
	[Key.weatherSearchPlaceholder]: "Rechercher une ville...",
	[Key.weatherHumidity]: "Humidité",
	[Key.weatherWind]: "Vent",
	[Key.weatherFeelsLike]: "Ressenti",
	[Key.weatherUV]: "Indice UV",
	[Key.weatherVisibility]: "Visibilité",
	[Key.weatherForecast]: "Prévisions météo",
	[Key.weatherToday]: "Aujourd'hui",
	[Key.weatherHigh]: "Max",
	[Key.weatherLow]: "Min",
	[Key.weatherCelsius]: "°C",
	[Key.weatherFahrenheit]: "°F",
	[Key.weatherKmh]: "km/h",
	[Key.weatherMph]: "mph",
	[Key.weatherChangeLocation]: "Changer le lieu",
	[Key.weatherDetectLocation]: "Détecter le lieu",

	// Conditions météorologiques
	[Key.weatherCondSunny]: "Ensoleillé",
	[Key.weatherCondPartlyCloudy]: "Partiellement nuageux",
	[Key.weatherCondCloudy]: "Nuageux",
	[Key.weatherCondFog]: "Brouillard",
	[Key.weatherCondDrizzle]: "Bruine",
	[Key.weatherCondRain]: "Pluie",
	[Key.weatherCondHeavyRain]: "Pluie forte",
	[Key.weatherCondSnow]: "Neige",
	[Key.weatherCondHeavySnow]: "Fortes chutes de neige",
	[Key.weatherCondSleet]: "Grésil",
	[Key.weatherCondThunderstorm]: "Orage",
	[Key.weatherCondHail]: "Grêle",
	[Key.weatherCondDust]: "Poussière",

	// Consentement des cookies
	[Key.cookieConsentTitle]: "Nous Respectons Votre Vie Privée",
	[Key.cookieConsentDescription]:
		'BrightMoon utilise des cookies pour stocker et accéder aux identifiants d\'appareils et autres données afin de fournir, maintenir et améliorer nos services et publicités. Vous pouvez choisir "Accepter" pour consentir à ces utilisations, ou cliquer sur "Tout Refuser" pour refuser les cookies non essentiels.',
	[Key.cookieConsentIpInfo]: "Détection de votre localisation...",
	[Key.cookieConsentIpTimeout]:
		"Détection de localisation expirée, veuillez réessayer plus tard",
	[Key.cookieConsentAccept]: "Accepter",
	[Key.cookieConsentReject]: "Tout Refuser",

	// Système de commentaires Twikoo
	[Key.twikooInitializing]:
		"Initialisation du système de commentaires Twikoo...",
	[Key.twikooNotConfigured]:
		"Le système de commentaires Twikoo n'est pas encore configuré",
	[Key.twikooConfigHint]:
		"Veuillez configurer le système de commentaires Twikoo dans src/config/user.ts",
	[Key.twikooPrivacyRejected]:
		"Le système de commentaires Twikoo a été désactivé en raison du refus de l'accord de confidentialité",

	// Vérification de version
	[Key.versionCheck]: "Vérifier les mises à jour",
	[Key.versionLatest]: "À jour",
	[Key.versionNewVersion]: "Nouvelle version disponible",
	[Key.versionChecking]: "Vérification...",
	[Key.versionCheckError]: "Échec de la vérification",
	[Key.versionPreRelease]: "Bêta",
	[Key.versionCheckFailedTitle]: "Échec de la vérification",
	[Key.versionCheckFailedDesc]:
		"Impossible de vérifier les mises à jour, généralement en raison de la limitation de débit de l'API du dépôt distant ou de l'absence d'adresse API du dépôt distant. Veuillez réessayer plus tard",
	[Key.versionCheckSuccessTitle]: "Vérification réussie",
	[Key.versionCheckSuccessDesc]:
		"Aucune nouvelle version trouvée. Vous êtes à jour",
	[Key.versionDownload]: "Télécharger la dernière version",
	[Key.versionUpdateWarning]:
		"Il est recommandé d'utiliser l'outil de mise à jour du framework de blog BrightMoon. Veuillez sauvegarder vos données avant la mise à jour",

	// Fil d'Ariane
	[Key.suggestion]: "Vous aimerez peut-être visiter",
	[Key.navBack]: "Revenir à la page précédente",
	[Key.navForward]: "Aller à la page suivante",

	// Bouton "Retour en haut"
	[Key.backToTop]: "Retour en haut",
};
