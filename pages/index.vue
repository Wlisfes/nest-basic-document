<script lang="tsx">
import { beforeResolver } from '@/utils/utils-router'
import { useUser } from '@/store/user'

export default defineNuxtComponent({
    name: 'Index',
    head: {
        titleTemplate: (title: string) => `${title} - 一个神奇的网站`
    },
    beforeRouteEnter(to, form, next) {
        console.log({ to, form, next })
        return next(vm => {
            const user = useUser()
            console.log(user)
        })
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
