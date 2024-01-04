import { computed } from 'vue'
import { useThemeVars, darkTheme, lightTheme, type GlobalThemeOverrides, type ConfigProviderProps } from 'naive-ui'

export function useProvider() {
    const { $configer } = useNuxtApp()
    const vars = useThemeVars()
    const inverted = computed(() => $configer.configer.value.theme === 'dark')
    const lightThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            primaryColor: $configer.configer.value.primaryColor
        }
    }))

    const darkThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            primaryColor: $configer.configer.value.primaryColor,
            primaryColorSuppl: $configer.configer.value.primaryColor
        }
    }))

    const theme = computed(() => {
        return $configer.configer.value.theme === 'light' ? lightTheme : darkTheme
    })

    const themeOverrides = computed(() => {
        return $configer.configer.value.theme === 'light' ? lightThemeOverrides.value : darkThemeOverrides.value
    })

    const configProvider = computed<ConfigProviderProps>(() => ({
        theme: theme.value,
        themeOverrides: themeOverrides.value
    }))

    return {
        vars,
        inverted,
        theme,
        themeOverrides,
        configProvider
    }
}
