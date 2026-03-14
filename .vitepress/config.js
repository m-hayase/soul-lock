import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SOUL.lock',
  description: 'AI-Powered Business Platform',
  base: '/soul-lock/',
  lang: 'ja',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined' }],
  ],
  themeConfig: {
    nav: [
      { text: 'ビジョン', link: '/vision/' },
      { text: 'メッセージ', link: '/message' },
      { text: 'プロフィール', link: '/profile' },
      { text: 'コンタクト', link: '/contact' },
    ],
    sidebar: {
      '/vision/': [
        {
          text: 'ビジョン',
          items: [
            { text: 'サマリ', link: '/vision/' },
            { text: '1. 時代認識', link: '/vision/context' },
            { text: '2. 課題とインサイト', link: '/vision/problem' },
            { text: '3. プロダクト', link: '/vision/product' },
            { text: '4. 競争優位', link: '/vision/strategy' },
            { text: '5. ビジネスモデル', link: '/vision/business' },
            { text: '6. 次のステップ', link: '/vision/action' },
          ]
        }
      ]
    },
    socialLinks: []
  }
})
