import { createIntersectionObserverMock } from '../intersection-observer-mock';

describe('Intersection Observer Mock', () => {
    beforeEach(() => {
        // Clear any existing mocks
        if (global.IntersectionObserver) {
            delete (global as any).IntersectionObserver;
        }
    });

    afterEach(() => {
        // Restore original if it existed
        if (global.IntersectionObserver) {
            delete (global as any).IntersectionObserver;
        }
    });

    describe('createIntersectionObserverMock', () => {
        it('should create a mock IntersectionObserver with default settings', () => {
            const mock = createIntersectionObserverMock();

            expect(mock.observe).toBeDefined();
            expect(mock.unobserve).toBeDefined();
            expect(mock.disconnect).toBeDefined();
            expect(typeof mock.observe).toBe('function');
            expect(typeof mock.unobserve).toBe('function');
            expect(typeof mock.disconnect).toBe('function');
        });

        it('should create mock with custom intersection settings', () => {
            const mock = createIntersectionObserverMock({
                isIntersecting: true,
                intersectionRatio: 0.8,
                boundingClientRect: { top: 0, left: 0, width: 100, height: 100, bottom: 100, right: 100 },
            });

            expect(mock.observe).toBeDefined();
            expect(mock.unobserve).toBeDefined();
            expect(mock.disconnect).toBeDefined();
        });

        it('should track observed elements', () => {
            const mock = createIntersectionObserverMock();
            const element = document.createElement('div');

            mock.observe(element);

            expect(mock.observedElements).toContain(element);
        });

        it('should remove elements when unobserve is called', () => {
            const mock = createIntersectionObserverMock();
            const element = document.createElement('div');

            mock.observe(element);
            expect(mock.observedElements).toContain(element);

            mock.unobserve(element);
            expect(mock.observedElements).not.toContain(element);
        });

        it('should clear all observed elements when disconnect is called', () => {
            const mock = createIntersectionObserverMock();
            const element1 = document.createElement('div');
            const element2 = document.createElement('div');

            mock.observe(element1);
            mock.observe(element2);
            expect(mock.observedElements).toHaveLength(2);

            mock.disconnect();
            expect(mock.observedElements).toHaveLength(0);
        });
    });

    describe('setupIntersectionObserverMock', () => {
        it('should set up global IntersectionObserver mock', () => {
            const { setupIntersectionObserverMock, teardownIntersectionObserverMock } = createIntersectionObserverMock();

            setupIntersectionObserverMock();

            expect(global.IntersectionObserver).toBeDefined();
            expect(typeof global.IntersectionObserver).toBe('function');

            teardownIntersectionObserverMock();
        });

        it('should create IntersectionObserver instances with callback', () => {
            const { setupIntersectionObserverMock, teardownIntersectionObserverMock } = createIntersectionObserverMock();

            setupIntersectionObserverMock();

            const callback = jest.fn();
            const observer = new IntersectionObserver(callback);

            expect(observer).toBeDefined();
            expect(observer.observe).toBeDefined();
            expect(observer.unobserve).toBeDefined();
            expect(observer.disconnect).toBeDefined();

            teardownIntersectionObserverMock();
        });

        it('should trigger intersection callback when observe is called', () => {
            const { setupIntersectionObserverMock, teardownIntersectionObserverMock } = createIntersectionObserverMock({
                isIntersecting: true,
                intersectionRatio: 1.0,
            });

            setupIntersectionObserverMock();

            const callback = jest.fn();
            const observer = new IntersectionObserver(callback);
            const element = document.createElement('div');

            observer.observe(element);

            expect(callback).toHaveBeenCalledWith([
                expect.objectContaining({
                    isIntersecting: true,
                    intersectionRatio: 1.0,
                }),
            ], observer);

            teardownIntersectionObserverMock();
        });
    });

    describe('triggerIntersection', () => {
        it('should trigger intersection for specific element', () => {
            const { setupIntersectionObserverMock, teardownIntersectionObserverMock, triggerIntersection } = createIntersectionObserverMock();

            setupIntersectionObserverMock();

            const callback = jest.fn();
            const observer = new IntersectionObserver(callback);
            const element = document.createElement('div');

            observer.observe(element);
            triggerIntersection(element, { isIntersecting: true, intersectionRatio: 0.5 });

            expect(callback).toHaveBeenCalledWith([
                expect.objectContaining({
                    isIntersecting: true,
                    intersectionRatio: 0.5,
                }),
            ], observer);

            teardownIntersectionObserverMock();
        });

        it('should trigger intersection for all observed elements', () => {
            const { setupIntersectionObserverMock, teardownIntersectionObserverMock, triggerIntersection } = createIntersectionObserverMock();

            setupIntersectionObserverMock();

            const callback = jest.fn();
            const observer = new IntersectionObserver(callback);
            const element1 = document.createElement('div');
            const element2 = document.createElement('div');

            observer.observe(element1);
            observer.observe(element2);
            // Clear previous calls from observe
            callback.mockClear();
            triggerIntersection();

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([
                expect.objectContaining({ target: element1 }),
                expect.objectContaining({ target: element2 }),
            ], observer);

            teardownIntersectionObserverMock();
        });
    });
}); 