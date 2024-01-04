import { useStore } from '@/utils/utils-cookie'

export const useConfiger = (store: ReturnType<typeof useStore>) => {
    const configer = useState('configer', () => ({
        theme: store.store.value.theme,
        primaryColor: store.store.value.primaryColor
    }))

    return {
        configer,
        setTheme: async (value: 'light' | 'dark') => await store.setTheme(value, () => (configer.value.theme = value)),
        setPrimaryColor: async (value: string) => await store.setPrimaryColor(value, () => (configer.value.primaryColor = value))
    }
}
