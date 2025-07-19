import React from 'react';

export type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TextVariant = 'default' | 'muted' | 'subtle';
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: HeadingSize;
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
}

export function Heading({ 
  children, 
  as: Component = 'h1', 
  className,
  ...props 
}: HeadingProps) {
  return (
    <Component
      className={className}
      data-testid="mock-heading"
      {...props}
    >
      {children}
    </Component>
  );
}

export function Text({ 
  children, 
  className,
  ...props 
}: TextProps) {
  return (
    <p
      className={className}
      data-testid="mock-text"
      {...props}
    >
      {children}
    </p>
  );
}

export const headingVariants = jest.fn();
export const textVariants = jest.fn(); 