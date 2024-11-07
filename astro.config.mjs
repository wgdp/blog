// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkRehype: {
      footnoteLabel: ' ',
      footnoteLabelProperties: { className: ['mb-10'] },
      footnoteLabelTagName: 'hr',
    }
  }
});