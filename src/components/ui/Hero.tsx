"use client"

import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface CTAButton {
  label: string
  href: string
}

interface HeroProps {
  headline: string
  subtitle: string
  location: string
  avatarSrc?: string
  avatarAlt?: string
  ctaPrimary?: CTAButton
  ctaSecondary?: CTAButton
}

const Hero: FC<HeroProps> = ({
  headline,
  subtitle,
  location,
  avatarSrc,
  avatarAlt,
  ctaPrimary,
  ctaSecondary
}) => {
  return (
    <section 
      data-testid="hero-container"
      className="min-h-screen md:min-h-screen flex items-center justify-center px-4 py-16 md:py-24"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {avatarSrc && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Image
              src={avatarSrc}
              alt={avatarAlt || 'Professional headshot'}
              width={150}
              height={150}
              className="rounded-full mx-auto"
              priority
            />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          role="heading"
          aria-level={1}
        >
          {headline}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span className="text-lg md:text-xl text-muted">{subtitle}</span>
          <span className="px-3 py-1 bg-surface rounded-full text-sm font-medium">
            {location}
          </span>
        </motion.div>

        {(ctaPrimary || ctaSecondary) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {ctaPrimary && (
              <Link
                href={ctaPrimary.href}
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="px-6 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors"
              >
                {ctaSecondary.label}
              </Link>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          data-testid="scroll-indicator"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-1 h-3 bg-accent rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 