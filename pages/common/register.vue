<script lang="tsx">
export default defineNuxtComponent({
    name: 'Register',
    head: () => ({
        titleTemplate: (title: string) => `${title} - 注册`
    }),
    setup() {
        return () => <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">register</n-element>
    }
})
</script>
