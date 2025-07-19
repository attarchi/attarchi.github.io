import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../Card';

describe('Card', () => {
  it('renders with children content', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('accepts different variant props', () => {
    const { rerender } = render(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText('Elevated')).toBeInTheDocument();

    rerender(<Card variant="ghost">Ghost</Card>);
    expect(screen.getByText('Ghost')).toBeInTheDocument();

    rerender(<Card variant="default">Default</Card>);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('renders with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  it('applies custom className to all components', () => {
    render(
      <Card className="custom-card">
        <CardHeader className="custom-header">
          <CardTitle className="custom-title">Title</CardTitle>
          <CardDescription className="custom-description">Description</CardDescription>
        </CardHeader>
        <CardContent className="custom-content">Content</CardContent>
        <CardFooter className="custom-footer">Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Title').parentElement).toHaveClass('custom-header');
    expect(screen.getByText('Title')).toHaveClass('custom-title');
    expect(screen.getByText('Description')).toHaveClass('custom-description');
    expect(screen.getByText('Content')).toHaveClass('custom-content');
    expect(screen.getByText('Footer')).toHaveClass('custom-footer');
  });


  it('passes through HTML attributes', () => {
    render(<Card role="article" data-testid="test-card">Card with attributes</Card>);
    const card = screen.getByTestId('test-card');
    expect(card).toHaveAttribute('role', 'article');
  });

  it('renders as a div element', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card.tagName).toBe('DIV');
  });
}); 