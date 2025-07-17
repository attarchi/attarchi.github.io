import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BlogPostList } from '../blog/blog-post-list';
import { BlogPost } from '../blog/types';

// Mock data for testing
const mockPosts: BlogPost[] = [
  {
    title: 'Building Offline-First Apps',
    slug: 'building-offline-first-apps',
    date: new Date('2025-01-15'),
    excerpt: 'Real-time synchronization strategies for mobile applications',
    tags: ['React Native', 'Offline', 'Sync'],
    category: 'Mobile Development',
    content: 'Full content here...',
    readingTime: 8,
    published: true,
  },
  {
    title: 'Microservices Architecture Patterns',
    slug: 'microservices-architecture-patterns',
    date: new Date('2025-01-10'),
    excerpt: 'Best practices for designing scalable microservices',
    tags: ['Microservices', 'Architecture', 'Scalability'],
    category: 'Backend Development',
    content: 'Full content here...',
    readingTime: 12,
    published: true,
  },
  {
    title: 'Modern CSS Grid Layouts',
    slug: 'modern-css-grid-layouts',
    date: new Date('2025-01-05'),
    excerpt: 'Advanced CSS Grid techniques for responsive design',
    tags: ['CSS', 'Grid', 'Responsive'],
    category: 'Frontend Development',
    content: 'Full content here...',
    readingTime: 6,
    published: true,
  },
];

describe('BlogPostList', () => {
  it('renders list of blog posts', () => {
    render(<BlogPostList posts={mockPosts} />);
    
    expect(screen.getByText('Building Offline-First Apps')).toBeInTheDocument();
    expect(screen.getByText('Microservices Architecture Patterns')).toBeInTheDocument();
    expect(screen.getByText('Modern CSS Grid Layouts')).toBeInTheDocument();
  });

  it('displays category filter badges', () => {
    render(<BlogPostList posts={mockPosts} />);
    
    // Use getAllByText to get all instances and check filter badges specifically
    const mobileBadges = screen.getAllByText('Mobile Development');
    const backendBadges = screen.getAllByText('Backend Development');
    const frontendBadges = screen.getAllByText('Frontend Development');
    
    expect(mobileBadges.length).toBeGreaterThan(0);
    expect(backendBadges.length).toBeGreaterThan(0);
    expect(frontendBadges.length).toBeGreaterThan(0);
  });

  it('filters posts by category when badge is clicked', async () => {
    render(<BlogPostList posts={mockPosts} />);
    
    // Get the first Mobile Development badge (filter badge)
    const mobileBadges = screen.getAllByText('Mobile Development');
    const mobileBadge = mobileBadges[0]; // Filter badge is first
    fireEvent.click(mobileBadge);
    
    await waitFor(() => {
      expect(screen.getByText('Building Offline-First Apps')).toBeInTheDocument();
      expect(screen.queryByText('Microservices Architecture Patterns')).not.toBeInTheDocument();
      expect(screen.queryByText('Modern CSS Grid Layouts')).not.toBeInTheDocument();
    });
  });

  it('filters posts by search term', async () => {
    render(<BlogPostList posts={mockPosts} />);
    
    const searchInput = screen.getByPlaceholderText('Search posts...');
    fireEvent.change(searchInput, { target: { value: 'offline' } });
    
    await waitFor(() => {
      expect(screen.getByText('Building Offline-First Apps')).toBeInTheDocument();
      expect(screen.queryByText('Microservices Architecture Patterns')).not.toBeInTheDocument();
      expect(screen.queryByText('Modern CSS Grid Layouts')).not.toBeInTheDocument();
    });
  });

  it('sorts posts by date (newest first)', () => {
    render(<BlogPostList posts={mockPosts} />);
    
    const posts = screen.getAllByTestId('blog-post-card');
    expect(posts).toHaveLength(3);
    
    // Check that the first post is the newest (2025-01-15)
    expect(screen.getByText('Building Offline-First Apps')).toBeInTheDocument();
  });

  it('displays empty state when no posts match filters', async () => {
    render(<BlogPostList posts={mockPosts} />);
    
    const searchInput = screen.getByPlaceholderText('Search posts...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    
    await waitFor(() => {
      expect(screen.getByText('No posts found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
    });
  });

  it('has responsive grid layout classes', () => {
    render(<BlogPostList posts={mockPosts} />);
    
    const gridContainer = screen.getByTestId('blog-posts-grid');
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('clears filters when clear button is clicked', async () => {
    render(<BlogPostList posts={mockPosts} />);
    
    // Apply a filter
    const searchInput = screen.getByPlaceholderText('Search posts...');
    fireEvent.change(searchInput, { target: { value: 'offline' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Microservices Architecture Patterns')).not.toBeInTheDocument();
    });
    
    // Clear filters
    const clearButton = screen.getByText('Clear filters');
    fireEvent.click(clearButton);
    
    await waitFor(() => {
      expect(screen.getByText('Microservices Architecture Patterns')).toBeInTheDocument();
      expect(screen.getByText('Modern CSS Grid Layouts')).toBeInTheDocument();
    });
  });

  it('debounces search input', async () => {
    jest.useFakeTimers();
    render(<BlogPostList posts={mockPosts} />);
    
    const searchInput = screen.getByPlaceholderText('Search posts...');
    fireEvent.change(searchInput, { target: { value: 'o' } });
    fireEvent.change(searchInput, { target: { value: 'of' } });
    fireEvent.change(searchInput, { target: { value: 'off' } });
    
    // Fast forward timers to trigger debounced search
    jest.runAllTimers();
    
    await waitFor(() => {
      expect(screen.getByText('Building Offline-First Apps')).toBeInTheDocument();
    });
    
    jest.useRealTimers();
  });
}); 