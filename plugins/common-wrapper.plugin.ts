import CommonWrapper from '~/components/common/common-wrapper.vue'
import 'virtual:svg-icons-register'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('common-wrapper', CommonWrapper)
})
