"use client";

import React from 'react';
import Link from 'next/link';
import { BlogPost } from './types';
import { Card, CardHeader, Badge } from '@/components/ui';

interface BlogPostCardProps {
  post: BlogPost;
}

export const BlogPostCard = React.memo(function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatReadingTime = (minutes: number) => {
    return `${minutes} min read`;
  };

  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="block group"
      aria-label={`Read ${post.title}`}
    >
      <Card className="border-l-4 border-l-accent hover:border-l-8 transition-all group-hover:shadow-lg" data-testid="blog-post-card">
        <CardHeader>
          <time className="text-muted text-sm font-mono">{formatDate(post.date)}</time>
          <h4 className="font-mono font-medium">{post.title}</h4>
          <p className="text-muted">{post.excerpt}</p>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-accent">
              {post.category}
            </Badge>
            <span className="text-muted text-sm">{formatReadingTime(post.readingTime)}</span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}); 