import { useStore } from '@/utils/utils-cookie'

export const useConfiger = () => {
    const { store, setTheme, setPrimaryColor } = useStore()
    const configer = useState('configer', () => ({
        theme: store.value.theme,
        primaryColor: store.value.primaryColor
    }))

    return {
        configer,
        setTheme: async (value: 'light' | 'dark') => await setTheme(value, () => (configer.value.theme = value)),
        setPrimaryColor: async (value: string) => await setPrimaryColor(value, () => (configer.value.primaryColor = value))
    }
}
