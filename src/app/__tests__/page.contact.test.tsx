import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home Page - Contact Integration", () => {
  it("renders the ContactSection on the home page", () => {
    render(<Home />);
    
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();
    expect(screen.getByText("Available for exciting projects and opportunities")).toBeInTheDocument();
  });

  it("ContactSection has correct id for navigation", () => {
    render(<Home />);
    
    const contactSection = screen.getByText("Let's Work Together").closest("section");
    expect(contactSection).toHaveAttribute("id", "contact");
  });

  it("Contact Me button in hero links to contact section", () => {
    render(<Home />);
    
    const contactButton = screen.getByRole("link", { name: /contact me/i });
    expect(contactButton).toHaveAttribute("href", "#contact");
  });

  it("displays contact information in the contact section", () => {
    render(<Home />);
    
    expect(screen.getByText("Contact Information")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("shows availability status in contact section", () => {
    render(<Home />);
    
    const availabilityBadge = screen.getByTestId("availability-badge");
    expect(availabilityBadge).toBeInTheDocument();
    expect(availabilityBadge).toHaveTextContent("Available");
  });
}); 