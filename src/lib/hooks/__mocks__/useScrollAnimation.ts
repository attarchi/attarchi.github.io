import { UseScrollAnimationReturn } from '../useScrollAnimation';

export const useScrollAnimation = jest.fn(() => ({
    ref: jest.fn(),
    isVisible: true,
    hasAnimated: true,
} as UseScrollAnimationReturn)); 