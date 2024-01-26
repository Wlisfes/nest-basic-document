<script lang="tsx">
export default defineNuxtComponent({
    name: 'CommonResolver',
    setup() {
        return () => (
            <n-element class="common-resolver n-chunk n-column n-auto">
                <common-search></common-search>
            </n-element>
        )
    }
})
</script>

<style scoped lang="scss">
.common-resolver {
    position: relative;
}
</style>
