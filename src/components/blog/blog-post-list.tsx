"use client";

import React, { useState, useMemo } from 'react';
import { type BlogPost } from '@/lib';
import { blogFiltersContent } from '@/content';
import { BlogPostCard } from './blog-post-card';
import { BlogFilters } from './blog-filters';

interface BlogPostListProps {
  posts: BlogPost[];
}

export const BlogPostList = React.memo(function BlogPostList({ posts }: BlogPostListProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => [...new Set(posts.map(p => p.category))].sort(), [posts]);
  const filteredPosts = useMemo(() => {
    let filtered = posts.filter(p => p.published);
    if (selectedCategory) filtered = filtered.filter(p => p.category === selectedCategory);
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(s) || p.excerpt.toLowerCase().includes(s));
    }
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [posts, selectedCategory, searchTerm]);

  return (
    <div className="space-y-6">
      <BlogFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClear={() => { setSelectedCategory(''); setSearchTerm(''); }}
        showClear={!!selectedCategory || !!searchTerm}
      />
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="blog-posts-grid">
          {filteredPosts.map(post => <BlogPostCard key={post.slug} post={post} />)}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-text mb-2">{blogFiltersContent.noResultsTitle}</h3>
          <p className="text-muted">{blogFiltersContent.noResultsDescription}</p>
        </div>
      )}
    </div>
  );
}); 