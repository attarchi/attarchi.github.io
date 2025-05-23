import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>Test Badge</Badge>);
    const badge = screen.getByText('Test Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-accent');
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

  it('handles hover state', async () => {
    render(<Badge>Hover Badge</Badge>);
    const badge = screen.getByText('Hover Badge');
    await userEvent.hover(badge);
    expect(badge).toHaveClass('hover:bg-accent/80');
  });

  it('maintains accessibility attributes', () => {
    render(<Badge role="status">Accessible Badge</Badge>);
    const badge = screen.getByRole('status');
    expect(badge).toBeInTheDocument();
  });
}); 