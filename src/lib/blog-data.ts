import fs from 'fs';
import path from 'path';
import { parseMarkdown, extractFrontmatter, calculateReadingTime } from './markdown-parser';
import { type BlogPost } from './blog-data.d';

const markdownCache = new Map<string, string>();
const frontmatterCache = new Map<string, Record<string, any>>();
const postsCache = new Map<string, BlogPost | BlogPost[]>();

const CACHE_TTL = 5 * 60 * 1000;
const cacheTimestamps = new Map<string, number>();

function isCacheValid(key: string): boolean {
    const timestamp = cacheTimestamps.get(key);
    if (!timestamp) return false;
    return Date.now() - timestamp < CACHE_TTL;
}

function setCacheWithTimestamp(key: string, value: any): void {
    markdownCache.set(key, value);
    cacheTimestamps.set(key, Date.now());
}

function getCachedMarkdown(content: string): string {
    const cacheKey = Buffer.from(content).toString('base64');

    if (markdownCache.has(cacheKey) && isCacheValid(cacheKey)) {
        return markdownCache.get(cacheKey)!;
    }

    const parsed = parseMarkdown(content).content;
    setCacheWithTimestamp(cacheKey, parsed);
    return parsed;
}

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

// Helper function to decode HTML entities
function decodeHtmlEntities(text: string): string {
    return text
        .replace(/&colon;/g, ':')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, '/')
        .replace(/&#x60;/g, '`')
        .replace(/&#x3D;/g, '=');
}

function frontmatterToBlogPost(slug: string, frontmatter: Record<string, any>, content: string): BlogPost {
    return {
        title: decodeHtmlEntities(frontmatter.title || 'Untitled'),
        slug,
        date: new Date(frontmatter.date || Date.now()),
        excerpt: decodeHtmlEntities(frontmatter.excerpt || ''),
        tags: frontmatter.tags || [],
        category: decodeHtmlEntities(frontmatter.category || 'Uncategorized'),
        content,
        readingTime: frontmatter.readingTime || calculateReadingTime(content),
        published: frontmatter.published !== false
    };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const cacheKey = 'all-posts';

    if (postsCache.has(cacheKey) && isCacheValid(cacheKey)) {
        const cached = postsCache.get(cacheKey)!;
        return Array.isArray(cached) ? cached : [cached];
    }

    try {
        const postsDirectory = path.join(process.cwd(), 'src/content/posts');
        const files = await fs.promises.readdir(postsDirectory);

        const markdownFiles = files.filter(file => file.endsWith('.md'));
        const posts: BlogPost[] = [];

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

        const sortedPosts = posts.sort((a, b) => b.date.getTime() - a.date.getTime());

        postsCache.set(cacheKey, sortedPosts);
        cacheTimestamps.set(cacheKey, Date.now());

        return sortedPosts;
    } catch (error) {
        console.error('Error loading blog posts:', error);
        return [];
    }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const cacheKey = `post-${slug}`;

    if (postsCache.has(cacheKey) && isCacheValid(cacheKey)) {
        const cached = postsCache.get(cacheKey)!;
        return Array.isArray(cached) ? cached[0] : cached;
    }

    try {
        const filePath = path.join(process.cwd(), 'src/content/posts', `${slug}.md`);
        const { content, frontmatter } = await readMarkdownFile(filePath);
        const post = frontmatterToBlogPost(slug, frontmatter, content);

        postsCache.set(cacheKey, post);
        cacheTimestamps.set(cacheKey, Date.now());

        return post;
    } catch (error) {
        console.error(`Error loading blog post ${slug}:`, error);
        return null;
    }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
    const allPosts = await getAllBlogPosts();
    return allPosts.filter(post => post.published);
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    const allPosts = await getAllBlogPosts();
    return allPosts.filter(post => post.category === category && post.published);
}

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

export async function getAllCategories(): Promise<string[]> {
    const allPosts = await getAllBlogPosts();
    const categories = new Set(allPosts.filter(post => post.published).map(post => post.category));
    return Array.from(categories).sort();
}

export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
    const allPosts = await getAllBlogPosts();

    const scoredPosts = allPosts
        .filter(post => post.slug !== currentPost.slug && post.published)
        .map(post => {
            let score = 0;

            if (post.category === currentPost.category) score += 3;

            const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag));
            score += commonTags.length * 2;

            return { post, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.post);

    return scoredPosts;
}

export function clearBlogCache(): void {
    markdownCache.clear();
    frontmatterCache.clear();
    postsCache.clear();
    cacheTimestamps.clear();
}

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