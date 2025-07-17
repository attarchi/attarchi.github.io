export interface ContactContent {
    status?: string | undefined;
    location?: string | undefined;
    email?: string | undefined;
    linkedinUrl?: string | undefined;
    githubUrl?: string | undefined;
    responseTime?: string | undefined;
    availabilityType?: string | undefined;
}

export const contactContent: ContactContent = {
    status: "Available for new opportunities",
    location: "Istanbul, Turkey (UTC+3)",
    email: "attarchi@me.com",
    linkedinUrl: "https://linkedin.com/in/attarchi",
    githubUrl: "https://github.com/attarchi",
    responseTime: "Usually within 24 hours",
    availabilityType: "Full-time, Contract, Consulting"
}; 