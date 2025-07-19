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

export interface BlogPostFrontmatter {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    category: string;
    readingTime: number;
    published: boolean;
}

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