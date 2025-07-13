import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home Page Layout Requirements', () => {
  it('has full-width hero section with proper width constraints', () => {
    render(<Home />)
    
    const heroSection = screen.getByTestId('typewriter-container').closest('section')
    expect(heroSection).toHaveClass('w-full')
    // Should have max-width constraint for proper layout
    expect(heroSection).toHaveClass('max-w-7xl')
  })

  it('has proper responsive viewport height', () => {
    render(<Home />)
    
    const heroSection = screen.getByTestId('typewriter-container').closest('section')
    // Should use responsive height: auto on mobile, h-screen on desktop
    expect(heroSection).toHaveClass('h-auto', 'md:h-screen')
  })

  it('has centered content container with reasonable max width', () => {
    render(<Home />)
    
    // The typewriter container is inside a motion.div, which is inside the content container
    const typewriter = screen.getByTestId('typewriter-container')
    const motionDiv = typewriter.parentElement
    const contentContainer = motionDiv?.parentElement?.parentElement
    expect(contentContainer).toHaveClass('container', 'mx-auto', 'max-w-4xl', 'text-center')
  })
}) 