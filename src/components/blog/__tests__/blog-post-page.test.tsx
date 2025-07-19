import React from 'react';
import { render, screen } from '@testing-library/react';
import { BlogPostPage } from '../blog-post-page';
import { mockBlogData } from '@/lib/__mocks__/blog-data';

// Mock the Footer component
jest.mock('@/components/sections', () => ({
  Footer: ({ content }: { content: any }) => <footer data-testid="footer">{content.title}</footer>
}));

// Mock the PostNavigation component
jest.mock('../post-navigation', () => ({
  PostNavigation: ({ prev, next }: { prev?: any; next?: any }) => (
    <nav data-testid="post-navigation">
      {prev && <span data-testid="prev-post">{prev.title}</span>}
      <span data-testid="back-to-blog">← Back to Blog</span>
      {next && <span data-testid="next-post">{next.title}</span>}
    </nav>
  )
}));

// Mock the parseMarkdown function
jest.mock('@/lib', () => ({
  ...jest.requireActual('@/lib'),
  parseMarkdown: jest.fn(() => ({
    content: '<h1>Test Content</h1><p>This is a test paragraph.</p>'
  }))
}));

// Mock the footer content
jest.mock('@/content', () => ({
  footerContent: {
    title: 'Test Footer',
    links: []
  },
  themeConfig: {
    defaultTheme: 'light',
    localStorageKey: 'theme',
    mediaQuery: '(prefers-color-scheme: dark)',
    lightClass: 'light',
    darkClass: 'dark'
  }
}));

describe('BlogPostPage', () => {
  const mockPost = mockBlogData.posts[0];
  const mockPrev = { ...mockBlogData.posts[0], title: 'Previous Post' };
  const mockNext = { ...mockBlogData.posts[0], title: 'Next Post' };

  it('renders blog post with correct structure', () => {
    render(<BlogPostPage post={mockPost} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText('← Home')).toBeInTheDocument();
    expect(screen.getByTestId('blog-content')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('displays post metadata correctly', () => {
    render(<BlogPostPage post={mockPost} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.excerpt!)).toBeInTheDocument();
    expect(screen.getByText(mockPost.category)).toBeInTheDocument();
    expect(screen.getByText(`${mockPost.readingTime} min read`)).toBeInTheDocument();
  });

  it('renders tags when present', () => {
    render(<BlogPostPage post={mockPost} />);

    mockPost.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('renders navigation when prev/next posts are provided', () => {
    render(<BlogPostPage post={mockPost} prev={mockPrev} next={mockNext} />);

    expect(screen.getByTestId('post-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('prev-post')).toBeInTheDocument();
    expect(screen.getByTestId('next-post')).toBeInTheDocument();
    expect(screen.getByText('Previous Post')).toBeInTheDocument();
    expect(screen.getByText('Next Post')).toBeInTheDocument();
  });

  it('renders navigation even when no prev/next posts (shows back to blog)', () => {
    render(<BlogPostPage post={mockPost} />);

    expect(screen.getByTestId('post-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('back-to-blog')).toBeInTheDocument();
  });

  it('applies blog-content CSS class for proper styling', () => {
    render(<BlogPostPage post={mockPost} />);

    const blogContent = screen.getByTestId('blog-content');
    expect(blogContent).toHaveClass('blog-content');
  });

  it('formats date correctly', () => {
    render(<BlogPostPage post={mockPost} />);

    const expectedDate = mockPost.date.toISOString().split('T')[0];
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });

  it('renders excerpt when present', () => {
    const postWithExcerpt = { ...mockPost, excerpt: 'This is a test excerpt' };
    render(<BlogPostPage post={postWithExcerpt} />);

    expect(screen.getByText('This is a test excerpt')).toBeInTheDocument();
  });

  it('does not render excerpt section when excerpt is not present', () => {
    const postWithoutExcerpt = { ...mockPost, excerpt: '' };
    render(<BlogPostPage post={postWithoutExcerpt} />);

    // The excerpt should not be rendered
    expect(screen.queryByText('This is a test excerpt')).not.toBeInTheDocument();
  });

  it('renders blog content with proper styling classes', () => {
    render(<BlogPostPage post={mockPost} />);

    const blogContent = screen.getByTestId('blog-content');
    expect(blogContent).toHaveClass('blog-content');
    
    // Check that the content has proper HTML structure
    expect(blogContent.innerHTML).toContain('<h1>Test Content</h1>');
    expect(blogContent.innerHTML).toContain('<p>This is a test paragraph.</p>');
  });
}); 