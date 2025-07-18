import { render, screen } from '@testing-library/react'
import { Footer, type FooterContent } from '../Footer'

const mockFooterContent: FooterContent = {
  copyright: {
    title: "Test Portfolio",
    companyName: "Test Company",
    showcaseMessage: "This is a test project!"
  },
  repository: {
    title: "Test Source",
    url: "https://github.com/test/test",
    text: "View Test GitHub"
  },
  license: {
    title: "License Info",
    name: "MIT License",
    description: "Free to test everywhere."
  },
  buildInfo: "Built with test technologies."
}

describe('Footer Component', () => {
  it('renders footer with accessible role', () => {
    render(<Footer content={mockFooterContent} />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('displays copyright message with current year', () => {
    render(<Footer content={mockFooterContent} />)
    
    const currentYear = new Date().getFullYear()
    const copyright = screen.getByText(new RegExp(`© ${currentYear} ${mockFooterContent.copyright.companyName}`))
    expect(copyright).toBeInTheDocument()
  })

  it('displays repository link with proper attributes', () => {
    render(<Footer content={mockFooterContent} />)
    
    const githubLink = screen.getByRole('link', { name: /github repository/i })
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', mockFooterContent.repository.url)
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(githubLink).toHaveTextContent(mockFooterContent.repository.text)
  })

  it('displays license information', () => {
    render(<Footer content={mockFooterContent} />)
    
    const licenseText = screen.getByText(new RegExp(mockFooterContent.license.name))
    expect(licenseText).toBeInTheDocument()
    
    const licenseDescription = screen.getByText(mockFooterContent.license.description)
    expect(licenseDescription).toBeInTheDocument()
  })

  it('displays build information', () => {
    render(<Footer content={mockFooterContent} />)
    
    const buildInfo = screen.getByText(mockFooterContent.buildInfo)
    expect(buildInfo).toBeInTheDocument()
  })
}) 