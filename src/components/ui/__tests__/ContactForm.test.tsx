import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock @formspree/react
jest.mock('@formspree/react', () => ({
  useForm: jest.fn(),
  ValidationError: jest.fn(() => null),
}));

// Mock react-google-recaptcha-v3
jest.mock('react-google-recaptcha-v3', () => ({
  useGoogleReCaptcha: jest.fn(),
}));

// Mock UI components - need to be before the import
jest.mock('../Typography', () => ({
  Heading: ({ children, as = 'h3', ...props }: any) => {
    const Element = as;
    return React.createElement(Element, props, children);
  },
  Text: ({ children, ...props }: any) => React.createElement('p', props, children),
}));

import { useForm } from '@formspree/react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { ContactForm } from '../ContactForm';
const mockUseForm = useForm as jest.MockedFunction<typeof useForm>;
const mockUseGoogleReCaptcha = useGoogleReCaptcha as jest.MockedFunction<typeof useGoogleReCaptcha>;

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
}));



describe('ContactForm', () => {
  const mockHandleSubmit = jest.fn();
  const mockReset = jest.fn();
  
  const defaultFormState: any = {
    submitting: false,
    succeeded: false,
    errors: null,
    result: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseForm.mockReturnValue([defaultFormState, mockHandleSubmit, mockReset]);
    mockUseGoogleReCaptcha.mockReturnValue({
      executeRecaptcha: jest.fn().mockResolvedValue('mock-recaptcha-token'),
    });
  });

  describe('Rendering', () => {
    it('renders the contact form with default props', () => {
      render(<ContactForm />);
      
      expect(screen.getByTestId('contact-form')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
      
      // Check that form title heading is present
      const heading = screen.getByTestId('contact-form').querySelector('h3');
      expect(heading).toBeInTheDocument();
    });

    it('renders with custom props', () => {
      const props = {
        formTitle: 'Custom Form Title',
        formspreeId: 'custom-id',
      };
      
      render(<ContactForm {...props} />);
      
      expect(screen.getByText('Custom Form Title')).toBeInTheDocument();
      expect(mockUseForm).toHaveBeenCalledWith('custom-id');
    });

    it('renders form inputs with correct attributes', () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByTestId('name-input');
      const emailInput = screen.getByTestId('email-input');
      const messageTextarea = screen.getByTestId('message-textarea');
      
      expect(nameInput).toHaveAttribute('type', 'text');
      expect(nameInput).toHaveAttribute('name', 'name');
      expect(nameInput).toBeRequired();
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('name', 'email');
      expect(emailInput).toBeRequired();
      
      expect(messageTextarea).toHaveAttribute('name', 'message');
      expect(messageTextarea).toBeRequired();
    });
  });

  describe('Form Submission', () => {
    it('calls handleSubmit when form is submitted', async () => {
      // Mock executeRecaptcha as available for this test
      mockUseGoogleReCaptcha.mockReturnValue({
        executeRecaptcha: jest.fn().mockResolvedValue('mock-recaptcha-token'),
      });
      
      render(<ContactForm />);
      
      const form = screen.getByTestId('contact-form').querySelector('form');
      fireEvent.submit(form!);
      
      // Wait for async reCAPTCHA execution and useEffect to complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it('shows loading state when submitting', () => {
      mockUseForm.mockReturnValue([
        { ...defaultFormState, submitting: true },
        mockHandleSubmit,
        mockReset
      ]);
      
      render(<ContactForm />);
      
      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toHaveTextContent('Sending...');
      expect(submitButton).toBeDisabled();
    });

    it('shows normal state when not submitting', () => {
      render(<ContactForm />);
      
      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toHaveTextContent('Send Message');
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Success State', () => {
    it('renders success message when form submission succeeds', () => {
      mockUseForm.mockReturnValue([
        { ...defaultFormState, succeeded: true },
        mockHandleSubmit,
        mockReset
      ]);
      
      render(<ContactForm />);
      
      expect(screen.getByTestId('contact-form-success')).toBeInTheDocument();
      expect(screen.getByText('Message Sent!')).toBeInTheDocument();
      
      // Check that success message paragraph is present
      const successParagraph = screen.getByTestId('contact-form-success').querySelector('p');
      expect(successParagraph).toBeInTheDocument();
      
      // Form should not be visible
      expect(screen.queryByTestId('name-input')).not.toBeInTheDocument();
    });

    it('renders custom success message', () => {
      mockUseForm.mockReturnValue([
        { ...defaultFormState, succeeded: true },
        mockHandleSubmit
      ]);
      
      const customMessage = 'Custom success message';
      render(<ContactForm successMessage={customMessage} />);
      
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles form with errors', () => {
      const formStateWithErrors: any = {
        ...defaultFormState,
        errors: [
          { field: 'email', message: 'Email is required' }
        ]
      };
      
      mockUseForm.mockReturnValue([formStateWithErrors, mockHandleSubmit]);
      
      render(<ContactForm />);
      
      // Form should still be rendered when there are errors
      expect(screen.getByTestId('contact-form')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels associated with inputs', () => {
      render(<ContactForm />);
      
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
    });

    it('has proper form structure', () => {
      render(<ContactForm />);
      
      const form = screen.getByTestId('contact-form').querySelector('form');
      expect(form).toBeInTheDocument();
      
      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('Styling and Classes', () => {
    it('applies correct CSS classes for styling', () => {
      render(<ContactForm />);
      
      const container = screen.getByTestId('contact-form');
      expect(container).toHaveClass('bg-white', 'dark:bg-[#21262d]');
      
      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toHaveClass('bg-[#0969da]', 'dark:bg-[#58a6ff]');
    });

    it('applies disabled styles when submitting', () => {
      mockUseForm.mockReturnValue([
        { ...defaultFormState, submitting: true },
        mockHandleSubmit
      ]);
      
      render(<ContactForm />);
      
      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });
  });

  describe('reCAPTCHA Integration', () => {
    it('renders reCAPTCHA privacy notice', () => {
      render(<ContactForm />);
      
      expect(screen.getByText(/This site is protected by reCAPTCHA/)).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    });

    it('handles form submission with reCAPTCHA when executeRecaptcha is available', async () => {
      const mockExecuteRecaptcha = jest.fn().mockResolvedValue('mock-token');
      mockUseGoogleReCaptcha.mockReturnValue({
        executeRecaptcha: mockExecuteRecaptcha,
      });

      render(<ContactForm />);
      
      const form = screen.getByTestId('contact-form').querySelector('form');
      fireEvent.submit(form!);

      expect(mockExecuteRecaptcha).toHaveBeenCalledWith('contact_form');
    });

    it('handles form submission gracefully when executeRecaptcha is not available', () => {
      mockUseGoogleReCaptcha.mockReturnValue({
        executeRecaptcha: undefined,
      });

      render(<ContactForm />);
      
      const form = screen.getByTestId('contact-form').querySelector('form');
      fireEvent.submit(form!);

      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
}); 