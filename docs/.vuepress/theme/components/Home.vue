<script setup lang="ts">
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'
import {
  usePageFrontmatter,
  useSiteLocaleData,
} from '@vuepress/client'
import type { DefaultThemeHomePageFrontmatter } from '@vuepress/theme-default'
import "../home/js/micro-app-loading.js"
import "../home/js/iconfont.js"

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
const siteLocale = useSiteLocaleData()

const heroText = computed(() => {
  if (frontmatter.value.heroText === null) {
    return null
  }
  return frontmatter.value.heroText || siteLocale.value.title || 'Hello'
})

const tagline = computed(() => {
  if (frontmatter.value.tagline === null) {
    return null
  }
  return (
    frontmatter.value.tagline ||
    siteLocale.value.description ||
    ''
  )
})
const contentOneImg = ref<Element>()
const contentTwoImg1 = ref<Element>()
const contentTwoImg2 = ref<Element>()
const microAppConOne = ref<HTMLDivElement>()
const microAppConTwo = ref<HTMLDivElement>()

const showContentOneImg = ref(false)
const showContentTwoImg = ref(false)
const showContentTwoImg2 = ref(false)
const loadingConOne = ref(true)
const loadingConTwo = ref(true)


onMounted(() => {
  const observer1 = new IntersectionObserver(([{ intersectionRatio }]) => {
    if (intersectionRatio <= 0) return
    observer1.disconnect()
    showContentOneImg.value = true

    setTimeout(() => { loadingConOne.value = false}, 1100)

    // <micro-app-loading size='0.3' class="loading-logo"></micro-app-loading>
    setTimeout(() => {
      const myApp = document.createElement('micro-app')  as HTMLElement
      myApp.setAttribute('name', 'my-app1')
      myApp.setAttribute('disable-memory-router', 'true')
      myApp.setAttribute('url', `https://zeroing.jd.com/micro-app/react17/`)
      myApp.addEventListener('mounted', () => {
        microAppConOne.value?.removeChild(microAppConOne.value.children[0])
      })
      microAppConOne.value?.appendChild(myApp)
    }, 3000)
  })

  observer1.observe(contentOneImg.value as Element)

  const observer2 = new IntersectionObserver(([{ intersectionRatio }]) => {
    if (intersectionRatio <= 0) return
    observer2.disconnect()
    showContentTwoImg.value = true
  })

  observer2.observe(contentTwoImg1.value as Element)

  const observer3 = new IntersectionObserver(([{ intersectionRatio }]) => {
    if (intersectionRatio <= 0) return
    observer3.disconnect()
    showContentTwoImg2.value = true

    setTimeout(() => { loadingConTwo.value = false }, 1100)

    setTimeout(() => {
      const myApp = document.createElement('micro-app')
      myApp.setAttribute('name', 'my-app2')
      myApp.setAttribute('url', `https://zeroing.jd.com/micro-app/react17/`)
      myApp.setAttribute('disable-memory-router', 'true')
      myApp.addEventListener('mounted', () => {
        microAppConTwo.value?.removeChild(microAppConTwo.value?.children[0])
      })
      microAppConTwo.value?.appendChild(myApp)
    }, 3000);
  })
  observer3.observe(contentTwoImg2.value as Element)

  onBeforeUnmount(() => {
    observer1.disconnect()
    observer2.disconnect()
    observer3.disconnect()
  })
})
</script>

