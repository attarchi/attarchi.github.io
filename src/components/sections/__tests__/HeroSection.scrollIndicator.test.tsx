import { render, screen } from '@testing-library/react';
import { HeroSection } from '../HeroSection';
import { ThemeProvider } from '@/lib/theme';

describe('HeroSection Scroll Indicator Requirements', () => {
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

  describe('Scroll Indicator Content and Structure', () => {
    it('renders scroll indicator with "Scroll to explore" text', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      expect(screen.getByText('Scroll to explore ↓')).toBeInTheDocument();
    });

    it('renders scroll indicator with down arrow', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const scrollIndicator = screen.getByTestId('scroll-indicator');
      expect(scrollIndicator).toBeInTheDocument();
      // Should contain the down arrow character ↓
      expect(scrollIndicator).toHaveTextContent('↓');
    });

    it('renders scroll indicator at bottom of hero section', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const scrollIndicator = screen.getByTestId('scroll-indicator');
      expect(scrollIndicator).toBeInTheDocument();
    });
  });

  describe('Scroll Indicator Positioning', () => {
    it('has absolute positioning at bottom-8', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const scrollIndicator = screen.getByTestId('scroll-indicator');
      expect(scrollIndicator).toHaveClass('absolute', 'bottom-8');
    });
  });

  describe('Scroll Indicator Colors', () => {
    it('has correct muted color in light theme', () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'light');
      
      const scrollIndicator = screen.getByTestId('scroll-indicator');
      expect(scrollIndicator).toHaveClass('text-[#656d76]');
    });

    it('has correct muted color in dark theme', () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'dark');
      
      const scrollIndicator = screen.getByTestId('scroll-indicator');
      expect(scrollIndicator).toHaveClass('dark:text-[#8b949e]');
    });
  });

  describe('Scroll Indicator Animation', () => {
    it('has bounce animation applied', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const scrollIndicator = screen.getByTestId('scroll-indicator');
      expect(scrollIndicator).toHaveClass('animate-bounce');
    });
  });

  describe('Scroll Indicator Typography', () => {
    it('uses Inter font family', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const scrollIndicator = screen.getByTestId('scroll-indicator');
      expect(scrollIndicator).toHaveClass('font-sans');
    });

    it('uses text-sm font size', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const scrollIndicator = screen.getByTestId('scroll-indicator');
      expect(scrollIndicator).toHaveClass('text-sm');
    });
  });
}); 