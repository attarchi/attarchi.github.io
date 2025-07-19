import React from 'react';
import { TypewriterProps } from '../typewriter.types';

export function Typewriter({ 
  text, 
  speed = 50, 
  className,
  onComplete
}: TypewriterProps) {
  return (
    <div 
      className={className}
      data-testid="typewriter-container"
    >
      <span className="font-mono">
        {text}
        <span 
          data-testid="typewriter-cursor"
          className="animate-pulse"
        >
          |
        </span>
      </span>
    </div>
  );
} 