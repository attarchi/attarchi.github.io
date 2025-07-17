import { formatDate, sortByDate, filterByCategory, getUniqueTags } from '../helpers';
import { calculateReadingTime } from '../../lib';
import { BlogPost, Project } from '../../types';

describe('formatDate', () => {
    it('formats date correctly', () => {
        const date = '2024-03-15';
        const formatted = formatDate(date);
        expect(formatted).toBe('March 15, 2024');
    });
});



describe('calculateReadingTime', () => {
    it('calculates reading time correctly', () => {
        const content = 'This is a test content with multiple words.';
        const readingTime = calculateReadingTime(content);
        expect(readingTime).toBe(1);
    });

    it('handles empty content', () => {
        const content = '';
        const readingTime = calculateReadingTime(content);
        expect(readingTime).toBe(0);
    });

    it('handles content with multiple lines', () => {
        const content = 'Line 1\nLine 2\nLine 3';
        const readingTime = calculateReadingTime(content);
        expect(readingTime).toBe(1);
    });
});

describe('sortByDate', () => {
    it('sorts blog posts by date in descending order', () => {
        const posts: BlogPost[] = [
            {
                slug: 'post-1',
                title: 'Post 1',
                date: new Date('2024-03-15'),
                excerpt: 'Excerpt 1',
                content: '',
                tags: [],
                category: 'Technical Deep Dives',
                readingTime: 5,
                published: true
            },
            {
                slug: 'post-2',
                title: 'Post 2',
                date: new Date('2024-03-20'),
                excerpt: 'Excerpt 2',
                content: '',
                tags: [],
                category: 'Technical Deep Dives',
                readingTime: 5,
                published: true
            },
            {
                slug: 'post-3',
                title: 'Post 3',
                date: new Date('2024-03-10'),
                excerpt: 'Excerpt 3',
                content: '',
                tags: [],
                category: 'Technical Deep Dives',
                readingTime: 5,
                published: true
            }
        ];

        const sorted = sortByDate(posts);
        expect(sorted[0].date).toEqual(new Date('2024-03-20'));
        expect(sorted[1].date).toEqual(new Date('2024-03-15'));
        expect(sorted[2].date).toEqual(new Date('2024-03-10'));
    });
});

describe('filterByCategory', () => {
    it('filters blog posts by category', () => {
        const posts: BlogPost[] = [
            {
                slug: 'post-1',
                title: 'Post 1',
                date: new Date('2024-03-15'),
                excerpt: 'Excerpt 1',
                content: '',
                tags: [],
                category: 'Technical Deep Dives',
                readingTime: 5,
                published: true
            },
            {
                slug: 'post-2',
                title: 'Post 2',
                date: new Date('2024-03-20'),
                excerpt: 'Excerpt 2',
                content: '',
                tags: [],
                category: 'Problem-Solving Stories',
                readingTime: 5,
                published: true
            },
            {
                slug: 'post-3',
                title: 'Post 3',
                date: new Date('2024-03-10'),
                excerpt: 'Excerpt 3',
                content: '',
                tags: [],
                category: 'Technical Deep Dives',
                readingTime: 5,
                published: true
            }
        ];

        const filtered = filterByCategory(posts, 'Technical Deep Dives');
        expect(filtered).toHaveLength(2);
        expect(filtered.every(post => post.category === 'Technical Deep Dives')).toBe(true);
    });

    it('filters projects by type', () => {
        const projects: Project[] = [
            {
                id: '1',
                title: 'Project 1',
                description: 'Description 1',
                type: 'Microservices',
                technologies: [],
                highlights: [],
                links: {}
            },
            {
                id: '2',
                title: 'Project 2',
                description: 'Description 2',
                type: 'Hybrid',
                technologies: [],
                highlights: [],
                links: {}
            },
            {
                id: '3',
                title: 'Project 3',
                description: 'Description 3',
                type: 'Microservices',
                technologies: [],
                highlights: [],
                links: {}
            }
        ];

        const filtered = filterByCategory(projects, 'Microservices');
        expect(filtered).toHaveLength(2);
        expect(filtered.every(project => project.type === 'Microservices')).toBe(true);
    });

    it('handles items with neither category nor type property', () => {
        const items = [
            {
                id: '1',
                title: 'Item 1',
                description: 'Description 1',
                technologies: [],
                highlights: [],
                links: {}
            },
            {
                id: '2',
                title: 'Item 2',
                description: 'Description 2',
                technologies: [],
                highlights: [],
                links: {}
            }
        ] as unknown as (BlogPost | Project)[];

        const filtered = filterByCategory(items, 'any-category');
        expect(filtered).toHaveLength(0);
    });
});

describe('getUniqueTags', () => {
    it('returns unique tags from blog posts', () => {
        const posts: BlogPost[] = [
            {
                slug: 'post-1',
                title: 'Post 1',
                date: new Date('2024-03-15'),
                excerpt: 'Excerpt 1',
                content: '',
                tags: ['react', 'typescript'],
                category: 'Technical Deep Dives',
                readingTime: 5,
                published: true
            },
            {
                slug: 'post-2',
                title: 'Post 2',
                date: new Date('2024-03-20'),
                excerpt: 'Excerpt 2',
                content: '',
                tags: ['react', 'javascript'],
                category: 'Technical Deep Dives',
                readingTime: 5,
                published: true
            },
            {
                slug: 'post-3',
                title: 'Post 3',
                date: new Date('2024-03-10'),
                excerpt: 'Excerpt 3',
                content: '',
                tags: ['node', 'typescript'],
                category: 'Technical Deep Dives',
                readingTime: 5,
                published: true
            }
        ];

        const uniqueTags = getUniqueTags(posts);
        expect(uniqueTags).toHaveLength(4);
        expect(uniqueTags).toContain('react');
        expect(uniqueTags).toContain('typescript');
        expect(uniqueTags).toContain('javascript');
        expect(uniqueTags).toContain('node');
    });

    it('handles empty tags array', () => {
        const posts: BlogPost[] = [
            {
                slug: 'post-1',
                title: 'Post 1',
                date: new Date('2024-03-15'),
                excerpt: 'Excerpt 1',
                content: '',
                tags: [],
                category: 'Technical Deep Dives',
                readingTime: 5,
                published: true
            }
        ];

        const uniqueTags = getUniqueTags(posts);
        expect(uniqueTags).toHaveLength(0);
    });
}); 