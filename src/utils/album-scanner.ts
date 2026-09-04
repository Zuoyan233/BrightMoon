import * as fs from "node:fs";
import * as path from "node:path";
import type { AlbumGroup, Photo } from "../types/album";

export async function scanAlbums(): Promise<AlbumGroup[]> {
	const albumsDir = path.join(process.cwd(), "public/images/albums");
	const albums: AlbumGroup[] = [];

	// 检查目录是否存在
	if (!fs.existsSync(albumsDir)) {
		console.warn("Album directory does not exist:", albumsDir);
		return [];
	}

	// 获取所有子文件夹
	const albumFolders = fs
		.readdirSync(albumsDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	// 处理每个相册文件夹
	for (const folder of albumFolders) {
		const albumPath = path.join(albumsDir, folder);
		const album = await processAlbumFolder(albumPath, folder);
		if (album) {
			albums.push(album);
		}
	}

	return albums;
}

// 扫描并返回所有非隐藏的相册，确保返回的相册列表只包含可以公开显示的相册
export async function scanVisibleAlbums(): Promise<AlbumGroup[]> {
	const allAlbums = await scanAlbums();
	return allAlbums.filter((album) => !album.hidden);
}

async function processAlbumFolder(
	folderPath: string,
	folderName: string,
): Promise<AlbumGroup | null> {
	// 检查必要文件
	const infoPath = path.join(folderPath, "info.json");

	if (!fs.existsSync(infoPath)) {
		console.warn(`Album ${folderName} is missing info.json file`);
		return null;
	}

	// 读取相册信息
	const infoContent = fs.readFileSync(infoPath, "utf-8");
	let info: {
		cover?: string;
		title?: string;
		description?: string;
		date?: string;
		location?: string;
		tags?: string[];
		layout?: "grid" | "masonry";
		columns?: number;
		hidden?: boolean;
		mode?: string;
		photos?: ExternalPhoto[];
	};
	try {
		info = JSON.parse(infoContent);
	} catch (e) {
		console.error(`Album ${folderName} info.json format error:`, e);
		return null;
	}

	// 检查是否为外链模式
	const isExternalMode = info.mode === "external";
	let photos: Photo[] = [];
	let cover: string;

	if (isExternalMode) {
		// 外链模式：从 info.json 中获取封面和照片
		if (!info.cover) {
			console.warn(`Album ${folderName} external mode is missing cover field`);
			return null;
		}

		cover = info.cover;
		photos = processExternalPhotos(info.photos || [], folderName);
	} else {
		// 本地模式：检查本地文件
		const coverPath = path.join(folderPath, "cover.webp");
		if (!fs.existsSync(coverPath)) {
			console.warn(`Album ${folderName} is missing cover.webp file.\n`);
			return null;
		}

		cover = `/images/albums/${folderName}/cover.webp`;
		photos = scanPhotos(folderPath, folderName);
	}

	// 构建相册对象
	return {
		id: folderName,
		title: info.title || folderName,
		description: info.description || "",
		cover,
		date: info.date || new Date().toISOString().split("T")[0],
		location: info.location || "",
		tags: info.tags || [],
		layout: info.layout || "grid",
		columns: info.columns || 3,
		photos,
		// 添加 hidden 字段，默认为 false
		hidden: info.hidden ?? false,
	};
}

function scanPhotos(folderPath: string, albumId: string): Photo[] {
	const photos: Photo[] = [];
	const files = fs.readdirSync(folderPath);

	// 过滤出图片文件
	const imageFiles = files.filter((file) => {
		const ext = path.extname(file).toLowerCase();
		return (
			[
				".jpg",
				".jpeg",
				".png",
				".gif",
				".webp",
				".svg",
				".avif",
				".bmp",
				".tiff",
				".tif",
			].includes(ext) && file !== "cover.webp"
		);
	});

	// 处理每张照片
	imageFiles.forEach((file, index) => {
		const filePath = path.join(folderPath, file);
		const stats = fs.statSync(filePath);

		// 解析文件名中的标签
		const { baseName, tags } = parseFileName(file);

		photos.push({
			id: `${albumId}-photo-${index}`,
			src: `/images/albums/${albumId}/${file}`,
			alt: baseName,
			title: baseName,
			tags: tags,
			date: stats.mtime.toISOString().split("T")[0],
		});
	});

	return photos;
}

interface ExternalPhoto {
	src?: string;
	id?: string;
	thumbnail?: string;
	alt?: string;
	title?: string;
	description?: string;
	tags?: string[];
	date?: string;
	location?: string;
	width?: number;
	height?: number;
}

function processExternalPhotos(
	externalPhotos: ExternalPhoto[],
	albumId: string,
): Photo[] {
	const photos: Photo[] = [];

	externalPhotos.forEach((photo, index) => {
		if (!photo.src) {
			console.warn(`Photo ${albumId} #${index + 1} is missing src field.`);
			return;
		}

		photos.push({
			id: photo.id || `${albumId}-external-photo-${index}`,
			src: photo.src,
			thumbnail: photo.thumbnail,
			alt: photo.alt || photo.title || `Photo ${index + 1}`,
			title: photo.title,
			description: photo.description,
			tags: photo.tags || [],
			date: photo.date || new Date().toISOString().split("T")[0],
			location: photo.location,
			width: photo.width,
			height: photo.height,
			// camera: photo.camera,
			// lens: photo.lens,
			// settings: photo.settings,
		});
	});

	return photos;
}

function parseFileName(fileName: string): { baseName: string; tags: string[] } {
	// 匹配文件名中的标签，格式为：文件名_标签1_标签2.扩展名
	const parts = path.basename(fileName, path.extname(fileName)).split("_");

	if (parts.length > 1) {
		// 第一部分作为基本名称，其余部分作为标签
		const baseName = parts.slice(0, -2).join("_");
		const tags = parts.slice(-2);
		return { baseName, tags };
	}

	// 如果没有标签，返回不带扩展名的文件名
	const baseName = path.basename(fileName, path.extname(fileName));
	return { baseName, tags: [] };
}
