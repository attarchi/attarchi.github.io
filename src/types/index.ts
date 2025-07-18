export interface UseScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    disabled?: boolean;
}

export interface UseScrollAnimationReturn {
    ref: (node: Element | null) => void;
    isVisible: boolean;
    hasAnimated: boolean;
} 