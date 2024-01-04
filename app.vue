<script lang="tsx">
export default defineNuxtComponent({
    name: 'App',
    setup() {
        return () => (
            <client-only>
                <layout-provider>
                    <nuxt-page />
                </layout-provider>
            </client-only>
        )
    }
})
</script>
