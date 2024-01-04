import { useStore } from '@/utils/utils-cookie'

export const useConfiger = (store: ReturnType<typeof useStore>) => {
    const configer = useState('configer', () => ({
        theme: store.store.value.theme,
        primaryColor: store.store.value.primaryColor,
        collapse: false,
        device: 'PC'
    }))

    async function setTheme(value: 'light' | 'dark') {
        return await store.setTheme(value, () => {
            return (configer.value.theme = value)
        })
    }

    async function setPrimaryColor(value: string) {
        return await store.setPrimaryColor(value, () => {
            return (configer.value.primaryColor = value)
        })
    }

    async function setCollapse(value: boolean) {
        return (configer.value.collapse = value)
    }

    async function setDevice(value: 'PC' | 'IPAD' | 'MOBILE') {
        return (configer.value.device = value)
    }

    return {
        configer,
        setTheme,
        setPrimaryColor,
        setCollapse,
        setDevice
    }
}
