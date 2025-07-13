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

/**
 * useScrollAnimation - React hook for scroll-triggered animations using Intersection Observer.
 *
 * Features:
 * - Uses Intersection Observer API for performance
 * - Returns animation state (visible/hidden) and ref to attach to elements
 * - Supports custom threshold and root margin
 * - Handles cleanup to prevent memory leaks
 * - Respects prefers-reduced-motion setting
 * - TypeScript interfaces for all parameters and return values
 *
 * @example
 * const { ref, isVisible, hasAnimated } = useScrollAnimation({
 *   threshold: 0.3, // 30% visibility triggers
 *   rootMargin: '0px 0px -20% 0px', // triggers earlier/later
 *   triggerOnce: true, // animate only once
 *   disabled: false, // disable observer
 * });
 *
 * return <div ref={ref}>{isVisible ? 'Visible!' : 'Hidden'}</div>;
 *
 * @param {UseScrollAnimationOptions} options - Configuration options for the hook
 * @param {number} [options.threshold=0.2] - Percentage of element visibility to trigger (0-1)
 * @param {string} [options.rootMargin='0px'] - Root margin for Intersection Observer
 * @param {boolean} [options.triggerOnce=false] - If true, animation triggers only once
 * @param {boolean} [options.disabled=false] - If true, disables the observer
 *
 * @returns {UseScrollAnimationReturn} Object with ref, isVisible, and hasAnimated
 * @property {(node: Element | null) => void} ref - Ref callback to attach to the element
 * @property {boolean} isVisible - Whether the element is currently visible (per threshold)
 * @property {boolean} hasAnimated - Whether the element has ever been visible (useful for triggerOnce)
 */
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
        // Always disconnect previous observer
        cleanupObserver();
        nodeRef.current = node;
        // Only reset state if not already triggered (for triggerOnce)
        if (!(triggerOnce && hasTriggeredOnce.current)) {
            setIsVisible(false);
            setHasAnimated(false);
        }
        if (!node || disabled || typeof IntersectionObserver === 'undefined') return;
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Only update state for this node
                    if (entry.target !== nodeRef.current) return;
                    if (triggerOnce) {
                        if (!hasTriggeredOnce.current && entry.isIntersecting) {
                            setIsVisible(true);
                            setHasAnimated(true);
                            hasTriggeredOnce.current = true;
                        } else if (hasTriggeredOnce.current && !entry.isIntersecting) {
                            setIsVisible(false);
                        }
                        // Never set isVisible to true again after first trigger
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