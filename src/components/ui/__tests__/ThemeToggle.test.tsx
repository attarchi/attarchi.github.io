import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from '../ThemeToggle'
import { ThemeContext } from '../../../lib/theme/ThemeContext'
import React, { useState } from 'react'

const renderWithTheme = (initialTheme: 'light' | 'dark' = 'light') => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme)
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    )
  }
  return render(<ThemeToggle />, { wrapper: Wrapper })
}

describe('ThemeToggle', () => {
  it('renders the theme toggle button', () => {
    renderWithTheme()
    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toBeInTheDocument()
  })

  it('toggles theme when clicked', async () => {
    renderWithTheme('light')
    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toHaveTextContent('🌙')
    await userEvent.click(button)
    expect(button).toHaveTextContent('☀️')
    await userEvent.click(button)
    expect(button).toHaveTextContent('🌙')
  })

  it('displays correct icon for light theme', () => {
    renderWithTheme('light')
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('🌙')
  })

  it('displays correct icon for dark theme', () => {
    renderWithTheme('dark')
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('☀️')
  })

  it('has proper styling classes', () => {
    renderWithTheme()
    const button = screen.getByRole('button')
    expect(button).toHaveClass('transition-colors', 'duration-300', 'ease-in-out')
  })
}) 