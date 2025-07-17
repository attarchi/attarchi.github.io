import { HeroSection, FeaturedProjects, TechnicalExpertise, ProfessionalJourney, ContactSection, BlogPreviewSection } from "@/components/sections";
import { ThemeToggle } from '@/components/ui';
import { getPublishedBlogPosts } from '@/lib/blog-data';

export default async function Home() {
  // Get real blog posts instead of using mock data
  const posts = await getPublishedBlogPosts();

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

      {/* Latest Blog Posts Section */}
      <BlogPreviewSection posts={posts} />

      {/* Contact Section */}
      <ContactSection
        status="Available for new opportunities"
        location="Istanbul, Turkey (UTC+3)"
        email="attarchi@me.com"
        linkedinUrl="https://linkedin.com/in/attarchi"
        githubUrl="https://github.com/attarchi"
        responseTime="Usually within 24 hours"
        availabilityType="Full-time, Contract, Consulting"
      />
    </div>
  );
}
