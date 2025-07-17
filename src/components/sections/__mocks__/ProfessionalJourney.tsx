import React, { useState } from 'react';

export interface ProfessionalMilestone {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string;
  achievement: string;
}

export interface ProfessionalJourneyProps {
  milestones?: ProfessionalMilestone[];
}

export function ProfessionalJourney({ milestones = [] }: ProfessionalJourneyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const defaultMilestones: ProfessionalMilestone[] = [
    {
      id: "1",
      date: "2022-Present",
      role: "Senior Developer",
      company: "Tech Company",
      description: "Leading development teams",
      achievement: "Team Lead"
    },
    {
      id: "2",
      date: "2020-2022",
      role: "Full-Stack Developer",
      company: "Startup",
      description: "Building web applications",
      achievement: "Full-Stack"
    }
  ];

  const displayMilestones = milestones.length > 0 ? milestones : defaultMilestones;
  const hasMultipleMilestones = displayMilestones.length > 3;
  const visibleCount = 3;
  const maxIndex = hasMultipleMilestones ? displayMilestones.length - visibleCount : 0;
  
  const getVisibleMilestones = () => {
    if (!hasMultipleMilestones) return displayMilestones;
    return displayMilestones.slice(currentIndex, currentIndex + visibleCount);
  };

  const nextSlide = () => {
    if (hasMultipleMilestones && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (hasMultipleMilestones && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToIndex = (index: number) => {
    if (hasMultipleMilestones && index >= 0 && index <= maxIndex) {
      setCurrentIndex(index);
    }
  };

  const visibleMilestones = getVisibleMilestones();
  const navigationDots = hasMultipleMilestones 
    ? Array.from({ length: maxIndex + 1 }, (_, index) => index)
    : [];

  return (
    <section data-testid="professional-journey-section" aria-label="Professional Journey">
      <div data-testid="professional-journey-container">
        <div className="flex items-center justify-between mb-8">
          <h2>Professional Journey</h2>
          
          {hasMultipleMilestones && (
            <div className="flex items-center space-x-2">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                data-testid="prev-slide-button"
                aria-label="Previous milestone"
              >
                ←
              </button>
              
              <div className="flex space-x-1" data-testid="slide-indicators">
                {navigationDots.map((dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => goToIndex(dotIndex)}
                    className={currentIndex === dotIndex ? 'bg-[#0969da]' : 'bg-[#d0d7de]'}
                    data-testid={`slide-indicator-${dotIndex}`}
                    aria-label={`Show milestones starting from position ${dotIndex + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                disabled={currentIndex === maxIndex}
                data-testid="next-slide-button"
                aria-label="Next milestone"
              >
                →
              </button>
            </div>
          )}
        </div>
        
        <div data-testid="timeline-container">
          <div data-testid="timeline-progress-bar" />
          <div data-testid="timeline-line" />
          <div data-testid="milestones-container">
            {visibleMilestones.map((milestone) => (
              <div key={milestone.id} data-testid="milestone-card">
                <div data-testid="timeline-dot" />
                <div data-testid="milestone-date">{milestone.date}</div>
                <h3 data-testid="milestone-role">{milestone.role}</h3>
                <div data-testid="milestone-company">{milestone.company}</div>
                <p data-testid="milestone-description">{milestone.description}</p>
                <div data-testid="achievement-badge">{milestone.achievement}</div>
              </div>
            ))}
          </div>
        </div>
        
        {hasMultipleMilestones && (
          <div className="mt-6 text-center">
            <span data-testid="slide-counter">
              Showing {currentIndex + 1}-{Math.min(currentIndex + visibleCount, displayMilestones.length)} of {displayMilestones.length}
            </span>
          </div>
        )}
      </div>
    </section>
  );
} 