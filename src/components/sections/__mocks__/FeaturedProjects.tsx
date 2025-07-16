import React from 'react';

interface FeaturedProjectsProps {
  title?: string;
  description?: string;
}

export function FeaturedProjects({ 
  title = "Featured Projects", 
  description = "Some of my recent work" 
}: FeaturedProjectsProps) {
  return (
    <section data-testid="featured-projects-section">
      <h2 data-testid="featured-projects-title">{title}</h2>
      <p data-testid="featured-projects-description">{description}</p>
      <div data-testid="featured-projects-grid">
        {/* Mock project cards */}
        <div data-testid="project-card-1">
          <h3 data-testid="project-title-1">E-Commerce Platform</h3>
          <p data-testid="project-description-1">Full-stack e-commerce solution</p>
        </div>
        <div data-testid="project-card-2">
          <h3 data-testid="project-title-2">Mobile App</h3>
          <p data-testid="project-description-2">Cross-platform mobile application</p>
        </div>
      </div>
    </section>
  );
} 