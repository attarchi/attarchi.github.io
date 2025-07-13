export interface IntersectionObserverEntry {
    isIntersecting: boolean;
    intersectionRatio: number;
    boundingClientRect: DOMRectReadOnly;
    intersectionRect: DOMRectReadOnly;
    rootBounds: DOMRectReadOnly | null;
    target: Element;
    time: number;
}

export interface IntersectionObserverInit {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

export interface IntersectionObserverMock {
    observe: (target: Element) => void;
    unobserve: (target: Element) => void;
    disconnect: () => void;
    observedElements: Element[];
    setupIntersectionObserverMock: () => void;
    teardownIntersectionObserverMock: () => void;
    triggerIntersection: (element?: Element, customEntry?: Partial<IntersectionObserverEntry>) => void;
}

export interface IntersectionObserverMockOptions {
    isIntersecting?: boolean;
    intersectionRatio?: number;
    boundingClientRect?: DOMRectReadOnly;
    intersectionRect?: DOMRectReadOnly;
    rootBounds?: DOMRectReadOnly | null;
    time?: number;
}

// Mock DOMRect for Jest environment
class MockDOMRect {
    constructor(
        public x: number = 0,
        public y: number = 0,
        public width: number = 0,
        public height: number = 0
    ) { }

    get top() { return this.y; }
    get left() { return this.x; }
    get bottom() { return this.y + this.height; }
    get right() { return this.x + this.width; }
}

export function createIntersectionObserverMock(
    options: IntersectionObserverMockOptions = {}
): IntersectionObserverMock {
    const defaultOptions: Required<IntersectionObserverMockOptions> = {
        isIntersecting: false,
        intersectionRatio: 0,
        boundingClientRect: new MockDOMRect(0, 0, 100, 100) as any,
        intersectionRect: new MockDOMRect(0, 0, 0, 0) as any,
        rootBounds: new MockDOMRect(0, 0, 1000, 1000) as any,
        time: Date.now(),
    };

    const mockOptions = { ...defaultOptions, ...options };
    const observedElements: Element[] = [];
    const observers: IntersectionObserver[] = [];

    const createMockEntry = (target: Element, customEntry?: Partial<IntersectionObserverEntry>): IntersectionObserverEntry => ({
        isIntersecting: customEntry?.isIntersecting ?? mockOptions.isIntersecting,
        intersectionRatio: customEntry?.intersectionRatio ?? mockOptions.intersectionRatio,
        boundingClientRect: customEntry?.boundingClientRect ?? mockOptions.boundingClientRect,
        intersectionRect: customEntry?.intersectionRect ?? mockOptions.intersectionRect,
        rootBounds: customEntry?.rootBounds ?? mockOptions.rootBounds,
        target,
        time: customEntry?.time ?? mockOptions.time,
    });

    const mock: IntersectionObserverMock = {
        observe: (target: Element) => {
            if (!observedElements.includes(target)) {
                observedElements.push(target);
            }
            // Immediately trigger callback for all observers
            observers.forEach(observer => {
                if ((observer as any).callback) {
                    const entry = createMockEntry(target);
                    (observer as any).callback([entry], observer);
                }
            });
        },

        unobserve: (target: Element) => {
            const index = observedElements.indexOf(target);
            if (index > -1) {
                observedElements.splice(index, 1);
            }
        },

        disconnect: () => {
            observedElements.length = 0;
        },

        observedElements,

        setupIntersectionObserverMock: () => {
            const originalIntersectionObserver = global.IntersectionObserver;

            class MockIntersectionObserver implements IntersectionObserver {
                readonly root: Element | null = null;
                readonly rootMargin: string = '';
                readonly thresholds: ReadonlyArray<number> = [];
                private callback: IntersectionObserverCallback;

                constructor(
                    callback: IntersectionObserverCallback,
                    private options: IntersectionObserverInit = {}
                ) {
                    this.callback = callback;
                    observers.push(this);
                }

                observe(target: Element): void {
                    mock.observe(target);
                }

                unobserve(target: Element): void {
                    mock.unobserve(target);
                }

                disconnect(): void {
                    mock.disconnect();
                    const index = observers.indexOf(this);
                    if (index > -1) {
                        observers.splice(index, 1);
                    }
                }

                takeRecords(): IntersectionObserverEntry[] {
                    return [];
                }
            }

            global.IntersectionObserver = MockIntersectionObserver as any;
        },

        teardownIntersectionObserverMock: () => {
            if (global.IntersectionObserver) {
                delete (global as any).IntersectionObserver;
            }
        },

        triggerIntersection: (element?: Element, customEntry?: Partial<IntersectionObserverEntry>) => {
            if (element) {
                const entry = createMockEntry(element, customEntry);
                observers.forEach(observer => {
                    (observer as any).callback([entry], observer);
                });
            } else {
                // All observed elements: one callback per observer, with all entries
                const entries = observedElements.map(target => createMockEntry(target, customEntry));
                observers.forEach(observer => {
                    (observer as any).callback(entries, observer);
                });
            }
        },
    };

    return mock;
}

// Default export for convenience
export default createIntersectionObserverMock; 