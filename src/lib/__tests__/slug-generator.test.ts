import { generateSlug } from '../slug-generator';

describe('generateSlug', () => {
    describe('basic functionality', () => {
        it('should convert "Building Offline-First Apps" to "building_offline_first_apps"', () => {
            const result = generateSlug('Building Offline-First Apps');
            expect(result).toBe('building_offline_first_apps');
        });

        it('should convert "React Native Cross-Platform" to "react_native_cross_platform"', () => {
            const result = generateSlug('React Native Cross-Platform');
            expect(result).toBe('react_native_cross_platform');
        });

        it('should convert "Building Apps with Next.js 14" to "building_apps_with_nextjs_14"', () => {
            const result = generateSlug('Building Apps with Next.js 14');
            expect(result).toBe('building_apps_with_nextjs_14');
        });

        it('should convert "API Design & Implementation" to "api_design_implementation"', () => {
            const result = generateSlug('API Design & Implementation');
            expect(result).toBe('api_design_implementation');
        });
    });

    describe('special characters handling', () => {
        it('should remove special characters except letters, numbers, and underscores', () => {
            const result = generateSlug('Hello! @World# $%^&*()');
            expect(result).toBe('hello_world');
        });

        it('should handle multiple special characters', () => {
            const result = generateSlug('Test@#$%^&*()_+{}|:"<>?[]\\;\'./');
            expect(result).toBe('test');
        });
    });

    describe('space handling', () => {
        it('should replace single spaces with underscores', () => {
            const result = generateSlug('Hello World');
            expect(result).toBe('hello_world');
        });

        it('should handle multiple consecutive spaces', () => {
            const result = generateSlug('Hello    World');
            expect(result).toBe('hello_world');
        });

        it('should handle leading and trailing spaces', () => {
            const result = generateSlug('  Hello World  ');
            expect(result).toBe('hello_world');
        });
    });

    describe('underscore handling', () => {
        it('should handle multiple consecutive underscores', () => {
            const result = generateSlug('Hello___World');
            expect(result).toBe('hello_world');
        });

        it('should trim leading and trailing underscores', () => {
            const result = generateSlug('_Hello_World_');
            expect(result).toBe('hello_world');
        });
    });

    describe('empty string handling', () => {
        it('should return empty string for empty input', () => {
            const result = generateSlug('');
            expect(result).toBe('');
        });

        it('should return empty string for whitespace only input', () => {
            const result = generateSlug('   ');
            expect(result).toBe('');
        });

        it('should return empty string for special characters only', () => {
            const result = generateSlug('!@#$%^&*()');
            expect(result).toBe('');
        });
    });

    describe('numbers and hyphens', () => {
        it('should preserve numbers', () => {
            const result = generateSlug('Project 2024');
            expect(result).toBe('project_2024');
        });

        it('should handle hyphens by converting to underscores', () => {
            const result = generateSlug('React-Native-App');
            expect(result).toBe('react_native_app');
        });

        it('should handle mixed numbers and hyphens', () => {
            const result = generateSlug('Next.js-14-Project');
            expect(result).toBe('nextjs_14_project');
        });
    });

    describe('unicode characters', () => {
        it('should handle unicode characters', () => {
            const result = generateSlug('Café & Résumé');
            expect(result).toBe('caf_rsum');
        });

        it('should handle accented characters', () => {
            const result = generateSlug('São Paulo');
            expect(result).toBe('so_paulo');
        });

        it('should handle emoji and symbols', () => {
            const result = generateSlug('Project 🚀 & ⭐');
            expect(result).toBe('project');
        });
    });

    describe('case conversion', () => {
        it('should convert to lowercase', () => {
            const result = generateSlug('HELLO WORLD');
            expect(result).toBe('hello_world');
        });

        it('should handle mixed case', () => {
            const result = generateSlug('HelloWorld');
            expect(result).toBe('helloworld');
        });
    });
}); 