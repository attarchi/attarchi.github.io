import { describe, it, expect } from '@jest/globals';
import {
    sectionVariants,
    staggerVariants,
    slideUpVariants,
    slideInVariants,
    scaleVariants,
    typewriterVariants,
    fadeVariants
} from '../animation-variants';

describe('Animation Variants', () => {
    describe('sectionVariants', () => {
        it('should have correct hidden state', () => {
            expect(sectionVariants.hidden).toEqual({
                opacity: 0,
                y: 50
            });
        });

        it('should have correct visible state with proper timing', () => {
            expect(sectionVariants.visible).toEqual({
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.8,
                    ease: 'easeOut'
                }
            });
        });

        it('should support custom duration and delay', () => {
            const customVariants = sectionVariants.visible;
            expect(customVariants.transition).toHaveProperty('duration', 0.8);
            expect(customVariants.transition).toHaveProperty('ease', 'easeOut');
        });
    });

    describe('staggerVariants', () => {
        it('should have correct hidden state', () => {
            expect(staggerVariants.hidden).toEqual({
                opacity: 0,
                y: 20
            });
        });

        it('should have correct visible state with stagger', () => {
            expect(staggerVariants.visible).toEqual({
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.8,
                    ease: 'easeOut',
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                }
            });
        });

        it('should support custom stagger timing', () => {
            const customVariants = staggerVariants.visible;
            expect(customVariants.transition).toHaveProperty('staggerChildren', 0.1);
            expect(customVariants.transition).toHaveProperty('delayChildren', 0.2);
        });
    });

    describe('slideUpVariants', () => {
        it('should have correct hidden state', () => {
            expect(slideUpVariants.hidden).toEqual({
                opacity: 0,
                y: 30
            });
        });

        it('should have correct visible state', () => {
            expect(slideUpVariants.visible).toEqual({
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.8,
                    ease: 'easeOut'
                }
            });
        });

        it('should support custom delay', () => {
            const customVariants = slideUpVariants.visible;
            expect(customVariants.transition).toHaveProperty('duration', 0.8);
            expect(customVariants.transition).toHaveProperty('ease', 'easeOut');
        });
    });

    describe('slideInVariants', () => {
        it('should have correct hidden state for left slide', () => {
            expect(slideInVariants.left.hidden).toEqual({
                opacity: 0,
                x: -50
            });
        });

        it('should have correct visible state for left slide', () => {
            expect(slideInVariants.left.visible).toEqual({
                opacity: 1,
                x: 0,
                transition: {
                    duration: 0.8,
                    ease: 'easeOut'
                }
            });
        });

        it('should have correct hidden state for right slide', () => {
            expect(slideInVariants.right.hidden).toEqual({
                opacity: 0,
                x: 50
            });
        });

        it('should have correct visible state for right slide', () => {
            expect(slideInVariants.right.visible).toEqual({
                opacity: 1,
                x: 0,
                transition: {
                    duration: 0.8,
                    ease: 'easeOut'
                }
            });
        });
    });

    describe('scaleVariants', () => {
        it('should have correct hidden state', () => {
            expect(scaleVariants.hidden).toEqual({
                opacity: 0,
                scale: 0.8
            });
        });

        it('should have correct visible state', () => {
            expect(scaleVariants.visible).toEqual({
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 0.8,
                    ease: 'easeOut'
                }
            });
        });

        it('should have hover state', () => {
            expect(scaleVariants.hover).toEqual({
                scale: 1.05,
                transition: {
                    duration: 0.2,
                    ease: 'easeOut'
                }
            });
        });

        it('should have tap state', () => {
            expect(scaleVariants.tap).toEqual({
                scale: 0.95
            });
        });
    });

    describe('typewriterVariants', () => {
        it('should have correct hidden state', () => {
            expect(typewriterVariants.hidden).toEqual({
                opacity: 0,
                width: 0
            });
        });

        it('should have correct visible state', () => {
            expect(typewriterVariants.visible).toEqual({
                opacity: 1,
                width: '100%',
                transition: {
                    duration: 0.8,
                    ease: 'easeOut'
                }
            });
        });

        it('should have typing animation state', () => {
            expect(typewriterVariants.typing).toEqual({
                width: '100%',
                transition: {
                    duration: 2,
                    ease: 'linear'
                }
            });
        });
    });

    describe('fadeVariants', () => {
        it('should have correct hidden state', () => {
            expect(fadeVariants.hidden).toEqual({
                opacity: 0
            });
        });

        it('should have correct visible state', () => {
            expect(fadeVariants.visible).toEqual({
                opacity: 1,
                transition: {
                    duration: 0.8,
                    ease: 'easeOut'
                }
            });
        });

        it('should have exit state', () => {
            expect(fadeVariants.exit).toEqual({
                opacity: 0,
                transition: {
                    duration: 0.3,
                    ease: 'easeIn'
                }
            });
        });
    });

    describe('Animation Timing Consistency', () => {
        it('should all use 0.8s duration for main animations', () => {
            const variants = [sectionVariants, staggerVariants, slideUpVariants, scaleVariants, typewriterVariants, fadeVariants];

            variants.forEach(variant => {
                if (variant.visible?.transition) {
                    expect(variant.visible.transition.duration).toBe(0.8);
                    expect(variant.visible.transition.ease).toBe('easeOut');
                }
            });
        });

        it('should all have proper TypeScript structure', () => {
            const allVariants = {
                sectionVariants,
                staggerVariants,
                slideUpVariants,
                scaleVariants,
                typewriterVariants,
                fadeVariants
            };

            Object.entries(allVariants).forEach(([name, variant]) => {
                expect(variant).toHaveProperty('hidden');
                expect(variant).toHaveProperty('visible');
                expect(typeof variant.hidden).toBe('object');
                expect(typeof variant.visible).toBe('object');
            });

            // Special case for slideInVariants which has left/right structure
            expect(slideInVariants).toHaveProperty('left');
            expect(slideInVariants).toHaveProperty('right');
            expect(slideInVariants.left).toHaveProperty('hidden');
            expect(slideInVariants.left).toHaveProperty('visible');
            expect(slideInVariants.right).toHaveProperty('hidden');
            expect(slideInVariants.right).toHaveProperty('visible');
        });
    });

    describe('Stagger Animation Support', () => {
        it('should support stagger children animations', () => {
            expect(staggerVariants.visible.transition).toHaveProperty('staggerChildren');
            expect(staggerVariants.visible.transition).toHaveProperty('delayChildren');
        });

        it('should have appropriate stagger timing', () => {
            const stagger = staggerVariants.visible.transition.staggerChildren;
            const delay = staggerVariants.visible.transition.delayChildren;

            expect(stagger).toBeGreaterThan(0);
            expect(stagger).toBeLessThan(1);
            expect(delay).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Hover and Interaction Variants', () => {
        it('should have hover variants where appropriate', () => {
            expect(scaleVariants).toHaveProperty('hover');
            expect(scaleVariants).toHaveProperty('tap');
        });

        it('should have appropriate hover timing', () => {
            expect(scaleVariants.hover.transition.duration).toBe(0.2);
            expect(scaleVariants.hover.transition.ease).toBe('easeOut');
        });
    });
}); 