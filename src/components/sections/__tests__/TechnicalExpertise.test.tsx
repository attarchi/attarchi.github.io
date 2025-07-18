import { render, screen } from "@testing-library/react";
import { TechnicalExpertise } from "../TechnicalExpertise";

jest.mock("@/lib", () => ({
  categoryStaggerVariants: { hidden: {}, visible: {} },
  categorySlideInVariants: { hidden: {}, visible: {} },
  skillStaggerVariants: { hidden: {}, visible: {} },
  skillFadeVariants: { hidden: {}, visible: {} },
  proficiencyScaleVariants: { hidden: {}, visible: {} },
  proficiencyFillVariants: { hidden: {}, visible: {} },
  sectionVariants: { hidden: {}, visible: {} }
}));

jest.mock("@/components/ui");

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
    expect(screen.queryByText("DevOps")).not.toBeInTheDocument();
    expect(screen.queryByText("Mobile")).not.toBeInTheDocument();
  });

  it("renders skills within categories", () => {
    render(<TechnicalExpertise categories={mockCategories} />);
    
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it("renders proficiency bars for each skill", () => {
    render(<TechnicalExpertise categories={mockCategories} />);
    
    const proficiencyBars = screen.getAllByTestId("proficiency-bar");
    expect(proficiencyBars).toHaveLength(4);
  });

  it("displays years of experience in title attribute", () => {
    render(<TechnicalExpertise categories={mockCategories} />);
    
    const reactSkill = screen.getByText("React");
    expect(reactSkill).toHaveAttribute("title", "5 years of experience");
    
    const typescriptSkill = screen.getByText("TypeScript");
    expect(typescriptSkill).toHaveAttribute("title", "4 years of experience");
  });

  it("handles categories without skills", () => {
    const categoriesWithoutSkills = [
      { title: "Empty Category" },
      { title: "Another Empty", skills: [] }
    ];
    
    render(<TechnicalExpertise categories={categoriesWithoutSkills} />);
    
    expect(screen.getByText("Empty Category")).toBeInTheDocument();
    expect(screen.getByText("Another Empty")).toBeInTheDocument();
    expect(screen.queryByTestId("skills-list")).not.toBeInTheDocument();
  });

  it("renders skills with data attributes for proficiency animation", () => {
    render(<TechnicalExpertise categories={mockCategories} />);
    
    const proficiencyFills = screen.getAllByTestId("proficiency-fill");
    
    const reactFill = proficiencyFills.find(el => el.getAttribute("data-skill-name") === "React");
    expect(reactFill).toBeInTheDocument();
    
    const nodeFill = proficiencyFills.find(el => el.getAttribute("data-skill-name") === "Node.js");
    expect(nodeFill).toBeInTheDocument();
  });

  it("renders years information on hover for skills with years", () => {
    render(<TechnicalExpertise categories={mockCategories} />);
    
    const reactSkillContainer = screen.getByText("React").closest('[data-testid="skill-item"]');
    const yearsSpan = reactSkillContainer?.querySelector('span');
    expect(yearsSpan).toHaveTextContent("(5 years)");
  });

  it("handles empty categories array", () => {
    render(<TechnicalExpertise categories={[]} />);
    
    const categoryCards = screen.queryAllByTestId("category-card");
    expect(categoryCards).toHaveLength(0);
  });

  it("renders icons for skills that have them", () => {
    render(<TechnicalExpertise categories={mockCategories} />);
    
    const reactIcon = screen.getByRole("img", { name: /react icon/i });
    expect(reactIcon).toBeInTheDocument();
    expect(reactIcon).toHaveAttribute("src", "/icons/react.png");
    
    const nodejsIcon = screen.getByRole("img", { name: /node\.js icon/i });
    expect(nodejsIcon).toBeInTheDocument();
    expect(nodejsIcon).toHaveAttribute("src", "/icons/nodejs.png");
    
    const sqlIcon = screen.getByRole("img", { name: /postgresql icon/i });
    expect(sqlIcon).toBeInTheDocument();
    expect(sqlIcon).toHaveAttribute("src", "/icons/sql.png");
  });

  it("does not render icons for skills without them", () => {
    render(<TechnicalExpertise categories={mockCategories} />);
    
    const typescriptIcon = screen.queryByRole("img", { name: /typescript icon/i });
    expect(typescriptIcon).not.toBeInTheDocument();
  });

  it("renders icons with proper size and spacing", () => {
    render(<TechnicalExpertise categories={mockCategories} />);
    
    const reactIcon = screen.getByRole("img", { name: /react icon/i });
    expect(reactIcon).toHaveAttribute("width", "32");
    expect(reactIcon).toHaveAttribute("height", "32");
  });

  it("renders others section for categories with others", () => {
    render(<TechnicalExpertise categories={mockCategories} />);
    
    expect(screen.getAllByTestId("others-icon-list")).toHaveLength(2);
  });

  it("renders other skills names in mock", () => {
    render(<TechnicalExpertise categories={mockCategories} />);
    
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Prisma")).toBeInTheDocument();
    expect(screen.getByText("CouchDB")).toBeInTheDocument();
  });

  it("does not render others section for categories without others", () => {
    const categoriesWithoutOthers = [
      {
        title: "Empty Category",
        skills: []
      }
    ];
    
    render(<TechnicalExpertise categories={categoriesWithoutOthers} />);
    
    expect(screen.queryByTestId("others-icon-list")).not.toBeInTheDocument();
  });
}); 