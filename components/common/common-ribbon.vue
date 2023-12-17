<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useCurrentElement } from '@vueuse/core'
// import '@/assets/js/ribbon.min'
import { createRibboner } from '@/assets/js/ribbon'

export default defineComponent({
    name: 'CommonRibbon',
    setup(props) {
        const element = useCurrentElement()

        onMounted(() => {
            createRibboner(element.value, {
                zIndex: 1,
                size: 90,
                alpha: 0.6
            })
        })
        return () => <div class="common-ribbon"></div>
    }
})
</script>

<style lang="scss" scoped>
.common-ribbon {
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 60px;
    overflow: hidden;
    z-index: 1;
}
</style>
