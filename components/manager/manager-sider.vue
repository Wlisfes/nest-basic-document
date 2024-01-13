<script lang="tsx">
import { createVNode } from 'vue'
import { useProvider } from '@/hooks/hook-provider'

const dataOptions = [
    { label: '概述', key: '/manager', icon: 'Github', rules: ['administrator', 'developer'] },
    { label: 'Document', key: '/document', icon: 'Github', rules: ['administrator', 'developer'] }
]

export default defineNuxtComponent({
    name: 'ManagerSider',
    setup() {
        const { $configer, $manager } = useNuxtApp()
        const { inverted } = useProvider()

        const menuOptions = computed(() => {
            return dataOptions.reduce((current, next) => {
                return []
            }, [])
        })

        console.log($manager)

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
                inverted={inverted.value}
                root-indent={24}
                collapsed-width={80}
                value={'/manager'}
                collapsed={$configer.configer.value.collapse}
                style={{ '--n-item-height': '50px' }}
                //options={menuOptions.value}
                //render-label={divineLabelRender}
                //render-icon={divineIconRender}
            />
        )
    }
})
</script>
