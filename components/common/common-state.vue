<script lang="tsx">
import { defineComponent, Fragment, computed, type PropType, type VNodeChild } from 'vue'
import { isEmpty } from 'class-validator'

export default defineComponent({
    name: 'CommonState',
    props: {
        disabled: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        dataRender: { type: Function as PropType<(e: Record<string, unknown>, c: unknown) => VNodeChild> }
    },
    setup(props, { slots, emit }) {
        const { disabled, loading } = useVModels(props, emit)
        const state = computed(() => ({ disabled: disabled.value, loading: loading.value }))
        async function setState(data: { disabled: boolean; loading: boolean }) {
            if (!isEmpty(data.disabled)) {
                disabled.value = data.disabled
            }
            if (!isEmpty(data.loading)) {
                loading.value = data.loading
            }
            return { disabled: disabled.value, loading: loading.value }
        }

        return () => {
            if (props.dataRender) {
                return props.dataRender(state.value, setState)
            }
            return <Fragment>{slots.default ? slots.default(state.value, setState) : undefined}</Fragment>
        }
    }
})
</script>
