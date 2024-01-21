<script lang="tsx">
import * as http from '@/interface/instance.service'

export default defineNuxtComponent({
    name: 'MUser',
    setup(props, { slots }) {
        http.fetchUserColumnr().then(data => {
            console.log(data)
        })

        return () => (
            <n-element class="layout-provider">
                {Array.from({ length: 50 }, (x, i) => (
                    <n-h1>User</n-h1>
                ))}
            </n-element>
        )
    }
})
</script>
