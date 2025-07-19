export interface IconData {
    name: string;
    alt?: string;
    size?: number;
    className?: string;
}

import iconManifest from './icon-manifest.json';

export interface IconConfig {
    iconManifest: Record<string, string>;
    defaultSize: number;
    defaultClassName: string;
}

export const iconConfig: IconConfig = {
    iconManifest,
    defaultSize: 24,
    defaultClassName: ""
}; 