/**
 * BrightMoon 博客框架升级工具
 *
 * 交互式升级流程，支持四语国际化，智能处理保证数据安全：
 *   1. 文件级：新文件插入、旧文件同步删除、受保护文件跳过
 *   2. 版本级：语义化版本比较、防回滚检测
 *   3. 备份级：升级前全项目备份
 *   4. 完整性：下载大小 + SHA256 哈希校验
 */

import { execSync, spawn } from "node:child_process";
import crypto from "node:crypto";
import fs, { createWriteStream } from "node:fs";
import http from "node:http";
import https from "node:https";
import path from "node:path";
import * as readline from "node:readline";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

/* 路径与版本常量 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const { version: LOCAL_VERSION } = JSON.parse(
	fs.readFileSync(path.join(ROOT, "package.json"), "utf-8"),
);

/* 常量 */

/** 远程仓库 API 备用地址 */
const FALLBACK_API_URL =
	"https://api.github.com/repos/Zuoyan233/BrightMoon/releases?per_page=5";

/** 本地升级标识 */
const SOURCE_LOCAL = "local";

/** 交互菜单返回值 */
const BACK = "__back__";

/** HTTP 最大重定向次数 */
const MAX_REDIRECTS = 5;

/** 日志颜色映射 */
const LOG_COLORS = {
	ok: "\x1b[32m",
	error: "\x1b[31m",
	info: "\x1b[36m",
	warn: "\x1b[33m",
	add: "\x1b[32m",
	replace: "\x1b[36m",
};

/* 全局可变状态 */

let lang = "zh";
let currentLangIndex = 0;
let stdinRawEnabled = false;
let isInterrupted = false;
let isInstallingDeps = false;

/** 待清理的临时解压目录 */
let tmpDirToClean = null;
/** 待清理的 update 目录 */
let updateDirToClean = null;
/** 待清理的失败备份文件（仅单个 zip，不包含整个 backup 目录） */
let backupFileToClean = null;
/** 备份过程中的临时文件（_backup_list.txt、_backup.ps1），中断时需清理 */
let backupTempFiles = [];

/** 正在运行的子进程，中断时立即杀掉 */
const runningProcesses = new Set();

/* 国际化字典 */

