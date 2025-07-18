export interface BlogPost {
    title: string;
    slug: string;
    date: Date;
    excerpt: string;
    tags: string[];
    category: string;
    content: string;
    readingTime: number;
    published: boolean;
}

export interface BlogPostFrontmatter {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    category: string;
    readingTime: number;
    published: boolean;
}

export interface BlogPostMetadata {
    title: string;
    slug: string;
    date: Date;
    excerpt: string;
    tags: string[];
    category: string;
    readingTime: number;
    published: boolean;
    lastModified: Date;
}

export const blogPosts: BlogPost[] = [
    {
        title: 'Building Offline-First Apps',
        slug: 'building_offline_first_apps',
        date: new Date('2025-05-22'),
        excerpt: 'Real-time synchronization strategies for building robust offline-first applications that work seamlessly across different network conditions.',
        tags: ['React Native', 'Offline', 'Sync'],
        category: 'Mobile Development',
        content: 'Full blog post content...',
        readingTime: 8,
        published: true,
    },
    {
        title: 'Next.js Static Optimization',
        slug: 'nextjs_static_optimization',
        date: new Date('2025-05-20'),
        excerpt: 'Advanced techniques for optimizing static site generation and improving performance in Next.js applications.',
        tags: ['Next.js', 'Performance', 'SSG'],
        category: 'Web Development',
        content: 'Full blog post content...',
        readingTime: 6,
        published: true,
    },
    {
        title: 'React Native Cross-Platform Development',
        slug: 'react_native_cross_platform',
        date: new Date('2025-05-18'),
        excerpt: 'Best practices for building truly cross-platform applications with React Native.',
        tags: ['React Native', 'Cross-Platform', 'Mobile'],
        category: 'Mobile Development',
        content: 'Full blog post content...',
        readingTime: 10,
        published: true,
    },
]; 