<script lang="tsx">
import { Fragment } from 'vue'
import { useNotification, useLoadingBar, useDialog, useMessage } from 'naive-ui'

export default defineComponent({
    name: 'CommonMounter',
    setup(props, { slots }) {
        if (process.client) {
            window.$loadingBar = useLoadingBar()
            window.$message = useMessage()
            window.$notification = useNotification()
            window.$dialog = useDialog()
        }
        return () => <Fragment>{slots.default()}</Fragment>
    }
})
</script>
