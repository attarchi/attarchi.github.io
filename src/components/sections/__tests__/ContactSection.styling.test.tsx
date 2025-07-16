import { render, screen } from "@testing-library/react";
import { ContactSection } from "../ContactSection";

describe("ContactSection - Styling", () => {
  it("has correct background colors", () => {
    render(<ContactSection />);
    
    const section = screen.getByRole("region", { name: /contact/i });
    expect(section).toHaveClass("bg-[#f6f8fa]", "dark:bg-[#0d1117]");
  });

  it("has proper heading typography", () => {
    render(<ContactSection />);
    
    const mainHeading = screen.getByText("Let's Work Together");
    expect(mainHeading).toHaveClass("font-mono");
    expect(mainHeading).toHaveClass("text-text");
    
    const subheading = screen.getByText("Available for exciting projects and opportunities");
    expect(subheading).toHaveClass("font-sans", "text-base", "text-text");
  });

  it("has proper card styling", () => {
    render(<ContactSection />);
    
    const contactCard = screen.getByTestId("contact-info-card");
    expect(contactCard).toHaveClass(
      "bg-white",
      "dark:bg-[#21262d]",
      "border",
      "border-[#d0d7de]",
      "dark:border-[#30363d]",
      "rounded-lg",
      "p-6",
      "shadow-sm"
    );
  });

  it("has proper text color classes for contact details", () => {
    render(
      <ContactSection
        status="Available"
        location="Test City"
        email="contact@example.com"
        linkedinUrl="https://linkedin.com/in/test"
        githubUrl="https://github.com/test"
        responseTime="Within 1 day"
        availabilityType="Full-time"
      />
    );
    // Find all 'Email' elements and pick the one inside the contact info card
    const emailLabels = screen.getAllByText("Email");
    // The contact info card label uses the color class, the form label does not
    const infoLabel = emailLabels.find(el => el.className.includes("text-[#656d76]"));
    expect(infoLabel).toHaveClass("text-[#656d76]", "dark:text-[#8b949e]");
    const emailValue = screen.getByText("contact@example.com");
    expect(emailValue).toHaveClass("text-text");
  });

  it("has proper badge styling", () => {
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

  it("has responsive grid classes", () => {
    render(<ContactSection />);
    
    const grid = screen.getByTestId("contact-grid");
    expect(grid).toHaveClass("grid", "grid-cols-1", "lg:grid-cols-2", "gap-12");
  });
}); 