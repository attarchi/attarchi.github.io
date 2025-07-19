import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressBar } from '../ProgressBar';

jest.mock('@/lib/hooks', () => ({
  useScrollProgress: jest.fn(),
}));
const { useScrollProgress } = require('@/lib/hooks');

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

  it('renders progress bar fill element', () => {
    useScrollProgress.mockReturnValue({ progress: 0.3, isScrolling: true });
    render(<ProgressBar />);
    const fill = screen.getByTestId('progress-bar-fill');
    expect(fill).toBeInTheDocument();
  });

  it('hides on mobile devices', () => {
    setWindowWidth(500);
    useScrollProgress.mockReturnValue({ progress: 0.5, isScrolling: true });
    render(<ProgressBar />);
    const bar = screen.queryByTestId('progress-bar');
    expect(bar).not.toBeInTheDocument();
  });

  it('handles scroll progress updates correctly', () => {
    useScrollProgress.mockReturnValue({ progress: 0, isScrolling: true });
    render(<ProgressBar />);
    const fill = screen.getByTestId('progress-bar-fill');
    expect(fill).toBeInTheDocument();
  });

  it('handles full scroll progress correctly', () => {
    useScrollProgress.mockReturnValue({ progress: 1, isScrolling: true });
    render(<ProgressBar />);
    const fill = screen.getByTestId('progress-bar-fill');
    expect(fill).toBeInTheDocument();
  });
}); 