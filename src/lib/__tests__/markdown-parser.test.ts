import { parseMarkdown, extractFrontmatter, calculateReadingTime } from '../markdown-parser';

const sampleMarkdown = `---\ntitle: Test Post\ndate: 2024-06-01\ntags: [test, markdown]\n---\n\n# Hello World\n\nThis is a sample post.\n\n\n\u0060\u0060\u0060js\nconsole.log('Hello, world!');\n\u0060\u0060\u0060\n`;

describe('markdown-parser', () => {
    it('parses basic markdown to HTML', () => {
        const { content } = parseMarkdown('# Hello World');
        expect(content).toContain('<h1>');
        expect(content).toContain('Hello World');
    });

    it('highlights code blocks with GitHub theme', () => {
        const { content } = parseMarkdown('```js\nconsole.log(123);\n```');
        expect(content).toContain('class="'); // Should contain syntax highlighting classes
        expect(content).toContain('console.log');
    });

    it('extracts frontmatter', () => {
        const frontmatter = extractFrontmatter(sampleMarkdown);
        expect(frontmatter).toEqual({
            title: 'Test Post',
            date: new Date('2024-06-01'),
            tags: ['test', 'markdown'],
        });
    });

    it('calculates reading time (200 wpm)', () => {
        const text = 'word '.repeat(400); // 400 words
        expect(calculateReadingTime(text)).toBe(2); // 2 minutes
    });
}); 