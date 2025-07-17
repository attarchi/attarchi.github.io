export interface HeroContent {
    title?: string | undefined;
    description?: string | undefined;
    location?: string | undefined;
    avatarSrc?: string | undefined;
    avatarAlt?: string | undefined;
    ctaPrimary?: {
        text: string;
        link: string;
    };
    ctaSecondary?: {
        text: string;
        link: string;
    };
    ctaTertiary?: {
        text: string;
        link: string;
    };
}

export const heroContent: HeroContent = {
    title: "Senior Full-Stack Developer & Problem Solver",
    description: "Crafting scalable web applications with modern technologies. Specializing in React, Node.js, and cloud-native architectures. Passionate about solving complex problems and delivering high-quality, maintainable code.",
    location: "Istanbul, Turkey • Remote Worldwide",
    avatarSrc: "/avatar.png",
    avatarAlt: "Profile picture",
    ctaPrimary: {
        text: "Contact Me",
        link: "#contact"
    },
    ctaSecondary: {
        text: "View Projects",
        link: "#projects"
    }
}; 