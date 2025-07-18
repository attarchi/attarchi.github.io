import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import ThankYouPage from '../page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, initial, animate, transition, ...props }: any) => 
      <div {...props}>{children}</div>,
    svg: ({ children, variants, initial, animate, ...props }: any) => 
      <svg {...props}>{children}</svg>,
    path: ({ variants, ...props }: any) => <path {...props} />,
    h1: ({ children, variants, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, variants, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const mockPush = jest.fn();

describe('ThankYouPage', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockPush.mockClear();
  });

  it('renders thank you message', () => {
    render(<ThankYouPage />);
    
    expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    expect(screen.getByText(/message has been sent/i)).toBeInTheDocument();
  });

  it('renders animated green checkbox', () => {
    render(<ThankYouPage />);
    
    const checkmark = screen.getByTestId('success-checkmark');
    expect(checkmark).toBeInTheDocument();
    expect(checkmark).toHaveClass('text-green-500');
  });

  it('renders back to home link', () => {
    render(<ThankYouPage />);
    
    const backButton = screen.getByRole('button', { name: /back to home/i });
    expect(backButton).toBeInTheDocument();
  });

  it('uses proper typography fonts', () => {
    render(<ThankYouPage />);
    
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('font-mono');
  });

  it('follows design theme colors', () => {
    render(<ThankYouPage />);
    
    const container = screen.getByTestId('thank-you-container');
    expect(container).toHaveClass('bg-background');
    expect(container).toHaveClass('text-text');
  });

  it('has proper responsive layout', () => {
    render(<ThankYouPage />);
    
    const container = screen.getByTestId('thank-you-container');
    expect(container).toHaveClass('min-h-screen');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
  });
}); 