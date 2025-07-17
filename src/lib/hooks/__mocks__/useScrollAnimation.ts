import { UseScrollAnimationReturn } from '@/types';

export const useScrollAnimation = jest.fn().mockReturnValue({
    ref: jest.fn(),
    isVisible: true,
    hasAnimated: false,
} as UseScrollAnimationReturn); 