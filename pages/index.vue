<script lang="tsx">
import { httpUserRegister } from '@/api'

export default defineNuxtComponent({
    name: 'Index',
    head: () => ({
        titleTemplate: (title: string) => `${title} - 一个神奇的网站`
    }),
    async setup() {
        const data = await httpUserRegister({
            nickname: '',
            mobile: '',
            password: '',
            code: ''
        })

        return () => (
            <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">
                <common-clock max={960}></common-clock>
            </n-element>
        )
    }
})
</script>
