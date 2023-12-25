<script lang="tsx">
import { useNotification, useLoadingBar, useDialog, useMessage } from 'naive-ui'

export default defineComponent({
    name: 'App',
    setup() {
        return () => (
            <common-provider>
                <nuxt-layout>
                    <nuxt-page />
                </nuxt-layout>
            </common-provider>
        )
    }
})
</script>
