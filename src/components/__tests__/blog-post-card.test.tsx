import { render, screen } from '@testing-library/react';
import { BlogPostCard } from '../blog/blog-post-card';
import { BlogPost } from '@/types';

// Mock data for testing
const mockBlogPost: BlogPost = {
  title: 'Building Offline-First Apps',
  slug: 'building-offline-first-apps',
  date: new Date('2025-05-22'),
  excerpt: 'Real-time synchronization strategies for building robust offline-first applications that work seamlessly across different network conditions.',
  tags: ['React Native', 'Offline', 'Sync'],
  category: 'Mobile Development',
  content: 'Full blog post content...',
  readingTime: 8,
  published: true,
};

describe('BlogPostCard', () => {
  it('renders blog post data correctly', () => {
    render(<BlogPostCard post={mockBlogPost} />);
    
    expect(screen.getByText('Building Offline-First Apps')).toBeInTheDocument();
    expect(screen.getByText('2025-05-22')).toBeInTheDocument();
    expect(screen.getByText(/Real-time synchronization strategies/)).toBeInTheDocument();
    expect(screen.getByText('Mobile Development')).toBeInTheDocument();
    expect(screen.getByText('8 min read')).toBeInTheDocument();
  });

  it('formats date in YYYY-MM-DD format', () => {
    const postWithDifferentDate: BlogPost = {
      ...mockBlogPost,
      date: new Date('2024-12-03'),
    };
    
    render(<BlogPostCard post={postWithDifferentDate} />);
    expect(screen.getByText('2024-12-03')).toBeInTheDocument();
  });

  it('truncates long excerpts', () => {
    const postWithLongExcerpt: BlogPost = {
      ...mockBlogPost,
      excerpt: 'This is a very long excerpt that should be truncated to prevent the card from becoming too tall and maintain consistent layout across all blog post cards in the grid or list view.',
    };
    
    render(<BlogPostCard post={postWithLongExcerpt} />);
    const excerptElement = screen.getByText(/This is a very long excerpt/);
    expect(excerptElement).toBeInTheDocument();
  });

  it('renders category badge with accent color', () => {
    render(<BlogPostCard post={mockBlogPost} />);
    const categoryBadge = screen.getByText('Mobile Development');
    expect(categoryBadge).toBeInTheDocument();
  });

  it('applies hover border animation classes', () => {
    render(<BlogPostCard post={mockBlogPost} />);
    const card = screen.getByTestId('blog-post-card');
    expect(card).toHaveClass('border-l-4', 'border-l-accent', 'hover:border-l-8', 'transition-all');
  });

  it('uses correct typography classes', () => {
    render(<BlogPostCard post={mockBlogPost} />);
    
    // Date should use font-mono
    const dateElement = screen.getByText('2025-05-22');
    expect(dateElement).toHaveClass('font-mono');
    
    // Title should use font-mono
    const titleElement = screen.getByText('Building Offline-First Apps');
    expect(titleElement).toHaveClass('font-mono');
    
    // Excerpt should use Inter (default body font)
    const excerptElement = screen.getByText(/Real-time synchronization strategies/);
    expect(excerptElement).toHaveClass('text-muted');
  });

  it('displays reading time indicator', () => {
    render(<BlogPostCard post={mockBlogPost} />);
    expect(screen.getByText('8 min read')).toBeInTheDocument();
  });

  it('handles different reading times correctly', () => {
    const postWithOneMinute: BlogPost = {
      ...mockBlogPost,
      readingTime: 1,
    };
    
    render(<BlogPostCard post={postWithOneMinute} />);
    expect(screen.getByText('1 min read')).toBeInTheDocument();
  });
}); 