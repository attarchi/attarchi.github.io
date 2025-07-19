"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { type BlogPost } from '@/lib';
import { BlogPostCard } from '@/components/blog';
import { projectStaggerVariants } from '@/lib';

export interface BlogPreviewSectionProps {
  posts: BlogPost[];
}

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  const latestPosts = posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section 
      className="py-20 bg-[#ffffff] dark:bg-[#0d1117]"
      aria-label="Latest Blog Posts"
      data-testid="blog-preview-section"
    >
      <div 
        className="max-w-6xl mx-auto px-4"
        data-testid="blog-preview-container"
      >
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-mono text-[2rem] md:text-[2.5rem] font-semibold text-[#24292f] dark:text-[#f0f6fc]">
            Latest Blog Posts
          </h2>
          <Link 
            href="/blog"
            className="text-[#0969da] dark:text-[#58a6ff] hover:underline font-medium transition-colors"
          >
            View All Posts
          </Link>
        </div>
        
        {latestPosts.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-testid="blog-preview-grid"
            variants={projectStaggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {latestPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#656d76] dark:text-[#8b949e]">No blog posts available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
} 