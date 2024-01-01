<script lang="tsx">
import { useUser } from '@/store/user'
import { beforeResolver } from '@/utils/utils-router'

export default defineNuxtComponent({
    name: 'Index',
    head: {
        titleTemplate: (title: string) => `${title} - 一个神奇的网站`
    },
    async beforeRouteEnter(to, form, next) {
        // const store = useUser()

        // console.log(store)
        return await beforeResolver(to, form, next)
    },
    setup() {
        return () => (
            <nuxt-layout name="client">
                <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">
                    <common-clock max={960}></common-clock>
                </n-element>
            </nuxt-layout>
        )
    }
})
</script>
