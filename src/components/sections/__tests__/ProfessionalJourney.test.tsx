import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProfessionalJourney } from "../ProfessionalJourney";
import { type ProfessionalMilestone } from "@/content";

// Mock window.innerWidth for mobile testing
const mockWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

jest.mock('@/lib/hooks', () => ({
  useTimelineProgress: jest.fn().mockReturnValue({
    ref: jest.fn(),
    progress: 0,
    activeMilestones: [],
  }),
}));

const mockMilestones: ProfessionalMilestone[] = [
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

const manyMilestones: ProfessionalMilestone[] = [
  {
    id: "1",
    date: "2018-2020",
    role: "Junior Developer",
    company: "StartupCorp",
    description: "Beginning my career",
    achievement: "Career Start"
  },
  {
    id: "2",
    date: "2020-2022",
    role: "Mid-level Developer",
    company: "TechFlow",
    description: "Growing experience",
    achievement: "Growth"
  },
  {
    id: "3",
    date: "2022-2023",
    role: "Senior Developer",
    company: "BigTech",
    description: "Leading projects",
    achievement: "Leadership"
  },
  {
    id: "4",
    date: "2023-2024",
    role: "Tech Lead",
    company: "InnovateCorp",
    description: "Technical leadership",
    achievement: "Tech Lead"
  },
  {
    id: "5",
    date: "2024-Present",
    role: "Engineering Manager",
    company: "FutureTech",
    description: "Team management",
    achievement: "Management"
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

  it("does not show navigation controls when milestones are 3 or fewer", () => {
    render(<ProfessionalJourney milestones={mockMilestones} />);
    
    expect(screen.queryByTestId("prev-slide-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("next-slide-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("slide-indicators")).not.toBeInTheDocument();
    expect(screen.queryByTestId("slide-counter")).not.toBeInTheDocument();
  });

  it("shows navigation controls when milestones are more than 3", () => {
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    expect(screen.getByTestId("prev-slide-button")).toBeInTheDocument();
    expect(screen.getByTestId("next-slide-button")).toBeInTheDocument();
    expect(screen.getByTestId("slide-indicators")).toBeInTheDocument();
    expect(screen.getByTestId("slide-counter")).toBeInTheDocument();
  });

  it("shows correct slide counter information for slideshow", () => {
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    const slideCounter = screen.getByTestId("slide-counter");
    expect(slideCounter).toHaveTextContent("Showing 1-3 of 5");
  });

  it("slides to next milestone when next button is clicked", async () => {
    const user = userEvent.setup();
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    const nextButton = screen.getByTestId("next-slide-button");
    const slideCounter = screen.getByTestId("slide-counter");
    
    expect(slideCounter).toHaveTextContent("Showing 1-3 of 5");
    
    await user.click(nextButton);
    
    await waitFor(() => {
      expect(slideCounter).toHaveTextContent("Showing 2-4 of 5");
    });
  });

  it("slides to previous milestone when prev button is clicked", async () => {
    const user = userEvent.setup();
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    const nextButton = screen.getByTestId("next-slide-button");
    const prevButton = screen.getByTestId("prev-slide-button");
    const slideCounter = screen.getByTestId("slide-counter");
    
    // Move forward first
    await user.click(nextButton);
    await waitFor(() => {
      expect(slideCounter).toHaveTextContent("Showing 2-4 of 5");
    });
    
    // Then go back
    await user.click(prevButton);
    await waitFor(() => {
      expect(slideCounter).toHaveTextContent("Showing 1-3 of 5");
    });
  });

  it("disables prev button when at the beginning", () => {
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    const prevButton = screen.getByTestId("prev-slide-button");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button when at the end", async () => {
    const user = userEvent.setup();
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    const nextButton = screen.getByTestId("next-slide-button");
    
    // Navigate to the end (5 milestones, showing 3 at a time, so max index is 2)
    await user.click(nextButton); // Index 1: showing 2-4
    await user.click(nextButton); // Index 2: showing 3-5
    
    await waitFor(() => {
      expect(nextButton).toBeDisabled();
    });
  });

  it("navigates using slide indicators to specific positions", async () => {
    const user = userEvent.setup();
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    const slideCounter = screen.getByTestId("slide-counter");
    const thirdIndicator = screen.getByTestId("slide-indicator-2");
    
    expect(slideCounter).toHaveTextContent("Showing 1-3 of 5");
    
    await user.click(thirdIndicator);
    
    await waitFor(() => {
      expect(slideCounter).toHaveTextContent("Showing 3-5 of 5");
    });
  });

  it("supports keyboard navigation with arrow keys", async () => {
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    const slideCounter = screen.getByTestId("slide-counter");
    expect(slideCounter).toHaveTextContent("Showing 1-3 of 5");
    
    // Navigate right
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    
    await waitFor(() => {
      expect(slideCounter).toHaveTextContent("Showing 2-4 of 5");
    });
    
    // Navigate left
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    
    await waitFor(() => {
      expect(slideCounter).toHaveTextContent("Showing 1-3 of 5");
    });
  });

  it("shows correct number of slide indicators for slideshow", () => {
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    // 5 milestones, showing 3 at a time: positions 0, 1, 2 (3 possible starting positions)
    const indicators = screen.getAllByTestId(/slide-indicator-/);
    expect(indicators).toHaveLength(3);
  });

  it("highlights current position indicator", () => {
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    const firstIndicator = screen.getByTestId("slide-indicator-0");
    const secondIndicator = screen.getByTestId("slide-indicator-1");
    
    expect(firstIndicator).toHaveClass("bg-[#0969da]");
    expect(secondIndicator).toHaveClass("bg-[#d0d7de]");
  });

  it("renders milestones container for sliding interface", () => {
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    const milestonesContainer = screen.getByTestId("milestones-container");
    expect(milestonesContainer).toBeInTheDocument();
  });

  it("shows only visible milestones in slideshow mode", () => {
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    // Should show first 3 milestones initially
    expect(screen.getByText("Junior Developer")).toBeInTheDocument();
    expect(screen.getByText("Mid-level Developer")).toBeInTheDocument();
    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
    
    // Should not show the last 2 milestones initially
    expect(screen.queryByText("Tech Lead")).not.toBeInTheDocument();
    expect(screen.queryByText("Engineering Manager")).not.toBeInTheDocument();
  });

  it("shows mobile navigation buttons when in mobile view", () => {
    // Mock mobile screen size
    mockWindowWidth(375);
    
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    // Should show mobile navigation buttons
    expect(screen.getByTestId("mobile-prev-slide-button")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-next-slide-button")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-slide-indicators")).toBeInTheDocument();
    
    // Should not show desktop navigation buttons
    expect(screen.queryByTestId("prev-slide-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("next-slide-button")).not.toBeInTheDocument();
  });

  it("shows only 2 milestones in mobile view", () => {
    // Mock mobile screen size
    mockWindowWidth(375);
    
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    const slideCounter = screen.getByTestId("slide-counter");
    expect(slideCounter).toHaveTextContent("Showing 1-2 of 5");
  });

  it("mobile navigation buttons work correctly", async () => {
    // Mock mobile screen size
    mockWindowWidth(375);
    
    const user = userEvent.setup();
    render(<ProfessionalJourney milestones={manyMilestones} />);
    
    const mobileNextButton = screen.getByTestId("mobile-next-slide-button");
    const mobilePrevButton = screen.getByTestId("mobile-prev-slide-button");
    const slideCounter = screen.getByTestId("slide-counter");
    
    expect(slideCounter).toHaveTextContent("Showing 1-2 of 5");
    
    // Navigate forward
    await user.click(mobileNextButton);
    await waitFor(() => {
      expect(slideCounter).toHaveTextContent("Showing 2-3 of 5");
    });
    
    // Navigate back
    await user.click(mobilePrevButton);
    await waitFor(() => {
      expect(slideCounter).toHaveTextContent("Showing 1-2 of 5");
    });
  });
}); 