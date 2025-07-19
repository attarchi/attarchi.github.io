export interface TechnicalSkill {
    name: string;
    proficiency: number;
    years?: number;
    icon?: string;
}

export interface SkillCategory {
    title: string;
    skills?: TechnicalSkill[];
    others?: Array<{ name: string; icon: string }>;
}

export interface TechnicalExpertiseContent {
    categories: SkillCategory[];
}

export const technicalExpertiseContent: TechnicalExpertiseContent = {
    categories: [
        {
            title: "Frontend",
            skills: [
                { name: "React", proficiency: 90, years: 7, icon: "react" },
                { name: "Next.js", proficiency: 85, years: 4, icon: "nextjs" },
                { name: "TypeScript", proficiency: 99, years: 7, icon: "typescript" },
                { name: "Blazor", proficiency: 70, years: 4, icon: "blazor" },
                { name: "Formik", proficiency: 90, years: 4, icon: "formik" },
            ],
            others: [
                { name: "JavaScript", icon: "javascript" },
                { name: "Chakra UI", icon: "chakra-ui" },
                { name: "Ant Design", icon: "antdesign" },
                { name: "RJSF", icon: "json-schema" },
                { name: "Preact Signals", icon: "preact" },
                { name: "Tailwind CSS", icon: "tailwind" },
                { name: "Bootstrap", icon: "bootstrap" }
            ]
        },
        {
            title: "Backend",
            skills: [
                { name: "Node.js", proficiency: 90, years: 8, icon: "nodejs" },
                { name: "C#/.NET", proficiency: 95, years: 14, icon: "csharp" },
                { name: "SQL Server", proficiency: 70, years: 15, icon: "sql" },
                { name: "MongoDB", proficiency: 80, years: 6, icon: "mongodb" },
                { name: "CouchDB", proficiency: 85, years: 3, icon: "couchdb" }
            ],
            others: [
                { name: "Prisma", icon: "prisma" },
                { name: "PouchDB", icon: "pouchdb" },
                { name: "PostgreSQL", icon: "postgresql" },
                { name: "Entity Framework", icon: "dotnet" },
                { name: "Express.js", icon: "express-js" },
                { name: "AJV", icon: "ajv" }
            ]
        },
        {
            title: "DevOps",
            skills: [
                { name: "Docker", proficiency: 85, years: 4, icon: "docker" },
                { name: "Kubernetes", proficiency: 30, years: 3, icon: "kubernetes" },
                { name: "CI/CD", proficiency: 50, years: 5, icon: "git" },
                { name: "Linux/Windows Server", proficiency: 90, years: 15, icon: "linux" },
                { name: "GitHub Actions", proficiency: 90, years: 8, icon: "github" }
            ],
            others: [
                { name: "Azure Pipelines", icon: "azure" },
                { name: "Sentry", icon: "sentry" },
                { name: "Redis", icon: "redis" },
                { name: "Vercel", icon: "vercel" },
                { name: "Helm Charts", icon: "helm" }
            ]
        },
        {
            title: "Mobile",
            skills: [
                { name: "React Native (Bare)", proficiency: 90, years: 3, icon: "react" },
                { name: "Expo", proficiency: 60, years: 1, icon: "expo" },
                { name: "React Navigation", proficiency: 90, years: 3, icon: "react-navigation" },
                { name: "Kotlin", proficiency: 20, years: 0.5, icon: "kotlin" },
                { name: "Swift", proficiency: 10, years: 0.5, icon: "swift" },
            ],
            others: [
                { name: "Java", icon: "java" },
                { name: "iOS", icon: "ios" },
                { name: "Android", icon: "android" },
            ]
        },
        {
            title: "Testing & Analytics",
            skills: [
                { name: "Jest", proficiency: 95, years: 7, icon: "jest" },
                { name: "Cypress", proficiency: 60, years: 2, icon: "cypress" },
                { name: "Google Analytics", proficiency: 70, years: 8, icon: "google-analytics" },
                { name: "E2E Testing", proficiency: 75, years: 3, icon: "testing" },
                { name: "Unit/Integration Testing", proficiency: 90, years: 10 },
                { name: "TDD", proficiency: 80, years: 5 }
            ],
            others: []
        },
        {
            title: "Legacy & Other",
            skills: [
                { name: "VB6", proficiency: 95, years: 6 },
                { name: "ASP.NET", proficiency: 85, years: 10 },
                { name: "jQuery", proficiency: 90, years: 12 },
                { name: "GIS/MapObject2", proficiency: 60, years: 3 },
                { name: "VBA", proficiency: 60, years: 10 },
                { name: "Ajax", proficiency: 75, years: 10 }
            ],
        }
    ]
};