import { HeroSection, FeaturedProjects, TechnicalExpertise, ProfessionalJourney, ContactSection } from "@/components/sections";
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
        description="Crafting scalable web applications with modern technologies. Specializing in React, Node.js, and cloud-native architectures. Passionate about solving complex problems and delivering high-quality, maintainable code."
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
      />

      {/* Featured Projects Section */}
      <FeaturedProjects />

      {/* Technical Expertise Section */}
      <TechnicalExpertise />

      {/* Professional Journey Section */}
      <ProfessionalJourney />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
