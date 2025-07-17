import React from 'react';
import { CtaButton } from '@/content';

interface HeroSectionProps {
  title?: string;
  description?: string;
  location?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  ctaButtons?: CtaButton[];
  className?: string;
}

export function HeroSection({ 
  title, 
  description, 
  location, 
  avatarSrc, 
  avatarAlt, 
  ctaButtons = [],
  className
}: HeroSectionProps) {
  return (
    <section data-testid="hero-section" className={className}>
      <h1 data-testid="hero-heading">
        <div data-testid="typewriter-container">{title}</div>
      </h1>
      <p data-testid="hero-description">{description}</p>
      <span data-testid="hero-location">📍 {location}</span>
      {avatarSrc && (
        <img 
          src={avatarSrc} 
          alt={avatarAlt} 
          data-testid="hero-avatar"
          className="rounded-full object-cover border-4 border-accent"
        />
      )}
      <div data-testid="scroll-indicator">Scroll to explore ↓</div>
      {ctaButtons.map((cta, index) => (
        <a 
          key={`${cta.link}-${index}`}
          href={cta.link} 
          role="link" 
          data-testid={`cta-button-${index}`}
        >
          {cta.text}
        </a>
      ))}
    </section>
  );
} 