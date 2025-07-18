import { ButtonVariant, ButtonSize } from "@/components/ui";

export interface CtaButton {
    text: string;
    link: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: string;
}

export interface HeroContent {
    title?: string;
    description?: string;
    location?: string;
    avatarAlt?: string;
    ctaButtons?: CtaButton[];
}

export const heroContent: HeroContent = {
    title: "Senior Full-Stack Developer & Problem Solver",
    description: "Crafting scalable web applications with modern technologies. Specializing in React, Node.js, and cloud-native architectures. Passionate about solving complex problems and delivering high-quality, maintainable code.",
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