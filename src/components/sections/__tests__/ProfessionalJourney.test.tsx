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

  describe("Milestone Cards", () => {
    it("renders milestone cards with correct structure", () => {
      render(<ProfessionalJourney />);
      
      const milestoneCards = screen.getAllByTestId("milestone-card");
      expect(milestoneCards).toHaveLength(3);
    });

    it("renders milestone cards with correct background colors", () => {
      render(<ProfessionalJourney />);
      
      const milestoneCards = screen.getAllByTestId("milestone-card");
      milestoneCards.forEach(card => {
        expect(card).toHaveClass("bg-[#ffffff]", "dark:bg-[#21262d]");
      });
    });

    it("renders milestone cards with correct padding and shadow", () => {
      render(<ProfessionalJourney />);
      
      const milestoneCards = screen.getAllByTestId("milestone-card");
      milestoneCards.forEach(card => {
        expect(card).toHaveClass("p-4", "shadow-md");
      });
    });

    it("renders milestone cards with proper border styling", () => {
      render(<ProfessionalJourney />);
      
      const milestoneCards = screen.getAllByTestId("milestone-card");
      milestoneCards.forEach(card => {
        expect(card).toHaveClass("border", "border-[#d0d7de]", "dark:border-[#30363d]");
      });
    });

    it("renders milestone cards positioned relative to timeline", () => {
      render(<ProfessionalJourney />);
      
      const milestoneCards = screen.getAllByTestId("milestone-card");
      milestoneCards.forEach(card => {
        expect(card).toHaveClass("relative");
      });
    });
  });

  describe("Milestone Content", () => {
    it("renders milestone dates with correct typography", () => {
      render(<ProfessionalJourney />);
      
      const dates = screen.getAllByTestId("milestone-date");
      dates.forEach(date => {
        expect(date).toHaveClass("font-mono", "text-sm", "text-[#656d76]", "dark:text-[#8b949e]");
      });
    });

    it("renders milestone roles with correct typography", () => {
      render(<ProfessionalJourney />);
      
      const roles = screen.getAllByTestId("milestone-role");
      roles.forEach(role => {
        expect(role).toHaveClass("font-sans", "text-lg", "font-semibold", "text-[#24292f]", "dark:text-[#f0f6fc]");
      });
    });

    it("renders milestone companies with correct typography and accent color", () => {
      render(<ProfessionalJourney />);
      
      const companies = screen.getAllByTestId("milestone-company");
      companies.forEach(company => {
        expect(company).toHaveClass("font-sans", "text-base", "text-[#0969da]", "dark:text-[#58a6ff]");
      });
    });

    it("renders milestone descriptions with correct typography", () => {
      render(<ProfessionalJourney />);
      
      const descriptions = screen.getAllByTestId("milestone-description");
      descriptions.forEach(description => {
        expect(description).toHaveClass("font-sans", "text-sm", "text-[#656d76]", "dark:text-[#8b949e]");
      });
    });

    it("renders achievement badges with correct styling", () => {
      render(<ProfessionalJourney />);
      
      const badges = screen.getAllByTestId("achievement-badge");
      badges.forEach(badge => {
        expect(badge).toHaveClass("inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium");
        expect(badge).toHaveClass("bg-[#f6f8fa]", "dark:bg-[#21262d]", "text-[#24292f]", "dark:text-[#f0f6fc]");
      });
    });
  });

  describe("Milestone Data", () => {
    it("displays correct milestone dates", () => {
      render(<ProfessionalJourney />);
      
      expect(screen.getByText("2023-Present")).toBeInTheDocument();
      expect(screen.getByText("2021-2023")).toBeInTheDocument();
      expect(screen.getByText("2019-2021")).toBeInTheDocument();
    });

    it("displays correct milestone roles", () => {
      render(<ProfessionalJourney />);
      
      expect(screen.getByText("Senior Full-Stack Developer")).toBeInTheDocument();
      expect(screen.getByText("Full-Stack Developer")).toBeInTheDocument();
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    });

    it("displays correct milestone companies", () => {
      render(<ProfessionalJourney />);
      
      expect(screen.getByText("TechCorp")).toBeInTheDocument();
      expect(screen.getByText("StartupXYZ")).toBeInTheDocument();
      expect(screen.getByText("DevAgency")).toBeInTheDocument();
    });

    it("displays achievement badges with correct content", () => {
      render(<ProfessionalJourney />);
      
      expect(screen.getByText("Team Lead")).toBeInTheDocument();
      expect(screen.getByText("MVP Launch")).toBeInTheDocument();
      expect(screen.getByText("UI Redesign")).toBeInTheDocument();
    });
  });

  describe("Date Formatting", () => {
    it("formats dates consistently across all milestones", () => {
      render(<ProfessionalJourney />);
      
      const dates = screen.getAllByTestId("milestone-date");
      
      // Check that all dates follow the same format pattern
      expect(dates[0]).toHaveTextContent(/^\d{4}-Present$/);
      expect(dates[1]).toHaveTextContent(/^\d{4}-\d{4}$/);
      expect(dates[2]).toHaveTextContent(/^\d{4}-\d{4}$/);
    });
  });

  describe("Milestone Card Interactions", () => {
    it("renders milestone cards with hover effects", () => {
      render(<ProfessionalJourney />);
      
      const milestoneCards = screen.getAllByTestId("milestone-card");
      milestoneCards.forEach(card => {
        expect(card).toHaveClass("hover:shadow-lg", "transition-shadow", "duration-300");
      });
    });

    it("renders milestone cards with rounded corners", () => {
      render(<ProfessionalJourney />);
      
      const milestoneCards = screen.getAllByTestId("milestone-card");
      milestoneCards.forEach(card => {
        expect(card).toHaveClass("rounded-lg");
      });
    });
  });

  describe("Timeline Connection", () => {
    it("renders timeline dots for each milestone", () => {
      render(<ProfessionalJourney />);
      
      const timelineDots = screen.getAllByTestId("timeline-dot");
      expect(timelineDots).toHaveLength(3);
    });

    it("renders timeline dots with correct styling", () => {
      render(<ProfessionalJourney />);
      
      const timelineDots = screen.getAllByTestId("timeline-dot");
      timelineDots.forEach(dot => {
        expect(dot).toHaveClass("absolute", "w-3", "h-3", "rounded-full");
        expect(dot).toHaveClass("bg-[#0969da]", "dark:bg-[#58a6ff]");
        expect(dot).toHaveClass("border-2", "border-[#ffffff]", "dark:border-[#0d1117]");
      });
    });

    it("positions timeline dots correctly for vertical layout", () => {
      render(<ProfessionalJourney />);
      
      const timelineDots = screen.getAllByTestId("timeline-dot");
      timelineDots.forEach(dot => {
        expect(dot).toHaveClass("-left-1.5", "top-6");
      });
    });

    it("positions timeline dots correctly for horizontal layout", () => {
      render(<ProfessionalJourney />);
      
      const timelineDots = screen.getAllByTestId("timeline-dot");
      timelineDots.forEach(dot => {
        expect(dot).toHaveClass("md:-top-1.5", "md:left-1/2", "md:-ml-1.5");
      });
    });
  });
}); 