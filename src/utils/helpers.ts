import { BlogPost, Project } from '../types';

export const formatDate = (date: string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    });
};

export const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

export const calculateReadingTime = (content: string): number => {
    if (!content.trim()) return 0;
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
};

export const sortByDate = (items: BlogPost[]): BlogPost[] => {
    return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const filterByCategory = <T extends BlogPost | Project>(
    items: T[],
    category: string
): T[] => {
    return items.filter((item) => {
        if ('category' in item) {
            return item.category === category;
        }
        if ('type' in item) {
            return item.type === category;
        }
        return false;
    });
};

export const getUniqueTags = (posts: BlogPost[]): string[] => {
    const tags = posts.flatMap((post) => post.tags);
    return [...new Set(tags)];
}; 