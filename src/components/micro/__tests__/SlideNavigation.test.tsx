import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SlideNavigation, type SlideNavigationProps } from "../SlideNavigation";

describe("SlideNavigation", () => {
  const defaultProps: SlideNavigationProps = {
    currentIndex: 0,
    maxIndex: 2,
    onPrev: jest.fn(),
    onNext: jest.fn(),
    onGoToIndex: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders desktop navigation by default", () => {
    render(<SlideNavigation {...defaultProps} />);
    
    expect(screen.getByTestId("prev-slide-button")).toBeInTheDocument();
    expect(screen.getByTestId("next-slide-button")).toBeInTheDocument();
    expect(screen.getByTestId("slide-indicators")).toBeInTheDocument();
  });

  it("renders mobile navigation when variant is mobile", () => {
    render(<SlideNavigation {...defaultProps} variant="mobile" />);
    
    expect(screen.getByTestId("mobile-prev-slide-button")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-next-slide-button")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-slide-indicators")).toBeInTheDocument();
  });

  it("calls onPrev when prev button is clicked", async () => {
    const user = userEvent.setup();
    render(<SlideNavigation {...defaultProps} currentIndex={1} />);
    
    const prevButton = screen.getByTestId("prev-slide-button");
    await user.click(prevButton);
    
    expect(defaultProps.onPrev).toHaveBeenCalledTimes(1);
  });

  it("calls onNext when next button is clicked", async () => {
    const user = userEvent.setup();
    render(<SlideNavigation {...defaultProps} />);
    
    const nextButton = screen.getByTestId("next-slide-button");
    await user.click(nextButton);
    
    expect(defaultProps.onNext).toHaveBeenCalledTimes(1);
  });

  it("calls onGoToIndex when indicator is clicked", async () => {
    const user = userEvent.setup();
    render(<SlideNavigation {...defaultProps} />);
    
    const secondIndicator = screen.getByTestId("slide-indicator-1");
    await user.click(secondIndicator);
    
    expect(defaultProps.onGoToIndex).toHaveBeenCalledWith(1);
  });

  it("disables prev button when currentIndex is 0", () => {
    render(<SlideNavigation {...defaultProps} currentIndex={0} />);
    
    const prevButton = screen.getByTestId("prev-slide-button");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button when currentIndex equals maxIndex", () => {
    render(<SlideNavigation {...defaultProps} currentIndex={2} maxIndex={2} />);
    
    const nextButton = screen.getByTestId("next-slide-button");
    expect(nextButton).toBeDisabled();
  });

  it("enables prev button when currentIndex is greater than 0", () => {
    render(<SlideNavigation {...defaultProps} currentIndex={1} />);
    
    const prevButton = screen.getByTestId("prev-slide-button");
    expect(prevButton).not.toBeDisabled();
  });

  it("enables next button when currentIndex is less than maxIndex", () => {
    render(<SlideNavigation {...defaultProps} currentIndex={1} maxIndex={2} />);
    
    const nextButton = screen.getByTestId("next-slide-button");
    expect(nextButton).not.toBeDisabled();
  });

  it("renders correct number of indicators", () => {
    render(<SlideNavigation {...defaultProps} maxIndex={3} />);
    
    expect(screen.getByTestId("slide-indicator-0")).toBeInTheDocument();
    expect(screen.getByTestId("slide-indicator-1")).toBeInTheDocument();
    expect(screen.getByTestId("slide-indicator-2")).toBeInTheDocument();
    expect(screen.getByTestId("slide-indicator-3")).toBeInTheDocument();
  });

  it("works with mobile variant", async () => {
    const user = userEvent.setup();
    render(<SlideNavigation {...defaultProps} currentIndex={1} variant="mobile" />);
    
    const mobilePrevButton = screen.getByTestId("mobile-prev-slide-button");
    const mobileNextButton = screen.getByTestId("mobile-next-slide-button");
    
    await user.click(mobilePrevButton);
    expect(defaultProps.onPrev).toHaveBeenCalledTimes(1);
    
    await user.click(mobileNextButton);
    expect(defaultProps.onNext).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<SlideNavigation {...defaultProps} className="custom-class" />);
    
    const container = screen.getByTestId("prev-slide-button").parentElement;
    expect(container).toHaveClass("custom-class");
  });
}); 