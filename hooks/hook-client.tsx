import { onMounted } from 'vue'
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

/**倒计时**/
export function useCountdate(data: Partial<{ date: number; immediate: boolean; loading: boolean }> = {}) {
    const interval = ref()
    const date = reactive({
        value: data.date ?? 0,
        immediate: data.immediate ?? false,
        loading: data.loading ?? false
    })

    async function setDate(newState: Partial<{ value: number; loading: boolean }> = {}) {
        return Object.assign(date, newState)
    }

    async function start() {
        if (date.value < 1) {
            return false
        }
        date.value--
        date.immediate = true
        interval.value = setInterval(() => {
            if (date.value <= 0) {
                stop()
            }
            date.value--
        }, 1000)
    }

    function stop() {
        if (interval.value) {
            clearTimeout(interval.value)
            interval.value = null
        }
    }

    return { date, setDate, start, stop }
}
