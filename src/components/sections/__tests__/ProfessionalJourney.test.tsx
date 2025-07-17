import { render, screen } from "@testing-library/react";
import { ProfessionalJourney } from "../ProfessionalJourney";

jest.mock('@/lib/hooks', () => ({
  useTimelineProgress: jest.fn().mockReturnValue({
    ref: jest.fn(),
    progress: 0,
    activeMilestones: [],
  }),
}));

const mockMilestones = [
  {
    id: "1",
    date: "2020-2022",
    role: "Junior Developer",
    company: "StartupCorp",
    description: "Beginning my career in software development",
    achievement: "Career Start"
  },
  {
    id: "2", 
    date: "2022-2024",
    role: "Senior Developer",
    company: "TechFlow",
    description: "Leading feature development",
    achievement: "Senior Level"
  }
];

describe("ProfessionalJourney", () => {
  it("renders section heading", () => {
    render(<ProfessionalJourney />);
    
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Professional Journey");
  });

  it("renders empty timeline when no milestones provided", () => {
    render(<ProfessionalJourney />);
    
    const milestoneCards = screen.queryAllByTestId("milestone-card");
    expect(milestoneCards).toHaveLength(0);
  });

  it("renders custom milestones when provided", () => {
    render(<ProfessionalJourney milestones={mockMilestones} />);
    
    const milestoneCards = screen.getAllByTestId("milestone-card");
    expect(milestoneCards).toHaveLength(2);
    
    expect(screen.getByText("Junior Developer")).toBeInTheDocument();
    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
    expect(screen.getByText("StartupCorp")).toBeInTheDocument();
    expect(screen.getByText("TechFlow")).toBeInTheDocument();
  });

  it("renders timeline container", () => {
    render(<ProfessionalJourney />);
    
    const timelineContainer = screen.getByTestId("timeline-container");
    expect(timelineContainer).toBeInTheDocument();
  });

  it("renders timeline progress bar", () => {
    render(<ProfessionalJourney />);
    
    const progressBar = screen.getByTestId("timeline-progress-bar");
    expect(progressBar).toBeInTheDocument();
  });
}); 