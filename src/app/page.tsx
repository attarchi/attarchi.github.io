import { HeroSection } from "@/components/sections";
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text">
      {/* Header with theme toggle */}
      <header className="fixed top-0 right-0 z-50 p-4">
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <HeroSection
        title="Senior Full-Stack Developer & Problem Solver"
        description="20+ years crafting scalable web applications with React, Node.js, and modern architectures"
        location="Istanbul, Turkey • Remote Worldwide"
        avatarSrc="/avatar.png"
        avatarAlt="Profile picture"
        ctaPrimary={{
          text: "Contact Me",
          link: "#contact"
        }}
        ctaSecondary={{
          text: "View Projects",
          link: "#projects"
        }}
        ctaTertiary={{
          text: "Download CV",
          link: "/cv.pdf"
        }}
      />
    </div>
  );
}
