import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeToggle } from '../ThemeToggle'
import { ThemeContext } from '@/lib/theme'

// Mock ThemeProvider for testing
const MockThemeProvider = ({ children, initialTheme = 'light' }: { children: React.ReactNode, initialTheme?: 'light' | 'dark' }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(initialTheme)
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const renderWithTheme = (component: React.ReactElement, initialTheme: 'light' | 'dark' = 'light') => {
  return render(
    <MockThemeProvider initialTheme={initialTheme}>
      {component}
    </MockThemeProvider>
  )
}

describe('ThemeToggle', () => {
  it('renders the theme toggle button', () => {
    renderWithTheme(<ThemeToggle />)
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })

  it('toggles theme when clicked', async () => {
    renderWithTheme(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /toggle theme/i })
    
    // Initially should show sun icon (light theme - click to go dark)
    expect(button).toHaveTextContent('☀️')
    
    fireEvent.click(button)
    
    // After click, should show moon icon (dark theme - click to go light)
    await waitFor(() => {
      expect(button).toHaveTextContent('🌙')
    })
  })

  it('displays correct icon for light theme', () => {
    renderWithTheme(<ThemeToggle />, 'light')
    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toHaveTextContent('☀️')
  })

  it('displays correct icon for dark theme', () => {
    renderWithTheme(<ThemeToggle />, 'dark')
    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toHaveTextContent('🌙')
  })

  it('shows default icon during server-side rendering', () => {
    renderWithTheme(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /toggle theme/i })
    
    // During SSR, should always show the sun icon (light theme default)
    expect(button).toHaveTextContent('☀️')
  })

  it('handles hydration correctly', async () => {
    renderWithTheme(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /toggle theme/i })
    
    // Initially shows sun icon (light theme - SSR state)
    expect(button).toHaveTextContent('☀️')
    
    // After hydration, should still show the sun icon (light theme)
    await waitFor(() => {
      expect(button).toHaveTextContent('☀️')
    })
    
    // Click to test theme switching to dark
    fireEvent.click(button)
    
    // Verify the icon changes after clicking
    await waitFor(() => {
      const newButton = screen.getByRole('button', { name: /toggle theme/i })
      expect(newButton).not.toHaveTextContent('☀️')
    })
  })
}) 