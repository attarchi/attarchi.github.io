export interface Project {
    title: string;
    description: string;
    technologies: string[];
}

export interface ProjectsContent {
    featured: Project[];
}

export const projectsContent: ProjectsContent = {
    featured: [
        {
            title: "CCPTools Ecosystem",
            description: "Microservices platform focused on construction cost planning and scalability. Features real-time calculations, mobile apps, and scalable backend architecture.",
            technologies: ["React Native", "Node.js", "PostgreSQL", "Docker", "Redis"]
        },
        {
            title: "Nutrition Management Platform",
            description: "Multi-tenant SaaS platform focused on scalable nutrition tracking with tenant isolation. Features real-time tracking, analytics, and production-ready architecture.",
            technologies: ["React", "NestJS", "PostgreSQL", "Redis", "TypeScript"]
        },
        {
            title: "Healthcare Management System",
            description: "HIPAA-Compliant Platform focused on patient management and compliance. Features HIPAA compliance, real-time monitoring, secure auth, and case study available.",
            technologies: ["Next.js", "Express", "MongoDB", "AWS", "TypeScript"]
        }
    ]
}; 