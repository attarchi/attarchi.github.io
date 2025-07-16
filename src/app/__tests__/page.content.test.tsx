import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Home from '../page'

// Mock the modules using the __mocks__ files
jest.mock('@/lib/blog-data')
jest.mock('@/components/ui/Typewriter')
jest.mock('@/components/ui/ThemeToggle')
jest.mock('@/components/sections/HeroSection')
jest.mock('@/components/sections/FeaturedProjects')
jest.mock('@/components/sections/TechnicalExpertise')
jest.mock('@/components/sections/ProfessionalJourney')
jest.mock('@/components/sections/ContactSection')
jest.mock('@/components/sections/blog-preview-section')

describe('Home Page Content', () => {
  it('renders the main hero heading', async () => {
    await act(async () => {
      render(await Home())
    })
    const heading = screen.getByTestId('hero-heading')
    expect(heading).toBeInTheDocument()
  })

  it('renders the hero description', async () => {
    await act(async () => {
      render(await Home())
    })
    const description = screen.getByTestId('hero-description')
    expect(description).toBeInTheDocument()
  })

  it('renders the location badge', async () => {
    await act(async () => {
      render(await Home())
    })
    const locationBadge = screen.getByTestId('hero-location')
    expect(locationBadge).toBeInTheDocument()
  })

  it('renders the avatar image', async () => {
    await act(async () => {
      render(await Home())
    })
    const avatar = screen.getByTestId('hero-avatar')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', '/avatar.png')
    expect(avatar).toHaveAttribute('alt', 'Profile picture')
  })

  it('renders the scroll indicator', async () => {
    await act(async () => {
      render(await Home())
    })
    const scrollIndicator = screen.getByTestId('scroll-indicator')
    expect(scrollIndicator).toBeInTheDocument()
    expect(scrollIndicator).toHaveTextContent('Scroll to explore ↓')
  })

  it('renders CTA buttons', async () => {
    await act(async () => {
      render(await Home())
    })
    expect(screen.getByTestId('cta-primary')).toBeInTheDocument()
    expect(screen.getByTestId('cta-secondary')).toBeInTheDocument()
  })
}) 