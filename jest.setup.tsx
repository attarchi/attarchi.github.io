import React from 'react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        const { src, alt, width, height, className } = props;
        return <img src={typeof src === 'string' ? src : ''} alt={alt} width={width} height={height} className={className} />;
    },
}));

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href, className, ...props }: { children: React.ReactNode; href: string; className?: string; [key: string]: any }) => {
        return <a href={href} className={className} {...props}>{children}</a>;
    },
}));

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
            back: jest.fn(),
        };
    },
    usePathname() {
        return '';
    },
    useSearchParams() {
        return new URLSearchParams();
    },
}));

// Animation testing mocks
// Mock IntersectionObserver for animation testing
class MockIntersectionObserver {
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        this.callback = callback;
        this.options = options;
    }
    
    callback: IntersectionObserverCallback;
    options?: IntersectionObserverInit;
    root: Element | null = null;
    rootMargin: string = '';
    thresholds: ReadonlyArray<number> = [];
    
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords = jest.fn(() => []);
}

// Mock performance API for animation performance testing
Object.defineProperty(window, 'performance', {
    value: {
        now: jest.fn(() => Date.now()),
        mark: jest.fn(),
        measure: jest.fn(),
        getEntriesByType: jest.fn(() => []),
        getEntriesByName: jest.fn(() => []),
    },
    writable: true,
});

// Mock requestAnimationFrame for animation testing
Object.defineProperty(window, 'requestAnimationFrame', {
    value: jest.fn((callback) => {
        return setTimeout(callback, 16); // ~60fps
    }),
    writable: true,
});

Object.defineProperty(window, 'cancelAnimationFrame', {
    value: jest.fn((id) => {
        clearTimeout(id);
    }),
    writable: true,
});

// Mock ResizeObserver for animation testing
class MockResizeObserver {
    constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
    }
    
    callback: ResizeObserverCallback;
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
}

// Set up global mocks
Object.defineProperty(window, 'IntersectionObserver', {
    value: MockIntersectionObserver,
    writable: true,
});

Object.defineProperty(window, 'ResizeObserver', {
    value: MockResizeObserver,
    writable: true,
});

// Mock matchMedia for responsive animation testing
Object.defineProperty(window, 'matchMedia', {
    value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
    writable: true,
}); 