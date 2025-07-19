export interface BlogPageContent {
    title: string;
    description: string;
    navigation: {
        homeLink: {
            text: string;
            ariaLabel: string;
        };
    };
}

export const blogPageContent: BlogPageContent = {
    title: "Blog",
    description: "Thoughts on software development, architecture, and technology.",
    navigation: {
        homeLink: {
            text: "← Home",
            ariaLabel: "Home"
        }
    }
}; 