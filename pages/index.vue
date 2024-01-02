<script lang="tsx">
export default defineNuxtComponent({
    name: 'Index',
    async setup() {
        await createSeoMeta('首页')
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
