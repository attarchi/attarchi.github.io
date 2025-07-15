import { renderHook, act } from '@testing-library/react';
import { useScrollProgress } from '../useScrollProgress';

// Mock window.scrollY and document.documentElement.scrollHeight
let mockScrollY = 0;
let mockScrollHeight = 1000;
let mockClientHeight = 800;

Object.defineProperty(window, 'scrollY', {
  get: () => mockScrollY,
});

Object.defineProperty(document.documentElement, 'scrollHeight', {
  get: () => mockScrollHeight,
});

Object.defineProperty(document.documentElement, 'clientHeight', {
  get: () => mockClientHeight,
});

// Mock requestAnimationFrame for throttling
const mockRequestAnimationFrame = jest.fn();
Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: mockRequestAnimationFrame,
});

describe('useScrollProgress', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockScrollY = 0;
    mockScrollHeight = 1000;
    mockClientHeight = 800;
    mockRequestAnimationFrame.mockImplementation((cb) => {
      setTimeout(cb, 16); // Simulate 60fps
      return 1;
    });
  });

  describe('Initial State', () => {
    it('should return correct initial state', () => {
      const { result } = renderHook(() => useScrollProgress());

      expect(result.current.progress).toBe(0);
      expect(result.current.isScrolling).toBe(false);
    });

    it('should calculate initial progress correctly', () => {
      mockScrollY = 200;
      mockScrollHeight = 1000;
      mockClientHeight = 800;

      const { result } = renderHook(() => useScrollProgress());

      // Progress should be 200 / (1000 - 800) = 200 / 200 = 1.0 (100%)
      expect(result.current.progress).toBe(1);
    });
  });

  describe('Progress Calculation', () => {
    it('should calculate progress as 0 when at top', () => {
      mockScrollY = 0;
      mockScrollHeight = 1000;
      mockClientHeight = 800;

      const { result } = renderHook(() => useScrollProgress());

      expect(result.current.progress).toBe(0);
    });

    it('should calculate progress as 1 when at bottom', () => {
      mockScrollY = 200;
      mockScrollHeight = 1000;
      mockClientHeight = 800;

      const { result } = renderHook(() => useScrollProgress());

      expect(result.current.progress).toBe(1);
    });

    it('should calculate progress correctly at 50%', () => {
      mockScrollY = 100;
      mockScrollHeight = 1000;
      mockClientHeight = 800;

      const { result } = renderHook(() => useScrollProgress());

      expect(result.current.progress).toBe(0.5);
    });

    it('should handle very short pages', () => {
      mockScrollY = 0;
      mockScrollHeight = 800;
      mockClientHeight = 800;

      const { result } = renderHook(() => useScrollProgress());

      expect(result.current.progress).toBe(0);
    });

    it('should handle very long pages', () => {
      mockScrollHeight = 10000;
      mockClientHeight = 800;
      mockScrollY = mockScrollHeight - mockClientHeight; // 9200

      const { result } = renderHook(() => useScrollProgress());

      expect(result.current.progress).toBe(1);
    });

    it('should clamp progress between 0 and 1', () => {
      mockScrollY = -100; // Negative scroll
      mockScrollHeight = 1000;
      mockClientHeight = 800;

      const { result } = renderHook(() => useScrollProgress());

      expect(result.current.progress).toBe(0);
    });
  });

  describe('Throttling Behavior', () => {
    it('should throttle scroll events to 16ms intervals', () => {
      const { result } = renderHook(() => useScrollProgress());

      // Simulate rapid scroll events
      act(() => {
        // First scroll event
        mockScrollY = 100;
        window.dispatchEvent(new Event('scroll'));
      });

      act(() => {
        // Second scroll event immediately after
        mockScrollY = 200;
        window.dispatchEvent(new Event('scroll'));
      });

      // Should only call requestAnimationFrame once for throttling
      expect(mockRequestAnimationFrame).toHaveBeenCalledTimes(1);
    });

    it('should update progress after throttled delay', async () => {
      const { result } = renderHook(() => useScrollProgress());

      act(() => {
        mockScrollY = 100;
        window.dispatchEvent(new Event('scroll'));
      });

      // Wait for the throttled update
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });

      expect(result.current.progress).toBe(0.5);
    });
  });

  describe('Scrolling State', () => {
    it('should set isScrolling to true during scroll', () => {
      const { result } = renderHook(() => useScrollProgress());

      act(() => {
        window.dispatchEvent(new Event('scroll'));
      });

      expect(result.current.isScrolling).toBe(true);
    });

    it('should set isScrolling to false after scroll ends', async () => {
      const { result } = renderHook(() => useScrollProgress());

      act(() => {
        window.dispatchEvent(new Event('scroll'));
      });

      expect(result.current.isScrolling).toBe(true);

      // Wait for scroll to end (default 150ms)
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
      });

      expect(result.current.isScrolling).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero scroll height gracefully', () => {
      mockScrollY = 0;
      mockScrollHeight = 0;
      mockClientHeight = 800;

      const { result } = renderHook(() => useScrollProgress());

      expect(result.current.progress).toBe(0);
    });

    it('should handle equal scroll and client height', () => {
      mockScrollY = 0;
      mockScrollHeight = 800;
      mockClientHeight = 800;

      const { result } = renderHook(() => useScrollProgress());

      expect(result.current.progress).toBe(0);
    });

    it('should handle undefined scroll values', () => {
      mockScrollY = 0; // undefined becomes 0 in the hook
      mockScrollHeight = 1000;
      mockClientHeight = 800;

      const { result } = renderHook(() => useScrollProgress());

      expect(result.current.progress).toBe(0);
    });
  });

  describe('Cleanup', () => {
    it('should remove event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() => useScrollProgress());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });
}); 