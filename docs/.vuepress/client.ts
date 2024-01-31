import { defineClientConfig } from '@vuepress/client'
// import Layout from './theme/components/SidebarAnchor.vue'
import HomeLayout from './theme/components/Home.vue'
// import microApp from '@micro-zoe/micro-app'

// microApp.start()

export default defineClientConfig({
  layouts: {
    // Layout,
    HomeLayout
  }
})
