import { render, screen } from '@testing-library/react';
import { Heading, Text } from '../Typography';

describe('Typography', () => {
  describe('Heading', () => {
    it('renders with default props', () => {
      render(<Heading>Default Heading</Heading>);
      const heading = screen.getByText('Default Heading');
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
      expect(heading).toHaveClass('text-4xl');
    });

    it('renders with different heading levels', () => {
      const { rerender } = render(<Heading as="h2">H2 Heading</Heading>);
      expect(screen.getByText('H2 Heading').tagName).toBe('H2');

      rerender(<Heading as="h3">H3 Heading</Heading>);
      expect(screen.getByText('H3 Heading').tagName).toBe('H3');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<Heading size="h2">H2 Size</Heading>);
      expect(screen.getByText('H2 Size')).toHaveClass('text-3xl');

      rerender(<Heading size="h3">H3 Size</Heading>);
      expect(screen.getByText('H3 Size')).toHaveClass('text-2xl');
    });

    it('applies custom className', () => {
      render(<Heading className="custom-class">Custom Heading</Heading>);
      expect(screen.getByText('Custom Heading')).toHaveClass('custom-class');
    });
  });

  describe('Text', () => {
    it('renders with default props', () => {
      render(<Text>Default text</Text>);
      const text = screen.getByText('Default text');
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass('text-base');
    });

    it('renders with different variants', () => {
      const { rerender } = render(<Text variant="muted">Muted text</Text>);
      expect(screen.getByText('Muted text')).toHaveClass('text-muted-foreground');

      rerender(<Text variant="subtle">Subtle text</Text>);
      expect(screen.getByText('Subtle text')).toHaveClass('text-muted-foreground/80');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<Text size="sm">Small text</Text>);
      expect(screen.getByText('Small text')).toHaveClass('text-sm');

      rerender(<Text size="lg">Large text</Text>);
      expect(screen.getByText('Large text')).toHaveClass('text-lg');
    });

    it('renders with different weights', () => {
      const { rerender } = render(<Text weight="medium">Medium weight</Text>);
      expect(screen.getByText('Medium weight')).toHaveClass('font-medium');

      rerender(<Text weight="bold">Bold text</Text>);
      expect(screen.getByText('Bold text')).toHaveClass('font-bold');
    });

    it('applies custom className', () => {
      render(<Text className="custom-class">Custom text</Text>);
      expect(screen.getByText('Custom text')).toHaveClass('custom-class');
    });

    it('combines multiple variants correctly', () => {
      render(
        <Text variant="muted" size="lg" weight="semibold">
          Combined variants
        </Text>
      );
      const text = screen.getByText('Combined variants');
      expect(text).toHaveClass('text-muted-foreground');
      expect(text).toHaveClass('text-lg');
      expect(text).toHaveClass('font-semibold');
    });
  });
}); 