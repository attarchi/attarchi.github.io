import { Theme } from '@/lib/theme';

export interface ThemeConfig {
    defaultTheme: Theme
    localStorageKey: string
    colorSchemeAttribute: string
    classListAttribute: string
    lightClass: string
    darkClass: string
    mediaQuery: string
    icons: {
        light: string
        dark: string
    }
}

export const themeConfig: ThemeConfig = {
    defaultTheme: 'light' as Theme,
    localStorageKey: 'theme',
    colorSchemeAttribute: 'colorScheme',
    classListAttribute: 'classList',
    lightClass: 'light',
    darkClass: 'dark',
    mediaQuery: '(prefers-color-scheme: dark)',
    icons: {
        light: '🌙',
        dark: '☀️'
    }
}; 