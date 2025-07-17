'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { slideInVariants, scaleVariants } from '@/lib';
import { useTimelineProgress } from '@/lib/hooks';
import { type ProfessionalMilestone } from '@/content';

export interface ProfessionalJourneyProps {
  milestones?: ProfessionalMilestone[];
}

export function ProfessionalJourney({ milestones = [] }: ProfessionalJourneyProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle responsive behavior safely
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sort milestones chronologically (oldest first)
  const sortedMilestones = [...milestones].sort((a, b) => {
    const getYear = (date: string) => {
      const year = date.split('-')[0];
      return parseInt(year);
    };
    return getYear(a.date) - getYear(b.date);
  });

  // For demo, assign progress thresholds evenly
  const milestoneThresholds = sortedMilestones.map((m, i) => ({
    ...m,
    progressThreshold: sortedMilestones.length === 1 ? 0 : i / (sortedMilestones.length - 1),
  }));
  const { ref, progress, activeMilestones } = useTimelineProgress({
    milestones: milestoneThresholds.map(m => ({ id: m.id, progressThreshold: m.progressThreshold })),
    triggerOnce: true,
  });

  // Calculate progress bar dimensions safely
  const progressBarStyle = isMounted ? {
    height: isMobile ? `${Math.round(progress * 100)}%` : '0%',
    width: !isMobile ? `${Math.round(progress * 100)}%` : '0%',
  } : { height: '0%', width: '0%' };

  return (
    <section 
      className="py-20 bg-[#fafbfc] dark:bg-[#21262d]"
      aria-label="Professional Journey"
    >
      <div 
        className="max-w-6xl mx-auto px-4"
        data-testid="professional-journey-container"
      >
        <h2 className="font-mono text-[2rem] md:text-[2.5rem] font-semibold text-[#24292f] dark:text-[#f0f6fc]">
          Professional Journey
        </h2>
        
        <div 
          className="relative mt-12 timeline-vertical md:timeline-horizontal"
          data-testid="timeline-container"
          ref={ref as any}
        >
          {/* Timeline progress bar */}
          <motion.div
            data-testid="timeline-progress-bar"
            className="absolute bg-[#0969da] dark:bg-[#58a6ff] left-4 top-0 w-0.5 md:left-0 md:top-4 md:h-0.5 md:w-full"
            initial={{ 
              height: 0,
              width: 0
            }}
            animate={progressBarStyle}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {/* Timeline line (background) */}
          <div
            className="absolute w-0.5 bg-[#d0d7de] dark:bg-[#30363d] left-4 top-0 h-full md:left-0 md:top-4 md:w-full md:h-0.5"
            data-testid="timeline-line"
          />
          {/* Milestone Cards */}
          <div className="space-y-8 md:space-y-0 md:space-x-8 md:flex md:justify-between">
            {milestoneThresholds.map((milestone, i) => {
              const isActive = activeMilestones.includes(milestone.id);
              const slideDirection = i % 2 === 0 ? 'left' : 'right';
              const slideVariants = slideInVariants[slideDirection] as any;
              
              return (
                <motion.div
                  key={milestone.id}
                  className="relative bg-[#ffffff] dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] p-4 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg"
                  data-testid="milestone-card"
                  variants={slideVariants}
                  initial="hidden"
                  animate={isActive ? "visible" : "hidden"}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: isActive ? i * 0.2 : 0
                  }}
                >
                  {/* Timeline Dot */}
                  <div
                    className="absolute w-3 h-3 rounded-full bg-[#0969da] dark:bg-[#58a6ff] border-2 border-[#ffffff] dark:border-[#0d1117] -left-1.5 top-6 md:-top-1.5 md:left-1/2 md:-ml-1.5"
                    data-testid="timeline-dot"
                  />
                  <div className="space-y-2">
                    <div 
                      className="font-mono text-sm text-[#656d76] dark:text-[#8b949e]"
                      data-testid="milestone-date"
                    >
                      {milestone.date}
                    </div>
                    <h3 
                      className="font-sans text-lg font-semibold text-[#24292f] dark:text-[#f0f6fc]"
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
                      className="font-sans text-sm text-[#656d76] dark:text-[#8b949e]"
                      data-testid="milestone-description"
                    >
                      {milestone.description}
                    </p>
                    <motion.div 
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#f6f8fa] dark:bg-[#21262d] text-[#24292f] dark:text-[#f0f6fc]"
                      data-testid="achievement-badge"
                      variants={scaleVariants}
                      initial="hidden"
                      animate={isActive ? "visible" : "hidden"}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: isActive ? (i * 0.2) + 0.3 : 0
                      }}
                    >
                      {milestone.achievement}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 