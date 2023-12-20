<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Index',
    setup() {
        useHead({ title: '一个神奇的网站' })

        return () => (
            <n-element class="layout-provider n-chunk n-column n-center n-auto no-select">
                <common-clock max={960}></common-clock>
            </n-element>
        )
    }
})
</script>
