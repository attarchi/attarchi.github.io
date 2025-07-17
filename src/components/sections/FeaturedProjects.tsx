"use client";

import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ui';
import { projectStaggerVariants } from '@/lib';
import { type Project } from '@/content';

export interface FeaturedProjectsProps {
  projects?: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section 
      className="py-20 bg-[#ffffff] dark:bg-[#0d1117]"
      aria-label="Featured Projects"
    >
      <div 
        className="max-w-6xl mx-auto px-4"
        data-testid="featured-projects-container"
      >
        <h2 className="font-mono text-[2rem] md:text-[2.5rem] font-semibold text-[#24292f] dark:text-[#f0f6fc]">
          Featured Projects
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          data-testid="projects-grid"
          variants={projectStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {projects?.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
} 