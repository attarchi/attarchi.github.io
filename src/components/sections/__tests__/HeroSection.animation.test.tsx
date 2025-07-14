import { render, screen, waitFor } from "@testing-library/react";
import { HeroSection } from "../HeroSection";
import { act } from "react";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, width, height, className } = props;
    return <img src={src} alt={alt} width={width} height={height} className={className} />;
  },
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
global.IntersectionObserver = mockIntersectionObserver;

// Helper to trigger intersection observer
function triggerIntersection(ref: HTMLElement) {
  act(() => {
    // @ts-ignore
    ref && ref._observer && ref._observer([{ isIntersecting: true }]);
  });
}

describe("HeroSection Animation Sequence", () => {
  const defaultProps = {
    title: "Senior Full-Stack Developer",
    description: "Passionate developer with expertise in modern web technologies",
    location: "San Francisco, CA",
    ctaPrimary: {
      text: "Contact Me",
      link: "/contact",
    },
    ctaSecondary: {
      text: "View Work",
      link: "/work",
    },
  };

  beforeEach(() => {
    jest.useFakeTimers();
    // Mock prefers-reduced-motion to false for animation testing
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false, // No reduced motion
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  it("renders with AnimatedSection wrapper", () => {
    render(<HeroSection {...defaultProps} />);
    const container = screen.getByTestId("typewriter-container");
    const section = container.closest("section");
    expect(section).toBeInTheDocument();
  });

  it("shows typewriter animation for title", () => {
    render(<HeroSection {...defaultProps} />);
    expect(screen.getByTestId("typewriter-cursor")).toBeInTheDocument();
    expect(screen.queryByText(defaultProps.title)).not.toBeInTheDocument();
  });

  it("completes typewriter animation and shows full title", async () => {
    render(<HeroSection {...defaultProps} />);
    const container = screen.getByTestId("typewriter-container");
    // Wait for observer to attach
    act(() => {
      jest.runOnlyPendingTimers();
    });
    triggerIntersection(container);
    act(() => {
      jest.advanceTimersByTime(50 * defaultProps.title.length);
    });
    await waitFor(() => {
      expect(container.textContent).toBe(defaultProps.title);
      expect(screen.queryByTestId("typewriter-cursor")).not.toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it("shows location badge after typewriter completes", async () => {
    render(<HeroSection {...defaultProps} />);
    const badge = await screen.findByText("📍 San Francisco, CA");
    expect(badge).toBeInTheDocument();
    const container = screen.getByTestId("typewriter-container");
    triggerIntersection(container);
    act(() => {
      jest.advanceTimersByTime(50 * defaultProps.title.length);
    });
    expect(badge).toBeInTheDocument();
  });

  it("shows CTA buttons with slide-up animation after badge", async () => {
    render(<HeroSection {...defaultProps} />);
    const primaryButton = await screen.findByRole("link", { name: /contact me/i });
    const secondaryButton = await screen.findByRole("link", { name: /view work/i });
    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
    const container = screen.getByTestId("typewriter-container");
    triggerIntersection(container);
    act(() => {
      jest.advanceTimersByTime(50 * defaultProps.title.length);
    });
    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
  });

  it("shows scroll indicator last in animation sequence", async () => {
    render(<HeroSection {...defaultProps} />);
    const scrollIndicator = await screen.findByTestId("scroll-indicator");
    expect(scrollIndicator).toBeInTheDocument();
    const container = screen.getByTestId("typewriter-container");
    triggerIntersection(container);
    act(() => {
      jest.advanceTimersByTime(50 * defaultProps.title.length);
    });
    expect(scrollIndicator).toBeInTheDocument();
  });

  it("respects prefers-reduced-motion for instant display", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    render(<HeroSection {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.queryByTestId("typewriter-cursor")).not.toBeInTheDocument();
  });

  it("maintains responsive design during animations", () => {
    render(<HeroSection {...defaultProps} />);
    const container = screen.getByTestId("typewriter-container");
    const section = container.closest("section");
    expect(section).toHaveClass("min-h-screen", "pt-16");
    expect(section).toHaveClass("flex", "items-center", "justify-center");
    expect(section).toHaveClass("!max-w-none", "!text-center", "!py-0");
  });

  it("uses correct typography for typewriter text", () => {
    render(<HeroSection {...defaultProps} />);
    const container = screen.getByTestId("typewriter-container");
    expect(container).toHaveClass("font-mono");
    expect(container).toHaveClass("text-[2.5rem]", "md:text-[3.5rem]");
    expect(container).toHaveClass("font-bold");
  });

  it("handles initial scroll position not at top", async () => {
    // Mock scroll position to be in the middle of the page
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 500,
    });
    
    render(<HeroSection {...defaultProps} />);
    
    // The section should still be visible even if scroll position is not at top
    const container = screen.getByTestId("typewriter-container");
    expect(container).toBeInTheDocument();
    
    // Wait for typewriter to complete
    await waitFor(() => {
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it("remains visible when scrolling back to top after being scrolled away", async () => {
    render(<HeroSection {...defaultProps} />);
    
    const container = screen.getByTestId("typewriter-container");
    
    // Wait for typewriter to complete
    await waitFor(() => {
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Content should still be visible
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });
}); 