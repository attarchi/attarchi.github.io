import { ButtonVariant, ButtonSize } from "@/components/micro";

export interface CtaButton {
    text: string;
    link: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: string;
}

export interface HeroContent {
    name?: string;
    title?: string;
    description?: string;
    location?: string;
    avatarAlt?: string;
    ctaButtons?: CtaButton[];
}

export const heroContent: HeroContent = {
    name: "This Is Ryan",
    title: "Senior Full-Stack Developer & Problem Solver",
    description: "20+ years crafting scalable web applications with React, Node.js, C#, and modern architectures. Specializing in offline-first solutions and complex problem solving.",
    location: "Istanbul, Turkey • Remote Worldwide",
    avatarAlt: "Profile picture",
    ctaButtons: [
        {
            text: "Contact Me",
            link: "#contact",
            variant: "default",
            size: "lg",
            icon: "arrow-right"
        },
        {
            text: "View Projects",
            link: "#projects",
            variant: "outline",
            size: "lg"
        }
    ]
}; 