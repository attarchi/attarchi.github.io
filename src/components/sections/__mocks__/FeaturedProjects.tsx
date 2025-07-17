import React from 'react';

export interface FeaturedProjectsProps {
  projects?: Array<{
    title: string;
    description: string;
    technologies: string[];
  }>;
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section data-testid="featured-projects-section">
      <h2 data-testid="featured-projects-title">Featured Projects</h2>
      <div data-testid="featured-projects-grid">
        {projects?.map((project, index) => (
          <div key={index} data-testid={`project-card-${index}`}>
            <h3 data-testid={`project-title-${index}`}>{project.title}</h3>
            <p data-testid={`project-description-${index}`}>{project.description}</p>
            <div data-testid={`project-technologies-${index}`}>
              {project.technologies.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 