"use client";

import { useState } from "react";
import { Heading, Text } from "../ui/Typography";
import { Badge } from "../ui/Badge";

export function ContactSection() {
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMessage(true);
    // Reset message after 5 seconds
    setTimeout(() => setShowMessage(false), 5000);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-[#f6f8fa] dark:bg-[#0d1117]"
      aria-label="Contact section"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Heading
            as="h2"
            size="h2"
            className="font-mono text-[2.5rem] md:text-[2.5rem] font-semibold text-text mb-4"
          >
            Let's Work Together
          </Heading>
          <Text size="base" className="font-sans text-base text-text">
            Available for exciting projects and opportunities
          </Text>
        </div>

        <div data-testid="contact-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div 
            data-testid="contact-info-card"
            className="bg-white dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] rounded-lg p-6 shadow-sm"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Heading as="h3" size="h3" className="font-mono font-medium text-text">
                  Contact Information
                </Heading>
                <Badge 
                  data-testid="availability-badge"
                  variant="outline"
                  className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                >
                  Available
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-[#656d76] dark:text-[#8b949e]">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <Text size="sm" className="font-sans text-[#656d76] dark:text-[#8b949e]">Email</Text>
                    <Text size="base" className="font-sans text-text">contact@example.com</Text>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-[#656d76] dark:text-[#8b949e]">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <Text size="sm" className="font-sans text-[#656d76] dark:text-[#8b949e]">LinkedIn</Text>
                    <Text size="base" className="font-sans text-text">linkedin.com/in/profile</Text>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-[#656d76] dark:text-[#8b949e]">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <Text size="sm" className="font-sans text-[#656d76] dark:text-[#8b949e]">GitHub</Text>
                    <Text size="base" className="font-sans text-text">github.com/username</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            data-testid="contact-form"
            className="bg-white dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] rounded-lg p-6 shadow-sm"
          >
            <div className="space-y-6">
              <Heading as="h3" size="h3" className="font-mono font-medium text-text">
                Send Message
              </Heading>

              {showMessage && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <Text size="sm" className="font-sans text-blue-700 dark:text-blue-400">
                    Feature coming soon! This form will be available when the site goes live.
                  </Text>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-sans text-sm font-medium mb-2 text-text">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    data-testid="name-input"
                    required
                    className="w-full px-3 py-2 rounded-md font-sans bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] focus:outline-none focus:border-[#0969da] dark:focus:border-[#58a6ff] text-text placeholder:text-[#656d76] dark:placeholder:text-[#8b949e]"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-sans text-sm font-medium mb-2 text-text">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    data-testid="email-input"
                    required
                    className="w-full px-3 py-2 rounded-md font-sans bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] focus:outline-none focus:border-[#0969da] dark:focus:border-[#58a6ff] text-text placeholder:text-[#656d76] dark:placeholder:text-[#8b949e]"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-sans text-sm font-medium mb-2 text-text">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    data-testid="message-textarea"
                    required
                    rows={5}
                    className="w-full px-3 py-2 rounded-md font-sans bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] focus:outline-none focus:border-[#0969da] dark:focus:border-[#58a6ff] text-text placeholder:text-[#656d76] dark:placeholder:text-[#8b949e] min-h-[120px] resize-vertical"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  data-testid="submit-button"
                  className="w-full bg-[#0969da] dark:bg-[#58a6ff] hover:bg-[#0550ae] dark:hover:bg-[#4493f8] text-white dark:text-[#0d1117] px-4 py-2 rounded-md font-medium font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-[#0969da] dark:focus:ring-[#58a6ff] focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 