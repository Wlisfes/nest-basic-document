<script lang="tsx">
export default defineNuxtComponent({
    name: 'App',
    setup() {
        return () => (
            <layout-provider>
                <nuxt-page />
            </layout-provider>
        )
    }
})
</script>
