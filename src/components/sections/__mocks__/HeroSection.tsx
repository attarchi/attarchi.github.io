import React from 'react';

interface HeroSectionProps {
  title: string;
  description: string;
  location: string;
  avatarSrc: string;
  avatarAlt: string;
  ctaPrimary?: { text: string; link: string };
  ctaSecondary?: { text: string; link: string };
}

export function HeroSection({ 
  title, 
  description, 
  location, 
  avatarSrc, 
  avatarAlt, 
  ctaPrimary, 
  ctaSecondary 
}: HeroSectionProps) {
  return (
    <section data-testid="hero-section">
      <h1 data-testid="hero-heading">
        <div data-testid="typewriter-container">{title}</div>
      </h1>
      <p data-testid="hero-description">{description}</p>
      <span data-testid="hero-location">{location}</span>
      <img 
        src={avatarSrc} 
        alt={avatarAlt} 
        data-testid="hero-avatar"
        className="rounded-full object-cover border-4 border-accent"
      />
      <div data-testid="scroll-indicator">Scroll to explore ↓</div>
      {ctaPrimary && (
        <a href={ctaPrimary.link} role="link" data-testid="cta-primary">
          {ctaPrimary.text}
        </a>
      )}
      {ctaSecondary && (
        <a href={ctaSecondary.link} role="link" data-testid="cta-secondary">
          {ctaSecondary.text}
        </a>
      )}
    </section>
  );
} 