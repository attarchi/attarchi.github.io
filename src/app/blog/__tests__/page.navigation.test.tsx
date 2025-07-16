import { render, screen } from '@testing-library/react';
import BlogPage from '../page';
import BlogPostPage from '../[slug]/page';

// Mock the blog data functions
jest.mock('@/lib/blog-data', () => ({
  getPublishedBlogPosts: jest.fn().mockResolvedValue([
    {
      title: 'Building Offline-First Apps',
      slug: 'building-offline-first-apps',
      date: new Date('2025-01-15'),
      excerpt: 'Real-time synchronization strategies for mobile applications',
      tags: ['React Native', 'Offline', 'Sync'],
      category: 'Mobile Development',
      content: 'Full content',
      readingTime: 8,
      published: true
    }
  ]),
  getBlogPostBySlug: jest.fn().mockResolvedValue({
    title: 'Building Offline-First Apps',
    slug: 'building-offline-first-apps',
    date: new Date('2025-01-15'),
    excerpt: 'Real-time synchronization strategies for mobile applications',
    tags: ['React Native', 'Offline', 'Sync'],
    category: 'Mobile Development',
    content: 'Full content',
    readingTime: 8,
    published: true
  })
}));

const mockPost = {
  title: 'Building Offline-First Apps',
  slug: 'building-offline-first-apps',
  date: new Date('2025-01-15'),
  excerpt: 'Real-time synchronization strategies for mobile applications',
  tags: ['React Native', 'Offline', 'Sync'],
  category: 'Mobile Development',
  content: 'Full content',
  readingTime: 8,
  published: true
};

describe('Blog navigation and theme toggle', () => {
  it('blog index page has a link to the homepage', async () => {
    render(await BlogPage());
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('blog index page has a theme toggle button', async () => {
    render(await BlogPage());
    const themeToggle = screen.getByLabelText(/toggle theme/i);
    expect(themeToggle).toBeInTheDocument();
  });

  it('individual blog post page has a link to the homepage', async () => {
    render(await BlogPostPage({ params: { slug: mockPost.slug } }));
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('individual blog post page has a theme toggle button', async () => {
    render(await BlogPostPage({ params: { slug: mockPost.slug } }));
    const themeToggle = screen.getByLabelText(/toggle theme/i);
    expect(themeToggle).toBeInTheDocument();
  });
}); 