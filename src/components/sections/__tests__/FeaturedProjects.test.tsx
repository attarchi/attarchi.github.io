import { render, screen } from "@testing-library/react";
import { FeaturedProjects } from "../FeaturedProjects";

jest.mock("@/components/micro");

const mockProjects = [
  {
    title: "Test Project 1",
    description: "Test description 1",
    technologies: ["React", "Node.js"]
  },
  {
    title: "Test Project 2", 
    description: "Test description 2",
    technologies: ["Next.js", "PostgreSQL"]
  }
];

describe("FeaturedProjects", () => {
  it("renders section with correct structure and heading", () => {
    render(<FeaturedProjects projects={mockProjects} />);
    
    const section = screen.getByRole("region", { name: /featured projects/i });
    expect(section).toBeInTheDocument();
    
    const container = screen.getByTestId("featured-projects-container");
    expect(container).toBeInTheDocument();
    
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Featured Projects");
  });

  it("renders projects grid with correct number of items", () => {
    render(<FeaturedProjects projects={mockProjects} />);
    
    const grid = screen.getByTestId("projects-grid");
    expect(grid).toBeInTheDocument();
    
    const projectCards = screen.getAllByTestId("project-card");
    expect(projectCards).toHaveLength(2);
  });

  it("renders empty grid when no projects provided", () => {
    render(<FeaturedProjects projects={[]} />);
    
    const grid = screen.getByTestId("projects-grid");
    expect(grid).toBeInTheDocument();
    
    const projectCards = screen.queryAllByTestId("project-card");
    expect(projectCards).toHaveLength(0);
  });

  it("renders empty grid when projects prop is undefined", () => {
    render(<FeaturedProjects />);
    
    const grid = screen.getByTestId("projects-grid");
    expect(grid).toBeInTheDocument();
    
    const projectCards = screen.queryAllByTestId("project-card");
    expect(projectCards).toHaveLength(0);
  });

  describe("Dynamic Grid Layout", () => {
    it("uses 2 columns layout for less than 3 projects", () => {
      const oneProject = [mockProjects[0]];
      render(<FeaturedProjects projects={oneProject} />);
      
      const grid = screen.getByTestId("projects-grid");
      expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-2");
    });

    it("uses 2 columns layout for exactly 2 projects", () => {
      render(<FeaturedProjects projects={mockProjects} />);
      
      const grid = screen.getByTestId("projects-grid");
      expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-2");
    });

    it("uses 3 columns layout for exactly 3 projects", () => {
      const threeProjects = [...mockProjects, {
        title: "Test Project 3",
        description: "Test description 3",
        technologies: ["Vue", "MongoDB"]
      }];
      render(<FeaturedProjects projects={threeProjects} />);
      
      const grid = screen.getByTestId("projects-grid");
      expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3");
    });

    it("uses 2 columns layout for exactly 4 projects", () => {
      const fourProjects = [...mockProjects, 
        {
          title: "Test Project 3",
          description: "Test description 3",
          technologies: ["Vue", "MongoDB"]
        },
        {
          title: "Test Project 4",
          description: "Test description 4",
          technologies: ["Angular", "MySQL"]
        }
      ];
      render(<FeaturedProjects projects={fourProjects} />);
      
      const grid = screen.getByTestId("projects-grid");
      expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-2");
    });

    it("uses 3 columns layout for 5 or more projects", () => {
      const fiveProjects = [...mockProjects, 
        {
          title: "Test Project 3",
          description: "Test description 3",
          technologies: ["Vue", "MongoDB"]
        },
        {
          title: "Test Project 4",
          description: "Test description 4",
          technologies: ["Angular", "MySQL"]
        },
        {
          title: "Test Project 5",
          description: "Test description 5",
          technologies: ["Svelte", "Redis"]
        }
      ];
      render(<FeaturedProjects projects={fiveProjects} />);
      
      const grid = screen.getByTestId("projects-grid");
      expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3");
    });

    it("handles empty projects array with default grid layout", () => {
      render(<FeaturedProjects projects={[]} />);
      
      const grid = screen.getByTestId("projects-grid");
      expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-2");
    });
  });
}); 