<script lang="tsx">
export default defineNuxtComponent({
    name: 'ManagerContainer',
    props: {
        loading: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        return () => (
            <n-element class="manager-container n-chunk n-column n-auto">
                <n-spin class={{ 'manager-container__loadiner': true }} show={props.loading} stroke-width={16} size={68}>
                    {{ default: slots.default }}
                </n-spin>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.manager-container {
    position: relative;
    &__loadiner {
        flex: 1;
        display: flex;
        flex-direction: column;
        :deep(.n-spin-content) {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
