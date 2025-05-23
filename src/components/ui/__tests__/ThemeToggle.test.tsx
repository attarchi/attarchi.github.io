import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ThemeToggle } from '../ThemeToggle'
import { ThemeProvider } from '../../../lib/theme/ThemeContext'

describe('ThemeToggle', () => {
  it('toggles theme when clicked', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to dark theme')
    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-label', 'Switch to light theme')
    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-label', 'Switch to dark theme')
  })
}) 