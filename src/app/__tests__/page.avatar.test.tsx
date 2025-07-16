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

describe('Home Page Avatar', () => {
  it('renders the avatar image with correct attributes', async () => {
    await act(async () => {
      render(await Home())
    })
    
    const avatar = screen.getByTestId('hero-avatar')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', '/avatar.png')
    expect(avatar).toHaveAttribute('alt', 'Profile picture')
  })

  it('avatar has correct styling classes', async () => {
    await act(async () => {
      render(await Home())
    })
    
    const avatar = screen.getByTestId('hero-avatar')
    expect(avatar).toHaveClass('rounded-full', 'object-cover', 'border-4', 'border-accent')
  })

  it('avatar is positioned correctly in hero section', async () => {
    await act(async () => {
      render(await Home())
    })
    
    const heroSection = screen.getByTestId('hero-section')
    const avatar = screen.getByTestId('hero-avatar')
    
    expect(heroSection).toContainElement(avatar)
  })
}) 