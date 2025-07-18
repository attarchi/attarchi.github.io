import React from 'react';

export { HeroSection } from './HeroSection';
export { FeaturedProjects } from './FeaturedProjects';
export { TechnicalExpertise } from './TechnicalExpertise';
export { ProfessionalJourney } from './ProfessionalJourney';
export { ContactSection } from './ContactSection';
export { Footer } from './Footer';
export const BlogPreviewSection = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'blog-preview-section' }, children); 