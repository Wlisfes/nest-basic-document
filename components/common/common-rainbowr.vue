<script lang="tsx">
import { useCurrentElement } from '@vueuse/core'
import { createRainbowr } from '@/assets/js/rainbow.min'

export default defineNuxtComponent({
    name: 'CommonRainbowr',
    setup(props) {
        const element = useCurrentElement()

        onMounted(() => {
            createRainbowr(element.value)
        })
        return () => <div class="common-rainbowr"></div>
    }
})
</script>

<style lang="scss" scoped>
.common-rainbowr {
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 50px;
    overflow: hidden;
    z-index: 1;
}
</style>
