import { Theme } from '@/types';

export const themeConfig = {
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