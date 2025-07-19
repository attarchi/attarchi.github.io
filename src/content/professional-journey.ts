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
        id: '1',
        date: '2023-Present',
        role: 'Senior Software Engineer',
        company: 'TechCorp',
        description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies.',
        achievement: 'Improved application performance by 40% through optimization and caching strategies.'
    },
    {
        id: '2',
        date: '2021-2023',
        role: 'Full Stack Developer',
        company: 'StartupXYZ',
        description: 'Built and maintained multiple client applications with focus on user experience and performance.',
        achievement: 'Reduced page load times by 60% through code splitting and lazy loading implementation.'
    },
    {
        id: '3',
        date: '2019-2021',
        role: 'Frontend Developer',
        company: 'DigitalAgency',
        description: 'Developed responsive web applications and collaborated with design teams on user interface improvements.',
        achievement: 'Implemented design system that increased development speed by 30% across the team.'
    },
    {
        id: '4',
        date: '2017-2019',
        role: 'Junior Developer',
        company: 'WebSolutions',
        description: 'Started career building websites and learning modern web development practices.',
        achievement: 'Successfully delivered 50+ client projects with 95% client satisfaction rate.'
    }
];