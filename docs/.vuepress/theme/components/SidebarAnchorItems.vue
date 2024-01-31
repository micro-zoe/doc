<template>
  <ul v-if="anchorList.length" class="micro-app-anchor-list">
    <SidebarAnchorItem
      v-for="item in anchorList"
      :key="`${item.level}-${item.link}`"
      :item="item"
    />
  </ul>
</template>

<script setup lang="ts">
import { usePageData } from "@vuepress/client";
import SidebarAnchorItem from './SidebarAnchorItem.vue'

const pageData = usePageData().value;
const anchorList = pageData.headers || []
</script>

