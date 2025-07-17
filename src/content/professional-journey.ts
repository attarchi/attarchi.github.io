export interface ProfessionalMilestone {
    id: string;
    date: string;
    role: string;
    company: string;
    description: string;
    achievement: string;
}

export const professionalMilestones: ProfessionalMilestone[] = [
    {
        id: "1",
        date: "2023-Present",
        role: "Senior Frontend Developer",
        company: "Innovative Tech Solutions",
        description: "Leading the development of modern web applications using React, TypeScript, and Next.js. Architecting scalable solutions and mentoring junior developers.",
        achievement: "Technical Lead"
    },
    {
        id: "2",
        date: "2021-2023",
        role: "Full-Stack Developer",
        company: "Digital Growth Agency",
        description: "Built comprehensive web solutions from concept to deployment. Specialized in React ecosystem and backend services with Node.js and PostgreSQL.",
        achievement: "Full-Stack Expertise"
    },
    {
        id: "3",
        date: "2019-2021",
        role: "Frontend Developer",
        company: "Creative Web Studio",
        description: "Developed responsive, user-centric web applications with focus on performance optimization and accessibility. Collaborated closely with UX/UI teams.",
        achievement: "Performance Optimization"
    }
]; 