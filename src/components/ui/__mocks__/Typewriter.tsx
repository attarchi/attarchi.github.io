import React from 'react';

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function Typewriter({ text, className = '' }: TypewriterProps) {
  return <span className={className}>{text}</span>;
} 