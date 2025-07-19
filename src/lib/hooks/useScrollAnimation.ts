import { useRef, useState, useEffect, useCallback } from 'react';

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

export function useScrollAnimation(options: UseScrollAnimationOptions = {}): UseScrollAnimationReturn {
    const {
        threshold = 0.2,
        rootMargin = '0px',
        triggerOnce = false,
        disabled = false,
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const nodeRef = useRef<Element | null>(null);
    const hasTriggeredOnce = useRef(false);

    const cleanupObserver = useCallback(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
    }, []);

    const ref = useCallback((node: Element | null) => {
        cleanupObserver();
        nodeRef.current = node;

        if (!node || disabled || typeof IntersectionObserver === 'undefined') {
            if (!(triggerOnce && hasTriggeredOnce.current)) {
                setIsVisible(false);
                setHasAnimated(false);
            }
            return;
        }

        const checkInitialVisibility = () => {
            const rect = node.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const thresholdPixels = windowHeight * threshold;

            const isCurrentlyVisible = rect.top < windowHeight - thresholdPixels && rect.bottom > thresholdPixels;

            if (isCurrentlyVisible && !(triggerOnce && hasTriggeredOnce.current)) {
                setIsVisible(true);
                setHasAnimated(true);
                if (triggerOnce) {
                    hasTriggeredOnce.current = true;
                }
            }
        };

        checkInitialVisibility();

        const timeoutId = setTimeout(checkInitialVisibility, 100);

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target !== nodeRef.current) return;

                    if (triggerOnce) {
                        if (!hasTriggeredOnce.current && entry.isIntersecting) {
                            setIsVisible(true);
                            setHasAnimated(true);
                            hasTriggeredOnce.current = true;
                        } else if (hasTriggeredOnce.current && !entry.isIntersecting) {
                            setIsVisible(false);
                        }
                    } else {
                        if (entry.isIntersecting) {
                            setIsVisible(true);
                            setHasAnimated(true);
                        } else {
                            setIsVisible(false);
                        }
                    }
                });
            },
            {
                threshold,
                rootMargin,
            }
        );

        observerRef.current.observe(node);

        return () => clearTimeout(timeoutId);
    }, [threshold, rootMargin, triggerOnce, disabled, cleanupObserver]);

    useEffect(() => {
        return () => {
            cleanupObserver();
        };
    }, [threshold, rootMargin, triggerOnce, disabled, cleanupObserver]);

    return {
        ref,
        isVisible,
        hasAnimated,
    };
} 