import { BlogPostList } from '@/components/blog';
import { Footer } from '@/components/sections';
import Link from 'next/link';
import { ThemeToggle } from '@/components/micro';
import { getPublishedBlogPosts } from '@/lib/blog-data';
import { footerContent, blogPageContent } from '@/content';

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/" 
            className="text-accent font-mono text-base hover:underline transition-colors" 
            aria-label={blogPageContent.navigation.homeLink.ariaLabel}
          >
            {blogPageContent.navigation.homeLink.text}
          </Link>
          <ThemeToggle />
        </div>
        <header className="mb-12">
          <h1 className="text-4xl font-bold font-mono mb-4 text-text">{blogPageContent.title}</h1>
          <p className="text-lg text-muted">{blogPageContent.description}</p>
        </header>
        
        <BlogPostList posts={posts} />
      </div>
      <Footer content={footerContent} />
    </div>
  );
} 