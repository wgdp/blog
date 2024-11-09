import type { MarkdownInstance } from "astro"
import type { Frontmatter } from "./Frontmatter"
import type { Ogp } from "./Ogp"

export interface Props {
    frontmatter: Frontmatter
    url: string
    ogp: Ogp
    rawContent(): string
}
