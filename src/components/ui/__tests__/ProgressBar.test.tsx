import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressBar } from '../ProgressBar';

jest.mock('@/lib/hooks/useScrollProgress', () => ({
  useScrollProgress: jest.fn(),
}));
const { useScrollProgress } = require('@/lib/hooks/useScrollProgress');

function setWindowWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
  window.dispatchEvent(new Event('resize'));
}

describe('ProgressBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setWindowWidth(1024);
  });

  it('renders progress bar when on desktop', () => {
    useScrollProgress.mockReturnValue({ progress: 0.5, isScrolling: true });
    render(<ProgressBar />);
    const bar = screen.getByTestId('progress-bar');
    expect(bar).toBeInTheDocument();
  });

  it('shows correct progress width based on scroll progress', () => {
    useScrollProgress.mockReturnValue({ progress: 0.3, isScrolling: true });
    render(<ProgressBar />);
    const fill = screen.getByTestId('progress-bar-fill');
    expect(fill).toHaveStyle('width: 30%');
  });

  it('hides on mobile devices', () => {
    setWindowWidth(500);
    useScrollProgress.mockReturnValue({ progress: 0.5, isScrolling: true });
    render(<ProgressBar />);
    const bar = screen.queryByTestId('progress-bar');
    expect(bar).not.toBeInTheDocument();
  });

  it('handles zero progress', () => {
    useScrollProgress.mockReturnValue({ progress: 0, isScrolling: true });
    render(<ProgressBar />);
    const fill = screen.getByTestId('progress-bar-fill');
    expect(fill).toHaveStyle('width: 0%');
  });

  it('handles full progress', () => {
    useScrollProgress.mockReturnValue({ progress: 1, isScrolling: true });
    render(<ProgressBar />);
    const fill = screen.getByTestId('progress-bar-fill');
    expect(fill).toHaveStyle('width: 100%');
  });
}); 