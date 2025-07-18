export interface IconData {
    name: string;
    alt?: string;
    size?: number;
    className?: string;
}

export interface IconConfig {
    svgIcons: string[];
    defaultSize: number;
    defaultClassName: string;
}

export const iconConfig: IconConfig = {
    svgIcons: ['mongodb', 'github-mark'],
    defaultSize: 24,
    defaultClassName: ""
}; 