import React from 'react';
import { type BlogPost } from '@/lib';

interface BlogPostPageProps {
  post: BlogPost;
  prev?: BlogPost;
  next?: BlogPost;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, prev, next }) => {
  return (
    <div data-testid="blog-post-page">
      <h1 data-testid="blog-title">{post.title}</h1>
      <div data-testid="blog-date">{post.date.toISOString().split('T')[0]}</div>
      <div data-testid="blog-category">{post.category}</div>
      <div data-testid="blog-reading-time">{post.readingTime} min read</div>
      <div data-testid="blog-excerpt">{post.excerpt}</div>
      <div data-testid="blog-content">{post.content}</div>
      {prev && <div data-testid="prev-post">{prev.title}</div>}
      {next && <div data-testid="next-post">{next.title}</div>}
    </div>
  );
}; 