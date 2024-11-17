import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import { is } from "unist-util-is";
import type { ContainerDirective } from "mdast-util-directive";

export default function remarkEmbedYouTubePlugin() {
  return function (tree: Root) {
    visit(tree, "paragraph", (node, index, parent) => {
      if (index === undefined || parent === undefined) return;

      // https://www.youtube.com/watch から始まる URL のみ記述した場合が置換対象
      const firstChild = node.children[0];
      if (!is(firstChild, "link")) return;
      if (!firstChild.url.startsWith("https://www.youtube.com/watch")) return;
      const firstLinkChild = firstChild.children[0];
      if (!is(firstLinkChild, "text")) return;
      if (firstLinkChild.value !== firstChild.url) return;

      const id = new URL(firstChild.url).searchParams.get("v");
      if (id === null) return;

      const newNode: ContainerDirective = {
        type: "containerDirective",
        name: "youtube",
        data: {
          hName: "div",
          hProperties: {
            class: ["mb-8", "relative", "block", "aspect-video"],
          },
          hChildren: [
            {
              type: "element",
              tagName: "iframe",
              properties: {
                src: `https://www.youtube-nocookie.com/embed/${id}`,
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
        },
        children: [],
      };
      parent.children[index] = newNode;
    });
  };
}