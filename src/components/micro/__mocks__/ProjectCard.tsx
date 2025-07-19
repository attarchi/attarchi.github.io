import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies?: string[];
  className?: string;
}

export function ProjectCard({ 
  title, 
  description, 
  technologies,
  className,
  ...props 
}: ProjectCardProps) {
  return (
    <div 
      className={className}
      data-testid="project-card"
      {...props}
    >
      <h3 data-testid="project-title">{title}</h3>
      <p data-testid="project-description">{description}</p>
      {technologies && technologies.length > 0 && (
        <div data-testid="badges-container">
          <div data-testid="project-technologies">
          {technologies.map((tech, index) => (
              <span 
              key={index}
              data-testid="tech-badge"
              >
              {tech}
            </span>
          ))}
          </div>
        </div>
      )}
    </div>
  );
} 