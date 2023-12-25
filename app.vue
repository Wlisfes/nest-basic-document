<script lang="tsx">
export default defineNuxtComponent({
    name: 'App',
    setup() {
        return () => (
            <common-provider>
                <common-mounter>
                    <nuxt-layout>
                        <nuxt-page />
                    </nuxt-layout>
                </common-mounter>
            </common-provider>
        )
    }
})
</script>
