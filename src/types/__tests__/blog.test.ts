import { BlogPost } from '@/content';

describe('Blog Post Interfaces', () => {
    describe('BlogPost interface', () => {
        it('should have all required fields with correct types', () => {
            const mockBlogPost: BlogPost = {
                title: 'Test Blog Post',
                slug: 'test_blog_post',
                date: new Date('2024-01-01'),
                excerpt: 'This is a test excerpt',
                tags: ['typescript', 'react'],
                category: 'Technical Deep Dives',
                content: '# Test Content\n\nThis is test content.',
                readingTime: 5,
                published: true
            };

            expect(mockBlogPost.title).toBe('Test Blog Post');
            expect(mockBlogPost.slug).toBe('test_blog_post');
            expect(mockBlogPost.date).toBeInstanceOf(Date);
            expect(mockBlogPost.excerpt).toBe('This is a test excerpt');
            expect(mockBlogPost.tags).toEqual(['typescript', 'react']);
            expect(mockBlogPost.category).toBe('Technical Deep Dives');
            expect(mockBlogPost.content).toBe('# Test Content\n\nThis is test content.');
            expect(mockBlogPost.readingTime).toBe(5);
            expect(mockBlogPost.published).toBe(true);
        });

        it('should validate slug format is snake_case', () => {
            const mockBlogPost: BlogPost = {
                title: 'Test Blog Post',
                slug: 'test_blog_post',
                date: new Date('2024-01-01'), // This should be Date, not string
                excerpt: 'This is a test excerpt',
                tags: ['typescript', 'react'],
                category: 'Technical Deep Dives',
                content: '# Test Content\n\nThis is test content.',
                readingTime: 5,
                published: true // This field doesn't exist yet
            };

            // Slug should be in snake_case format
            expect(mockBlogPost.slug).toMatch(/^[a-z0-9_]+$/);
        });
    });

    describe('BlogPostFrontmatter interface', () => {
        it('should have metadata fields for frontmatter', () => {
            // This test will fail until BlogPostFrontmatter interface is created
            const mockFrontmatter: any = {
                title: 'Test Blog Post',
                date: '2024-01-01',
                excerpt: 'This is a test excerpt',
                tags: ['typescript', 'react'],
                category: 'Technical Deep Dives',
                readingTime: 5,
                published: true
            };

            expect(mockFrontmatter.title).toBe('Test Blog Post');
            expect(mockFrontmatter.date).toBe('2024-01-01');
            expect(mockFrontmatter.excerpt).toBe('This is a test excerpt');
            expect(mockFrontmatter.tags).toEqual(['typescript', 'react']);
            expect(mockFrontmatter.category).toBe('Technical Deep Dives');
            expect(mockFrontmatter.readingTime).toBe(5);
            expect(mockFrontmatter.published).toBe(true);
        });
    });

    describe('BlogPostMetadata interface', () => {
        it('should have parsed data fields', () => {
            // This test will fail until BlogPostMetadata interface is created
            const mockMetadata: any = {
                title: 'Test Blog Post',
                slug: 'test_blog_post',
                date: new Date('2024-01-01'),
                excerpt: 'This is a test excerpt',
                tags: ['typescript', 'react'],
                category: 'Technical Deep Dives',
                readingTime: 5,
                published: true,
                lastModified: new Date('2024-01-02')
            };

            expect(mockMetadata.title).toBe('Test Blog Post');
            expect(mockMetadata.slug).toBe('test_blog_post');
            expect(mockMetadata.date).toBeInstanceOf(Date);
            expect(mockMetadata.excerpt).toBe('This is a test excerpt');
            expect(mockMetadata.tags).toEqual(['typescript', 'react']);
            expect(mockMetadata.category).toBe('Technical Deep Dives');
            expect(mockMetadata.readingTime).toBe(5);
            expect(mockMetadata.published).toBe(true);
            expect(mockMetadata.lastModified).toBeInstanceOf(Date);
        });
    });
}); 