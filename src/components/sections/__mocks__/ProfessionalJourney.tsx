import React from 'react';

interface ProfessionalJourneyProps {
  title?: string;
  description?: string;
}

export function ProfessionalJourney({ 
  title = "Professional Journey", 
  description = "My career path and experience" 
}: ProfessionalJourneyProps) {
  return (
    <section data-testid="professional-journey-section">
      <h2 data-testid="professional-journey-title">{title}</h2>
      <p data-testid="professional-journey-description">{description}</p>
      <div data-testid="professional-journey-timeline">
        <div data-testid="timeline-item-1">
          <h3 data-testid="timeline-title-1">Senior Developer</h3>
          <p data-testid="timeline-company-1">Tech Company</p>
          <p data-testid="timeline-period-1">2022 - Present</p>
        </div>
        <div data-testid="timeline-item-2">
          <h3 data-testid="timeline-title-2">Full-Stack Developer</h3>
          <p data-testid="timeline-company-2">Startup</p>
          <p data-testid="timeline-period-2">2020 - 2022</p>
        </div>
      </div>
    </section>
  );
} 