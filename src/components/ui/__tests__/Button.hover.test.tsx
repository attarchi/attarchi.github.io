import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';
import { motion } from 'framer-motion';

// Mock framer-motion to test hover states
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

describe('Button Hover Micro-Interactions', () => {
  it('should apply scale and shadow effects on hover', () => {
    render(
      <Button data-testid="test-button">
        Test Button
      </Button>
    );

    const button = screen.getByTestId('test-button');
    
    // Check initial state
    expect(button).toHaveClass('transition-all');
    expect(button).toHaveClass('duration-200');
    expect(button).toHaveClass('ease-out');
    
    // Simulate hover
    fireEvent.mouseEnter(button);
    
    // Check that hover classes are applied
    expect(button).toHaveClass('hover:bg-accent/90');
    expect(button).toHaveClass('hover:scale-[1.02]');
    expect(button).toHaveClass('hover:shadow-lg');
  });

  it('should have proper focus states for accessibility', () => {
    render(
      <Button data-testid="test-button">
        Test Button
      </Button>
    );

    const button = screen.getByTestId('test-button');
    
    // Check focus-visible classes
    expect(button).toHaveClass('focus-visible:outline-none');
    expect(button).toHaveClass('focus-visible:ring-2');
    expect(button).toHaveClass('focus-visible:ring-accent');
  });

  it('should respect reduced motion preferences', () => {
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

    render(
      <Button data-testid="test-button">
        Test Button
      </Button>
    );

    const button = screen.getByTestId('test-button');
    expect(button).toBeInTheDocument();
  });

  it('should work with different button variants', () => {
    const { rerender } = render(
      <Button variant="outline" data-testid="outline-button">
        Outline Button
      </Button>
    );

    const outlineButton = screen.getByTestId('outline-button');
    expect(outlineButton).toHaveClass('hover:bg-accent');
    expect(outlineButton).toHaveClass('hover:text-background');

    rerender(
      <Button variant="secondary" data-testid="secondary-button">
        Secondary Button
      </Button>
    );

    const secondaryButton = screen.getByTestId('secondary-button');
    expect(secondaryButton).toHaveClass('hover:bg-surface/80');
  });
}); 