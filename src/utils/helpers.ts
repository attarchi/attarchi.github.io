import { BlogPost, Project } from '../types';

export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

export const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
};

export const sortByDate = (items: BlogPost[]): BlogPost[] => {
    return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const filterByCategory = <T extends BlogPost | Project>(
    items: T[],
    category: string
): T[] => {
    return items.filter((item) => 'category' in item && item.category === category);
};

export const getUniqueTags = (posts: BlogPost[]): string[] => {
    const tags = posts.flatMap((post) => post.tags);
    return [...new Set(tags)];
}; 