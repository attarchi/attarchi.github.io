import React from 'react';

export const Card = ({ children, ...props }: any) => 
  React.createElement('div', { ...props, 'data-testid': 'card' }, children);

export const CardHeader = ({ children, ...props }: any) => 
  React.createElement('div', { ...props, 'data-testid': 'card-header' }, children);

export const CardTitle = ({ children, ...props }: any) => 
  React.createElement('h3', { ...props, 'data-testid': 'card-title' }, children);

export const CardDescription = ({ children, ...props }: any) => 
  React.createElement('p', { ...props, 'data-testid': 'card-description' }, children);

export const CardContent = ({ children, ...props }: any) => 
  React.createElement('div', { ...props, 'data-testid': 'card-content' }, children);

export const CardFooter = ({ children, ...props }: any) => 
  React.createElement('div', { ...props, 'data-testid': 'card-footer' }, children); 