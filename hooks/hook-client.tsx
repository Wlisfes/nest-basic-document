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
export function useCountdate(data: Partial<{ date: number; immediate: boolean }> = {}) {
    const date = ref<number>(data.date ?? 0)
    const immediate = ref<boolean>(data.immediate ?? false)
    const timeout = ref()

    async function setDateTime(value: number) {
        return (date.value = value)
    }

    async function start() {
        if (date.value < 1) {
            return false
        }
        if (timeout.value) {
            stop()
        }
        immediate.value = true
        timeout.value = setTimeout(() => {
            date.value--
            if (date.value >= 1) {
                start()
            } else {
                stop()
            }
        }, 1000)
    }

    function stop() {
        if (timeout.value) {
            clearTimeout(timeout.value)
        }
    }

    onMounted(() => {
        if (data.immediate) {
            start()
        }
    })

    return { date, immediate, setDateTime, start, stop }
}
