import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('renders with children content', () => {
    render(<Badge>Test Badge</Badge>);
    const badge = screen.getByText('Test Badge');
    expect(badge).toBeInTheDocument();
  });

  it('renders with secondary variant', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toHaveClass('bg-surface');
  });

  it('renders with outline variant', () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    const badge = screen.getByText('Outline Badge');
    expect(badge).toHaveClass('border');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('maintains accessibility attributes', () => {
    render(<Badge role="status">Accessible Badge</Badge>);
    const badge = screen.getByRole('status');
    expect(badge).toBeInTheDocument();
  });

  it('passes through additional props', () => {
    render(<Badge data-testid="badge-test" aria-label="test badge">Test Badge</Badge>);
    const badge = screen.getByTestId('badge-test');
    expect(badge).toHaveAttribute('aria-label', 'test badge');
  });
}); 