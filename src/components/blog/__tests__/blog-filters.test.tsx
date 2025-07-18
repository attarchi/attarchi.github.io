import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BlogFilters } from '../blog-filters';

const mockCategories = ['Technology', 'Development', 'Mobile'];
const mockContent = {
  placeholder: 'Search posts...',
  clearButtonText: 'Clear filters',
};
const mockProps = {
  categories: mockCategories,
  selectedCategory: '',
  onCategoryChange: jest.fn(),
  searchTerm: '',
  onSearchChange: jest.fn(),
  onClear: jest.fn(),
  showClear: false,
  content: mockContent,
};

describe('BlogFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input', () => {
    render(<BlogFilters {...mockProps} />);
    expect(screen.getByPlaceholderText('Search posts...')).toBeInTheDocument();
  });

  it('renders category badges', () => {
    render(<BlogFilters {...mockProps} />);
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();
  });

  it('calls onSearchChange when search input changes', () => {
    render(<BlogFilters {...mockProps} />);
    const searchInput = screen.getByPlaceholderText('Search posts...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(mockProps.onSearchChange).toHaveBeenCalledWith('test');
  });

  it('calls onCategoryChange when category badge is clicked', () => {
    render(<BlogFilters {...mockProps} />);
    const technologyBadge = screen.getByText('Technology');
    fireEvent.click(technologyBadge);
    expect(mockProps.onCategoryChange).toHaveBeenCalledWith('Technology');
  });

  it('deselects category when selected category is clicked', () => {
    render(<BlogFilters {...mockProps} selectedCategory="Technology" />);
    const technologyBadge = screen.getByText('Technology');
    fireEvent.click(technologyBadge);
    expect(mockProps.onCategoryChange).toHaveBeenCalledWith('');
  });

  it('shows clear button when showClear is true', () => {
    render(<BlogFilters {...mockProps} showClear={true} />);
    expect(screen.getByText('Clear filters')).toBeInTheDocument();
  });

  it('hides clear button when showClear is false', () => {
    render(<BlogFilters {...mockProps} showClear={false} />);
    expect(screen.queryByText('Clear filters')).not.toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', () => {
    render(<BlogFilters {...mockProps} showClear={true} />);
    const clearButton = screen.getByText('Clear filters');
    fireEvent.click(clearButton);
    expect(mockProps.onClear).toHaveBeenCalled();
  });

  it('displays search term in input', () => {
    render(<BlogFilters {...mockProps} searchTerm="test search" />);
    const searchInput = screen.getByPlaceholderText('Search posts...') as HTMLInputElement;
    expect(searchInput.value).toBe('test search');
  });

  it('highlights selected category badge', () => {
    render(<BlogFilters {...mockProps} selectedCategory="Technology" />);
    const technologyBadge = screen.getByText('Technology');
    expect(technologyBadge).toHaveClass('bg-accent', 'text-white');
  });
}); 