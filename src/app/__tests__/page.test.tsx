import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home Page', () => {
  it('renders UI Component Showcase heading', () => {
    render(<Home />)
    const heading = screen.getByText('UI Component Showcase')
    expect(heading).toBeInTheDocument()
  })

  it('renders component sections', () => {
    render(<Home />)
    expect(screen.getByText('Badges')).toBeInTheDocument()
    expect(screen.getByText('Buttons')).toBeInTheDocument()
    expect(screen.getByText('Card')).toBeInTheDocument()
    expect(screen.getByText('Section')).toBeInTheDocument()
    expect(screen.getByText('Typography')).toBeInTheDocument()
  })

  it('renders footer links', () => {
    render(<Home />)
    expect(screen.getByText('Learn')).toBeInTheDocument()
    expect(screen.getByText('Examples')).toBeInTheDocument()
    expect(screen.getByText('Go to nextjs.org →')).toBeInTheDocument()
  })

  it('renders footer icons', () => {
    render(<Home />)
    expect(screen.getByAltText('File icon')).toBeInTheDocument()
    expect(screen.getByAltText('Window icon')).toBeInTheDocument()
    expect(screen.getByAltText('Globe icon')).toBeInTheDocument()
  })
}) 