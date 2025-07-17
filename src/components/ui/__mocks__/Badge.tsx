import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline';
  children?: React.ReactNode;
}

export const Badge = ({ children, ...props }: BadgeProps) => 
  React.createElement('span', { ...props, 'data-testid': 'badge' }, children); 