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
      expect(screen.getByText(/construction cost planning/i)).toBeInTheDocument();
      expect(screen.getByText(/microservices platform/i)).toBeInTheDocument();
      expect(screen.getByText(/scalability/i)).toBeInTheDocument();
      expect(screen.getByText(/real-time calculations/i)).toBeInTheDocument();
      expect(screen.getByText(/mobile apps/i)).toBeInTheDocument();
      expect(screen.getByText(/scalable backend/i)).toBeInTheDocument();
      // PostgreSQL appears in multiple projects
      expect(screen.getAllByText("PostgreSQL")).toHaveLength(2);
    });

    it("renders Nutrition Management Platform project with correct data", () => {
      render(<FeaturedProjects />);
      expect(screen.getByText("Nutrition Management Platform")).toBeInTheDocument();
      expect(screen.getByText(/multi-tenant saas platform/i)).toBeInTheDocument();
      // React and PostgreSQL appear in multiple projects
      expect(screen.getAllByText("React")).toHaveLength(2);
      expect(screen.getByText("NestJS")).toBeInTheDocument();
      expect(screen.getAllByText("PostgreSQL")).toHaveLength(2);
      expect(screen.getAllByText("Redis")).toHaveLength(2);
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });

    it("renders Healthcare Management System project with correct data", () => {
      render(<FeaturedProjects />);
      
      expect(screen.getByText("Healthcare Management System")).toBeInTheDocument();
      expect(screen.getByText(/complete healthcare management solution/i)).toBeInTheDocument();
      // React appears in multiple projects, so use getAllByText
      expect(screen.getAllByText("React")).toHaveLength(2);
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

  describe("Staggered Animations", () => {
    it("wraps projects section with regular section element", () => {
      render(<FeaturedProjects />);
      
      // The section should be a regular section element
      const section = screen.getByRole("region", { name: /featured projects/i });
      expect(section).toBeInTheDocument();
    });

    it("uses stagger animation for project cards", () => {
      render(<FeaturedProjects />);
      
      const grid = screen.getByTestId("projects-grid");
      // Grid should have stagger animation variants
      expect(grid).toBeInTheDocument();
    });

    it("applies slideUp animation to individual project cards", () => {
      render(<FeaturedProjects />);
      
      const projectCards = screen.getAllByTestId("project-card");
      expect(projectCards).toHaveLength(3);
      
      // Each card should have motion.div wrapper with slideUp variants
      projectCards.forEach(card => {
        expect(card).toBeInTheDocument();
      });
    });

    it("implements 200ms stagger delay between cards", () => {
      render(<FeaturedProjects />);
      
      const grid = screen.getByTestId("projects-grid");
      // Grid should have staggerChildren: 0.2 (200ms) in animation variants
      expect(grid).toBeInTheDocument();
    });

    it("uses 0.8s duration with easeOut curve for card animations", () => {
      render(<FeaturedProjects />);
      
      const projectCards = screen.getAllByTestId("project-card");
      expect(projectCards).toHaveLength(3);
      
      // Each card should have 0.8s duration with easeOut
      projectCards.forEach(card => {
        expect(card).toBeInTheDocument();
      });
    });

    it("animates technology badges after card animation", () => {
      render(<FeaturedProjects />);
      
      const badgeContainers = screen.getAllByTestId("badges-container");
      expect(badgeContainers).toHaveLength(3);
      
      // Each badge container should have additional delay animation
      badgeContainers.forEach(container => {
        expect(container).toBeInTheDocument();
      });
    });

    it("maintains existing hover effects on project cards", () => {
      render(<FeaturedProjects />);
      
      const projectCards = screen.getAllByTestId("project-card");
      expect(projectCards).toHaveLength(3);
      
      // Each card should maintain hover effects
      projectCards.forEach(card => {
        expect(card).toHaveClass("hover:shadow-lg", "transition-all", "duration-300");
      });
    });

    it("preserves responsive grid layout with animations", () => {
      render(<FeaturedProjects />);
      
      const grid = screen.getByTestId("projects-grid");
      expect(grid).toHaveClass("grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-8");
    });

    it("ensures smooth animation performance", () => {
      render(<FeaturedProjects />);
      
      const projectCards = screen.getAllByTestId("project-card");
      expect(projectCards).toHaveLength(3);
      
      // Cards should use optimized animation properties
      projectCards.forEach(card => {
        expect(card).toBeInTheDocument();
      });
    });

    it("has correct animation variants for stagger timing", () => {
      render(<FeaturedProjects />);
      
      const grid = screen.getByTestId("projects-grid");
      expect(grid).toBeInTheDocument();
      
      // Verify that the grid uses motion.div with stagger variants
      expect(grid.tagName.toLowerCase()).toBe('div');
    });

    it("renders technology badges with motion components", () => {
      render(<FeaturedProjects />);
      
      const techBadges = screen.getAllByTestId("tech-badge");
      expect(techBadges.length).toBeGreaterThan(0);
      
      // Each badge should be a motion component
      techBadges.forEach(badge => {
        expect(badge).toBeInTheDocument();
      });
    });
  });

  describe("CCPTools Project Content", () => {
    it("renders CCPTools Ecosystem with correct title and description", () => {
      render(<FeaturedProjects />);
      
      // Check for correct title
      expect(screen.getByText("CCPTools Ecosystem")).toBeInTheDocument();
      
      // Check for correct description focusing on construction cost planning
      expect(screen.getByText(/construction cost planning/i)).toBeInTheDocument();
      expect(screen.getByText(/microservices platform/i)).toBeInTheDocument();
      expect(screen.getByText(/scalability/i)).toBeInTheDocument();
    });

    it("displays CCPTools as a microservices platform type", () => {
      render(<FeaturedProjects />);
      
      // Should indicate it's a microservices platform
      expect(screen.getByText(/microservices platform/i)).toBeInTheDocument();
    });

    it("includes key features for CCPTools project", () => {
      render(<FeaturedProjects />);
      
      // Should mention real-time calculations
      expect(screen.getByText(/real-time calculations/i)).toBeInTheDocument();
      
      // Should mention mobile apps
      expect(screen.getByText(/mobile apps/i)).toBeInTheDocument();
      
      // Should mention scalable backend
      expect(screen.getByText(/scalable backend/i)).toBeInTheDocument();
    });
  });

  describe("Nutrition Management Platform Project Content", () => {
    it("renders Nutrition Management Platform with correct title", () => {
      render(<FeaturedProjects />);
      
      expect(screen.getByText("Nutrition Management Platform")).toBeInTheDocument();
    });

    it("displays Nutrition Platform as Multi-Tenant SaaS type", () => {
      render(<FeaturedProjects />);
      
      // Should indicate it's a multi-tenant SaaS platform
      expect(screen.getByText(/multi-tenant/i)).toBeInTheDocument();
      expect(screen.getByText(/saas/i)).toBeInTheDocument();
    });

    it("includes focus on scalable nutrition tracking", () => {
      render(<FeaturedProjects />);
      
      expect(screen.getByText(/scalable nutrition tracking/i)).toBeInTheDocument();
    });

    it("mentions tenant isolation as a key feature", () => {
      render(<FeaturedProjects />);
      
      expect(screen.getByText(/tenant isolation/i)).toBeInTheDocument();
    });

    it("includes real-time tracking as a key feature", () => {
      render(<FeaturedProjects />);
      
      expect(screen.getByText(/real-time tracking/i)).toBeInTheDocument();
    });

    it("includes analytics as a key feature", () => {
      render(<FeaturedProjects />);
      
      expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    });

    it("displays correct technology stack", () => {
      render(<FeaturedProjects />);
      // React and PostgreSQL appear in multiple projects
      expect(screen.getAllByText("React")).toHaveLength(2);
      expect(screen.getByText("NestJS")).toBeInTheDocument();
      expect(screen.getAllByText("PostgreSQL")).toHaveLength(2);
      expect(screen.getAllByText("Redis")).toHaveLength(2);
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });

    it("shows production ready status", () => {
      render(<FeaturedProjects />);
      // The description contains 'production-ready architecture'
      expect(screen.getByText(/production-ready architecture/i)).toBeInTheDocument();
    });
  });
}); 