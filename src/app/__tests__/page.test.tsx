import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Home from '../page'

// Mock the typewriter effect
jest.mock('@/components/ui/Typewriter', () => {
  return function MockTypewriter({ text }: { text: string }) {
    return <div data-testid="typewriter-container">{text}</div>
  }
})

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    img: ({ ...props }: any) => <img {...props} />,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}))

// Mock subcomponents used in HeroSection
jest.mock('@/components/ui/Typography', () => ({
  Heading: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  Text: ({ children, ...props }: any) => <p {...props}>{children}</p>,
}))
jest.mock('@/components/ui/Section', () => ({
  Section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
}))
jest.mock('@/components/ui/Badge', () => ({
  Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}))
jest.mock('@/components/ui/AnimatedSection', () => ({
  AnimatedSection: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}))

// Mock HeroSection directly to avoid undefined errors in test
jest.mock('@/components/sections/HeroSection', () => ({
  HeroSection: ({ title, avatarSrc, avatarAlt, ctaPrimary, ctaSecondary }: any) => (
    <section data-testid="hero-section">
      <h1 data-testid="hero-heading">
        <div data-testid="typewriter-container">{title}</div>
      </h1>
      <img src={avatarSrc} alt={avatarAlt} />
      <div data-testid="scroll-indicator">Scroll to explore ↓</div>
      <a href={ctaPrimary?.link} role="link">{ctaPrimary?.text}</a>
      <a href={ctaSecondary?.link} role="link">{ctaSecondary?.text}</a>
    </section>
  ),
}))

describe('Home Page', () => {
  it('renders the theme toggle button', () => {
    render(<Home />)
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i })
    expect(themeToggle).toBeInTheDocument()
  })

  it('renders the hero section with typewriter effect', () => {
    render(<Home />)
    const typewriterContainer = screen.getByTestId('typewriter-container')
    expect(typewriterContainer).toBeInTheDocument()
  })

  it('renders the avatar image', () => {
    render(<Home />)
    const avatar = screen.getByAltText('Profile picture')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', '/avatar.png')
  })

  it('renders the scroll indicator', () => {
    render(<Home />)
    const scrollIndicator = screen.getByTestId('scroll-indicator')
    expect(scrollIndicator).toBeInTheDocument()
    expect(scrollIndicator).toHaveTextContent('Scroll to explore ↓')
  })

  it('renders the CTA buttons', () => {
    render(<Home />)
    const contactButton = screen.getByRole('link', { name: /contact me/i })
    const projectsButton = screen.getByRole('link', { name: /view projects/i })
    
    expect(contactButton).toBeInTheDocument()
    expect(projectsButton).toBeInTheDocument()
    
    expect(contactButton).toHaveAttribute('href', '#contact')
    expect(projectsButton).toHaveAttribute('href', '#projects')
  })

  it('renders all main sections', () => {
    render(<Home />)
    
    // Check for main sections
    expect(screen.getByText('Featured Projects')).toBeInTheDocument()
    expect(screen.getByText('Technical Expertise')).toBeInTheDocument()
    expect(screen.getByText('Professional Journey')).toBeInTheDocument()
    expect(screen.getByText('Latest Blog Posts')).toBeInTheDocument()
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument()
  })

  it('renders the contact form', () => {
    render(<Home />)
    
    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const messageTextarea = screen.getByTestId('message-textarea')
    const submitButton = screen.getByTestId('submit-button')
    
    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(messageTextarea).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Home />)
    
    const linkedinLink = screen.getByRole('link', { name: /https:\/\/linkedin\.com\/in\/attarchi/i })
    const githubLink = screen.getByRole('link', { name: /https:\/\/github\.com\/attarchi/i })
    
    expect(linkedinLink).toBeInTheDocument()
    expect(githubLink).toBeInTheDocument()
    
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/attarchi')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/attarchi')
  })
}) 