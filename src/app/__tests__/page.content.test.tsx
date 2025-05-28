import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home Page Content Requirements', () => {
  it('renders the correct hero heading from portfolio specification', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Senior Full-Stack Developer & Problem Solver')
    expect(heading).toBeInTheDocument()
  })

  it('renders the correct hero description from portfolio specification', () => {
    render(<Home />)
    const description = screen.getByText(/20\+ years crafting scalable web applications with React, Node\.js, and modern architectures/)
    expect(description).toBeInTheDocument()
  })

  it('renders the location badge', () => {
    render(<Home />)
    const locationBadge = screen.getByText('📍 Istanbul, Turkey • Remote Worldwide')
    expect(locationBadge).toBeInTheDocument()
  })

  it('renders the View Projects CTA button', () => {
    render(<Home />)
    const viewProjectsButton = screen.getByRole('link', { name: /view projects/i })
    expect(viewProjectsButton).toBeInTheDocument()
    expect(viewProjectsButton).toHaveAttribute('href', '#projects')
  })

  it('renders the Download CV CTA button', () => {
    render(<Home />)
    const downloadCvButton = screen.getByRole('link', { name: /download cv/i })
    expect(downloadCvButton).toBeInTheDocument()
    expect(downloadCvButton).toHaveAttribute('href', '/cv.pdf')
  })

  it('renders the Contact Me CTA button', () => {
    render(<Home />)
    const contactButton = screen.getByRole('link', { name: /contact me/i })
    expect(contactButton).toBeInTheDocument()
    expect(contactButton).toHaveAttribute('href', '#contact')
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

  it('renders the Featured Projects section', () => {
    render(<Home />)
    const featuredProjectsHeading = screen.getByRole('heading', { name: /featured projects/i })
    expect(featuredProjectsHeading).toBeInTheDocument()
  })

  it('renders the Technical Expertise section', () => {
    render(<Home />)
    const technicalExpertiseHeading = screen.getByRole('heading', { name: /technical expertise/i })
    expect(technicalExpertiseHeading).toBeInTheDocument()
  })

  describe('Theme Toggle Positioning', () => {
    it('has theme toggle positioned correctly in header', () => {
      render(<Home />)
      const header = screen.getByRole('banner')
      const themeToggle = screen.getByRole('button', { name: /switch to (light|dark) theme/i })
      
      expect(header).toContainElement(themeToggle)
      expect(header).toHaveClass('fixed', 'top-0', 'right-0', 'z-50')
    })
  })
}) 