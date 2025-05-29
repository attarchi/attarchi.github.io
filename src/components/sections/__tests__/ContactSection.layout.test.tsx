import { render, screen } from "@testing-library/react";
import { ContactSection } from "../ContactSection";

describe("ContactSection - Layout", () => {
  it("renders main heading with correct hierarchy", () => {
    render(<ContactSection />);
    
    const mainHeading = screen.getByRole("heading", { level: 2 });
    expect(mainHeading).toHaveTextContent("Let's Work Together");
  });

  it("has responsive grid layout with two columns", () => {
    render(<ContactSection />);
    
    const grid = screen.getByTestId("contact-grid");
    expect(grid).toHaveClass("grid", "grid-cols-1", "lg:grid-cols-2");
    expect(grid.children).toHaveLength(2);
  });

  it("renders contact info card as first grid item", () => {
    render(<ContactSection />);
    
    const grid = screen.getByTestId("contact-grid");
    const firstChild = grid.children[0];
    
    expect(firstChild).toHaveAttribute("data-testid", "contact-info-card");
    expect(firstChild).toHaveClass("bg-white", "dark:bg-[#21262d]");
  });

  it("renders contact form as second grid item", () => {
    render(<ContactSection />);
    
    const grid = screen.getByTestId("contact-grid");
    const secondChild = grid.children[1];
    
    expect(secondChild).toHaveAttribute("data-testid", "contact-form");
    expect(secondChild).toHaveTextContent("Send Message");
    expect(secondChild).toHaveClass("bg-white", "dark:bg-[#21262d]");
  });

  it("has proper container max-width and centering", () => {
    render(<ContactSection />);
    
    const container = screen.getByText("Let's Work Together").closest("div")?.parentElement;
    expect(container).toHaveClass("max-w-6xl", "mx-auto", "px-4");
  });

  it("has proper vertical spacing", () => {
    render(<ContactSection />);
    
    const section = screen.getByRole("region", { name: /contact/i });
    expect(section).toHaveClass("py-20");
    
    const headerSection = screen.getByText("Let's Work Together").closest("div");
    expect(headerSection).toHaveClass("text-center", "mb-12");
  });

  it("contact info card has proper internal layout", () => {
    render(<ContactSection />);
    
    const contactCard = screen.getByTestId("contact-info-card");
    const cardContent = contactCard.querySelector(".space-y-6");
    expect(cardContent).toBeInTheDocument();
    
    const contactList = contactCard.querySelector(".space-y-4");
    expect(contactList).toBeInTheDocument();
  });

  it("has proper gap spacing between grid items", () => {
    render(<ContactSection />);
    
    const grid = screen.getByTestId("contact-grid");
    expect(grid).toHaveClass("gap-12");
  });
}); 