const I18N_DICT = {
	zh: {
		welcome: "欢迎使用 BrightMoon 博客框架升级工具",
		buildDate: "当前版本",
		copyright: "Copyright © {0} Zuoyan233. All rights reserved.",
		langTitle: "请选择你的语言：",
		langZH: "简体中文",
		langZHTW: "繁體中文",
		langEN: "English",
		langJA: "日本語",
		methodTitle: "升级方式",
		backupRestoreTitle: "备份与恢复",
		backupWarning: "升级前请备份好数据，以免数据发生意外导致丢失",
		methodOnline: "在线下载并自动升级",
		methodLocal: "本地升级",
		tipOnline:
			"将从远程仓库自动下载最新 Release 压缩包到项目根目录，解压后自动完成升级。",
		versionStable: "稳定版",
		versionPre: "预发布版",
		versionManualBackup: "创建备份",
		versionRestoreBackup: "恢复备份",
		versionTitle: "选择版本类型：",
		manualBackupDone: "创建备份完成！",
		backupExists: "检测到已有备份，是否覆盖备份？",
		backupOverwriteYes: "是，覆盖备份",
		backupOverwriteNo: "否，跳过备份",
		noBackupFound: "backup 目录中未找到备份文件",
		selectBackup: "选择要恢复的备份：",
		restoringBackup: "正在从备份恢复...",
		restoreComplete: "备份恢复完成！",
		pressAnyKey: "按任意键继续...",
		tabSelectTip: "↑↓ 选择 | ←→ 切换页面 | Enter 确认 | ESC 返回 | Ctrl+C 取消",
		tipLocal:
			"请将下载的压缩包（.zip）放入项目根目录的「update」文件夹中，本工具将自动解压并完成升级。",
		checkingLocal: "正在检查本地 update 目录...",
		localNotFound: "未找到 update 目录。\n预期路径：{0}",
		localFound: "已找到本地 update 目录。",
		noArchiveFound:
			"update 目录中未找到压缩包（支持 .zip），请将压缩包放入该目录。",
		archiveFound: "已找到压缩包：{0}",
		extractingLocal: "正在解压本地压缩包...",
		cleaningUpdate: "正在清理 update 目录...",
		downloading: "正在从远程仓库下载最新 Release...",
		extracting: "正在解压...",
		analyzing: "正在分析文件级变更...",
		cleaning: "正在清理临时文件...",
		cleaningBackup: "正在清理备份残留...",
		done: "升级完成！",
		doneCheckTip: "请检查项目是否存在未同步的文件，如有问题请提交 Issue 反馈。",
		abort: "操作已取消。",
		upgradeFailed: "升级失败:",
		interrupted: "因中断操作导致升级失败，BrightMoon 博客框架升级工具已退出。",
		cleaned: "已清理",
		skipped: "已跳过",
		cleaningTemp: "正在清理临时文件...",
		cleaningModules: "正在清理 node_modules...",
		installingDeps: "正在安装依赖...",
		manualInstall: "请手动运行 pnpm install 安装依赖。",
		depsInstalled: "依赖安装完成",
		reportTitle: "升级报告",
		protected: "受保护（跳过）",
		fileDelete: "同步删除文件",
		fileAdd: "新增文件",
		replaced: "直接替换",
		configUpgradeTip:
			"src/config.ts 已升级，原文件已备份，请手动迁移原配置，如需回滚请从备份恢复",
		configRestoreTip: "src/config.ts 已恢复为备份版本，请检查配置是否正确",
		configUpgradeNoBackupTip:
			"src/config.ts 已升级，但创建备份未成功，请务必手动备份并迁移原配置",
		rollbackBlocked:
			"检测到回滚操作（目标版本 {0} ≤ 当前版本 {1}），不允许降级升级，已终止。",
		backingUp: "正在创建备份...",
		backupDone: "已备份至 backup/{0}\n",
		backupFailed: "创建备份失败，升级将继续但不提供回滚保障",
		noRelease: "未找到 Release，升级终止。",
		noNewVersion: "目前没有发现新版本，您已是最新版本。",
		noNetwork: "网络连接失败，请检查网络后重试。",
		networkTimeout: "网络请求超时，请检查网络连接后重试。",
		noApiUrl:
			"未配置远程仓库 API 地址（versionCheckConfig.apiUrl 或 FALLBACK_API_URL 地址为空），升级终止。",
		confirmTitle: "确认执行升级？",
		confirmYes: "是，开始升级",
		confirmNo: "否，取消",
		confirmHint: "按 Y 确认 | N 取消 | ESC 返回",
		selectTip: "使用 ↑↓ 方向键选择：Enter 确认 | ESC 返回 | Ctrl+C 取消",
		step: "步骤",
		version: "目标版本",
		newVersionFound: "发现新版本",
		current: "当前",
		zipNotFound:
			"未找到 zip 命令，无法创建备份。请先安装：\n  macOS: xcode-select --install\n  Linux: sudo apt install zip",
		unzipNotFound:
			"未找到 unzip 命令，无法解压升级包。请先安装：\n  macOS: xcode-select --install\n  Linux: sudo apt install unzip",
		sizeMismatch: "下载文件大小校验失败：预期 {0} 字节，实际 {1} 字节",
		hashMismatch: "下载文件哈希校验失败（{0}）：预期 {1}，实际 {2}",
	},
	en: {
		welcome: "Welcome to BrightMoon Blog Framework Upgrade Tool",
		buildDate: "Current Version",
		copyright: "Copyright © {0} Zuoyan233. All rights reserved.",
		langTitle: "Please select your language:",
		langEN: "English",
		langZH: "简体中文",
		langZHTW: "繁體中文",
		langJA: "日本語",
		methodTitle: "Upgrade",
		backupRestoreTitle: "Backup & Restore",
		backupWarning:
			"Please back up your data before upgrading to avoid unexpected data loss",
		methodOnline: "Online download & auto upgrade",
		methodLocal: "Local upgrade",
		tipOnline:
			"The latest Release will be downloaded from the remote repository to the project root, extracted, and upgraded automatically.",
		versionStable: "Stable",
		versionPre: "Pre-release",
		versionManualBackup: "Create Backup",
		versionRestoreBackup: "Restore Backup",
		versionTitle: "Select version type:",
		manualBackupDone: "Backup created!",
		backupExists: "Existing backup found, overwrite the backup?",
		backupOverwriteYes: "Yes, overwrite backup",
		backupOverwriteNo: "No, skip backup",
		noBackupFound: "No backup files found in backup directory",
		selectBackup: "Select a backup to restore:",
		restoringBackup: "Restoring from backup...",
		restoreComplete: "Backup restored!",
		pressAnyKey: "Press any key to continue...",
		tabSelectTip:
			"↑↓ Select | ←→ Switch page | Enter Confirm | ESC Back | Ctrl+C Cancel",
		tipLocal:
			"Please place the downloaded archive (.zip) into the 'update' folder in the project root. This tool will extract it automatically and complete the upgrade.",
		checkingLocal: "Checking local update directory...",
		localNotFound: "Update directory not found.\nExpected path: {0}",
		localFound: "Local update directory found.",
		noArchiveFound:
			"No archive found in update directory (supported: .zip). Please place the archive in that directory.",
		archiveFound: "Archive found: {0}",
		extractingLocal: "Extracting local archive...",
		cleaningUpdate: "Cleaning update directory...",
		downloading: "Downloading latest Release from remote repository...",
		extracting: "Extracting...",
		analyzing: "Analyzing file-level changes...",
		cleaning: "Cleaning up temporary files...",
		cleaningBackup: "Cleaning up backup remnants...",
		done: "Upgrade complete!",
		doneCheckTip:
			"Please check for unsynced files in the project. If you find issues, please submit an Issue.",
		abort: "Operation cancelled.",
		upgradeFailed: "Upgrade failed:",
		interrupted:
			"Upgrade failed due to interruption. BrightMoon Blog Framework Upgrade Tool has exited.",
		cleaned: "Cleaned",
		skipped: "Skipped",
		cleaningTemp: "Cleaning up temporary files...",
		cleaningModules: "Cleaning node_modules...",
		installingDeps: "Installing dependencies...",
		manualInstall: "Please manually run pnpm install to install dependencies.",
		depsInstalled: "Dependencies installed",
		reportTitle: "Upgrade Report",
		protected: "Protected (skipped)",
		fileDelete: "Deleted Files",
		fileAdd: "New Files",
		replaced: "Replaced",
		configUpgradeTip:
			"src/config.ts has been upgraded, original file backed up, please manually migrate your original config, restore from backup if needed",
		configRestoreTip:
			"src/config.ts has been restored to the backup version, please verify your configuration",
		configUpgradeNoBackupTip:
			"src/config.ts has been upgraded, but backup creation failed, please manually back up and migrate your original config",
		rollbackBlocked:
			"Rollback detected (target version {0} ≤ current version {1}), downgrade is not allowed, aborted.",
		backingUp: "Creating backup...",
		backupDone: "Backed up to backup/{0}\n",
		backupFailed:
			"Backup creation failed. Upgrade will continue without rollback safety",
		noRelease: "No Release found. Upgrade aborted.",
		noNewVersion:
			"No new version found. You are already on the latest version.",
		noNetwork: "Network connection failed. Please check and retry.",
		networkTimeout:
			"Network request timed out. Please check your connection and retry.",
		noApiUrl:
			"Remote repository API URL not configured (versionCheckConfig.apiUrl or FALLBACK_API_URL is empty). Upgrade aborted.",
		confirmTitle: "Confirm upgrade?",
		confirmYes: "Yes, start upgrade",
		confirmNo: "No, cancel",
		confirmHint: "Press Y to confirm | N to cancel | ESC to go back",
		selectTip:
			"Use ↑↓ arrow keys to select: Enter to confirm | ESC to go back | Ctrl+C to cancel",
		step: "Step",
		version: "Target Version",
		newVersionFound: "New version found",
		current: "Current",
		zipNotFound:
			"zip command not found, cannot create backup. Please install:\n  macOS: xcode-select --install\n  Linux: sudo apt install zip",
		unzipNotFound:
			"unzip command not found, cannot extract upgrade archive. Please install:\n  macOS: xcode-select --install\n  Linux: sudo apt install unzip",
		sizeMismatch: "Download size mismatch: expected {0} bytes, got {1} bytes",
		hashMismatch: "Download hash mismatch ({0}): expected {1}, got {2}",
	},
	"zh-TW": {
		welcome: "歡迎使用 BrightMoon 博客框架升級工具",
		buildDate: "目前版本",
		copyright: "Copyright © {0} Zuoyan233. All rights reserved.",
		langTitle: "請選擇您的語言：",
		langZH: "简体中文",
		langZHTW: "繁體中文",
		langEN: "English",
		langJA: "日本語",
		methodTitle: "升級方式",
		backupRestoreTitle: "備份與復原",
		backupWarning: "升級前請備份好資料，以免資料發生意外導致遺失",
		methodOnline: "線上下載並自動升級",
		methodLocal: "本機升級",
		tipOnline:
			"將從遠端倉庫自動下載最新 Release 壓縮包到專案根目錄，解壓後自動完成升級。",
		versionStable: "穩定版",
		versionPre: "預發佈版",
		versionManualBackup: "建立備份",
		versionRestoreBackup: "復原備份",
		versionTitle: "選擇版本類型：",
		manualBackupDone: "建立備份完成！",
		backupExists: "偵測到已有備份，是否覆蓋備份？",
		backupOverwriteYes: "是，覆蓋備份",
		backupOverwriteNo: "否，跳過備份",
		noBackupFound: "backup 目錄中未找到備份檔案",
		selectBackup: "選擇要復原的備份：",
		restoringBackup: "正在從備份復原...",
		restoreComplete: "備份復原完成！",
		pressAnyKey: "按任意鍵繼續...",
		tabSelectTip: "↑↓ 選擇 | ←→ 切換頁面 | Enter 確認 | ESC 返回 | Ctrl+C 取消",
		tipLocal:
			"請將下載的壓縮包（.zip）放入專案根目錄的「update」資料夾中，本工具將自動解壓並完成升級。",
		checkingLocal: "正在檢查本機 update 目錄...",
		localNotFound: "未找到 update 目錄。\n預期路徑：{0}",
		localFound: "已找到本機 update 目錄。",
		noArchiveFound:
			"update 目錄中未找到壓縮包（支援 .zip），請將壓縮包放入該目錄。",
		archiveFound: "已找到壓縮包：{0}",
		extractingLocal: "正在解壓本機壓縮包...",
		cleaningUpdate: "正在清理 update 目錄...",
		downloading: "正在從遠端倉庫下載最新 Release...",
		extracting: "正在解壓...",
		analyzing: "正在分析檔案級變更...",
		cleaning: "正在清理暫存檔案...",
		cleaningBackup: "正在清理備份殘留...",
		done: "升級完成！",
		doneCheckTip: "請檢查專案是否存在未同步的檔案，如有問題請提交 Issue 回饋。",
		abort: "操作已取消。",
		upgradeFailed: "升級失敗：",
		interrupted: "因中斷操作導致升級失敗，BrightMoon 博客框架升級工具已退出。",
		cleaned: "已清理",
		skipped: "已跳過",
		cleaningTemp: "正在清理暫存檔案...",
		cleaningModules: "正在清理 node_modules...",
		installingDeps: "正在安裝依賴...",
		manualInstall: "請手動執行 pnpm install 安裝依賴。",
		depsInstalled: "依賴安裝完成",
		reportTitle: "升級報告",
		protected: "受保護（跳過）",
		fileDelete: "同步刪除檔案",
		fileAdd: "新增檔案",
		replaced: "直接替換",
		configUpgradeTip:
			"src/config.ts 已升級，原檔案已備份，請手動遷移原配置，如需回滾請從備份恢復",
		configRestoreTip: "src/config.ts 已復原為備份版本，請檢查配置是否正確",
		configUpgradeNoBackupTip:
			"src/config.ts 已升級，但建立備份未成功，請務必手動備份並遷移原配置",
		rollbackBlocked:
			"偵測到回滾操作（目標版本 {0} ≤ 目前版本 {1}），不允許降級升級，已終止。",
		backingUp: "正在建立備份...",
		backupDone: "已備份至 backup/{0}\n",
		backupFailed: "建立備份失敗，升級將繼續但不提供回滾保障",
		noRelease: "未找到 Release，升級終止。",
		noNewVersion: "目前沒有發現新版本，您已是最新版本。",
		noNetwork: "網路連線失敗，請檢查網路後重試。",
		networkTimeout: "網路請求逾時，請檢查網路連線後重試。",
		noApiUrl:
			"未配置遠端倉庫 API 位址（versionCheckConfig.apiUrl 或 FALLBACK_API_URL 位址為空），升級終止。",
		confirmTitle: "確認執行升級？",
		confirmYes: "是，開始升級",
		confirmNo: "否，取消",
		confirmHint: "按 Y 確認 | N 取消 | ESC 返回",
		selectTip: "使用 ↑↓ 方向鍵選擇：Enter 確認 | ESC 返回 | Ctrl+C 取消",
		step: "步驟",
		version: "目標版本",
		newVersionFound: "發現新版本",
		current: "目前",
		zipNotFound:
			"未找到 zip 命令，無法建立備份。請先安裝：\n  macOS: xcode-select --install\n  Linux: sudo apt install zip",
		unzipNotFound:
			"未找到 unzip 命令，無法解壓升級包。請先安裝：\n  macOS: xcode-select --install\n  Linux: sudo apt install unzip",
		sizeMismatch: "下載檔案大小校驗失敗：預期 {0} 位元組，實際 {1} 位元組",
		hashMismatch: "下載檔案雜湊校驗失敗（{0}）：預期 {1}，實際 {2}",
	},
	ja: {
		welcome: "BrightMoon ブログフレームワークアップグレードツールへようこそ",
		buildDate: "現在のバージョン",
		copyright: "Copyright © {0} Zuoyan233. All rights reserved.",
		langTitle: "言語を選択してください：",
		langZH: "简体中文",
		langZHTW: "繁體中文",
		langEN: "English",
		langJA: "日本語",
		methodTitle: "アップグレード",
		backupRestoreTitle: "バックアップと復元",
		backupWarning:
			"アップグレード前にデータをバックアップし、予期しないデータ損失を防いでください",
		methodOnline: "オンラインダウンロード＆自動アップグレード",
		methodLocal: "ローカルアップグレード",
		tipOnline:
			"リモートリポジトリから最新のReleaseをプロジェクトルートに自動ダウンロードし、展開後アップグレードを完了します。",
		versionStable: "安定版",
		versionPre: "プレリリース版",
		versionManualBackup: "バックアップ作成",
		versionRestoreBackup: "バックアップ復元",
		versionTitle: "バージョンタイプを選択：",
		manualBackupDone: "バックアップ作成完了！",
		backupExists:
			"既存のバックアップが見つかりました。バックアップを上書きしますか？",
		backupOverwriteYes: "はい、バックアップを上書き",
		backupOverwriteNo: "いいえ、バックアップをスキップ",
		noBackupFound: "backup ディレクトリにバックアップファイルが見つかりません",
		selectBackup: "復元するバックアップを選択：",
		restoringBackup: "バックアップから復元中...",
		restoreComplete: "バックアップ復元完了！",
		pressAnyKey: "何かキーを押して続行...",
		tabSelectTip:
			"↑↓ 選択 | ←→ ページ切替 | Enter 確定 | ESC 戻る | Ctrl+C キャンセル",
		tipLocal:
			"ダウンロードしたアーカイブ（.zip）をプロジェクトルートの「update」フォルダに配置してください。本ツールが自動的に展開しアップグレードを完了します。",
		checkingLocal: "ローカル update ディレクトリを確認中...",
		localNotFound: "update ディレクトリが見つかりません。\n想定パス：{0}",
		localFound: "ローカル update ディレクトリが見つかりました。",
		noArchiveFound:
			"update ディレクトリにアーカイブが見つかりません（対応形式：.zip）。アーカイブを配置してください。",
		archiveFound: "アーカイブが見つかりました：{0}",
		extractingLocal: "ローカルアーカイブを展開中...",
		cleaningUpdate: "update ディレクトリをクリーンアップ中...",
		downloading: "リモートリポジトリから最新のReleaseをダウンロード中...",
		extracting: "展開中...",
		analyzing: "ファイルレベルの変更を分析中...",
		cleaning: "一時ファイルをクリーンアップ中...",
		cleaningBackup: "バックアップの残骸をクリーンアップ中...",
		done: "アップグレード完了！",
		doneCheckTip:
			"未同期のファイルがないかプロジェクトを確認してください。問題がある場合は Issue を提出してください。",
		abort: "操作がキャンセルされました。",
		upgradeFailed: "アップグレード失敗：",
		interrupted:
			"中断操作によりアップグレードに失敗しました。BrightMoon ブログフレームワークアップグレードツールは終了しました。",
		cleaned: "クリーンアップ完了",
		skipped: "スキップ",
		cleaningTemp: "一時ファイルをクリーンアップ中...",
		cleaningModules: "node_modules をクリーンアップ中...",
		installingDeps: "依存関係をインストール中...",
		manualInstall:
			"手動で pnpm install を実行して依存関係をインストールしてください。",
		depsInstalled: "依存関係のインストール完了",
		reportTitle: "アップグレードレポート",
		protected: "保護済み（スキップ）",
		fileDelete: "ファイル削除の同期",
		fileAdd: "新規ファイル",
		replaced: "直接置換",
		configUpgradeTip:
			"src/config.ts はアップグレードされました。元のファイルはバックアップ済みです。元の設定を手動で移行してください。ロールバックが必要な場合はバックアップから復元してください",
		configRestoreTip:
			"src/config.ts はバックアップ版に復元されました。設定が正しいか確認してください",
		configUpgradeNoBackupTip:
			"src/config.ts はアップグレードされましたが、バックアップの作成に失敗しました。元の設定を手動でバックアップし、移行してください",
		rollbackBlocked:
			"ロールバックが検出されました（ターゲットバージョン {0} ≤ 現在のバージョン {1}）、ダウングレードは許可されていません、中止しました。",
		backingUp: "バックアップを作成中...",
		backupDone: "backup/{0} にバックアップ済み\n",
		backupFailed:
			"バックアップの作成に失敗しました。アップグレードは続行しますが、ロールバックは保証されません",
		noRelease: "Release が見つかりません。アップグレードを中止しました。",
		noNewVersion:
			"新しいバージョンは見つかりませんでした。最新バージョンをお使いです。",
		noNetwork:
			"ネットワーク接続に失敗しました。接続を確認して再試行してください。",
		networkTimeout:
			"ネットワークリクエストがタイムアウトしました。接続を確認して再試行してください。",
		noApiUrl:
			"リモートリポジトリ API URL が設定されていません（versionCheckConfig.apiUrl または FALLBACK_API_URL が空です）。アップグレードを中止しました。",
		confirmTitle: "アップグレードを実行しますか？",
		confirmYes: "はい、アップグレードを開始",
		confirmNo: "いいえ、キャンセル",
		confirmHint: "Y で確認 | N でキャンセル | ESC で戻る",
		selectTip: "↑↓ キーで選択：Enter で確定 | ESC で戻る | Ctrl+C でキャンセル",
		step: "ステップ",
		version: "ターゲットバージョン",
		newVersionFound: "新バージョンが見つかりました",
		current: "現在",
		zipNotFound:
			"zip コマンドが見つかりません。バックアップを作成できません。先にインストールしてください：\n  macOS: xcode-select --install\n  Linux: sudo apt install zip",
		unzipNotFound:
			"unzip コマンドが見つかりません。アップグレードアーカイブを展開できません。先にインストールしてください：\n  macOS: xcode-select --install\n  Linux: sudo apt install unzip",
		sizeMismatch:
			"ダウンロードファイルサイズ検証失敗：予想 {0} バイト、実際 {1} バイト",
		hashMismatch:
			"ダウンロードファイルハッシュ検証失敗（{0}）：予想 {1}、実際 {2}",
	},
};

