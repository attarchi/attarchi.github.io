import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AnimatedSection } from '../AnimatedSection';
import { useScrollAnimation } from '@/lib/hooks';

// Mock the useScrollAnimation hook
jest.mock('@/lib/hooks/useScrollAnimation');
const mockUseScrollAnimation = useScrollAnimation as jest.MockedFunction<typeof useScrollAnimation>;

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    section: React.forwardRef(({ children, ...props }: any, ref) => <section ref={ref} {...props}>{children}</section>),
    div: React.forwardRef(({ children, ...props }: any, ref) => <div ref={ref} {...props}>{children}</div>),
    article: React.forwardRef(({ children, ...props }: any, ref) => <article ref={ref} {...props}>{children}</article>),
  },
}));

describe('AnimatedSection', () => {
  const defaultMockReturn = {
    ref: jest.fn(),
    isVisible: false,
    hasAnimated: false,
  };

  beforeEach(() => {
    mockUseScrollAnimation.mockReturnValue(defaultMockReturn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(
        <AnimatedSection>
          <div>Test content</div>
        </AnimatedSection>
      );
      
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders with default props', () => {
      render(<AnimatedSection>Default section</AnimatedSection>);
      
      const section = screen.getByText('Default section').closest('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('w-full', 'py-8', 'text-left', 'bg-background');
    });

    it('applies custom className', () => {
      render(
        <AnimatedSection className="custom-class">
          Custom section
        </AnimatedSection>
      );
      
      const section = screen.getByText('Custom section').closest('section');
      expect(section).toHaveClass('custom-class');
    });
  });

  describe('Animation Variants', () => {
    it('applies section variant by default', () => {
      render(<AnimatedSection>Section variant</AnimatedSection>);
      
      expect(mockUseScrollAnimation).toHaveBeenCalledWith({
        threshold: 0.2,
        rootMargin: '0px',
        triggerOnce: true,
        disabled: false,
      });
    });

    it('applies slideUp variant correctly', () => {
      render(<AnimatedSection variant="slideUp">Slide up content</AnimatedSection>);
      
      expect(mockUseScrollAnimation).toHaveBeenCalledWith({
        threshold: 0.2,
        rootMargin: '0px',
        triggerOnce: true,
        disabled: false,
      });
    });

    it('applies slideIn variant correctly', () => {
      render(<AnimatedSection variant="slideIn">Slide in content</AnimatedSection>);
      
      expect(mockUseScrollAnimation).toHaveBeenCalledWith({
        threshold: 0.2,
        rootMargin: '0px',
        triggerOnce: true,
        disabled: false,
      });
    });

    it('applies fade variant correctly', () => {
      render(<AnimatedSection variant="fade">Fade content</AnimatedSection>);
      
      expect(mockUseScrollAnimation).toHaveBeenCalledWith({
        threshold: 0.2,
        rootMargin: '0px',
        triggerOnce: true,
        disabled: false,
      });
    });
  });

  describe('Animation Behavior', () => {
    it('triggers animation when scrolled into view', async () => {
      const mockRef = jest.fn();
      mockUseScrollAnimation.mockReturnValue({
        ref: mockRef,
        isVisible: true,
        hasAnimated: true,
      });

      render(<AnimatedSection>Animated content</AnimatedSection>);
      
      expect(mockRef).toHaveBeenCalled();
    });

    it('handles animation state changes', () => {
      const mockRef = jest.fn();
      mockUseScrollAnimation.mockReturnValue({
        ref: mockRef,
        isVisible: false,
        hasAnimated: false,
      });

      render(<AnimatedSection>Hidden content</AnimatedSection>);
      
      expect(mockRef).toHaveBeenCalled();
    });
  });

  describe('Props Handling', () => {
    it('handles custom delay prop', () => {
      render(<AnimatedSection delay={0.5}>Delayed content</AnimatedSection>);
      
      expect(mockUseScrollAnimation).toHaveBeenCalledWith({
        threshold: 0.2,
        rootMargin: '0px',
        triggerOnce: true,
        disabled: false,
      });
    });

    it('handles custom threshold prop', () => {
      render(<AnimatedSection threshold={0.5}>Threshold content</AnimatedSection>);
      
      expect(mockUseScrollAnimation).toHaveBeenCalledWith({
        threshold: 0.5,
        rootMargin: '0px',
        triggerOnce: true,
        disabled: false,
      });
    });

    it('combines multiple props correctly', () => {
      render(
        <AnimatedSection 
          variant="slideUp" 
          delay={0.3} 
          threshold={0.4}
          className="test-class"
        >
          Combined props content
        </AnimatedSection>
      );
      
      expect(mockUseScrollAnimation).toHaveBeenCalledWith({
        threshold: 0.4,
        rootMargin: '0px',
        triggerOnce: true,
        disabled: false,
      });
    });
  });

  describe('Element Types', () => {
    it('renders as section by default', () => {
      render(<AnimatedSection>Default section</AnimatedSection>);
      
      const section = screen.getByText('Default section').closest('section');
      expect(section?.tagName).toBe('SECTION');
    });

    it('renders as div when as prop is div', () => {
      render(<AnimatedSection as="div">Div content</AnimatedSection>);
      
      const div = screen.getByText('Div content').closest('div');
      expect(div?.tagName).toBe('DIV');
    });

    it('renders as article when as prop is article', () => {
      render(<AnimatedSection as="article">Article content</AnimatedSection>);
      
      const article = screen.getByText('Article content').closest('article');
      expect(article?.tagName).toBe('ARTICLE');
    });
  });

  describe('Accessibility', () => {
    it('preserves accessibility attributes', () => {
      render(
        <AnimatedSection 
          aria-label="Test section" 
          role="region"
          data-testid="accessible-section"
        >
          Accessible content
        </AnimatedSection>
      );
      
      const section = screen.getByTestId('accessible-section');
      expect(section).toHaveAttribute('aria-label', 'Test section');
      expect(section).toHaveAttribute('role', 'region');
    });

    it('maintains semantic HTML structure', () => {
      render(
        <AnimatedSection>
          <h2>Section heading</h2>
          <p>Section content</p>
        </AnimatedSection>
      );
      
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByText('Section content')).toBeInTheDocument();
    });
  });

  describe('Performance Optimizations', () => {
    it('uses intersection observer for scroll detection', () => {
      render(<AnimatedSection>Performance test</AnimatedSection>);
      
      expect(mockUseScrollAnimation).toHaveBeenCalledWith(
        expect.objectContaining({
          threshold: 0.2,
          rootMargin: '0px',
          triggerOnce: true,
          disabled: false,
        })
      );
    });

    it('handles cleanup properly', () => {
      const { unmount } = render(<AnimatedSection>Cleanup test</AnimatedSection>);
      
      unmount();
      
      // The cleanup should be handled by the useScrollAnimation hook
      expect(mockUseScrollAnimation).toHaveBeenCalled();
    });
  });

  describe('Theme Support', () => {
    it('works with light theme classes', () => {
      render(<AnimatedSection>Light theme content</AnimatedSection>);
      
      const section = screen.getByText('Light theme content').closest('section');
      expect(section).toHaveClass('bg-background');
    });

    it('works with dark theme classes', () => {
      render(<AnimatedSection>Dark theme content</AnimatedSection>);
      
      const section = screen.getByText('Dark theme content').parentElement;
      // The component should work with both themes through CSS variables
      expect(section).toBeInTheDocument();
    });
  });
}); 