import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SOUL.lock',
  description: 'AI-Powered Business Platform',
  base: '/soul-lock/',
  lang: 'ja',
  themeConfig: {
    nav: [
      { text: 'Features', link: '/features/' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Roadmap', link: '/roadmap' },
    ],
    sidebar: {
      '/features/': [
        {
          text: 'Features',
          items: [
            { text: 'Overview', link: '/features/' },
          ]
        }
      ]
    },
    socialLinks: []
  }
})