/**
 * 国际化翻译函数
 * @param {string} key - 字典键
 * @param {...string} args - 占位符参数（{0}, {1}, ...）
 * @returns {string} 翻译后的字符串
 */
function I18n(key, ...args) {
	let str = I18N_DICT[lang]?.[key] || I18N_DICT.zh[key] || key;
	for (let i = 0; i < args.length; i++) {
		str = str.replace(`{${i}}`, args[i]);
	}
	return str;
}

/* 交互式菜单 */

/** 启用 stdin 原始模式（在整个交互流程中只启用/禁用一次） */
function enableStdinRaw() {
	if (stdinRawEnabled) return;
	readline.emitKeypressEvents(process.stdin);
	process.stdin.setRawMode(true);
	stdinRawEnabled = true;
}

/** 恢复 stdin 原始模式 */
function disableStdinRaw() {
	if (!stdinRawEnabled) return;
	process.stdin.setRawMode(false);
	stdinRawEnabled = false;
}

/**
 * 交互式单选菜单（支持方向键）
 * title/options/tip 可以是字符串或返回字符串的函数（用于动态语言切换）
 * defaultIndex 可选，指定默认选中的选项索引
 * @returns {Promise<number|string>} 选中索引或 BACK
 */
function selectMenu(
	titleOrFn,
	optionsOrFn,
	tipOrFn,
	onChange,
	defaultIndex = 0,
) {
	return new Promise((resolve) => {
		enableStdinRaw();

		let selected = defaultIndex;
		let firstRender = true;
		let cachedOptions = null;

		const resolveTitle = () =>
			typeof titleOrFn === "function" ? titleOrFn() : titleOrFn;
		const resolveOptions = () => {
			if (cachedOptions) return cachedOptions;
			cachedOptions =
				typeof optionsOrFn === "function" ? optionsOrFn() : optionsOrFn;
			return cachedOptions;
		};
		const resolveTip = () =>
			typeof tipOrFn === "function" ? tipOrFn() : tipOrFn;

		const isHeader = (opt) =>
			typeof opt === "object" && opt !== null && opt.header === true;
		const countHeaders = (opts) => opts.filter(isHeader).length;

		selected = (function skipToSelectable(idx, opts, dir) {
			if (opts.length && !isHeader(opts[idx])) return idx;
			let next = idx;
			for (let i = 0; i < opts.length; i++) {
				next = (next + dir + opts.length) % opts.length;
				if (!isHeader(opts[next])) return next;
			}
			return idx;
		})(selected, resolveOptions(), 1);

		function render() {
			const title = resolveTitle();
			const options = resolveOptions();
			const tip = resolveTip();
			const menuLines = 4 + options.length + countHeaders(options);

			if (!firstRender) {
				process.stdout.write(`\x1B[${menuLines}A\x1B[J`);
			}
			firstRender = false;
			console.log(title);
			console.log("");
			for (let i = 0; i < options.length; i++) {
				const opt = options[i];
				if (isHeader(opt)) {
					console.log("");
					console.log(`\x1B[90m${opt.text}\x1B[0m`);
				} else if (i === selected) {
					console.log(`\x1B[7m ▶ ${opt} \x1B[0m`);
				} else {
					console.log(`${opt}`);
				}
			}
			console.log("");
			console.log(`\x1B[90m${tip}\x1B[0m`);
		}

		render();

		function onKeypress(_str, key) {
			const options = resolveOptions();
			if (key.name === "up") {
				do {
					selected = (selected - 1 + options.length) % options.length;
				} while (isHeader(options[selected]));
				if (onChange) onChange(selected);
				render();
			} else if (key.name === "down") {
				do {
					selected = (selected + 1) % options.length;
				} while (isHeader(options[selected]));
				if (onChange) onChange(selected);
				render();
			} else if (key.name === "return") {
				cleanup();
				const opt = options[selected];
				console.log(`\n→ ${typeof opt === "string" ? opt : opt.text}\n`);
				resolve(selected);
			} else if (key.name === "escape") {
				cleanup();
				resolve(BACK);
			} else if (key.ctrl && key.name === "c") {
				cleanup();
				handleInterrupt();
			}
		}

		function cleanup() {
			process.stdin.removeListener("keypress", onKeypress);
		}

		process.stdin.on("keypress", onKeypress);
	});
}

/**
 * 带标签页的交互式单选菜单（支持方向键 + 左右翻页）
 * @param {Array<{title: string, options: Array<string>}>} tabs - 标签页列表
 * @param {string|function} tipOrFn - 提示文字
 * @param {number} defaultTab - 默认标签页索引
 * @returns {Promise<{tab: number, index: number}|string>} 选中结果或 BACK
 */
function tabbedMenu(tabs, tipOrFn, defaultTab = 0) {
	return new Promise((resolve) => {
		enableStdinRaw();

		let currentTab = defaultTab;
		let selected = 0;
		let firstRender = true;
		let prevLines = 0;

		const resolveTip = () =>
			typeof tipOrFn === "function" ? tipOrFn() : tipOrFn;

		function render() {
			const tip = resolveTip();
			const options = tabs[currentTab].options;
			const menuLines = 4 + options.length;

			if (!firstRender) {
				process.stdout.write(`\x1B[${prevLines}A\x1B[J`);
			}
			firstRender = false;
			prevLines = menuLines;

			const tabParts = tabs.map((tab, i) => {
				if (i === currentTab) {
					return `\x1B[7m ${tab.title} \x1B[0m`;
				}
				return ` ${tab.title} `;
			});
			console.log(tabParts.join(" | "));
			console.log("");

			for (let i = 0; i < options.length; i++) {
				if (i === selected) {
					console.log(`\x1B[7m ▶ ${options[i]} \x1B[0m`);
				} else {
					console.log(`${options[i]}`);
				}
			}
			console.log("");
			console.log(`\x1B[90m${tip}\x1B[0m`);
		}

		render();

		function onKeypress(_str, key) {
			const options = tabs[currentTab].options;
			if (key.name === "up") {
				selected = (selected - 1 + options.length) % options.length;
				render();
			} else if (key.name === "down") {
				selected = (selected + 1) % options.length;
				render();
			} else if (key.name === "left") {
				currentTab = (currentTab - 1 + tabs.length) % tabs.length;
				selected = 0;
				render();
			} else if (key.name === "right") {
				currentTab = (currentTab + 1) % tabs.length;
				selected = 0;
				render();
			} else if (key.name === "return") {
				cleanup();
				console.log(`\n→ ${options[selected]}\n`);
				resolve({ tab: currentTab, index: selected });
			} else if (key.name === "escape") {
				cleanup();
				resolve(BACK);
			} else if (key.ctrl && key.name === "c") {
				cleanup();
				handleInterrupt();
			}
		}

		function cleanup() {
			process.stdin.removeListener("keypress", onKeypress);
		}

		process.stdin.on("keypress", onKeypress);
	});
}

/**
 * 简单确认（支持 ESC 返回）
 * @returns {Promise<boolean|string>} true / false / BACK
 */
function confirm(title, yesText, noText) {
	return new Promise((resolve) => {
		enableStdinRaw();

		console.log(`${title}`);
		console.log(`[Y] ${yesText}`);
		console.log(`[N] ${noText}`);
		process.stdout.write("> ");
		console.log(`\n\n\x1b[90m${I18n("confirmHint")}\x1b[0m`);
		process.stdout.write("\x1B[3A"); // 回到 "> " 行
		process.stdout.write("\x1B[2C"); // 右移 2 格到 "> " 后面

		function cleanup() {
			process.stdin.removeListener("keypress", onKeypress);
		}

		function onKeypress(_str, key) {
			const a = key.name?.toLowerCase();
			if (a === "y") {
				cleanup();
				process.stdout.write("y");
				process.stdout.write("\n\x1B[2K");
				process.stdout.write("\n\x1B[2K");
				resolve(true);
			} else if (a === "n") {
				cleanup();
				process.stdout.write("n");
				process.stdout.write("\n");
				process.stdout.write("\x1B[2K");
				process.stdout.write("\n");
				process.stdout.write("\x1B[2K");
				console.log(`\x1b[90m${I18n("confirmHint")}\x1b[0m`);
				resolve(false);
			} else if (key.name === "escape") {
				cleanup();
				resolve(BACK);
			} else if (key.ctrl && key.name === "c") {
				cleanup();
				handleInterrupt();
			}
		}

		process.stdin.on("keypress", onKeypress);
	});
}

/**
 * 等待用户按任意键继续
 * @returns {Promise<void>}
 */
function waitForKeypress() {
	return new Promise((resolve) => {
		console.log(`\x1b[90m${I18n("pressAnyKey")}\x1b[0m`);
		function onKeypress() {
			process.stdin.removeListener("keypress", onKeypress);
			resolve();
		}
		process.stdin.on("keypress", onKeypress);
	});
}

/* 子进程管理 */

/**
 * 以异步 spawn 执行命令，加入 runningProcesses 跟踪
 * 按 Ctrl+C 时可立即 kill 子进程，无需等它执行完
 * @returns {Promise<string>} stdout 输出
 */
