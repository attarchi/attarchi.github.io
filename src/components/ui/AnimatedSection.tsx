"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import {
  sectionVariants,
  slideUpVariants,
  slideInVariants,
  fadeVariants,
} from '@/lib/animation-variants';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: 'section' | 'slideUp' | 'slideIn' | 'fade';
  delay?: number;
  threshold?: number;
  className?: string;
  as?: 'section' | 'div' | 'article';
}

export function AnimatedSection({
  children,
  variant = 'section',
  delay = 0,
  threshold = 0.2,
  className,
  as = 'section',
  ...props
}: AnimatedSectionProps & React.HTMLAttributes<HTMLElement>) {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    rootMargin: '0px',
    triggerOnce: true,
    disabled: false,
  });

  // Get the appropriate animation variants based on the variant prop
  const getAnimationVariants = () => {
    switch (variant) {
      case 'slideUp':
        return slideUpVariants;
      case 'slideIn':
        return slideInVariants.left as any;
      case 'fade':
        return fadeVariants;
      case 'section':
      default:
        return sectionVariants;
    }
  };

  // Select the correct motion component
  let MotionComponent: any;
  switch (as) {
    case 'div':
      MotionComponent = motion.div;
      break;
    case 'article':
      MotionComponent = motion.article;
      break;
    case 'section':
    default:
      MotionComponent = motion.section;
      break;
  }

  return (
    <MotionComponent
      ref={ref}
      variants={getAnimationVariants()}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className={cn('w-full py-8 text-left bg-background', className)}
      {...props}
    >
      {children}
    </MotionComponent>
  );
} 