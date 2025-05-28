import { ProjectCard } from '@/components/ui';

// Default project data
const defaultProjects = [
  {
    title: "CCPTools Ecosystem",
    description: "Comprehensive nutrition platform with meal planning, recipe management, and nutritional analysis tools.",
    technologies: ["React Native", "Node.js", "PostgreSQL"]
  },
  {
    title: "Multi-Tenant Nutrition Platform", 
    description: "Advanced nutrition platform with multi-tenant architecture and real-time data synchronization.",
    technologies: ["Next.js", "Prisma", "tRPC"]
  },
  {
    title: "Healthcare Management System",
    description: "Complete healthcare management solution with patient records, appointment scheduling, and billing.",
    technologies: ["React", "Express", "MongoDB"]
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
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          data-testid="projects-grid"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 