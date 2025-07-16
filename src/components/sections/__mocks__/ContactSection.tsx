import React from 'react';

interface ContactSectionProps {
  title?: string;
  description?: string;
}

export function ContactSection({ 
  title = "Get In Touch", 
  description = "Let's work together" 
}: ContactSectionProps) {
  return (
    <section data-testid="contact-section">
      <h2 data-testid="contact-title">{title}</h2>
      <p data-testid="contact-description">{description}</p>
      <form data-testid="contact-form">
        <input 
          type="text" 
          placeholder="Name" 
          data-testid="contact-name-input"
        />
        <input 
          type="email" 
          placeholder="Email" 
          data-testid="contact-email-input"
        />
        <textarea 
          placeholder="Message" 
          data-testid="contact-message-input"
        />
        <button type="submit" data-testid="contact-submit-button">
          Send Message
        </button>
      </form>
    </section>
  );
} 