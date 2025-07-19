"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from "next/image";
import { Button, Text, Typewriter, CenteredTypewriter } from "@/components/micro";
import { HeroContent } from "@/content";
import avatarSrc from "../../../public/avatar.png";
interface HeroSectionProps extends HeroContent {
  className?: string;
}

const renderIcon = (iconName?: string) => {
  if (!iconName) return null;
  
  switch (iconName) {
    case "arrow-right":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      );
    default:
      return null;
  }
};

export function HeroSection({
  name,
  title,
  description,
  location,
  avatarAlt = "Profile picture",
  ctaButtons = [],
  className = "",
}: HeroSectionProps) {
  const [nameTypewriterComplete, setNameTypewriterComplete] = useState(false);
  const [titleTypewriterComplete, setTitleTypewriterComplete] = useState(false);

  const nameDelay = 0.8; // Start after avatar appears
  // Title now starts when name completes (conditional rendering)
  const locationDelay = 0.1; // Small delay after title completes
  const descriptionDelay = locationDelay + 0.4; // Start after location appears  
  const buttonDelay = descriptionDelay + 0.4; // Start after description

  const handleNameTypewriterComplete = () => {
    setNameTypewriterComplete(true);
  };

  const handleTitleTypewriterComplete = () => {
    setTitleTypewriterComplete(true);
  };

  return (
    <motion.section
      className={`w-full relative min-h-screen flex items-center justify-center overflow-hidden pt-16 !max-w-none !text-center !py-0 ${className}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <div className="container mx-auto max-w-6xl text-center space-y-6 px-4">
        {avatarSrc && (
          <motion.div 
            className="mb-8 relative w-32 h-32 mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src={avatarSrc}
              alt={avatarAlt}
              width={128}
              className="rounded-full object-cover border-4 border-accent"
              priority
            />
          </motion.div>
        )}

        {name && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: nameDelay }}
          >
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-accent mb-4" data-testid="hero-name">
              <Typewriter
                text={name}
                speed={80}
                className="font-mono text-3xl md:text-4xl font-bold text-accent"
                onComplete={handleNameTypewriterComplete}
              />
            </h2>
          </motion.div>
        )}

        
        {(nameTypewriterComplete || !name) && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="font-mono text-[2.5rem] md:text-[3.5rem] font-bold text-text" data-testid="hero-heading">
              <CenteredTypewriter
                text={title || ""}
                speed={50}
                className="font-mono text-[2.5rem] md:text-[3.5rem] font-bold text-text"
                onComplete={handleTitleTypewriterComplete}
                
              />
            </h1>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: (titleTypewriterComplete || !name) ? 1 : 0, 
            y: (titleTypewriterComplete || !name) ? 0 : 20 
          }}
          transition={{ 
            duration: 0.6, 
            delay: locationDelay,
            ease: "easeOut"
          }}
          className="bg-[#f6f8fa] dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] text-[#656d76] dark:text-[#8b949e] font-sans text-sm px-3 py-1 rounded-full inline-flex items-center"
        >
          📍 {location || "Available for remote opportunities"}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: (titleTypewriterComplete || !name) ? 1 : 0, 
            y: (titleTypewriterComplete || !name) ? 0 : 20 
          }}
          transition={{ 
            duration: 0.6, 
            delay: descriptionDelay,
            ease: "easeOut"
          }}
        >
          <Text size="base" className="mb-8 font-sans text-base font-normal text-text max-w-2xl mx-auto">
            {description}
          </Text>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: (titleTypewriterComplete || !name) ? 1 : 0 }}
          transition={{ duration: 0.5, delay: buttonDelay }}
        >
          {ctaButtons.map((cta, index) => (
            <motion.div
              key={`${cta.link}-${index}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ 
                opacity: (titleTypewriterComplete || !name) ? 1 : 0, 
                x: (titleTypewriterComplete || !name) ? 0 : 100 
              }}
              transition={{ 
                duration: 0.6, 
                delay: buttonDelay + (index * 0.1),
                ease: "easeOut"
              }}
            >
              <Button
                asChild
                variant={cta.variant || "default"}
                size={cta.size || "default"}
              >
                <Link href={cta.link} className="inline-flex items-center gap-2">
                  {cta.text}
                  {renderIcon(cta.icon)}
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <div
            data-testid="scroll-indicator"
            className="absolute bottom-8 animate-bounce text-[#656d76] dark:text-[#8b949e] font-sans text-sm"
          >
            Scroll to explore ↓
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 