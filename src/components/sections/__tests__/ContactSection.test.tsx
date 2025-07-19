import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactSection } from "../ContactSection";
import { contactContent } from "@/content";

jest.mock("@/components/micro");

jest.mock("framer-motion", () => ({
  motion: {
    section: ({ children, variants, initial, whileInView, viewport, ...props }: any) => 
      <section {...props}>{children}</section>,
    div: ({ children, variants, animate, initial, transition, ...props }: any) => 
      <div {...props}>{children}</div>,
  },
}));

const defaultProps = {
  status: "Available for new opportunities",
  location: "Istanbul, Turkey (UTC+3)",
  email: "attarchi@me.com",
  linkedinUrl: "https://linkedin.com/in/attarchi",
  githubUrl: "https://github.com/attarchi",
  responseTime: "Usually within 24 hours",
  availabilityType: "Full-time, Contract, Consulting",
  sectionTitle: "Let's Work Together",
  sectionSubtitle: "Available for exciting projects and opportunities",
  contactInfoTitle: "Contact Information",
  formTitle: "Send Message",
  formDescription: "Feature coming soon! This form will be available when the site goes live.",
};

describe("ContactSection", () => {
  it("renders contact section with correct content", () => {
    render(<ContactSection {...defaultProps} />);
    
    expect(screen.getByRole("region", { name: /contact/i })).toBeInTheDocument();
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();
    expect(screen.getByText("Available for exciting projects and opportunities")).toBeInTheDocument();
  });

  it("displays all contact information correctly", () => {
    render(<ContactSection {...defaultProps} />);
    
    expect(screen.getByText(defaultProps.email)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.linkedinUrl)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.githubUrl)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.location)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.responseTime)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.availabilityType)).toBeInTheDocument();
  });

  it("shows availability status badge", () => {
    render(<ContactSection {...defaultProps} />);
    
    const availabilityBadge = screen.getByTestId("availability-badge");
    expect(availabilityBadge).toBeInTheDocument();
    expect(availabilityBadge).toHaveTextContent(defaultProps.status);
  });

  it("renders social media links with correct attributes", () => {
    render(<ContactSection {...defaultProps} />);
    
    const linkedinLink = screen.getByText(defaultProps.linkedinUrl).closest("a");
    const githubLink = screen.getByText(defaultProps.githubUrl).closest("a");
    
    expect(linkedinLink).toHaveAttribute("href", defaultProps.linkedinUrl);
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    
    expect(githubLink).toHaveAttribute("href", defaultProps.githubUrl);
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders contact form with all required fields", () => {
    render(<ContactSection {...defaultProps} />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByTestId("name-input")).toBeRequired();
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeRequired();
    expect(screen.getByTestId("email-input")).toHaveAttribute("type", "email");
    
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByTestId("message-textarea")).toBeRequired();
    
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toHaveTextContent("Send Message");
  });

  it("renders contact form with proper structure", () => {
    render(<ContactSection {...defaultProps} />);
    
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const messageTextarea = screen.getByTestId("message-textarea");
    const form = screen.getByTestId("contact-form").querySelector("form");
    
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageTextarea).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it("renders with custom form title", () => {
    const customFormTitle = "Custom Form Title";
    render(<ContactSection {...defaultProps} formTitle={customFormTitle} />);
    
    const contactForm = screen.getByTestId("contact-form");
    expect(contactForm).toBeInTheDocument();
    
    // Check that the custom form title is rendered in the form
    const formHeading = contactForm.querySelector("h3");
    expect(formHeading).toBeInTheDocument();
    expect(formHeading).toHaveTextContent(customFormTitle);
  });

  it("uses custom section titles when provided", () => {
    const customProps = {
      ...defaultProps,
      sectionTitle: "Custom Contact Title",
      sectionSubtitle: "Custom subtitle",
      contactInfoTitle: "Custom Info Title",
      formTitle: "Custom Form Title",
    };
    
    render(<ContactSection {...customProps} />);
    
    expect(screen.getByText("Custom Contact Title")).toBeInTheDocument();
    expect(screen.getByText("Custom subtitle")).toBeInTheDocument();
    expect(screen.getByText("Custom Info Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Form Title")).toBeInTheDocument();
  });
}); 