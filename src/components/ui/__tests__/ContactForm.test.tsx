import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '../ContactForm';
import { useForm } from '@formspree/react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

// Mock the dependencies
jest.mock('@formspree/react');
jest.mock('react-google-recaptcha-v3');
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const mockUseForm = useForm as jest.MockedFunction<typeof useForm>;
const mockUseGoogleReCaptcha = useGoogleReCaptcha as jest.MockedFunction<typeof useGoogleReCaptcha>;

describe('ContactForm', () => {
  const mockHandleSubmit = jest.fn();
  const mockReset = jest.fn();
  
  const defaultFormState = {
    submitting: false,
    succeeded: false,
    errors: null,
    result: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock for useForm
    mockUseForm.mockReturnValue([
      defaultFormState,
      mockHandleSubmit,
      mockReset
    ]);
    
    // Default mock for useGoogleReCaptcha
    mockUseGoogleReCaptcha.mockReturnValue({
      executeRecaptcha: jest.fn().mockResolvedValue('mock-token'),
    });
  });

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<ContactForm />);
      
      expect(screen.getByTestId('contact-form')).toBeInTheDocument();
      expect(screen.getByText('Send a Message')).toBeInTheDocument();
      expect(screen.getByTestId('name-input')).toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
      expect(screen.getByTestId('message-textarea')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    it('renders with custom props', () => {
      render(
        <ContactForm 
          formTitle="Custom Form Title"
          formspreeId="custom-id"
          successMessage="Custom success message"
        />
      );
      
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
      await waitFor(() => {
        expect(mockHandleSubmit).toHaveBeenCalled();
      }, { timeout: 1000 });
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
        mockHandleSubmit,
        mockReset
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
      
      mockUseForm.mockReturnValue([formStateWithErrors, mockHandleSubmit, mockReset]);
      
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

      await waitFor(() => {
        expect(mockExecuteRecaptcha).toHaveBeenCalledWith('contact_form');
      });
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