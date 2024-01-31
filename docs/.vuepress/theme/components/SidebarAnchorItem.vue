<template>
  <li class="micro-app-anchor-item">
    <RouterLink :to="item.link" :class="itemClass">
      {{ item.title }}
    </RouterLink>
    <template v-if="item.children?.length">
      <ul class="micro-app-anchor-list">
        <SidebarAnchorItem
          v-for="child in item.children"
          :key="`${child.level}${child.link}${depth}`"
          :item="child"
          :depth="depth + 1"
        />
      </ul>
    </template>
  </li>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  depth: {
    type: Number,
    required: false,
    default: 0,
  },
})

let { item } = toRefs(props)
const route = useRoute()

const isActive = computed(() => route.hash === item.value.link)
const itemClass = computed(() => ({
  'sidebar-item': true,
  'micro-app-anchor-link': true,
  'active': isActive.value,
}))

</script>
