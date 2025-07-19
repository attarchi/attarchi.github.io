'use client'

import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext } from '@/lib/theme'
import { themeConfig } from '@/content'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button
        className="transition-colors duration-300 ease-in-out"
        aria-label="Toggle theme"
      >
        ☀️
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="transition-colors duration-300 ease-in-out"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '☀️' : '🌙'}
    </button>
  )
} 