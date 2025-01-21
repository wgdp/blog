// タグを追加したい場合は個々に追記する
export const tagsData = [
    {name: "技術", slug: "tech"},
    {name: "振り返り", slug: "reflection"},
    {name: "メモ", slug: "memo"},
    {name: "ゲーム", slug: "game"},
    {name: "感想", slug: "impression"},
    // {name: "食", slug: "food"},
]

export function getSlugByTagName(tagName: string): string {
    const result = tagsData.find(x => x.name === tagName)
    if (result != undefined) {
        return result.slug
    } else {
        return ""
    }
}

export function getNameByTagSlug(tagSlug: string): string {
    const result = tagsData.find(x => x.slug === tagSlug)
    if (result != undefined) {
        return result.name
    } else {
        return ""
    }
}