import { render, screen } from "@testing-library/react";
import { TechnicalExpertise } from "../TechnicalExpertise";

describe("TechnicalExpertise", () => {
  describe("Section Structure", () => {
    it("renders section with correct padding", () => {
      render(<TechnicalExpertise />);
      
      const section = screen.getByRole("region", { name: /technical expertise/i });
      expect(section).toHaveClass("py-20");
    });

    it("renders container with correct max-width and margins", () => {
      render(<TechnicalExpertise />);
      
      const container = screen.getByTestId("technical-expertise-container");
      expect(container).toHaveClass("max-w-6xl", "mx-auto", "px-4");
    });

    it("renders with light theme colors", () => {
      render(<TechnicalExpertise />);
      
      const section = screen.getByRole("region", { name: /technical expertise/i });
      expect(section).toHaveClass("bg-[#ffffff]");
    });

    it("renders with dark theme colors", () => {
      document.documentElement.classList.add("dark");
      
      render(<TechnicalExpertise />);
      
      const section = screen.getByRole("region", { name: /technical expertise/i });
      expect(section).toHaveClass("dark:bg-[#0d1117]");
      
      document.documentElement.classList.remove("dark");
    });
  });

  describe("Section Heading", () => {
    it("renders heading with correct text", () => {
      render(<TechnicalExpertise />);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Technical Expertise");
    });

    it("renders heading with JetBrains Mono font family", () => {
      render(<TechnicalExpertise />);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("font-mono");
    });

    it("renders heading with correct sizes for desktop and mobile", () => {
      render(<TechnicalExpertise />);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-[2rem]", "md:text-[2.5rem]");
    });

    it("renders heading with correct font weight", () => {
      render(<TechnicalExpertise />);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("font-semibold");
    });

    it("renders heading with light theme text color", () => {
      render(<TechnicalExpertise />);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-[#24292f]");
    });

    it("renders heading with dark theme text color", () => {
      document.documentElement.classList.add("dark");
      
      render(<TechnicalExpertise />);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("dark:text-[#f0f6fc]");
      
      document.documentElement.classList.remove("dark");
    });
  });

  describe("Category Grid", () => {
    it("renders grid container with correct responsive classes", () => {
      render(<TechnicalExpertise />);
      
      const grid = screen.getByTestId("categories-grid");
      expect(grid).toHaveClass("grid", "grid-cols-1", "md:grid-cols-2");
    });

    it("renders grid with correct gap spacing", () => {
      render(<TechnicalExpertise />);
      
      const grid = screen.getByTestId("categories-grid");
      expect(grid).toHaveClass("gap-8");
    });

    it("renders grid with correct margin top from heading", () => {
      render(<TechnicalExpertise />);
      
      const grid = screen.getByTestId("categories-grid");
      expect(grid).toHaveClass("mt-12");
    });
  });

  describe("Category Cards", () => {
    it("renders all 4 category cards", () => {
      render(<TechnicalExpertise />);
      
      const categoryCards = screen.getAllByTestId("category-card");
      expect(categoryCards).toHaveLength(4);
    });

    it("renders Frontend Development category", () => {
      render(<TechnicalExpertise />);
      
      expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    });

    it("renders Backend Development category", () => {
      render(<TechnicalExpertise />);
      
      expect(screen.getByText("Backend Development")).toBeInTheDocument();
    });

    it("renders Mobile Development category", () => {
      render(<TechnicalExpertise />);
      
      expect(screen.getByText("Mobile Development")).toBeInTheDocument();
    });

    it("renders DevOps & Tools category", () => {
      render(<TechnicalExpertise />);
      
      expect(screen.getByText("DevOps & Tools")).toBeInTheDocument();
    });

    it("renders category cards with correct background colors", () => {
      render(<TechnicalExpertise />);
      
      const categoryCards = screen.getAllByTestId("category-card");
      categoryCards.forEach(card => {
        expect(card).toHaveClass("bg-[#f6f8fa]");
      });
    });

    it("renders category cards with dark theme background colors", () => {
      document.documentElement.classList.add("dark");
      
      render(<TechnicalExpertise />);
      
      const categoryCards = screen.getAllByTestId("category-card");
      categoryCards.forEach(card => {
        expect(card).toHaveClass("dark:bg-[#21262d]");
      });
      
      document.documentElement.classList.remove("dark");
    });

    it("renders category cards with correct border styling", () => {
      render(<TechnicalExpertise />);
      
      const categoryCards = screen.getAllByTestId("category-card");
      categoryCards.forEach(card => {
        expect(card).toHaveClass("border", "border-muted/20", "rounded-lg");
      });
    });

    it("renders category cards with correct padding", () => {
      render(<TechnicalExpertise />);
      
      const categoryCards = screen.getAllByTestId("category-card");
      categoryCards.forEach(card => {
        expect(card).toHaveClass("p-6");
      });
    });

    it("renders category cards with hover effects", () => {
      render(<TechnicalExpertise />);
      
      const categoryCards = screen.getAllByTestId("category-card");
      categoryCards.forEach(card => {
        expect(card).toHaveClass("hover:shadow-lg", "transition-all", "duration-300");
      });
    });
  });

  describe("Responsive Design", () => {
    it("has mobile-first responsive grid classes", () => {
      render(<TechnicalExpertise />);
      
      const grid = screen.getByTestId("categories-grid");
      // Should start with 1 column on mobile
      expect(grid).toHaveClass("grid-cols-1");
      // Then 2 columns on medium screens
      expect(grid).toHaveClass("md:grid-cols-2");
    });
  });
}); 