export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Project {
    id: string;
    title: string;
    description: string;
    type: 'Microservices' | 'Hybrid' | 'Legacy Modernization';
    technologies: string[];
    highlights: string[];
    links: {
        github?: string;
        demo?: string;
        documentation?: string;
    };
    imageUrl?: string;
    architectureDiagram?: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    tags: string[];
    category: 'Technical Deep Dives' | 'Problem-Solving Stories' | 'Technology Insights' | 'Remote Work & Career';
    readingTime: number;
    author: string;
}

export interface Skill {
    name: string;
    category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools';
    proficiency: ProficiencyLevel;
    yearsOfExperience: number;
    icon?: string;
}

export interface TimelineEntry {
    period: string;
    title: string;
    company: string;
    description: string;
    achievements: string[];
    technologies: string[];
    location: string;
}

export interface ContactInfo {
    email: string;
    linkedin: string;
    github: string;
    location: string;
    availability: 'Available' | 'Unavailable' | 'Limited';
    timezone: string;
    preferredContactMethod: 'Email' | 'LinkedIn' | 'GitHub';
}

export interface SiteConfig {
    title: string;
    description: string;
    author: string;
    siteUrl: string;
    social: {
        github: string;
        linkedin: string;
        twitter?: string;
    };
    navigation: {
        label: string;
        href: string;
    }[];
} 