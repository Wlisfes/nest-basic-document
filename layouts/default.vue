<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BaseLayout',
    setup(props, { slots }) {
        return () => (
            <client-only>
                <n-layout
                    style={{ height: '100%', overflow: 'hidden', position: 'relative' }}
                    content-style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                >
                    <n-layout-header style={{ height: '60px' }} bordered={true}>
                        header
                    </n-layout-header>
                    <n-layout-content
                        class="n-chunk n-column n-auto"
                        style={{ overflow: 'hidden', position: 'relative' }}
                        native-scrollbar={false}
                        scrollbar-props={{ trigger: 'none' }}
                    >
                        {slots.default?.()}
                    </n-layout-content>
                </n-layout>
            </client-only>
        )
    }
})
</script>
