<script lang="tsx">
export default defineNuxtComponent({
    name: 'MUser',
    setup(props, { slots }) {
        return () => (
            <n-element class="layout-provider">
                {Array.from({ length: 50 }, (x, i) => (
                    <n-h1>User</n-h1>
                ))}
            </n-element>
        )
    }
})
</script>
