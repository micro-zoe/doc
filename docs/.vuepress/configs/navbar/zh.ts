import type { NavbarConfig } from 'vuepress'
import { navbarZhV0 } from './zh_v0'

export const navbarZh: NavbarConfig = [
  { text: 'API', link: '/zh/api/', activeMatch: '^/zh/api/', },
  {
    text: 'Micro-App-DevTools',
    link: '/zh/micro-app-devtools/',
    activeMatch: '^/zh/micro-app-devtools',
  },
  {
    text: '常见问题',
    link: '/zh/questions.md',
    activeMatch: '^/zh/questions',
  },
]

export const navbar: NavbarConfig = [
  {
    text: 'zh',
    children: navbarZh
  },
  {
    text: 'v0',
    children: navbarZhV0
  }
]
