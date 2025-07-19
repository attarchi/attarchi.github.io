import { render, screen } from '@testing-library/react';
import { PostNavigation } from '../post-navigation';
import { type BlogPost } from '@/lib';

const prevPost: BlogPost = {
  title: 'Prev Post',
  slug: 'prev-post',
  date: new Date('2025-01-10'),
  excerpt: 'Previous post excerpt',
  tags: [],
  category: 'General',
  content: '',
  readingTime: 5,
  published: true
};

const nextPost: BlogPost = {
  title: 'Next Post',
  slug: 'next-post',
  date: new Date('2025-01-20'),
  excerpt: 'Next post excerpt',
  tags: [],
  category: 'General',
  content: '',
  readingTime: 7,
  published: true
};

describe('PostNavigation', () => {
  it('renders previous and next post links if provided', () => {
    render(<PostNavigation prev={prevPost} next={nextPost} />);
    expect(screen.getByText('← Prev Post')).toBeInTheDocument();
    expect(screen.getByText('Next Post →')).toBeInTheDocument();
  });

  it('renders back to blog link', () => {
    render(<PostNavigation />);
    expect(screen.getByText('← Back to Blog')).toBeInTheDocument();
  });

  it('handles missing prev gracefully', () => {
    render(<PostNavigation next={nextPost} />);
    expect(screen.getByText('Next Post →')).toBeInTheDocument();
    expect(screen.queryByText('← Prev Post')).not.toBeInTheDocument();
  });

  it('handles missing next gracefully', () => {
    render(<PostNavigation prev={prevPost} />);
    expect(screen.getByText('← Prev Post')).toBeInTheDocument();
    expect(screen.queryByText('Next Post →')).not.toBeInTheDocument();
  });

  it('uses correct hrefs for navigation', () => {
    render(<PostNavigation prev={prevPost} next={nextPost} />);
    expect(screen.getByText('← Prev Post').closest('a')).toHaveAttribute('href', '/blog/prev-post');
    expect(screen.getByText('Next Post →').closest('a')).toHaveAttribute('href', '/blog/next-post');
    expect(screen.getByText('← Back to Blog').closest('a')).toHaveAttribute('href', '/blog');
  });

  it('renders social sharing buttons placeholder (future)', () => {
    render(<PostNavigation />);
    expect(screen.getByTestId('social-share-placeholder')).toBeInTheDocument();
  });
}); 