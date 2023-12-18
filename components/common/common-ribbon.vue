<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useCurrentElement } from '@vueuse/core'
import { createRibboner } from '@/assets/js/ribbon.min'

export default defineComponent({
    name: 'CommonRibbon',
    setup(props) {
        const element = useCurrentElement()

        onMounted(() => {
            createRibboner(element.value)
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
    background-color: rgba(255, 0, 0, 0.05);
}
</style>
