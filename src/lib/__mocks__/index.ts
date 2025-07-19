export const cn = jest.fn((...inputs: any[]) => inputs.join(' '));

export const parseMarkdown = jest.fn();
export const extractFrontmatter = jest.fn();
export const calculateReadingTime = jest.fn();

export const sectionVariants = { hidden: {}, visible: {} };
export const staggerVariants = { hidden: {}, visible: {} };
export const projectStaggerVariants = { hidden: {}, visible: {} };
export const projectCardVariants = { hidden: {}, visible: {} };
export const techBadgeVariants = { hidden: {}, visible: {} };
export const slideUpVariants = { hidden: {}, visible: {} };
export const slideInVariants = { left: { hidden: {}, visible: {} }, right: { hidden: {}, visible: {} } };
export const scaleVariants = { hidden: {}, visible: {} };
export const fadeVariants = { hidden: {}, visible: {} };
export const categoryStaggerVariants = { hidden: {}, visible: {} };
export const categorySlideInVariants = { hidden: {}, visible: {} };
export const skillStaggerVariants = { hidden: {}, visible: {} };
export const skillFadeVariants = { hidden: {}, visible: {} };
export const proficiencyScaleVariants = { hidden: {}, visible: {} };
export const proficiencyFillVariants = { hidden: {}, visible: {} };
export const createCustomVariants = jest.fn();
export const createStaggerVariants = jest.fn();

import React from 'react';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => React.createElement('div', {}, children);
export const ThemeContext = { Provider: ThemeProvider, Consumer: ThemeProvider };
