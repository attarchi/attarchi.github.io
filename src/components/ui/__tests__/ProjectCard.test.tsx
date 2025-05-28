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

  describe('Technology Badges', () => {
    const propsWithTechnologies = {
      ...defaultProps,
      technologies: ['React Native', 'Node.js', 'PostgreSQL'],
    };

    it('renders technology badges when technologies are provided', () => {
      render(<ProjectCard {...propsWithTechnologies} />);
      
      expect(screen.getByText('React Native')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    });

    it('badges container has correct flex layout', () => {
      const { container } = render(<ProjectCard {...propsWithTechnologies} />);
      const badgesContainer = container.querySelector('[data-testid="badges-container"]');
      
      expect(badgesContainer).toBeInTheDocument();
      expect(badgesContainer).toHaveClass('flex');
      expect(badgesContainer).toHaveClass('flex-wrap');
      expect(badgesContainer).toHaveClass('gap-2');
    });

    it('badges container has correct spacing from description', () => {
      const { container } = render(<ProjectCard {...propsWithTechnologies} />);
      const badgesContainer = container.querySelector('[data-testid="badges-container"]');
      
      expect(badgesContainer).toHaveClass('mt-4');
    });

    it('individual badges have correct styling', () => {
      render(<ProjectCard {...propsWithTechnologies} />);
      const badge = screen.getByText('React Native');
      
      // Background and text colors
      expect(badge).toHaveClass('bg-accent');
      expect(badge).toHaveClass('text-white');
      
      // Typography
      expect(badge).toHaveClass('font-mono');
      expect(badge).toHaveClass('text-xs');
      expect(badge).toHaveClass('font-medium');
      
      // Padding and border radius
      expect(badge).toHaveClass('px-2');
      expect(badge).toHaveClass('py-1');
      expect(badge).toHaveClass('rounded-md');
    });

    it('badges have hover effect classes', () => {
      render(<ProjectCard {...propsWithTechnologies} />);
      const badge = screen.getByText('React Native');
      
      expect(badge).toHaveClass('hover:bg-accent-dark');
      expect(badge).toHaveClass('transition-colors');
      expect(badge).toHaveClass('duration-200');
    });

    it('renders multiple badges correctly', () => {
      render(<ProjectCard {...propsWithTechnologies} />);
      
      const badges = screen.getAllByTestId('tech-badge');
      expect(badges).toHaveLength(3);
      
      expect(badges[0]).toHaveTextContent('React Native');
      expect(badges[1]).toHaveTextContent('Node.js');
      expect(badges[2]).toHaveTextContent('PostgreSQL');
    });

    it('does not render badges container when no technologies provided', () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const badgesContainer = container.querySelector('[data-testid="badges-container"]');
      
      expect(badgesContainer).not.toBeInTheDocument();
    });

    it('does not render badges container when technologies array is empty', () => {
      const { container } = render(<ProjectCard {...defaultProps} technologies={[]} />);
      const badgesContainer = container.querySelector('[data-testid="badges-container"]');
      
      expect(badgesContainer).not.toBeInTheDocument();
    });

    it('badges use JetBrains Mono font', () => {
      render(<ProjectCard {...propsWithTechnologies} />);
      const badge = screen.getByText('React Native');
      
      expect(badge).toHaveClass('font-mono');
    });

    it('badges have correct colors in both themes', () => {
      render(<ProjectCard {...propsWithTechnologies} />);
      const badge = screen.getByText('React Native');
      
      // Should use accent color which maps to #0969da (light) / #58a6ff (dark)
      expect(badge).toHaveClass('bg-accent');
      expect(badge).toHaveClass('text-white');
    });

    it('works with the specified test data', () => {
      const testProps = {
        title: 'Test Project',
        description: 'Test description',
        technologies: ['React Native', 'Node.js', 'PostgreSQL'],
      };
      
      render(<ProjectCard {...testProps} />);
      
      // Verify all specified technologies are rendered
      expect(screen.getByText('React Native')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
      
      // Verify badges have correct styling
      const badges = screen.getAllByTestId('tech-badge');
      expect(badges).toHaveLength(3);
      
      badges.forEach(badge => {
        expect(badge).toHaveClass('bg-accent');
        expect(badge).toHaveClass('text-white');
        expect(badge).toHaveClass('font-mono');
        expect(badge).toHaveClass('text-xs');
        expect(badge).toHaveClass('font-medium');
        expect(badge).toHaveClass('px-2');
        expect(badge).toHaveClass('py-1');
        expect(badge).toHaveClass('rounded-md');
        expect(badge).toHaveClass('hover:bg-accent-dark');
        expect(badge).toHaveClass('transition-colors');
        expect(badge).toHaveClass('duration-200');
      });
    });
  });
}); 