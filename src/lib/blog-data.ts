import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/types';
import { parseMarkdown, extractFrontmatter, calculateReadingTime } from './markdown-parser';

// Cache for parsed markdown content
const markdownCache = new Map<string, string>();
const frontmatterCache = new Map<string, Record<string, any>>();
const postsCache = new Map<string, BlogPost | BlogPost[]>();

// Cache TTL (Time To Live) in milliseconds
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cacheTimestamps = new Map<string, number>();

/**
 * Check if cache entry is still valid
 */
function isCacheValid(key: string): boolean {
    const timestamp = cacheTimestamps.get(key);
    if (!timestamp) return false;
    return Date.now() - timestamp < CACHE_TTL;
}

/**
 * Set cache entry with timestamp
 */
function setCacheWithTimestamp(key: string, value: any): void {
    markdownCache.set(key, value);
    cacheTimestamps.set(key, Date.now());
}

/**
 * Get cached markdown content or parse and cache it
 */
function getCachedMarkdown(content: string): string {
    const cacheKey = Buffer.from(content).toString('base64');

    if (markdownCache.has(cacheKey) && isCacheValid(cacheKey)) {
        return markdownCache.get(cacheKey)!;
    }

    const parsed = parseMarkdown(content).content;
    setCacheWithTimestamp(cacheKey, parsed);
    return parsed;
}

/**
 * Get cached frontmatter or parse and cache it
 */
function getCachedFrontmatter(content: string): Record<string, any> {
    const cacheKey = Buffer.from(content).toString('base64');

    if (frontmatterCache.has(cacheKey) && isCacheValid(cacheKey)) {
        return frontmatterCache.get(cacheKey)!;
    }

    const frontmatter = extractFrontmatter(content);
    frontmatterCache.set(cacheKey, frontmatter);
    cacheTimestamps.set(cacheKey, Date.now());
    return frontmatter;
}

/**
 * Read and parse a markdown file with caching
 */
async function readMarkdownFile(filePath: string): Promise<{ content: string; frontmatter: Record<string, any> }> {
    try {
        const content = await fs.promises.readFile(filePath, 'utf-8');
        const frontmatter = getCachedFrontmatter(content);
        const parsedContent = getCachedMarkdown(content);

        return {
            content: parsedContent,
            frontmatter
        };
    } catch (error) {
        console.error(`Error reading markdown file ${filePath}:`, error);
        throw error;
    }
}

/**
 * Convert frontmatter to BlogPost object
 */
function frontmatterToBlogPost(slug: string, frontmatter: Record<string, any>, content: string): BlogPost {
    return {
        title: frontmatter.title || 'Untitled',
        slug,
        date: new Date(frontmatter.date || Date.now()),
        excerpt: frontmatter.excerpt || '',
        tags: frontmatter.tags || [],
        category: frontmatter.category || 'Uncategorized',
        content,
        readingTime: frontmatter.readingTime || calculateReadingTime(content),
        published: frontmatter.published !== false
    };
}

/**
 * Get all blog posts with lazy loading and caching
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const cacheKey = 'all-posts';

    // Check cache first
    if (postsCache.has(cacheKey) && isCacheValid(cacheKey)) {
        const cached = postsCache.get(cacheKey)!;
        return Array.isArray(cached) ? cached : [cached];
    }

    try {
        const postsDirectory = path.join(process.cwd(), 'src/content/posts');
        const files = await fs.promises.readdir(postsDirectory);

        const markdownFiles = files.filter(file => file.endsWith('.md'));
        const posts: BlogPost[] = [];

        // Process files in batches for better performance
        const batchSize = 5;
        for (let i = 0; i < markdownFiles.length; i += batchSize) {
            const batch = markdownFiles.slice(i, i + batchSize);

            const batchPromises = batch.map(async (file) => {
                const slug = file.replace('.md', '');
                const filePath = path.join(postsDirectory, file);

                try {
                    const { content, frontmatter } = await readMarkdownFile(filePath);
                    return frontmatterToBlogPost(slug, frontmatter, content);
                } catch (error) {
                    console.error(`Error processing ${file}:`, error);
                    return null;
                }
            });

            const batchResults = await Promise.all(batchPromises);
            posts.push(...batchResults.filter(Boolean) as BlogPost[]);
        }

        // Sort by date (newest first)
        const sortedPosts = posts.sort((a, b) => b.date.getTime() - a.date.getTime());

        // Cache the result
        postsCache.set(cacheKey, sortedPosts);
        cacheTimestamps.set(cacheKey, Date.now());

        return sortedPosts;
    } catch (error) {
        console.error('Error loading blog posts:', error);
        return [];
    }
}

/**
 * Get a single blog post by slug with caching
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const cacheKey = `post-${slug}`;

    // Check cache first
    if (postsCache.has(cacheKey) && isCacheValid(cacheKey)) {
        const cached = postsCache.get(cacheKey)!;
        return Array.isArray(cached) ? cached[0] : cached;
    }

    try {
        const filePath = path.join(process.cwd(), 'src/content/posts', `${slug}.md`);
        const { content, frontmatter } = await readMarkdownFile(filePath);
        const post = frontmatterToBlogPost(slug, frontmatter, content);

        // Cache the result
        postsCache.set(cacheKey, post);
        cacheTimestamps.set(cacheKey, Date.now());

        return post;
    } catch (error) {
        console.error(`Error loading blog post ${slug}:`, error);
        return null;
    }
}

/**
 * Get published blog posts only
 */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
    const allPosts = await getAllBlogPosts();
    return allPosts.filter(post => post.published);
}

/**
 * Get blog posts by category with caching
 */
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    const allPosts = await getAllBlogPosts();
    return allPosts.filter(post => post.category === category && post.published);
}

/**
 * Search blog posts with optimized filtering
 */
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
    const allPosts = await getAllBlogPosts();
    const searchTerm = query.toLowerCase();

    return allPosts.filter(post =>
        post.published && (
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            post.category.toLowerCase().includes(searchTerm)
        )
    );
}

/**
 * Get all unique categories
 */
export async function getAllCategories(): Promise<string[]> {
    const allPosts = await getAllBlogPosts();
    const categories = new Set(allPosts.filter(post => post.published).map(post => post.category));
    return Array.from(categories).sort();
}

/**
 * Get related posts based on tags and category
 */
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
    const allPosts = await getAllBlogPosts();

    // Score posts based on tag overlap and category match
    const scoredPosts = allPosts
        .filter(post => post.slug !== currentPost.slug && post.published)
        .map(post => {
            let score = 0;

            // Category match
            if (post.category === currentPost.category) score += 3;

            // Tag overlap
            const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag));
            score += commonTags.length * 2;

            return { post, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.post);

    return scoredPosts;
}

/**
 * Clear all caches (useful for development)
 */
export function clearBlogCache(): void {
    markdownCache.clear();
    frontmatterCache.clear();
    postsCache.clear();
    cacheTimestamps.clear();
}

/**
 * Get cache statistics for monitoring
 */
export function getCacheStats(): {
    markdownCacheSize: number;
    frontmatterCacheSize: number;
    postsCacheSize: number;
    totalCacheEntries: number;
} {
    return {
        markdownCacheSize: markdownCache.size,
        frontmatterCacheSize: frontmatterCache.size,
        postsCacheSize: postsCache.size,
        totalCacheEntries: markdownCache.size + frontmatterCache.size + postsCache.size
    };
} 