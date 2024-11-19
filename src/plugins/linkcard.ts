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
  } catch (error) {
    console.error("Error fetching Open Graph Data:", error);
    return {};
  }
}

async function visitor(node: LeafDirective) {
  if (!node.attributes?.url) return;

  const url = new URL(node.attributes.url);
  const websiteData = await getOpenGraphData(url.href);
  const ogImage =
    node.attributes?.image || websiteData?.ogImage?.[0]?.url || null;
  const ogTitle =
    node.attributes?.title ||
    websiteData?.ogTitle ||
    "タイトルの取得に失敗しました";
  const ogDescription =
    node.attributes?.description || websiteData?.ogDescription || "";
  node.data = {
    hName: "a",
    hProperties: {
      class: ["not-prose"], // typographyのprose無効化
      target: "_blank",
      href: url.href,
    },
    hChildren: [
      {
        type: "element",
        tagName: "div",
        properties: {
          class: [
            "grid",
            "my-8",
            "max-w-full",
            "grid-cols-[30%_1fr_24px]",
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
              class: ["h-32", "overflow-hidden"],
            },
            children: [
              {
                type: "element",
                tagName: "img",
                properties: {
                  class: [
                    "object-cover",
                    "object-center",
                    "h-full",
                    "w-full",
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
                tagName: "h5",
                properties: {
                  class: ["md:text-xl", "text-lg", "font-bold", "mb-2", "leading-tight", "line-clamp-2"],
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
                  class: ["text-xs", "md:line-clamp", "line-clamp-3"],
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
                  class: ["text-xs", "line-clamp-1", "md:mt-5", "mt-3"],
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
  };
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
