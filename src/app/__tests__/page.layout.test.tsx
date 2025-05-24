import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home Page Layout Requirements', () => {
  it('has full-width hero section without width constraints', () => {
    render(<Home />)
    
    const heroSection = screen.getByRole('heading', { level: 1 }).closest('section')
    expect(heroSection).toHaveClass('w-full')
    // Should not have max-width constraints that limit the section
    expect(heroSection).not.toHaveClass('max-w-7xl')
    expect(heroSection).not.toHaveClass('max-w-6xl')
    expect(heroSection).not.toHaveClass('max-w-5xl')
  })

  it('has proper full viewport height', () => {
    render(<Home />)
    
    const heroSection = screen.getByRole('heading', { level: 1 }).closest('section')
    expect(heroSection).toHaveClass('min-h-screen')
  })

  it('has centered content container with reasonable max width', () => {
    render(<Home />)
    
    const contentContainer = screen.getByRole('heading', { level: 1 }).closest('div')
    expect(contentContainer).toHaveClass('container', 'mx-auto', 'max-w-4xl', 'text-center')
  })
}) 