import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectCard } from '../ProjectCard';

describe('ProjectCard', () => {
  const defaultProps = {
    title: 'CCPTools Ecosystem',
    description: 'Comprehensive nutrition platform...',
  };

  it('renders with correct content', () => {
    render(<ProjectCard {...defaultProps} />);
    
    expect(screen.getByText('CCPTools Ecosystem')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive nutrition platform...')).toBeInTheDocument();
  });

  it('has correct background colors for light and dark themes', () => {
    const { container } = render(<ProjectCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    
    // Should have surface background which maps to #f6f8fa (light) / #21262d (dark)
    expect(card).toHaveClass('bg-surface');
  });

  it('has correct border styling', () => {
    const { container } = render(<ProjectCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    
    // Should have 1px border with proper color
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('border-muted/20');
  });

  it('has correct padding and border radius', () => {
    const { container } = render(<ProjectCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    
    expect(card).toHaveClass('p-6');
    expect(card).toHaveClass('rounded-lg');
  });

  it('has hover effects with shadow and transition', () => {
    const { container } = render(<ProjectCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    
    expect(card).toHaveClass('hover:shadow-lg');
    expect(card).toHaveClass('transition-all');
    expect(card).toHaveClass('duration-300');
  });

  it('has hover background effect', () => {
    const { container } = render(<ProjectCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    
    expect(card).toHaveClass('hover:bg-surface-light');
    expect(card).toHaveClass('dark:hover:bg-surface-dark');
  });

  it('title has correct typography', () => {
    render(<ProjectCard {...defaultProps} />);
    const title = screen.getByText('CCPTools Ecosystem');
    
    // JetBrains Mono, text-xl, font-semibold
    expect(title).toHaveClass('font-mono');
    expect(title).toHaveClass('text-xl');
    expect(title).toHaveClass('font-semibold');
  });

  it('description has correct typography and color', () => {
    render(<ProjectCard {...defaultProps} />);
    const description = screen.getByText('Comprehensive nutrition platform...');
    
    // Inter font, text-base, muted color
    expect(description).toHaveClass('font-sans');
    expect(description).toHaveClass('text-base');
    expect(description).toHaveClass('text-muted');
  });

  it('has correct content spacing', () => {
    const { container } = render(<ProjectCard {...defaultProps} />);
    const contentWrapper = container.querySelector('[class*="space-y-4"]');
    
    expect(contentWrapper).toBeInTheDocument();
    expect(contentWrapper).toHaveClass('space-y-4');
  });

  it('handles hover interaction', async () => {
    const { container } = render(<ProjectCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    
    await userEvent.hover(card);
    
    // Verify hover classes are present (they should be applied via CSS)
    expect(card).toHaveClass('hover:shadow-lg');
    expect(card).toHaveClass('hover:bg-surface-light');
  });

  it('accepts custom className', () => {
    const { container } = render(
      <ProjectCard {...defaultProps} className="custom-class" />
    );
    const card = container.firstChild as HTMLElement;
    
    expect(card).toHaveClass('custom-class');
  });

  it('maintains semantic HTML structure', () => {
    render(<ProjectCard {...defaultProps} />);
    
    // Title should be a heading
    const title = screen.getByRole('heading', { name: 'CCPTools Ecosystem' });
    expect(title).toBeInTheDocument();
    
    // Description should be a paragraph
    const description = screen.getByText('Comprehensive nutrition platform...');
    expect(description.tagName).toBe('P');
  });
}); 