function runAsync(cmd, args, options = {}) {
	return new Promise((resolve, reject) => {
		const child = spawn(cmd, args, { windowsHide: true, ...options });
		runningProcesses.add(child);
		let stdout = "";
		let stderr = "";
		child.stdout?.on("data", (d) => {
			stdout += d;
		});
		child.stderr?.on("data", (d) => {
			stderr += d;
		});
		child.on("close", (code, signal) => {
			runningProcesses.delete(child);
			if (code === 0) resolve(stdout);
			else if (signal === "SIGINT" || signal === "SIGTERM") {
				reject(new Error(`killed by ${signal}`));
			} else {
				const err = new Error(`Process exited with code ${code}`);
				err.code = code;
				err.stderr = stderr;
				reject(err);
			}
		});
		child.on("error", (err) => {
			runningProcesses.delete(child);
			reject(err);
		});
	});
}

/* 清理与退出 */

/** DEBUG 模式下输出错误信息 */
function debugLog(context, e) {
	if (process.env.DEBUG) console.error(`[${context}]`, e?.message ?? e);
}

/** 清理临时解压目录 */
function cleanupTempDir() {
	if (!tmpDirToClean) return;
	const dir = tmpDirToClean;
	tmpDirToClean = null;
	if (fs.existsSync(dir)) {
		try {
			console.log(I18n("cleaningTemp"));
			fs.rmSync(dir, { recursive: true, force: true });
			console.log(`\x1b[32m${I18n("cleaned")}\x1b[0m`);
		} catch (e) {
			debugLog("cleanupTempDir", e);
		}
	}
}

/** 清理 update 目录（保留 .txt 文件） */
function cleanupUpdateDir() {
	if (!updateDirToClean) return;
	const dir = updateDirToClean;
	updateDirToClean = null;
	if (!fs.existsSync(dir)) return;
	try {
		console.log(`\n${I18n("cleaningUpdate")}`);
		const entries = fs.readdirSync(dir);
		for (const name of entries) {
			if (path.extname(name).toLowerCase() === ".txt") continue;
			const fullPath = path.join(dir, name);
			fs.rmSync(fullPath, { recursive: true, force: true });
		}
		log(I18n("cleaned"), "ok");
	} catch (e) {
		debugLog("cleanupUpdateDir", e);
	}
}

/**
 * 清理失败的备份文件（仅删除单个 zip 文件，不删除整个 backup 目录）
 * 修复：原实现误将整个 backup/ 目录赋给清理变量，中断时会删除所有历史备份
 */
function cleanupBackupFile() {
	if (backupFileToClean) {
		const file = backupFileToClean;
		backupFileToClean = null;
		if (fs.existsSync(file)) {
			try {
				console.log(I18n("cleaningBackup"));
				fs.rmSync(file, { force: true });
				console.log(`\x1b[32m${I18n("cleaned")}\x1b[0m`);
			} catch (e) {
				debugLog("cleanupBackupFile", e);
			}
		}
	}
	if (backupTempFiles.length > 0) {
		const files = backupTempFiles.splice(0);
		for (const f of files) {
			if (fs.existsSync(f)) {
				try {
					fs.rmSync(f, { force: true });
				} catch (e) {
					debugLog("cleanupBackupTemp", e);
				}
			}
		}
	}
	const backupDir = path.join(ROOT, "backup");
	if (fs.existsSync(backupDir)) {
		try {
			const remaining = fs.readdirSync(backupDir);
			if (remaining.length === 0) {
				fs.rmSync(backupDir, { force: true, recursive: true });
			}
		} catch (e) {
			debugLog("cleanupBackupDir", e);
		}
	}
}

/**
 * 执行全部资源清理（临时目录、update 目录、失败备份）
 * 供 exitNow 和 handleInterrupt 共用，消除重复逻辑
 */
function performCleanup() {
	cleanupTempDir();
	cleanupUpdateDir();
	cleanupBackupFile();
}

/**
 * 统一退出清理：清理资源、恢复 stdin、退出进程
 * @param {number} code - 退出码
 */
function exitNow(code = 0) {
	performCleanup();
	disableStdinRaw();
	process.exit(code);
}

/** 中断处理：杀子进程、清理资源、退出 */
function handleInterrupt() {
	if (isInterrupted) return;
	isInterrupted = true;

	// 立即杀掉所有正在运行的子进程及其整棵进程树
	for (const child of runningProcesses) {
		try {
			if (process.platform === "win32" && child.pid) {
				// Windows 上 child.kill() 只能终止直接子进程，
				// 用 taskkill /T /F 杀掉整个进程树（cmd.exe → pnpm → node），
				// 避免孙进程残留占用控制台，导致用户需要再按一次 Ctrl+C
				execSync(`taskkill /pid ${child.pid} /T /F`, {
					stdio: "ignore",
				});
			} else {
				child.kill();
			}
		} catch (e) {
			debugLog("handleInterrupt:kill", e);
		}
	}

	console.log(`\n\n\x1b[31m${I18n("interrupted")}\x1b[0m\n`);
	if (isInstallingDeps) {
		console.log(`\x1b[33m${I18n("manualInstall")}\x1b[0m`);
		const modulesPath = path.join(ROOT, "node_modules");
		if (fs.existsSync(modulesPath)) {
			console.log(`\n${I18n("cleaningModules")}`);
			try {
				fs.rmSync(modulesPath, { recursive: true, force: true });
				console.log(`\x1b[32m${I18n("cleaned")}\x1b[0m`);
			} catch (e) {
				debugLog("handleInterrupt:node_modules", e);
			}
		}
	}

	performCleanup();

	disableStdinRaw();
	process.exit(1);
}

process.on("SIGINT", handleInterrupt);
process.on("SIGTERM", handleInterrupt);

// 进程退出时确保恢复 stdin 的正常模式
process.on("exit", () => {
	try {
		disableStdinRaw();
	} catch (e) {
		debugLog("exit", e);
	}
});

/* 通用工具函数 */

/** 带颜色输出日志 */
function log(msg, type) {
	const c = LOG_COLORS[type] || "";
	console.log(`${c}${msg}\x1b[0m`);
}

/** 输出带空行的标题 */
function banner(title) {
	console.log(`\n${title}\n`);
}

/** 确保目录存在 */
function ensureDir(dir) {
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/** 检查系统命令是否可用（防命令注入） */
function hasCommand(cmd) {
	if (!/^[a-zA-Z0-9_.-]+$/.test(cmd)) return false;
	try {
		execSync(process.platform === "win32" ? `where ${cmd}` : `which ${cmd}`, {
			stdio: "pipe",
		});
		return true;
	} catch {
		return false;
	}
}

/* 配置解析（状态机，正确处理注释/字符串转义/嵌套括号） */

/**
 * 从源码中提取指定键对应的字符串数组
 * 使用状态机逐字符解析，正确跳过注释、处理字符串转义和嵌套括号
 * 比正则更健壮：能处理多行数组、行内注释、块注释、含逗号字符串等
 * @param {string} src - 源码
 * @param {string} key - 配置键名
 * @returns {string[]|null} 字符串数组，未找到键返回 null
 */
function extractStringArray(src, key) {
	const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const startMatch = src.match(new RegExp(`\\b${escapedKey}\\s*:\\s*\\[`));
	if (!startMatch) return null;
	const bracketIdx = startMatch.index + startMatch[0].length - 1;

	let depth = 0;
	let inString = false;
	let stringChar = "";
	let inLineComment = false;
	let inBlockComment = false;
	let stringStart = -1;
	const result = [];

	for (let i = bracketIdx; i < src.length; i++) {
		const ch = src[i];
		const next = src[i + 1];

		// 跳过行注释
		if (inLineComment) {
			if (ch === "\n") inLineComment = false;
			continue;
		}
		// 跳过块注释
		if (inBlockComment) {
			if (ch === "*" && next === "/") {
				inBlockComment = false;
				i++;
			}
			continue;
		}
		// 字符串内：处理转义，寻找闭合引号
		if (inString) {
			if (ch === "\\") {
				i++; // 跳过转义字符
				continue;
			}
			if (ch === stringChar) {
				inString = false;
				result.push(src.substring(stringStart + 1, i));
			}
			continue;
		}

		// 检测注释开始
		if (ch === "/" && next === "/") {
			inLineComment = true;
			i++;
			continue;
		}
		if (ch === "/" && next === "*") {
			inBlockComment = true;
			i++;
			continue;
		}
		// 检测字符串开始
		if (ch === '"' || ch === "'" || ch === "`") {
			inString = true;
			stringChar = ch;
			stringStart = i;
			continue;
		}
		// 括号配对
		if (ch === "[") depth++;
		else if (ch === "]") {
			depth--;
			if (depth === 0) break;
		}
	}

	return result;
}

/**
 * 从源码中提取指定键对应的字符串值（单引号/双引号/模板字符串）
 * 使用状态机解析，正确跳过注释和处理转义
 * @param {string} src - 源码
 * @param {string} key - 配置键名
 * @returns {string|null} 字符串值，未找到返回 null
 */
function extractStringValue(src, key) {
	const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const startMatch = src.match(new RegExp(`\\b${escapedKey}\\s*:\\s*`));
	if (!startMatch) return null;
	let i = startMatch.index + startMatch[0].length;

	// 跳过注释和空白
	while (i < src.length) {
		if (/\s/.test(src[i])) {
			i++;
			continue;
		}
		if (src[i] === "/" && src[i + 1] === "/") {
			while (i < src.length && src[i] !== "\n") i++;
			continue;
		}
		if (src[i] === "/" && src[i + 1] === "*") {
			i += 2;
			while (i < src.length - 1 && !(src[i] === "*" && src[i + 1] === "/")) i++;
			i += 2;
			continue;
		}
		break;
	}

	if (i >= src.length) return null;
	const quote = src[i];
	if (quote !== '"' && quote !== "'" && quote !== "`") return null;

	i++; // 跳过开引号
	let value = "";
	while (i < src.length) {
		if (src[i] === "\\") {
			i++;
			if (i < src.length) value += src[i];
			i++;
			continue;
		}
		if (src[i] === quote) break;
		value += src[i];
		i++;
	}
	return value;
}

let _cachedUpgradeConfig = null;
let _upgradeConfigResolved = false;

/**
 * 从 src/config.ts 解析升级配置
 * 包含 protected（受保护文件）、ignore（忽略文件）、httpTimeout（超时）
 * @returns {{protected: string[], ignore: string[], httpTimeout: number}|null}
 */
function getUpgradeConfig() {
	if (_upgradeConfigResolved) return _cachedUpgradeConfig;
	const configPath = path.join(ROOT, "src/config.ts");
	if (!fs.existsSync(configPath)) {
		_cachedUpgradeConfig = null;
		_upgradeConfigResolved = true;
		return null;
	}
	const src = fs.readFileSync(configPath, "utf-8");
	const protectedList = extractStringArray(src, "protected");
	const ignoreList = extractStringArray(src, "ignore");
	const timeoutStr = extractStringValue(src, "httpTimeout");
	const httpTimeout = timeoutStr ? Number.parseInt(timeoutStr, 10) : null;
	if (!protectedList && !ignoreList && !httpTimeout) {
		_cachedUpgradeConfig = null;
	} else {
		_cachedUpgradeConfig = {
			protected: protectedList || [],
			ignore: ignoreList || [],
			httpTimeout: httpTimeout || 30_000,
		};
	}
	_upgradeConfigResolved = true;
	return _cachedUpgradeConfig;
}

/** 从 src/config.ts 解析 API URL */
function getApiUrlFromConfig() {
	const configPath = path.join(ROOT, "src/config.ts");
	if (!fs.existsSync(configPath)) return FALLBACK_API_URL;
	const src = fs.readFileSync(configPath, "utf-8");
	return extractStringValue(src, "apiUrl") || FALLBACK_API_URL;
}

let _cachedPrefixPattern = null;
let _prefixPatternResolved = false;

/** 从 src/config.ts 解析版本号前缀正则模式 */
function getVersionPrefixPattern() {
	if (_prefixPatternResolved) return _cachedPrefixPattern;
	const configPath = path.join(ROOT, "src/config.ts");
	if (!fs.existsSync(configPath)) {
		_cachedPrefixPattern = null;
		_prefixPatternResolved = true;
		return null;
	}
	const src = fs.readFileSync(configPath, "utf-8");
	_cachedPrefixPattern = extractStringValue(src, "versionPrefixPattern");
	_prefixPatternResolved = true;
	return _cachedPrefixPattern;
}

/** 获取 HTTP 超时时间 */
function getHttpTimeout() {
	const cfg = getUpgradeConfig();
	return cfg ? cfg.httpTimeout : 30_000;
}

/* Glob 模式编译与匹配 */

/**
 * 将 glob 模式编译为正则表达式
 * 支持 * (单层通配)、** (多层通配)
 * @param {string} pattern - glob 模式
 * @returns {RegExp} 编译后的正则
 */
function compileGlob(pattern) {
	const suffixIsGlobstar = pattern.endsWith("/**");
	const base = suffixIsGlobstar ? pattern.slice(0, -3) : pattern;
	const regex =
		"^" +
		base
			.replace(/[.+^${}()|[\]\\]/g, "\\$&")
			.replace(/\*\*/g, "<<<GLOBSTAR>>>")
			.replace(/\*/g, "[^/]*")
			.replace(/<<<GLOBSTAR>>>/g, ".*") +
		(suffixIsGlobstar ? "(?:/.*)?$" : "$");
	return new RegExp(regex);
}

/** 检查文件路径是否匹配受保护列表 */
function isProtected(fp) {
	const cfg = getUpgradeConfig();
	const list = cfg ? cfg.protected : [];
	return list.map(compileGlob).some((r) => r.test(fp));
}

/** 检查文件路径是否匹配忽略列表 */
function isIgnored(fp) {
	const cfg = getUpgradeConfig();
	const list = cfg ? cfg.ignore : [];
	return list.map(compileGlob).some((r) => r.test(fp));
}

/* 文件扫描 */

/**
 * 递归扫描目录，返回所有文件（排除 isIgnored 的路径）
 * @param {string} dir - 扫描目录
 * @param {string} baseDir - 基准目录（用于计算相对路径）
 * @param {Array} results - 累积结果
 * @returns {Array<{relativePath: string, absolutePath: string}>}
 */
function scanFiles(dir, baseDir = dir, results = []) {
	if (!fs.existsSync(dir)) return results;
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
		if (isIgnored(relativePath)) continue;
		if (entry.isDirectory()) {
			scanFiles(fullPath, baseDir, results);
		} else {
			results.push({ relativePath, absolutePath: fullPath });
		}
	}
	return results;
}

