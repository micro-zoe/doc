import { defineCustomElement } from 'vue'
import MicroAppLoadingEle from './MicroAppLoading.vue'

const MicroAppLoading = defineCustomElement(MicroAppLoadingEle)

if (!customElements.get('micro-app-loading')) {
  customElements.define('micro-app-loading', MicroAppLoading)
}
