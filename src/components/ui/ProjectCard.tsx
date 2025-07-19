"use client";

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn, projectCardVariants, techBadgeVariants } from '@/lib';
import { Project } from '@/content';

export type ProjectCardProps = Project & Omit<HTMLMotionProps<"div">, "variants">;

export function ProjectCard({ 
  title, 
  description, 
  technologies,
  className, 
  ...props 
}: ProjectCardProps) {
  return (
    <motion.div
      variants={projectCardVariants}
      data-testid="project-card"
      className={cn(
        'bg-surface',
        'border border-muted/20',
        'rounded-lg',
        'p-6',
        'hover:shadow-lg transition-all duration-300',
        'hover:bg-surface-light dark:hover:bg-surface-dark',
        'flex flex-col h-full',
        className
      )}
      {...props}
    >
      <div className="flex flex-col h-full">
        <h3 className="font-mono text-xl font-semibold text-text leading-tight h-12 flex items-start">
          {title}
        </h3>
        
        <p className="font-sans text-base text-muted flex-grow mt-4">
          {description}
        </p>

        {technologies && technologies.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-2 mt-4"
            data-testid="badges-container"
            variants={techBadgeVariants}
          >
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                data-testid="tech-badge"
                className={cn(
                  'bg-accent',
                  'text-white',
                  'font-mono text-xs font-medium',
                  'px-2 py-1',
                  'rounded-md',
                  'hover:bg-accent-dark transition-colors duration-200'
                )}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 