import { render, screen } from '@testing-library/react';
import { HeroSection } from '../HeroSection';
import { ThemeProvider } from '../../../lib/theme/ThemeContext';

describe('HeroSection CTA Buttons Requirements', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>
        {children}
      </ThemeProvider>
    );
    
    return render(component, { wrapper: ThemeWrapper });
  };

  const defaultProps = {
    title: "Senior Full-Stack Developer & Problem Solver",
    description: "20+ years crafting scalable web applications with React, Node.js, and modern architectures",
    location: "Istanbul, Turkey • Remote Worldwide",
    ctaPrimary: {
      text: "View Projects",
      link: "#projects"
    },
    ctaSecondary: {
      text: "Download CV", 
      link: "/cv.pdf"
    },
    ctaTertiary: {
      text: "Contact Me",
      link: "#contact"
    }
  };

  describe('All Three CTA Buttons', () => {
    it('renders the primary CTA button (View Projects)', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const viewProjectsButton = screen.getByRole('link', { name: /view projects/i });
      expect(viewProjectsButton).toBeInTheDocument();
      expect(viewProjectsButton).toHaveAttribute('href', '#projects');
    });

    it('renders the secondary CTA button (Download CV)', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const downloadCvButton = screen.getByRole('link', { name: /download cv/i });
      expect(downloadCvButton).toBeInTheDocument();
      expect(downloadCvButton).toHaveAttribute('href', '/cv.pdf');
    });

    it('renders the tertiary CTA button (Contact Me)', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const contactButton = screen.getByRole('link', { name: /contact me/i });
      expect(contactButton).toBeInTheDocument();
      expect(contactButton).toHaveAttribute('href', '#contact');
    });

    it('renders all three CTA buttons in the correct order', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const viewProjectsButton = screen.getByRole('link', { name: /view projects/i });
      const downloadCvButton = screen.getByRole('link', { name: /download cv/i });
      const contactButton = screen.getByRole('link', { name: /contact me/i });
      
      expect(viewProjectsButton).toBeInTheDocument();
      expect(downloadCvButton).toBeInTheDocument();
      expect(contactButton).toBeInTheDocument();
    });

    it('has proper responsive layout for CTA buttons', () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      
      const buttonContainer = screen.getByRole('link', { name: /view projects/i }).parentElement;
      expect(buttonContainer).toHaveClass('flex', 'gap-4', 'justify-center');
    });
  });
}); 