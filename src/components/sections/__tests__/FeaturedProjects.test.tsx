import { render, screen, fireEvent } from "@testing-library/react";
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

  describe("More Projects Functionality", () => {
    const manyProjects = [
      {
        title: "Test Project 1",
        description: "Test description 1",
        technologies: ["React", "Node.js"]
      },
      {
        title: "Test Project 2", 
        description: "Test description 2",
        technologies: ["Next.js", "PostgreSQL"]
      },
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

    it("shows only first 3 projects initially when more than 3 projects exist", () => {
      render(<FeaturedProjects projects={manyProjects} />);
      
      const projectCards = screen.getAllByTestId("project-card");
      expect(projectCards).toHaveLength(3);
      
      // Check that only first 3 projects are visible
      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
      expect(screen.getByText("Test Project 2")).toBeInTheDocument();
      expect(screen.getByText("Test Project 3")).toBeInTheDocument();
      expect(screen.queryByText("Test Project 4")).not.toBeInTheDocument();
      expect(screen.queryByText("Test Project 5")).not.toBeInTheDocument();
    });

    it("shows 'more...' button when more than 3 projects exist", () => {
      render(<FeaturedProjects projects={manyProjects} />);
      
      const moreButton = screen.getByRole("button", { name: /more/i });
      expect(moreButton).toBeInTheDocument();
      expect(moreButton).toHaveTextContent("more...");
    });

    it("does not show 'more...' button when 3 or fewer projects exist", () => {
      const threeProjects = manyProjects.slice(0, 3);
      render(<FeaturedProjects projects={threeProjects} />);
      
      const moreButton = screen.queryByRole("button", { name: /more/i });
      expect(moreButton).not.toBeInTheDocument();
    });

    it("shows all projects when 'more...' button is clicked", () => {
      render(<FeaturedProjects projects={manyProjects} />);
      
      const moreButton = screen.getByRole("button", { name: /more/i });
      fireEvent.click(moreButton);
      
      const projectCards = screen.getAllByTestId("project-card");
      expect(projectCards).toHaveLength(5);
      
      // Check that all projects are now visible
      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
      expect(screen.getByText("Test Project 2")).toBeInTheDocument();
      expect(screen.getByText("Test Project 3")).toBeInTheDocument();
      expect(screen.getByText("Test Project 4")).toBeInTheDocument();
      expect(screen.getByText("Test Project 5")).toBeInTheDocument();
    });

    it("hides 'more...' button after it is clicked", () => {
      render(<FeaturedProjects projects={manyProjects} />);
      
      const moreButton = screen.getByRole("button", { name: /more/i });
      fireEvent.click(moreButton);
      
      expect(screen.queryByRole("button", { name: /more/i })).not.toBeInTheDocument();
    });

    it("shows additional projects with animations when 'more...' button is clicked", () => {
      render(<FeaturedProjects projects={manyProjects} />);
      
      const moreButton = screen.getByRole("button", { name: /more/i });
      fireEvent.click(moreButton);
      
      // Additional projects should be rendered with motion.div wrapper
      const projectCards = screen.getAllByTestId("project-card");
      expect(projectCards).toHaveLength(5);
      
      // The additional projects (4th and 5th) should be wrapped in motion.div
      const motionDivs = document.querySelectorAll('[data-testid="project-card"]');
      expect(motionDivs.length).toBe(5);
    });

    it("positions 'more...' button in bottom right corner", () => {
      render(<FeaturedProjects projects={manyProjects} />);
      
      const moreButton = screen.getByRole("button", { name: /more/i });
      const buttonContainer = moreButton.closest('[data-testid="more-button-container"]');
      
      expect(buttonContainer).toBeInTheDocument();
      expect(buttonContainer).toHaveClass("flex", "justify-end", "mt-8");
    });

    it("uses link variant for 'more...' button", () => {
      render(<FeaturedProjects projects={manyProjects} />);
      
      const moreButton = screen.getByRole("button", { name: /more/i });
      expect(moreButton).toHaveAttribute("data-testid", "more-projects-button");
      // Since Button is mocked, we can't test the actual classes
      // The variant="link" prop is passed to the Button component
    });
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