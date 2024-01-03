import { computed } from 'vue'
import { useThemeVars, darkTheme, lightTheme, type GlobalThemeOverrides } from 'naive-ui'
import { useConfiger } from '@/store/configer'

export function useProvider() {
    const { configer, setTheme, setPrimaryColor } = useConfiger()
    const vars = useThemeVars()
    const inverted = computed(() => configer.value.theme === 'dark')
    const lightThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            primaryColor: configer.value.primaryColor
        }
    }))
    const darkThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            primaryColor: configer.value.primaryColor,
            primaryColorSuppl: configer.value.primaryColor
        }
    }))
    const theme = computed(() => {
        return configer.value.theme === 'light' ? lightTheme : darkTheme
    })
    const themeOverrides = computed(() => {
        return configer.value.theme === 'light' ? lightThemeOverrides.value : darkThemeOverrides.value
    })

    return { vars, inverted, theme, themeOverrides, setTheme, setPrimaryColor }
}
