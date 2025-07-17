"use client";

import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ui';
import { projectStaggerVariants } from '@/lib';

// Default project data
const defaultProjects = [
  {
    title: "CCPTools Ecosystem",
    description: "Microservices platform focused on construction cost planning and scalability. Features real-time calculations, mobile apps, and scalable backend architecture.",
    technologies: ["React Native", "Node.js", "PostgreSQL", "Docker", "Redis"]
  },
  {
    title: "Nutrition Management Platform",
    description: "Multi-tenant SaaS platform focused on scalable nutrition tracking with tenant isolation. Features real-time tracking, analytics, and production-ready architecture.",
    technologies: ["React", "NestJS", "PostgreSQL", "Redis", "TypeScript"]
  },
  {
    title: "Healthcare Management System",
    description: "HIPAA-Compliant Platform focused on patient management and compliance. Features HIPAA compliance, real-time monitoring, secure auth, and case study available.",
    technologies: ["Next.js", "Express", "MongoDB", "AWS", "TypeScript"]
  }
];

export interface Project {
  title: string;
  description: string;
  technologies: string[];
}

export interface FeaturedProjectsProps {
  projects?: Project[];
}

export function FeaturedProjects({ projects = defaultProjects }: FeaturedProjectsProps) {
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
          {projects.map((project, index) => (
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