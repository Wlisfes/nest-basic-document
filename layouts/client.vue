<script lang="tsx">
import { defineComponent, computed, type CSSProperties } from 'vue'

export default defineComponent({
    name: 'ClientLayout',
    setup(props, { slots }) {
        const Content = computed<CSSProperties>(() => ({
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
                    <common-ribbon></common-ribbon>
                    <layout-header></layout-header>
                    <n-layout-content content-style={Content.value} native-scrollbar={false} scrollbar-props={{ trigger: 'none' }}>
                        <n-element class="layout-pager n-chunk n-column n-auto">{{ default: slots.default }}</n-element>
                        <layout-footer></layout-footer>
                    </n-layout-content>
                </n-layout>
            </client-only>
        )
    }
})
</script>
