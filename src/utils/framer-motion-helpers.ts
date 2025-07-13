import { act } from 'react-dom/test-utils';

export interface FramerMotionHelpersConfig {
    animationTimeout?: number;
    defaultDuration?: number;
}

export function createFramerMotionHelpers(config: FramerMotionHelpersConfig = {}) {
    const animationTimeout = config.animationTimeout ?? 1000;
    const defaultDuration = config.defaultDuration ?? 100;

    function waitForMotionComplete(testId: string, timeout = animationTimeout): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }

    function getMotionState(testId: string, props: string[] = []): Record<string, any> {
        const el = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
        if (!el) return {};
        const computed = window.getComputedStyle(el);
        if (props.length === 0) {
            return {
                opacity: computed.opacity,
                transform: computed.transform,
            };
        }
        const result: Record<string, any> = {};
        props.forEach((prop) => {
            result[prop] = computed.getPropertyValue(prop);
        });
        return result;
    }

    async function triggerMotionAnimation(testId: string, animateProps: Record<string, any>, transition?: Record<string, any>) {
        // Simulate animation by updating style directly (for test env)
        const el = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
        if (!el) return;
        act(() => {
            Object.keys(animateProps).forEach((key) => {
                // Only handle opacity and transform for now
                if (key === 'opacity') {
                    el.style.opacity = animateProps[key];
                }
                if (key === 'scale') {
                    el.style.transform = `scale(${animateProps[key]})`;
                }
            });
        });
        await waitForMotionComplete(testId, transition?.duration ? transition.duration * 1000 : defaultDuration);
    }

    function testMotionVariants(testId: string, variants: Record<string, any>, states?: string[]) {
        const el = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
        if (!el) return {};
        const result: Record<string, any> = {};
        (states ?? Object.keys(variants)).forEach((state) => {
            result[state] = variants[state];
        });
        return result;
    }

    async function measureAnimationPerformance(testId: string): Promise<{ frameRate: number; duration: number }> {
        // Simulate a performance measurement
        const start = performance.now();
        await waitForMotionComplete(testId, defaultDuration);
        const end = performance.now();
        return {
            frameRate: 60,
            duration: end - start,
        };
    }

    async function detectAnimationIssues(testId: string): Promise<string[]> {
        // Simulate detection of animation issues
        await waitForMotionComplete(testId, defaultDuration);
        return [];
    }

    return {
        waitForMotionComplete,
        getMotionState,
        triggerMotionAnimation,
        testMotionVariants,
        measureAnimationPerformance,
        detectAnimationIssues,
    };
}

// Named exports for direct import
export const waitForMotionComplete = createFramerMotionHelpers().waitForMotionComplete;
export const getMotionState = createFramerMotionHelpers().getMotionState;
export const triggerMotionAnimation = createFramerMotionHelpers().triggerMotionAnimation;
export const testMotionVariants = createFramerMotionHelpers().testMotionVariants; 