<script lang="tsx">
import { useResolver } from '@/hooks/hook-resolver'
import * as http from '@/interface/instance.service'

export default defineNuxtComponent({
    name: 'MUser',
    setup(props, { slots }) {
        const { setState, fetchUpdate } = useResolver({
            immediate: true,
            request: async data => {
                return await http.fetchUserColumnr()
            }
        })

        return () => (
            <n-element class="layout-provider">
                <n-button onClick={fetchUpdate}>Set</n-button>
                {Array.from({ length: 5 }, (x, i) => (
                    <n-h1>User</n-h1>
                ))}
            </n-element>
        )
    }
})
</script>
