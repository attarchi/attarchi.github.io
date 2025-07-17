import { render, screen } from "@testing-library/react";
import { FeaturedProjects } from "../FeaturedProjects";

jest.mock("@/components/ui");

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
  it("renders section with correct structure", () => {
    render(<FeaturedProjects projects={mockProjects} />);
    
    const section = screen.getByRole("region", { name: /featured projects/i });
    expect(section).toBeInTheDocument();
  });

  it("renders container with correct attributes", () => {
    render(<FeaturedProjects projects={mockProjects} />);
    
    const container = screen.getByTestId("featured-projects-container");
    expect(container).toBeInTheDocument();
  });

  it("renders heading with correct text", () => {
    render(<FeaturedProjects projects={mockProjects} />);
    
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Featured Projects");
  });

  it("renders projects grid", () => {
    render(<FeaturedProjects projects={mockProjects} />);
    
    const grid = screen.getByTestId("projects-grid");
    expect(grid).toBeInTheDocument();
  });

  it("renders correct number of project cards when projects provided", () => {
    render(<FeaturedProjects projects={mockProjects} />);
    
    const projectCards = screen.getAllByTestId("project-card");
    expect(projectCards).toHaveLength(2);
  });

  it("accepts custom projects prop", () => {
    render(<FeaturedProjects projects={mockProjects} />);
    
    const projectCards = screen.getAllByTestId("project-card");
    expect(projectCards).toHaveLength(2);
  });

  it("passes correct props to ProjectCard components", () => {
    render(<FeaturedProjects projects={mockProjects} />);
    
    expect(screen.getByText("Test Project 1")).toBeInTheDocument();
    expect(screen.getByText("Test description 1")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    
    expect(screen.getByText("Test Project 2")).toBeInTheDocument();
    expect(screen.getByText("Test description 2")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
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
}); 