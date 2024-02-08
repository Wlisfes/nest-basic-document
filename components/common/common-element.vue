<script lang="tsx">
import { type PropType } from 'vue'

export default defineNuxtComponent({
    name: 'CommonElement',
    props: {
        loading: { type: Boolean, default: false },
        mode: { type: String as PropType<'relative' | 'absolute'>, default: 'relative' }
    },
    setup(props, { slots }) {
        return () => <n-element class={{ 'common-element': true, [`is-${props.mode}`]: true }}>{{ default: slots.default }}</n-element>
    }
})
</script>

<style lang="scss" scoped>
.common-element {
    &.is-relative {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    &.is-absolute {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
    }
}
</style>
