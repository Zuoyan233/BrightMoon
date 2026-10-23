/**
 * 相册类型定义 - 照片与相册分组的数据结构
 */

export interface Photo {
	id?: string;
	src: string;
	alt?: string;
	title?: string;
	thumbnail?: string;
	tags?: string[];
	description?: string;
	date?: string;
	location?: string;
	width?: number;
	height?: number;
}

export interface AlbumGroup {
	id: string;
	title: string;
	description?: string;
	cover: string;
	date: string;
	location?: string;
	tags?: string[];
	layout?: "grid" | "masonry";
	columns?: number;
	photos: Photo[];
	hidden?: boolean;
}
