import { render, screen } from '@testing-library/react'
import NotFound from '../not-found'

describe('NotFound Page', () => {
  it('renders 404 heading', () => {
    render(<NotFound />)
    const heading = screen.getByText('404')
    expect(heading).toBeInTheDocument()
  })

  it('renders page not found message', () => {
    render(<NotFound />)
    const message = screen.getByText('Page Not Found')
    expect(message).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<NotFound />)
    const description = screen.getByText(/The page you're looking for doesn't exist or has been moved./)
    expect(description).toBeInTheDocument()
  })

  it('renders return home link', () => {
    render(<NotFound />)
    const homeLink = screen.getByRole('link', { name: /Return Home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('has correct styling classes', () => {
    render(<NotFound />)
    const container = screen.getByRole('link', { name: /Return Home/i }).parentElement?.parentElement
    expect(container).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center', 'bg-gray-100')
  })
}) 