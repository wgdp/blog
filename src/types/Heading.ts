export interface Heading {
    slug: string
    subheadings: Heading[]
    text: string
    depth: number
}
