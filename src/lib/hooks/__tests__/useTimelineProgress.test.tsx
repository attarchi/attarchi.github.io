import { renderHook, act, waitFor } from '@testing-library/react';
import { useTimelineProgress } from '@/lib/hooks/useTimelineProgress';

// Mock Intersection Observer
const mockIntersectionObserver = jest.fn();
const mockDisconnect = jest.fn();
let observerCallback: ((entries: any[]) => void) | null = null;

beforeEach(() => {
  observerCallback = null;
  mockIntersectionObserver.mockImplementation((callback) => {
    observerCallback = callback;
    return {
      observe: jest.fn(),
      disconnect: mockDisconnect,
    };
  });
  global.IntersectionObserver = mockIntersectionObserver;
});

afterEach(() => {
  jest.clearAllMocks();
  observerCallback = null;
});

describe('useTimelineProgress', () => {
  it('should initialize with 0 progress', () => {
    const { result } = renderHook(() => useTimelineProgress());
    expect(result.current.progress).toBe(0);
    expect(result.current.activeMilestones).toEqual([]);
  });

  it('should calculate progress based on scroll position', async () => {
    const { result } = renderHook(() => useTimelineProgress());
    const mockElement = {} as Element;
    // Attach ref to mock element
    act(() => {
      result.current.ref(mockElement);
    });
    // Mock scroll position at 50% of timeline
    act(() => {
      const mockEntry = {
        target: mockElement,
        isIntersecting: true,
        intersectionRatio: 0.5,
        boundingClientRect: { top: 0, bottom: 1000 },
        rootBounds: { top: 0, bottom: 1000 },
      };
      if (observerCallback) {
        observerCallback([mockEntry]);
      }
    });
    await waitFor(() => {
      expect(result.current.progress).toBeGreaterThan(0);
      expect(result.current.progress).toBeLessThanOrEqual(1);
    });
  });

  it('should reveal milestones progressively based on progress', async () => {
    const milestones = [
      { id: '1', progressThreshold: 0.2 },
      { id: '2', progressThreshold: 0.5 },
      { id: '3', progressThreshold: 0.8 },
    ];
    const { result } = renderHook(() => useTimelineProgress({ milestones }));
    const mockElement = {} as Element;
    // Attach ref to mock element
    act(() => {
      result.current.ref(mockElement);
    });
    // At 0% progress - no milestones active
    expect(result.current.activeMilestones).toEqual([]);
    // At 30% progress - first milestone should be active
    act(() => {
      const mockEntry = {
        target: mockElement,
        isIntersecting: true,
        intersectionRatio: 0.3,
        boundingClientRect: { top: 0, bottom: 1000 },
        rootBounds: { top: 0, bottom: 1000 },
      };
      if (observerCallback) {
        observerCallback([mockEntry]);
      }
    });
    await waitFor(() => {
      expect(result.current.activeMilestones).toContain('1');
      expect(result.current.activeMilestones).not.toContain('2');
      expect(result.current.activeMilestones).not.toContain('3');
    });
    // At 60% progress - first two milestones should be active
    act(() => {
      const mockEntry = {
        target: mockElement,
        isIntersecting: true,
        intersectionRatio: 0.6,
        boundingClientRect: { top: 0, bottom: 1000 },
        rootBounds: { top: 0, bottom: 1000 },
      };
      if (observerCallback) {
        observerCallback([mockEntry]);
      }
    });
    await waitFor(() => {
      expect(result.current.activeMilestones).toContain('1');
      expect(result.current.activeMilestones).toContain('2');
      expect(result.current.activeMilestones).not.toContain('3');
    });
  });

  it('should return ref for timeline container', () => {
    const { result } = renderHook(() => useTimelineProgress());
    expect(typeof result.current.ref).toBe('function');
  });

  it('should handle timeline not intersecting', async () => {
    const { result } = renderHook(() => useTimelineProgress());
    const mockElement = {} as Element;
    // Attach ref to mock element
    act(() => {
      result.current.ref(mockElement);
    });
    act(() => {
      const mockEntry = {
        target: mockElement,
        isIntersecting: false,
        intersectionRatio: 0,
        boundingClientRect: { top: 1000, bottom: 2000 },
        rootBounds: { top: 0, bottom: 1000 },
      };
      if (observerCallback) {
        observerCallback([mockEntry]);
      }
    });
    await waitFor(() => {
      expect(result.current.progress).toBe(0);
      expect(result.current.activeMilestones).toEqual([]);
    });
  });

  it('should respect reduced motion preference', () => {
    // Mock prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    const { result } = renderHook(() => useTimelineProgress());
    expect(result.current.progress).toBe(0);
  });
}); 