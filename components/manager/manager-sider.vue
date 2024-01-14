<script lang="tsx">
import { createVNode } from 'vue'
import { useManager } from '@/hooks/hook-manager'

export default defineNuxtComponent({
    name: 'ManagerSider',
    props: {
        inverted: { type: Boolean },
        collapse: { type: Boolean }
    },
    setup(props) {
        const { formatter } = useManager()

        function divineIconRender(node: { icon: string }) {
            return createVNode(<common-wrapper name={node.icon} size={28}></common-wrapper>)
        }

        function divineLabelRender(node: { label: string; key: string }) {
            return createVNode(
                <router-link to={node.key}>
                    <n-element tag="h1" style={{ fontSize: '18px', fontWeight: 500, margin: 0 }}>
                        {node.label}
                    </n-element>
                </router-link>
            )
        }

        return () => (
            <n-menu
                accordion
                root-indent={24}
                collapsed-width={80}
                value={'/manager'}
                inverted={props.inverted}
                collapsed={props.collapse}
                style={{ '--n-item-height': '50px' }}
                options={formatter.value}
                //render-label={divineLabelRender}
                //render-icon={divineIconRender}
            />
        )
    }
})
</script>
