'use client'

import React, { createContext, useState, ReactNode, useEffect } from 'react'
import { themeConfig } from '@/content'

export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: themeConfig.defaultTheme,
  setTheme: () => {}
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return themeConfig.defaultTheme
    const storedTheme = localStorage.getItem(themeConfig.localStorageKey) as Theme | null
    if (storedTheme) return storedTheme
    const prefersDark = typeof window.matchMedia !== 'undefined' && window.matchMedia(themeConfig.mediaQuery).matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(themeConfig.lightClass, themeConfig.darkClass)
    root.classList.add(theme)
    root.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(themeConfig.localStorageKey, theme)
    }
  }, [theme])

  useEffect(() => {
    if (typeof window?.matchMedia === 'undefined') return
    const mediaQuery = window.matchMedia(themeConfig.mediaQuery)
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
} 