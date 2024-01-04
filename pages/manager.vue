<script lang="tsx">
export default defineNuxtComponent({
    name: 'BasicManager',
    setup(props, { slots }) {
        return () => (
            <nuxt-layout name="manager">
                <nuxt-page></nuxt-page>
            </nuxt-layout>
        )
    }
})
</script>
