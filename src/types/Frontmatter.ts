import type { ImageLicense } from "./ImageLicense"

export interface Frontmatter {
    title: string
    pubDate: Date
    description: string
    tags: string[]
    thumbnail: string
    imageLicense: ImageLicense
}
