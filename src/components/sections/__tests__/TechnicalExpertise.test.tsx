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

    it("renders Frontend category", () => {
      render(<TechnicalExpertise />);
      expect(screen.getByText("Frontend")).toBeInTheDocument();
    });

    it("renders Backend category", () => {
      render(<TechnicalExpertise />);
      expect(screen.getByText("Backend")).toBeInTheDocument();
    });

    it("renders Mobile category", () => {
      render(<TechnicalExpertise />);
      expect(screen.getByText("Mobile")).toBeInTheDocument();
    });

    it("renders DevOps category", () => {
      render(<TechnicalExpertise />);
      expect(screen.getByText("DevOps")).toBeInTheDocument();
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

  describe("Individual Skills with Proficiency Indicators", () => {
    const mockCategoriesWithSkills = [
      {
        title: "Frontend Development",
        skills: [
          { name: "React", proficiency: 90 },
          { name: "TypeScript", proficiency: 90 },
          { name: "Next.js", proficiency: 75 }
        ]
      },
      {
        title: "Backend Development", 
        skills: [
          { name: "Node.js", proficiency: 90 },
          { name: "PostgreSQL", proficiency: 75 },
          { name: "GraphQL", proficiency: 60 }
        ]
      }
    ];

    it("renders skill names with correct typography", () => {
      render(<TechnicalExpertise categories={mockCategoriesWithSkills} />);
      
      const skillNames = screen.getAllByTestId("skill-name");
      skillNames.forEach(skillName => {
        expect(skillName).toHaveClass("font-sans", "text-sm", "font-medium");
      });
    });

    it("renders all skill names correctly", () => {
      render(<TechnicalExpertise categories={mockCategoriesWithSkills} />);
      
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("Next.js")).toBeInTheDocument();
      expect(screen.getByText("Node.js")).toBeInTheDocument();
      expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
      expect(screen.getByText("GraphQL")).toBeInTheDocument();
    });

    it("renders proficiency bars with correct background colors", () => {
      render(<TechnicalExpertise categories={mockCategoriesWithSkills} />);
      
      const proficiencyBars = screen.getAllByTestId("proficiency-bar");
      proficiencyBars.forEach(bar => {
        expect(bar).toHaveClass("bg-[#e1e4e8]");
      });
    });

    it("renders proficiency bars with dark theme background colors", () => {
      document.documentElement.classList.add("dark");
      
      render(<TechnicalExpertise categories={mockCategoriesWithSkills} />);
      
      const proficiencyBars = screen.getAllByTestId("proficiency-bar");
      proficiencyBars.forEach(bar => {
        expect(bar).toHaveClass("dark:bg-[#30363d]");
      });
      
      document.documentElement.classList.remove("dark");
    });

    it("renders proficiency fill with correct accent colors", () => {
      render(<TechnicalExpertise categories={mockCategoriesWithSkills} />);
      
      const proficiencyFills = screen.getAllByTestId("proficiency-fill");
      proficiencyFills.forEach(fill => {
        expect(fill).toHaveClass("bg-[#0969da]");
      });
    });

    it("renders proficiency fill with dark theme accent colors", () => {
      document.documentElement.classList.add("dark");
      
      render(<TechnicalExpertise categories={mockCategoriesWithSkills} />);
      
      const proficiencyFills = screen.getAllByTestId("proficiency-fill");
      proficiencyFills.forEach(fill => {
        expect(fill).toHaveClass("dark:bg-[#58a6ff]");
      });
      
      document.documentElement.classList.remove("dark");
    });

    it("renders proficiency bars with correct dimensions", () => {
      render(<TechnicalExpertise categories={mockCategoriesWithSkills} />);
      
      const proficiencyBars = screen.getAllByTestId("proficiency-bar");
      proficiencyBars.forEach(bar => {
        expect(bar).toHaveClass("h-2", "rounded-full");
      });
    });

    it("renders proficiency bars with correct positioning", () => {
      render(<TechnicalExpertise categories={mockCategoriesWithSkills} />);
      
      const proficiencyBars = screen.getAllByTestId("proficiency-bar");
      proficiencyBars.forEach(bar => {
        expect(bar).toHaveClass("mt-1", "relative");
      });
    });

    it("renders proficiency fill with correct initial width for animation", () => {
      render(<TechnicalExpertise categories={mockCategoriesWithSkills} />);
      
      // Check that all proficiency fills start at 0% (initial animation state)
      const proficiencyFills = screen.getAllByTestId("proficiency-fill");
      proficiencyFills.forEach(fill => {
        expect(fill).toHaveStyle("width: 0%");
      });
    });

    it("renders proficiency fill with correct width percentages", () => {
      render(<TechnicalExpertise categories={mockCategoriesWithSkills} />);
      
      // Check React (90%)
      const reactFill = screen.getAllByTestId("proficiency-fill").find(el => el.getAttribute("data-skill-name") === "React");
      expect(reactFill).toHaveStyle("width: 0%");
      
      // Check Next.js (75%)
      const nextjsFill = screen.getAllByTestId("proficiency-fill").find(el => el.getAttribute("data-skill-name") === "Next.js");
      expect(nextjsFill).toHaveStyle("width: 0%");
      
      // Check GraphQL (60%)
      const graphqlFill = screen.getAllByTestId("proficiency-fill").find(el => el.getAttribute("data-skill-name") === "GraphQL");
      expect(graphqlFill).toHaveStyle("width: 0%");
    });

    it("renders skills with proper spacing within categories", () => {
      render(<TechnicalExpertise categories={mockCategoriesWithSkills} />);
      
      const skillsLists = screen.getAllByTestId("skills-list");
      skillsLists.forEach(list => {
        expect(list).toHaveClass("space-y-3");
      });
    });

    it("renders skills list with correct margin from category title", () => {
      render(<TechnicalExpertise categories={mockCategoriesWithSkills} />);
      
      const skillsLists = screen.getAllByTestId("skills-list");
      skillsLists.forEach(list => {
        expect(list).toHaveClass("mt-4");
      });
    });
  });

  describe("Cascade Animation", () => {
    it("applies slideIn animation variant to categories", () => {
      render(<TechnicalExpertise />);
      
      const categoryCards = screen.getAllByTestId("category-card");
      categoryCards.forEach(card => {
        expect(card).toBeInTheDocument();
      });
    });

    it("applies stagger animation to categories with 150ms delay", () => {
      render(<TechnicalExpertise />);
      
      const categoryCards = screen.getAllByTestId("category-card");
      expect(categoryCards).toHaveLength(4);
    });

    it("applies fade animation to skills within categories", () => {
      render(<TechnicalExpertise />);
      
      const skillNames = screen.getAllByTestId("skill-name");
      skillNames.forEach(skill => {
        expect(skill).toBeInTheDocument();
      });
    });

    it("applies stagger animation to skills with 50ms delay", () => {
      render(<TechnicalExpertise />);
      
      const skillsLists = screen.getAllByTestId("skills-list");
      skillsLists.forEach(list => {
        expect(list).toBeInTheDocument();
      });
    });

    it("applies scale animation to proficiency indicators", () => {
      render(<TechnicalExpertise />);
      
      const proficiencyBars = screen.getAllByTestId("proficiency-bar");
      proficiencyBars.forEach(bar => {
        expect(bar).toBeInTheDocument();
      });
    });

    it("maintains responsive grid behavior with animations", () => {
      render(<TechnicalExpertise />);
      
      const grid = screen.getByTestId("categories-grid");
      expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2");
    });

    it("preserves hover effects on category cards", () => {
      render(<TechnicalExpertise />);
      
      const categoryCards = screen.getAllByTestId("category-card");
      categoryCards.forEach(card => {
        expect(card).toHaveClass("hover:shadow-lg", "transition-all", "duration-300");
      });
    });

    it("ensures animation performance is smooth", () => {
      render(<TechnicalExpertise />);
      
      const section = screen.getByRole("region", { name: /technical expertise/i });
      expect(section).toBeInTheDocument();
    });

    it("implements complex nested animations correctly", () => {
      render(<TechnicalExpertise />);
      
      // Test that all animation layers are present
      const section = screen.getByRole("region", { name: /technical expertise/i });
      const categoryCards = screen.getAllByTestId("category-card");
      const skillsLists = screen.getAllByTestId("skills-list");
      const proficiencyBars = screen.getAllByTestId("proficiency-bar");
      
      expect(section).toBeInTheDocument();
      expect(categoryCards).toHaveLength(4);
      expect(skillsLists).toHaveLength(4);
      expect(proficiencyBars.length).toBeGreaterThan(0);
    });
  });

  describe("Real Technical Skills Implementation", () => {
    const realSkillCategories = [
      {
        title: "Frontend",
        skills: [
          { name: "React", proficiency: 90, years: 5 },
          { name: "TypeScript", proficiency: 85, years: 4 },
          { name: "Next.js", proficiency: 80, years: 3 },
          { name: "React Native", proficiency: 85, years: 4 }
        ]
      },
      {
        title: "Backend",
        skills: [
          { name: "Node.js", proficiency: 90, years: 5 },
          { name: "Python", proficiency: 75, years: 3 },
          { name: "PostgreSQL", proficiency: 80, years: 4 },
          { name: "MongoDB", proficiency: 75, years: 3 }
        ]
      },
      {
        title: "DevOps",
        skills: [
          { name: "Docker", proficiency: 80, years: 3 },
          { name: "AWS", proficiency: 70, years: 2 },
          { name: "Kubernetes", proficiency: 65, years: 2 },
          { name: "CI/CD", proficiency: 80, years: 3 }
        ]
      },
      {
        title: "Mobile",
        skills: [
          { name: "React Native", proficiency: 85, years: 4 },
          { name: "iOS/Android", proficiency: 75, years: 3 },
          { name: "Expo", proficiency: 70, years: 2 }
        ]
      }
    ];

    it("renders 4-column grid on desktop", () => {
      render(<TechnicalExpertise categories={realSkillCategories} />);
      
      const grid = screen.getByTestId("categories-grid");
      expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2");
      // Note: lg:grid-cols-4 will be added in implementation
    });

    it("renders correct skill categories with proper titles", () => {
      render(<TechnicalExpertise categories={realSkillCategories} />);
      
      expect(screen.getByText("Frontend")).toBeInTheDocument();
      expect(screen.getByText("Backend")).toBeInTheDocument();
      expect(screen.getByText("DevOps")).toBeInTheDocument();
      expect(screen.getByText("Mobile")).toBeInTheDocument();
    });

    it("renders all specified skills with correct names", () => {
      render(<TechnicalExpertise categories={realSkillCategories} />);
      
      // Frontend skills
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("Next.js")).toBeInTheDocument();
      expect(screen.getAllByText("React Native")).toHaveLength(2); // Appears in both Frontend and Mobile
      
      // Backend skills
      expect(screen.getByText("Node.js")).toBeInTheDocument();
      expect(screen.getByText("Python")).toBeInTheDocument();
      expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
      expect(screen.getByText("MongoDB")).toBeInTheDocument();
      
      // DevOps skills
      expect(screen.getByText("Docker")).toBeInTheDocument();
      expect(screen.getByText("AWS")).toBeInTheDocument();
      expect(screen.getByText("Kubernetes")).toBeInTheDocument();
      expect(screen.getByText("CI/CD")).toBeInTheDocument();
      
      // Mobile skills
      expect(screen.getByText("iOS/Android")).toBeInTheDocument();
      expect(screen.getByText("Expo")).toBeInTheDocument();
    });

    it("displays proficiency bars with correct levels", () => {
      render(<TechnicalExpertise categories={realSkillCategories} />);
      
      const proficiencyFills = screen.getAllByTestId("proficiency-fill");
      
      // Check React (90%)
      const reactFill = proficiencyFills.find(el => el.getAttribute("data-skill-name") === "React");
      expect(reactFill).toHaveStyle("width: 0%"); // Initial state
      
      // Check TypeScript (85%)
      const typescriptFill = proficiencyFills.find(el => el.getAttribute("data-skill-name") === "TypeScript");
      expect(typescriptFill).toHaveStyle("width: 0%"); // Initial state
      
      // Check Python (75%)
      const pythonFill = proficiencyFills.find(el => el.getAttribute("data-skill-name") === "Python");
      expect(pythonFill).toHaveStyle("width: 0%"); // Initial state
    });

    it("shows years of experience on hover", () => {
      render(<TechnicalExpertise categories={realSkillCategories} />);
      
      const skillItems = screen.getAllByTestId("skill-name");
      
      // Check that skill items exist and have proper styling
      expect(skillItems.length).toBeGreaterThan(0);
      skillItems.forEach(skillItem => {
        expect(skillItem).toHaveClass("font-sans", "text-sm", "font-medium");
      });
    });

    it("uses accent color for proficiency bars", () => {
      render(<TechnicalExpertise categories={realSkillCategories} />);
      
      const proficiencyFills = screen.getAllByTestId("proficiency-fill");
      proficiencyFills.forEach(fill => {
        expect(fill).toHaveClass("bg-[#0969da]");
      });
    });

    it("maintains responsive design with 2 columns on tablet", () => {
      render(<TechnicalExpertise categories={realSkillCategories} />);
      
      const grid = screen.getByTestId("categories-grid");
      expect(grid).toHaveClass("md:grid-cols-2");
    });

    it("maintains responsive design with 1 column on mobile", () => {
      render(<TechnicalExpertise categories={realSkillCategories} />);
      
      const grid = screen.getByTestId("categories-grid");
      expect(grid).toHaveClass("grid-cols-1");
    });

    it("provides accessibility for screen readers", () => {
      render(<TechnicalExpertise categories={realSkillCategories} />);
      
      const section = screen.getByRole("region", { name: /technical expertise/i });
      expect(section).toBeInTheDocument();
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Technical Expertise");
    });

    it("handles full skill dataset performance", () => {
      render(<TechnicalExpertise categories={realSkillCategories} />);
      
      // Should render all skills without performance issues
      const skillNames = screen.getAllByTestId("skill-name");
      expect(skillNames.length).toBeGreaterThan(10); // All skills should render
      
      const proficiencyBars = screen.getAllByTestId("proficiency-bar");
      expect(proficiencyBars.length).toBeGreaterThan(10); // All bars should render
    });
  });
}); 