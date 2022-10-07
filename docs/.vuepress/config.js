const { slugify } = require('transliteration')
const sass = require('sass')

module.exports = {
  description: 'LINE 數位版名片的作者，LINE 官方認證 API Expert，固定出沒於台中聊天機器人小聚，如果有製作 LINE 聊天機器人的相關疑問，歡迎直接跟我聊聊喔！',
  evergreen: true,
  title: '筆記國度',
  markdown: {
    slugify
  },
  themeConfig: {
    sidebarDepth: 0,
    smoothScroll: true,
    nav: [
      {
        text: 'Home',
        link: '/',
        fa: 'home'
      },
      {
        text: '經歷',
        link: '/resume',
        fa: 'user'
      },
      {
        text: '技能',
        link: '/skills',
        fa: 'bar-chart-o'
      },
      {
        text: '作品集',
        link: '/works/',
        fa: 'file-code-o'
      },
      {
        text: 'Timeline',
        link: '/experiences',
        fa: 'history'
      },
      {
        text: '部落格',
        link: '/blog/',
        fa: 'file-text'
      },
      {
        text: 'CI',
        link: 'https://github.com/taichunmin/taichunmin.github.io/actions',
        fa: 'tasks'
      },
      {
        text: '社交網站',
        items: [
          {
            text: 'GitHub',
            link: 'https://github.com/taichunmin'
          },
          {
            text: 'Linkedin',
            link: 'https://www.linkedin.com/in/taichunmin/'
          },
          {
            text: 'Facebook',
            link: 'https://facebook.com/taichunmin'
          },
          {
            text: 'Email',
            link: 'mailto:taichunmin@gmail.com'
          },
        ]
      },
    ]
  },
  head: [
    ['link', {
      rel: 'shortcut icon',
      type: 'image/png',
      href: '/favicon.png'
    }],
    ['meta', {
      property: 'og:locale',
      content: 'zh_TW'
    }],
    ['meta', {
      property: 'og:site_name',
      content: '筆記國度'
    }],
    ['meta', {
      property: 'fb:app_id',
      content: '2133031763635285'
    }],
  ],
  locales: {
    '/': {
      lang: 'zh-TW'
    }
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-39556213-3'
      }
    ],
    [
      'robots',
      {
        host: "https://taichunmin.idv.tw", // You have to provide the host URL
        disallowAll: false,
        allowAll: true,
        sitemap: "/sitemap.xml",
        policies: [
          {
            userAgent: '*',
            allow: ['/']
          }
        ]
      },
    ],
    [
      'sitemap',
      {
        hostname: 'https://taichunmin.idv.tw'
      },
    ],
    [
      'autometa',
      {
        image: true,
        twitter: false,
        og: true,
        schema: true,
        canonical_base: 'https://taichunmin.idv.tw',
        author: {
          name: '戴均民',
          twitter: 'taichunmin',
        },
        site: {
          name: '筆記國度',
          twitter: 'taichunmin',
        },
      }
    ],
  ],
  chainWebpack(config, isServer) {
    for (const lang of ["sass", "scss"]) {
      for (const name of ["modules", "normal"]) {
        const rule = config.module.rule(lang).oneOf(name)
        rule.uses.delete("sass-loader")

        rule
          .use("sass-loader")
          .loader("sass-loader")
          .options({
            implementation: sass,
            sassOptions: { indentedSyntax: lang === "sass" },
          })
      }
    }
  }
}
