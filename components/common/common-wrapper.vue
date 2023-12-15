<script lang="tsx">
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import { createVNode, defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonWrapper',
    props: {
        name: { type: String, required: true },
        color: { type: String },
        depth: { type: Number },
        size: { type: Number }
    },
    setup(props) {
        return () => (
            <n-icon
                color={props.color}
                depth={props.depth}
                size={props.size}
                component={createVNode(
                    <svg class="common-wrapper" aria-hidden="true">
                        {createVNode('use', { 'xlink:href': `#icon-${props.name}` })}
                    </svg>
                )}
            />
        )
    }
})
</script>

<style scoped lang="scss">
.common-wrapper {
    width: 1em;
    height: 1em;
    position: relative;
    fill: currentColor;
    vertical-align: bottom;
}
</style>
