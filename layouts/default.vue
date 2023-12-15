<script lang="tsx">
import { defineComponent, computed, type CSSProperties } from 'vue'

export default defineComponent({
    name: 'BaseLayout',
    setup(props, { slots }) {
        const contentStyle = computed<CSSProperties>(() => ({
            overflow: 'hidden',
            position: 'relative',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column'
        }))

        return () => (
            <client-only>
                <n-layout class="layout-provider" content-style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <n-layout-header style={{ height: '60px' }} bordered={true}>
                        header
                    </n-layout-header>
                    <n-layout-content content-style={contentStyle.value} native-scrollbar={false} scrollbar-props={{ trigger: 'none' }}>
                        {slots.default?.()}
                    </n-layout-content>
                </n-layout>
            </client-only>
        )
    }
})
</script>
~/store/configer
