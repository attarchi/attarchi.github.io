import React from 'react';
import { type BlogPost } from '@/lib';

interface BlogPreviewSectionProps {
  posts: BlogPost[];
}

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  return (
    <section data-testid="blog-preview-section">
      <h2 data-testid="blog-preview-title">Latest Blog Posts</h2>
      <div data-testid="blog-preview-grid">
        {posts.map((post, index) => (
          <div key={post.slug} data-testid="blog-post-card">
            <h3 data-testid={`blog-post-title-${index}`}>{post.title}</h3>
            <p data-testid={`blog-post-excerpt-${index}`}>{post.excerpt}</p>
          </div>
        ))}
      </div>
      <a href="/blog" data-testid="blog-view-all-link">View All Posts</a>
    </section>
  );
} 