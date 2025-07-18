import React from 'react';

export interface ContactSectionProps {
  status?: string;
  location?: string;
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  responseTime?: string;
  availabilityType?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  contactInfoTitle?: string;
  formTitle?: string;
  formDescription?: string;
}

export function ContactSection({ 
  sectionTitle = "Let's Work Together", 
  sectionSubtitle = "Available for exciting projects and opportunities",
  contactInfoTitle = "Contact Information",
  formTitle = "Send Message",
  status = "Available for new opportunities",
  email = "test@example.com",
  linkedinUrl = "https://linkedin.com/in/test",
  githubUrl = "https://github.com/test",
  location = "Test City",
  responseTime = "Within 24 hours",
  availabilityType = "Full-time",
}: ContactSectionProps = {}) {
  return (
    <section data-testid="contact-section" aria-label="Contact section">
      <h2 data-testid="contact-title">{sectionTitle}</h2>
      <p data-testid="contact-description">{sectionSubtitle}</p>
      
      <div data-testid="contact-grid">
        <div data-testid="contact-info-card">
          <h3>{contactInfoTitle}</h3>
          <div data-testid="availability-badge">{status}</div>
          <div data-testid="email-contact">
            <span>Email</span>
            <span>{email}</span>
          </div>
          <div data-testid="linkedin-contact">
            <span>LinkedIn</span>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">{linkedinUrl}</a>
          </div>
          <div data-testid="github-contact">
            <span>GitHub</span>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">{githubUrl}</a>
          </div>
          <div data-testid="location-contact">
            <span>Location</span>
            <span>{location}</span>
          </div>
          <div>
            <span>Response Time</span>
            <span>{responseTime}</span>
          </div>
          <div>
            <span>Available for</span>
            <span>{availabilityType}</span>
          </div>
        </div>
        
        <div data-testid="contact-form">
          <h3>{formTitle}</h3>
          <form>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              placeholder="Your name" 
              data-testid="contact-name-input"
              required
            />
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              placeholder="your.email@example.com" 
              data-testid="contact-email-input"
              required
            />
            <label htmlFor="message">Message</label>
            <textarea 
              id="message"
              name="message"
              placeholder="Message" 
              data-testid="contact-message-input"
              required
            />
            <button type="submit" data-testid="contact-submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
} 