function scanAllFiles(dir, baseDir = dir, results = []) {
	if (!fs.existsSync(dir)) return results;
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
		if (entry.isDirectory()) {
			scanAllFiles(fullPath, baseDir, results);
		} else {
			results.push({ relativePath, absolutePath: fullPath });
		}
	}
	return results;
}

/** 递归删除空目录（直到 stopAt 或非空目录为止） */
function removeEmptyDirs(dir, stopAt) {
	if (dir === stopAt || !fs.existsSync(dir)) return;
	const entries = fs.readdirSync(dir);
	if (entries.length === 0) {
		fs.rmdirSync(dir);
		removeEmptyDirs(path.dirname(dir), stopAt);
	}
}

/* HTTP 请求 */

/** 根据 URL 协议选择 http 或 https 模块 */
function httpGet(url, options, callback) {
	const mod = url.startsWith("https://") ? https : http;
	return mod.get(url, options, callback);
}

/**
 * 获取 JSON 数据（支持重定向）
 * @param {string} url - 请求 URL
 * @param {number} redirects - 剩余重定向次数
 * @returns {Promise<any>} 解析后的 JSON
 */
function fetchJSON(url, redirects = MAX_REDIRECTS) {
	return new Promise((resolve, reject) => {
		const req = httpGet(
			url,
			{
				headers: {
					"User-Agent": "BrightMoon-Upgrade/1.0",
					Accept: "application/vnd.github+json",
				},
				timeout: getHttpTimeout(),
			},
			(res) => {
				if (
					res.statusCode >= 300 &&
					res.statusCode < 400 &&
					res.headers.location
				) {
					if (redirects <= 0) {
						res.resume();
						return reject(new Error(`Too many redirects: ${url}`));
					}
					return fetchJSON(res.headers.location, redirects - 1)
						.then(resolve)
						.catch(reject);
				}
				if (res.statusCode < 200 || res.statusCode >= 300) {
					res.resume();
					return reject(new Error(`HTTP ${res.statusCode}: ${url}`));
				}
				let data = "";
				res.on("data", (c) => (data += c));
				res.on("end", () => {
					try {
						resolve(JSON.parse(data));
					} catch (e) {
						reject(e);
					}
				});
			},
		)
			.on("error", reject)
			.on("timeout", () => {
				req.destroy(new Error(`Request timeout: ${url}`));
			});
	});
}

/**
 * 下载文件到指定路径（支持重定向）
 * @param {string} url - 下载 URL
 * @param {string} dest - 目标文件路径
 * @param {number} redirects - 剩余重定向次数
 * @returns {Promise<void>}
 */
function downloadFile(url, dest, redirects = MAX_REDIRECTS) {
	return new Promise((resolve, reject) => {
		const file = createWriteStream(dest);
		const req = httpGet(
			url,
			{
				headers: { "User-Agent": "BrightMoon-Upgrade/1.0" },
				timeout: getHttpTimeout(),
			},
			(res) => {
				if (
					res.statusCode >= 300 &&
					res.statusCode < 400 &&
					res.headers.location
				) {
					file.close();
					try {
						fs.unlinkSync(dest);
					} catch (e) {
						debugLog("downloadFile:unlink", e);
					}
					if (redirects <= 0) {
						return reject(new Error(`Too many redirects: ${url}`));
					}
					return downloadFile(res.headers.location, dest, redirects - 1)
						.then(resolve)
						.catch(reject);
				}
				pipeline(res, file)
					.then(resolve)
					.catch((e) => {
						file.close();
						reject(e);
					});
			},
		)
			.on("error", (e) => {
				file.close();
				reject(e);
			})
			.on("timeout", () => {
				req.destroy(new Error(`Download timeout: ${url}`));
			});
	});
}

/* 下载完整性校验 */

/**
 * 流式计算文件哈希值
 * @param {string} filePath - 文件路径
 * @param {string} algo - 哈希算法（如 sha256）
 * @returns {Promise<string>} 十六进制哈希值
 */
function hashFile(filePath, algo) {
	return new Promise((resolve, reject) => {
		const hash = crypto.createHash(algo);
		const stream = fs.createReadStream(filePath);
		stream.on("data", (chunk) => hash.update(chunk));
		stream.on("end", () => resolve(hash.digest("hex")));
		stream.on("error", reject);
	});
}

/**
 * 校验下载文件的完整性（大小 + SHA256 哈希）
 * @param {string} filePath - 已下载文件路径
 * @param {{size: number|null, digest: string|null}} info - 下载信息
 * @returns {Promise<{ok: boolean, reason?: string}>} 校验结果
 */
async function verifyDownload(filePath, info) {
	// 大小校验
	if (info.size != null) {
		try {
			const actualSize = fs.statSync(filePath).size;
			if (actualSize !== info.size) {
				return {
					ok: false,
					reason: I18n("sizeMismatch", info.size, actualSize),
				};
			}
		} catch (e) {
			debugLog("verifyDownload:size", e);
		}
	}
	// 哈希校验（GitHub Release asset 的 digest 格式为 "sha256:xxxx"）
	if (info.digest) {
		const match = info.digest.match(/^(sha(?:256|384|512)):(.+)$/);
		if (match) {
			const algo = match[1];
			const expected = match[2];
			try {
				const actual = await hashFile(filePath, algo);
				if (actual !== expected) {
					return {
						ok: false,
						reason: I18n("hashMismatch", algo, expected, actual),
					};
				}
			} catch (e) {
				debugLog("verifyDownload:hash", e);
			}
		}
	}
	return { ok: true };
}

/* 版本号处理 */

/** 从 package.json 读取本地版本号 */
function getLocalVersion() {
	try {
		const pkg = JSON.parse(
			fs.readFileSync(path.join(ROOT, "package.json"), "utf-8"),
		);
		return pkg.version || null;
	} catch (e) {
		debugLog("getLocalVersion", e);
		return null;
	}
}

/** 移除版本号前缀（如 CE_V、v、V） */
function stripVersionPrefix(tag) {
	const pattern = getVersionPrefixPattern();
	return pattern ? tag.replace(new RegExp(pattern, "i"), "") : tag;
}

/**
 * 解析语义化版本号
 * @param {string} v - 版本号字符串
 * @returns {{parts: number[], pre: (number|string)[]}|null}
 */
function parseVersion(v) {
	const cleaned = stripVersionPrefix(v);
	const dashIdx = cleaned.indexOf("-");
	let preParts = null;
	let numericPart = cleaned;
	if (dashIdx > 0) {
		const preStr = cleaned.substring(dashIdx + 1);
		numericPart = cleaned.substring(0, dashIdx);
		preParts = preStr.split(".").map((p) => {
			const n = Number(p);
			return Number.isNaN(n) ? p : n;
		});
	}
	const parts = numericPart.split(".").map(Number);
	if (parts.length < 3) return null;
	for (let i = 0; i < parts.length; i++) {
		if (Number.isNaN(parts[i])) return null;
	}
	return { parts, pre: preParts };
}

/**
 * 语义化版本比较
 * @returns {number|null} 1 (a>b), -1 (a<b), 0 (相等), null (无法比较)
 */
