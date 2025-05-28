import { render, screen } from "@testing-library/react";
import { FeaturedProjects } from "../FeaturedProjects";

describe("FeaturedProjects", () => {
  it("renders section with correct padding", () => {
    render(<FeaturedProjects />);
    
    const section = screen.getByRole("region", { name: /featured projects/i });
    expect(section).toHaveClass("py-20");
  });

  it("renders container with correct max-width and margins", () => {
    render(<FeaturedProjects />);
    
    const container = screen.getByTestId("featured-projects-container");
    expect(container).toHaveClass("max-w-6xl", "mx-auto", "px-4");
  });

  it("renders heading with correct text", () => {
    render(<FeaturedProjects />);
    
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Featured Projects");
  });

  it("renders heading with JetBrains Mono font family", () => {
    render(<FeaturedProjects />);
    
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveClass("font-mono");
  });

  it("renders heading with correct sizes for desktop and mobile", () => {
    render(<FeaturedProjects />);
    
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveClass("text-[2rem]", "md:text-[2.5rem]");
  });

  it("renders heading with correct font weight", () => {
    render(<FeaturedProjects />);
    
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveClass("font-semibold");
  });

  it("renders with light theme colors", () => {
    render(<FeaturedProjects />);
    
    const section = screen.getByRole("region", { name: /featured projects/i });
    const heading = screen.getByRole("heading", { level: 2 });
    
    // Section should have light background
    expect(section).toHaveClass("bg-[#ffffff]");
    
    // Heading should have light text color
    expect(heading).toHaveClass("text-[#24292f]");
  });

  it("renders with dark theme colors", () => {
    // Add dark class to document for dark theme testing
    document.documentElement.classList.add("dark");
    
    render(<FeaturedProjects />);
    
    const section = screen.getByRole("region", { name: /featured projects/i });
    const heading = screen.getByRole("heading", { level: 2 });
    
    // Section should have dark background
    expect(section).toHaveClass("dark:bg-[#0d1117]");
    
    // Heading should have dark text color
    expect(heading).toHaveClass("dark:text-[#f0f6fc]");
    
    // Clean up
    document.documentElement.classList.remove("dark");
  });

  it("renders project cards grid", () => {
    render(<FeaturedProjects />);
    
    const grid = screen.getByTestId("projects-grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-6", "mt-8");
  });

  it("renders CCPTools Ecosystem project card", () => {
    render(<FeaturedProjects />);
    
    expect(screen.getByText("CCPTools Ecosystem")).toBeInTheDocument();
    expect(screen.getByText(/comprehensive nutrition platform/i)).toBeInTheDocument();
  });

  it("renders Portfolio Website project card", () => {
    render(<FeaturedProjects />);
    
    expect(screen.getByText("Portfolio Website")).toBeInTheDocument();
    expect(screen.getByText(/modern portfolio built with next\.js/i)).toBeInTheDocument();
  });

  it("renders E-Commerce Platform project card", () => {
    render(<FeaturedProjects />);
    
    expect(screen.getByText("E-Commerce Platform")).toBeInTheDocument();
    expect(screen.getByText(/full-stack e-commerce solution/i)).toBeInTheDocument();
  });

  it("renders all project cards with correct structure", () => {
    render(<FeaturedProjects />);
    
    // Should have 3 project cards
    const projectTitles = screen.getAllByRole("heading", { level: 3 });
    expect(projectTitles).toHaveLength(3);
    
    // Each should be a project card with proper styling
    projectTitles.forEach(title => {
      // Get the parent div that contains the card styling (not the space-y-4 div)
      const card = title.closest('[class*="bg-surface"]');
      expect(card).toHaveClass('bg-surface');
      expect(card).toHaveClass('border');
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('p-6');
    });
  });
}); 