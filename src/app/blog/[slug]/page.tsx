import { BlogPostPage } from '@/components/blog';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getPublishedBlogPosts } from '@/lib/blog-data';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPageRoute({ params }: BlogPostPageProps) {
  const { slug } = params;
  
  // Get the post by slug
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  // Get all posts for navigation
  const allPosts = await getPublishedBlogPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prev = currentIndex > 0 ? allPosts[currentIndex - 1] : undefined;
  const next = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : undefined;
  
  return <BlogPostPage post={post} prev={prev} next={next} />;
} 