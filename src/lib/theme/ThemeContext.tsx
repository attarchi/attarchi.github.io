'use client'

import React, { createContext, useState, ReactNode, useEffect } from 'react'

export type Theme = 'light' | 'dark'

export type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {}
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return 'light'
    const storedTheme = localStorage.getItem('theme') as Theme | null
    if (storedTheme) return storedTheme
    const prefersDark = typeof window.matchMedia !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  useEffect(() => {
    if (typeof window?.matchMedia === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
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