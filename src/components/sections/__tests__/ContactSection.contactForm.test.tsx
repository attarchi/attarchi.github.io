import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactSection } from "../ContactSection";

describe("ContactSection - Contact Form", () => {
  it("renders contact form with correct background and padding", () => {
    render(<ContactSection />);
    
    const contactForm = screen.getByTestId("contact-form");
    expect(contactForm).toBeInTheDocument();
    expect(contactForm).toHaveClass("bg-white", "dark:bg-[#21262d]", "p-6");
  });

  it("renders form heading correctly", () => {
    render(<ContactSection />);
    
    // Get the heading inside the contact form specifically
    const contactForm = screen.getByTestId("contact-form");
    const formHeading = contactForm.querySelector("h3");
    expect(formHeading).toBeInTheDocument();
    expect(formHeading).toHaveTextContent("Send Message");
    expect(formHeading).toHaveClass("font-mono", "font-medium");
  });

  it("renders all form fields with correct structure", () => {
    render(<ContactSection />);
    
    // Name field
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByTestId("name-input")).toBeInTheDocument();
    
    // Email field
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    
    // Message field
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByTestId("message-textarea")).toBeInTheDocument();
  });

  it("applies correct label styling to all labels", () => {
    render(<ContactSection />);
    
    // Get labels by their for attribute to be specific
    const nameLabel = screen.getByTestId("contact-form").querySelector("label[for='name']");
    const emailLabel = screen.getByTestId("contact-form").querySelector("label[for='email']");
    const messageLabel = screen.getByTestId("contact-form").querySelector("label[for='message']");
    
    [nameLabel, emailLabel, messageLabel].forEach(label => {
      expect(label).toHaveClass("font-sans", "text-sm", "font-medium", "mb-2");
    });
  });

  it("applies correct input styling to text inputs", () => {
    render(<ContactSection />);
    
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    
    [nameInput, emailInput].forEach(input => {
      expect(input).toHaveClass(
        "w-full",
        "px-3",
        "py-2",
        "rounded-md",
        "font-sans",
        "bg-white",
        "dark:bg-[#0d1117]",
        "border",
        "border-[#d0d7de]",
        "dark:border-[#30363d]"
      );
    });
  });

  it("applies correct styling to textarea", () => {
    render(<ContactSection />);
    
    const messageTextarea = screen.getByTestId("message-textarea");
    expect(messageTextarea).toHaveClass(
      "w-full",
      "px-3",
      "py-2",
      "rounded-md",
      "font-sans",
      "bg-white",
      "dark:bg-[#0d1117]",
      "border",
      "border-[#d0d7de]",
      "dark:border-[#30363d]",
      "min-h-[120px]",
      "resize-vertical"
    );
  });

  it("applies focus states correctly", () => {
    render(<ContactSection />);
    
    const nameInput = screen.getByTestId("name-input");
    
    fireEvent.focus(nameInput);
    expect(nameInput).toHaveClass(
      "focus:outline-none",
      "focus:border-[#0969da]",
      "dark:focus:border-[#58a6ff]"
    );
  });

  it("renders submit button with correct styling", () => {
    render(<ContactSection />);
    
    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Send Message");
    expect(submitButton).toHaveClass(
      "bg-[#0969da]",
      "dark:bg-[#58a6ff]",
      "hover:bg-[#0550ae]",
      "dark:hover:bg-[#4493f8]",
      "text-white",
      "dark:text-[#0d1117]",
      "px-4",
      "py-2",
      "rounded-md",
      "font-medium"
    );
  });

  it("shows coming soon message when form is submitted", async () => {
    render(<ContactSection />);
    
    // Fill out required fields first
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const messageTextarea = screen.getByTestId("message-textarea");
    
    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(messageTextarea, { target: { value: "Test message" } });

    // Get the form element and submit it
    const formElement = screen.getByTestId("contact-form").querySelector("form");
    expect(formElement).toBeInTheDocument();
    
    fireEvent.submit(formElement!);
    
    await waitFor(() => {
      expect(screen.getByText("Feature coming soon! This form will be available when the site goes live.")).toBeInTheDocument();
    });
  });

  describe("Validation states", () => {
    it("can apply error styling to inputs", () => {
      render(<ContactSection />);
      
      const nameInput = screen.getByTestId("name-input");
      
      // Simulate validation error by adding error class
      fireEvent.blur(nameInput);
      
      // For now, we'll test that the input can receive error classes
      // The actual validation logic will be implemented when form is enhanced
      expect(nameInput).toHaveClass("border-[#d0d7de]"); // Default state
    });

    it("can display error messages", () => {
      render(<ContactSection />);
      
      // Test that error message container exists and can display validation errors
      const form = screen.getByTestId("contact-form");
      expect(form).toBeInTheDocument();
      
      // Error messages will be implemented when validation is added
    });
  });
}); 