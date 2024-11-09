import { IMAGE_BASE_URL, DEFAULT_THUMBNAIL } from "./const";

function makeImageUrl(imagePath: string): string {
    if (imagePath.startsWith(IMAGE_BASE_URL)) {
        return imagePath
    } else {
        return IMAGE_BASE_URL + '/' + imagePath
    }
}

export function getImageOrDefault(url: string): string {
    return url == undefined ? DEFAULT_THUMBNAIL : makeImageUrl(url)
}