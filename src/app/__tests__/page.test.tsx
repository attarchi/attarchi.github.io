import { render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Home from '../page'

jest.useFakeTimers();

async function flushTypewriterUntilText(heading: HTMLElement, expected: string) {
  for (let i = 0; i < 100; i++) {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    if (heading.textContent === expected) return;
    // Wait a tick for React to update
    await Promise.resolve();
  }
}

describe('Home Page', () => {
  it('renders the main hero heading', async () => {
    render(<Home />)
    const heading = await screen.findByRole('heading', { level: 1 })
    await flushTypewriterUntilText(heading, 'Senior Full-Stack Developer & Problem Solver');
    expect(heading).toHaveTextContent('Senior Full-Stack Developer & Problem Solver')
    expect(heading).toBeInTheDocument()
  })

  it('renders the hero description', () => {
    render(<Home />)
    const description = screen.getByText(/Crafting scalable web applications with modern technologies/)
    expect(description).toBeInTheDocument()
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

  it('renders the Professional Journey section', () => {
    render(<Home />)
    const professionalJourneySection = screen.getByRole('region', { name: /professional journey/i })
    expect(professionalJourneySection).toBeInTheDocument()
    
    const professionalJourneyHeading = screen.getByRole('heading', { level: 2, name: /professional journey/i })
    expect(professionalJourneyHeading).toBeInTheDocument()
  })
}) 