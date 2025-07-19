"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({ 
  text, 
  speed = 50, 
  className,
  onComplete
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    setIsTyping(true);
  }, [text, prefersReducedMotion, onComplete]);
  useEffect(() => {
    if (!isTyping || prefersReducedMotion) {
      return;
    }

    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayText, text, speed, isTyping, prefersReducedMotion, onComplete]);

  const showCursor = !prefersReducedMotion && !isComplete;

  return (
    <div 
      className={cn("inline-block", className)}
      data-testid="typewriter-container"
    >
      <span className="font-mono">
        {prefersReducedMotion ? text : displayText}
        {showCursor && (
          <span 
            data-testid="typewriter-cursor"
            className="animate-pulse"
          >
            |
          </span>
        )}
      </span>
    </div>
  );
} 