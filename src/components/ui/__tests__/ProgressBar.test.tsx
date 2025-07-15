import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressBar } from '../ProgressBar';

// Mock useScrollProgress
jest.mock('@/lib/hooks/useScrollProgress', () => ({
  useScrollProgress: jest.fn(),
}));
const { useScrollProgress } = require('@/lib/hooks/useScrollProgress');

// Helper to set window width
function setWindowWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
  window.dispatchEvent(new Event('resize'));
}

describe('ProgressBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setWindowWidth(1024); // Desktop by default
  });

  it('renders at the top of the viewport with correct styles', () => {
    useScrollProgress.mockReturnValue({ progress: 0.5, isScrolling: true });
    render(<ProgressBar />);
    const bar = screen.getByTestId('progress-bar');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveStyle({
      position: 'fixed',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '2px',
      'z-index': '50',
      'background': 'transparent',
    });
  });

  it('shows correct progress width', () => {
    useScrollProgress.mockReturnValue({ progress: 0.3, isScrolling: true });
    render(<ProgressBar />);
    const fill = screen.getByTestId('progress-bar-fill');
    expect(fill).toHaveStyle('width: 30%');
  });

  it('uses GitHub accent color for fill (light mode)', () => {
    useScrollProgress.mockReturnValue({ progress: 0.7, isScrolling: true });
    render(<ProgressBar />);
    const fill = screen.getByTestId('progress-bar-fill');
    expect(fill).toHaveStyle('background: #0969da');
  });

  it('uses GitHub accent color for fill (dark mode)', () => {
    // Simulate dark mode
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query.includes('dark'),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    useScrollProgress.mockReturnValue({ progress: 0.7, isScrolling: true });
    render(<ProgressBar />);
    const fill = screen.getByTestId('progress-bar-fill');
    expect(fill).toHaveStyle('background: #58a6ff');
  });

  it('has smooth width transition', () => {
    useScrollProgress.mockReturnValue({ progress: 0.4, isScrolling: true });
    render(<ProgressBar />);
    const fill = screen.getByTestId('progress-bar-fill');
    expect(fill).toHaveStyle('transition: width 0.2s cubic-bezier(0.4,0,0.2,1)');
  });

  it('hides on mobile devices (<768px)', () => {
    setWindowWidth(500);
    useScrollProgress.mockReturnValue({ progress: 0.5, isScrolling: true });
    render(<ProgressBar />);
    const bar = screen.queryByTestId('progress-bar');
    expect(bar).not.toBeInTheDocument();
  });

  it('renders 0% progress correctly', () => {
    useScrollProgress.mockReturnValue({ progress: 0, isScrolling: true });
    render(<ProgressBar />);
    const fill = screen.getByTestId('progress-bar-fill');
    expect(fill).toHaveStyle('width: 0%');
  });

  it('renders 100% progress correctly', () => {
    useScrollProgress.mockReturnValue({ progress: 1, isScrolling: true });
    render(<ProgressBar />);
    const fill = screen.getByTestId('progress-bar-fill');
    expect(fill).toHaveStyle('width: 100%');
  });
}); 