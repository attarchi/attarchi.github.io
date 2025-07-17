import { useRef, useState, useEffect, useCallback } from 'react';

export interface Milestone {
    id: string;
    progressThreshold: number;
}

export interface UseTimelineProgressOptions {
    milestones?: Milestone[];
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export interface UseTimelineProgressReturn {
    ref: (node: Element | null) => void;
    progress: number;
    activeMilestones: string[];
}

export function useTimelineProgress(options: UseTimelineProgressOptions = {}): UseTimelineProgressReturn {
    const {
        milestones = [],
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = false,
    } = options;

    const [progress, setProgress] = useState(0);
    const [activeMilestones, setActiveMilestones] = useState<string[]>([]);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const nodeRef = useRef<Element | null>(null);
    const isInitializedRef = useRef(false);
    const hasTriggeredOnce = useRef(false);

    const cleanupObserver = useCallback(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
    }, []);

    const calculateProgress = useCallback((entry: IntersectionObserverEntry): number => {
        if (!entry.isIntersecting) return 0;

        const rect = entry.boundingClientRect;
        const rootRect = entry.rootBounds;

        if (!rootRect) return 0;

        const progress = Math.max(0, Math.min(1, entry.intersectionRatio));

        return progress;
    }, []);

    const updateActiveMilestones = useCallback((currentProgress: number) => {
        const active = milestones
            .filter(milestone => currentProgress >= milestone.progressThreshold)
            .map(milestone => milestone.id);

        setActiveMilestones(active);
    }, [milestones]);

    const ref = useCallback((node: Element | null) => {
        if (nodeRef.current === node) {
            return;
        }

        cleanupObserver();
        nodeRef.current = node;

        if (!node || typeof IntersectionObserver === 'undefined') {
            if (!isInitializedRef.current || nodeRef.current !== null) {
                setProgress(0);
                setActiveMilestones([]);
                isInitializedRef.current = false;
                hasTriggeredOnce.current = false;
            }
            return;
        }

        isInitializedRef.current = true;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target !== nodeRef.current) return;

                    const currentProgress = calculateProgress(entry);

                    if (triggerOnce && hasTriggeredOnce.current && currentProgress < 1) {
                        return;
                    }

                    if (triggerOnce && currentProgress >= 1) {
                        hasTriggeredOnce.current = true;
                    }

                    setProgress(currentProgress);
                    updateActiveMilestones(currentProgress);
                });
            },
            {
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
                rootMargin,
            }
        );

        observerRef.current.observe(node);
    }, [calculateProgress, updateActiveMilestones, rootMargin, cleanupObserver, triggerOnce]);

    useEffect(() => {
        return () => {
            cleanupObserver();
        };
    }, [cleanupObserver]);

    return {
        ref,
        progress,
        activeMilestones,
    };
} 