"use client";

import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Heading, Text } from "@/components/micro";
import { slideUpVariants, staggerVariants } from "@/lib";
import { useState, useRef, useEffect } from "react";

export interface ContactFormProps {
  formTitle?: string;
  formspreeId?: string;
  successMessage?: string;
}

export function ContactForm({
  formTitle = "Send a Message",
  formspreeId = "mpwlwpnw", // Default Formspree ID, should be replaced with actual one
  successMessage = "Thanks for your message! I'll get back to you soon.",
}: ContactFormProps) {
  const [state, handleSubmit] = useForm(formspreeId || "");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isRecaptchaLoading, setIsRecaptchaLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [pendingSubmission, setPendingSubmission] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle form submission after reCAPTCHA token is set
  useEffect(() => {
    if (pendingSubmission && recaptchaToken && formRef.current) {
      setPendingSubmission(false);
      setIsRecaptchaLoading(false);
      
      // Create a proper form submission event
      const submitEvent = {
        preventDefault: () => {},
        currentTarget: formRef.current,
        target: formRef.current,
      } as unknown as React.FormEvent<HTMLFormElement>;
      
      handleSubmit(submitEvent);
    }
  }, [pendingSubmission, recaptchaToken, handleSubmit]);

  const onSubmitWithReCaptcha = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!executeRecaptcha) {
      console.warn('Execute recaptcha not available');
      handleSubmit(event);
      return;
    }

    setIsRecaptchaLoading(true);

    try {
      // Execute reCAPTCHA v3
      const token = await executeRecaptcha('contact_form');
      setRecaptchaToken(token);
      setPendingSubmission(true);
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      setIsRecaptchaLoading(false);
      // Still submit the form even if reCAPTCHA fails
      handleSubmit(event);
    }
  };

  if (state.succeeded) {
    return (
      <motion.div
        data-testid="contact-form-success"
        className="bg-white dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <Heading as="h3" size="h3" className="font-mono font-medium text-text">
            Message Sent!
          </Heading>
          <Text size="base" className="font-sans text-[#656d76] dark:text-[#8b949e]">
            {successMessage}
          </Text>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      data-testid="contact-form"
      className="bg-white dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] rounded-lg p-6 shadow-sm"
      variants={staggerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-6">
        <Heading as="h3" size="h3" className="font-mono font-medium text-text">
          {formTitle}
        </Heading>

        <motion.div
          variants={staggerVariants}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          <form ref={formRef} onSubmit={onSubmitWithReCaptcha} className="space-y-4">
            <motion.div variants={slideUpVariants}>
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
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </motion.div>

            <motion.div variants={slideUpVariants}>
              <label htmlFor="email" className="block font-sans text-sm font-medium mb-2 text-text">
                Email Address
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
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </motion.div>

            <motion.div variants={slideUpVariants}>
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
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </motion.div>

            {/* Hidden reCAPTCHA token field */}
            {recaptchaToken && (
              <input 
                type="hidden" 
                name="g-recaptcha-response" 
                value={recaptchaToken} 
              />
            )}

            <motion.div variants={slideUpVariants}>
              <button
                type="submit"
                data-testid="submit-button"
                disabled={state.submitting || isRecaptchaLoading}
                className="w-full bg-[#0969da] dark:bg-[#58a6ff] hover:bg-[#0550ae] dark:hover:bg-[#4493f8] text-white dark:text-[#0d1117] px-4 py-2 rounded-md font-medium font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-[#0969da] dark:focus:ring-[#58a6ff] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRecaptchaLoading 
                  ? "Verifying..." 
                  : state.submitting 
                  ? "Sending..." 
                  : "Send Message"
                }
              </button>
              
              {/* reCAPTCHA notice */}
              <div className="text-xs text-[#656d76] dark:text-[#8b949e] text-center mt-2">
                This site is protected by reCAPTCHA and the Google{' '}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0969da] dark:text-[#58a6ff] hover:underline"
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a 
                  href="https://policies.google.com/terms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0969da] dark:text-[#58a6ff] hover:underline"
                >
                  Terms of Service
                </a>{' '}
                apply.
              </div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
} 