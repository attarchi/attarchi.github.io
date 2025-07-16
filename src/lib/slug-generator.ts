/**
 * Generates a URL-friendly slug from a given string.
 * 
 * @param input - The input string to convert to a slug
 * @returns A URL-friendly slug in snake_case format
 */
export function generateSlug(input: string): string {
    if (!input || input.trim() === '') {
        return '';
    }

    return input
        .toLowerCase()
        .trim()
        .replace(/[-\s]+/g, '_') // Replace spaces and hyphens with underscores
        .replace(/[^a-z0-9_]/g, '') // Remove special characters except letters, numbers, underscores
        .replace(/_+/g, '_') // Collapse multiple underscores
        .replace(/^_+|_+$/g, ''); // Trim leading/trailing underscores
} 