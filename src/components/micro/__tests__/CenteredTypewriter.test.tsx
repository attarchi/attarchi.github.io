import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { CenteredTypewriter } from '../CenteredTypewriter';

jest.useFakeTimers();

describe('CenteredTypewriter', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('renders with default props', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<CenteredTypewriter text="Hello World" />);
    expect(screen.getByTestId('typewriter-container')).toBeInTheDocument();
    
    window.matchMedia = originalMatchMedia;
  });

  it('types out text character by character', async () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<CenteredTypewriter text="Hi" speed={100} />);
    
    await act(async () => {
      jest.advanceTimersByTime(200);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('typewriter-cursor')).toBeInTheDocument();
    });
    
    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('typewriter-container')).toHaveTextContent('Hi');
      expect(screen.queryByTestId('typewriter-cursor')).not.toBeInTheDocument();
    });
    
    window.matchMedia = originalMatchMedia;
  });

  it('calls onComplete when finished', async () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const onComplete = jest.fn();
    render(<CenteredTypewriter text="Hi" speed={100} onComplete={onComplete} />);
    
    await act(async () => {
      jest.advanceTimersByTime(300);
    });
    
    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    });
    
    window.matchMedia = originalMatchMedia;
  });

  it('respects prefers-reduced-motion', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<CenteredTypewriter text="Hello World" />);
    
    expect(screen.getByTestId('typewriter-container')).toHaveTextContent('Hello World');
    expect(screen.queryByTestId('typewriter-cursor')).not.toBeInTheDocument();
    
    window.matchMedia = originalMatchMedia;
  });
}); 