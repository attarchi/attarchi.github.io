import React from 'react';
import { BlogPost } from '@/types';

interface BlogPreviewSectionProps {
  posts: BlogPost[];
  title?: string;
  description?: string;
  showViewAll?: boolean;
}

const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({ 
  posts, 
  title = "Latest Blog Posts", 
  description = "Thoughts on technology and development",
  showViewAll = true 
}) => {
  return (
    <section data-testid="blog-preview-section">
      <h2 data-testid="blog-preview-title">{title}</h2>
      <p data-testid="blog-preview-description">{description}</p>
      <div data-testid="blog-preview-posts">
        {posts.map((post, index) => (
          <article key={post.slug} data-testid={`blog-post-${index}`}>
            <h3 data-testid={`blog-post-title-${index}`}>{post.title}</h3>
            <p data-testid={`blog-post-excerpt-${index}`}>{post.excerpt}</p>
            <span data-testid={`blog-post-date-${index}`}>
              {post.date.toLocaleDateString()}
            </span>
            <div data-testid={`blog-post-tags-${index}`}>
              {post.tags.map(tag => (
                <span key={tag} data-testid={`blog-post-tag-${index}-${tag}`}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      {showViewAll && (
        <a href="/blog" data-testid="blog-view-all-link">View All Posts</a>
      )}
    </section>
  );
};

export default BlogPreviewSection; 