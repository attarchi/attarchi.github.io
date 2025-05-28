import { ProjectCard } from '@/components/ui';

const projects = [
  {
    title: "CCPTools Ecosystem",
    description: "Comprehensive nutrition platform with meal planning, recipe management, and nutritional analysis tools built with React and Node.js."
  },
  {
    title: "Portfolio Website", 
    description: "Modern portfolio built with Next.js, TypeScript, and Tailwind CSS featuring responsive design and dark mode support."
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard using React and Express."
  }
];

export function FeaturedProjects() {
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          data-testid="projects-grid"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 