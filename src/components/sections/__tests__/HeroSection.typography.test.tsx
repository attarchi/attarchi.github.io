import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { HeroSection } from '../HeroSection';
import { ThemeProvider } from '@/lib/theme';

jest.useFakeTimers();

async function flushTypewriterUntilText(heading: HTMLElement, expected: string) {
  for (let i = 0; i < 100; i++) {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    if (heading.textContent === expected) return;
    await Promise.resolve();
  }
}

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
    it('renders heading with JetBrains Mono font family', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      expect(heading).toHaveClass('font-mono');
    });

    it('renders heading with exact font sizes (2.5rem mobile, 3.5rem desktop)', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-[2.5rem]', 'md:text-[3.5rem]');
    });

    it('renders heading with font-bold weight', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      expect(heading).toHaveClass('font-bold');
    });

    it('renders heading with solid text color (not gradient)', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-text');
      expect(heading).not.toHaveClass('text-transparent');
    });

    it('renders correct heading text content', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      const heading = await screen.findByRole('heading', { level: 1 });
      await flushTypewriterUntilText(heading, 'Senior Full-Stack Developer');
      expect(heading).toHaveTextContent('Senior Full-Stack Developer');
    });
  });

  describe('Subtitle Typography Requirements', () => {
    it('renders subtitle with Inter font family', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      await screen.findByRole('heading', { level: 1 });
      const subtitle = screen.getByText('Building scalable solutions with modern technologies');
      expect(subtitle).toHaveClass('font-sans');
    });

    it('renders subtitle with 1rem font size', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      await screen.findByRole('heading', { level: 1 });
      const subtitle = screen.getByText('Building scalable solutions with modern technologies');
      expect(subtitle).toHaveClass('text-base');
    });

    it('renders subtitle with font-normal weight', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      await screen.findByRole('heading', { level: 1 });
      const subtitle = screen.getByText('Building scalable solutions with modern technologies');
      expect(subtitle).toHaveClass('font-normal');
    });

    it('renders subtitle with solid text color (not muted)', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      await screen.findByRole('heading', { level: 1 });
      const subtitle = screen.getByText('Building scalable solutions with modern technologies');
      expect(subtitle).toHaveClass('text-text');
      expect(subtitle).not.toHaveClass('text-muted');
    });
  });

  describe('Color System Requirements', () => {
    it('renders heading with correct colors in light mode', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'light');
      const heading = await screen.findByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-text');
    });

    it('renders heading with correct colors in dark mode', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />, 'dark');
      const heading = await screen.findByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-text');
    });

    it('renders subtitle with correct colors in both themes', async () => {
      renderWithTheme(<HeroSection {...defaultProps} />);
      await screen.findByRole('heading', { level: 1 });
      const subtitle = screen.getByText('Building scalable solutions with modern technologies');
      expect(subtitle).toHaveClass('text-text');
    });
  });
}); 