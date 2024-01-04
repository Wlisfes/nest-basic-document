<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    setup(props, { slots }) {
        return () => (
            <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">
                {Array.from({ length: 20 }, (x, i) => (
                    <n-h1 key={i}>{`Home ${i}`}</n-h1>
                ))}
            </n-element>
        )
    }
})
</script>
