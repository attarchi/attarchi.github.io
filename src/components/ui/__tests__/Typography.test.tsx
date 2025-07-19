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

      rerender(<Heading as="h4">H4 Heading</Heading>);
      expect(screen.getByText('H4 Heading').tagName).toBe('H4');

      rerender(<Heading as="h5">H5 Heading</Heading>);
      expect(screen.getByText('H5 Heading').tagName).toBe('H5');

      rerender(<Heading as="h6">H6 Heading</Heading>);
      expect(screen.getByText('H6 Heading').tagName).toBe('H6');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<Heading size="h2">H2 Size</Heading>);
      expect(screen.getByText('H2 Size')).toHaveClass('text-3xl');

      rerender(<Heading size="h3">H3 Size</Heading>);
      expect(screen.getByText('H3 Size')).toHaveClass('text-2xl');

      rerender(<Heading size="h4">H4 Size</Heading>);
      expect(screen.getByText('H4 Size')).toHaveClass('text-xl');

      rerender(<Heading size="h5">H5 Size</Heading>);
      expect(screen.getByText('H5 Size')).toHaveClass('text-lg');

      rerender(<Heading size="h6">H6 Size</Heading>);
      expect(screen.getByText('H6 Size')).toHaveClass('text-base');
    });

    it('applies custom className', () => {
      render(<Heading className="custom-class">Custom Heading</Heading>);
      expect(screen.getByText('Custom Heading')).toHaveClass('custom-class');
    });

    it('includes responsive classes', () => {
      render(<Heading>Responsive Heading</Heading>);
      const heading = screen.getByText('Responsive Heading');
      expect(heading).toHaveClass('md:text-5xl');
      expect(heading).toHaveClass('lg:text-6xl');
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

      rerender(<Text variant="default">Default text</Text>);
      expect(screen.getByText('Default text')).toHaveClass('text-foreground');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<Text size="xs">Extra small text</Text>);
      expect(screen.getByText('Extra small text')).toHaveClass('text-xs');

      rerender(<Text size="sm">Small text</Text>);
      expect(screen.getByText('Small text')).toHaveClass('text-sm');

      rerender(<Text size="base">Base text</Text>);
      expect(screen.getByText('Base text')).toHaveClass('text-base');

      rerender(<Text size="lg">Large text</Text>);
      expect(screen.getByText('Large text')).toHaveClass('text-lg');

      rerender(<Text size="xl">Extra large text</Text>);
      expect(screen.getByText('Extra large text')).toHaveClass('text-xl');
    });

    it('renders with different weights', () => {
      const { rerender } = render(<Text weight="normal">Normal weight</Text>);
      expect(screen.getByText('Normal weight')).toHaveClass('font-normal');

      rerender(<Text weight="medium">Medium weight</Text>);
      expect(screen.getByText('Medium weight')).toHaveClass('font-medium');

      rerender(<Text weight="semibold">Semibold weight</Text>);
      expect(screen.getByText('Semibold weight')).toHaveClass('font-semibold');

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

    it('handles all possible combinations of variants', () => {
      const variants = ['default', 'muted', 'subtle'] as const;
      const sizes = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
      const weights = ['normal', 'medium', 'semibold', 'bold'] as const;

      variants.forEach((variant) => {
        sizes.forEach((size) => {
          weights.forEach((weight) => {
            const { unmount } = render(
              <Text variant={variant} size={size} weight={weight}>
                {`${variant}-${size}-${weight}`}
              </Text>
            );
            const text = screen.getByText(`${variant}-${size}-${weight}`);
            expect(text).toHaveClass(`text-${size}`);
            expect(text).toHaveClass(`font-${weight}`);
            if (variant === 'default') {
              expect(text).toHaveClass('text-foreground');
            } else if (variant === 'muted') {
              expect(text).toHaveClass('text-muted-foreground');
            } else {
              expect(text).toHaveClass('text-muted-foreground/80');
            }
            unmount();
          });
        });
      });
    });
  });
}); 