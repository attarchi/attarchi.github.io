export interface TechnicalSkill {
    name: string;
    proficiency: number;
    years?: number;
}

export interface SkillCategory {
    title: string;
    skills?: TechnicalSkill[];
}

export interface TechnicalExpertiseContent {
    categories: SkillCategory[];
}

export const technicalExpertiseContent: TechnicalExpertiseContent = {
    categories: [
        {
            title: "Frontend",
            skills: [
                { name: "React", proficiency: 90, years: 5 },
                { name: "TypeScript", proficiency: 85, years: 4 },
                { name: "Next.js", proficiency: 80, years: 3 },
                { name: "React Native", proficiency: 85, years: 4 }
            ]
        },
        {
            title: "Backend",
            skills: [
                { name: "Node.js", proficiency: 90, years: 5 },
                { name: "Python", proficiency: 75, years: 3 },
                { name: "PostgreSQL", proficiency: 80, years: 4 },
                { name: "MongoDB", proficiency: 75, years: 3 }
            ]
        },
        {
            title: "DevOps",
            skills: [
                { name: "Docker", proficiency: 80, years: 3 },
                { name: "AWS", proficiency: 70, years: 2 },
                { name: "Kubernetes", proficiency: 65, years: 2 },
                { name: "CI/CD", proficiency: 80, years: 3 }
            ]
        },
        {
            title: "Mobile",
            skills: [
                { name: "React Native", proficiency: 85, years: 4 },
                { name: "iOS/Android", proficiency: 75, years: 3 },
                { name: "Expo", proficiency: 70, years: 2 }
            ]
        }
    ]
}; 