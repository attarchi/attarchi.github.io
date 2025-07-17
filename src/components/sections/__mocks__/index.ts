import React from 'react';

export { HeroSection } from './HeroSection';
export { FeaturedProjects } from './FeaturedProjects';
export const TechnicalExpertise = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'technical-expertise' }, children);
export const ProfessionalJourney = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'professional-journey' }, children);
export const ContactSection = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'contact-section' }, children);
export const BlogPreviewSection = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'blog-preview-section' }, children); 