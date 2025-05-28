import { render, screen } from "@testing-library/react";
import { ContactSection } from "../ContactSection";

describe("ContactSection - Styling", () => {
  it("has correct section background colors for light and dark themes", () => {
    render(<ContactSection />);
    
    const section = screen.getByRole("region", { name: /contact/i });
    expect(section).toHaveClass("bg-[#f6f8fa]", "dark:bg-[#0d1117]");
  });

  it("has proper card styling with borders and shadows", () => {
    render(<ContactSection />);
    
    const contactCard = screen.getByTestId("contact-info-card");
    expect(contactCard).toHaveClass(
      "border",
      "border-[#d0d7de]",
      "dark:border-[#30363d]",
      "rounded-lg",
      "p-6",
      "shadow-sm"
    );
  });

  it("uses correct typography classes for headings", () => {
    render(<ContactSection />);
    
    const mainHeading = screen.getByText("Let's Work Together");
    expect(mainHeading).toHaveClass("font-mono", "font-semibold", "text-text");
    
    const cardHeading = screen.getByText("Contact Information");
    expect(cardHeading).toHaveClass("font-mono", "font-medium", "text-text");
  });

  it("has proper spacing and layout structure", () => {
    render(<ContactSection />);
    
    const container = screen.getByText("Let's Work Together").closest("div")?.parentElement;
    expect(container).toHaveClass("max-w-6xl", "mx-auto", "px-4");
    
    const headerSection = screen.getByText("Let's Work Together").closest("div");
    expect(headerSection).toHaveClass("text-center", "mb-12");
  });

  it("displays contact icons with correct styling", () => {
    render(<ContactSection />);
    
    const contactCard = screen.getByTestId("contact-info-card");
    const icons = contactCard.querySelectorAll("svg");
    
    expect(icons).toHaveLength(3); // Email, LinkedIn, GitHub
    icons.forEach(icon => {
      expect(icon.parentElement).toHaveClass("w-5", "h-5", "text-[#656d76]", "dark:text-[#8b949e]");
    });
  });

  it("has proper text color classes for contact details", () => {
    render(<ContactSection />);
    
    const emailLabel = screen.getByText("Email");
    expect(emailLabel).toHaveClass("text-[#656d76]", "dark:text-[#8b949e]");
    
    const emailValue = screen.getByText("contact@example.com");
    expect(emailValue).toHaveClass("text-text");
  });

  it("availability badge has correct styling", () => {
    render(<ContactSection />);
    
    const badge = screen.getByTestId("availability-badge");
    expect(badge).toHaveClass(
      "bg-green-50",
      "dark:bg-green-900/20",
      "text-green-700",
      "dark:text-green-400",
      "border-green-200",
      "dark:border-green-800"
    );
  });

  it("contact info items have proper spacing", () => {
    render(<ContactSection />);
    
    const contactCard = screen.getByTestId("contact-info-card");
    const contactList = contactCard.querySelector(".space-y-4");
    expect(contactList).toBeInTheDocument();
    expect(contactList).toHaveClass("space-y-4");
  });
}); 