import { h, ref, defineComponent } from 'vue'
import type { Ref } from 'vue'
import { usePageData } from '@vuepress/client'

import './styles/tabs.css'

const MicroTabs = defineComponent({
  name: 'MicroTabs',

  setup(props, { slots }) {
    // find active panel
    const activeIndex: Ref<number> = ref(-1)

    return () => {
      // get panels
      const items = slots.default?.() || []

      const pageData = usePageData().value

      /* ↓ validate activeIndex ↓ */
      // invalid
      if (activeIndex.value < 0 || activeIndex.value > items.length - 1) {
        activeIndex.value = items.findIndex(
          (vnode) => vnode.props?.active === '' || vnode.props?.active === true
        )
        if (activeIndex.value === -1) {
          activeIndex.value = 0
        }
      }
      // valid
      else {
        items.forEach((vnode, i) => {
          if (vnode.props === null) {
            vnode.props = {}
          }
          vnode.props.active = i === activeIndex.value
        })
      }
      /* ↑ validate activeIndex ↑ */

      if (!items.length) return null
      return h('div', { class: 'micro-tabs' }, [
        h(
          'div',
          { class: 'micro-tabs__nav-scroll' },
          h(
            'div',
            { class: 'micro-tabs__nav' },
            items.map((vnode, i) => {
              const active = i === activeIndex.value
              return h(
                'div',
                {
                  class: { 'micro-tabs__item': true, active },
                  onClick: () => (activeIndex.value = i)
                },
                vnode.props?.title
              )
            })
          )
        ),
        h('div', { class: 'micro-tabs__content' }, items)
      ])
    }
  }
})

export default MicroTabs
