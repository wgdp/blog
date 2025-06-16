// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkDirective from "remark-directive";
import remarkEmbedYouTubePlugin from "./src/plugins/youtube";
import remarkEmbedLinkCardPlugin from './src/plugins/linkcards';
import remarkEmbedCaptionImagePlugin from './src/plugins/captionImage';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap()],
  site: "https://blog.wgdp.dev",
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
       remarkEmbedCaptionImagePlugin,
    ],
    shikiConfig: {
      theme: 'rose-pine-dawn'
    },
  }
});