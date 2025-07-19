import React from 'react';
import { CenteredTypewriterProps } from '../typewriter.types';

export function CenteredTypewriter({ 
  text, 
  speed = 50, 
  className,
  onComplete
}: CenteredTypewriterProps) {
  return (
    <div 
      className={className}
      data-testid="typewriter-container"
    >
      <span className="font-mono">
        {text.split('').map((char, index) => (
          <React.Fragment key={index}>
            <span
              className="transition-colors duration-75 text-current"
            >
              {char}
            </span>
            {index === text.length - 1 && (
              <span 
                data-testid="typewriter-cursor"
                className="animate-pulse text-current"
              >
                |
              </span>
            )}
          </React.Fragment>
        ))}
      </span>
    </div>
  );
} 