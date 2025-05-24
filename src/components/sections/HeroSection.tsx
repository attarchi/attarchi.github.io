import { Button } from "../ui/Button";
import { Heading, Text } from "../ui/Typography";
import { Section } from "../ui/Section";
import { Badge } from "../ui/Badge";
import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  description: string;
  location?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  ctaPrimary?: {
    text: string;
    link: string;
  };
  ctaSecondary?: {
    text: string;
    link: string;
  };
  ctaTertiary?: {
    text: string;
    link: string;
  };
  className?: string;
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
  return (
    <Section
      variant="surface"
      spacing="xl"
      maxWidth="none"
      className={`relative h-auto md:h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className="container mx-auto max-w-4xl text-center space-y-6">
        {avatarSrc && (
          <div className="mb-8 relative w-32 h-32 mx-auto">
            <Image
              src={avatarSrc}
              alt={avatarAlt}
              fill
              className="rounded-full object-cover border-4 border-accent"
              priority
            />
          </div>
        )}
        
        <Heading
          as="h1"
          size="h1"
          className="font-mono text-[2.5rem] md:text-[3.5rem] font-bold text-text"
        >
          {title}
        </Heading>

        <div className="bg-[#f6f8fa] dark:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] text-[#656d76] dark:text-[#8b949e] font-sans text-sm px-3 py-1 rounded-full inline-flex items-center">
          📍 {location || "Available for remote opportunities"}
        </div>

        <Text size="base" className="mb-8 font-sans text-base font-normal text-text max-w-2xl mx-auto">
          {description}
        </Text>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {ctaPrimary && (
            <Button
              asChild
              size="lg"
              className="inline-flex items-center gap-2"
            >
              <Link href={ctaPrimary.link}>
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
            </Button>
          )}

          {ctaSecondary && (
            <Button
              asChild
              variant="outline"
              size="lg"
            >
              <Link href={ctaSecondary.link}>
                {ctaSecondary.text}
              </Link>
            </Button>
          )}

          {ctaTertiary && (
            <Button
              asChild
              variant="ghost"
              size="lg"
            >
              <Link href={ctaTertiary.link}>
                {ctaTertiary.text}
              </Link>
            </Button>
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            data-testid="scroll-indicator"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </div>
      </div>
    </Section>
  );
} 