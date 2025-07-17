import React from 'react';

export const ThemeToggle: React.FC = () => {
  return (
    <button 
      data-testid="theme-toggle"
      aria-label="Toggle theme"
    >
      🌙
    </button>
  );
} 