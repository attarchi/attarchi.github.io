export interface ProfessionalJourneyProps {
  // Future props for timeline items will go here
}

export function ProfessionalJourney({}: ProfessionalJourneyProps = {}) {
  return (
    <section 
      className="py-20 bg-[#fafbfc] dark:bg-[#0d1117]"
      aria-label="Professional Journey"
    >
      <div 
        className="max-w-6xl mx-auto px-4"
        data-testid="professional-journey-container"
      >
        <h2 className="font-mono text-[2rem] md:text-[2.5rem] font-semibold text-[#24292f] dark:text-[#f0f6fc]">
          Professional Journey
        </h2>
        
        <div 
          className="relative mt-12 timeline-vertical md:timeline-horizontal"
          data-testid="timeline-container"
        >
          {/* Timeline line */}
          <div
            className="absolute w-0.5 bg-[#d0d7de] dark:bg-[#30363d] left-4 top-0 h-full md:left-0 md:top-4 md:w-full md:h-0.5"
            data-testid="timeline-line"
          />
          
          {/* Timeline items will be added here in future iterations */}
        </div>
      </div>
    </section>
  );
} 