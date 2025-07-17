'use client'

import React, { useContext } from 'react'
import { ThemeContext } from '@/lib/theme'
import { themeConfig } from '@/content'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="transition-colors duration-300 ease-in-out"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? themeConfig.icons.light : themeConfig.icons.dark}
    </button>
  )
} 