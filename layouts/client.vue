<script lang="tsx">
import type { CSSProperties } from 'vue'

export default defineNuxtComponent({
    name: 'ClientLayout',
    setup(props, { slots }) {
        const layout = computed<CSSProperties>(() => ({
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }))
        const Content = computed<CSSProperties>(() => ({
            ...layout.value,
            minHeight: '100%',
            zIndex: 2
        }))

        return () => (
            <client-only>
                <n-layout class="layout-provider" content-style={layout.value}>
                    <layout-header></layout-header>
                    <n-layout-content
                        style={{ flex: 1 }}
                        content-style={Content.value}
                        native-scrollbar={false}
                        scrollbar-props={{ trigger: 'none' }}
                    >
                        <n-element class="layout-pager n-chunk n-column n-auto">{{ default: slots.default }}</n-element>
                        <layout-footer></layout-footer>
                    </n-layout-content>
                    <common-ribbon></common-ribbon>
                </n-layout>
            </client-only>
        )
    }
})
</script>
