import React from 'react';

export { Badge } from './Badge';
export { Button, buttonVariants } from './Button';
export { ThemeToggle } from './ThemeToggle';
export { Typewriter } from './Typewriter';

export const Card = ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'card' }, children);
export const CardHeader = ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'card-header' }, children);
export const CardContent = ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'card-content' }, children);
export const Typography = ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'typography' }, children);
export const Section = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'section' }, children);
export const ProgressBar = ({ ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'progress-bar' });
export const ProjectCard = ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'project-card' }, children); 