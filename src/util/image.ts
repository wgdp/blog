import { IMAGE_BASE_URL, DEFAULT_THUMBNAIL } from "./const";

export function makeImageUrl(imagePath: string): string {
    if (imagePath.startsWith(IMAGE_BASE_URL)) {
        return new URL(imagePath).toString()
    } else {
        return new URL(IMAGE_BASE_URL + '/' + imagePath).toString()
    }
}

// サムネイル用
export function getImageOrDefault(url: string): string {
    return url == undefined ? DEFAULT_THUMBNAIL : makeImageUrl(url)
}

export function isUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}
