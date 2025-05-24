import { render, screen } from '@testing-library/react';
import { HeroSection } from '../HeroSection';
import { ThemeProvider } from '../../../lib/theme/ThemeContext';

describe('Hero Typography Requirements', () => {
  const renderWithTheme = (component: React.ReactElement, theme: 'light' | 'dark' = 'light') => {
    const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
      <div className={theme}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </div>
    );
    
    return render(component, { wrapper: ThemeWrapper });
  };

  const defaultProps = {
    title: "Senior Full-Stack Developer",
    description: "Building scalable solutions with modern technologies"
  };

  describe('Main Heading Typography Requirements', () => {
    it('renders heading with JetBrains Mono font family', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('font-mono');
    });

    it('renders heading with exact font sizes (2.5rem mobile, 3.5rem desktop)', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      // Check for exact sizes instead of the current text-4xl, text-5xl, text-6xl
      expect(heading).toHaveClass('text-[2.5rem]', 'md:text-[3.5rem]');
    });

    it('renders heading with font-bold weight', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('font-bold');
    });

    it('renders heading with solid text color (not gradient)', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      // Should use text-text class, not gradient with text-transparent
      expect(heading).toHaveClass('text-text');
      expect(heading).not.toHaveClass('text-transparent');
    });

    it('renders correct heading text content', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Senior Full-Stack Developer');
    });
  });

  describe('Subtitle Typography Requirements', () => {
    it('renders subtitle with Inter font family', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const subtitle = screen.getByText('Building scalable solutions with modern technologies');
      expect(subtitle).toHaveClass('font-sans');
    });

    it('renders subtitle with 1rem font size', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const subtitle = screen.getByText('Building scalable solutions with modern technologies');
      expect(subtitle).toHaveClass('text-base'); // text-base is 1rem
    });

    it('renders subtitle with font-normal weight', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const subtitle = screen.getByText('Building scalable solutions with modern technologies');
      expect(subtitle).toHaveClass('font-normal');
    });

    it('renders subtitle with solid text color (not muted)', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const subtitle = screen.getByText('Building scalable solutions with modern technologies');
      // Should use text-text class, not text-muted
      expect(subtitle).toHaveClass('text-text');
      expect(subtitle).not.toHaveClass('text-muted');
    });
  });

  describe('Color System Requirements', () => {
    it('renders heading with correct colors in light mode', () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'light');
      
      const heading = screen.getByRole('heading', { level: 1 });
      // Using text-text class which maps to #24292f in light mode
      expect(heading).toHaveClass('text-text');
    });

    it('renders heading with correct colors in dark mode', () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'dark');
      
      const heading = screen.getByRole('heading', { level: 1 });
      // Using text-text class which maps to #f0f6fc in dark mode
      expect(heading).toHaveClass('text-text');
    });

    it('renders subtitle with correct colors in both themes', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const subtitle = screen.getByText('Building scalable solutions with modern technologies');
      expect(subtitle).toHaveClass('text-text');
    });
  });
}); 