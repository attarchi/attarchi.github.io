import { render, screen } from '@testing-library/react';
import { HeroSection } from '../HeroSection';
import { ThemeProvider } from '../../../lib/theme/ThemeContext';

describe('HeroSection Responsive Layout Requirements', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>
        {children}
      </ThemeProvider>
    );
    
    return render(component, { wrapper: ThemeWrapper });
  };

  const defaultProps = {
    title: "Senior Full-Stack Developer",
    description: "Building scalable solutions with modern technologies"
  };

  describe('Viewport Height and Layout', () => {
    it('has full viewport height classes for desktop', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const section = screen.getByRole('heading', { level: 1 }).closest('section');
      // Should have viewport height classes for desktop
      expect(section).toHaveClass('min-h-screen');
    });

    it('has proper mobile height handling', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const section = screen.getByRole('heading', { level: 1 }).closest('section');
      // Should allow auto height on mobile with proper padding
      expect(section).toHaveClass('py-16'); // Proper padding for mobile
    });

    it('centers content horizontally and vertically', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const section = screen.getByRole('heading', { level: 1 }).closest('section');
      // Should have flex centering classes
      expect(section).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });

  describe('Container and Content Width', () => {
    it('has correct container max width', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const container = screen.getByRole('heading', { level: 1 }).closest('div');
      // Container should have max-width-4xl
      expect(container).toHaveClass('max-w-4xl');
    });

    it('centers the container', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const container = screen.getByRole('heading', { level: 1 }).closest('div');
      // Container should be centered
      expect(container).toHaveClass('mx-auto');
    });
  });

  describe('Content Spacing and Layout', () => {
    it('has centered text alignment', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const container = screen.getByRole('heading', { level: 1 }).closest('div');
      // Content should be center-aligned
      expect(container).toHaveClass('text-center');
    });

    it('has proper spacing between heading and description', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      const description = screen.getByText('Building scalable solutions with modern technologies');
      
      // Heading should have bottom margin
      expect(heading).toHaveClass('mb-4');
      // Description should have bottom margin
      expect(description).toHaveClass('mb-8');
    });
  });

  describe('Responsive Container Behavior', () => {
    it('has responsive container classes', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const container = screen.getByRole('heading', { level: 1 }).closest('div');
      // Should have container responsive classes
      expect(container).toHaveClass('container');
    });

    it('has proper content max width for readability', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const description = screen.getByText('Building scalable solutions with modern technologies');
      // Description should have max width for better readability
      expect(description).toHaveClass('max-w-2xl');
    });
  });
}); 