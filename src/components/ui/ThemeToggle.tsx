'use client'

import React, { useContext } from 'react'
import { ThemeContext } from '../../lib/theme/ThemeContext'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="transition-colors duration-300 ease-in-out"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
} 