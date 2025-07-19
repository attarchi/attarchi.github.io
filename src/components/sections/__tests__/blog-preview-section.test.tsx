import { render, screen } from '@testing-library/react';
import { BlogPreviewSection } from '../blog-preview-section';
import { type BlogPost } from '@/lib';

const mockPosts: BlogPost[] = [
  {
    title: 'Building Offline-First Apps',
    slug: 'building-offline-first-apps',
    date: new Date('2025-01-15'),
    excerpt: 'Real-time synchronization strategies for mobile applications',
    tags: ['React Native', 'Offline', 'Sync'],
    category: 'Mobile Development',
    content: '',
    readingTime: 8,
    published: true
  },
  {
    title: 'Microservices Architecture Patterns',
    slug: 'microservices-architecture-patterns',
    date: new Date('2025-01-10'),
    excerpt: 'Best practices for designing scalable microservices',
    tags: ['Microservices', 'Architecture', 'Scalability'],
    category: 'Backend Development',
    content: '',
    readingTime: 12,
    published: true
  },
  {
    title: 'Modern CSS Techniques',
    slug: 'modern-css-techniques',
    date: new Date('2025-01-05'),
    excerpt: 'Advanced CSS features for modern web development',
    tags: ['CSS', 'Frontend', 'Web Development'],
    category: 'Frontend Development',
    content: '',
    readingTime: 6,
    published: true
  }
];

describe('BlogPreviewSection', () => {
  it('renders section header "Latest Blog Posts"', () => {
    render(<BlogPreviewSection posts={mockPosts} />);
    
    expect(screen.getByText('Latest Blog Posts')).toBeInTheDocument();
  });

  it('renders 3 latest blog posts', () => {
    render(<BlogPreviewSection posts={mockPosts} />);
    
    expect(screen.getByText('Building Offline-First Apps')).toBeInTheDocument();
    expect(screen.getByText('Microservices Architecture Patterns')).toBeInTheDocument();
    expect(screen.getByText('Modern CSS Techniques')).toBeInTheDocument();
  });

  it('renders "View All Posts" link', () => {
    render(<BlogPreviewSection posts={mockPosts} />);
    
    const viewAllLink = screen.getByRole('link', { name: /view all posts/i });
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink).toHaveAttribute('href', '/blog');
  });

  it('renders blog post cards with correct structure', () => {
    render(<BlogPreviewSection posts={mockPosts} />);
    
    const blogCards = screen.getAllByTestId('blog-post-card');
    expect(blogCards).toHaveLength(3);
  });

  it('handles empty posts array gracefully', () => {
    render(<BlogPreviewSection posts={[]} />);
    
    expect(screen.getByText('Latest Blog Posts')).toBeInTheDocument();
    expect(screen.getByText('View All Posts')).toBeInTheDocument();
    expect(screen.queryByTestId('blog-post-card')).not.toBeInTheDocument();
    expect(screen.getByText('No blog posts available yet.')).toBeInTheDocument();
  });
}); 