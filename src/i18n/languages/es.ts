import Key from "../i18nKey";
import type { Translation } from "../translation";

export const es: Translation = {
	[Key.home]: "Inicio",
	[Key.about]: "Acerca de",
	[Key.archive]: "Archivo",
	[Key.search]: "Buscar",
	[Key.feedback]: "Comentarios",
	[Key.other]: "Otros",

	// Título del panel de traducción
	[Key.translateHeader]: "Seleccionar idioma",

	// Títulos de la barra de navegación
	[Key.navLinks]: "Enlaces",
	[Key.navMy]: "Mis",
	[Key.navAbout]: "Acerca de",
	[Key.sponsors]: "Patrocinadores",
	[Key.navOthers]: "Otros",

	[Key.tags]: "Etiquetas",
	[Key.categories]: "Categorías",
	[Key.recentPosts]: "Publicaciones recientes",

	// Tabla de contenidos
	[Key.tocTitle]: "Tabla de contenidos",

	// Anuncio
	[Key.announcement]: "Anuncio",
	[Key.announcementClose]: "Cerrar",

	[Key.comments]: "Comentarios",
	[Key.friends]: "Amigos",
	[Key.friendsSubtitle]: "Descubre más sitios web increíbles",
	[Key.friendsSearchPlaceholder]: "Buscar por nombre o descripción...",
	[Key.friendsFilterAll]: "Todos",
	[Key.friendsNoResults]: "No se encontraron amigos",
	[Key.friendsVisit]: "Visitar",
	[Key.friendsCopyLink]: "Copiar enlace",
	[Key.friendsCopySuccess]: "¡Copiado!",
	[Key.friendsTags]: "Etiquetas",
	[Key.untitled]: "Sin título",
	[Key.uncategorized]: "Sin categoría",
	[Key.noTags]: "Sin etiquetas",

	[Key.wordCount]: "palabra",
	[Key.wordsCount]: "palabras",
	[Key.minuteCount]: "minuto",
	[Key.minutesCount]: "minutos",
	[Key.postCount]: "publicación",
	[Key.postsCount]: "publicaciones",

	[Key.appearance]: "Apariencia",
	[Key.themeColor]: "Color del tema",
	[Key.sakuraEffect]: "Efecto Sakura",
	[Key.wavesEffect]: "Efecto de olas",
	[Key.wavesPerformanceMode]: "Modo de rendimiento",

	[Key.lightMode]: "Claro",
	[Key.darkMode]: "Oscuro",
	[Key.systemMode]: "Sistema",

	[Key.more]: "Más",

	[Key.author]: "Autor",
	[Key.publishedAt]: "Publicado el",
	[Key.license]: "Licencia",
	[Key.anime]: "Anime",
	[Key.diary]: "Diario",

	// Página de Anime
	[Key.animeTitle]: "Mi lista de anime",
	[Key.animeSubtitle]: "Registro de mi viaje por el anime",
	[Key.animeStatusWatching]: "Viendo",
	[Key.animeStatusCompleted]: "Completado",
	[Key.animeStatusPlanned]: "Planeado",
	[Key.animeStatusOnHold]: "En pausa",
	[Key.animeStatusDropped]: "Abandonado",
	[Key.animeFilterAll]: "Todos",
	[Key.animeYear]: "Año",
	[Key.animeStudio]: "Estudio",
	[Key.animeEmpty]: "No hay datos de anime disponibles",
	[Key.animeEmptyBangumi]:
		"Por favor, verifica la configuración de Bangumi o la conexión de red",
	[Key.animeEmptyBilibili]:
		"Los datos de Bilibili están vacíos. Ejecuta `pnpm run update-bilibili` para obtenerlos",
	[Key.animeSetBangumiUserId]:
		"Por favor, establece tu ID de usuario de Bangumi en el archivo src/config.ts",
	[Key.animeSetBilibiliVmId]:
		"Por favor, establece tu vmID de Bilibili en el archivo src/config.ts",
	[Key.animeEmptyLocal]:
		"Por favor, añade información de anime en el archivo src/data/anime.ts",

	// Página de Diario
	[Key.diarySubtitle]: "Comparte la vida, en cualquier momento y lugar",
	[Key.diaryCount]: "entradas de diario",
	[Key.diaryReply]: "Responder",
	[Key.diaryTips]: "Solo se muestran las últimas 30 entradas",
	[Key.diaryMinutesAgo]: "minutos atrás",
	[Key.diaryHoursAgo]: "horas atrás",
	[Key.diaryDaysAgo]: "días atrás",

	// Página 404
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "Página no encontrada",
	[Key.notFoundDescription]:
		"Lo sentimos, la página que visitaste no existe o ha sido movida.",
	[Key.backToHome]: "Volver al inicio",

	// Reproductor de música
	[Key.musicPlayer]: "Reproductor de música",
	[Key.musicPlayerShow]: "Mostrar reproductor",
	[Key.musicPlayerHide]: "Ocultar reproductor",
	[Key.musicPlayerExpand]: "Expandir reproductor",
	[Key.musicPlayerCollapse]: "Colapsar reproductor",
	[Key.musicPlayerPause]: "Pausar",
	[Key.musicPlayerPlay]: "Reproducir",
	[Key.musicPlayerPrevious]: "Anterior",
	[Key.musicPlayerNext]: "Siguiente",
	[Key.musicPlayerShuffle]: "Aleatorio",
	[Key.musicPlayerRepeat]: "Repetir todo",
	[Key.musicPlayerRepeatOne]: "Repetir una",
	[Key.musicPlayerVolume]: "Control de volumen",
	[Key.musicPlayerProgress]: "Progreso de reproducción",
	[Key.musicPlayerCover]: "Portada",
	[Key.musicPlayerPlaylist]: "Lista de reproducción",
	[Key.musicPlayerLoading]: "Cargando...",
	[Key.musicPlayerErrorPlaylist]: "Error al obtener la lista de reproducción",
	[Key.musicPlayerErrorSong]:
		"Error al cargar la canción, probando con la siguiente",
	[Key.musicPlayerErrorEmpty]: "No hay canciones disponibles en la lista",
	[Key.unknownSong]: "Canción desconocida",
	[Key.unknownArtist]: "Artista desconocido",

	// Página de Álbumes
	[Key.albums]: "Álbumes",
	[Key.albumsSubtitle]: "Registra los momentos hermosos de la vida",
	[Key.albumsEmpty]: "Sin contenido",
	[Key.albumsEmptyDesc]:
		"Aún no se ha creado ningún álbum. ¡Agrega algunos recuerdos hermosos!",
	[Key.albumsBackToList]: "Volver a los álbumes",
	[Key.albumsPhotoCount]: "foto",
	[Key.albumsPhotosCount]: "fotos",
	[Key.hiddenAlbum]: "Álbum oculto",
	[Key.hideAlbumTip]:
		"Este álbum está configurado como oculto y no aparecerá en la lista de álbumes, pero se puede acceder a él mediante un enlace directo",

	// Página de Dispositivos
	[Key.devices]: "Mis dispositivos",
	[Key.devicesSubtitle]: "Estos son los dispositivos que uso en mi día a día",
	[Key.devicesViewDetails]: "Ver detalles",

	// Página de Proyectos
	[Key.projects]: "Proyectos",
	[Key.projectsSubtitle]: "Mi portafolio de proyectos de desarrollo",
	[Key.projectsAll]: "Todos",
	[Key.projectsWeb]: "Aplicaciones web",
	[Key.projectsMobile]: "Aplicaciones móviles",
	[Key.projectsDesktop]: "Aplicaciones de escritorio",
	[Key.projectsOther]: "Otros",
	[Key.projectTechStack]: "Tecnologías",
	[Key.projectLiveDemo]: "Demo en vivo",
	[Key.projectSourceCode]: "Código fuente",
	[Key.projectDescription]: "Descripción del proyecto",
	[Key.projectStatus]: "Estado",
	[Key.projectStatusCompleted]: "Completado",
	[Key.projectStatusInProgress]: "En progreso",
	[Key.projectStatusPlanned]: "Planeado",
	[Key.projectsTotal]: "Total de proyectos",
	[Key.projectsCompleted]: "Completados",
	[Key.projectsInProgress]: "En progreso",
	[Key.projectsTechStack]: "Estadísticas de tecnologías",
	[Key.projectsFeatured]: "Proyectos destacados",
	[Key.projectsPlanned]: "Planeados",
	[Key.projectsDemo]: "Demo en vivo",
	[Key.projectsSource]: "Código fuente",
	[Key.projectsVisit]: "Visitar proyecto",
	[Key.projectsGitHub]: "GitHub",

	// Página RSS
	[Key.rss]: "Feed RSS",
	[Key.rssDescription]: "Suscríbete para recibir las últimas actualizaciones",
	[Key.rssSubtitle]:
		"Suscríbete vía RSS para obtener los últimos artículos y actualizaciones al instante",
	[Key.rssLink]: "Enlace RSS",
	[Key.rssCopyToReader]: "Copia el enlace a tu lector RSS",
	[Key.rssCopyLink]: "Copiar",
	[Key.rssLatestPosts]: "Últimas publicaciones",
	[Key.rssWhatIsRSS]: "¿Qué es RSS?",
	[Key.rssWhatIsRSSDescription]:
		"RSS (Really Simple Syndication) es un formato estándar para publicar contenido actualizado con frecuencia. Con RSS puedes:",
	[Key.rssBenefit1]:
		"Obtener contenido nuevo del sitio web sin necesidad de visitarlo manualmente",
	[Key.rssBenefit2]:
		"Gestionar suscripciones de múltiples sitios en un solo lugar",
	[Key.rssBenefit3]: "No perderte actualizaciones y artículos importantes",
	[Key.rssBenefit4]:
		"Disfrutar de una experiencia de lectura limpia y sin anuncios",
	[Key.rssHowToUse]:
		"Se recomienda usar Feedly, Inoreader u otros lectores RSS para suscribirse a este sitio.",
	[Key.rssCopied]: "¡Enlace RSS copiado al portapapeles!",
	[Key.rssCopyFailed]: "Error al copiar, por favor copia el enlace manualmente",

	// Página Atom
	[Key.atom]: "Feed Atom",
	[Key.atomDescription]: "Suscríbete para recibir las últimas actualizaciones",
	[Key.atomSubtitle]:
		"Suscríbete vía Atom para obtener los últimos artículos y actualizaciones al instante",
	[Key.atomLink]: "Enlace Atom",
	[Key.atomCopyToReader]: "Copia el enlace a tu lector Atom",
	[Key.atomCopyLink]: "Copiar",
	[Key.atomLatestPosts]: "Últimas publicaciones",
	[Key.atomWhatIsAtom]: "¿Qué es Atom?",
	[Key.atomWhatIsAtomDescription]:
		"Atom (Atom Syndication Format) es un estándar basado en XML para describir feeds y sus elementos. Con Atom puedes:",
	[Key.atomBenefit1]:
		"Obtener contenido nuevo del sitio web sin necesidad de visitarlo manualmente",
	[Key.atomBenefit2]:
		"Gestionar suscripciones de múltiples sitios en un solo lugar",
	[Key.atomBenefit3]: "No perderte actualizaciones y artículos importantes",
	[Key.atomBenefit4]:
		"Disfrutar de una experiencia de lectura limpia y sin anuncios",
	[Key.atomHowToUse]:
		"Se recomienda usar Feedly, Inoreader u otros lectores Atom para suscribirse a este sitio.",
	[Key.atomCopied]: "¡Enlace Atom copiado al portapapeles!",
	[Key.atomCopyFailed]:
		"Error al copiar, por favor copia el enlace manualmente",

	// Modo de fondo de pantalla
	[Key.wallpaperMode]: "Modo de fondo de pantalla",
	[Key.wallpaperBanner]: "Modo banner",
	[Key.wallpaperFullscreen]: "Modo pantalla completa",
	[Key.wallpaperNone]: "Ocultar fondo de pantalla",
	[Key.wallpaperPosition]: "Posición del fondo de pantalla",
	[Key.wallpaperPositionTop]: "Superior",
	[Key.wallpaperPositionCenter]: "Centro",
	[Key.wallpaperPositionBottom]: "Inferior",
	[Key.wallpaperOpacity]: "Opacidad",
	[Key.wallpaperBlur]: "Desenfoque",
	[Key.cardOpacity]: "Opacidad de tarjetas",

	// Modo de barra de navegación transparente
	[Key.navbarTransparentMode]: "Estilo de la barra de navegación",
	[Key.navbarTransparentSemi]: "Esmerilado",
	[Key.navbarTransparentFull]: "Transparente",
	[Key.navbarTransparentSemifull]: "Dinámico",

	// Página de Habilidades
	[Key.skills]: "Habilidades",
	[Key.skillsSubtitle]: "Mis habilidades técnicas y experiencia",
	[Key.skillsFrontend]: "Desarrollo frontend",
	[Key.skillsBackend]: "Desarrollo backend",
	[Key.skillsDatabase]: "Base de datos",
	[Key.skillsTools]: "Herramientas de desarrollo",
	[Key.skillsOther]: "Otras habilidades",
	[Key.skillLevel]: "Nivel",
	[Key.skillLevelBeginner]: "Principiante",
	[Key.skillLevelIntermediate]: "Intermedio",
	[Key.skillLevelAdvanced]: "Avanzado",
	[Key.skillLevelExpert]: "Experto",
	[Key.skillExperience]: "Experiencia",
	[Key.skillYears]: "años",
	[Key.skillMonths]: "meses",
	[Key.skillsTotal]: "Total de habilidades",
	[Key.skillsExpert]: "Nivel experto",
	[Key.skillsAdvanced]: "Avanzado",
	[Key.skillsIntermediate]: "Intermedio",
	[Key.skillsBeginner]: "Principiante",
	[Key.skillsAdvancedTitle]: "Habilidades profesionales",
	[Key.skillsProjects]: "Proyectos relacionados",
	[Key.skillsDistribution]: "Distribución de habilidades",
	[Key.skillsByLevel]: "Por nivel",
	[Key.skillsByCategory]: "Por categoría",
	[Key.noData]: "Sin datos",

	// Página de Línea de tiempo
	[Key.timeline]: "Línea de tiempo",
	[Key.timelineSubtitle]: "Mi viaje de crecimiento e hitos importantes",
	[Key.timelineEducation]: "Educación",
	[Key.timelineWork]: "Experiencia laboral",
	[Key.timelineProject]: "Experiencia en proyectos",
	[Key.timelineAchievement]: "Logros",
	[Key.timelinePresent]: "Actualidad",
	[Key.timelineLocation]: "Ubicación",
	[Key.timelineDescription]: "Descripción detallada",
	[Key.timelineMonths]: "meses",
	[Key.timelineYears]: "años",
	[Key.timelineTotal]: "Total",
	[Key.timelineProjects]: "Proyectos",
	[Key.timelineExperience]: "Experiencia laboral",
	[Key.timelineCurrent]: "Estado actual",
	[Key.timelineHistory]: "Historial",
	[Key.timelineAchievements]: "Logros",
	[Key.timelineStartDate]: "Fecha de inicio",
	[Key.timelineDuration]: "Duración",

	// Página de Comentarios - Módulo de contacto con el webmaster
	[Key.contactMe]: "Contactar al webmaster",
	[Key.contactEmail]: "Contacta al webmaster por correo electrónico",
	[Key.contactSocialFriends]:
		"Contacta al webmaster agregándolo como amigo en redes sociales",
	[Key.addFriends]: "Agregar amigo ahora",

	// Página de Patrocinios
	[Key.sponsorsNotice1]:
		"Si encuentras útil el contenido del sitio web, por favor apoya mi trabajo a través de los siguientes métodos para ayudar a crear mejor contenido. Todos los patrocinios se utilizarán para el mantenimiento del sitio web, costos de servidor y creación de contenido.",
	[Key.sponsorsNotice2]:
		"¡Gracias por apoyar el desarrollo del contenido del blog BrightMoon!",
	[Key.wechatPay]: "WeChat",
	[Key.aliPay]: "Alipay",
	[Key.scanPayQRcode]: "Escanear para pagar",
	[Key.sponsorsPartner]: "Socios patrocinadores",
	[Key.otherSupportOptions]: "Otras formas de apoyo",
	[Key.shareBlog]: "Comparte mi blog con más amigos",
	[Key.leaveComment]:
		"Deja tus comentarios en la sección de comentarios debajo del artículo",
	[Key.subscribeToArticles]:
		"Suscríbete a RSS y Atom para obtener los últimos artículos",

	// Protección por contraseña
	[Key.passwordProtected]: "Protegido con contraseña",
	[Key.passwordProtectedTitle]: "Este contenido está protegido con contraseña",
	[Key.passwordProtectedDescription]:
		"Por favor, introduce la contraseña para ver el contenido protegido",
	[Key.passwordPlaceholder]: "Introducir contraseña",
	[Key.passwordUnlock]: "Desbloquear",
	[Key.passwordUnlocking]: "Desbloqueando...",
	[Key.passwordIncorrect]:
		"Contraseña incorrecta, por favor inténtalo de nuevo",
	[Key.passwordDecryptError]:
		"Error de descifrado, por favor verifica si la contraseña es correcta",
	[Key.passwordRequired]: "Por favor, introduce la contraseña",
	[Key.passwordVerifying]: "Verificando...",
	[Key.passwordDecryptFailed]:
		"Error de descifrado, por favor verifica la contraseña",
	[Key.passwordDecryptRetry]:
		"Error de descifrado, por favor inténtalo de nuevo",
	[Key.passwordUnlockButton]: "Desbloquear",
	[Key.copyFailed]: "Error al copiar:",
	[Key.syntaxHighlightFailed]: "Error al resaltar la sintaxis:",
	[Key.autoSyntaxHighlightFailed]:
		"El resaltado automático de sintaxis también falló:",
	[Key.decryptionError]: "Ocurrió un error durante el descifrado:",

	// Tarjeta de última modificación
	[Key.lastModifiedPrefix]: "Tiempo desde la última edición: ",
	[Key.lastModifiedOutdated]:
		"Es posible que parte de la información esté desactualizada",
	[Key.year]: "a",
	[Key.month]: "m",
	[Key.day]: "d",
	[Key.hour]: "h",
	[Key.minute]: "min",
	[Key.second]: "s",

	// Estadísticas del sitio
	[Key.siteStats]: "Estadísticas del sitio",
	[Key.siteStatsPostCount]: "Publicaciones",
	[Key.siteStatsCategoryCount]: "Categorías",
	[Key.siteStatsTagCount]: "Etiquetas",
	[Key.siteStatsTotalWords]: "Total de palabras",
	[Key.siteStatsRunningDays]: "Días en funcionamiento",
	[Key.siteStatsLastUpdate]: "Última actividad",
	[Key.siteStatsDaysAgo]: "hace {days} días",
	[Key.siteStatsDays]: "{days} días",
	[Key.siteStatsCurrentDate]: "Fecha",
	[Key.siteStatsDateFormat]: "{month}/{day}/{year}",
	[Key.siteStatsCurrentTime]: "Hora",
	[Key.siteStatsTimePeriodMorning]: "Mañana",
	[Key.siteStatsTimePeriodNoon]: "Mediodía",
	[Key.siteStatsTimePeriodAfternoon]: "Tarde",
	[Key.siteStatsTimePeriodEvening]: "Atardecer",
	[Key.siteStatsTimePeriodNight]: "Noche",
	[Key.siteStatsAm]: "AM",
	[Key.siteStatsPm]: "PM",
	[Key.siteStatsSeason]: "Estación",
	[Key.siteStatsSeasonSpring]: "Primavera",
	[Key.siteStatsSeasonSummer]: "Verano",
	[Key.siteStatsSeasonAutumn]: "Otoño",
	[Key.siteStatsSeasonWinter]: "Invierno",

	// Componente de calendario
	[Key.calendarSunday]: "Dom",
	[Key.calendarMonday]: "Lun",
	[Key.calendarTuesday]: "Mar",
	[Key.calendarWednesday]: "Mié",
	[Key.calendarThursday]: "Jue",
	[Key.calendarFriday]: "Vie",
	[Key.calendarSaturday]: "Sáb",
	[Key.calendarJanuary]: "Ene",
	[Key.calendarFebruary]: "Feb",
	[Key.calendarMarch]: "Mar",
	[Key.calendarApril]: "Abr",
	[Key.calendarMay]: "May",
	[Key.calendarJune]: "Jun",
	[Key.calendarJuly]: "Jul",
	[Key.calendarAugust]: "Ago",
	[Key.calendarSeptember]: "Sep",
	[Key.calendarOctober]: "Oct",
	[Key.calendarNovember]: "Nov",
	[Key.calendarDecember]: "Dic",

	// Funcionalidad de compartir
	[Key.shareArticle]: "Compartir",
	[Key.generatingPoster]: "Generando póster...",
	[Key.copied]: "Copiado",
	[Key.copyLink]: "Copiar enlace",
	[Key.savePoster]: "Guardar póster",
	[Key.scanToRead]: "Escanear para leer",
	[Key.shareOnSocial]: "Compartir",
	[Key.shareOnSocialDescription]:
		"Si este artículo te ayudó, ¡compártelo con otros!",

	// Estadísticas de perfil
	[Key.profileStatsLoading]: "Cargando estadísticas...",
	[Key.profileStatsPageViews]: "Vistas de página",
	[Key.profileStatsVisits]: "Visitas",
	[Key.profileStatsUnavailable]: "Estadísticas no disponibles",

	// Estadísticas de vistas de página
	[Key.pageViewsLoading]: "Cargando estadísticas...",
	[Key.pageViewsUnavailable]: "Estadísticas no disponibles",

	// Diseño de lista de publicaciones
	[Key.postListLayout]: "Diseño de lista de publicaciones",
	[Key.listMode]: "Lista",
	[Key.gridMode]: "Cuadrícula",

	// Advertencia de enlace externo
	[Key.leaveSite]: "Salir de este sitio",
	[Key.goToExternalLink]: "Estás a punto de visitar un enlace externo:",
	[Key.warningText]: "Por favor, cuida la seguridad de tu cuenta y activos",
	[Key.confirmText]: "Continuar a la visita",
	[Key.cancelText]: "Cancelar",

	// Añadir amigos en redes sociales
	[Key.contactMethod1]: "Wechat",
	[Key.contactMethod2]: "QQ",
	[Key.contactMethod3]: "Telegram",
	[Key.scanContact1]: "Escanea el código QR para añadir un amigo en WeChat",
	[Key.scanContact2]: "Escanea el código QR para añadir un amigo en QQ",
	[Key.scanContact3]: "Escanea el código QR para añadir un amigo en Telegram",

	// Componente del clima
	[Key.weather]: "Clima",
	[Key.weatherNoApiKey]: "Agregue la clave de WeatherAPI en src/config.ts",
	[Key.weatherLocationDisabled]:
		"El servicio de ubicación meteorológica se ha desactivado debido al rechazo del acuerdo de privacidad",
	[Key.weatherWaitingConsent]:
		"Esperando autorización de ubicación meteorológica...",
	[Key.weatherLoading]: "Cargando clima...",
	[Key.weatherLoadFailed]: "Error al cargar",
	[Key.weatherRetry]: "Reintentar",
	[Key.weatherSearchPlaceholder]: "Buscar ciudad...",
	[Key.weatherHumidity]: "Humedad",
	[Key.weatherWind]: "Viento",
	[Key.weatherFeelsLike]: "Sensación térmica",
	[Key.weatherUV]: "Índice UV",
	[Key.weatherVisibility]: "Visibilidad",
	[Key.weatherForecast]: "Pronóstico 7 días",
	[Key.weatherToday]: "Hoy",
	[Key.weatherHigh]: "Máx",
	[Key.weatherLow]: "Mín",
	[Key.weatherCelsius]: "°C",
	[Key.weatherFahrenheit]: "°F",
	[Key.weatherKmh]: "km/h",
	[Key.weatherMph]: "mph",
	[Key.weatherChangeLocation]: "Cambiar ubicación",
	[Key.weatherDetectLocation]: "Detectar ubicación",

	// Condiciones meteorológicas
	[Key.weatherCondSunny]: "Soleado",
	[Key.weatherCondPartlyCloudy]: "Parcialmente nublado",
	[Key.weatherCondCloudy]: "Nublado",
	[Key.weatherCondFog]: "Niebla",
	[Key.weatherCondDrizzle]: "Llovizna",
	[Key.weatherCondRain]: "Lluvia",
	[Key.weatherCondHeavyRain]: "Lluvia intensa",
	[Key.weatherCondSnow]: "Nieve",
	[Key.weatherCondHeavySnow]: "Nevada intensa",
	[Key.weatherCondSleet]: "Aguanieve",
	[Key.weatherCondThunderstorm]: "Tormenta",
	[Key.weatherCondHail]: "Granizo",
	[Key.weatherCondDust]: "Polvo",

	// Consentimiento de cookies
	[Key.cookieConsentTitle]: "Valoramos Tu Privacidad",
	[Key.cookieConsentDescription]:
		'BrightMoon utiliza cookies para almacenar y acceder a identificadores de dispositivos y otros datos para proporcionar, mantener y mejorar nuestros servicios y publicidad. Puedes elegir "Aceptar" para consentir estos usos, o hacer clic en "Rechazar Todo" para rechazar las cookies no esenciales.',
	[Key.cookieConsentIpInfo]: "Detectando tu ubicación...",
	[Key.cookieConsentAccept]: "Aceptar",
	[Key.cookieConsentReject]: "Rechazar Todo",

	// Sistema de comentarios Twikoo
	[Key.twikooInitializing]: "Inicializando el sistema de comentarios Twikoo...",
	[Key.twikooNotConfigured]:
		"El sistema de comentarios Twikoo aún no está configurado",
	[Key.twikooConfigHint]:
		"Por favor, configure el sistema de comentarios Twikoo en src/config.ts",
	[Key.twikooPrivacyRejected]:
		"El sistema de comentarios Twikoo se ha desactivado debido al rechazo del acuerdo de privacidad",
};
