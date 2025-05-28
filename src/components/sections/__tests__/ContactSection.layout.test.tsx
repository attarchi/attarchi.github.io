import { render, screen } from "@testing-library/react";
import { ContactSection } from "../ContactSection";

describe("ContactSection - Layout", () => {
  it("has responsive grid that changes from single to two columns", () => {
    render(<ContactSection />);
    
    const grid = screen.getByTestId("contact-grid");
    expect(grid).toHaveClass("grid-cols-1", "lg:grid-cols-2");
  });

  it("has proper gap between grid items", () => {
    render(<ContactSection />);
    
    const grid = screen.getByTestId("contact-grid");
    expect(grid).toHaveClass("gap-12");
  });

  it("contact info card is positioned first in grid", () => {
    render(<ContactSection />);
    
    const grid = screen.getByTestId("contact-grid");
    const firstChild = grid.firstElementChild;
    
    expect(firstChild).toHaveAttribute("data-testid", "contact-info-card");
  });

  it("has placeholder for contact form as second grid item", () => {
    render(<ContactSection />);
    
    const grid = screen.getByTestId("contact-grid");
    const secondChild = grid.children[1];
    
    expect(secondChild).toHaveTextContent("Contact form will be added here");
    expect(secondChild).toHaveClass("bg-white", "dark:bg-[#21262d]");
  });

  it("section uses correct spacing variant", () => {
    render(<ContactSection />);
    
    const section = screen.getByRole("region", { name: /contact/i });
    expect(section).toHaveClass("py-20");
  });

  it("container has proper max-width constraint", () => {
    render(<ContactSection />);
    
    const container = screen.getByText("Let's Work Together").closest("div")?.parentElement;
    expect(container).toHaveClass("max-w-6xl");
  });

  it("header section is centered with proper margin", () => {
    render(<ContactSection />);
    
    const headerSection = screen.getByText("Let's Work Together").closest("div");
    expect(headerSection).toHaveClass("text-center", "mb-12");
  });

  it("contact info has proper internal layout structure", () => {
    render(<ContactSection />);
    
    const contactCard = screen.getByTestId("contact-info-card");
    const headerRow = contactCard.querySelector(".flex.items-center.justify-between");
    
    expect(headerRow).toBeInTheDocument();
    expect(headerRow).toHaveClass("flex", "items-center", "justify-between");
  });

  it("contact items use flex layout with proper gap", () => {
    render(<ContactSection />);
    
    const contactCard = screen.getByTestId("contact-info-card");
    const contactItems = contactCard.querySelectorAll(".flex.items-center.gap-3");
    
    expect(contactItems).toHaveLength(3); // Email, LinkedIn, GitHub
    contactItems.forEach(item => {
      expect(item).toHaveClass("flex", "items-center", "gap-3");
    });
  });
}); 