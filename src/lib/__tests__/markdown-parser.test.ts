import { parseMarkdown, extractFrontmatter, calculateReadingTime } from '../markdown-parser';

describe('markdown-parser', () => {
    it('parses basic markdown to HTML', () => {
        const markdown = '# Hello World\n\nThis is a **test**.';
        const result = parseMarkdown(markdown);

        expect(result.content).toContain('<h1>Hello World</h1>');
        expect(result.content).toContain('<p>This is a <strong>test</strong>.</p>');
    });

    it('highlights code blocks with GitHub theme', () => {
        const markdown = '```javascript\nconst x = 1;\n```';
        const result = parseMarkdown(markdown);

        expect(result.content).toContain('<pre><code class="language-javascript">');
        expect(result.content).toContain('const x = 1;');
    });

    it('extracts frontmatter', () => {
        const markdown = `---
title: Test Post
date: 2025-01-01
---
# Content here`;

        const frontmatter = extractFrontmatter(markdown);
        expect(frontmatter.title).toBe('Test Post');
        expect(frontmatter.date).toEqual(new Date('2025-01-01'));
    });

    it('calculates reading time (200 wpm)', () => {
        const text = 'This is a test sentence. '.repeat(200); // 200 words
        const readingTime = calculateReadingTime(text);
        expect(readingTime).toBe(5); // 1000 words / 200 wpm = 5 minutes
    });

    it('removes YAML frontmatter from content when parsing', () => {
        const markdown = `---
title: AI-Assisted Development
date: 2025-07-19
excerpt: Learn how to leverage AI coding tools responsibly
tags: ["AI", "development"]
category: Development
readingTime: 6
published: true
---

# AI-Assisted Development

This is the actual content that should be displayed.

## Introduction

The YAML frontmatter above should not appear in the rendered content.`;

        const result = parseMarkdown(markdown);

        // Verify that YAML frontmatter is removed
        expect(result.content).not.toContain('title: AI-Assisted Development');
        expect(result.content).not.toContain('date: 2025-07-19');
        expect(result.content).not.toContain('excerpt: Learn how to leverage AI coding tools responsibly');
        expect(result.content).not.toContain('tags: ["AI", "development"]');
        expect(result.content).not.toContain('category: Development');
        expect(result.content).not.toContain('readingTime: 6');
        expect(result.content).not.toContain('published: true');
        expect(result.content).not.toContain('---');

        // Verify that actual content is preserved
        expect(result.content).toContain('<h1>AI-Assisted Development</h1>');
        expect(result.content).toContain('<p>This is the actual content that should be displayed.</p>');
        expect(result.content).toContain('<h2>Introduction</h2>');
        expect(result.content).toContain('<p>The YAML frontmatter above should not appear in the rendered content.</p>');
    });
}); 