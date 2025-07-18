export interface FooterContent {
    copyright: {
        title: string;
        companyName: string;
        showcaseMessage: string;
    };
    repository: {
        title: string;
        url: string;
        text: string;
    };
    license: {
        title: string;
        name: string;
        description: string;
    };
    buildInfo: string;
}

export const footerContent: FooterContent = {
    copyright: {
        title: "Portfolio",
        companyName: "Attarchi",
        showcaseMessage: "This is a showcase project - use it freely!"
    },
    repository: {
        title: "Source Code",
        url: "https://github.com/attarchi/attarchi.github.io",
        text: "View on GitHub"
    },
    license: {
        title: "License",
        name: "MIT License",
        description: "Free to use for educational and commercial purposes."
    },
    buildInfo: "Built with Next.js, TypeScript, and Tailwind CSS. Deployed on GitHub Pages."
}; 