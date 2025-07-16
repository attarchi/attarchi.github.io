import { render, screen } from "@testing-library/react";
import { ContactSection } from "../ContactSection";

const defaultProps = {
  status: "Available for new opportunities",
  location: "Istanbul, Turkey (UTC+3)",
  email: "attarchi@me.com",
  linkedinUrl: "https://linkedin.com/in/attarchi",
  githubUrl: "https://github.com/attarchi",
  responseTime: "Usually within 24 hours",
  availabilityType: "Full-time, Contract, Consulting",
};

describe("ContactSection", () => {
  it("renders with correct section background and spacing", () => {
    render(<ContactSection {...defaultProps} />);
    const section = screen.getByRole("region", { name: /contact/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-20");
  });

  it("renders section heading and subheading correctly", () => {
    render(<ContactSection {...defaultProps} />);
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();
    expect(screen.getByText("Available for exciting projects and opportunities")).toBeInTheDocument();
  });

  it("has correct container styling with max-width", () => {
    render(<ContactSection {...defaultProps} />);
    const container = screen.getByText("Let's Work Together").closest("div")?.parentElement;
    expect(container).toHaveClass("max-w-6xl");
  });

  it("has responsive grid layout classes", () => {
    render(<ContactSection {...defaultProps} />);
    const gridContainer = screen.getByTestId("contact-grid");
    expect(gridContainer).toHaveClass("grid", "grid-cols-1", "lg:grid-cols-2", "gap-12");
  });

  it("renders contact info card with correct styling", () => {
    render(<ContactSection {...defaultProps} />);
    const contactCard = screen.getByTestId("contact-info-card");
    expect(contactCard).toBeInTheDocument();
    expect(contactCard).toHaveClass("bg-white", "dark:bg-[#21262d]");
  });

  it("displays contact information correctly", () => {
    render(<ContactSection {...defaultProps} />);
    const contactInfoCard = screen.getByTestId("contact-info-card");
    expect(contactInfoCard).toHaveTextContent("Email");
    expect(screen.getByText(defaultProps.email)).toBeInTheDocument();
    expect(contactInfoCard).toHaveTextContent("LinkedIn");
    expect(screen.getByText(defaultProps.linkedinUrl)).toBeInTheDocument();
    expect(contactInfoCard).toHaveTextContent("GitHub");
    expect(screen.getByText(defaultProps.githubUrl)).toBeInTheDocument();
  });

  it("shows availability status badge", () => {
    render(<ContactSection {...defaultProps} />);
    const availabilityBadge = screen.getByTestId("availability-badge");
    expect(availabilityBadge).toBeInTheDocument();
    expect(availabilityBadge).toHaveTextContent(defaultProps.status);
  });

  it("displays real contact information with correct formatting", () => {
    render(<ContactSection {...defaultProps} />);
    const contactInfoCard = screen.getByTestId("contact-info-card");
    expect(contactInfoCard).toHaveTextContent(defaultProps.email);
    expect(contactInfoCard).toHaveTextContent(defaultProps.linkedinUrl);
    expect(contactInfoCard).toHaveTextContent(defaultProps.githubUrl);
    expect(contactInfoCard).toHaveTextContent(defaultProps.location);
  });

  it("shows detailed availability status prominently", () => {
    render(<ContactSection {...defaultProps} />);
    const availabilityBadge = screen.getByTestId("availability-badge");
    expect(availabilityBadge).toBeInTheDocument();
    expect(availabilityBadge).toHaveTextContent(defaultProps.status);
  });

  it("displays response time and availability type information", () => {
    render(<ContactSection {...defaultProps} />);
    expect(screen.getByText(defaultProps.responseTime)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.availabilityType)).toBeInTheDocument();
  });

  it("has properly formatted social media links with hover effects", () => {
    render(<ContactSection {...defaultProps} />);
    const linkedinLink = screen.getByText(defaultProps.linkedinUrl);
    const githubLink = screen.getByText(defaultProps.githubUrl);
    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink.closest("a")).toBeInTheDocument();
    expect(githubLink.closest("a")).toBeInTheDocument();
  });

  it("maintains professional contact card layout", () => {
    render(<ContactSection {...defaultProps} />);
    const contactCard = screen.getByTestId("contact-info-card");
    expect(contactCard).toHaveClass("rounded-lg", "p-6", "shadow-sm");
    expect(contactCard).toHaveClass("border", "border-[#d0d7de]", "dark:border-[#30363d]");
  });
}); 