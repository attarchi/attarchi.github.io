import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseScrollProgressReturn {
    progress: number;
    isScrolling: boolean;
}

/**
 * useScrollProgress - React hook for tracking scroll progress through the page.
 *
 * Features:
 * - Calculates scroll progress as percentage (0-1)
 * - Throttled scroll events for performance (16ms intervals)
 * - Tracks scrolling state for UI feedback
 * - Handles edge cases (short pages, negative scroll)
 * - Automatic cleanup on unmount
 *
 * @example
 * const { progress, isScrolling } = useScrollProgress();
 * 
 * return (
 *   <div style={{ width: `${progress * 100}%` }}>
 *     Progress: {Math.round(progress * 100)}%
 *   </div>
 * );
 *
 * @returns {UseScrollProgressReturn} Object with progress and isScrolling state
 * @property {number} progress - Scroll progress as value between 0 and 1
 * @property {boolean} isScrolling - Whether user is currently scrolling
 */
export function useScrollProgress(): UseScrollProgressReturn {
    const [progress, setProgress] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const rafId = useRef<number | null>(null);
    const scrollTimeoutId = useRef<NodeJS.Timeout | null>(null);

    const calculateProgress = useCallback(() => {
        const scrollY = window.scrollY || 0;
        const scrollHeight = document.documentElement.scrollHeight || 0;
        const clientHeight = document.documentElement.clientHeight || 0;

        // Calculate scrollable distance
        const scrollableDistance = scrollHeight - clientHeight;

        // Handle edge cases
        if (scrollableDistance <= 0) {
            return 0;
        }

        // Calculate progress and clamp between 0 and 1
        const calculatedProgress = Math.max(0, Math.min(1, scrollY / scrollableDistance));

        // Handle NaN values
        if (isNaN(calculatedProgress)) {
            return 0;
        }

        return calculatedProgress;
    }, []);

    const updateProgress = useCallback(() => {
        const newProgress = calculateProgress();
        setProgress(newProgress);

        // Clear any existing RAF
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }
    }, [calculateProgress]);

    const handleScroll = useCallback(() => {
        // Set scrolling state
        setIsScrolling(true);

        // Clear existing scroll timeout
        if (scrollTimeoutId.current) {
            clearTimeout(scrollTimeoutId.current);
        }

        // Set timeout to mark scrolling as ended
        scrollTimeoutId.current = setTimeout(() => {
            setIsScrolling(false);
        }, 150);

        // Throttle progress updates using requestAnimationFrame
        if (!rafId.current) {
            rafId.current = requestAnimationFrame(() => {
                updateProgress();
                rafId.current = null;
            });
        }
    }, [updateProgress]);

    useEffect(() => {
        // Calculate initial progress
        updateProgress();

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);

            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }

            if (scrollTimeoutId.current) {
                clearTimeout(scrollTimeoutId.current);
            }
        };
    }, [handleScroll, updateProgress]);

    return {
        progress,
        isScrolling,
    };
} 