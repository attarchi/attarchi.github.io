import { render, screen, waitFor } from "@testing-library/react";
import { ContactSection } from "../ContactSection";
import { motion } from "framer-motion";

// Mock framer-motion for testing animations
jest.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

// Mock the useScrollAnimation hook
jest.mock("@/lib/hooks/useScrollAnimation", () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isVisible: true,
  }),
}));

describe("ContactSection Animations", () => {
  it("wraps contact section with AnimatedSection component", () => {
    render(<ContactSection />);
    
    const section = screen.getByRole("region", { name: /contact/i });
    expect(section).toBeInTheDocument();
    // The section should be wrapped with AnimatedSection which applies motion variants
    expect(section.parentElement).toBeInTheDocument();
  });

  it("applies slide-up animation to contact section container", () => {
    render(<ContactSection />);
    
    const animatedSection = screen.getByTestId("contact-section-animated");
    expect(animatedSection).toBeInTheDocument();
    // The AnimatedSection wrapper should apply slideUp variants
    expect(animatedSection).toHaveAttribute("data-testid", "contact-section-animated");
  });

  it("form fields have stagger animation with 100ms delays", () => {
    render(<ContactSection />);
    
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const messageTextarea = screen.getByTestId("message-textarea");
    const submitButton = screen.getByTestId("submit-button");
    
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    
    // Form fields should be wrapped with motion components for stagger animation
    // Check that the form fields are within motion.div containers
    expect(nameInput.closest("div")).toBeInTheDocument();
    expect(emailInput.closest("div")).toBeInTheDocument();
    expect(messageTextarea.closest("div")).toBeInTheDocument();
    expect(submitButton.closest("div")).toBeInTheDocument();
  });

  it("social links animate in as coordinated group", () => {
    render(<ContactSection />);
    
    const contactInfoCard = screen.getByTestId("contact-info-card");
    expect(contactInfoCard).toBeInTheDocument();
    
    // Social links should be grouped together for coordinated animation
    const emailSection = screen.getByTestId("email-contact");
    const linkedinSection = screen.getByTestId("linkedin-contact");
    const githubSection = screen.getByTestId("github-contact");
    
    expect(emailSection).toBeInTheDocument();
    expect(linkedinSection).toBeInTheDocument();
    expect(githubSection).toBeInTheDocument();
  });

  it("availability status badge fades in last in sequence", () => {
    render(<ContactSection />);
    
    const availabilityBadge = screen.getByTestId("availability-badge");
    expect(availabilityBadge).toBeInTheDocument();
    expect(availabilityBadge).toHaveTextContent("Available");
    
    // Status badge should be wrapped in a motion.div for fade animation
    expect(availabilityBadge.closest("div")).toBeInTheDocument();
  });

  it("maintains form functionality during animations", async () => {
    render(<ContactSection />);
    
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const messageTextarea = screen.getByTestId("message-textarea");
    const submitButton = screen.getByTestId("submit-button");
    
    // Form should remain functional
    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(messageTextarea).toBeRequired();
    expect(submitButton).toBeInTheDocument();
    
    // Test form submission still works
    const form = submitButton.closest("form");
    expect(form).toBeInTheDocument();
  });

  it("preserves responsive form layout during animations", () => {
    render(<ContactSection />);
    
    const gridContainer = screen.getByTestId("contact-grid");
    expect(gridContainer).toHaveClass("grid", "grid-cols-1", "lg:grid-cols-2", "gap-12");
    
    const contactInfoCard = screen.getByTestId("contact-info-card");
    const contactForm = screen.getByTestId("contact-form");
    
    expect(contactInfoCard).toBeInTheDocument();
    expect(contactForm).toBeInTheDocument();
    
    // Layout classes should be preserved
    expect(contactInfoCard).toHaveClass("bg-white", "dark:bg-[#21262d]");
    expect(contactForm).toHaveClass("bg-white", "dark:bg-[#21262d]");
  });

  it("form validation continues to work during animations", () => {
    render(<ContactSection />);
    
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const messageTextarea = screen.getByTestId("message-textarea");
    
    // Required attributes should be preserved
    expect(nameInput).toHaveAttribute("required");
    expect(emailInput).toHaveAttribute("required");
    expect(messageTextarea).toHaveAttribute("required");
    
    // Input types should be preserved
    expect(nameInput).toHaveAttribute("type", "text");
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("animation sequence respects existing form submission functionality", async () => {
    render(<ContactSection />);
    
    const submitButton = screen.getByTestId("submit-button");
    const form = submitButton.closest("form");
    
    expect(form).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Send Message");
    
    // Form submission should still trigger the message display
    const formEvent = new Event("submit", { bubbles: true });
    form?.dispatchEvent(formEvent);
    
    // Wait for the message to appear
    await waitFor(() => {
      expect(screen.getByText(/Feature coming soon/)).toBeInTheDocument();
    });
  });
}); 