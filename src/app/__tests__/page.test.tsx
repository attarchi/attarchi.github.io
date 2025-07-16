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

describe('Home Page', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(await Home())
    })
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
  })

  it('renders all main sections', async () => {
    await act(async () => {
      render(await Home())
    })
    
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('featured-projects-section')).toBeInTheDocument()
    expect(screen.getByTestId('technical-expertise-section')).toBeInTheDocument()
    expect(screen.getByTestId('professional-journey-section')).toBeInTheDocument()
    expect(screen.getByTestId('contact-section')).toBeInTheDocument()
    expect(screen.getByTestId('blog-preview-section')).toBeInTheDocument()
  })

  it('renders theme toggle', async () => {
    await act(async () => {
      render(await Home())
    })
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('renders blog preview with posts', async () => {
    await act(async () => {
      render(await Home())
    })
    
    expect(screen.getByTestId('blog-preview-title')).toBeInTheDocument()
    expect(screen.getByTestId('blog-preview-posts')).toBeInTheDocument()
    expect(screen.getByTestId('blog-post-0')).toBeInTheDocument()
    expect(screen.getByTestId('blog-post-1')).toBeInTheDocument()
  })
}) 