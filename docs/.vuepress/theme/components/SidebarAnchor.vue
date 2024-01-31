<template>
  <ParentLayout>
    <template #page-content-top>
      <div class="micro-app-anchor" v-if="anchorList.length">
        <aside class="micro-app-anchor-content">
          <div class="micro-app-anchor-header">{{ title }}</div>
          <div class="micro-app-anchor-wrapper" ref="anchor">
            <SidebarAnchorItems />
            <div class="micro-app-anchor-marker" :style="anchorMarkerStyle"></div>
          </div>
        </aside>
      </div>
    </template>
  </ParentLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { usePageData } from "@vuepress/client";
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import type { ThemeData } from '@vuepress/plugin-theme-data/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import SidebarAnchorItems from './SidebarAnchorItems.vue'

const themeLocaleData = useThemeLocaleData<ThemeData>()
const title = themeLocaleData.value.anchorToc || ''

const pageData = usePageData().value;
const anchorList = pageData.headers || []

const anchorMarkerStyle = ref({
  top: '-1.7rem',
  opacity: 0
})

const route = useRoute()
const anchor = shallowRef<HTMLElement>();

const scrollTo = (top: number): void => {
  anchor.value?.scrollTo({ top, behavior: "smooth" });
};

const updateAnchorMarker = (): void => {
  if (anchor.value) {
    const activeTocItem = document.querySelector(".micro-app-anchor-link.active");

    if (activeTocItem) {
      anchorMarkerStyle.value.top = `${
        // active anchor item top
        activeTocItem.getBoundingClientRect().top -
        // anchor top
        anchor.value.getBoundingClientRect().top +
        // anchor scroll top
        anchor.value.scrollTop
      }px`;
      anchorMarkerStyle.value.opacity = 1;
    } else {
      anchorMarkerStyle.value = {
        top: '-1.7rem',
        opacity: 0
      }
    }
  } else {
    anchorMarkerStyle.value = {
      top: '-1.7rem',
      opacity: 0
    }
  }
}

onMounted(() => {
  watch(
    () => route.hash,
    (hash) => {
      if (!anchor.value) return
      // get the active anchor item DOM, whose href equals to the current route
      const activeAnchorItem = document.querySelector(
        `.micro-app-anchor-content a.micro-app-anchor-link[href$="${hash}"]`,
      );

      if (!activeAnchorItem) return

      // get the top and height of the anchor
      const { top: anchorTop, height: anchorHeight } = anchor.value.getBoundingClientRect();

      // get the top and height of the active anchor item
      const { top: activeAnchorItemTop, height: activeAnchorItemHeight } = activeAnchorItem.getBoundingClientRect();

      // when the active anchor item overflows the top edge of anchor
      if (activeAnchorItemTop < anchorTop) {
        // scroll to the top edge of anchor
        scrollTo(anchor.value.scrollTop + activeAnchorItemTop - anchorTop);
      } else if (
        activeAnchorItemTop + activeAnchorItemHeight >
        anchorTop + anchorHeight
      ) {
        // scroll to the bottom edge of anchor
        scrollTo(
          anchor.value.scrollTop +
          activeAnchorItemTop +
          activeAnchorItemHeight -
            anchorTop -
            anchorHeight,
        );
      }
    }
  ),
  watch(() => route.fullPath, updateAnchorMarker, {
    flush: "post",
    immediate: true,
  });
})
</script>

<style>
@import '../styles/sidebarAnchor.css';
</style>
