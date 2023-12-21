import { useWindowSize } from '@vueuse/core'

/**监听视口**/
export function useResize() {
    const { width, height } = useWindowSize()

    return {
        width,
        height,
        xs: computed(() => width.value <= 540),
        s: computed(() => width.value <= 768),
        m: computed(() => width.value <= 960),
        l: computed(() => width.value <= 1080),
        xl: computed(() => width.value <= 1280),
        xxl: computed(() => width.value <= 1680),
        xxxl: computed(() => width.value <= 1920)
    }
}
