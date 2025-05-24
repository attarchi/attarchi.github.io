import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  const defaultProps = {
    headline: 'Senior Full-Stack Developer',
    subtitle: 'Based in',
    location: 'San Francisco, CA',
    avatarSrc: '/avatar.jpg',
    avatarAlt: 'Professional headshot',
    ctaPrimary: {
      label: 'Contact',
      href: '/contact'
    },
    ctaSecondary: {
      label: 'View Work',
      href: '/work'
    }
  }

  it('renders with all required elements', () => {
    render(<Hero {...defaultProps} />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(defaultProps.headline)
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument()
    expect(screen.getByText(defaultProps.location)).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', defaultProps.avatarSrc)
    expect(screen.getByRole('img')).toHaveAttribute('alt', defaultProps.avatarAlt)
    expect(screen.getByRole('link', { name: defaultProps.ctaPrimary.label })).toHaveAttribute('href', defaultProps.ctaPrimary.href)
    expect(screen.getByRole('link', { name: defaultProps.ctaSecondary.label })).toHaveAttribute('href', defaultProps.ctaSecondary.href)
  })

  it('maintains proper heading hierarchy', () => {
    render(<Hero {...defaultProps} />)
    
    const headings = screen.getAllByRole('heading')
    expect(headings[0]).toHaveAttribute('role', 'heading')
    expect(headings[0]).toHaveAttribute('aria-level', '1')
  })

  it('is responsive with correct classes', () => {
    render(<Hero {...defaultProps} />)
    
    const container = screen.getByTestId('hero-container')
    expect(container).toHaveClass('min-h-screen')
    expect(container).toHaveClass('md:min-h-screen')
  })

  it('renders scroll indicator', () => {
    render(<Hero {...defaultProps} />)
    
    expect(screen.getByTestId('scroll-indicator')).toBeInTheDocument()
  })

  it('handles missing optional props gracefully', () => {
    const minimalProps = {
      headline: defaultProps.headline,
      subtitle: defaultProps.subtitle,
      location: defaultProps.location
    }
    
    render(<Hero {...minimalProps} />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(minimalProps.headline)
    expect(screen.getByText(minimalProps.subtitle)).toBeInTheDocument()
    expect(screen.getByText(minimalProps.location)).toBeInTheDocument()
  })
}) 