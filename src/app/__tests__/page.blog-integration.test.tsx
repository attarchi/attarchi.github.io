import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Homepage Blog Integration', () => {
  it('renders blog preview section on homepage', () => {
    render(<Home />);
    
    expect(screen.getByText('Latest Blog Posts')).toBeInTheDocument();
  });

  it('displays 3 latest blog posts on homepage', () => {
    render(<Home />);
    
    expect(screen.getByText('Building Offline-First Apps')).toBeInTheDocument();
    expect(screen.getByText('Microservices Architecture Patterns')).toBeInTheDocument();
    expect(screen.getByText('Modern CSS Techniques')).toBeInTheDocument();
  });

  it('shows "View All Posts" link on homepage', () => {
    render(<Home />);
    
    const viewAllLink = screen.getByRole('link', { name: /view all posts/i });
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink).toHaveAttribute('href', '/blog');
  });

  it('displays blog post excerpts on homepage', () => {
    render(<Home />);
    
    expect(screen.getByText('Real-time synchronization strategies for mobile applications')).toBeInTheDocument();
    expect(screen.getByText('Best practices for designing scalable microservices')).toBeInTheDocument();
    expect(screen.getByText('Advanced CSS features for modern web development')).toBeInTheDocument();
  });

  it('shows blog post categories on homepage', () => {
    render(<Home />);
    
    expect(screen.getByText('Mobile Development')).toBeInTheDocument();
    expect(screen.getByText('Backend Development')).toBeInTheDocument();
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
  });

  it('displays reading time for each blog post on homepage', () => {
    render(<Home />);
    
    expect(screen.getByText('8 min read')).toBeInTheDocument();
    expect(screen.getByText('12 min read')).toBeInTheDocument();
    expect(screen.getByText('6 min read')).toBeInTheDocument();
  });

  it('maintains proper section order on homepage', () => {
    render(<Home />);
    
    // Check that blog section appears after Professional Journey and before Contact
    const sections = screen.getAllByRole('region');
    const blogSection = screen.getByText('Latest Blog Posts').closest('section');
    const contactSection = screen.getByText('Available for new opportunities').closest('section');
    
    expect(blogSection).toBeInTheDocument();
    expect(contactSection).toBeInTheDocument();
  });

  it('blog preview cards have proper hover effects', () => {
    render(<Home />);
    
    const blogCards = screen.getAllByTestId('blog-post-card');
    expect(blogCards).toHaveLength(3);
    
    // Check that cards have the expected hover classes
    blogCards.forEach(card => {
      expect(card).toHaveClass('hover:border-l-8', 'transition-all');
    });
  });

  it('blog section follows homepage design patterns', () => {
    render(<Home />);
    
    const blogSection = screen.getByText('Latest Blog Posts').closest('section');
    expect(blogSection).toHaveClass('py-20', 'bg-[#ffffff]', 'dark:bg-[#0d1117]');
  });

  it('blog section has responsive grid layout', () => {
    render(<Home />);
    
    const grid = screen.getByTestId('blog-preview-grid');
    expect(grid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('blog section header uses correct typography', () => {
    render(<Home />);
    
    const header = screen.getByText('Latest Blog Posts');
    expect(header).toHaveClass('font-mono', 'text-[2rem]', 'md:text-[2.5rem]', 'font-semibold');
  });
}); 