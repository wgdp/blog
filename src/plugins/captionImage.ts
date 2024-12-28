import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { LeafDirective } from "mdast-util-directive";

async function visitor(node: LeafDirective) {
  if (!node.attributes?.src) return;
  if (!node.attributes?.alt) return;

  const imageSrc = node.attributes.src
  const imageAlt = node.attributes.alt

  node.data = {
    hName: "div",
    hProperties: {
      class: ["not-prose grid grid-cols-1 justify-center"], // typographyのprose無効化
    },
    hChildren: [
      {
        type: "element",
        tagName: "div",
        children: [
          {
            type: "element",
            tagName: "img",
            properties: {
              src: imageSrc,
              alt: imageAlt
            },
            children: [],
          },
        ],
        properties: {
          class: ["text-xs", "line-clamp-1", "md:mt-5", "mt-2"],
        },
      },
      {
        type: "element",
        tagName: "div",
        properties: {
          class: [
            "text-nord-3",
            "text-sm",
            "italic",
          ]
        },
        children: [
          {
            type: "text",
            value: imageAlt,
          },
        ],
      },
    ],
  };
}

export default function remarkEmbedCaptionImagePlugin() {
  return async function (tree: Root) {
    const nodes: LeafDirective[] = [];

    visit(tree, "leafDirective", (node) => {
      if (node.name !== "captionImage") return;
      nodes.push(node);
    });

    const promises = nodes.map((node) => visitor(node));
    await Promise.all(promises);
  };
}
