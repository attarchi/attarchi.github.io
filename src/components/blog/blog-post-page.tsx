"use client";

import { BlogPost } from '@/types';
import { parseMarkdown } from '@/lib/markdown-parser';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { PostNavigation } from './post-navigation';

interface BlogPostPageProps {
  post: BlogPost;
  prev?: BlogPost;
  next?: BlogPost;
}

export function BlogPostPage({ post, prev, next }: BlogPostPageProps) {
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatReadingTime = (minutes: number) => {
    return `${minutes} min read`;
  };

  const { content: parsedContent } = parseMarkdown(post.content);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 font-sans">
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
  );
} 