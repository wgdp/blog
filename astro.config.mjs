// @ts-check
import { defineConfig } from 'astro/config';
import remarkDirective from "remark-directive";
import remarkEmbedYouTubePlugin from "./src/plugins/youtube";
import remarkEmbedLinkCardPlugin from './src/plugins/linkcards';
import remarkEmbedCaptionImagePlugin from './src/plugins/captionImage';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [],

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
  },

  vite: {
    plugins: [tailwindcss()]
  }
});