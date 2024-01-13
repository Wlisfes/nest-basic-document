import { useStore } from '@/utils/utils-cookie'

export function useManager(store: ReturnType<typeof useStore>) {
    const manager = useState('manager', () => ({
        router: [
            { label: '概述', key: '/manager', icon: 'Github', rules: ['administrator', 'developer'] },
            { label: 'Document', key: '/document', icon: 'Github', rules: ['administrator', 'developer'] }
        ]
    }))

    const formatter = computed(() => {
        return []
    })

    return { manager, formatter }
}
