import { HeroSection, FeaturedProjects, TechnicalExpertise, ProfessionalJourney, ContactSection, BlogPreviewSection } from "@/components/sections";
import { ThemeToggle } from '@/components/ui/ThemeToggle';

// Mock blog posts data - in a real app, this would come from a CMS or markdown files
const mockPosts = [
  {
    title: 'Building Offline-First Apps',
    slug: 'building-offline-first-apps',
    date: new Date('2025-01-15'),
    excerpt: 'Real-time synchronization strategies for mobile applications',
    tags: ['React Native', 'Offline', 'Sync'],
    category: 'Mobile Development',
    content: '',
    readingTime: 8,
    published: true
  },
  {
    title: 'Microservices Architecture Patterns',
    slug: 'microservices-architecture-patterns',
    date: new Date('2025-01-10'),
    excerpt: 'Best practices for designing scalable microservices',
    tags: ['Microservices', 'Architecture', 'Scalability'],
    category: 'Backend Development',
    content: '',
    readingTime: 12,
    published: true
  },
  {
    title: 'Modern CSS Techniques',
    slug: 'modern-css-techniques',
    date: new Date('2025-01-05'),
    excerpt: 'Advanced CSS features for modern web development',
    tags: ['CSS', 'Frontend', 'Web Development'],
    category: 'Frontend Development',
    content: '',
    readingTime: 6,
    published: true
  }
];

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

      {/* Latest Blog Posts Section */}
      <BlogPreviewSection posts={mockPosts} />

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
