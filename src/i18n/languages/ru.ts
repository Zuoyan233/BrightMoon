import Key from "../i18nKey";
import type { Translation } from "../translation";

export const ru: Translation = {
	[Key.home]: "Главная",
	[Key.about]: "О сайте",
	[Key.archive]: "Архив",
	[Key.search]: "Поиск",
	[Key.feedback]: "Обратная связь",
	[Key.other]: "Другое",

	// Заголовок панели перевода
	[Key.translateHeader]: "Выберите язык",

	// Заголовки панели навигации
	[Key.navLinks]: "Ссылки",
	[Key.navMy]: "Моё",
	[Key.navAbout]: "О сайте",
	[Key.sponsors]: "Спонсоры",
	[Key.navOthers]: "Прочее",

	[Key.tags]: "Теги",
	[Key.categories]: "Категории",
	[Key.recentPosts]: "Последние записи",

	// Содержание
	[Key.tocTitle]: "Содержание",

	// Объявление
	[Key.announcement]: "Объявление",
	[Key.announcementClose]: "Закрыть",

	[Key.comments]: "Комментарии",
	[Key.friends]: "Друзья",
	[Key.friendsSubtitle]: "Откройте для себя другие интересные сайты",
	[Key.friendsSearchPlaceholder]: "Поиск по имени или описанию друга...",
	[Key.friendsFilterAll]: "Все",
	[Key.friendsNoResults]: "Друзья не найдены",
	[Key.friendsVisit]: "Посетить",
	[Key.friendsCopyLink]: "Копировать ссылку",
	[Key.friendsCopySuccess]: "Скопировано",
	[Key.friendsTags]: "Теги",
	[Key.untitled]: "Без названия",
	[Key.uncategorized]: "Без категории",
	[Key.noTags]: "Нет тегов",

	[Key.wordCount]: "слово",
	[Key.wordsCount]: "слов",
	[Key.minuteCount]: "минута",
	[Key.minutesCount]: "минут",
	[Key.postCount]: "запись",
	[Key.postsCount]: "записей",

	[Key.appearance]: "Оформление",
	[Key.themeColor]: "Цвет темы",
	[Key.sakuraEffect]: "Эффект сакуры",
	[Key.wavesEffect]: "Эффект волн",
	[Key.wavesPerformanceMode]: "Режим производительности",

	[Key.lightMode]: "Светлая",
	[Key.darkMode]: "Тёмная",
	[Key.systemMode]: "Системная",

	[Key.more]: "Подробнее",

	[Key.author]: "Автор",
	[Key.publishedAt]: "Опубликовано",
	[Key.license]: "Лицензия",
	[Key.anime]: "Аниме",
	[Key.diary]: "Дневник",

	// Страница аниме
	[Key.animeTitle]: "Мой список аниме",
	[Key.animeSubtitle]: "Записываю мой путь в мире аниме",
	[Key.animeStatusWatching]: "Смотрю",
	[Key.animeStatusCompleted]: "Просмотрено",
	[Key.animeStatusPlanned]: "Запланировано",
	[Key.animeStatusOnHold]: "Отложено",
	[Key.animeStatusDropped]: "Брошено",
	[Key.animeFilterAll]: "Все",
	[Key.animeYear]: "Год",
	[Key.animeStudio]: "Студия",
	[Key.animeEmpty]: "Нет данных об аниме",
	[Key.animeEmptyBangumi]:
		"Пожалуйста, проверьте конфигурацию Bangumi или подключение к интернету",
	[Key.animeEmptyBilibili]:
		"Данные Bilibili отсутствуют. Запустите `pnpm run update-bilibili` для получения данных",
	[Key.animeSetBangumiUserId]:
		"Пожалуйста, укажите ваш идентификатор пользователя Bangumi в файле src/config.ts",
	[Key.animeSetBilibiliVmId]:
		"Пожалуйста, укажите ваш vmID Bilibili в файле src/config.ts",
	[Key.animeEmptyLocal]:
		"Пожалуйста, добавьте информацию об аниме в файл src/data/anime.ts",

	// Страница дневника
	[Key.diarySubtitle]: "Делитесь жизнью, где угодно и когда угодно",
	[Key.diaryCount]: "записей в дневнике",
	[Key.diaryReply]: "Ответить",
	[Key.diaryTips]: "Показаны только последние 30 записей",
	[Key.diaryMinutesAgo]: "минут назад",
	[Key.diaryHoursAgo]: "часов назад",
	[Key.diaryDaysAgo]: "дней назад",

	// Страница 404
	[Key.notFound]: "404",
	[Key.notFoundTitle]: "Страница не найдена",
	[Key.notFoundDescription]:
		"К сожалению, запрашиваемая страница не существует или была перемещена.",
	[Key.backToHome]: "На главную",

	// Музыкальный плеер
	[Key.musicPlayer]: "Музыкальный плеер",
	[Key.musicPlayerShow]: "Показать плеер",
	[Key.musicPlayerHide]: "Скрыть плеер",
	[Key.musicPlayerExpand]: "Развернуть плеер",
	[Key.musicPlayerCollapse]: "Свернуть плеер",
	[Key.musicPlayerPause]: "Пауза",
	[Key.musicPlayerPlay]: "Воспроизвести",
	[Key.musicPlayerPrevious]: "Предыдущий",
	[Key.musicPlayerNext]: "Следующий",
	[Key.musicPlayerShuffle]: "Перемешать",
	[Key.musicPlayerRepeat]: "Повторять все",
	[Key.musicPlayerRepeatOne]: "Повторять один",
	[Key.musicPlayerVolume]: "Регулировка громкости",
	[Key.musicPlayerProgress]: "Прогресс воспроизведения",
	[Key.musicPlayerCover]: "Обложка",
	[Key.musicPlayerPlaylist]: "Плейлист",
	[Key.musicPlayerLoading]: "Загрузка...",
	[Key.musicPlayerErrorPlaylist]: "Не удалось загрузить плейлист",
	[Key.musicPlayerErrorSong]:
		"Не удалось загрузить текущий трек, пробую следующий",
	[Key.musicPlayerErrorEmpty]: "В плейлисте нет доступных треков",
	[Key.unknownSong]: "Неизвестный трек",
	[Key.unknownArtist]: "Неизвестный исполнитель",

	// Страница альбомов
	[Key.albums]: "Альбомы",
	[Key.albumsSubtitle]: "Запечатлевайте прекрасные моменты жизни",
	[Key.albumsEmpty]: "Нет содержимого",
	[Key.albumsEmptyDesc]:
		"Альбомы ещё не созданы. Добавьте несколько красивых воспоминаний!",
	[Key.albumsBackToList]: "К списку альбомов",
	[Key.albumsPhotoCount]: "фото",
	[Key.albumsPhotosCount]: "фото",
	[Key.hiddenAlbum]: "Скрытый альбом",
	[Key.hideAlbumTip]:
		"Этот альбом настроен как скрытый и не будет отображаться в списке альбомов, но доступ к нему всё ещё можно получить по прямой ссылке",

	// Страница устройств
	[Key.devices]: "Мои устройства",
	[Key.devicesSubtitle]: "Устройства, которые я использую в повседневной жизни",
	[Key.devicesViewDetails]: "Подробнее",

	// Страница проектов
	[Key.projects]: "Проекты",
	[Key.projectsSubtitle]: "Моё портфолио разработки",
	[Key.projectsAll]: "Все",
	[Key.projectsWeb]: "Веб-приложения",
	[Key.projectsMobile]: "Мобильные приложения",
	[Key.projectsDesktop]: "Десктопные приложения",
	[Key.projectsOther]: "Другое",
	[Key.projectTechStack]: "Технологический стек",
	[Key.projectLiveDemo]: "Демо-версия",
	[Key.projectSourceCode]: "Исходный код",
	[Key.projectDescription]: "Описание проекта",
	[Key.projectStatus]: "Статус",
	[Key.projectStatusCompleted]: "Завершён",
	[Key.projectStatusInProgress]: "В процессе",
	[Key.projectStatusPlanned]: "Запланирован",
	[Key.projectsTotal]: "Всего проектов",
	[Key.projectsCompleted]: "Завершено",
	[Key.projectsInProgress]: "В процессе",
	[Key.projectsTechStack]: "Статистика по стекам",
	[Key.projectsFeatured]: "Избранные проекты",
	[Key.projectsPlanned]: "Запланировано",
	[Key.projectsDemo]: "Демо",
	[Key.projectsSource]: "Исходный код",
	[Key.projectsVisit]: "Перейти к проекту",
	[Key.projectsGitHub]: "GitHub",

	// RSS страница
	[Key.rss]: "RSS-лента",
	[Key.rssDescription]: "Подпишитесь на обновления",
	[Key.rssSubtitle]:
		"Подпишитесь на RSS, чтобы мгновенно получать новые статьи и обновления",
	[Key.rssLink]: "Ссылка RSS",
	[Key.rssCopyToReader]: "Скопируйте ссылку в ваш RSS-ридер",
	[Key.rssCopyLink]: "Копировать",
	[Key.rssLatestPosts]: "Последние записи",
	[Key.rssWhatIsRSS]: "Что такое RSS?",
	[Key.rssWhatIsRSSDescription]:
		"RSS (Really Simple Syndication) — это стандартный формат для публикации часто обновляемого контента. С помощью RSS вы можете:",
	[Key.rssBenefit1]:
		"Своевременно получать новый контент сайта без необходимости заходить на него",
	[Key.rssBenefit2]: "Управлять подписками на множество сайтов в одном месте",
	[Key.rssBenefit3]: "Не пропускать важные обновления и статьи",
	[Key.rssBenefit4]: "Наслаждаться чтением без рекламы",
	[Key.rssHowToUse]:
		"Рекомендуется использовать Feedly, Inoreader или другие RSS-ридеры для подписки на этот сайт.",
	[Key.rssCopied]: "Ссылка RSS скопирована в буфер обмена!",
	[Key.rssCopyFailed]: "Не удалось скопировать, скопируйте ссылку вручную",

	// Atom страница
	[Key.atom]: "Atom-лента",
	[Key.atomDescription]: "Подпишитесь на обновления",
	[Key.atomSubtitle]:
		"Подпишитесь на Atom, чтобы мгновенно получать новые статьи и обновления",
	[Key.atomLink]: "Ссылка Atom",
	[Key.atomCopyToReader]: "Скопируйте ссылку в ваш Atom-ридер",
	[Key.atomCopyLink]: "Копировать",
	[Key.atomLatestPosts]: "Последние записи",
	[Key.atomWhatIsAtom]: "Что такое Atom?",
	[Key.atomWhatIsAtomDescription]:
		"Atom (Atom Syndication Format) — это основанный на XML стандарт для описания лент и их элементов. С помощью Atom вы можете:",
	[Key.atomBenefit1]:
		"Своевременно получать новый контент сайта без необходимости заходить на него",
	[Key.atomBenefit2]: "Управлять подписками на множество сайтов в одном месте",
	[Key.atomBenefit3]: "Не пропускать важные обновления и статьи",
	[Key.atomBenefit4]: "Наслаждаться чтением без рекламы",
	[Key.atomHowToUse]:
		"Рекомендуется использовать Feedly, Inoreader или другие Atom-ридеры для подписки на этот сайт.",
	[Key.atomCopied]: "Ссылка Atom скопирована в буфер обмена!",
	[Key.atomCopyFailed]: "Не удалось скопировать, скопируйте ссылку вручную",

	// Режим обоев
	[Key.wallpaperMode]: "Режим обоев",
	[Key.wallpaperBanner]: "Режим баннера",
	[Key.wallpaperFullscreen]: "Полноэкранный режим",
	[Key.wallpaperNone]: "Скрыть обои",
	[Key.wallpaperPosition]: "Позиция обоев",
	[Key.wallpaperPositionTop]: "Сверху",
	[Key.wallpaperPositionCenter]: "По центру",
	[Key.wallpaperPositionBottom]: "Снизу",
	[Key.wallpaperOpacity]: "Непрозрачность",
	[Key.wallpaperBlur]: "Размытие",
	[Key.cardOpacity]: "Непрозрачность карточек",

	// Режим прозрачности панели навигации
	[Key.navbarTransparentMode]: "Стиль панели навигации",
	[Key.navbarTransparentSemi]: "Матовое стекло",
	[Key.navbarTransparentFull]: "Прозрачный",
	[Key.navbarTransparentSemifull]: "Динамический",

	// Страница навыков
	[Key.skills]: "Навыки",
	[Key.skillsSubtitle]: "Мои технические навыки и экспертиза",
	[Key.skillsFrontend]: "Фронтенд-разработка",
	[Key.skillsBackend]: "Бэкенд-разработка",
	[Key.skillsDatabase]: "Базы данных",
	[Key.skillsTools]: "Инструменты разработки",
	[Key.skillsOther]: "Другие навыки",
	[Key.skillLevel]: "Уровень владения",
	[Key.skillLevelBeginner]: "Начальный",
	[Key.skillLevelIntermediate]: "Средний",
	[Key.skillLevelAdvanced]: "Продвинутый",
	[Key.skillLevelExpert]: "Эксперт",
	[Key.skillExperience]: "Опыт",
	[Key.skillYears]: "лет",
	[Key.skillMonths]: "мес.",
	[Key.skillsTotal]: "Всего навыков",
	[Key.skillsExpert]: "Уровень эксперта",
	[Key.skillsAdvanced]: "Продвинутый",
	[Key.skillsIntermediate]: "Средний",
	[Key.skillsBeginner]: "Начальный",
	[Key.skillsAdvancedTitle]: "Профессиональные навыки",
	[Key.skillsProjects]: "Связанные проекты",
	[Key.skillsDistribution]: "Распределение навыков",
	[Key.skillsByLevel]: "По уровню",
	[Key.skillsByCategory]: "По категориям",
	[Key.noData]: "Нет данных",

	// Страница хронологии
	[Key.timeline]: "Хронология",
	[Key.timelineSubtitle]: "Мой путь роста и важные вехи",
	[Key.timelineEducation]: "Образование",
	[Key.timelineWork]: "Опыт работы",
	[Key.timelineProject]: "Опыт проектов",
	[Key.timelineAchievement]: "Достижения",
	[Key.timelinePresent]: "Настоящее время",
	[Key.timelineLocation]: "Местоположение",
	[Key.timelineDescription]: "Подробное описание",
	[Key.timelineMonths]: "мес.",
	[Key.timelineYears]: "лет",
	[Key.timelineTotal]: "Всего",
	[Key.timelineProjects]: "Проектов",
	[Key.timelineExperience]: "Опыт работы",
	[Key.timelineCurrent]: "Текущий статус",
	[Key.timelineHistory]: "История",
	[Key.timelineAchievements]: "Достижения",
	[Key.timelineStartDate]: "Дата начала",
	[Key.timelineDuration]: "Продолжительность",

	// Страница обратной связи - Модуль связи с веб-мастером
	[Key.contactMe]: "Связаться с веб-мастером",
	[Key.contactEmail]: "Связаться с веб-мастером по электронной почте",
	[Key.contactSocialFriends]:
		"Связаться с веб-мастером, добавив его в друзья в соцсетях",
	[Key.addFriends]: "Добавить в друзья",

	// Страница спонсорства
	[Key.sponsorsNotice1]:
		"Если материалы сайта оказались для вас полезны, пожалуйста, поддержите мою работу, используя один из способов ниже. Это поможет создавать более качественный контент. Все пожертвования будут направлены на поддержку сайта, оплату сервера и создание контента.",
	[Key.sponsorsNotice2]: "Спасибо за поддержку развития блога BrightMoon!",
	[Key.wechatPay]: "WeChat",
	[Key.aliPay]: "Alipay",
	[Key.scanPayQRcode]: "Сканируйте для оплаты",
	[Key.sponsorsPartner]: "Партнёры-спонсоры",
	[Key.otherSupportOptions]: "Другие способы поддержки",
	[Key.shareBlog]: "Поделиться моим блогом с друзьями",
	[Key.leaveComment]: "Оставьте своё мнение в разделе комментариев под статьёй",
	[Key.subscribeToArticles]:
		"Подпишитесь на RSS и Atom, чтобы получать новые статьи",

	// Защита паролем
	[Key.passwordProtected]: "Защищено паролем",
	[Key.passwordProtectedTitle]: "Этот контент защищён паролем",
	[Key.passwordProtectedDescription]:
		"Пожалуйста, введите пароль для просмотра защищённого контента",
	[Key.passwordPlaceholder]: "Введите пароль",
	[Key.passwordUnlock]: "Разблокировать",
	[Key.passwordUnlocking]: "Разблокировка...",
	[Key.passwordIncorrect]: "Неверный пароль, попробуйте снова",
	[Key.passwordDecryptError]:
		"Ошибка расшифровки, проверьте правильность пароля",
	[Key.passwordRequired]: "Пожалуйста, введите пароль",
	[Key.passwordVerifying]: "Проверка...",
	[Key.passwordDecryptFailed]: "Ошибка расшифровки, проверьте пароль",
	[Key.passwordDecryptRetry]: "Ошибка расшифровки, попробуйте снова",
	[Key.passwordUnlockButton]: "Разблокировать",
	[Key.copyFailed]: "Ошибка копирования:",
	[Key.syntaxHighlightFailed]: "Ошибка подсветки синтаксиса:",
	[Key.autoSyntaxHighlightFailed]:
		"Автоматическая подсветка синтаксиса также не удалась:",
	[Key.decryptionError]: "Произошла ошибка при расшифровке:",

	// Карточка времени последнего изменения
	[Key.lastModifiedPrefix]: "Время с момента последнего редактирования: ",
	[Key.lastModifiedOutdated]: "Некоторая информация может быть устаревшей",
	[Key.year]: "г",
	[Key.month]: "мес",
	[Key.day]: "д",
	[Key.hour]: "ч",
	[Key.minute]: "мин",
	[Key.second]: "с",

	// Статистика сайта
	[Key.siteStats]: "Статистика сайта",
	[Key.siteStatsPostCount]: "Записей",
	[Key.siteStatsCategoryCount]: "Категорий",
	[Key.siteStatsTagCount]: "Тегов",
	[Key.siteStatsTotalWords]: "Всего слов",
	[Key.siteStatsRunningDays]: "Дней работы",
	[Key.siteStatsLastUpdate]: "Последняя активность",
	[Key.siteStatsDaysAgo]: "{days} дн. назад",
	[Key.siteStatsDays]: "{days} дн.",
	[Key.siteStatsCurrentDate]: "Дата",
	[Key.siteStatsDateFormat]: "{month}/{day}/{year}",
	[Key.siteStatsCurrentTime]: "Время",
	[Key.siteStatsTimePeriodMorning]: "Утро",
	[Key.siteStatsTimePeriodNoon]: "Полдень",
	[Key.siteStatsTimePeriodAfternoon]: "День",
	[Key.siteStatsTimePeriodEvening]: "Вечер",
	[Key.siteStatsTimePeriodNight]: "Ночь",
	[Key.siteStatsAm]: "AM",
	[Key.siteStatsPm]: "PM",
	[Key.siteStatsSeason]: "Сезон",
	[Key.siteStatsSeasonSpring]: "Весна",
	[Key.siteStatsSeasonSummer]: "Лето",
	[Key.siteStatsSeasonAutumn]: "Осень",
	[Key.siteStatsSeasonWinter]: "Зима",

	// Компонент календаря
	[Key.calendarSunday]: "Вс",
	[Key.calendarMonday]: "Пн",
	[Key.calendarTuesday]: "Вт",
	[Key.calendarWednesday]: "Ср",
	[Key.calendarThursday]: "Чт",
	[Key.calendarFriday]: "Пт",
	[Key.calendarSaturday]: "Сб",
	[Key.calendarJanuary]: "Янв",
	[Key.calendarFebruary]: "Фев",
	[Key.calendarMarch]: "Мар",
	[Key.calendarApril]: "Апр",
	[Key.calendarMay]: "Май",
	[Key.calendarJune]: "Июн",
	[Key.calendarJuly]: "Июл",
	[Key.calendarAugust]: "Авг",
	[Key.calendarSeptember]: "Сен",
	[Key.calendarOctober]: "Окт",
	[Key.calendarNovember]: "Ноя",
	[Key.calendarDecember]: "Дек",

	// Функция поделиться
	[Key.shareArticle]: "Поделиться",
	[Key.generatingPoster]: "Создание постера...",
	[Key.copied]: "Скопировано",
	[Key.copyLink]: "Копировать ссылку",
	[Key.savePoster]: "Сохранить постер",
	[Key.scanToRead]: "Сканируйте для чтения",
	[Key.shareOnSocial]: "Поделиться",
	[Key.shareOnSocialDescription]:
		"Если эта статья помогла вам, пожалуйста, поделитесь ею с другими!",

	// Статистика профиля
	[Key.profileStatsLoading]: "Загрузка статистики...",
	[Key.profileStatsPageViews]: "Просмотров страниц",
	[Key.profileStatsVisits]: "Посещений",
	[Key.profileStatsUnavailable]: "Статистика недоступна",

	// Статистика просмотров страниц
	[Key.pageViewsLoading]: "Загрузка статистики...",
	[Key.pageViewsUnavailable]: "Статистика недоступна",

	// Макет списка записей
	[Key.postListLayout]: "Макет списка записей",
	[Key.listMode]: "Список",
	[Key.gridMode]: "Сетка",

	// Предупреждение о внешней ссылке
	[Key.leaveSite]: "Покинуть сайт",
	[Key.goToExternalLink]: "Вы собираетесь перейти по внешней ссылке:",
	[Key.warningText]:
		"Пожалуйста, будьте осторожны с безопасностью вашего аккаунта и средств",
	[Key.confirmText]: "Перейти",
	[Key.cancelText]: "Отмена",

	// Добавить друзей в социальных сетях
	[Key.contactMethod1]: "Wechat",
	[Key.contactMethod2]: "QQ",
	[Key.contactMethod3]: "Telegram",
	[Key.scanContact1]: "Отсканируйте QR-код, чтобы добавить друга в WeChat",
	[Key.scanContact2]: "Отсканируйте QR-код, чтобы добавить друга в QQ",
	[Key.scanContact3]: "Отсканируйте QR-код, чтобы добавить друга в Telegram",

	// Компонент погоды
	[Key.weather]: "Погода",
	[Key.weatherNoApiKey]: "Добавьте ключ WeatherAPI в src/config.ts",
	[Key.weatherLocationDisabled]:
		"Служба определения местоположения для погоды отключена из-за отказа от соглашения о конфиденциальности",
	[Key.weatherWaitingConsent]:
		"Ожидание авторизации определения местоположения для погоды...",
	[Key.weatherLoading]: "Загрузка погоды...",
	[Key.weatherLoadFailed]: "Ошибка загрузки",
	[Key.weatherRetry]: "Повторить",
	[Key.weatherSearchPlaceholder]: "Поиск города...",
	[Key.weatherHumidity]: "Влажность",
	[Key.weatherWind]: "Ветер",
	[Key.weatherFeelsLike]: "Ощущается",
	[Key.weatherUV]: "УФ-индекс",
	[Key.weatherVisibility]: "Видимость",
	[Key.weatherForecast]: "Прогноз на 7 дней",
	[Key.weatherToday]: "Сегодня",
	[Key.weatherHigh]: "Макс",
	[Key.weatherLow]: "Мин",
	[Key.weatherCelsius]: "°C",
	[Key.weatherFahrenheit]: "°F",
	[Key.weatherKmh]: "км/ч",
	[Key.weatherMph]: "миль/ч",
	[Key.weatherChangeLocation]: "Сменить город",
	[Key.weatherDetectLocation]: "Определить местоположение",

	// Погодные условия
	[Key.weatherCondSunny]: "Ясно",
	[Key.weatherCondPartlyCloudy]: "Переменная облачность",
	[Key.weatherCondCloudy]: "Облачно",
	[Key.weatherCondFog]: "Туман",
	[Key.weatherCondDrizzle]: "Морось",
	[Key.weatherCondRain]: "Дождь",
	[Key.weatherCondHeavyRain]: "Сильный дождь",
	[Key.weatherCondSnow]: "Снег",
	[Key.weatherCondHeavySnow]: "Снегопад",
	[Key.weatherCondSleet]: "Дождь со снегом",
	[Key.weatherCondThunderstorm]: "Гроза",
	[Key.weatherCondHail]: "Град",
	[Key.weatherCondDust]: "Пыль",

	// Согласие на использование cookie
	[Key.cookieConsentTitle]: "Мы ценим вашу конфиденциальность",
	[Key.cookieConsentDescription]:
		"BrightMoon использует файлы cookie для хранения и доступа к идентификаторам устройств и другим данным для предоставления, поддержки и улучшения наших услуг и рекламы. Вы можете выбрать «Принять», чтобы дать согласие, или нажать «Отклонить все», чтобы отказаться от несущественных файлов cookie.",
	[Key.cookieConsentIpInfo]: "Определение вашего местоположения...",
	[Key.cookieConsentAccept]: "Принять",
	[Key.cookieConsentReject]: "Отклонить все",

	// Система комментариев Twikoo
	[Key.twikooInitializing]: "Инициализация системы комментариев Twikoo...",
	[Key.twikooNotConfigured]: "Система комментариев Twikoo еще не настроена",
	[Key.twikooConfigHint]:
		"Пожалуйста, настройте систему комментариев Twikoo в src/config.ts",
	[Key.twikooPrivacyRejected]:
		"Система комментариев Twikoo отключена из-за отказа от соглашения о конфиденциальности",
};
