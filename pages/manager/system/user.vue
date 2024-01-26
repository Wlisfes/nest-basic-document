<script lang="tsx">
import { useResolver } from '@/hooks/hook-resolver'
import * as http from '@/interface/instance.service'

export default defineNuxtComponent({
    name: 'MUser',
    setup(props, { slots }) {
        const { setState, fetchUpdate } = useResolver({
            immediate: false,
            request: async data => {
                return await http.fetchUserColumnr()
            }
        })

        return () => <common-resolver></common-resolver>
    }
})
</script>
