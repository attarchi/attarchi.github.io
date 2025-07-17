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