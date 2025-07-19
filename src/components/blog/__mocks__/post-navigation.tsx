import React from 'react';
import { type BlogPost } from '@/lib';

interface PostNavigationProps {
  prev?: BlogPost;
  next?: BlogPost;
}

export const PostNavigation: React.FC<PostNavigationProps> = ({ prev, next }) => {
  return (
    <nav data-testid="post-navigation">
      {prev && (
        <div data-testid="prev-link">
          ← {prev.title}
        </div>
      )}
      <div data-testid="back-to-blog">
        ← Back to Blog
      </div>
      {next && (
        <div data-testid="next-link">
          {next.title} →
        </div>
      )}
    </nav>
  );
}; 