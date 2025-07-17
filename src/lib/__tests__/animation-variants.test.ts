import { describe, it, expect } from '@jest/globals';
import {
    sectionVariants,
    staggerVariants,
    slideUpVariants,
    slideInVariants,
    scaleVariants,
    typewriterVariants,
    fadeVariants,
    projectStaggerVariants,
    projectCardVariants,
    techBadgeVariants,
    categoryStaggerVariants,
    categorySlideInVariants,
    skillStaggerVariants,
    skillFadeVariants,
    proficiencyScaleVariants,
    proficiencyFillVariants,
    createCustomVariants,
    createStaggerVariants
} from '../animation-variants';

describe('Animation Variants', () => {
    describe('Basic Variants Structure', () => {
        it('should have correct structure for all variants', () => {
            const variants = [
                sectionVariants,
                staggerVariants,
                slideUpVariants,
                scaleVariants,
                typewriterVariants,
                fadeVariants,
                projectStaggerVariants,
                projectCardVariants,
                techBadgeVariants,
                categoryStaggerVariants,
                categorySlideInVariants,
                skillStaggerVariants,
                skillFadeVariants,
                proficiencyScaleVariants,
                proficiencyFillVariants
            ];

            variants.forEach(variant => {
                expect(variant).toHaveProperty('hidden');
                expect(variant).toHaveProperty('visible');
                expect(typeof variant.hidden).toBe('object');
                expect(typeof variant.visible).toBe('object');
            });
        });

        it('should have correct slideInVariants structure', () => {
            expect(slideInVariants).toHaveProperty('left');
            expect(slideInVariants).toHaveProperty('right');
            expect(slideInVariants.left).toHaveProperty('hidden');
            expect(slideInVariants.left).toHaveProperty('visible');
            expect(slideInVariants.right).toHaveProperty('hidden');
            expect(slideInVariants.right).toHaveProperty('visible');
        });
    });

    describe('Animation Timing', () => {
        it('should use consistent timing for main animations', () => {
            const variants = [sectionVariants, staggerVariants, slideUpVariants, scaleVariants, typewriterVariants, fadeVariants];

            variants.forEach(variant => {
                if (variant.visible?.transition) {
                    expect(variant.visible.transition.duration).toBe(0.8);
                    expect(variant.visible.transition.ease).toBe('easeOut');
                }
            });
        });

        it('should have appropriate stagger timing', () => {
            expect(staggerVariants.visible.transition.staggerChildren).toBe(0.1);
            expect(staggerVariants.visible.transition.delayChildren).toBe(0.2);
        });
    });

    describe('Utility Functions', () => {
        it('should create custom variants with custom timing', () => {
            const customVariants = createCustomVariants(sectionVariants, 1.0, 0.5);
            expect(customVariants.visible.transition.duration).toBe(1.0);
            expect(customVariants.visible.transition.delay).toBe(0.5);
        });

        it('should create stagger variants with custom timing', () => {
            const customStagger = createStaggerVariants(0.3, 0.4);
            expect(customStagger.visible.transition.staggerChildren).toBe(0.3);
            expect(customStagger.visible.transition.delayChildren).toBe(0.4);
        });
    });

    describe('Specialized Variants', () => {
        it('should have hover and tap variants for scaleVariants', () => {
            expect(scaleVariants).toHaveProperty('hover');
            expect(scaleVariants).toHaveProperty('tap');
        });

        it('should have typing variant for typewriterVariants', () => {
            expect(typewriterVariants).toHaveProperty('typing');
        });

        it('should have exit variant for fadeVariants', () => {
            expect(fadeVariants).toHaveProperty('exit');
        });
    });
}); 