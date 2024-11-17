import type { AstroIntegration } from 'astro'
import type { Frontmatter } from '../types/Frontmatter'


export default (): AstroIntegration => ({
    name: 'og-image-uploader',
    hooks: {
        'astro:build:start': async () => {
        const posts = import.meta.glob('../pages/posts/*.md');

        const hoge = await posts.forEach();
    },
  },
})