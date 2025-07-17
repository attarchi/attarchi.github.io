"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button, Text, Typewriter } from "@/components/ui";
import { HeroContent } from "@/content";

interface HeroSectionProps extends HeroContent {
  className?: string | undefined;
}

export function HeroSection({
  title,
  description,
  location,
  avatarSrc,
  avatarAlt = "Profile picture",
  ctaPrimary,
  ctaSecondary,
  ctaTertiary,
  className = "",
}: HeroSectionProps) {
  const [typewriterComplete, setTypewriterComplete] = useState(false);

  // Calculate the total duration of typewriter animation
  const typewriterDuration = (title?.length || 0 * 50) / 1000; // 50ms per character
  const descriptionDelay = 0.4; // Start description 0.4s after location
  const buttonDelay = descriptionDelay + 0.4; // Start buttons 0.4s after description

  const handleTypewriterComplete = () => {
    setTypewriterComplete(true);
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
              fill
              className="rounded-full object-cover border-4 border-accent"
              priority
            />
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="font-mono text-[2.5rem] md:text-[3.5rem] font-bold text-text" data-testid="hero-heading">
            <Typewriter
              text={title || ""}
              speed={50}
              className="font-mono text-[2.5rem] md:text-[3.5rem] font-bold text-text"
              onComplete={handleTypewriterComplete}
            />
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: typewriterComplete ? 1 : 0, 
            y: typewriterComplete ? 0 : 20 
          }}
          transition={{ 
            duration: 0.6, 
            delay: 0.1,
            ease: "easeOut"
          }}
          className="bg-[#f6f8fa] dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] text-[#656d76] dark:text-[#8b949e] font-sans text-sm px-3 py-1 rounded-full inline-flex items-center"
        >
          📍 {location || "Available for remote opportunities"}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: typewriterComplete ? 1 : 0, 
            y: typewriterComplete ? 0 : 20 
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
          animate={{ opacity: typewriterComplete ? 1 : 0 }}
          transition={{ duration: 0.5, delay: buttonDelay }}
        >
          {ctaPrimary && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ 
                opacity: typewriterComplete ? 1 : 0, 
                x: typewriterComplete ? 0 : 100 
              }}
              transition={{ 
                duration: 0.6, 
                delay: buttonDelay + 0.1,
                ease: "easeOut"
              }}
            >
              <Link 
                href={ctaPrimary.link}
                className="bg-[#0969da] dark:bg-[#58a6ff] text-white font-sans font-medium px-4 py-2 rounded-md hover:bg-[#0860ca] dark:hover:bg-[#4493f8] inline-flex items-center gap-2 transition-colors"
              >
                {ctaPrimary.text}
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
              </Link>
            </motion.div>
          )}

          {ctaSecondary && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ 
                opacity: typewriterComplete ? 1 : 0, 
                x: typewriterComplete ? 0 : 100 
              }}
              transition={{ 
                duration: 0.6, 
                delay: buttonDelay + 0.2,
                ease: "easeOut"
              }}
            >
              <Link 
                href={ctaSecondary.link}
                className="bg-transparent border border-[#d0d7de] dark:border-[#30363d] text-[#24292f] dark:text-[#f0f6fc] font-sans font-medium px-4 py-2 rounded-md hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] inline-flex items-center transition-colors"
              >
                {ctaSecondary.text}
              </Link>
            </motion.div>
          )}

          {ctaTertiary && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ 
                opacity: typewriterComplete ? 1 : 0, 
                x: typewriterComplete ? 0 : 100 
              }}
              transition={{ 
                duration: 0.6, 
                delay: buttonDelay + 0.3,
                ease: "easeOut"
              }}
            >
              <Button
                asChild
                variant="ghost"
                size="lg"
              >
                <Link href={ctaTertiary.link}>
                  {ctaTertiary.text}
                </Link>
              </Button>
            </motion.div>
          )}
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