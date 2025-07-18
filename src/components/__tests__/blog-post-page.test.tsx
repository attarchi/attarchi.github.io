import { render, screen } from '@testing-library/react';
import { BlogPostPage } from '../blog/blog-post-page';
import { BlogPost } from '@/content';

// Mock the markdown parser
jest.mock('@/lib/markdown-parser', () => ({
  parseMarkdown: jest.fn((content: string) => ({
    content: `<div class="markdown-content">
      <h1>Building Offline-First Apps</h1>
      <p>This is a comprehensive guide to building offline-first applications.</p>
      <h2>Code Example</h2>
      <pre><code>const syncData = async () => {
  const offlineData = await getOfflineData();
  const onlineData = await fetchOnlineData();
  return mergeData(offlineData, onlineData);
};</code></pre>
      <h2>Key Points</h2>
      <ul>
        <li>Real-time synchronization</li>
        <li>Conflict resolution</li>
        <li>Data persistence</li>
      </ul>
    </div>`
  }))
}));

const mockBlogPost: BlogPost = {
  title: 'Building Offline-First Apps',
  slug: 'building-offline-first-apps',
  date: new Date('2025-01-15'),
  excerpt: 'Real-time synchronization strategies for mobile applications',
  tags: ['React Native', 'Offline', 'Sync'],
  category: 'Mobile Development',
  content: `
# Building Offline-First Apps

This is a comprehensive guide to building offline-first applications.

## Code Example

\`\`\`javascript
const syncData = async () => {
  const offlineData = await getOfflineData();
  const onlineData = await fetchOnlineData();
  return mergeData(offlineData, onlineData);
};
\`\`\`

## Key Points

- Real-time synchronization
- Conflict resolution
- Data persistence
`,
  readingTime: 8,
  published: true
};

const prevPost = {
  ...mockBlogPost,
  title: 'Prev Post',
  slug: 'prev-post',
};
const nextPost = {
  ...mockBlogPost,
  title: 'Next Post',
  slug: 'next-post',
};

describe('BlogPostPage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders blog post content', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    
    // There are two h1s (header and markdown), so use getAllByText
    expect(screen.getAllByText('Building Offline-First Apps').length).toBeGreaterThan(0);
    expect(screen.getByText('Real-time synchronization strategies for mobile applications')).toBeInTheDocument();
  });

  it('displays metadata correctly', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    
    // Check date
    expect(screen.getByText('2025-01-15')).toBeInTheDocument();
    
    // Check reading time
    expect(screen.getByText('8 min read')).toBeInTheDocument();
    
    // Check category
    expect(screen.getByText('Mobile Development')).toBeInTheDocument();
  });

  it('displays tags as badges', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    
    expect(screen.getByText('React Native')).toBeInTheDocument();
    expect(screen.getByText('Offline')).toBeInTheDocument();
    expect(screen.getByText('Sync')).toBeInTheDocument();
  });

  it('renders markdown content with proper styling', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    // Markdown content is in a <p> and <h2> etc, so use getByText for each
    expect(screen.getByText('This is a comprehensive guide to building offline-first applications.')).toBeInTheDocument();
    expect(screen.getByText('Code Example')).toBeInTheDocument();
    expect(screen.getByText('Key Points')).toBeInTheDocument();
  });

  it('renders code blocks with proper styling', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    // Use regex to match code lines, since they may be split by whitespace
    expect(screen.getByText(/const syncData = async/)).toBeInTheDocument();
    expect(screen.getByText(/const offlineData = await getOfflineData/)).toBeInTheDocument();
    expect(screen.getByText(/const onlineData = await fetchOnlineData/)).toBeInTheDocument();
    expect(screen.getByText(/return mergeData\(offlineData, onlineData\)/)).toBeInTheDocument();
    expect(screen.getByText(/};/)).toBeInTheDocument();
  });

  it('includes navigation links', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    
    // Check for back to blog list link
    expect(screen.getByText('← Back to Blog')).toBeInTheDocument();
  });

  it('includes SEO elements', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    // There are two h1s, so use getAllByRole
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s[0]).toHaveTextContent('Building Offline-First Apps');
    // Check for article element
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('applies proper typography classes', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    // There are two h1s, so use getAllByRole
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s[0]).toHaveClass('font-mono');
    // Check that body text uses Inter
    const article = screen.getByRole('article');
    expect(article).toHaveClass('font-sans');
  });

  it('displays metadata with muted colors', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    
    // Check that metadata elements have muted text color
    const dateElement = screen.getByText('2025-01-15');
    expect(dateElement).toHaveClass('text-muted');
    
    const readingTimeElement = screen.getByText('8 min read');
    expect(readingTimeElement).toHaveClass('text-muted');
  });

  it('renders navigation with accent colors', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    
    const backLink = screen.getByText('← Back to Blog');
    expect(backLink).toHaveClass('text-accent');
  });

  it('handles empty content gracefully', () => {
    const emptyPost: BlogPost = {
      ...mockBlogPost,
      content: ''
    };
    render(<BlogPostPage post={emptyPost} />);
    expect(screen.getAllByText('Building Offline-First Apps').length).toBeGreaterThan(0);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('handles posts without tags', () => {
    const postWithoutTags: BlogPost = {
      ...mockBlogPost,
      tags: []
    };
    render(<BlogPostPage post={postWithoutTags} />);
    expect(screen.getAllByText('Building Offline-First Apps').length).toBeGreaterThan(0);
    expect(screen.queryByText('React Native')).not.toBeInTheDocument();
  });

  it('renders post navigation with prev and next links', () => {
    render(<BlogPostPage post={mockBlogPost} prev={prevPost} next={nextPost} />);
    expect(screen.getByText('← Prev Post')).toBeInTheDocument();
    expect(screen.getByText('Next Post →')).toBeInTheDocument();
    expect(screen.getByText('← Prev Post').closest('a')).toHaveAttribute('href', '/blog/prev-post');
    expect(screen.getByText('Next Post →').closest('a')).toHaveAttribute('href', '/blog/next-post');
    expect(screen.getByText('← Back to Blog')).toBeInTheDocument();
  });
}); 