import { type BlogPost } from '@/lib/blog-data.d';

// Mock blog posts data
const mockPosts: BlogPost[] = [
    {
        title: 'Building Offline-First Apps',
        slug: 'building-offline-first-apps',
        date: new Date('2025-01-15'),
        excerpt: 'Real-time synchronization strategies for mobile applications',
        tags: ['React Native', 'Offline', 'Sync'],
        category: 'Mobile Development',
        content: '# Building Offline-First Apps\n\nReal-time synchronization strategies for mobile applications...',
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
        content: '# Microservices Architecture Patterns\n\nBest practices for designing scalable microservices...',
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
        content: '# Modern CSS Techniques\n\nAdvanced CSS features for modern web development...',
        readingTime: 6,
        published: true
    },
    {
        title: 'Next.js Static Optimization',
        slug: 'nextjs-static-optimization',
        date: new Date('2025-01-01'),
        excerpt: 'Optimizing Next.js applications for static generation',
        tags: ['Next.js', 'React', 'Performance'],
        category: 'Frontend Development',
        content: '# Next.js Static Optimization\n\nOptimizing Next.js applications for static generation...',
        readingTime: 10,
        published: true
    },
    {
        title: 'React Native Cross-Platform Development',
        slug: 'react-native-cross-platform',
        date: new Date('2024-12-28'),
        excerpt: 'Strategies for building truly cross-platform mobile apps',
        tags: ['React Native', 'Mobile', 'Cross-Platform'],
        category: 'Mobile Development',
        content: '# React Native Cross-Platform Development\n\nStrategies for building truly cross-platform mobile apps...',
        readingTime: 9,
        published: true
    }
];

// Mock functions
export const getAllBlogPosts = jest.fn().mockResolvedValue(mockPosts);
export const getPublishedBlogPosts = jest.fn().mockResolvedValue(mockPosts.filter(post => post.published));
export const getBlogPostBySlug = jest.fn().mockImplementation((slug: string) => {
    const post = mockPosts.find(p => p.slug === slug);
    return Promise.resolve(post || null);
});
export const getBlogPostsByCategory = jest.fn().mockImplementation((category: string) => {
    const posts = mockPosts.filter(p => p.category === category && p.published);
    return Promise.resolve(posts);
});
export const getBlogPostsByTag = jest.fn().mockImplementation((tag: string) => {
    const posts = mockPosts.filter(p => p.tags.includes(tag) && p.published);
    return Promise.resolve(posts);
});
export const getAllCategories = jest.fn().mockResolvedValue(['Mobile Development', 'Backend Development', 'Frontend Development']);
export const getAllTags = jest.fn().mockResolvedValue(['React Native', 'Offline', 'Sync', 'Microservices', 'Architecture', 'Scalability', 'CSS', 'Frontend', 'Web Development', 'Next.js', 'React', 'Performance', 'Mobile', 'Cross-Platform']);

// Export the mock data for tests that need direct access
export const mockBlogData = {
    posts: mockPosts,
    publishedPosts: mockPosts.filter(post => post.published)
}; 