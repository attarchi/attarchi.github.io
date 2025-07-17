export interface AnimationVariants {
    hidden: Record<string, any>;
    visible: Record<string, any>;
    hover?: Record<string, any>;
    tap?: Record<string, any>;
    exit?: Record<string, any>;
}

export interface SlideInVariants {
    left: AnimationVariants;
    right: AnimationVariants;
}

export interface TypewriterVariants extends AnimationVariants {
    typing: Record<string, any>;
}

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