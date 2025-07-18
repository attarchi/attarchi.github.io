export interface TechnicalSkill {
    name: string;
    proficiency: number;
    years?: number;
    icon?: string;
}

export interface OtherSkill {
    name: string;
    icon: string;
}

export interface SkillCategory {
    title: string;
    skills?: TechnicalSkill[];
    others?: OtherSkill[];
}

export interface TechnicalExpertiseContent {
    categories: SkillCategory[];
}

export const technicalExpertiseContent: TechnicalExpertiseContent = {
    categories: [
        {
            title: "Frontend",
            skills: [
                { name: "React", proficiency: 90, years: 5, icon: "react" },
                { name: "TypeScript", proficiency: 85, years: 4 },
                { name: "Next.js", proficiency: 80, years: 3, icon: "nextjs" },
                { name: "React Native", proficiency: 85, years: 4, icon: "react" }
            ],
            others: [
                { name: "GitHub", icon: "github-mark" },
                { name: "Prisma", icon: "prisma" }
            ]
        },
        {
            title: "Backend",
            skills: [
                { name: "Node.js", proficiency: 90, years: 5, icon: "nodejs" },
                { name: "Python", proficiency: 75, years: 3 },
                { name: "PostgreSQL", proficiency: 80, years: 4, icon: "sql" },
                { name: "MongoDB", proficiency: 75, years: 3, icon: "mongodb" }
            ],
            others: [
                { name: "CouchDB", icon: "couchdb" },
                { name: "PouchDB", icon: "pouchdb" }
            ]
        },
        {
            title: "DevOps",
            skills: [
                { name: "Docker", proficiency: 80, years: 3, icon: "docker" },
                { name: "AWS", proficiency: 70, years: 2 },
                { name: "Kubernetes", proficiency: 65, years: 2 },
                { name: "CI/CD", proficiency: 80, years: 3, icon: "git" }
            ],
            others: [
                { name: "Git", icon: "git" }
            ]
        },
        {
            title: "Mobile",
            skills: [
                { name: "React Native", proficiency: 85, years: 4, icon: "react" },
                { name: "iOS/Android", proficiency: 75, years: 3, icon: "ios" },
                { name: "Expo", proficiency: 70, years: 2 }
            ],
            others: [
                { name: "Android", icon: "android" }
            ]
        }
    ]
}; 