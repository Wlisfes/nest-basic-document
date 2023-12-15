import { computed } from 'vue'
import { useThemeVars, darkTheme, lightTheme, type GlobalThemeOverrides } from 'naive-ui'
import { useConfiger } from '@/store/configer'

export function useProvider() {
    const configer = useConfiger()
    const vars = useThemeVars()
    const inverted = computed(() => configer.theme === 'dark')
    const lightThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            primaryColor: configer.primaryColor
        }
    }))
    const darkThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            primaryColor: configer.primaryColor,
            primaryColorSuppl: configer.primaryColor
        }
    }))
    const theme = computed(() => {
        return configer.theme === 'light' ? lightTheme : darkTheme
    })
    const themeOverrides = computed(() => {
        return configer.theme === 'light' ? lightThemeOverrides.value : darkThemeOverrides.value
    })

    return { vars, inverted, theme, themeOverrides, setTheme: configer.setTheme, setPrimaryColor: configer.setPrimaryColor }
}