<template>
  <main class="main-page">
    <section class='top-container'>
      <header class='home-header'>
        <div class='logo-con'>
          <a href="/">
            <img src="../home/assets/logo.png" alt="logo" class="logo-img">
            <span class="logo-title">MicroApp</span>
          </a>
        </div>
        <nav class='header-nav'>
          <a class='header-nav-title' href="/zh/">文档</a>
          <a class='header-nav-title' href="/v0/zh/">0.x文档</a>
          <a class='header-nav-title' href="https://zeroing.jd.com/micro-app/demo/" target="blank">示例</a>
          <a class='header-nav-title' href="/zh/micro-app-devtools">Micro-App-DevTools</a>
          <a class='header-nav-title' href="https://github.com/micro-zoe/micro-app" target="blank"><img
              class='github-icon' src="../home/assets/github-logo.png" alt="github"></a>
        </nav>
      </header>
      <section class='introduce'>
        <div v-if="heroText" class='introduce-title'>{{ heroText }}</div>
        <p v-if="tagline" class='introduce-desc'>{{ tagline }}</p>
        <div class="introduce-btn-list">
          <a href="/zh/" class='btn-start'>开始使用</a>
          <a href="https://zeroing.jd.com/micro-app/demo/" class='btn-coding' target="blank">在线案例</a>
        </div>
      </section>
      <section class="home-show">
        <div class='home-show-main'>
          <div class='home-show-main-back'>
            <div class="home-show-top"></div>
            <div class="home-show-left"></div>
            <div class="home-show-micro-con">
              <div class="home-show-micro">
                <img src="../home/assets/logo.png" alt="logo" class="home-show-logo">
              </div>
              <div class="home-show-micro">
                <img src="../home/assets/logo.png" alt="logo" class="home-show-logo">
              </div>
            </div>
          </div>
        </div>
      </section>
      <aside class="decoration-top"></aside>
      <aside class="decoration-bottom"></aside>
    </section>
    <section class="content-demo">
      <h2 class="content-main-title">特性</h2>

      <section class="content-common">
        <h3 class="content-common-title">只需一行代码，实现微前端，如此简单</h3>
        <div class="content-common-detail">
          <img class='content-one-img' :class="{ 'content-one-img-show': showContentOneImg }"
            src="../home/assets/one-line.png" alt="" ref="contentOneImg">
          <img class='content-common-arrow-right' :class="{ 'content-common-arrow-right-show': showContentOneImg }"
            src="../home/assets/arrow-right.png" alt="">
          <div class='micro-app-con micro-app-con-one' :class="{ 'micro-app-con-show': showContentOneImg }"
            ref="microAppConOne">
            <micro-app-loading size='0.3' class="loading-logo" :class="{ hidden: loadingConOne }"></micro-app-loading>
          </div>
        </div>
      </section>

      <section class="content-common">
        <h3 class="content-common-title">无关技术栈，任何框架皆可使用</h3>
        <div class="content-common-detail">
          <div class="content-two-imgs-con">
            <div class="content-two-img-con" :class="{ 'content-two-img-con-show': showContentTwoImg }"
              ref="contentTwoImg1">
              <img class="content-two-img-logo" src="../home/assets/react-logo.png" alt="">
              <img class="content-two-img-code" src="../home/assets/react-code.png" alt="">
            </div>
            <div class="content-two-img-con" :class="{ 'content-two-img-con-show': showContentTwoImg2 }"
              ref="contentTwoImg2">
              <img class="content-two-img-logo" src="../home/assets/vue-logo.png" alt="">
              <img class="content-two-img-code" src="../home/assets/vue-code.png" alt="">
            </div>
          </div>
          <img class='content-common-arrow-right' :class="{ 'content-common-arrow-right-show': showContentTwoImg2 }"
            src="../home/assets/arrow-right.png" alt="">
          <div class='micro-app-con micro-app-con-two' :class="{ 'micro-app-con-show': showContentTwoImg2 }"
            ref="microAppConTwo">
            <micro-app-loading size='0.3' class="loading-logo" :class="{ hidden: loadingConTwo }"></micro-app-loading>
          </div>
        </div>
      </section>

      <section class="ability-list">
        <h2 class="ability-list-title">能力</h2>
        <div class="ability-list-cont">
          <div class="ability-item">
            <div class="ability-item-icon-con">
              <svg class="icon ability-icon-sandbox" aria-hidden="true">
                <use xlink:href="#icon-sandbox"></use>
              </svg>
            </div>
            <h4>JS沙箱</h4>
          </div>
          <div class="ability-item">
            <div class="ability-item-icon-con ability-item-icon-css">
              <svg class="icon ability-icon-css" aria-hidden="true">
                <use xlink:href="#icon-css"></use>
              </svg>
              <svg class="icon ability-icon-css" aria-hidden="true">
                <use xlink:href="#icon-css"></use>
              </svg>
            </div>
            <h4>样式隔离</h4>
          </div>
          <div class="ability-item">
            <div class="ability-item-icon-con ability-item-icon-element">
              <svg class="icon ability-icon-element" aria-hidden="true">
                <use xlink:href="#icon-element"></use>
              </svg>
            </div>
            <h4>元素隔离</h4>
          </div>
          <div class="ability-item">
            <div class="ability-item-icon-con ability-item-icon-tongxun">
              <svg class="icon ability-icon-tongxun" aria-hidden="true">
                <use xlink:href="#icon-tongxun"></use>
              </svg>
            </div>
            <h4>数据通信</h4>
          </div>
          <div class="ability-item">
            <div class="ability-item-icon-con ability-item-icon-plugin">
              <svg class="icon ability-icon-plugin" aria-hidden="true">
                <use xlink:href="#icon-plugin"></use>
              </svg>
            </div>
            <h4>插件系统</h4>
          </div>
          <div class="ability-item">
            <div class="ability-item-icon-con ability-item-icon-prefetch">
              <svg class="icon ability-icon-prefetch" aria-hidden="true">
                <use xlink:href="#icon-prefetch"></use>
              </svg>
            </div>
            <h4>预加载</h4>
          </div>
        </div>
      </section>
      <div class="content-thrid-btn">
        <a href="/zh/" class='btn-start'>快速开始</a>
      </div>
    </section>
    <footer class="footer">
      <div class="footer-content">
        <dl>
          <dt>相关地址</dt>
          <dd><a target="blank" href="https://github.com/micro-zoe/micro-app/issues">BUG反馈</a></dd>
          <dd><a target="blank" href="https://gitter.im/microzoe/micro-app">聊天室</a></dd>
          <dd><a target="blank" href="https://github.com/micro-zoe/micro-app/discussions">GitHub讨论组</a></dd>
        </dl>
        <dl>
          <dt>更多</dt>
          <dd>
            <a target="blank" href="https://github.com/micro-zoe/micro-app">GitHub</a>
          </dd>
          <dd>
            <a target="blank" href="https://github.com/micro-zoe/micro-app/releases">更新日志</a>
          </dd>
        </dl>
      </div>
  </footer>
</main></template>

<style src="../home/css/index.css" scoped></style>
<style src="../home/css/animation.css" scoped></style>
