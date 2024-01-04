import { useWindowSize } from '@vueuse/core'
import IsMobile from 'is-mobile'

/**监听视口**/
export function useResize() {
    const { $configer } = useNuxtApp()
    const { width, height } = useWindowSize()

    async function onResize() {
        if (width.value >= 1280) {
            $configer.setDevice('PC')
            $configer.setCollapse(false)
        } else if (width.value > 768) {
            $configer.setDevice('IPAD')
            $configer.setCollapse(true)
        } else {
            $configer.setDevice('MOBILE')
            $configer.setCollapse(true)
        }
    }

    watch(() => [width.value, height.value], onResize, { immediate: true })

    return {
        width,
        height,
        mobile: computed(() => IsMobile() || $configer.configer.value.device === 'MOBILE'),
        xs: computed(() => width.value <= 540),
        s: computed(() => width.value <= 768),
        m: computed(() => width.value <= 960),
        l: computed(() => width.value <= 1080),
        xl: computed(() => width.value <= 1280),
        xxl: computed(() => width.value <= 1680),
        xxxl: computed(() => width.value <= 1920)
    }
}