function compareVersion(a, b) {
	if (!a || !b) return null;
	for (let i = 0; i < Math.max(a.parts.length, b.parts.length); i++) {
		const av = a.parts[i] || 0;
		const bv = b.parts[i] || 0;
		if (av > bv) return 1;
		if (av < bv) return -1;
	}
	if (!a.pre && !b.pre) return 0;
	if (!a.pre) return 1;
	if (!b.pre) return -1;
	for (let i = 0; i < Math.max(a.pre.length, b.pre.length); i++) {
		const ap = a.pre[i];
		const bp = b.pre[i];
		if (ap === undefined && bp === undefined) continue;
		if (ap === undefined) return -1;
		if (bp === undefined) return 1;
		const aIsNum = typeof ap === "number";
		const bIsNum = typeof bp === "number";
		if (aIsNum && bIsNum) {
			if (ap > bp) return 1;
			if (ap < bp) return -1;
		} else if (aIsNum) {
			return -1;
		} else if (bIsNum) {
			return 1;
		} else {
			if (ap > bp) return 1;
			if (ap < bp) return -1;
		}
	}
	return 0;
}

/* 解压 */

/**
 * 如果解压目录只含一个子目录，将其内容提升到外层
 * 处理 GitHub zipball 自动包一层目录的情况
 */
function liftSingleTopDir(destDir) {
	const entries = fs.readdirSync(destDir);
	if (
		entries.length === 1 &&
		fs.statSync(path.join(destDir, entries[0])).isDirectory()
	) {
		const inner = path.join(destDir, entries[0]);
		for (const e of fs.readdirSync(inner)) {
			const src = path.join(inner, e);
			const dst = path.join(destDir, e);
			if (fs.existsSync(dst)) {
				fs.cpSync(src, dst, { recursive: true, force: true });
				fs.rmSync(src, { recursive: true, force: true });
			} else {
				fs.renameSync(src, dst);
			}
		}
		fs.rmSync(inner, { recursive: true, force: true });
	}
}

/**
 * 解压 zip 压缩包到目标目录
 * Windows 使用 PowerShell Expand-Archive，Unix 使用 unzip 命令
 * @param {string} archivePath - 压缩包路径
 * @param {string} destDir - 目标目录
 */
