// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkDirective from "remark-directive";
import remarkEmbedYouTubePlugin from "./src/plugins/youtube";
import remarkEmbedLinkCardPlugin from './src/plugins/linkcards';
import remarkEmbedCaptionImagePlugin from './src/plugins/captionImage';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkRehype: {
      footnoteLabel: ' ',
      footnoteLabelProperties: { className: ['mb-10'] },
      footnoteLabelTagName: 'hr',
    },
    remarkPlugins: [
       remarkDirective,
       remarkEmbedLinkCardPlugin,
       remarkEmbedYouTubePlugin,
       remarkEmbedCaptionImagePlugin
    ],
  }
});