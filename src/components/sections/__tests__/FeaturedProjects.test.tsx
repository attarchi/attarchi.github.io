import { render, screen } from "@testing-library/react";
import { FeaturedProjects } from "../FeaturedProjects";

// Sample project data for testing
const mockProjects = [
  {
    title: "CCPTools Ecosystem",
    description: "Comprehensive nutrition platform with meal planning, recipe management, and nutritional analysis tools.",
    technologies: ["React Native", "Node.js", "PostgreSQL"]
  },
  {
    title: "Multi-Tenant Nutrition Platform", 
    description: "Advanced nutrition platform with multi-tenant architecture and real-time data synchronization.",
    technologies: ["Next.js", "Prisma", "tRPC"]
  },
  {
    title: "Healthcare Management System",
    description: "Complete healthcare management solution with patient records, appointment scheduling, and billing.",
    technologies: ["React", "Express", "MongoDB"]
  }
];

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

  describe("Grid Layout", () => {
    it("renders grid container with correct responsive classes", () => {
      render(<FeaturedProjects />);
      
      const grid = screen.getByTestId("projects-grid");
      expect(grid).toHaveClass("grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3");
    });

    it("renders grid with correct gap spacing", () => {
      render(<FeaturedProjects />);
      
      const grid = screen.getByTestId("projects-grid");
      expect(grid).toHaveClass("gap-8");
    });

    it("renders grid with correct margin top from heading", () => {
      render(<FeaturedProjects />);
      
      const grid = screen.getByTestId("projects-grid");
      expect(grid).toHaveClass("mt-12");
    });
  });

  describe("Project Data", () => {
    it("renders all 3 project cards", () => {
      render(<FeaturedProjects />);
      
      const projectTitles = screen.getAllByRole("heading", { level: 3 });
      expect(projectTitles).toHaveLength(3);
    });

    it("renders CCPTools Ecosystem project with correct data", () => {
      render(<FeaturedProjects />);
      
      expect(screen.getByText("CCPTools Ecosystem")).toBeInTheDocument();
      expect(screen.getByText(/comprehensive nutrition platform/i)).toBeInTheDocument();
      expect(screen.getByText("React Native")).toBeInTheDocument();
      expect(screen.getByText("Node.js")).toBeInTheDocument();
      expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    });

    it("renders Multi-Tenant Nutrition Platform project with correct data", () => {
      render(<FeaturedProjects />);
      
      expect(screen.getByText("Multi-Tenant Nutrition Platform")).toBeInTheDocument();
      expect(screen.getByText(/advanced nutrition platform/i)).toBeInTheDocument();
      expect(screen.getByText("Next.js")).toBeInTheDocument();
      expect(screen.getByText("Prisma")).toBeInTheDocument();
      expect(screen.getByText("tRPC")).toBeInTheDocument();
    });

    it("renders Healthcare Management System project with correct data", () => {
      render(<FeaturedProjects />);
      
      expect(screen.getByText("Healthcare Management System")).toBeInTheDocument();
      expect(screen.getByText(/complete healthcare management solution/i)).toBeInTheDocument();
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Express")).toBeInTheDocument();
      expect(screen.getByText("MongoDB")).toBeInTheDocument();
    });
  });

  describe("Props Support", () => {
    it("accepts projects array as prop and renders them", () => {
      render(<FeaturedProjects projects={mockProjects} />);
      
      expect(screen.getByText("CCPTools Ecosystem")).toBeInTheDocument();
      expect(screen.getByText("Multi-Tenant Nutrition Platform")).toBeInTheDocument();
      expect(screen.getByText("Healthcare Management System")).toBeInTheDocument();
    });

    it("renders each card with correct props", () => {
      render(<FeaturedProjects projects={mockProjects} />);
      
      // Check that each project card receives the correct props
      mockProjects.forEach(project => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
        expect(screen.getByText(project.description)).toBeInTheDocument();
        project.technologies.forEach(tech => {
          expect(screen.getByText(tech)).toBeInTheDocument();
        });
      });
    });
  });

  describe("Responsive Design", () => {
    it("has mobile-first responsive grid classes", () => {
      render(<FeaturedProjects />);
      
      const grid = screen.getByTestId("projects-grid");
      // Should start with 1 column on mobile
      expect(grid).toHaveClass("grid-cols-1");
      // Then 2 columns on medium screens
      expect(grid).toHaveClass("md:grid-cols-2");
      // Then 3 columns on large screens
      expect(grid).toHaveClass("lg:grid-cols-3");
    });
  });
}); 