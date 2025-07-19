import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Typewriter } from '../Typewriter';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('Typewriter', () => {
  const defaultProps = {
    text: 'Hello World',
    speed: 50,
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('renders with initial empty text and cursor', () => {
    render(<Typewriter {...defaultProps} />);
    
    const container = screen.getByTestId('typewriter-container');
    const cursor = screen.getByTestId('typewriter-cursor');
    
    expect(container).toBeInTheDocument();
    expect(cursor).toBeInTheDocument();
    expect(cursor).toHaveTextContent('|');
  });

  it('starts typing immediately', async () => {
    render(<Typewriter {...defaultProps} />);
    
    // Should start typing immediately
    await act(async () => {
      jest.advanceTimersByTime(50);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('typewriter-container')).toHaveTextContent('H|');
    });
  });

  it('types out text character by character', async () => {
    render(<Typewriter {...defaultProps} />);
    
    // Wait for first character
    await act(async () => {
      jest.advanceTimersByTime(50);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('typewriter-container')).toHaveTextContent('H|');
    });
    
    // Advance timer and wait for next character
    await act(async () => {
      jest.advanceTimersByTime(50);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('typewriter-container')).toHaveTextContent('He|');
    });
    
    // Advance timer and wait for more characters
    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('typewriter-container')).toHaveTextContent('Hell|');
    });
  });

  it('completes typing and removes cursor', async () => {
    render(<Typewriter {...defaultProps} />);
    
    // Advance timer to complete typing
    await act(async () => {
      jest.advanceTimersByTime(600); // 11 characters * 50ms + buffer
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('typewriter-container')).toHaveTextContent('Hello World');
    });
    
    // Cursor should be removed
    expect(screen.queryByTestId('typewriter-cursor')).not.toBeInTheDocument();
  });

  it('respects prefers-reduced-motion', () => {
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

    render(<Typewriter {...defaultProps} />);
    
    // Should show full text immediately
    expect(screen.getByTestId('typewriter-container')).toHaveTextContent('Hello World');
    expect(screen.queryByTestId('typewriter-cursor')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Typewriter {...defaultProps} className="custom-class" />);
    
    const container = screen.getByTestId('typewriter-container');
    expect(container).toHaveClass('custom-class');
  });

  it('uses custom speed', async () => {
    render(<Typewriter text="Hi" speed={200} />);
    
    // Wait for typing to start and show first character
    await act(async () => {
      jest.advanceTimersByTime(200);
    });
    
    await waitFor(() => {
      const text = screen.getByTestId('typewriter-container').textContent;
      expect(text).toMatch(/^H/);
    });
    
    // Advance timer to complete typing
    await act(async () => {
      jest.advanceTimersByTime(200); // Second character
    });
    
    // Wait for final result
    await waitFor(() => {
      expect(screen.getByTestId('typewriter-container').textContent).toBe('Hi');
      expect(screen.queryByTestId('typewriter-cursor')).not.toBeInTheDocument();
    });
  });
}); 