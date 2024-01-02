<script lang="tsx">
export default defineNuxtComponent({
    name: 'App',
    beforeRouteEnter(to, form, next) {
        console.log({ to, form, next })
        return next(vm => {
            console.log({ vm })
        })
    },
    setup() {
        return () => (
            <layout-provider>
                <nuxt-page />
            </layout-provider>
        )
    }
})
</script>
