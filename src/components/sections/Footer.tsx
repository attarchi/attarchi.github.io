"use client";

import { motion } from "framer-motion";

export interface FooterContent {
  copyright: {
    title: string;
    companyName: string;
    showcaseMessage: string;
  };
  repository: {
    title: string;
    url: string;
    text: string;
  };
  license: {
    title: string;
    name: string;
    description: string;
  };
  buildInfo: string;
}

const footerVariants = {
  hidden: {
    opacity: 0,
    transform: "translateY(20px)"
  },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

interface FooterProps {
  content: FooterContent;
}

export function Footer({ content }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="py-12 bg-[#21262d] dark:bg-[#0d1117] text-white relative"
      role="contentinfo"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div 
        className="max-w-6xl mx-auto px-4"
        data-testid="footer-container"
      >
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
          data-testid="footer-content"
        >
          <div data-testid="footer-copyright">
            <h3 className="font-mono text-lg font-semibold mb-3 text-white">
              {content.copyright.title}
            </h3>
            <p className="font-sans text-sm text-gray-300">
              © {currentYear} {content.copyright.companyName}. All rights reserved.
            </p>
            <p className="font-sans text-sm text-gray-300 mt-1">
              {content.copyright.showcaseMessage}
            </p>
          </div>

          <div data-testid="footer-repository">
            <h3 className="font-mono text-lg font-semibold mb-3 text-white">
              {content.repository.title}
            </h3>
            <a
              href={content.repository.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-gray-300 hover:text-accent transition-colors duration-200 inline-flex items-center gap-2"
              aria-label="GitHub Repository"
            >
              <svg 
                className="w-4 h-4" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" 
                  clipRule="evenodd" 
                />
              </svg>
              {content.repository.text}
            </a>
          </div>

          <div data-testid="footer-license">
            <h3 className="font-mono text-lg font-semibold mb-3 text-white">
              {content.license.title}
            </h3>
            <p className="font-sans text-sm text-gray-300">
              Released under the{" "}
              <span className="font-sans font-medium text-white">{content.license.name}</span>
            </p>
            <p className="font-sans text-sm text-gray-300 mt-1">
              {content.license.description}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6">
          <p className="font-sans text-xs text-gray-400 text-center">
            {content.buildInfo}
          </p>
        </div>
      </div>
    </motion.footer>
  );
} 