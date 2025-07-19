import fs from 'fs';
import path from 'path';
import { describe, it, expect } from '@jest/globals';
import { type BlogPostFrontmatter } from '@/lib';

describe('Blog Posts Content Validation', () => {
    const postsDirectory = path.join(process.cwd(), 'src/content/posts');

    // Helper function to get all markdown files
    const getMarkdownFiles = (): string[] => {
        if (!fs.existsSync(postsDirectory)) {
            return [];
        }
        return fs.readdirSync(postsDirectory)
            .filter(file => file.endsWith('.md'))
            .map(file => path.join(postsDirectory, file));
    };

    // Helper function to extract frontmatter from markdown
    const extractFrontmatter = (content: string): BlogPostFrontmatter => {
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatterMatch) {
            throw new Error('No frontmatter found');
        }

        const frontmatterText = frontmatterMatch[1];
        const frontmatter: any = {};

        frontmatterText.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim();

                if (key === 'tags') {
                    // Parse tags array
                    frontmatter[key] = value.replace(/[\[\]]/g, '').split(',').map(tag => tag.trim());
                } else if (key === 'date') {
                    frontmatter[key] = value;
                } else if (key === 'readingTime' || key === 'published') {
                    frontmatter[key] = key === 'published' ? value === 'true' : parseInt(value);
                } else {
                    frontmatter[key] = value;
                }
            }
        });

        return frontmatter as BlogPostFrontmatter;
    };

    // Helper function to calculate reading time
    const calculateReadingTime = (content: string): number => {
        const words = content.split(/\s+/).length;
        return Math.ceil(words / 200); // 200 words per minute
    };

    describe('Frontmatter Validation', () => {
        it('should have valid frontmatter for all blog posts', () => {
            const markdownFiles = getMarkdownFiles();

            if (markdownFiles.length === 0) {
                // This test will fail initially as no posts exist yet
                throw new Error('No blog posts found in content/posts directory');
            }

            markdownFiles.forEach(filePath => {
                const content = fs.readFileSync(filePath, 'utf-8');
                const frontmatter = extractFrontmatter(content);

                // Validate required fields
                expect(frontmatter.title).toBeDefined();
                expect(frontmatter.title.length).toBeGreaterThan(0);
                expect(frontmatter.date).toBeDefined();
                expect(frontmatter.excerpt).toBeDefined();
                expect(frontmatter.excerpt.length).toBeGreaterThan(0);
                expect(frontmatter.tags).toBeDefined();
                expect(Array.isArray(frontmatter.tags)).toBe(true);
                expect(frontmatter.category).toBeDefined();
                expect(frontmatter.readingTime).toBeDefined();
                expect(typeof frontmatter.readingTime).toBe('number');
                expect(frontmatter.published).toBeDefined();
                expect(typeof frontmatter.published).toBe('boolean');
            });
        });

        it('should have valid date format in frontmatter', () => {
            const markdownFiles = getMarkdownFiles();

            if (markdownFiles.length === 0) {
                throw new Error('No blog posts found in content/posts directory');
            }

            markdownFiles.forEach(filePath => {
                const content = fs.readFileSync(filePath, 'utf-8');
                const frontmatter = extractFrontmatter(content);

                // Validate date format (YYYY-MM-DD)
                expect(frontmatter.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
                expect(() => new Date(frontmatter.date)).not.toThrow();
            });
        });
    });

    describe('Markdown Content Validation', () => {
        it('should have properly formatted markdown content', () => {
            const markdownFiles = getMarkdownFiles();

            if (markdownFiles.length === 0) {
                throw new Error('No blog posts found in content/posts directory');
            }

            markdownFiles.forEach(filePath => {
                const content = fs.readFileSync(filePath, 'utf-8');

                // Remove frontmatter to get content only
                const contentOnly = content.replace(/^---\n[\s\S]*?\n---\n/, '');

                // Should have content after frontmatter
                expect(contentOnly.trim().length).toBeGreaterThan(0);

                // Should have at least one heading
                expect(contentOnly).toMatch(/^#\s+/m);

                // Should have proper paragraph spacing
                expect(contentOnly).toMatch(/\n\n/);
            });
        });

        it('should have code blocks with proper syntax highlighting', () => {
            const markdownFiles = getMarkdownFiles();

            if (markdownFiles.length === 0) {
                throw new Error('No blog posts found in content/posts directory');
            }

            markdownFiles.forEach(filePath => {
                const content = fs.readFileSync(filePath, 'utf-8');
                const contentOnly = content.replace(/^---\n[\s\S]*?\n---\n/, '');

                // Should have at least one code block
                expect(contentOnly).toMatch(/```\w*\n[\s\S]*?\n```/);

                // Code blocks should have language specification
                const codeBlocks = contentOnly.match(/```(\w+)\n[\s\S]*?\n```/g);
                if (codeBlocks) {
                    codeBlocks.forEach(block => {
                        expect(block).toMatch(/```\w+\n/);
                    });
                }
            });
        });
    });

    describe('Reading Time Calculation', () => {
        it('should have accurate reading time calculation', () => {
            const markdownFiles = getMarkdownFiles();

            if (markdownFiles.length === 0) {
                throw new Error('No blog posts found in content/posts directory');
            }

            markdownFiles.forEach(filePath => {
                const content = fs.readFileSync(filePath, 'utf-8');
                const frontmatter = extractFrontmatter(content);
                const contentOnly = content.replace(/^---\n[\s\S]*?\n---\n/, '');

                const calculatedReadingTime = calculateReadingTime(contentOnly);
                const frontmatterReadingTime = frontmatter.readingTime;

                // Reading time should be within 3 minutes of calculated time (more realistic for longer posts)
                expect(Math.abs(calculatedReadingTime - frontmatterReadingTime)).toBeLessThanOrEqual(3);
            });
        });
    });

    describe('Word Count Validation', () => {
        it('should have appropriate word count (500-3000 words)', () => {
            const markdownFiles = getMarkdownFiles();

            if (markdownFiles.length === 0) {
                throw new Error('No blog posts found in content/posts directory');
            }

            markdownFiles.forEach(filePath => {
                const content = fs.readFileSync(filePath, 'utf-8');
                const contentOnly = content.replace(/^---\n[\s\S]*?\n---\n/, '');

                const wordCount = contentOnly.split(/\s+/).length;

                // Should be between 500-3000 words (more realistic range for blog posts)
                expect(wordCount).toBeGreaterThanOrEqual(500);
                expect(wordCount).toBeLessThanOrEqual(3000);
            });
        });
    });

    describe('Slug Naming Convention', () => {
        it('should follow snake_case naming convention', () => {
            const markdownFiles = getMarkdownFiles();

            if (markdownFiles.length === 0) {
                throw new Error('No blog posts found in content/posts directory');
            }

            markdownFiles.forEach(filePath => {
                const fileName = path.basename(filePath, '.md');

                // Should be snake_case format
                expect(fileName).toMatch(/^[a-z0-9_]+$/);
                expect(fileName).not.toMatch(/[A-Z]/);
                expect(fileName).not.toMatch(/^-|-$/);
            });
        });
    });
}); 