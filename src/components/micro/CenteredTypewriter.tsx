"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib';
import { CenteredTypewriterProps } from './typewriter.types';

export function CenteredTypewriter({ 
  text, 
  speed = 50, 
  className,
  onComplete
}: CenteredTypewriterProps) {
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
    setDisplayText('');
    setIsTyping(false);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setIsTyping(true);
    }, 100);

    return () => clearTimeout(timer);
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
  const visibleLength = prefersReducedMotion ? text.length : displayText.length;

  return (
    <div 
      className={cn("inline-block", className)}
      data-testid="typewriter-container"
    >
      <span className="font-mono">
        {text.split('').map((char, index) => (
          <React.Fragment key={index}>
            <span
              className={cn(
                "transition-colors duration-75",
                index < visibleLength
                  ? "text-current"
                  : "text-transparent"
              )}
            >
              {char}
            </span>
            {showCursor && index === visibleLength - 1 && (
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