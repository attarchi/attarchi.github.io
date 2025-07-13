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
    it('has full viewport height classes for desktop', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      const section = heading.closest('section');
      expect(section).toHaveClass('md:h-screen');
    });

    it('has proper mobile height handling', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      const section = heading.closest('section');
      expect(section).toHaveClass('py-8'); // matches actual class
    });

    it('has responsive height classes for mobile and desktop', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      const section = heading.closest('section');
      expect(section).toHaveClass('h-auto', 'md:h-screen');
    });

    it('centers content horizontally and vertically', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      const section = heading.closest('section');
      expect(section).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });

  describe('Container and Content Width', () => {
    it('has correct container max width', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      const container = heading.parentElement?.parentElement;
      expect(container).toHaveClass('max-w-4xl');
    });

    it('centers the container', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      const container = heading.parentElement?.parentElement;
      expect(container).toHaveClass('mx-auto');
    });
  });

  describe('Content Spacing and Layout', () => {
    it('has centered text alignment', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      const container = heading.parentElement?.parentElement;
      expect(container).toHaveClass('text-center');
    });

    it('has proper spacing between heading and description', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      const container = heading.parentElement?.parentElement;
      const description = screen.getByText('Building scalable solutions with modern technologies');
      expect(container).toHaveClass('space-y-6');
      expect(description).toHaveClass('mb-8');
    });

    it('has space-y-6 between main content elements', async () => {
      renderWithTheme(
        <HeroSection 
          {...defaultProps} 
          location="San Francisco, CA"
          avatarSrc="/avatar.jpg"
        />
      );
      const heading = await screen.findByRole('heading', { level: 1 });
      const container = heading.parentElement?.parentElement;
      expect(container).toHaveClass('space-y-6');
    });

    it('optimizes spacing when using space-y-6 (no redundant margins)', async () => {
      renderWithTheme(
        <HeroSection 
          {...defaultProps} 
          location="San Francisco, CA"
        />
      );
      const heading = await screen.findByRole('heading', { level: 1 });
      const description = screen.getByText('Building scalable solutions with modern technologies');
      expect(heading).not.toHaveClass('mb-4');
      expect(description).toHaveClass('mb-8');
    });
  });

  describe('Responsive Container Behavior', () => {
    it('has responsive container classes', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      const container = heading.parentElement?.parentElement;
      expect(container).toHaveClass('container');
    });

    it('has proper content max width for readability', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const description = screen.getByText('Building scalable solutions with modern technologies');
      expect(description).toHaveClass('max-w-2xl');
    });
  });
}); 