import { render, RenderOptions } from '@testing-library/react';
import { createIntersectionObserverMock } from './intersection-observer-mock';
import { createFramerMotionHelpers } from './framer-motion-helpers';

export interface AnimationTestUtilsConfig {
    animationDuration?: number;
    intersectionThreshold?: number;
    animationTimeout?: number;
    defaultDuration?: number;
}

export interface AnimationTestUtils {
    renderWithAnimation: (ui: React.ReactElement, options?: RenderOptions) => ReturnType<typeof render>;
    waitForAnimation: (timeout?: number) => Promise<void>;
    getAnimationState: (testId: string, props?: string[]) => Record<string, any>;
    mockIntersectionObserver: (options?: any) => any;
}

export function createAnimationTestUtils(config: AnimationTestUtilsConfig = {}): AnimationTestUtils {
    const animationDuration = config.animationDuration ?? 500;
    const intersectionThreshold = config.intersectionThreshold ?? 0.1;
    const animationTimeout = config.animationTimeout ?? 1000;
    const defaultDuration = config.defaultDuration ?? 100;

    // Create the intersection observer mock
    const intersectionObserverMock = createIntersectionObserverMock({
        isIntersecting: true,
        intersectionRatio: intersectionThreshold,
    });

    // Create framer motion helpers
    const framerMotionHelpers = createFramerMotionHelpers({
        animationTimeout,
        defaultDuration,
    });

    function renderWithAnimation(ui: React.ReactElement, options?: RenderOptions) {
        // Set up intersection observer mock
        intersectionObserverMock.setupIntersectionObserverMock();

        // Render with testing library
        const result = render(ui, options);

        return result;
    }

    async function waitForAnimation(timeout = animationDuration): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }

    function getAnimationState(testId: string, props: string[] = []): Record<string, any> {
        return framerMotionHelpers.getMotionState(testId, props);
    }

    function mockIntersectionObserver(options?: any) {
        return createIntersectionObserverMock(options);
    }

    return {
        renderWithAnimation,
        waitForAnimation,
        getAnimationState,
        mockIntersectionObserver,
    };
}

// Default export for convenience
export default createAnimationTestUtils; 