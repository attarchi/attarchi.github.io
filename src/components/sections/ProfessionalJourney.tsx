'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { slideInVariants, scaleVariants } from '@/lib';
import { useTimelineProgress } from '@/lib/hooks';
import { type ProfessionalMilestone } from '@/content';
import { SlideNavigation } from '@/components/micro';

export interface ProfessionalJourneyProps {
  milestones?: ProfessionalMilestone[];
}

type ScreenSize = 'mobile' | 'medium' | 'large';

export function ProfessionalJourney({ milestones = [] }: ProfessionalJourneyProps) {
  const [screenSize, setScreenSize] = useState<ScreenSize>('large');
  const [isMounted, setIsMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'up' | 'down'>('right');
  const [isMouseOver, setIsMouseOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedMilestones = [...milestones].sort((a, b) => {
    const getYear = (date: string) => {
      const year = date.split('-')[0];
      return parseInt(year);
    };
    return getYear(a.date) - getYear(b.date);
  });

  const hasMultipleMilestones = sortedMilestones.length > 3;
  
  const getVisibleCount = (size: ScreenSize) => {
    switch (size) {
      case 'mobile': return 2;
      case 'medium': return 2;
      case 'large': return 3;
      default: return 3;
    }
  };
  
  const visibleCount = getVisibleCount(screenSize);
  const maxIndex = hasMultipleMilestones ? sortedMilestones.length - visibleCount : 0;

  const getVisibleMilestones = useCallback(() => {
    if (!hasMultipleMilestones) return sortedMilestones;
    return sortedMilestones.slice(currentIndex, currentIndex + visibleCount);
  }, [currentIndex, visibleCount, sortedMilestones, hasMultipleMilestones]);

  const nextSlide = useCallback(() => {
    if (hasMultipleMilestones && currentIndex < maxIndex) {
      setSlideDirection(screenSize === 'mobile' ? 'up' : 'left');
      setCurrentIndex(prev => prev + 1);
      return true; // Indicate successful advancement
    }
    return false; // Indicate no advancement possible
  }, [currentIndex, maxIndex, hasMultipleMilestones, screenSize]);

  const prevSlide = useCallback(() => {
    if (hasMultipleMilestones && currentIndex > 0) {
      setSlideDirection(screenSize === 'mobile' ? 'down' : 'right');
      setCurrentIndex(prev => prev - 1);
      return true; // Indicate successful advancement
    }
    return false; // Indicate no advancement possible
  }, [currentIndex, hasMultipleMilestones, screenSize]);

  const goToIndex = useCallback((index: number) => {
    if (hasMultipleMilestones && index >= 0 && index <= maxIndex) {
      if (screenSize === 'mobile') {
        setSlideDirection(index > currentIndex ? 'up' : 'down');
      } else {
        setSlideDirection(index > currentIndex ? 'left' : 'right');
      }
      setCurrentIndex(index);
    }
  }, [currentIndex, maxIndex, hasMultipleMilestones, screenSize]);

  // Check if device supports touch (mobile/tablet)
  const isTouchDevice = useCallback(() => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  // Handle mouse wheel scroll hijacking
  const handleWheel = useCallback((event: WheelEvent) => {
    // Only hijack scroll on desktop, when mouse is over, and slideshow is active
    if (!hasMultipleMilestones || screenSize !== 'large' || !isMouseOver || isTouchDevice()) {
      return;
    }

    const deltaY = event.deltaY;
    let shouldPreventDefault = false;

    if (deltaY > 0) {
      // Scrolling down - try to go to next slide
      shouldPreventDefault = nextSlide();
    } else if (deltaY < 0) {
      // Scrolling up - try to go to previous slide
      shouldPreventDefault = prevSlide();
    }

    // Only prevent default scroll if we successfully advanced the slideshow
    if (shouldPreventDefault) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [hasMultipleMilestones, screenSize, isMouseOver, nextSlide, prevSlide, isTouchDevice]);

  // Mouse enter/leave handlers
  const handleMouseEnter = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const previousScreenSize = screenSize;
      let newScreenSize: ScreenSize;
      
      if (width < 768) {
        newScreenSize = 'mobile';
      } else if (width < 1024) {
        newScreenSize = 'medium';
      } else {
        newScreenSize = 'large';
      }
      
      setScreenSize(newScreenSize);
      
      // Reset index when switching between screen sizes to avoid out-of-bounds
      if (previousScreenSize !== newScreenSize) {
        setCurrentIndex(0);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [screenSize]);

  // Add wheel event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use passive: false to allow preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!hasMultipleMilestones) return;
      
      if (screenSize === 'mobile') {
        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault();
            prevSlide();
            break;
          case 'ArrowDown':
            event.preventDefault();
            nextSlide();
            break;
        }
      } else {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            prevSlide();
            break;
          case 'ArrowRight':
            event.preventDefault();
            nextSlide();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasMultipleMilestones, nextSlide, prevSlide, screenSize]);

  const milestoneThresholds = sortedMilestones.map((m, i) => ({
    ...m,
    progressThreshold: sortedMilestones.length === 1 ? 0 : i / (sortedMilestones.length - 1),
  }));

  const { ref, progress, activeMilestones } = useTimelineProgress({
    milestones: milestoneThresholds.map(m => ({ id: m.id, progressThreshold: m.progressThreshold })),
    triggerOnce: true,
  });

  const progressBarStyle = isMounted ? {
    height: screenSize === 'mobile' ? `${Math.round(progress * 100)}%` : '0%',
    width: screenSize !== 'mobile' ? `${Math.round(progress * 100)}%` : '0%',
  } : { height: '0%', width: '0%' };

  const visibleMilestones = getVisibleMilestones();

  // Animation variants for slideshow items
  const slideshowItemVariants = {
    enter: (direction: 'left' | 'right' | 'up' | 'down') => {
      switch (direction) {
        case 'left': return { x: 300, opacity: 0, scale: 0.8 };
        case 'right': return { x: -300, opacity: 0, scale: 0.8 };
        case 'up': return { y: 200, opacity: 0, scale: 0.8 };
        case 'down': return { y: -200, opacity: 0, scale: 0.8 };
        default: return { x: 300, opacity: 0, scale: 0.8 };
      }
    },
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: 'left' | 'right' | 'up' | 'down') => {
      switch (direction) {
        case 'left': return { x: -300, opacity: 0, scale: 0.8 };
        case 'right': return { x: 300, opacity: 0, scale: 0.8 };
        case 'up': return { y: -200, opacity: 0, scale: 0.8 };
        case 'down': return { y: 200, opacity: 0, scale: 0.8 };
        default: return { x: -300, opacity: 0, scale: 0.8 };
      }
    },
  };

  const getGridClasses = () => {
    switch (screenSize) {
      case 'mobile': return 'grid-cols-1';
      case 'medium': return 'grid-cols-2';
      case 'large': return 'grid-cols-3';
      default: return 'grid-cols-3';
    }
  };

  const getTimelineClasses = () => {
    return screenSize === 'mobile' 
      ? 'timeline-vertical' 
      : 'timeline-vertical md:timeline-horizontal';
  };

  return (
    <section 
      className="py-20 bg-[#fafbfc] dark:bg-[#21262d]"
      aria-label="Professional Journey"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="max-w-6xl mx-auto px-4"
        data-testid="professional-journey-container"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono text-[2rem] md:text-[2.5rem] font-semibold text-[#24292f] dark:text-[#f0f6fc]">
            Professional Journey
          </h2>
          
          {hasMultipleMilestones && screenSize !== 'mobile' && (
            <SlideNavigation
              currentIndex={currentIndex}
              maxIndex={maxIndex}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoToIndex={goToIndex}
              variant="desktop"
            />
          )}
        </div>
        
        <div 
          className={`relative mt-12 ${getTimelineClasses()}`}
          data-testid="timeline-container"
          ref={ref as any}
        >
          <motion.div
            data-testid="timeline-progress-bar"
            className={`absolute bg-[#0969da] dark:bg-[#58a6ff] ${
              screenSize === 'mobile' 
                ? 'left-4 top-0 w-0.5' 
                : 'left-4 top-0 w-0.5 md:left-0 md:top-4 md:h-0.5 md:w-full'
            }`}
            initial={{ 
              height: 0,
              width: 0
            }}
            animate={progressBarStyle}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div
            className={`absolute bg-[#d0d7de] dark:bg-[#30363d] ${
              screenSize === 'mobile'
                ? 'w-0.5 left-4 top-0 h-full'
                : 'w-0.5 bg-[#d0d7de] dark:bg-[#30363d] left-4 top-0 h-full md:left-0 md:top-4 md:w-full md:h-0.5'
            }`}
            data-testid="timeline-line"
          />
          
          <div className={`${hasMultipleMilestones ? 'overflow-hidden' : ''}`}>
            {hasMultipleMilestones ? (
              <div className={`grid gap-8 ${getGridClasses()}`} data-testid="milestones-container">
                <AnimatePresence custom={slideDirection} mode="popLayout">
                  {visibleMilestones.map((milestone, i) => {
                    const originalIndex = sortedMilestones.findIndex(m => m.id === milestone.id);
                    
                    return (
                      <motion.div
                        key={milestone.id}
                        layoutId={`milestone-${milestone.id}`}
                        className="relative bg-[#ffffff] dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] p-4 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg flex flex-col h-full"
                        data-testid="milestone-card"
                        custom={slideDirection}
                        variants={slideshowItemVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          y: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.3 },
                          scale: { duration: 0.3 },
                          layout: { duration: 0.4, ease: "easeInOut" }
                        }}
                      >
                        <div
                          className={`absolute w-3 h-3 rounded-full bg-[#0969da] dark:bg-[#58a6ff] border-2 border-[#ffffff] dark:border-[#0d1117] ${
                            screenSize === 'mobile'
                              ? '-left-1.5 top-6'
                              : '-left-1.5 top-6 md:-top-1.5 md:left-1/2 md:-ml-1.5'
                          }`}
                          data-testid="timeline-dot"
                        />
                        <div className="flex flex-col h-full">
                          <div 
                            className="font-mono text-sm text-[#656d76] dark:text-[#8b949e]"
                            data-testid="milestone-date"
                          >
                            {milestone.date}
                          </div>
                          <h3 
                            className="font-sans text-lg font-semibold text-[#24292f] dark:text-[#f0f6fc] leading-tight h-12 flex items-start"
                            data-testid="milestone-role"
                          >
                            {milestone.role}
                          </h3>
                          <div 
                            className="font-sans text-base text-[#0969da] dark:text-[#58a6ff]"
                            data-testid="milestone-company"
                          >
                            {milestone.company}
                          </div>
                          <p 
                            className="font-sans text-sm text-[#656d76] dark:text-[#8b949e] flex-grow mt-4"
                            data-testid="milestone-description"
                          >
                            {milestone.description}
                          </p>
                          <motion.div 
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#f6f8fa] dark:bg-[#21262d] text-[#24292f] dark:text-[#f0f6fc] mt-4"
                            data-testid="achievement-badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                          >
                            {milestone.achievement}
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                className="space-y-8 md:space-y-0 md:space-x-8 md:flex md:justify-between"
                data-testid="milestones-container"
              >
                {visibleMilestones.map((milestone, i) => {
                  const originalIndex = sortedMilestones.findIndex(m => m.id === milestone.id);
                  const isActive = activeMilestones.includes(milestone.id);
                  const slideDirection = originalIndex % 2 === 0 ? 'left' : 'right';
                  const slideVariants = slideInVariants[slideDirection] as any;
                  
                  return (
                    <motion.div
                      key={milestone.id}
                      className="relative bg-[#ffffff] dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] p-4 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg flex flex-col h-full"
                      data-testid="milestone-card"
                      variants={slideVariants}
                      initial="hidden"
                      animate={isActive ? "visible" : "hidden"}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: isActive ? originalIndex * 0.2 : 0
                      }}
                    >
                      <div
                        className={`absolute w-3 h-3 rounded-full bg-[#0969da] dark:bg-[#58a6ff] border-2 border-[#ffffff] dark:border-[#0d1117] ${
                          screenSize === 'mobile'
                            ? '-left-1.5 top-6'
                            : '-left-1.5 top-6 md:-top-1.5 md:left-1/2 md:-ml-1.5'
                        }`}
                        data-testid="timeline-dot"
                      />
                      <div className="flex flex-col h-full">
                        <div 
                          className="font-mono text-sm text-[#656d76] dark:text-[#8b949e]"
                          data-testid="milestone-date"
                        >
                          {milestone.date}
                        </div>
                        <h3 
                          className="font-sans text-lg font-semibold text-[#24292f] dark:text-[#f0f6fc] leading-tight h-12 flex items-start"
                          data-testid="milestone-role"
                        >
                          {milestone.role}
                        </h3>
                        <div 
                          className="font-sans text-base text-[#0969da] dark:text-[#58a6ff]"
                          data-testid="milestone-company"
                        >
                          {milestone.company}
                        </div>
                        <p 
                          className="font-sans text-sm text-[#656d76] dark:text-[#8b949e] flex-grow mt-4"
                          data-testid="milestone-description"
                        >
                          {milestone.description}
                        </p>
                        <motion.div 
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#f6f8fa] dark:bg-[#21262d] text-[#24292f] dark:text-[#f0f6fc] mt-4"
                          data-testid="achievement-badge"
                          variants={scaleVariants}
                          initial="hidden"
                          animate={isActive ? "visible" : "hidden"}
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: isActive ? (originalIndex * 0.2) + 0.3 : 0
                          }}
                        >
                          {milestone.achievement}
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
        
        {hasMultipleMilestones && screenSize === 'mobile' && (
          <div className="mt-8">
            <SlideNavigation
              currentIndex={currentIndex}
              maxIndex={maxIndex}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoToIndex={goToIndex}
              variant="mobile"
            />
          </div>
        )}
        
        {hasMultipleMilestones && (
          <div className="mt-6 text-center">
            <span className="text-sm text-[#656d76] dark:text-[#8b949e]" data-testid="slide-counter">
              Showing {currentIndex + 1}-{Math.min(currentIndex + visibleCount, sortedMilestones.length)} of {sortedMilestones.length}
            </span>
          </div>
        )}
      </div>
    </section>
  );
} 