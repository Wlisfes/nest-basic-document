<script lang="tsx">
export default defineNuxtComponent({
    name: 'BasicIndex',
    setup() {
        return () => (
            <nuxt-layout name="client">
                <nuxt-page></nuxt-page>
            </nuxt-layout>
        )
    }
})
</script>
