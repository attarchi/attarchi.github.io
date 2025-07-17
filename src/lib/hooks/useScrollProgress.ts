import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseScrollProgressReturn {
    progress: number;
    isScrolling: boolean;
}

export function useScrollProgress(): UseScrollProgressReturn {
    const [progress, setProgress] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const animationFrameId = useRef<number | null>(null);
    const scrollTimeoutId = useRef<NodeJS.Timeout | null>(null);

    const calculateScrollProgress = useCallback(() => {
        const scrollY = window.scrollY || 0;
        const scrollHeight = document.documentElement.scrollHeight || 0;
        const clientHeight = document.documentElement.clientHeight || 0;
        const scrollableDistance = scrollHeight - clientHeight;

        if (scrollableDistance <= 0) {
            return 0;
        }

        const calculatedProgress = Math.max(0, Math.min(1, scrollY / scrollableDistance));

        if (isNaN(calculatedProgress)) {
            return 0;
        }

        return calculatedProgress;
    }, []);

    const updateProgressWithThrottling = useCallback(() => {
        const newProgress = calculateScrollProgress();
        setProgress(newProgress);

        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }
    }, [calculateScrollProgress]);

    const handleScrollEvent = useCallback(() => {
        setIsScrolling(true);

        if (scrollTimeoutId.current) {
            clearTimeout(scrollTimeoutId.current);
        }

        scrollTimeoutId.current = setTimeout(() => {
            setIsScrolling(false);
        }, 150);

        if (!animationFrameId.current) {
            animationFrameId.current = requestAnimationFrame(() => {
                updateProgressWithThrottling();
                animationFrameId.current = null;
            });
        }
    }, [updateProgressWithThrottling]);

    useEffect(() => {
        updateProgressWithThrottling();
        window.addEventListener('scroll', handleScrollEvent, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScrollEvent);

            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }

            if (scrollTimeoutId.current) {
                clearTimeout(scrollTimeoutId.current);
            }
        };
    }, [handleScrollEvent, updateProgressWithThrottling]);

    return {
        progress,
        isScrolling,
    };
} 