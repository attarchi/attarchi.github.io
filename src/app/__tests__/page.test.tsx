import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home Page', () => {
  it('renders the main hero heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Senior Full-Stack Developer & Problem Solver')
    expect(heading).toBeInTheDocument()
  })

  it('renders the hero description', () => {
    render(<Home />)
    const description = screen.getByText(/20\+ years crafting scalable web applications with React, Node\.js, and modern architectures/)
    expect(description).toBeInTheDocument()
  })

  it('renders the theme toggle button', () => {
    render(<Home />)
    const themeToggle = screen.getByRole('button', { name: /switch to (light|dark) theme/i })
    expect(themeToggle).toBeInTheDocument()
  })

  it('renders the scroll indicator', () => {
    render(<Home />)
    const scrollIndicator = screen.getByTestId('scroll-indicator')
    expect(scrollIndicator).toBeInTheDocument()
  })
}) 