import { marked } from 'marked';
import matter from 'gray-matter';

export interface MarkdownContent {
    content: string;
}

export interface MarkdownFrontmatter {
    [key: string]: any;
}

export interface ParsedMarkdown {
    content: string;
    frontmatter: MarkdownFrontmatter;
}

// Configure marked for GitHub-style rendering
marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convert \n to <br>
});

export function parseMarkdown(markdown: string): MarkdownContent {
    // Extract frontmatter and content separately
    const { content: markdownContent } = matter(markdown);
    const htmlContent = marked(markdownContent);
    return { content: htmlContent };
}

export function extractFrontmatter(markdown: string): MarkdownFrontmatter {
    const { data } = matter(markdown);
    return data;
}

export function calculateReadingTime(text: string): number {
    const cleanText = text
        .replace(/<[^>]*>/g, '')
        .replace(/[#*`\[\]]/g, '')
        .replace(/\n+/g, ' ')
        .trim();

    const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200);

    return readingTimeMinutes;
} 