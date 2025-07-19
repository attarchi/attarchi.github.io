import { render, screen } from '@testing-library/react';
import { BlogPostCard } from '../blog-post-card';
import { type BlogPost } from '@/lib';

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