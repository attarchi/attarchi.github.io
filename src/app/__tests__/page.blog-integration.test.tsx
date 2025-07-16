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

describe('Home Page Blog Integration', () => {
  it('renders blog preview section with posts', async () => {
    await act(async () => {
      render(await Home())
    })
    
    expect(screen.getByTestId('blog-preview-section')).toBeInTheDocument()
    expect(screen.getByTestId('blog-preview-title')).toBeInTheDocument()
    expect(screen.getByTestId('blog-preview-posts')).toBeInTheDocument()
  })

  it('displays blog post titles', async () => {
    await act(async () => {
      render(await Home())
    })
    
    expect(screen.getByTestId('blog-post-title-0')).toBeInTheDocument()
    expect(screen.getByTestId('blog-post-title-1')).toBeInTheDocument()
  })

  it('displays blog post excerpts', async () => {
    await act(async () => {
      render(await Home())
    })
    
    expect(screen.getByTestId('blog-post-excerpt-0')).toBeInTheDocument()
    expect(screen.getByTestId('blog-post-excerpt-1')).toBeInTheDocument()
  })

  it('displays blog post dates', async () => {
    await act(async () => {
      render(await Home())
    })
    
    expect(screen.getByTestId('blog-post-date-0')).toBeInTheDocument()
    expect(screen.getByTestId('blog-post-date-1')).toBeInTheDocument()
  })

  it('displays blog post tags', async () => {
    await act(async () => {
      render(await Home())
    })
    
    expect(screen.getByTestId('blog-post-tags-0')).toBeInTheDocument()
    expect(screen.getByTestId('blog-post-tags-1')).toBeInTheDocument()
  })

  it('renders view all posts link', async () => {
    await act(async () => {
      render(await Home())
    })
    
    const viewAllLink = screen.getByTestId('blog-view-all-link')
    expect(viewAllLink).toBeInTheDocument()
    expect(viewAllLink).toHaveAttribute('href', '/blog')
  })
}) 