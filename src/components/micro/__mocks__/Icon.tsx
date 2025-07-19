import React from 'react';
import { iconConfig } from "@/content/icon";

export interface IconProps {
  name: string;
  alt?: string;
  size?: number;
  className?: string;
}

export function Icon({ 
  name, 
  alt, 
  size = iconConfig.defaultSize, 
  className = iconConfig.defaultClassName 
}: IconProps) {
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