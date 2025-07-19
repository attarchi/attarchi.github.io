"use client";

import React from 'react';
import Link from 'next/link';
import { type BlogPost } from '@/lib';
import { Badge, Card, CardHeader } from '@/components/micro';

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
      className="block group h-full"
      aria-label={`Read ${post.title}`}
    >
      <Card className="border-l-4 border-l-accent hover:border-l-8 transition-all group-hover:shadow-lg h-full flex flex-col" data-testid="blog-post-card">
        <CardHeader className="flex-1 flex flex-col">
          <time className="text-muted text-sm font-mono">{formatDate(post.date)}</time>
          <h4 className="font-mono font-medium line-clamp-2">{post.title}</h4>
          <p className="text-muted line-clamp-3 flex-1">{post.excerpt}</p>
          <div className="flex items-center gap-2 mt-auto">
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