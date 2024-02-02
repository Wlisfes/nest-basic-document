<script lang="tsx">
export default defineNuxtComponent({
    name: 'Index',
    setup() {
        const config = useRuntimeConfig()
        return () => (
            <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">
                <div style={{ display: 'none' }}>{config.public.APP_NUXT_DESCRIPTIOM}</div>
                <common-clock max={960}></common-clock>
            </n-element>
        )
    }
})
</script>
