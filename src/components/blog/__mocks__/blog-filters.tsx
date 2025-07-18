import React from 'react';

interface BlogFiltersContent {
  placeholder: string;
  clearButtonText: string;
}

interface BlogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onClear: () => void;
  showClear: boolean;
  content: BlogFiltersContent;
}

export const BlogFilters: React.FC<BlogFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  onClear,
  showClear,
  content,
}) => {
  return (
    <div data-testid="blog-filters">
      <input
        data-testid="search-input"
        type="text"
        placeholder={content.placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div data-testid="category-badges">
        {categories.map((category) => (
          <button
            key={category}
            data-testid={`category-${category}`}
            onClick={() => onCategoryChange(selectedCategory === category ? '' : category)}
          >
            {category}
          </button>
        ))}
      </div>
      {showClear && (
        <button data-testid="clear-filters" onClick={onClear}>
          {content.clearButtonText}
        </button>
      )}
    </div>
  );
}; 