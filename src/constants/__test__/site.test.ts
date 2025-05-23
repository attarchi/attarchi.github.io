import { siteConfig } from '../site';

describe('siteConfig', () => {
    it('should have all required properties', () => {
        expect(siteConfig).toHaveProperty('title');
        expect(siteConfig).toHaveProperty('description');
        expect(siteConfig).toHaveProperty('author');
        expect(siteConfig).toHaveProperty('siteUrl');
        expect(siteConfig).toHaveProperty('social');
        expect(siteConfig).toHaveProperty('navigation');
    });
});