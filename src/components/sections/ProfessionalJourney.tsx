export interface ProfessionalJourneyProps {
  // Future props for timeline items will go here
}

interface Milestone {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string;
  achievement: string;
}

const milestones: Milestone[] = [
  {
    id: "1",
    date: "2023-Present",
    role: "Senior Full-Stack Developer",
    company: "TechCorp",
    description: "Leading development of enterprise-scale applications with modern tech stack. Mentoring junior developers and architecting scalable solutions.",
    achievement: "Team Lead"
  },
  {
    id: "2", 
    date: "2021-2023",
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    description: "Built MVP from ground up using React Native and Node.js. Implemented real-time features and optimized performance for mobile platforms.",
    achievement: "MVP Launch"
  },
  {
    id: "3",
    date: "2019-2021", 
    role: "Frontend Developer",
    company: "DevAgency",
    description: "Developed responsive web applications and collaborated with design teams. Focused on user experience and modern frontend frameworks.",
    achievement: "UI Redesign"
  }
];

export function ProfessionalJourney({}: ProfessionalJourneyProps = {}) {
  return (
    <section 
      className="py-20 bg-[#fafbfc] dark:bg-[#21262d]"
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
          
          {/* Milestone Cards */}
          <div className="space-y-8 md:space-y-0 md:space-x-8 md:flex md:justify-between">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="relative bg-[#ffffff] dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] p-4 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg"
                data-testid="milestone-card"
              >
                {/* Timeline Dot */}
                <div
                  className="absolute w-3 h-3 rounded-full bg-[#0969da] dark:bg-[#58a6ff] border-2 border-[#ffffff] dark:border-[#0d1117] -left-1.5 top-6 md:-top-1.5 md:left-1/2 md:-ml-1.5"
                  data-testid="timeline-dot"
                />
                
                <div className="space-y-2">
                  <div 
                    className="font-mono text-sm text-[#656d76] dark:text-[#8b949e]"
                    data-testid="milestone-date"
                  >
                    {milestone.date}
                  </div>
                  
                  <h3 
                    className="font-sans text-lg font-semibold text-[#24292f] dark:text-[#f0f6fc]"
                    data-testid="milestone-role"
                  >
                    {milestone.role}
                  </h3>
                  
                  <div 
                    className="font-sans text-base text-[#0969da] dark:text-[#58a6ff]"
                    data-testid="milestone-company"
                  >
                    {milestone.company}
                  </div>
                  
                  <p 
                    className="font-sans text-sm text-[#656d76] dark:text-[#8b949e]"
                    data-testid="milestone-description"
                  >
                    {milestone.description}
                  </p>
                  
                  <div 
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#f6f8fa] dark:bg-[#21262d] text-[#24292f] dark:text-[#f0f6fc]"
                    data-testid="achievement-badge"
                  >
                    {milestone.achievement}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 