<script lang="tsx">
export default defineNuxtComponent({
    name: 'BasicCommon',
    setup() {
        return () => (
            <nuxt-layout name="client">
                <nuxt-page></nuxt-page>
            </nuxt-layout>
        )
    }
})
</script>
