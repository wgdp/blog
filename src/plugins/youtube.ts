import { visit } from "unist-util-visit";
import type { Root } from "mdast";

export default function remarkEmbedYouTubePlugin() {
  return function (tree: Root) {
    visit(tree, "leafDirective", (node) => {
      if (node.name !== "youtube") return;
      if (!node.attributes?.url) return;

      const id = new URL(node.attributes.url).searchParams.get("v");
      if (id === null) return;

      node.data = {
        hName: "div",
        hProperties: {
          class: ["my-8", "relative", "block", "aspect-video"],
        },
        hChildren: [
          {
            type: "element",
            tagName: "iframe",
            properties: {
              src: `https://www.youtube-nocookie.com/embed/${id}`,
              loading: "lazy",
              allowFullscreen: true,
              title: "YouTube video player",
              class: [
                "absolute",
                "left-0",
                "top-0",
                "h-full",
                "w-full",
                "border-0",
              ],
            },
            children: [],
          },
        ],
      };
    });
  };
}