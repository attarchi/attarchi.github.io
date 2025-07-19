import React from 'react';

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  onComplete?: () => void;
}

export function Typewriter({ text, className = '', onComplete }: TypewriterProps) {
  React.useEffect(() => {
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);
  
  return <span className={className}>{text}</span>;
} 