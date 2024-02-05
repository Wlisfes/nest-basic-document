<script lang="tsx">
import { useVModels } from '@vueuse/core'
import { stop, enter } from '@/utils/utils-common'

export default defineNuxtComponent({
    name: 'CommonSearch',
    props: {
        value: { type: String },
        size: { type: String, default: 'large' },
        placeholder: { type: String },
        clearable: { type: Boolean, default: true },
        disabled: { type: Boolean, default: false },
        loading: { type: Boolean, default: false }
    },
    emits: ['update', 'search'],
    setup(props, { emit }) {
        const { value, disabled, loading } = useVModels(props, emit)

        function divineNodePrefixWrapper() {
            if (loading.value) {
                return <common-wrapper size={22} name="Spiner"></common-wrapper>
            } else {
                return (
                    <common-wrapper
                        size={22}
                        name="Search"
                        style={{ cursor: 'pointer' }}
                        onClick={(evt: Event) => stop(evt, () => emit('search', value.value))}
                    ></common-wrapper>
                )
            }
        }

        return () => (
            <n-input
                class="common-search"
                v-model:value={value.value}
                disabled={disabled.value}
                size={props.size}
                clearable={props.clearable}
                placeholder={props.placeholder}
                on-update:value={(text: string) => emit('update', text)}
                onKeydown={(evt: KeyboardEvent) => enter(evt, () => emit('search', value.value))}
                v-slots={{ prefix: divineNodePrefixWrapper }}
            ></n-input>
        )
    }
})
</script>

<style scoped lang="scss">
.common-resolver {
    position: relative;
}
</style>
