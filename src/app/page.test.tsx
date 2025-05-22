import { render, screen } from '@/utils/test-utils';
import Home from './page';

describe('Home page', () => {
  it('renders Next.js logo and welcome text', () => {
    render(<Home />);
    expect(screen.getByAltText(/next\.js logo/i)).toBeInTheDocument();
    expect(screen.getByText(/get started by editing/i)).toBeInTheDocument();
  });
}); 