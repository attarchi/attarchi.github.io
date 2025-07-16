import { render, screen } from '@testing-library/react'
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

describe('Home Page Content Requirements', () => {
  describe('Hero Section', () => {
    it('renders the main hero heading with typewriter effect', async () => {
      render(<Home />)
      const heading = await screen.findByRole('heading', { level: 1 })
      await flushTypewriterUntilText(heading, 'Senior Full-Stack Developer & Problem Solver');
      expect(heading).toHaveTextContent('Senior Full-Stack Developer & Problem Solver')
    })

    it('renders the hero description', () => {
      render(<Home />)
      const description = screen.getByText(/Crafting scalable web applications with modern technologies/)
      expect(description).toBeInTheDocument()
    })

    it('renders the location badge', () => {
      render(<Home />)
      const locationBadge = screen.getByText(/Istanbul, Turkey • Remote Worldwide/)
      expect(locationBadge).toBeInTheDocument()
    })

    it('renders the avatar image', () => {
      render(<Home />)
      const avatar = screen.getByAltText('Profile picture')
      expect(avatar).toBeInTheDocument()
      expect(avatar).toHaveAttribute('src', '/avatar.png')
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

    it('renders the scroll indicator', () => {
      render(<Home />)
      const scrollIndicator = screen.getByTestId('scroll-indicator')
      expect(scrollIndicator).toBeInTheDocument()
      expect(scrollIndicator).toHaveTextContent('Scroll to explore ↓')
    })
  })

  describe('Theme Toggle Positioning', () => {
    it('renders the theme toggle button', () => {
      render(<Home />)
      const themeToggle = screen.getByRole('button', { name: /toggle theme/i })
      expect(themeToggle).toBeInTheDocument()
    })

    it('has theme toggle positioned correctly in header', () => {
      render(<Home />)
      const header = screen.getByRole('banner')
      const themeToggle = screen.getByRole('button', { name: /toggle theme/i })
      
      expect(header).toContainElement(themeToggle)
      expect(header).toHaveClass('fixed', 'top-0', 'right-0', 'z-50')
    })
  })

  describe('Featured Projects Section', () => {
    it('renders the featured projects section', () => {
      render(<Home />)
      const projectsSection = screen.getByRole('region', { name: /featured projects/i })
      expect(projectsSection).toBeInTheDocument()
    })

    it('renders project cards', () => {
      render(<Home />)
      const projectCards = screen.getAllByTestId('project-card')
      expect(projectCards.length).toBeGreaterThan(0)
    })
  })

  describe('Technical Expertise Section', () => {
    it('renders the technical expertise section', () => {
      render(<Home />)
      const expertiseSection = screen.getByTestId('technical-expertise-section')
      expect(expertiseSection).toBeInTheDocument()
    })

    it('renders skill categories', () => {
      render(<Home />)
      expect(screen.getByText('Frontend')).toBeInTheDocument()
      expect(screen.getByText('Backend')).toBeInTheDocument()
      expect(screen.getByText('DevOps')).toBeInTheDocument()
      expect(screen.getByText('Mobile')).toBeInTheDocument()
    })
  })

  describe('Professional Journey Section', () => {
    it('renders the professional journey section', () => {
      render(<Home />)
      const journeySection = screen.getByRole('region', { name: /professional journey/i })
      expect(journeySection).toBeInTheDocument()
    })

    it('renders timeline milestones', () => {
      render(<Home />)
      const milestones = screen.getAllByTestId('milestone-role')
      expect(milestones.length).toBeGreaterThan(0)
    })
  })

  describe('Blog Preview Section', () => {
    it('renders the blog preview section', () => {
      render(<Home />)
      const blogSection = screen.getByTestId('blog-preview-section')
      expect(blogSection).toBeInTheDocument()
    })

    it('renders blog post cards', () => {
      render(<Home />)
      const blogCards = screen.getAllByTestId('blog-post-card')
      expect(blogCards.length).toBeGreaterThan(0)
    })

    it('renders "View All Posts" link', () => {
      render(<Home />)
      const viewAllLink = screen.getByRole('link', { name: /view all posts/i })
      expect(viewAllLink).toBeInTheDocument()
      expect(viewAllLink).toHaveAttribute('href', '/blog')
    })
  })

  describe('Contact Section', () => {
    it('renders the contact section', () => {
      render(<Home />)
      const contactSection = screen.getByTestId('contact-section-animated')
      expect(contactSection).toBeInTheDocument()
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
    })
  })
}) 