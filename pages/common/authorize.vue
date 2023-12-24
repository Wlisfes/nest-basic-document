<script lang="tsx">
export default defineNuxtComponent({
    name: 'Authorize',
    head: () => ({
        titleTemplate: (title: string) => `${title} - 登录`
    }),
    setup() {
        return () => <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter"></n-element>
    }
})
</script>
