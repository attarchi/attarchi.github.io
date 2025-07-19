import { render, screen, fireEvent } from "@testing-library/react";
import { TechnicalExpertise } from "../TechnicalExpertise";

jest.mock("@/lib");
jest.mock("@/components/micro");

const mockCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React", proficiency: 90, years: 5, icon: "react" },
      { name: "TypeScript", proficiency: 85, years: 4 }
    ],
    others: [
      { name: "GitHub", icon: "github-mark" },
      { name: "Prisma", icon: "prisma" }
    ]
  },
  {
    title: "Backend Development", 
    skills: [
      { name: "Node.js", proficiency: 90, years: 5, icon: "nodejs" },
      { name: "PostgreSQL", proficiency: 75, years: 3, icon: "sql" }
    ],
    others: [
      { name: "CouchDB", icon: "couchdb" }
    ]
  }
];

describe("TechnicalExpertise", () => {
  it("renders section with accessibility label", () => {
    render(<TechnicalExpertise />);
    
    const section = screen.getByRole("region", { name: /technical expertise/i });
    expect(section).toBeInTheDocument();
  });

  it("renders section heading", () => {
    render(<TechnicalExpertise />);
    
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Technical Expertise");
  });

  it("renders custom categories when provided", () => {
    render(<TechnicalExpertise categories={mockCategories} />);
    
    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(screen.getByText("Backend Development")).toBeInTheDocument();
  });

  it("renders skills within categories", () => {
    render(<TechnicalExpertise categories={mockCategories} />);
    
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it("handles categories without skills", () => {
    const categoriesWithoutSkills = [
      { title: "Empty Category" },
      { title: "Another Empty", skills: [] }
    ];
    
    render(<TechnicalExpertise categories={categoriesWithoutSkills} />);
    
    expect(screen.getByText("Empty Category")).toBeInTheDocument();
    expect(screen.getByText("Another Empty")).toBeInTheDocument();
  });

  it("handles empty categories array", () => {
    render(<TechnicalExpertise categories={[]} />);
    
    const categoryCards = screen.queryAllByTestId("category-card");
    expect(categoryCards).toHaveLength(0);
  });

  describe("More Categories Functionality", () => {
    const manyCategories = [
      {
        title: "Frontend Development",
        skills: [{ name: "React", proficiency: 90, years: 5, icon: "react" }],
        others: []
      },
      {
        title: "Backend Development",
        skills: [{ name: "Node.js", proficiency: 90, years: 5, icon: "nodejs" }],
        others: []
      },
      {
        title: "Mobile Development",
        skills: [{ name: "React Native", proficiency: 85, years: 4, icon: "react" }],
        others: []
      },
      {
        title: "DevOps",
        skills: [{ name: "Docker", proficiency: 80, years: 3, icon: "docker" }],
        others: []
      },
      {
        title: "Database",
        skills: [{ name: "PostgreSQL", proficiency: 75, years: 3, icon: "sql" }],
        others: []
      },
      {
        title: "Cloud",
        skills: [{ name: "AWS", proficiency: 70, years: 2, icon: "aws" }],
        others: []
      }
    ];

    it("shows only first 4 categories initially when more than 4 categories exist", () => {
      render(<TechnicalExpertise categories={manyCategories} />);
      
      const categoryCards = screen.getAllByTestId("category-card");
      expect(categoryCards).toHaveLength(4);
      
      expect(screen.getByText("Frontend Development")).toBeInTheDocument();
      expect(screen.getByText("Backend Development")).toBeInTheDocument();
      expect(screen.getByText("Mobile Development")).toBeInTheDocument();
      expect(screen.getByText("DevOps")).toBeInTheDocument();
      expect(screen.queryByText("Database")).not.toBeInTheDocument();
      expect(screen.queryByText("Cloud")).not.toBeInTheDocument();
    });

    it("shows 'more...' button when more than 4 categories exist", () => {
      render(<TechnicalExpertise categories={manyCategories} />);
      
      const moreButton = screen.getByRole("button", { name: /more/i });
      expect(moreButton).toBeInTheDocument();
      expect(moreButton).toHaveTextContent("more...");
    });

    it("does not show 'more...' button when 4 or fewer categories exist", () => {
      const fourCategories = manyCategories.slice(0, 4);
      render(<TechnicalExpertise categories={fourCategories} />);
      
      const moreButton = screen.queryByRole("button", { name: /more/i });
      expect(moreButton).not.toBeInTheDocument();
    });

    it("shows all categories when 'more...' button is clicked", () => {
      render(<TechnicalExpertise categories={manyCategories} />);
      
      const moreButton = screen.getByRole("button", { name: /more/i });
      fireEvent.click(moreButton);
      
      const categoryCards = screen.getAllByTestId("category-card");
      expect(categoryCards).toHaveLength(6);
      
      expect(screen.getByText("Frontend Development")).toBeInTheDocument();
      expect(screen.getByText("Backend Development")).toBeInTheDocument();
      expect(screen.getByText("Mobile Development")).toBeInTheDocument();
      expect(screen.getByText("DevOps")).toBeInTheDocument();
      expect(screen.getByText("Database")).toBeInTheDocument();
      expect(screen.getByText("Cloud")).toBeInTheDocument();
    });

    it("hides 'more...' button after it is clicked", () => {
      render(<TechnicalExpertise categories={manyCategories} />);
      
      const moreButton = screen.getByRole("button", { name: /more/i });
      fireEvent.click(moreButton);
      
      expect(screen.queryByRole("button", { name: /more/i })).not.toBeInTheDocument();
    });
  });
}); 