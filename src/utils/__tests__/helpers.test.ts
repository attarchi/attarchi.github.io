import { formatDate } from '../helpers';

describe('helpers', () => {
    describe('formatDate', () => {
        it('formats date string correctly', () => {
            expect(formatDate('2024-01-15')).toBe('January 15, 2024');
        });

        it('handles different date formats', () => {
            expect(formatDate('2023-12-25')).toBe('December 25, 2023');
        });
    });
}); 