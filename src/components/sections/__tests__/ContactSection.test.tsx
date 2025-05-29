import { render, screen } from "@testing-library/react";
import { ContactSection } from "../ContactSection";

describe("ContactSection", () => {
  it("renders with correct section background and spacing", () => {
    render(<ContactSection />);
    
    const section = screen.getByRole("region", { name: /contact/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-20");
  });

  it("renders section heading and subheading correctly", () => {
    render(<ContactSection />);
    
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();
    expect(screen.getByText("Available for exciting projects and opportunities")).toBeInTheDocument();
  });

  it("has correct container styling with max-width", () => {
    render(<ContactSection />);
    
    const container = screen.getByText("Let's Work Together").closest("div")?.parentElement;
    expect(container).toHaveClass("max-w-6xl");
  });

  it("has responsive grid layout classes", () => {
    render(<ContactSection />);
    
    const gridContainer = screen.getByTestId("contact-grid");
    expect(gridContainer).toHaveClass("grid", "grid-cols-1", "lg:grid-cols-2", "gap-12");
  });

  it("renders contact info card with correct styling", () => {
    render(<ContactSection />);
    
    const contactCard = screen.getByTestId("contact-info-card");
    expect(contactCard).toBeInTheDocument();
    expect(contactCard).toHaveClass("bg-white", "dark:bg-[#21262d]");
  });

  it("displays contact information correctly", () => {
    render(<ContactSection />);
    
    // Get contact info specifically from the contact info card
    const contactInfoCard = screen.getByTestId("contact-info-card");
    
    expect(contactInfoCard).toHaveTextContent("Email");
    expect(screen.getByText("contact@example.com")).toBeInTheDocument();
    expect(contactInfoCard).toHaveTextContent("LinkedIn");
    expect(screen.getByText("linkedin.com/in/profile")).toBeInTheDocument();
    expect(contactInfoCard).toHaveTextContent("GitHub");
    expect(screen.getByText("github.com/username")).toBeInTheDocument();
  });

  it("shows availability status badge", () => {
    render(<ContactSection />);
    
    const availabilityBadge = screen.getByTestId("availability-badge");
    expect(availabilityBadge).toBeInTheDocument();
    expect(availabilityBadge).toHaveTextContent("Available");
  });
}); 