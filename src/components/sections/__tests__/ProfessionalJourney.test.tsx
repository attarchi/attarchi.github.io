import { render, screen } from "@testing-library/react";
import { ProfessionalJourney } from "../ProfessionalJourney";

describe("ProfessionalJourney", () => {
  describe("Section Structure", () => {
    it("renders section with correct padding", () => {
      render(<ProfessionalJourney />);
      
      const section = screen.getByRole("region", { name: /professional journey/i });
      expect(section).toHaveClass("py-20");
    });

    it("renders container with correct max-width and margins", () => {
      render(<ProfessionalJourney />);
      
      const container = screen.getByTestId("professional-journey-container");
      expect(container).toHaveClass("max-w-6xl", "mx-auto", "px-4");
    });

    it("renders with alternate section background color in light theme", () => {
      render(<ProfessionalJourney />);
      
      const section = screen.getByRole("region", { name: /professional journey/i });
      expect(section).toHaveClass("bg-[#fafbfc]");
    });

    it("renders with alternate section background color in dark theme", () => {
      document.documentElement.classList.add("dark");
      
      render(<ProfessionalJourney />);
      
      const section = screen.getByRole("region", { name: /professional journey/i });
      expect(section).toHaveClass("dark:bg-[#0d1117]");
      
      document.documentElement.classList.remove("dark");
    });
  });

  describe("Section Heading", () => {
    it("renders heading with correct text", () => {
      render(<ProfessionalJourney />);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Professional Journey");
    });

    it("renders heading with JetBrains Mono font family", () => {
      render(<ProfessionalJourney />);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("font-mono");
    });

    it("renders heading with correct sizes for desktop and mobile", () => {
      render(<ProfessionalJourney />);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-[2rem]", "md:text-[2.5rem]");
    });

    it("renders heading with correct font weight", () => {
      render(<ProfessionalJourney />);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("font-semibold");
    });

    it("renders heading with light theme text color", () => {
      render(<ProfessionalJourney />);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-[#24292f]");
    });

    it("renders heading with dark theme text color", () => {
      document.documentElement.classList.add("dark");
      
      render(<ProfessionalJourney />);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("dark:text-[#f0f6fc]");
      
      document.documentElement.classList.remove("dark");
    });
  });

  describe("Timeline Container", () => {
    it("renders timeline container with relative positioning", () => {
      render(<ProfessionalJourney />);
      
      const timelineContainer = screen.getByTestId("timeline-container");
      expect(timelineContainer).toHaveClass("relative");
    });

    it("renders timeline container with correct margin top from heading", () => {
      render(<ProfessionalJourney />);
      
      const timelineContainer = screen.getByTestId("timeline-container");
      expect(timelineContainer).toHaveClass("mt-12");
    });
  });

  describe("Timeline Line", () => {
    it("renders timeline line with correct styling", () => {
      render(<ProfessionalJourney />);
      
      const timelineLine = screen.getByTestId("timeline-line");
      expect(timelineLine).toHaveClass("absolute");
    });

    it("renders timeline line with correct thickness", () => {
      render(<ProfessionalJourney />);
      
      const timelineLine = screen.getByTestId("timeline-line");
      expect(timelineLine).toHaveClass("w-0.5"); // 2px equivalent
    });

    it("renders timeline line with light theme color", () => {
      render(<ProfessionalJourney />);
      
      const timelineLine = screen.getByTestId("timeline-line");
      expect(timelineLine).toHaveClass("bg-[#d0d7de]");
    });

    it("renders timeline line with dark theme color", () => {
      document.documentElement.classList.add("dark");
      
      render(<ProfessionalJourney />);
      
      const timelineLine = screen.getByTestId("timeline-line");
      expect(timelineLine).toHaveClass("dark:bg-[#30363d]");
      
      document.documentElement.classList.remove("dark");
    });
  });

  describe("Responsive Design", () => {
    it("renders with horizontal timeline class for desktop", () => {
      render(<ProfessionalJourney />);
      
      const timelineContainer = screen.getByTestId("timeline-container");
      expect(timelineContainer).toHaveClass("md:timeline-horizontal");
    });

    it("renders with vertical timeline class for mobile", () => {
      render(<ProfessionalJourney />);
      
      const timelineContainer = screen.getByTestId("timeline-container");
      expect(timelineContainer).toHaveClass("timeline-vertical");
    });

    it("applies responsive classes correctly", () => {
      render(<ProfessionalJourney />);
      
      const timelineContainer = screen.getByTestId("timeline-container");
      // Should have both classes for responsive behavior
      expect(timelineContainer).toHaveClass("timeline-vertical", "md:timeline-horizontal");
    });
  });

  describe("Timeline Line Positioning", () => {
    it("positions timeline line correctly for vertical layout", () => {
      render(<ProfessionalJourney />);
      
      const timelineLine = screen.getByTestId("timeline-line");
      // Vertical line positioning (left side, full height)
      expect(timelineLine).toHaveClass("left-4", "top-0", "h-full");
    });

    it("positions timeline line correctly for horizontal layout", () => {
      render(<ProfessionalJourney />);
      
      const timelineLine = screen.getByTestId("timeline-line");
      // Horizontal line positioning (top center, full width)
      expect(timelineLine).toHaveClass("md:left-0", "md:top-4", "md:w-full", "md:h-0.5");
    });
  });
}); 