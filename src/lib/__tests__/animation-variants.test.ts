import { describe, it, expect } from '@jest/globals';
import {
    sectionVariants,
    staggerVariants,
    slideUpVariants,
    slideInVariants,
    scaleVariants,
    fadeVariants,
    projectStaggerVariants,
    projectCardVariants,
    techBadgeVariants,
    categoryStaggerVariants,
    categorySlideInVariants,
    skillProgressVariants,
    timelineVariants,
    timelineItemVariants,
    contactFormVariants,
    buttonVariants,
    cardVariants,
    badgeVariants,
    iconVariants,
    textVariants,
    headingVariants,
    listVariants,
    listItemVariants,
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
                fadeVariants,
                projectStaggerVariants,
                projectCardVariants,
                techBadgeVariants,
                categoryStaggerVariants,
                categorySlideInVariants,
                skillProgressVariants,
                timelineVariants,
                timelineItemVariants,
                contactFormVariants,
                buttonVariants,
                cardVariants,
                badgeVariants,
                iconVariants,
                textVariants,
                headingVariants,
                listVariants,
                listItemVariants
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
            const variants = [sectionVariants, staggerVariants, slideUpVariants, scaleVariants, fadeVariants];

            variants.forEach(variant => {
                const visible = variant.visible as any;
                if (visible?.transition) {
                    expect(visible.transition.duration).toBe(0.8);
                    expect(visible.transition.ease).toBe('easeOut');
                }
            });
        });

        it('should have appropriate stagger timing', () => {
            const visible = staggerVariants.visible as any;
            expect(visible.transition.staggerChildren).toBe(0.1);
            expect(visible.transition.delayChildren).toBe(0.2);
        });
    });

    describe('Utility Functions', () => {
        it('should create custom variants with custom timing', () => {
            const customVariants = createCustomVariants(1.0, 0.5);
            const visible = customVariants.visible as any;
            expect(visible.transition.duration).toBe(1.0);
            expect(visible.transition.delay).toBe(0.5);
        });

        it('should create stagger variants with custom timing', () => {
            const customStagger = createStaggerVariants(0.3, 0.4);
            const visible = customStagger.visible as any;
            expect(visible.transition.staggerChildren).toBe(0.3);
            expect(visible.transition.delayChildren).toBe(0.4);
        });
    });

    describe('Specialized Variants', () => {
        it('should have hover and tap variants for scaleVariants', () => {
            expect(scaleVariants).toHaveProperty('hover');
            expect(scaleVariants).toHaveProperty('tap');
        });

        it('should have exit variant for fadeVariants', () => {
            expect(fadeVariants).toHaveProperty('exit');
        });
    });
}); 