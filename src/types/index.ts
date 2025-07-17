export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Project {
    id: string;
    title: string;
    description: string;
    type: 'Microservices' | 'Hybrid' | 'Legacy Modernization';
    technologies: string[];
    highlights: string[];
    links: {
        github?: string;
        demo?: string;
        documentation?: string;
    };
    imageUrl?: string;
    architectureDiagram?: string;
}

/**
 * Represents a blog post with all required content and metadata fields.
 * @property {string} title - The title of the blog post.
 * @property {string} slug - The unique slug in snake_case format.
 * @property {Date} date - The publication date of the blog post.
 * @property {string} excerpt - A short excerpt or summary of the post.
 * @property {string[]} tags - Tags associated with the post.
 * @property {string} category - The category of the post.
 * @property {string} content - The full content of the blog post.
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

export interface Skill {
    name: string;
    category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools';
    proficiency: ProficiencyLevel;
    yearsOfExperience: number;
    icon?: string;
}

export interface TimelineEntry {
    period: string;
    title: string;
    company: string;
    description: string;
    achievements: string[];
    technologies: string[];
    location: string;
}

export interface ContactInfo {
    email: string;
    linkedin: string;
    github: string;
    location: string;
    availability: 'Available' | 'Unavailable' | 'Limited';
    timezone: string;
    preferredContactMethod: 'Email' | 'LinkedIn' | 'GitHub';
}

export interface SiteConfig {
    title: string;
    description: string;
    author: string;
    siteUrl: string;
    social: {
        github: string;
        linkedin: string;
        twitter?: string;
    };
    navigation: {
        label: string;
        href: string;
    }[];
}

export interface AnimationVariants {
    hidden: Record<string, any>;
    visible: Record<string, any>;
    hover?: Record<string, any>;
    tap?: Record<string, any>;
    exit?: Record<string, any>;
}

export interface SlideInVariants {
    left: AnimationVariants;
    right: AnimationVariants;
}

export interface TypewriterVariants extends AnimationVariants {
    typing: Record<string, any>;
} 