"use client";

import React from 'react';
import { Badge, Button } from '@/components/micro';
import { blogFiltersContent } from '@/content';

interface BlogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onClear: () => void;
  showClear: boolean;
}

export const BlogFilters = React.memo(function BlogFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  onClear,
  showClear,
}: BlogFiltersProps) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder={blogFiltersContent.placeholder}
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 border border-muted rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Badge
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className={`cursor-pointer transition-colors ${selectedCategory === category ? 'bg-accent text-white' : 'text-accent hover:bg-accent hover:text-white'}`}
            onClick={() => onCategoryChange(selectedCategory === category ? '' : category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      {showClear && (
        <Button variant="outline" size="sm" onClick={onClear} className="text-muted hover:text-text">
          {blogFiltersContent.clearButtonText}
        </Button>
      )}
    </div>
  );
}); 