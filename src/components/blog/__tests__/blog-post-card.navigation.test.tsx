import { render, screen } from '@testing-library/react';
import { BlogPostCard } from '../blog-post-card';
import { type BlogPost } from '@/lib';

const mockPost: BlogPost = {
  title: 'Building Offline-First Apps',
  slug: 'building-offline-first-apps',
  date: new Date('2025-01-15'),
  excerpt: 'Real-time synchronization strategies for mobile applications',
  tags: ['React Native', 'Offline', 'Sync'],
  category: 'Mobile Development',
  content: '',
  readingTime: 8,
  published: true
};

describe('BlogPostCard Navigation', () => {
  it('renders blog post card as a clickable link', () => {
    render(<BlogPostCard post={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/blog/building-offline-first-apps');
  });

  it('link contains the blog post title', () => {
    render(<BlogPostCard post={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Building Offline-First Apps');
  });

  it('link contains the blog post excerpt', () => {
    render(<BlogPostCard post={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Real-time synchronization strategies for mobile applications');
  });

  it('link contains the blog post category', () => {
    render(<BlogPostCard post={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Mobile Development');
  });

  it('link contains the reading time', () => {
    render(<BlogPostCard post={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('8 min read');
  });

  it('link contains the formatted date', () => {
    render(<BlogPostCard post={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('2025-01-15');
  });

  it('card has proper hover effects', () => {
    render(<BlogPostCard post={mockPost} />);
    
    const card = screen.getByTestId('blog-post-card');
    expect(card).toHaveClass('hover:border-l-8', 'transition-all');
  });

  it('link has proper accessibility attributes', () => {
    render(<BlogPostCard post={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Read Building Offline-First Apps');
  });

  it('card maintains visual hierarchy within link', () => {
    render(<BlogPostCard post={mockPost} />);
    
    const link = screen.getByRole('link');
    const title = screen.getByText('Building Offline-First Apps');
    const excerpt = screen.getByText('Real-time synchronization strategies for mobile applications');
    
    expect(link).toContainElement(title);
    expect(link).toContainElement(excerpt);
  });
}); 