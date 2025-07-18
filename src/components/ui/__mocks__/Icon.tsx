import React from 'react';

export interface IconProps {
  name: string;
  alt?: string;
  size?: number;
  className?: string;
}

export function Icon({ name, alt, size = 24, className = "" }: IconProps) {
  return (
    <img 
      src={`/icons/${name}.png`} 
      alt={alt || name} 
      width={size} 
      height={size} 
      className={className}
    />
  );
} 