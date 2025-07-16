import React from 'react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  return (
    <button 
      className={className}
      data-testid="theme-toggle"
      aria-label="Toggle theme"
    >
      🌙
    </button>
  );
} 