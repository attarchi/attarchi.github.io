export const parseMarkdown = jest.fn().mockReturnValue({ content: '<h1>Mock Content</h1>' });

export const extractFrontmatter = jest.fn().mockReturnValue({
    title: 'Mock Title',
    date: '2024-01-01',
    tags: ['mock', 'test'],
    category: 'Test',
    published: true
});

export const calculateReadingTime = jest.fn().mockReturnValue(3); 