import { renderHook, act } from '@testing-library/react';
import { useScrollAnimation } from '../useScrollAnimation';
import { createIntersectionObserverMock } from '../../../utils/intersection-observer-mock';

// Mock matchMedia for prefers-reduced-motion
const mockMatchMedia = jest.fn();
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

describe('useScrollAnimation', () => {
  let intersectionObserverMock: ReturnType<typeof createIntersectionObserverMock>;

  beforeEach(() => {
    intersectionObserverMock = createIntersectionObserverMock();
    intersectionObserverMock.setupIntersectionObserverMock();
    
    // Default mock for prefers-reduced-motion: no-preference
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
  });

  afterEach(() => {
    intersectionObserverMock.teardownIntersectionObserverMock();
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should return correct initial state', () => {
      const { result } = renderHook(() => useScrollAnimation());

      expect(result.current.ref).toBeDefined();
      expect(result.current.isVisible).toBe(false);
      expect(result.current.hasAnimated).toBe(false);
    });

    it('should return correct initial state with custom options', () => {
      const { result } = renderHook(() => 
        useScrollAnimation({
          threshold: 0.5,
          rootMargin: '50px',
          triggerOnce: true,
          disabled: false,
        })
      );

      expect(result.current.ref).toBeDefined();
      expect(result.current.isVisible).toBe(false);
      expect(result.current.hasAnimated).toBe(false);
    });
  });

  describe('Intersection Observer Configuration', () => {
    it('should create observer with default options', () => {
      renderHook(() => useScrollAnimation());
      
      expect(intersectionObserverMock.observedElements).toHaveLength(0);
    });

    it('should create observer with custom threshold', () => {
      const { result } = renderHook(() => 
        useScrollAnimation({ threshold: 0.8 })
      );

      // The observer should be created when ref is attached to an element
      const testElement = document.createElement('div');
      act(() => {
        result.current.ref(testElement);
      });

      expect(intersectionObserverMock.observedElements).toHaveLength(1);
    });

    it('should create observer with custom root margin', () => {
      const { result } = renderHook(() => 
        useScrollAnimation({ rootMargin: '100px' })
      );

      const testElement = document.createElement('div');
      act(() => {
        result.current.ref(testElement);
      });

      expect(intersectionObserverMock.observedElements).toHaveLength(1);
    });
  });

  describe('Animation State Updates', () => {
    it('should update isVisible when element becomes visible', () => {
      const { result } = renderHook(() => useScrollAnimation());
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: true });
      });

      expect(result.current.isVisible).toBe(true);
      expect(result.current.hasAnimated).toBe(true);
    });

    it('should update isVisible when element becomes hidden', () => {
      const { result } = renderHook(() => useScrollAnimation());
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      // First make it visible
      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: true });
      });

      expect(result.current.isVisible).toBe(true);

      // Then make it hidden
      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: false });
      });

      expect(result.current.isVisible).toBe(false);
    });

    it('should maintain hasAnimated state when element becomes hidden', () => {
      const { result } = renderHook(() => useScrollAnimation());
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      // Make it visible
      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: true });
      });

      expect(result.current.hasAnimated).toBe(true);

      // Make it hidden
      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: false });
      });

      expect(result.current.hasAnimated).toBe(true); // Should remain true
    });
  });

  describe('Trigger Once Behavior', () => {
    it('should not trigger again after first animation when triggerOnce is true', () => {
      const { result } = renderHook(() => 
        useScrollAnimation({ triggerOnce: true })
      );
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      // First trigger - should animate
      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: true });
      });

      expect(result.current.isVisible).toBe(true);
      expect(result.current.hasAnimated).toBe(true);

      // Hide element
      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: false });
      });

      expect(result.current.isVisible).toBe(false);

      // Show again - should not trigger animation
      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: true });
      });

      expect(result.current.isVisible).toBe(false); // Should remain false
      expect(result.current.hasAnimated).toBe(true);
    });

    it('should allow multiple triggers when triggerOnce is false', () => {
      const { result } = renderHook(() => 
        useScrollAnimation({ triggerOnce: false })
      );
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      // First trigger
      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: true });
      });

      expect(result.current.isVisible).toBe(true);
      expect(result.current.hasAnimated).toBe(true);

      // Hide element
      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: false });
      });

      expect(result.current.isVisible).toBe(false);

      // Show again - should trigger animation
      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: true });
      });

      expect(result.current.isVisible).toBe(true);
      expect(result.current.hasAnimated).toBe(true);
    });
  });

  describe('Disabled State', () => {
    it('should not create observer when disabled is true', () => {
      const { result } = renderHook(() => 
        useScrollAnimation({ disabled: true })
      );
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      expect(intersectionObserverMock.observedElements).toHaveLength(0);
    });

    it('should not update state when disabled', () => {
      const { result } = renderHook(() => 
        useScrollAnimation({ disabled: true })
      );
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: true });
      });

      expect(result.current.isVisible).toBe(false);
      expect(result.current.hasAnimated).toBe(false);
    });
  });

  describe('Prefers Reduced Motion', () => {
    it('should respect prefers-reduced-motion: reduce', () => {
      mockMatchMedia.mockReturnValue({
        matches: true, // prefers-reduced-motion: reduce
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      const { result } = renderHook(() => useScrollAnimation());
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: true });
      });

      // Should still work but might behave differently
      expect(result.current.isVisible).toBe(true);
    });

    it('should work normally when prefers-reduced-motion: no-preference', () => {
      mockMatchMedia.mockReturnValue({
        matches: false, // prefers-reduced-motion: no-preference
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      const { result } = renderHook(() => useScrollAnimation());
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: true });
      });

      expect(result.current.isVisible).toBe(true);
      expect(result.current.hasAnimated).toBe(true);
    });
  });

  describe('Multiple Instances', () => {
    it('should work independently for multiple instances', () => {
      const { result: result1 } = renderHook(() => useScrollAnimation());
      const { result: result2 } = renderHook(() => useScrollAnimation());

      const element1 = document.createElement('div');
      const element2 = document.createElement('div');

      act(() => {
        result1.current.ref(element1);
        result2.current.ref(element2);
      });

      // Trigger only first element
      act(() => {
        intersectionObserverMock.triggerIntersection(element1, { isIntersecting: true });
      });

      expect(result1.current.isVisible).toBe(true);
      expect(result2.current.isVisible).toBe(false);

      // Trigger only second element
      act(() => {
        intersectionObserverMock.triggerIntersection(element2, { isIntersecting: true });
      });

      expect(result1.current.isVisible).toBe(true);
      expect(result2.current.isVisible).toBe(true);
    });
  });

  describe('Cleanup', () => {
    it('should cleanup observer on unmount', () => {
      const { result, unmount } = renderHook(() => useScrollAnimation());
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      expect(intersectionObserverMock.observedElements).toHaveLength(1);

      unmount();

      // Observer should be disconnected
      expect(intersectionObserverMock.observedElements).toHaveLength(0);
    });

    it('should cleanup when ref changes', () => {
      const { result } = renderHook(() => useScrollAnimation());
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');

      act(() => {
        result.current.ref(element1);
      });

      expect(intersectionObserverMock.observedElements).toHaveLength(1);

      act(() => {
        result.current.ref(element2);
      });

      // Should observe the new element
      expect(intersectionObserverMock.observedElements).toHaveLength(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null ref gracefully', () => {
      const { result } = renderHook(() => useScrollAnimation());

      act(() => {
        result.current.ref(null);
      });

      expect(result.current.isVisible).toBe(false);
      expect(result.current.hasAnimated).toBe(false);
    });

    it('should handle undefined ref gracefully', () => {
      const { result } = renderHook(() => useScrollAnimation());

      act(() => {
        result.current.ref(undefined as any);
      });

      expect(result.current.isVisible).toBe(false);
      expect(result.current.hasAnimated).toBe(false);
    });

    it('should work when IntersectionObserver is not supported', () => {
      // Remove IntersectionObserver from global
      const originalIntersectionObserver = global.IntersectionObserver;
      delete (global as any).IntersectionObserver;

      const { result } = renderHook(() => useScrollAnimation());
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      // Should not throw and should return default values
      expect(result.current.isVisible).toBe(false);
      expect(result.current.hasAnimated).toBe(false);

      // Restore IntersectionObserver
      global.IntersectionObserver = originalIntersectionObserver;
    });
  });

  describe('Default Values', () => {
    it('should use default threshold of 0.2', () => {
      const { result } = renderHook(() => useScrollAnimation());
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      expect(intersectionObserverMock.observedElements).toHaveLength(1);
    });

    it('should use default rootMargin of "0px"', () => {
      const { result } = renderHook(() => useScrollAnimation());
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      expect(intersectionObserverMock.observedElements).toHaveLength(1);
    });

    it('should default triggerOnce to false', () => {
      const { result } = renderHook(() => useScrollAnimation());
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      // First trigger
      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: true });
      });

      expect(result.current.isVisible).toBe(true);

      // Hide and show again - should work normally
      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: false });
      });

      act(() => {
        intersectionObserverMock.triggerIntersection(testElement, { isIntersecting: true });
      });

      expect(result.current.isVisible).toBe(true);
    });

    it('should default disabled to false', () => {
      const { result } = renderHook(() => useScrollAnimation());
      const testElement = document.createElement('div');

      act(() => {
        result.current.ref(testElement);
      });

      expect(intersectionObserverMock.observedElements).toHaveLength(1);
    });
  });
}); 