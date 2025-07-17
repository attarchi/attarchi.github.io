import React from 'react'
import { Theme, ThemeContextType } from '@/types'

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {}
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return React.createElement('div', {}, children)
} 