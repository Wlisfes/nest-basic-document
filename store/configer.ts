export const useConfiger = () => {
    const configer = useState('configer', () => ({
        theme: 'dark',
        primaryColor: '#18a058'
    }))

    async function setTheme(theme: 'light' | 'dark') {
        return (configer.value.theme = theme)
    }

    async function setPrimaryColor(primaryColor: string) {
        return (configer.value.primaryColor = primaryColor)
    }

    return { configer, setTheme, setPrimaryColor }
}
