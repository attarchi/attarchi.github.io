import React from 'react';

interface TechnicalExpertiseProps {
  title?: string;
  description?: string;
}

export function TechnicalExpertise({ 
  title = "Technical Expertise", 
  description = "Technologies and skills I work with" 
}: TechnicalExpertiseProps) {
  return (
    <section data-testid="technical-expertise-section">
      <h2 data-testid="technical-expertise-title">{title}</h2>
      <p data-testid="technical-expertise-description">{description}</p>
      <div data-testid="technical-expertise-grid">
        <div data-testid="expertise-category-1">
          <h3 data-testid="expertise-category-title-1">Frontend</h3>
          <ul data-testid="expertise-skills-1">
            <li data-testid="skill-react">React</li>
            <li data-testid="skill-nextjs">Next.js</li>
            <li data-testid="skill-typescript">TypeScript</li>
          </ul>
        </div>
        <div data-testid="expertise-category-2">
          <h3 data-testid="expertise-category-title-2">Backend</h3>
          <ul data-testid="expertise-skills-2">
            <li data-testid="skill-nodejs">Node.js</li>
            <li data-testid="skill-python">Python</li>
            <li data-testid="skill-postgresql">PostgreSQL</li>
          </ul>
        </div>
      </div>
    </section>
  );
} 