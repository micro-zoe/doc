import type { SidebarConfig } from 'vuepress'

// 上下文导航通过 link 和路由做绝对比较进行查找 md 文件会被解析为 html 文件 故 此处 Link 须以 .html 结尾
export const sidebarZh: SidebarConfig = {
  '/': [
    {
      text: '指南',
      children: [
        { text: '介绍', link: '/zh/'},
        { text: '快速开始',link: '/zh/start.html'},
        { text: '0.x迁移到1.0',link: '/zh/transfer.html'}
      ]
    },
    {
      text: '功能',
      children: [
        { text: '配置项',link: '/zh/configure.html'},
        { text: '生命周期',link: '/zh/life-cycles.html'},
        { text: '环境变量',link: '/zh/env.html'},
        { text: 'JS沙箱',link: '/zh/sandbox.html'},
        { text: '虚拟路由系统',link: '/zh/router.html'},
        { text: '样式隔离',link: '/zh/scopecss.html'},
        { text: '元素隔离',link: '/zh/dom-scope.html'},
        { text: '数据通信',link: '/zh/data.html'},
        { text: '资源系统',link: '/zh/static-source.html'},
        { text: '预加载',link: '/zh/prefetch.html'},
        { text: '插件系统',link: '/zh/plugins.html'},
        { text: '多层嵌套',link: '/zh/nest.html'},
        { text: 'keep-alive',link: '/zh/keep-alive.html'},
        { text: '高级功能',link: '/zh/advanced.html'},
      ]
    },
    {
      text: '手把手',
      children: [
        { text: '说明',link: '/zh/framework/introduce.html'},
        { text: 'React',link: '/zh/framework/react.html'},
        { text: 'Vue',link: '/zh/framework/vue.html'},
        { text: 'Vite',link: '/zh/framework/vite.html'},
        { text: 'Angular',link: '/zh/framework/angular.html'},
        { text: 'Nextjs',link: '/zh/framework/nextjs.html'},
        { text: 'Nuxtjs',link: '/zh/framework/nuxtjs.html'},
      ]
    },
    {
      text: '其他',
      children: [
        { text: 'API', link: '/zh/api/'},
        { text: 'Micro-App-DevTools', link: '/zh/micro-app-devtools/'},
        { text: '部署',link: '/zh/deploy.html'},
        { text: '常见问题',link: '/zh/questions.html'},
        { text: '更新日志',link: '/zh/changelog.html'},
      ]
    }
  ],

  // versions v0
  '/v0/zh/': [
    {
      text: '指南',
      children: [
        { text: '介绍',link: '/v0/zh/'},
        { text: '快速开始',link: '/v0/zh/start.html'},
      ]
    },
    {
      text: '功能',
      children: [
        { text: '配置项',link: '/v0/zh/configure.html'},
        { text: '生命周期',link: '/v0/zh/life-cycles.html'},
        { text: '环境变量',link: '/v0/zh/env.html'},
        { text: 'JS沙箱',link: '/v0/zh/sandbox.html'},
        { text: '样式隔离',link: '/v0/zh/scopecss.html'},
        { text: '元素隔离',link: '/v0/zh/dom-scope.html'},
        { text: '数据通信',link: '/v0/zh/data.html'},
        { text: '静态资源',link: '/v0/zh/static-source.html'},
        { text: '预加载',link: '/v0/zh/prefetch.html'},
        { text: '插件系统',link: '/v0/zh/plugins.html'},
        { text: '多层嵌套',link: '/v0/zh/nest.html'},
        { text: 'keep-alive',link: '/v0/zh/keep-alive.html'},
        { text: '高级功能',link: '/v0/zh/advanced.html'},
        { text: '路由',link: '/v0/zh/route.html'},
        { text: '应用之间跳转',link: '/v0/zh/jump.html'},
      ]
    },
    {
      text: '手把手',
      children: [
        { text: '说明',link: '/v0/zh/framework/introduce.html'},
        { text: 'React',link: '/v0/zh/framework/react.html'},
        { text: 'Vue',link: '/v0/zh/framework/vue.html'},
        { text: 'Vite',link: '/v0/zh/framework/vite.html'},
        { text: 'Angular',link: '/v0/zh/framework/angular.html'},
        { text: 'Nextjs',link: '/v0/zh/framework/nextjs.html'},
        { text: 'Nuxtjs',link: '/v0/zh/framework/nuxtjs.html'},
      ]
    },
    {
      text: '其他',
      children: [
        { text: 'API',link: '/v0/zh/api.html'},
        { text: '部署',link: '/v0/zh/deploy.html'},
        { text: '常见问题',link: '/v0/zh/questions.html'},
        { text: '更新日志',link: '/v0/zh/changelog.html'},
      ]
    }
  ]
}
