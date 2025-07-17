import React from 'react';

export const Button = ({ children, ...props }: any) => React.createElement('button', { ...props, 'data-testid': 'button' }, children);
export const Card = ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'card' }, children);
export const CardHeader = ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'card-header' }, children);
export const CardContent = ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'card-content' }, children);
export const Badge = ({ children, ...props }: any) => React.createElement('span', { ...props, 'data-testid': 'badge' }, children);
export const Typography = ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'typography' }, children);
export const Section = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'section' }, children);
export const AnimatedSection = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'animated-section' }, children);
export const Typewriter = ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'typewriter' }, children);
export const ThemeToggle = ({ ...props }: any) => React.createElement('button', { ...props, 'data-testid': 'theme-toggle' });
export const ProgressBar = ({ ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'progress-bar' });
export const ProjectCard = ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'project-card' }, children); 