"use client";

import React from 'react';
import Link from 'next/link';
import { ThemeToggle, Badge, Card, CardContent } from '@/components/ui';
import { Footer } from '@/components/sections';
import { BlogPost } from '@/content';
import { parseMarkdown } from '@/lib';
import { PostNavigation } from './post-navigation';
import { footerContent } from '@/content';

interface BlogPostPageProps {
  post: BlogPost;
  prev?: BlogPost;
  next?: BlogPost;
}

export const BlogPostPage = React.memo(function BlogPostPage({ post, prev, next }: BlogPostPageProps) {
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatReadingTime = (minutes: number) => {
    return `${minutes} min read`;
  };

  const { content: parsedContent } = parseMarkdown(post.content);

  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <article className="flex-1 max-w-4xl mx-auto px-4 py-8 font-sans w-full">
        {/* Home link and theme toggle */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-accent font-mono text-base hover:underline transition-colors" aria-label="Home">← Home</Link>
          <ThemeToggle />
        </div>
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-mono mb-4 text-text">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted text-sm font-mono mb-4">
            <time dateTime={formatDate(post.date)} className="text-muted">
              {formatDate(post.date)}
            </time>
            <span className="text-muted">•</span>
            <span className="text-muted">{formatReadingTime(post.readingTime)}</span>
            <span className="text-muted">•</span>
            <span className="text-muted">{post.category}</span>
          </div>

          {post.excerpt && (
            <p className="text-lg text-muted mb-6">
              {post.excerpt}
            </p>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="text-accent font-mono text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <Card className="bg-surface border-border">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none font-sans"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              data-testid="blog-content"
            />
          </CardContent>
        </Card>

        {/* Post Navigation */}
        <PostNavigation prev={prev} next={next} />
      </article>
      <Footer content={footerContent} />
    </div>
  );
}); 