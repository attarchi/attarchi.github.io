import React from 'react';

export const HeroSection = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'hero-section' }, children);
export const FeaturedProjects = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'featured-projects' }, children);
export const TechnicalExpertise = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'technical-expertise' }, children);
export const ProfessionalJourney = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'professional-journey' }, children);
export const ContactSection = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'contact-section' }, children);
export const BlogPreviewSection = ({ children, ...props }: any) => React.createElement('section', { ...props, 'data-testid': 'blog-preview-section' }, children); 