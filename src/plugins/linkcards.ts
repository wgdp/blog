import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import ogs from "open-graph-scraper";
import type { LeafDirective } from "mdast-util-directive";
import { DESCRIPTION_LIMIT_LENGTH } from "../util/const";

async function getOpenGraphData(url: string) {
  const options = { url };
  try {
    const { result } = await ogs(options);
    return result;
  } catch (error: any) {
    // 404エラーの場合簡素なエラーメッセージを出すだけにする
    if (error.result.error === "404 Not Found") {
      console.warn('linkcard is', error.result.error, '=>', error.result.requestUrl)
    }
    return {};
  }
}

function getAmazonImageUrl(url: URL) {
  const slug = url.pathname.split("/").slice(-1)[0]
  return "https://images.amazon.com/images/P/" + slug + ".09_SL110_.jpg"
}

async function visitor(node: LeafDirective) {
  if (!node.attributes?.urls) return;

  node.data = {
    hName: "div",
    hProperties: {
      class: ["not-prose gap-2"], // typographyのprose無効化
    },
    hChildren: [],
  };

  const splittedPreParseUrls = node.attributes.urls.split(",")
  for (const preParseUrl of splittedPreParseUrls) {
    const url = new URL(preParseUrl)
    const websiteData = await getOpenGraphData(url.href);
    let ogImage =
      node.attributes?.image || websiteData?.ogImage?.[0]?.url || null;
    const ogTitle =
      node.attributes?.title ||
      websiteData?.ogTitle ||
      "タイトルの取得に失敗しました";
    const ogDescription =
      node.attributes?.description || websiteData?.ogDescription || "";

    if (url.hostname == "www.amazon.co.jp") {
      ogImage = getAmazonImageUrl(url)
    }

    node.data.hChildren?.push(
      {
        type: "element",
        tagName: "a",
        properties: {
          target: "_blank",
          href: url.href,
        },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: {
              class: [
                "grid",
                "my-4",
                "max-w-full",
                "grid-cols-[30%_1fr_5px]",
                "gap-4",
                "rounded-md",
                "border",
                "border-nord-6",
                "text-nord-1",
                "transition-colors",
                "duration-200",
                "hover:bg-nord-6",
              ],
            },
            children: [
              {
                type: "element",
                tagName: "div",
                properties: {
                  class: ["h-32"],
                },
                children: [
                  {
                    type: "element",
                    tagName: "img",
                    properties: {
                      loading: "lazy",
                      alt: url.origin + " のサムネイル",
                      class: [
                        "overflow-hidden",
                        "object-cover",
                        "object-center",
                        "h-full",
                        "w-full",
                        "m-auto",
                        "rounded-s-md",
                      ],
                      src: ogImage,
                    },
                    children: [],
                  },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: {
                  class: ["flex", "flex-col", "py-2"],
                },
                children: [
                  {
                    type: "element",
                    tagName: "strong",
                    properties: {
                      class: ["md:text-lg", "text-sm", "font-black", "text-nord-0", "mb-2", "leading-tight", "line-clamp-1"],
                    },
                    children: [
                      {
                        type: "text",
                        value: ogTitle,
                      },
                    ],
                  },
                  {
                    type: "element",
                    tagName: "p",
                    properties: {
                      class: ["text-xs", "md:line-clamp", "line-clamp-2", "leading-tight"],
                    },
                    children: [
                      {
                        type: "text",
                        value: ogDescription,
                      },
                    ],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: {
                      class: ["text-xs", "line-clamp-1", "md:mt-5", "mt-2"],
                    },
                    children: [
                      {
                        type: "text",
                        value: url.origin
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }
    )
  }
}

export default function remarkEmbedLinkCardPlugin() {
  return async function (tree: Root) {
    const nodes: LeafDirective[] = [];

    visit(tree, "leafDirective", (node) => {
      if (node.name !== "linkcard") return;
      nodes.push(node);
    });

    const promises = nodes.map((node) => visitor(node));
    await Promise.all(promises);
  };
}
