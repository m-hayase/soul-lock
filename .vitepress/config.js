import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Communication',
  description: 'AI-Powered Business Platform',
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ]
  }
})
