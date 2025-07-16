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

describe('Home Page Layout', () => {
  it('renders the main container with proper classes', async () => {
    await act(async () => {
      render(await Home())
    })
    
    const mainContainer = screen.getByTestId('hero-section').closest('div')
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-background', 'text-text')
  })

  it('renders header with theme toggle', async () => {
    await act(async () => {
      render(await Home())
    })
    
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('renders all main sections in correct order', async () => {
    await act(async () => {
      render(await Home())
    })
    
    const sections = [
      'hero-section',
      'featured-projects-section', 
      'technical-expertise-section',
      'professional-journey-section',
      'blog-preview-section',
      'contact-section'
    ]
    
    sections.forEach(sectionId => {
      expect(screen.getByTestId(sectionId)).toBeInTheDocument()
    })
  })

  it('renders responsive layout elements', async () => {
    await act(async () => {
      render(await Home())
    })
    
    // Check that sections are rendered (indicating responsive layout)
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('featured-projects-section')).toBeInTheDocument()
  })
}) 