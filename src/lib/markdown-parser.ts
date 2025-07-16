import { marked } from 'marked';
import matter from 'gray-matter';

// Configure marked for GitHub-style rendering
marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convert \n to <br>
});

export function parseMarkdown(markdown: string): { content: string } {
    // Parse markdown to HTML using marked
    const htmlContent = marked(markdown);
    return { content: htmlContent };
}

export function extractFrontmatter(markdown: string): Record<string, any> {
    // Use gray-matter to parse frontmatter
    const { data } = matter(markdown);
    return data;
}

export function calculateReadingTime(text: string): number {
    // Remove HTML tags and markdown syntax for accurate word count
    const cleanText = text
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[#*`\[\]]/g, '') // Remove markdown syntax
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim();

    // Count words (split by whitespace)
    const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;

    // Calculate reading time at 200 words per minute
    const readingTimeMinutes = Math.ceil(wordCount / 200);

    return readingTimeMinutes;
} 