import React from 'react';

interface ContactFormProps {
  formTitle?: string;
  successMessage?: string;
  formspreeId?: string;
  [key: string]: any;
}

export function ContactForm({ formTitle = "Send Message", ...props }: ContactFormProps) {
  return (
    <div data-testid="contact-form" {...props}>
      <h3>{formTitle}</h3>
      <form>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name"
          name="name"
          data-testid="name-input"
          required
        />
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email"
          name="email"
          data-testid="email-input"
          required
        />
        <label htmlFor="message">Message</label>
        <textarea 
          id="message"
          name="message"
          data-testid="message-textarea"
          required
        />
        <button type="submit" data-testid="submit-button">
          Send Message
        </button>
      </form>
    </div>
  );
} 