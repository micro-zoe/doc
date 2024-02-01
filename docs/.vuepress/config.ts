import { defineUserConfig } from 'vuepress'
import type { Plugin } from '@vuepress/core'
import { viteBundler } from '@vuepress/bundler-vite'
import { getDirname, path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { containerPlugin } from '@vuepress/plugin-container'
import fullTextSearchPlugin from 'vuepress-plugin-full-text-search2'
import microAppTheme from './theme'
import { navbar as navbarZh, sidebarZh } from './configs'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'MicroApp',
  base: '/micro-app-docs/',
  description: '一款简约、高效、功能强大的微前端框架',
  head: [['link', { rel: 'icon', href: '/micro-app-docs/images/logo.png' }]],
  bundler: viteBundler({
    vuePluginOptions: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('micro-app')
        }
      }
    }
  }),
  theme: microAppTheme({
    logo: '/images/logo.png',
    colorMode: 'light',

    repo: 'https://github.com/micro-zoe/micro-app',

    /* edit doc */
    // docsBranch: 'doc',
    docsDir: 'docs',
    /* edit doc */

    locales: {
      '/': {
        navbar: navbarZh,
        sidebar: sidebarZh,
        sidebarDepth: 0,

        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接'
        ],
        backToHome: '返回首页',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏',
        // anchor
        anchorToc: '本页内容'
      }
    }
  }),
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'MicroApp'
    }
  },
  plugins: [
    registerComponentsPlugin({
      // 组件通过异步方式加载
      components: {
        Tabs: path.resolve(__dirname, './components/Tabs.tsx'),
        TabPanel: path.resolve(__dirname, './components/TabPanel.vue')
      }
    }),
    fullTextSearchPlugin({
      locales: {
        '/': {
          placeholder: '搜索'
        }
      }
    }),
    /** @see: https://vuepress.github.io/zh/reference/plugin/container.html */
    containerPlugin({
      type: 'note',
      locales: {
        '/': {
          defaultInfo: 'Note'
        }
      }
    })
  ]
})
