"use client";

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { projectCardVariants, techBadgeVariants } from '@/lib/animation-variants';

export interface ProjectCardProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  title: string;
  description: string;
  technologies?: string[];
}

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
        // Background: #f6f8fa (light) / #21262d (dark)
        'bg-surface',
        // Border: 1px solid #d0d7de (light) / #30363d (dark)
        'border border-muted/20',
        // Border radius: rounded-lg
        'rounded-lg',
        // Padding: p-6
        'p-6',
        // Hover effect: shadow-lg transition-all duration-300
        'hover:shadow-lg transition-all duration-300',
        // Hover background: slightly lighter/darker
        'hover:bg-surface-light dark:hover:bg-surface-dark',
        className
      )}
      {...props}
    >
      <div className="space-y-4">
        {/* Project title: JetBrains Mono, text-xl, font-semibold */}
        <h3 className="font-mono text-xl font-semibold text-text">
          {title}
        </h3>
        
        {/* Project description: Inter, text-base, #656d76 (light) / #8b949e (dark) */}
        <p className="font-sans text-base text-muted">
          {description}
        </p>

        {/* Technology badges */}
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
                  // Background: #0969da (light) / #58a6ff (dark) - accent color
                  'bg-accent',
                  // Text color: white
                  'text-white',
                  // Font: JetBrains Mono, text-xs, font-medium
                  'font-mono text-xs font-medium',
                  // Padding: px-2 py-1
                  'px-2 py-1',
                  // Border radius: rounded-md
                  'rounded-md',
                  // Hover effect: Slightly darker background
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