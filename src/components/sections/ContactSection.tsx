"use client";

import { motion } from "framer-motion";
import { Heading, Text, Badge, ContactForm } from "@/components/micro";
import { slideUpVariants, fadeVariants, staggerVariants, sectionVariants } from "@/lib";

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
  formspreeId?: string;
  successMessage?: string;
}

export function ContactSection({
  status,
  location,
  email,
  linkedinUrl,
  githubUrl,
  responseTime,
  availabilityType,
  sectionTitle,
  sectionSubtitle,
  contactInfoTitle,
  formTitle,
  formDescription,
  formspreeId,
  successMessage,
}: ContactSectionProps = {}) {
  return (
    <motion.section
      id="contact"
      className="py-20 bg-[#f6f8fa] dark:bg-[#0d1117]"
      aria-label="Contact section"
      data-testid="contact-section-animated"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Heading
            as="h2"
            size="h2"
            className="font-mono text-[2.5rem] md:text-[2.5rem] font-semibold text-text mb-4"
          >
            {sectionTitle}
          </Heading>
          <Text size="base" className="font-sans text-base text-text">
            {sectionSubtitle}
          </Text>
        </div>

        <div data-testid="contact-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            data-testid="contact-info-card"
            className="bg-white dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] rounded-lg p-6 shadow-sm"
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Heading as="h3" size="h3" className="font-mono font-medium text-text">
                  {contactInfoTitle}
                </Heading>
                <motion.div
                  variants={fadeVariants}
                  transition={{ delay: 0.8 }}
                >
                  <Badge 
                    data-testid="availability-badge"
                    variant="outline"
                    className="text-center bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                  >
                    {status}
                  </Badge>
                </motion.div>
              </div>

              <motion.div 
                className="space-y-4"
                variants={staggerVariants}
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                <motion.div 
                  className="flex items-center gap-3"
                  variants={slideUpVariants}
                  data-testid="email-contact"
                >
                  <div className="w-5 h-5 text-[#656d76] dark:text-[#8b949e]">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <Text size="sm" className="font-sans text-[#656d76] dark:text-[#8b949e]">Email</Text>
                    <Text size="base" className="font-sans text-text">{email}</Text>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3"
                  variants={slideUpVariants}
                  data-testid="linkedin-contact"
                >
                  <div className="w-5 h-5 text-[#656d76] dark:text-[#8b949e]">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <Text size="sm" className="font-sans text-[#656d76] dark:text-[#8b949e]">LinkedIn</Text>
                    <a 
                      href={linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#0969da] dark:hover:text-[#58a6ff] transition-colors"
                    >
                      <Text size="base" className="font-sans text-text">{linkedinUrl}</Text>
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3"
                  variants={slideUpVariants}
                  data-testid="github-contact"
                >
                  <div className="w-5 h-5 text-[#656d76] dark:text-[#8b949e]">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <Text size="sm" className="font-sans text-[#656d76] dark:text-[#8b949e]">GitHub</Text>
                    <a 
                      href={githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#0969da] dark:hover:text-[#58a6ff] transition-colors"
                    >
                      <Text size="base" className="font-sans text-text">{githubUrl}</Text>
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3"
                  variants={slideUpVariants}
                  data-testid="location-contact"
                >
                  <div className="w-5 h-5 text-[#656d76] dark:text-[#8b949e]">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <Text size="sm" className="font-sans text-[#656d76] dark:text-[#8b949e]">Location</Text>
                    <Text size="base" className="font-sans text-text">{location}</Text>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div 
              className="mt-6 p-4 bg-[#f6f8fa] dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-md"
              variants={fadeVariants}
              transition={{ delay: 1.0 }}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-[#656d76] dark:text-[#8b949e]">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <Text size="sm" className="font-sans text-[#656d76] dark:text-[#8b949e]">Response Time</Text>
                </div>
                <Text size="base" className="font-sans text-text">{responseTime}</Text>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-[#656d76] dark:text-[#8b949e]">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                  <Text size="sm" className="font-sans text-[#656d76] dark:text-[#8b949e]">Available for</Text>
                </div>
                <Text size="base" className="font-sans text-text">{availabilityType}</Text>
              </div>
            </motion.div>
          </motion.div>

          <ContactForm
            formTitle={formTitle}
            formspreeId={formspreeId}
            successMessage={successMessage}
          />
        </div>
      </div>
    </motion.section>
  );
} 