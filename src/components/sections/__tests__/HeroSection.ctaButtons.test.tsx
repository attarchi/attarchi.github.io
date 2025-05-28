import { render, screen } from '@testing-library/react';
import { HeroSection } from '../HeroSection';
import { ThemeProvider } from '../../../lib/theme/ThemeContext';

describe('HeroSection CTA Buttons - GitHub Style Design', () => {
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
    description: "Building scalable solutions with modern technologies",
    ctaPrimary: {
      text: "Contact Me",
      link: "/contact"
    },
    ctaSecondary: {
      text: "View Projects", 
      link: "/projects"
    }
  };

  describe('Primary Button Styling', () => {
    it('has correct background colors for light theme', () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'light');
      
      const primaryButton = screen.getByRole('link', { name: /contact me/i });
      expect(primaryButton).toHaveClass('bg-[#0969da]');
    });

    it('has correct background colors for dark theme', () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'dark');
      
      const primaryButton = screen.getByRole('link', { name: /contact me/i });
      expect(primaryButton).toHaveClass('dark:bg-[#58a6ff]');
    });

    it('has white text color', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const primaryButton = screen.getByRole('link', { name: /contact me/i });
      expect(primaryButton).toHaveClass('text-white');
    });

    it('has correct padding (px-4 py-2)', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const primaryButton = screen.getByRole('link', { name: /contact me/i });
      expect(primaryButton).toHaveClass('px-4', 'py-2');
    });

    it('has Inter font with medium weight', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const primaryButton = screen.getByRole('link', { name: /contact me/i });
      expect(primaryButton).toHaveClass('font-sans', 'font-medium');
    });

    it('has rounded-md border radius', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const primaryButton = screen.getByRole('link', { name: /contact me/i });
      expect(primaryButton).toHaveClass('rounded-md');
    });

    it('has hover effect with darker background', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const primaryButton = screen.getByRole('link', { name: /contact me/i });
      expect(primaryButton).toHaveClass('hover:bg-[#0860ca]');
    });
  });

  describe('Secondary Button Styling', () => {
    it('has transparent background', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const secondaryButton = screen.getByRole('link', { name: /view projects/i });
      expect(secondaryButton).toHaveClass('bg-transparent');
    });

    it('has correct border styling for light theme', () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'light');
      
      const secondaryButton = screen.getByRole('link', { name: /view projects/i });
      expect(secondaryButton).toHaveClass('border', 'border-[#d0d7de]');
    });

    it('has correct border styling for dark theme', () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'dark');
      
      const secondaryButton = screen.getByRole('link', { name: /view projects/i });
      expect(secondaryButton).toHaveClass('dark:border-[#30363d]');
    });

    it('has correct text colors for light theme', () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'light');
      
      const secondaryButton = screen.getByRole('link', { name: /view projects/i });
      expect(secondaryButton).toHaveClass('text-[#24292f]');
    });

    it('has correct text colors for dark theme', () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'dark');
      
      const secondaryButton = screen.getByRole('link', { name: /view projects/i });
      expect(secondaryButton).toHaveClass('dark:text-[#f0f6fc]');
    });

    it('has same padding as primary button (px-4 py-2)', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const secondaryButton = screen.getByRole('link', { name: /view projects/i });
      expect(secondaryButton).toHaveClass('px-4', 'py-2');
    });

    it('has Inter font with medium weight', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const secondaryButton = screen.getByRole('link', { name: /view projects/i });
      expect(secondaryButton).toHaveClass('font-sans', 'font-medium');
    });

    it('has rounded-md border radius', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const secondaryButton = screen.getByRole('link', { name: /view projects/i });
      expect(secondaryButton).toHaveClass('rounded-md');
    });

    it('has hover effect with background color for light theme', () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'light');
      
      const secondaryButton = screen.getByRole('link', { name: /view projects/i });
      expect(secondaryButton).toHaveClass('hover:bg-[#f6f8fa]');
    });

    it('has hover effect with background color for dark theme', () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'dark');
      
      const secondaryButton = screen.getByRole('link', { name: /view projects/i });
      expect(secondaryButton).toHaveClass('dark:hover:bg-[#21262d]');
    });
  });

  describe('Button Layout and Positioning', () => {
    it('buttons are positioned side by side with gap-4', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const buttonContainer = screen.getByRole('link', { name: /contact me/i }).parentElement;
      expect(buttonContainer).toHaveClass('flex', 'gap-4');
    });

    it('buttons are centered horizontally', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const buttonContainer = screen.getByRole('link', { name: /contact me/i }).parentElement;
      expect(buttonContainer).toHaveClass('justify-center');
    });

    it('buttons are aligned in a row layout', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const buttonContainer = screen.getByRole('link', { name: /contact me/i }).parentElement;
      expect(buttonContainer).toHaveClass('flex');
    });

    it('buttons have proper responsive layout (flex-col on mobile, flex-row on desktop)', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const buttonContainer = screen.getByRole('link', { name: /contact me/i }).parentElement;
      expect(buttonContainer).toHaveClass('flex-col', 'sm:flex-row');
    });
  });
}); 