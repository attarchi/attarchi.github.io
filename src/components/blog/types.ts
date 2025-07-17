/**
 * Represents a complete blog post with all necessary data.
 * @property {string} title - The title of the blog post.
 * @property {string} slug - The unique slug in snake_case format.
 * @property {Date} date - The publication date as a Date object.
 * @property {string} excerpt - A short excerpt or summary of the post.
 * @property {string[]} tags - Tags associated with the post.
 * @property {string} category - The category of the post.
 * @property {string} content - The full content of the post.
 * @property {number} readingTime - Estimated reading time in minutes.
 * @property {boolean} published - Whether the post is published.
 */
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

/**
 * Represents the frontmatter metadata for a blog post (typically from markdown frontmatter).
 * @property {string} title - The title of the blog post.
 * @property {string} date - The publication date as an ISO string.
 * @property {string} excerpt - A short excerpt or summary of the post.
 * @property {string[]} tags - Tags associated with the post.
 * @property {string} category - The category of the post.
 * @property {number} readingTime - Estimated reading time in minutes.
 * @property {boolean} published - Whether the post is published.
 */
export interface BlogPostFrontmatter {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    category: string;
    readingTime: number;
    published: boolean;
}

/**
 * Represents parsed metadata for a blog post, including computed and normalized fields.
 * @property {string} title - The title of the blog post.
 * @property {string} slug - The unique slug in snake_case format.
 * @property {Date} date - The publication date as a Date object.
 * @property {string} excerpt - A short excerpt or summary of the post.
 * @property {string[]} tags - Tags associated with the post.
 * @property {string} category - The category of the post.
 * @property {number} readingTime - Estimated reading time in minutes.
 * @property {boolean} published - Whether the post is published.
 * @property {Date} lastModified - The last modified date of the post.
 */
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