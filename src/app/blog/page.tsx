import { BlogPostList } from '@/components/blog/blog-post-list';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

// Mock data - in a real app, this would come from a CMS or markdown files
const mockPosts = [
  {
    title: 'Building Offline-First Apps',
    slug: 'building-offline-first-apps',
    date: new Date('2025-01-15'),
    excerpt: 'Real-time synchronization strategies for mobile applications',
    tags: ['React Native', 'Offline', 'Sync'],
    category: 'Mobile Development',
    content: '',
    readingTime: 8,
    published: true
  },
  {
    title: 'Microservices Architecture Patterns',
    slug: 'microservices-architecture-patterns',
    date: new Date('2025-01-10'),
    excerpt: 'Best practices for designing scalable microservices',
    tags: ['Microservices', 'Architecture', 'Scalability'],
    category: 'Backend Development',
    content: '',
    readingTime: 12,
    published: true
  },
  {
    title: 'Modern CSS Techniques',
    slug: 'modern-css-techniques',
    date: new Date('2025-01-05'),
    excerpt: 'Advanced CSS features for modern web development',
    tags: ['CSS', 'Frontend', 'Web Development'],
    category: 'Frontend Development',
    content: '',
    readingTime: 6,
    published: true
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="text-accent font-mono text-base hover:underline transition-colors" aria-label="Home">← Home</Link>
        <ThemeToggle />
      </div>
      <header className="mb-12">
        <h1 className="text-4xl font-bold font-mono mb-4 text-text">Blog</h1>
        <p className="text-lg text-muted">Thoughts on software development, architecture, and technology.</p>
      </header>
      
      <BlogPostList posts={mockPosts} />
    </div>
  );
} 