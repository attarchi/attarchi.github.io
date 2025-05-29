import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home Page - Contact Integration", () => {
  it("renders contact section with main heading", () => {
    render(<Home />);
    
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();
    expect(screen.getByText("Available for exciting projects and opportunities")).toBeInTheDocument();
  });

  it("has working anchor link to contact section", () => {
    render(<Home />);
    
    const contactLink = screen.getByText("Contact Me");
    expect(contactLink).toHaveAttribute("href", "#contact");
  });

  it("displays contact information in the contact section", () => {
    render(<Home />);
    
    // Get contact info specifically from the contact info card
    const contactInfoCard = screen.getByTestId("contact-info-card");
    
    expect(screen.getByText("Contact Information")).toBeInTheDocument();
    expect(contactInfoCard).toHaveTextContent("Email");
    expect(contactInfoCard).toHaveTextContent("LinkedIn");
    expect(contactInfoCard).toHaveTextContent("GitHub");
  });

  it("shows availability status", () => {
    render(<Home />);
    
    const availabilityBadge = screen.getByTestId("availability-badge");
    expect(availabilityBadge).toHaveTextContent("Available");
  });

  it("contact section has proper background styling", () => {
    render(<Home />);
    
    const contactSection = screen.getByRole("region", { name: /contact/i });
    expect(contactSection).toHaveClass("bg-[#f6f8fa]", "dark:bg-[#0d1117]");
  });

  it("contact card has proper styling", () => {
    render(<Home />);
    
    const contactCard = screen.getByTestId("contact-info-card");
    expect(contactCard).toHaveClass("bg-white", "dark:bg-[#21262d]");
  });
}); 