async function extractArchive(archivePath, destDir) {
	ensureDir(destDir);

	if (process.platform === "win32") {
		const tmpDir = path.join(destDir, "_tmp_extract");
		ensureDir(tmpDir);
		const escPath = archivePath.replace(/'/g, "''");
		const escTmp = tmpDir.replace(/'/g, "''");
		await runAsync(
			"powershell",
			[
				"-NoProfile",
				"-Command",
				`Expand-Archive -Path '${escPath}' -DestinationPath '${escTmp}' -Force`,
			],
			{ windowsHide: true },
		);
		liftSingleTopDir(tmpDir);
		const entries = fs.readdirSync(tmpDir);
		for (const e of entries) {
			fs.renameSync(path.join(tmpDir, e), path.join(destDir, e));
		}
		fs.rmSync(tmpDir, { recursive: true, force: true });
	} else {
		if (!hasCommand("unzip")) {
			throw new Error(I18n("unzipNotFound"));
		}
		await runAsync("unzip", ["-o", archivePath, "-d", destDir]);
		liftSingleTopDir(destDir);
	}
}

/** 在目录中查找 zip 压缩包 */
function findArchiveInDir(dir) {
	const entries = fs.readdirSync(dir);
	for (const name of entries) {
		if (name.toLowerCase().endsWith(".zip")) {
			return path.join(dir, name);
		}
	}
	return null;
}

/* Release 信息获取 */

/**
 * 从 Release 对象中获取下载信息
 * @param {object} release - GitHub Release 对象
 * @returns {{url: string|null, size: number|null, digest: string|null}}
 *   下载 URL、文件大小（字节）、哈希摘要（"sha256:xxxx" 格式）
 */
function getDownloadInfo(release) {
	if (release.assets && release.assets.length > 0) {
		let zipAsset = null;
		for (const asset of release.assets) {
			if (asset.name.endsWith(".zip")) {
				zipAsset = asset;
				break;
			}
		}
		const asset = zipAsset || release.assets[0];
		return {
			url: asset.browser_download_url,
			size: asset.size ?? null,
			digest: asset.digest ?? null,
		};
	}
	return {
		url: release.zipball_url || null,
		size: null,
		digest: null,
	};
}

/**
 * 在线下载并解压最新 Release
 * @param {object} releaseObj - GitHub Release 对象
 * @returns {Promise<{tag_name: string, extractDir: string, tmpDir: string}|null>}
 */
async function getUpdateOnline(releaseObj) {
	const downloadInfo = getDownloadInfo(releaseObj);
	if (!downloadInfo.url) {
		log(I18n("noRelease"), "error");
		return null;
	}

	const tmpDir = path.join(ROOT, ".upgrade-tmp");
	tmpDirToClean = tmpDir;
	ensureDir(tmpDir);
	const zipPath = path.join(tmpDir, "release.zip");
	try {
		await downloadFile(downloadInfo.url, zipPath);
	} catch (e) {
		if (e.message?.includes("timeout")) {
			log(I18n("networkTimeout"), "error");
		} else {
			log(I18n("noNetwork"), "error");
		}
		return null;
	}

	// 下载完整性校验：大小 + SHA256 哈希
	const verifyResult = await verifyDownload(zipPath, downloadInfo);
	if (!verifyResult.ok) {
		log(verifyResult.reason, "error");
		return null;
	}

	console.log(`\x1b[36m${I18n("extracting")}\x1b[0m`);
	const extractDir = path.join(tmpDir, "extracted");
	await extractArchive(zipPath, extractDir);
	fs.unlinkSync(zipPath);
	const cleanTag = stripVersionPrefix(releaseObj.tag_name);
	return { tag_name: cleanTag, extractDir, tmpDir };
}

/**
 * 本地升级：从 update 目录解压压缩包
 * @returns {Promise<{tag_name: string, extractDir: string, tmpDir: string}|null>}
 */
async function getUpdateLocal() {
	tmpDirToClean = null;
	updateDirToClean = null;
	const updateDir = path.join(ROOT, "update");
	if (!fs.existsSync(updateDir)) {
		log(I18n("localNotFound", updateDir), "error");
		return null;
	}

	const archive = findArchiveInDir(updateDir);
	if (!archive) {
		log(I18n("noArchiveFound"), "error");
		return null;
	}

	log(I18n("extractingLocal"), "info");
	const tmpDir = path.join(ROOT, ".upgrade-tmp");
	tmpDirToClean = tmpDir;
	updateDirToClean = updateDir;
	ensureDir(tmpDir);
	const extractDir = path.join(tmpDir, "extracted");
	await extractArchive(archive, extractDir);

	// 从本地压缩包中读取真实版本号
	let localTag = SOURCE_LOCAL;
	try {
		const pkgPath = path.join(extractDir, "package.json");
		if (fs.existsSync(pkgPath)) {
			const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
			if (pkg.version) localTag = `${pkg.version}`;
		}
	} catch (e) {
		debugLog("getUpdateLocal:readVersion", e);
	}

	return {
		tag_name: localTag,
		extractDir,
		tmpDir,
	};
}

/**
 * 列出 backup 目录中的备份文件
 * @returns {string[]} 备份文件名列表
 */
function listBackupFiles() {
	const backupDir = path.join(ROOT, "backup");
	if (!fs.existsSync(backupDir)) return [];
	return fs
		.readdirSync(backupDir)
		.filter((f) => f.toLowerCase().endsWith(".zip"))
		.sort()
		.reverse();
}

/**
 * 选择备份文件（交互式菜单）
 * @returns {Promise<string|null>} 选中的备份文件名，取消返回 null
 */
async function selectBackupFile() {
	const backups = listBackupFiles();
	if (backups.length === 0) {
		log(I18n("noBackupFound"), "error");
		return "noBackup";
	}

	const result = await selectMenu(
		I18n("selectBackup"),
		backups,
		I18n("selectTip"),
	);
	if (result === BACK) return BACK;
	return backups[result];
}

/**
 * 从备份恢复：解压 backup 目录中的备份压缩包
 * @returns {Promise<{tag_name: string, extractDir: string, tmpDir: string}|null>}
 */
async function getUpdateFromBackup(backupFileName) {
	disableStdinRaw();

	const backupPath = path.join(ROOT, "backup", backupFileName);
	const tmpDir = path.join(ROOT, ".upgrade-tmp");
	tmpDirToClean = tmpDir;
	ensureDir(tmpDir);
	const extractDir = path.join(tmpDir, "extracted");
	await extractArchive(backupPath, extractDir);

	let localTag = backupFileName.replace(/\.zip$/i, "");
	try {
		const pkgPath = path.join(extractDir, "package.json");
		if (fs.existsSync(pkgPath)) {
			const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
			if (pkg.version) localTag = pkg.version;
		}
	} catch (e) {
		debugLog("getUpdateFromBackup:readVersion", e);
	}

	return {
		tag_name: localTag,
		extractDir,
		tmpDir,
	};
}

/**
 * 生成精确的备份文件列表（两平台共用）
 * 使用 scanFiles + isIgnored 过滤，确保 Windows/Unix 排除语义一致
 * @param {Array} cachedLocalFiles - 缓存的本地文件列表
 * @returns {Array<{relativePath: string, absolutePath: string}>} 过滤后的文件列表
 */
function buildBackupFileList(cachedLocalFiles) {
	const allFiles = cachedLocalFiles || scanFiles(ROOT);
	return allFiles.filter((f) => !isIgnored(f.relativePath));
}

/**
 * Windows 平台备份：使用 .NET ZipFile API + 精确文件列表
 * 通过临时 .ps1 脚本调用 System.IO.Compression，避免 Compress-Archive 性能问题
 * 且使用与 Unix 相同的 scanFiles + isIgnored 过滤，保证两平台排除语义一致
 * @param {string} zipPath - 目标 zip 路径
 * @param {Array} entries - 文件列表（含 relativePath 和 absolutePath）
 * @returns {Promise<void>}
 */
async function backupOnWindows(zipPath, entries) {
	const backupDir = path.dirname(zipPath);
	const tmpList = path.join(backupDir, "_backup_list.txt");
	fs.writeFileSync(
		tmpList,
		`\uFEFF${entries.map((f) => f.relativePath).join("\n")}`,
		"utf-8",
	);
	backupTempFiles.push(tmpList);

	const safeRoot = ROOT.replace(/'/g, "''");
	const safeZipPath = zipPath.replace(/'/g, "''");
	const safeTmpList = tmpList.replace(/'/g, "''");

	const ps1Path = path.join(backupDir, "_backup.ps1");
	const ps1Script = [
		"Add-Type -AssemblyName System.IO.Compression",
		"Add-Type -AssemblyName System.IO.Compression.FileSystem",
		`$root = '${safeRoot}'`,
		`$zipPath = '${safeZipPath}'`,
		`$listPath = '${safeTmpList}'`,
		"$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)",
		"try {",
		"    Get-Content -LiteralPath $listPath -Encoding UTF8 | Where-Object { $_ } | ForEach-Object {",
		"        $relPath = $_",
		"        $fullPath = [System.IO.Path]::Combine($root, ($relPath -replace '/', '\\'))",
		"        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $fullPath, $relPath, [System.IO.Compression.CompressionLevel]::Optimal)",
		"    }",
		"} finally {",
		"    $zip.Dispose()",
		"}",
	].join("\r\n");
	fs.writeFileSync(ps1Path, ps1Script, "utf-8");
	backupTempFiles.push(ps1Path);

	try {
		await runAsync(
			"powershell",
			["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", ps1Path],
			{ windowsHide: true },
		);
	} finally {
		backupTempFiles = backupTempFiles.filter(
			(f) => f !== ps1Path && f !== tmpList,
		);
		try {
			fs.unlinkSync(ps1Path);
		} catch (e) {
			debugLog("backupOnWindows:ps1", e);
		}
		try {
			fs.unlinkSync(tmpList);
		} catch (e) {
			debugLog("backupOnWindows:tmpList", e);
		}
	}
}

/**
 * Unix 平台备份：使用 zip 命令 + 精确文件列表
 * @param {string} zipPath - 目标 zip 路径
 * @param {Array} entries - 文件列表（含 absolutePath）
 * @returns {Promise<void>}
 */
async function backupOnUnix(zipPath, entries) {
	const backupDir = path.dirname(zipPath);
	const tmpList = path.join(backupDir, "_backup_list.txt");
	fs.writeFileSync(
		tmpList,
		`\uFEFF${entries.map((f) => f.absolutePath).join("\n")}`,
		"utf-8",
	);
	backupTempFiles.push(tmpList);
	try {
		await runAsync("bash", ["-c", `zip -r "${zipPath}" -@ < "${tmpList}"`]);
	} finally {
		backupTempFiles = backupTempFiles.filter((f) => f !== tmpList);
		try {
			fs.unlinkSync(tmpList);
		} catch (e) {
			debugLog("backupOnUnix:tmpList", e);
		}
	}
}

/**
 * 备份整个项目到 backup/ 目录
 * Windows 使用 .NET ZipFile API，Unix 使用 zip 命令
 * 两平台共用 scanFiles + isIgnored 精确过滤，排除语义完全一致
 * @param {string} version - 当前版本号
 * @param {Array} cachedLocalFiles - 缓存的本地文件列表
 * @returns {Promise<string|null>} 备份文件名，失败返回 null
 */
async function backupProject(version, cachedLocalFiles) {
	const ver = (version || "0.0.0").replace(/[^\w.-]/g, "_");
	const backupDir = path.join(ROOT, "backup");
	ensureDir(backupDir);

	const zipName = `BrightMoon_Backup_CE_V${ver}.zip`;
	const zipPath = path.join(backupDir, zipName);
	if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

	const entries = buildBackupFileList(cachedLocalFiles);
	if (entries.length === 0) return null;

	try {
		// 仅在失败时清理单个 zip 文件，不删除整个 backup 目录
		// 修复：原实现误将 backupDir 赋给清理变量，中断时会删除所有历史备份
		backupFileToClean = zipPath;

		if (process.platform === "win32") {
			await backupOnWindows(zipPath, entries);
		} else {
			if (!hasCommand("zip")) {
				log(I18n("zipNotFound"), "error");
				backupFileToClean = null;
				return null;
			}
			await backupOnUnix(zipPath, entries);
		}

		backupFileToClean = null;
	} catch (e) {
		console.error(`\x1b[33m${I18n("backupFailed")}\x1b[0m\n`);
		console.error(`\x1b[31m${e.message}\x1b[0m`);
		if (e.stderr) {
			const stderrStr = e.stderr.toString().trim();
			if (stderrStr) console.error(`  \x1b[90m${stderrStr}\x1b[0m`);
		}
		debugLog("backupProject", e);
	}

	return fs.existsSync(zipPath) ? zipName : null;
}

/**
 * 检查 backup 目录中是否已存在备份文件
 * @returns {boolean}
 */
function hasExistingBackup() {
	const backupDir = path.join(ROOT, "backup");
	if (!fs.existsSync(backupDir)) return false;
	const files = fs.readdirSync(backupDir);
	return files.some((f) => f.endsWith(".zip"));
}

/* 回滚检测 */

/**
 * 检查是否为回滚操作（目标版本 ≤ 当前版本则终止）
 * @param {object} release - Release 对象（含 extractDir）
 * @param {string} localVer - 当前本地版本号
 */
function checkRollback(release, localVer) {
	const updatePkgPath = path.join(release.extractDir, "package.json");
	if (!fs.existsSync(updatePkgPath)) return;
	try {
		const updatePkg = JSON.parse(fs.readFileSync(updatePkgPath, "utf-8"));
		const updateVer = updatePkg.version;
		if (!updateVer) return;
		const localParsed = parseVersion(localVer || "");
		const updateParsed = parseVersion(updateVer);
		const cmp = compareVersion(updateParsed, localParsed);
		if (localParsed && updateParsed && cmp !== null && cmp <= 0) {
			const msg = I18n(
				"rollbackBlocked",
				`\x1b[33m${updateVer}\x1b[31m`,
				`\x1b[32m${localVer}\x1b[31m`,
			);
			console.log(`\n\x1b[31m${msg}\x1b[0m`);
			exitNow(1);
		}
		console.log(
			`${I18n("version")}: ${updateVer} (${I18n("current")}: ${localVer})\n`,
		);
	} catch (e) {
		debugLog("checkRollback", e);
	}
}

/* 应用更新 */

/**
 * 应用文件级更新：同步删除、新增、替换，跳过受保护文件
 * @param {object} release - Release 对象（含 extractDir）
 * @param {Array} cachedLocalFiles - 缓存的本地文件列表
 * @returns {{protected: string[], replaced: string[], fileDeleted: string[], fileAdded: string[]}}
 */
function applyUpdate(release, cachedLocalFiles) {
	const stats = {
		protected: [],
		replaced: [],
		fileDeleted: [],
		fileAdded: [],
	};

	const upDir = release.extractDir;
	const upFiles = scanFiles(upDir);
	const upRelPaths = new Set(upFiles.map((f) => f.relativePath));
	const localFiles = cachedLocalFiles || scanFiles(ROOT);
	const localRelPaths = new Set(localFiles.map((f) => f.relativePath));

	const localOnly = [...localRelPaths].filter((f) => !upRelPaths.has(f));
	const updateOnly = [...upRelPaths].filter((f) => !localRelPaths.has(f));
	const both = [...upRelPaths].filter((f) => localRelPaths.has(f));

	banner(`${I18n("step")} 2/6: ${I18n("analyzing")}`);

	for (const f of localOnly) {
		if (isProtected(f)) {
			stats.protected.push(f);
		} else {
			const localPath = path.join(ROOT, f);
			try {
				fs.unlinkSync(localPath);
				removeEmptyDirs(path.dirname(localPath), ROOT);
			} catch (e) {
				debugLog(`applyUpdate:delete:${f}`, e);
			}
			stats.fileDeleted.push(f);
			log(`${f}`, "warn");
		}
	}

	for (const f of updateOnly) {
		const upPath = path.join(upDir, f);
		const localPath = path.join(ROOT, f);
		ensureDir(path.dirname(localPath));
		fs.copyFileSync(upPath, localPath);
		stats.fileAdded.push(f);
		log(`${f}`, "add");
	}

	banner(`${I18n("step")} 3/6: ${I18n("replaced")}`);
	for (const relPath of both) {
		const localPath = path.join(ROOT, relPath);
		const upPath = path.join(upDir, relPath);
		if (isProtected(relPath)) {
			stats.protected.push(relPath);
			continue;
		}
		fs.copyFileSync(upPath, localPath);
		stats.replaced.push(relPath);
		log(`${relPath}`, "replace");
	}

	return stats;
}

/**
 * 应用恢复更新：全量恢复到备份状态，不遵守保护文件和屏蔽规则
 * 本地有、备份没有 → 删除本地文件（新版本残留）
 * 备份有、本地没有 → 添加到本地（被新版本删除的文件）
 * 两边都有 → 用备份版本替换本地版本
 * @param {object} release - Release 对象（含 extractDir）
 * @param {Array} cachedLocalFiles - 缓存的本地文件列表
 * @returns {{replaced: string[], fileDeleted: string[], fileAdded: string[]}}
 */
function applyRestore(release, cachedLocalFiles) {
	const stats = {
		replaced: [],
		fileDeleted: [],
		fileAdded: [],
	};

	const upDir = release.extractDir;
	const upFiles = scanAllFiles(upDir);
	const upRelPaths = new Set(upFiles.map((f) => f.relativePath));
	const localFiles = cachedLocalFiles || scanAllFiles(ROOT);
	const localRelPaths = new Set(localFiles.map((f) => f.relativePath));

	const localOnly = [...localRelPaths].filter((f) => !upRelPaths.has(f));
	const updateOnly = [...upRelPaths].filter((f) => !localRelPaths.has(f));
	const both = [...upRelPaths].filter((f) => localRelPaths.has(f));

	banner(`${I18n("step")} 2/6: ${I18n("analyzing")}`);

	for (const f of localOnly) {
		const localPath = path.join(ROOT, f);
		try {
			fs.unlinkSync(localPath);
			removeEmptyDirs(path.dirname(localPath), ROOT);
		} catch (e) {
			debugLog(`applyRestore:delete:${f}`, e);
		}
		stats.fileDeleted.push(f);
		log(`${f}`, "warn");
	}

	for (const f of updateOnly) {
		const upPath = path.join(upDir, f);
		const localPath = path.join(ROOT, f);
		ensureDir(path.dirname(localPath));
		fs.copyFileSync(upPath, localPath);
		stats.fileAdded.push(f);
		log(`${f}`, "add");
	}

	banner(`${I18n("step")} 3/6: ${I18n("replaced")}`);
	for (const relPath of both) {
		const localPath = path.join(ROOT, relPath);
		const upPath = path.join(upDir, relPath);
		fs.copyFileSync(upPath, localPath);
		stats.replaced.push(relPath);
		log(`${relPath}`, "replace");
	}

	return stats;
}

/* 升级报告 */

/**
 * 输出升级报告（受保护、删除、新增、替换的文件列表）
 * @param {object} stats - applyUpdate 返回的统计对象
 * @param {string} tagName - 目标版本号
 */
function printReport(stats, tagName) {
	console.log(`${I18n("reportTitle")} — ${tagName}`);

	if (stats.protected && stats.protected.length > 0) {
		console.log(`\n[${I18n("protected")}]: ${stats.protected.length}`);
		for (const f of stats.protected) console.log(`${f}`);
	}
	if (stats.fileDeleted && stats.fileDeleted.length > 0) {
		console.log(`\n[${I18n("fileDelete")}]: ${stats.fileDeleted.length}`);
		for (const f of stats.fileDeleted) console.log(`${f}`);
	}
	if (stats.fileAdded && stats.fileAdded.length > 0) {
		console.log(`\n[${I18n("fileAdd")}]: ${stats.fileAdded.length}`);
		for (const f of stats.fileAdded) console.log(`${f}`);
	}
	if (stats.replaced && stats.replaced.length > 0) {
		console.log(`\n[${I18n("replaced")}]: ${stats.replaced.length}`);
		for (const f of stats.replaced) console.log(`${f}`);
	}
}

/* 主流程 - 子步骤 */

/** 步骤：选择语言 */
async function selectLanguage() {
	const LANG_MAP = ["zh", "zh-TW", "en", "ja"];
	const langChoice = await selectMenu(
		() => I18n("langTitle"),
		[I18n("langZH"), I18n("langZHTW"), I18n("langEN"), I18n("langJA")],
		() => I18n("selectTip"),
		(idx) => {
			lang = LANG_MAP[idx];
		},
		currentLangIndex,
	);
	if (langChoice === BACK) {
		console.log(`\n\n\x1b[31m${I18n("interrupted")}\x1b[0m\n`);
		exitNow(0);
	}
	currentLangIndex = langChoice;
	lang = LANG_MAP[langChoice];
}

/** 步骤：选择升级方式（在线/本地） */
async function selectMethod() {
	console.log(`\n${I18n("welcome")}`);
	console.log(`${I18n("buildDate")}: ${LOCAL_VERSION}\n`);
	console.log(
		`\x1b[90m${I18n("copyright", new Date().getFullYear())}\x1b[0m\n`,
	);
	console.log(`\x1b[33m${I18n("backupWarning")}\x1b[0m\n`);

	const result = await tabbedMenu(
		[
			{
				title: I18n("methodTitle"),
				options: [I18n("methodOnline"), I18n("methodLocal")],
			},
			{
				title: I18n("backupRestoreTitle"),
				options: [I18n("versionManualBackup"), I18n("versionRestoreBackup")],
			},
		],
		I18n("tabSelectTip"),
	);
	if (result === BACK) return BACK;
	if (result.tab === 1 && result.index === 0) return "manualBackup";
	if (result.tab === 1 && result.index === 1) return "restoreBackup";
	const isOnline = result.tab === 0 && result.index === 0;

	if (isOnline) {
		log(I18n("tipOnline"), "info");
	} else {
		log(I18n("tipLocal"), "info");
		console.log("");
		const updateDir = path.join(ROOT, "update");
		if (!fs.existsSync(updateDir)) {
			log(I18n("localNotFound", updateDir), "error");
			exitNow(1);
		}
		log(I18n("localFound"), "ok");
		console.log("");
		const archive = findArchiveInDir(updateDir);
		if (!archive) {
			log(I18n("noArchiveFound"), "error");
			exitNow(1);
		}
		log(I18n("archiveFound", path.basename(archive)), "ok");
	}

	return isOnline;
}

/** 步骤：检查在线版本（选择稳定版/预发布版，获取最新 Release） */
async function checkOnlineVersion() {
	const verChoice = await selectMenu(
		I18n("versionTitle"),
		[I18n("versionStable"), I18n("versionPre")],
		I18n("selectTip"),
	);
	if (verChoice === BACK) return BACK;
	const prerelease = verChoice === 1;

	const localVer = getLocalVersion();
	const apiUrl = getApiUrlFromConfig();
	if (!apiUrl) {
		log(I18n("noApiUrl"), "error");
		exitNow(1);
	}
	let allReleases;
	try {
		allReleases = await fetchJSON(apiUrl);
	} catch (e) {
		if (e.message?.includes("timeout")) {
			log(I18n("networkTimeout"), "error");
		} else {
			log(I18n("noNetwork"), "error");
		}
		exitNow(1);
	}
	const releases = allReleases.filter(
		(r) => r.prerelease === prerelease && !r.draft,
	);
	if (!releases.length) {
		log(I18n("noRelease"), "error");
		exitNow(1);
	}

	const selectedRelease = releases[0];

	// 去掉版本号前缀（如 CE_V、v、V），避免重复
	selectedRelease.tag_name = stripVersionPrefix(selectedRelease.tag_name);
	const localParsed = parseVersion(localVer || "");
	const latestParsed = parseVersion(selectedRelease.tag_name);
	const cmp = compareVersion(latestParsed, localParsed);
	if (localParsed && latestParsed && cmp !== null && cmp <= 0) {
		console.log(`\x1b[32m${I18n("noNewVersion")}\x1b[0m`);
		console.log(`${I18n("version")}: ${selectedRelease.tag_name}\n`);
		exitNow(0);
	}
	console.log(
		`\x1b[32m${I18n("newVersionFound")}: ${selectedRelease.tag_name}\x1b[0m (${I18n("current")}: ${localVer})`,
	);
	console.log();

	return selectedRelease;
}

/** 步骤：确认升级 */
async function confirmUpgrade() {
	const ok = await confirm(
		I18n("confirmTitle"),
		I18n("confirmYes"),
		I18n("confirmNo"),
	);
	if (ok === BACK) return BACK;
	if (!ok) {
		console.log(`\n\x1b[31m${I18n("abort")}\x1b[0m`);
		exitNow(0);
	}
	return true;
}

/* 主流程 */

async function main() {
	await selectLanguage();
	console.clear();
	enableStdinRaw();

	// 页面导航状态：method → (online ? versionType : null) → confirm
	let step = "method";
	let isOnline = false;
	let isRestoreBackup = false;
	let selectedRelease = null;
	let selectedBackupFile = null;

	while (true) {
		if (step === "method") {
			const result = await selectMethod();
			if (result === BACK) {
				console.clear();
				await selectLanguage();
				console.clear();
				continue;
			}
			if (result === "manualBackup") {
				disableStdinRaw();
				const localVer = getLocalVersion();
				const localFiles = scanFiles(ROOT);
				let shouldBackup = true;
				if (hasExistingBackup()) {
					shouldBackup = await confirm(
						I18n("backupExists"),
						I18n("backupOverwriteYes"),
						I18n("backupOverwriteNo"),
					);
					if (shouldBackup === BACK) shouldBackup = false;
				}
				if (shouldBackup) {
					log(I18n("backingUp"), "info");
					const backupName = await backupProject(localVer, localFiles);
					if (backupName) {
						log(I18n("backupDone", backupName), "ok");
						console.log(`\x1b[32m${I18n("manualBackupDone")}\x1b[0m\n`);
					} else {
						console.log(`\x1b[33m${I18n("backupFailed")}\x1b[0m\n`);
					}
				} else {
					console.log(`\n\x1b[33m${I18n("skipped")}\x1b[0m\n`);
				}
				enableStdinRaw();
				await waitForKeypress();
				console.clear();
				continue;
			}
			if (result === "restoreBackup") {
				isRestoreBackup = true;
				const backupResult = await selectBackupFile();
				if (backupResult === BACK) {
					isRestoreBackup = false;
					console.clear();
					continue;
				}
				if (backupResult === "noBackup") {
					isRestoreBackup = false;
					await waitForKeypress();
					console.clear();
					continue;
				}
				selectedBackupFile = backupResult;
				break;
			}
			isOnline = result;
			step = isOnline ? "versionType" : "confirm";
		}

		if (step === "versionType") {
			const result = await checkOnlineVersion();
			if (result === BACK) {
				step = "method";
				console.clear();
				continue;
			}
			selectedRelease = result;
			step = "confirm";
		}

		if (step === "confirm") {
			const result = await confirmUpgrade();
			if (result === BACK) {
				step = isOnline ? "versionType" : "method";
				console.clear();
				continue;
			}
			break;
		}
	}

	disableStdinRaw();
	const localVer = getLocalVersion();
	const localFiles = scanFiles(ROOT);

	banner(
		`${I18n("step")} 1/6: ${isRestoreBackup ? I18n("restoringBackup") : isOnline ? I18n("downloading") : I18n("checkingLocal")}`,
	);

	let release;
	if (isRestoreBackup) {
		release = await getUpdateFromBackup(selectedBackupFile);
	} else if (isOnline) {
		release = await getUpdateOnline(selectedRelease);
	} else {
		release = await getUpdateLocal();
	}
	if (!release) {
		console.log("");
		exitNow(1);
	}

	await new Promise((resolve) => setImmediate(resolve));
	if (isInterrupted) {
		exitNow(1);
	}

	if (!isRestoreBackup) {
		checkRollback(release, localVer);
	}

	let backupName = null;
	if (!isRestoreBackup) {
		if (hasExistingBackup()) {
			log(I18n("backupExists"), "ok");
		} else {
			log(I18n("backingUp"), "info");
			backupName = await backupProject(localVer, localFiles);
			await new Promise((resolve) => setImmediate(resolve));
			if (isInterrupted) {
				exitNow(1);
			}
			if (backupName) log(I18n("backupDone", backupName), "ok");
		}
	}

	const stats = isRestoreBackup
		? applyRestore(release, localFiles)
		: applyUpdate(release, localFiles);

	banner(`${I18n("step")} 4/6: ${I18n("reportTitle")}`);
	printReport(stats, release.tag_name);
	banner(`${I18n("step")} 5/6: ${I18n("cleaning")}`);
	cleanupTempDir();
	cleanupUpdateDir();
	console.log(`\n${I18n("cleaningModules")}`);
	const modulesPath = path.join(ROOT, "node_modules");
	if (fs.existsSync(modulesPath)) {
		fs.rmSync(modulesPath, { recursive: true, force: true });
		console.log(`\x1b[32m${I18n("cleaned")}\x1b[0m`);
	} else {
		console.log(`\x1b[32m${I18n("skipped")}\x1b[0m`);
	}

	banner(`${I18n("step")} 6/6: ${I18n("installingDeps")}`);
	isInstallingDeps = true;
	try {
		const spawnOptions = {
			cwd: ROOT,
			stdio: "inherit",
			...(process.platform === "win32" ? { shell: true } : {}),
		};
		await runAsync("pnpm", ["install"], spawnOptions);
		console.log(`\x1b[32m${I18n("depsInstalled")}\x1b[0m\n`);
	} catch (_err) {
		console.log(`\n\x1b[33m${I18n("manualInstall")}\x1b[0m`);
		const modulesPath2 = path.join(ROOT, "node_modules");
		if (fs.existsSync(modulesPath2)) {
			console.log(`\n${I18n("cleaningModules")}`);
			try {
				fs.rmSync(modulesPath2, { recursive: true, force: true });
				console.log(`\x1b[32m${I18n("cleaned")}\x1b[0m`);
			} catch (e) {
				debugLog("main:node_modules", e);
			}
		}
	}
	isInstallingDeps = false;

	const configTsPath = path.join(ROOT, "src/config.ts");
	if (fs.existsSync(configTsPath)) {
		if (isRestoreBackup) {
			log(I18n("configRestoreTip"), "info");
		} else {
			log(
				I18n(
					backupName || hasExistingBackup()
						? "configUpgradeTip"
						: "configUpgradeNoBackupTip",
				),
				"info",
			);
		}
	}

	if (isRestoreBackup) {
		console.log(`\n\x1b[32m${I18n("restoreComplete")}\x1b[0m\n`);
	} else {
		console.log(`\n\x1b[32m${I18n("done")}\x1b[0m\n`);
	}
	console.log(`\x1b[33m${I18n("doneCheckTip")}\x1b[0m`);

	exitNow(0);
}

main().catch((err) => {
	console.error(`\n\x1b[31m${I18n("upgradeFailed")}\x1b[0m`, err.message, "\n");
	if (process.env.DEBUG) console.error(err.stack);
	exitNow(1);
});