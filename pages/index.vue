<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Index',
    setup(props, { slots }) {
        return () => (
            <n-element class="layout-provider">
                <n-space>
                    <n-button>
                        <nuxt-link to="/document">Document</nuxt-link>
                    </n-button>
                    <n-button type="tertiary">Tertiary</n-button>
                    <n-button type="primary">Primary</n-button>
                    <n-button type="info">Info</n-button>
                    <n-button type="success">Success</n-button>
                    <n-button type="warning">Warning</n-button>
                    <n-button type="error">Error</n-button>
                </n-space>
            </n-element>
        )
    }
})
</script>
