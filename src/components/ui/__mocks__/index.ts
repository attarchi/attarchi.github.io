import React from 'react';

export * from './Badge';
export * from './Button';
export * from './Card';
export * from './ProgressBar';
export * from './ProjectCard';
export * from './ThemeToggle';
export * from './Typewriter';

export const Typography = ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'typography' }, children);
export const Section = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'section' }, children); 