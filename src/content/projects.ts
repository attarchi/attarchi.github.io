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
            description: "Microservices platform with 6 interconnected projects serving 1000+ weekly active users. Features React Native mobile apps (iOS/Android) with offline-first PouchDB sync, and React admin panel with RJSF dynamic form generation.",
            technologies: ["React Native", "Node.js", "Next.js", "MongoDB", "Docker", "Kubernetes", "PouchDB/CouchDB", "RJSF"]
        },
        {
            title: "Healthcare Management Platform",
            description: "Enterprise platform digitizing workflows for 500+ clinics with 2000+ concurrent users. Built offline-first PWAs using jQuery, Ajax, and IndexedDB for mission-critical operations in low-connectivity regions.",
            technologies: ["ASP.NET", "C#", "jQuery", "Express.js", "SQL Server", "IndexedDB", "Ajax", "PWA"]
        },
        {
            title: "Telegram Bot Moderation System",
            description: "High-performance Windows Service handling 1,000 messages/second for 400+ group admins managing 500,000+ users. Features real-time content moderation, user management, and automated spam detection.",
            technologies: ["C#/.NET", "Windows Service", "Telegram API", "SQL Server", "Real-time Processing"]
        },
        {
            title: "ERP Form/Workflow Generator",
            description: "Dynamic form generation system enabling code-free customization for 6 organizations. Built form generators with runtime form creation, workflow automation, and database schema generation.",
            technologies: ["VB6", "C#", "ASP.NET", "Dynamic Form Generation", "Workflow Engine"]
        },
        {
            title: "GIS Digital Atlas Systems",
            description: "National mapping projects. Developed using MapObject2 with ArcGIS data models, featuring dynamic form generation for GIS data entry. First project to implement runtime form generation for complex geographical data management.",
            technologies: ["VB6", "MapObject2", "ArcGIS", "MS Access", "GIS"]
        },
        {
            title: "React Native Form Generator",
            description: "Formik-based form generator for React Native enabling dynamic form creation without coding. Integrates Yup validation, state management, and event handling.",
            technologies: ["React Native", "Formik", "Yup", "Preact", "WebView", "Quill Editor"]
        }
    ]
};