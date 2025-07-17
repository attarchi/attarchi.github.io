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

export interface MarkdownContent {
    content: string;
}

export interface MarkdownFrontmatter {
    [key: string]: any;
}

export interface ParsedMarkdown {
    content: string;
    frontmatter: MarkdownFrontmatter;
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

export interface AnimationVariants {
    hidden: Record<string, any>;
    visible: Record<string, any>;
    hover?: Record<string, any>;
    tap?: Record<string, any>;
    exit?: Record<string, any>;
}

export interface SlideInVariants {
    left: AnimationVariants;
    right: AnimationVariants;
}

export interface TypewriterVariants extends AnimationVariants {
    typing: Record<string, any>;
}

export interface UseScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    disabled?: boolean;
}

export interface UseScrollAnimationReturn {
    ref: (node: Element | null) => void;
    isVisible: boolean;
    hasAnimated: boolean;
} 