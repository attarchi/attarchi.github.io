import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home Page', () => {
  it('renders Next.js logo', () => {
    render(<Home />)
    const logo = screen.getByAltText('Next.js logo')
    expect(logo).toBeInTheDocument()
  })

  it('renders getting started text', () => {
    render(<Home />)
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument()
    expect(screen.getByText(/Save and see your changes instantly/i)).toBeInTheDocument()
  })

  it('renders deployment link', () => {
    render(<Home />)
    const deployLink = screen.getByText('Deploy now')
    expect(deployLink).toBeInTheDocument()
    expect(deployLink.closest('a')).toHaveAttribute('href', 'https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app')
  })

  it('renders documentation link', () => {
    render(<Home />)
    const docsLink = screen.getByText('Read our docs')
    expect(docsLink).toBeInTheDocument()
    expect(docsLink.closest('a')).toHaveAttribute('href', 'https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app')
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