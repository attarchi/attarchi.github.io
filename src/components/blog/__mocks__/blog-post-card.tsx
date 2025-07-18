import React from 'react';
import { BlogPost } from '@/content';

interface BlogPostCardProps {
  post: BlogPost;
}

export const BlogPostCard = React.memo(function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <div data-testid="blog-post-card">
      <div>{post.title}</div>
      <div>{post.date.toISOString().split('T')[0]}</div>
      <div>{post.excerpt}</div>
      <div>{post.category}</div>
      <div>{post.readingTime} min read</div>
    </div>
  );
}); 