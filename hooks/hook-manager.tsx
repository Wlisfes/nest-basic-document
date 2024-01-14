import { NH1, type MenuOption } from 'naive-ui'
import { createVNode } from 'vue'

export interface NodeOption {
    label: string
    key: string
    icon: string
    roles: string[]
    children?: NodeOption[]
}

export function useManager() {
    const { $user } = useNuxtApp()
    const tree = ref<Array<NodeOption>>([
        { label: '主控台', key: '/manager', icon: 'Github', roles: ['administrator', 'developer', 'customer'] },
        { label: '标签管理', key: '/manager/source', icon: 'Github', roles: ['administrator', 'developer', 'customer'] },
        {
            label: '系统管理',
            key: '/manager/system',
            icon: 'Github',
            roles: ['administrator', 'developer'],
            children: [
                { label: '用户管理', key: '/manager/system/user', icon: 'Github', roles: ['administrator', 'developer'] },
                { label: '角色管理', key: '/manager/system/role', icon: 'Github', roles: ['administrator', 'developer'] }
            ]
        }
    ])

    const formatter = computed(() => {
        return tree.value.filter(node => divineNodeFormatter(node, $user.user.value.roles)).map(divineNodeTransfer)
    })

    return { tree, formatter }
}

export function divineNodeFormatter<T extends NodeOption>(node: T, roles: string[]) {
    if (node.roles.some(role => roles.includes(role))) {
        if (node.children && node.children.length > 0) {
            node.children = node.children.filter(item => divineNodeFormatter(item, roles))
        }
        if (node.children && node.children.length === 0) {
            return false
        }
        return true
    }
    return false
}

export function divineNodeTransfer<T extends NodeOption>(node: T) {
    const option: MenuOption = {
        key: node.key,
        label: function () {
            if (node.children && node.children.length > 0) {
                return createVNode(<NH1 style={{ fontSize: '16px', fontWeight: 500, margin: 0 }}>{node.label}</NH1>)
            }
            return createVNode(
                <router-link to={node.key}>
                    <NH1 style={{ fontSize: '16px', fontWeight: 500, margin: 0 }}>{node.label}</NH1>
                </router-link>
            )
        }
    }
    if (node.icon) {
        option.icon = function () {
            return createVNode(<common-wrapper name={node.icon} size={28}></common-wrapper>)
        }
    }
    if (node.children && node.children.length > 0) {
        option.children = node.children.map(divineNodeTransfer)
    }
    return option
}
