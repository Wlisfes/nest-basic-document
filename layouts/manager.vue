<script lang="tsx">
import { defineComponent, computed, type CSSProperties } from 'vue'

export default defineComponent({
    name: 'ManagerLayout',
    setup(props, { slots }) {
        const contentStyle = computed<CSSProperties>(() => ({
            overflow: 'hidden',
            position: 'relative',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2
        }))

        return () => (
            <client-only>
                <n-layout class="layout-provider" content-style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <n-layout-content content-style={contentStyle.value} native-scrollbar={false} scrollbar-props={{ trigger: 'none' }}>
                        <n-element class="layout-pager n-chunk n-column n-auto">{slots.default?.()}</n-element>
                    </n-layout-content>
                </n-layout>
            </client-only>
        )
    }
})
</script>
