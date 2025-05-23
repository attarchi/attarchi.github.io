import { render, screen } from '@testing-library/react';
import { Section } from '../Section';

describe('Section', () => {
  it('renders with default props', () => {
    render(<Section>Section content</Section>);
    const section = screen.getByText('Section content');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('py-8');
    expect(section).toHaveClass('max-w-7xl');
    expect(section).toHaveClass('text-left');
  });

  it('renders with different spacing variants', () => {
    const { rerender } = render(<Section spacing="sm">Small spacing</Section>);
    expect(screen.getByText('Small spacing')).toHaveClass('py-4');

    rerender(<Section spacing="lg">Large spacing</Section>);
    expect(screen.getByText('Large spacing')).toHaveClass('py-12');

    rerender(<Section spacing="xl">Extra large spacing</Section>);
    expect(screen.getByText('Extra large spacing')).toHaveClass('py-16');
  });

  it('renders with different max width variants', () => {
    const { rerender } = render(<Section maxWidth="sm">Small width</Section>);
    expect(screen.getByText('Small width')).toHaveClass('max-w-sm');

    rerender(<Section maxWidth="lg">Large width</Section>);
    expect(screen.getByText('Large width')).toHaveClass('max-w-lg');

    rerender(<Section maxWidth="2xl">Extra large width</Section>);
    expect(screen.getByText('Extra large width')).toHaveClass('max-w-2xl');
  });

  it('renders with different alignment variants', () => {
    const { rerender } = render(<Section align="center">Centered</Section>);
    expect(screen.getByText('Centered')).toHaveClass('text-center');

    rerender(<Section align="right">Right aligned</Section>);
    expect(screen.getByText('Right aligned')).toHaveClass('text-right');
  });

  it('applies custom className', () => {
    render(<Section className="custom-class">Custom section</Section>);
    expect(screen.getByText('Custom section')).toHaveClass('custom-class');
  });

  it('maintains accessibility attributes', () => {
    render(
      <Section aria-label="Test section" role="region">
        Accessible section
      </Section>
    );
    const section = screen.getByRole('region', { name: 'Test section' });
    expect(section).toBeInTheDocument();
  });

  it('combines multiple variants correctly', () => {
    render(
      <Section spacing="lg" maxWidth="2xl" align="center">
        Combined variants
      </Section>
    );
    const section = screen.getByText('Combined variants');
    expect(section).toHaveClass('py-12');
    expect(section).toHaveClass('max-w-2xl');
    expect(section).toHaveClass('text-center');
  });
}); 