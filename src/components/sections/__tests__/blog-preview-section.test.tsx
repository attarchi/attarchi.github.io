import { render, screen } from '@testing-library/react';
import { BlogPreviewSection } from '@/components/sections/blog-preview-section';
import { BlogPost } from '@/content';

// Mock blog posts data
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

  it('displays blog post excerpts', () => {
    render(<BlogPreviewSection posts={mockPosts} />);
    
    expect(screen.getByText('Real-time synchronization strategies for mobile applications')).toBeInTheDocument();
    expect(screen.getByText('Best practices for designing scalable microservices')).toBeInTheDocument();
    expect(screen.getByText('Advanced CSS features for modern web development')).toBeInTheDocument();
  });

  it('displays blog post categories', () => {
    render(<BlogPreviewSection posts={mockPosts} />);
    
    expect(screen.getByText('Mobile Development')).toBeInTheDocument();
    expect(screen.getByText('Backend Development')).toBeInTheDocument();
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
  });

  it('displays reading time for each post', () => {
    render(<BlogPreviewSection posts={mockPosts} />);
    
    expect(screen.getByText('8 min read')).toBeInTheDocument();
    expect(screen.getByText('12 min read')).toBeInTheDocument();
    expect(screen.getByText('6 min read')).toBeInTheDocument();
  });

  it('has responsive grid layout', () => {
    render(<BlogPreviewSection posts={mockPosts} />);
    
    const container = screen.getByTestId('blog-preview-grid');
    expect(container).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('follows homepage section styling patterns', () => {
    render(<BlogPreviewSection posts={mockPosts} />);
    
    const section = screen.getByTestId('blog-preview-section');
    expect(section).toHaveClass('py-20', 'bg-[#ffffff]', 'dark:bg-[#0d1117]');
  });

  it('has proper section container with max width', () => {
    render(<BlogPreviewSection posts={mockPosts} />);
    
    const container = screen.getByTestId('blog-preview-container');
    expect(container).toHaveClass('max-w-6xl', 'mx-auto', 'px-4');
  });

  it('uses correct typography for section header', () => {
    render(<BlogPreviewSection posts={mockPosts} />);
    
    const header = screen.getByText('Latest Blog Posts');
    expect(header).toHaveClass('font-mono', 'text-[2rem]', 'md:text-[2.5rem]', 'font-semibold');
  });

  it('handles empty posts array gracefully', () => {
    render(<BlogPreviewSection posts={[]} />);
    
    expect(screen.getByText('Latest Blog Posts')).toBeInTheDocument();
    expect(screen.getByText('View All Posts')).toBeInTheDocument();
    expect(screen.queryByTestId('blog-post-card')).not.toBeInTheDocument();
  });
}); 