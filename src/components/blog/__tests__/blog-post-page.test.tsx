import { render, screen } from '@testing-library/react';
import { BlogPostPage } from '../blog-post-page';
import { type BlogPost } from '@/lib';

// Mock sub-components
jest.mock('../post-navigation', () => ({
  PostNavigation: jest.fn(() => <div data-testid="post-navigation" />)
}));

jest.mock('@/components/micro');

jest.mock('@/components/sections');

jest.mock('@/lib', () => ({
  parseMarkdown: jest.fn((content: string) => ({
    content: `<div class="markdown-content">${content}</div>`
  }))
}));

// Mock footer content
jest.mock('@/content', () => ({
  ...jest.requireActual('@/content'),
  footerContent: {
    copyright: { title: 'Test', companyName: 'Test', showcaseMessage: 'Test' },
    repository: { title: 'Test', url: 'test', text: 'Test' },
    license: { title: 'Test', name: 'Test', description: 'Test' },
    buildInfo: 'Test'
  }
}));

const mockBlogPost: BlogPost = {
  title: 'Building Offline-First Apps',
  slug: 'building-offline-first-apps',
  date: new Date('2025-01-15'),
  excerpt: 'Real-time synchronization strategies for mobile applications',
  tags: ['React Native', 'Offline', 'Sync'],
  category: 'Mobile Development',
  content: '# Test Content\nThis is test content.',
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
    jest.clearAllMocks();
  });

  it('renders blog post title', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    expect(screen.getByText('Building Offline-First Apps')).toBeInTheDocument();
  });

  it('displays post metadata', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    expect(screen.getByText('2025-01-15')).toBeInTheDocument();
    expect(screen.getByText('8 min read')).toBeInTheDocument();
    expect(screen.getByText('Mobile Development')).toBeInTheDocument();
  });

  it('displays post excerpt', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    expect(screen.getByText('Real-time synchronization strategies for mobile applications')).toBeInTheDocument();
  });

  it('renders tags as badges', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    expect(screen.getByText('React Native')).toBeInTheDocument();
    expect(screen.getByText('Offline')).toBeInTheDocument();
    expect(screen.getByText('Sync')).toBeInTheDocument();
  });

  it('renders markdown content', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    expect(screen.getByTestId('blog-content')).toBeInTheDocument();
  });

  it('includes navigation components', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    expect(screen.getByTestId('post-navigation')).toBeInTheDocument();
  });

  it('includes theme toggle', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('includes footer', () => {
    render(<BlogPostPage post={mockBlogPost} />);
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
  });

  it('handles posts without tags', () => {
    const postWithoutTags: BlogPost = {
      ...mockBlogPost,
      tags: []
    };
    render(<BlogPostPage post={postWithoutTags} />);
    expect(screen.getByText('Building Offline-First Apps')).toBeInTheDocument();
    expect(screen.queryByText('React Native')).not.toBeInTheDocument();
  });

  it('passes navigation props correctly', () => {
    render(<BlogPostPage post={mockBlogPost} prev={prevPost} next={nextPost} />);
    expect(screen.getByTestId('post-navigation')).toBeInTheDocument();
  });
}); 