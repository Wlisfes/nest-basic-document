<script lang="tsx">
export default defineNuxtComponent({
    name: 'Index',
    async setup() {
        await createSeoMeta('一个神奇的网站')
        return () => (
            <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">
                <common-clock max={960}></common-clock>
            </n-element>
        )
    }
})
</script>
