<script lang="tsx">
export default defineNuxtComponent({
    name: 'Index',
    head() {
        return {
            titleTemplate: (title: string) => `${title} - 一个神奇的网站`
        }
    },
    setup() {
        definePageMeta({ middleware: 'resolver' })

        return () => (
            <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">
                <common-clock max={960}></common-clock>
            </n-element>
        )
    }
})
</script>
