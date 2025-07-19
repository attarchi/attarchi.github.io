import { render, screen } from '@testing-library/react';
import { Icon } from '../Icon';

// Mock the icon manifest
jest.mock('@/content/icon', () => ({
  iconConfig: {
    iconManifest: {
      'mongodb': 'svg',
      'github': 'svg',
      'test-icon': 'png'
    },
    defaultSize: 24,
    defaultClassName: ""
  }
}));

describe('Icon', () => {
  it('should render an icon with correct extension from manifest', () => {
    render(<Icon name="mongodb" />);
    
    const img = screen.getByAltText('mongodb');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/icons/mongodb.svg');
  });

  it('should fallback to png when icon not in manifest', () => {
    render(<Icon name="unknown-icon" />);
    
    const img = screen.getByAltText('unknown-icon');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/icons/unknown-icon.png');
  });

  it('should use custom alt text when provided', () => {
    render(<Icon name="github" alt="GitHub Icon" />);
    
    const img = screen.getByAltText('GitHub Icon');
    expect(img).toBeInTheDocument();
  });

  it('should use custom size when provided', () => {
    render(<Icon name="mongodb" size={32} />);
    
    const img = screen.getByAltText('mongodb');
    expect(img).toHaveAttribute('width', '32');
    expect(img).toHaveAttribute('height', '32');
  });

  it('should use custom className when provided', () => {
    render(<Icon name="github" className="custom-class" />);
    
    const img = screen.getByAltText('github');
    expect(img).toHaveClass('custom-class');
  });
}); 