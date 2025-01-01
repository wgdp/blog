import type { Frontmatter } from "./Frontmatter"
import type { Ogp } from "./Ogp"
import type { PreHeading } from "./PreHeading"

export interface Props {
    frontmatter: Frontmatter
    url: string
    ogp: Ogp
    rawContent(): string
    headings: PreHeading[]
}
