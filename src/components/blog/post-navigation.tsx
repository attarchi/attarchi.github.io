"use client";

import React from 'react';
import { type BlogPost } from '@/lib';

interface PostNavigationProps {
  prev?: BlogPost;
  next?: BlogPost;
}

export const PostNavigation = React.memo(function PostNavigation({ prev, next }: PostNavigationProps) {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-stretch gap-4 mt-12 mb-4">
      {prev && (
        <div className="flex-1 flex items-center">
          <a
            href={`/blog/${prev.slug}`}
            className="text-accent font-mono text-base hover:underline transition-colors"
          >
            ← {prev.title}
          </a>
        </div>
      )}
      <div className="flex-1 flex items-center justify-center">
        <a
          href="/blog"
          className="text-accent font-mono text-base hover:underline transition-colors"
        >
          ← Back to Blog
        </a>
      </div>
      {next && (
        <div className="flex-1 flex items-center justify-end">
          <a
            href={`/blog/${next.slug}`}
            className="text-accent font-mono text-base hover:underline transition-colors"
          >
            {next.title} →
          </a>
        </div>
      )}
      <div data-testid="social-share-placeholder" className="hidden" />
    </nav>
  );
}); 