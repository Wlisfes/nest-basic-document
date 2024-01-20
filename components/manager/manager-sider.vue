<script lang="tsx">
import { useManager } from '@/hooks/hook-manager'

export default defineNuxtComponent({
    name: 'ManagerSider',
    props: {
        inverted: { type: Boolean },
        collapse: { type: Boolean }
    },
    setup(props) {
        const route = useRoute()
        const { formatter } = useManager()

        return () => (
            <n-menu
                accordion
                root-indent={24}
                collapsed-width={80}
                value={route.path}
                inverted={props.inverted}
                collapsed={props.collapse}
                style={{ '--n-item-height': '50px' }}
                options={formatter.value}
            ></n-menu>
        )
    }
})
</script>
