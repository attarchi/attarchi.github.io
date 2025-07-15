import { render, screen, waitFor } from "@testing-library/react";
import { HeroSection } from "../HeroSection";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, width, height, className } = props;
    return <img src={src} alt={alt} width={width} height={height} className={className} />;
  },
}));

describe("HeroSection - Professional Content", () => {
  const defaultProps = {
    title: "Senior Full-Stack Developer & Problem Solver",
    description: "Crafting scalable web applications with modern technologies. Specializing in React, Node.js, and cloud-native architectures. Passionate about solving complex problems and delivering high-quality, maintainable code.",
    location: "Istanbul, Turkey • Remote Worldwide",
    avatarSrc: "/avatar.png",
    avatarAlt: "Profile picture",
    ctaPrimary: {
      text: "Contact Me",
      link: "#contact"
    },
    ctaSecondary: {
      text: "View Projects",
      link: "#projects"
    }
  };

  describe("Headline Content and Styling", () => {
    it("renders the main headline with correct content", async () => {
      render(<HeroSection {...defaultProps} />);
      
      const heading = await screen.findByRole('heading', { level: 1 });
      // Wait for typewriter to complete
      await waitFor(() => {
        expect(heading).toHaveTextContent("Senior Full-Stack Developer & Problem Solver");
      }, { timeout: 10000 });
    });

    it("applies correct typography styling to headline", async () => {
      render(<HeroSection {...defaultProps} />);
      
      const heading = await screen.findByRole('heading', { level: 1 });
      await waitFor(() => {
        expect(heading).toHaveClass("font-mono");
        expect(heading).toHaveClass("font-bold");
        expect(heading).toHaveClass("text-text");
      });
    });

    it("applies responsive text sizing to headline", async () => {
      render(<HeroSection {...defaultProps} />);
      
      const heading = await screen.findByRole('heading', { level: 1 });
      await waitFor(() => {
        expect(heading).toHaveClass("text-[2.5rem]");
        expect(heading).toHaveClass("md:text-[3.5rem]");
      });
    });

    it("uses JetBrains Mono font for headline", async () => {
      render(<HeroSection {...defaultProps} />);
      
      const heading = await screen.findByRole('heading', { level: 1 });
      await waitFor(() => {
        expect(heading).toHaveClass("font-mono");
      });
    });
  });

  describe("Subtitle Content and Styling", () => {
    it("renders professional description with correct content", async () => {
      render(<HeroSection {...defaultProps} />);
      
      await screen.findByRole('heading', { level: 1 });
      expect(screen.getByText(/Crafting scalable web applications/)).toBeInTheDocument();
      expect(screen.getByText(/React, Node.js, and cloud-native architectures/)).toBeInTheDocument();
    });

    it("applies Inter font to subtitle text", async () => {
      render(<HeroSection {...defaultProps} />);
      
      await screen.findByRole('heading', { level: 1 });
      const descriptionElement = screen.getByText(/Crafting scalable web applications/);
      expect(descriptionElement).toHaveClass("font-sans");
    });

    it("applies correct text styling to subtitle", async () => {
      render(<HeroSection {...defaultProps} />);
      
      await screen.findByRole('heading', { level: 1 });
      const descriptionElement = screen.getByText(/Crafting scalable web applications/);
      expect(descriptionElement).toHaveClass("text-base");
      expect(descriptionElement).toHaveClass("font-normal");
      expect(descriptionElement).toHaveClass("text-text");
    });
  });

  describe("Location Badge", () => {
    it("displays location with correct format", async () => {
      render(<HeroSection {...defaultProps} />);
      
      await screen.findByRole('heading', { level: 1 });
      expect(screen.getByText("📍 Istanbul, Turkey • Remote Worldwide")).toBeInTheDocument();
    });

    it("applies correct styling to location badge", async () => {
      render(<HeroSection {...defaultProps} />);
      
      await screen.findByRole('heading', { level: 1 });
      const locationBadge = screen.getByText("📍 Istanbul, Turkey • Remote Worldwide");
      expect(locationBadge).toHaveClass("bg-[#f6f8fa]");
      expect(locationBadge).toHaveClass("dark:bg-[#21262d]");
      expect(locationBadge).toHaveClass("border");
      expect(locationBadge).toHaveClass("rounded-full");
    });
  });

  describe("CTA Buttons", () => {
    it("renders both CTA buttons with correct text", async () => {
      render(<HeroSection {...defaultProps} />);
      
      await screen.findByRole('heading', { level: 1 });
      expect(screen.getByRole("link", { name: /contact me/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /view projects/i })).toBeInTheDocument();
    });

    it("applies correct styling to primary CTA button", async () => {
      render(<HeroSection {...defaultProps} />);
      
      await screen.findByRole('heading', { level: 1 });
      const primaryButton = screen.getByRole("link", { name: /contact me/i });
      expect(primaryButton).toHaveClass("bg-[#0969da]");
      expect(primaryButton).toHaveClass("dark:bg-[#58a6ff]");
      expect(primaryButton).toHaveClass("text-white");
      expect(primaryButton).toHaveClass("hover:bg-[#0860ca]");
    });

    it("applies correct styling to secondary CTA button", async () => {
      render(<HeroSection {...defaultProps} />);
      
      await screen.findByRole('heading', { level: 1 });
      const secondaryButton = screen.getByRole("link", { name: /view projects/i });
      expect(secondaryButton).toHaveClass("bg-transparent");
      expect(secondaryButton).toHaveClass("border");
      expect(secondaryButton).toHaveClass("hover:bg-[#f6f8fa]");
      expect(secondaryButton).toHaveClass("dark:hover:bg-[#21262d]");
    });
  });
}); 