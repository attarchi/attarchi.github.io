import { HeroSection, FeaturedProjects, TechnicalExpertise, ProfessionalJourney, ContactSection, BlogPreviewSection } from "@/components/sections";
import { ThemeToggle } from '@/components/ui';
import { getPublishedBlogPosts } from '@/lib/blog-data';
import { heroContent, contactContent, professionalMilestones, projectsContent } from '@/content';

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
      <HeroSection {...heroContent} />

      {/* Featured Projects Section */}
      <FeaturedProjects projects={projectsContent.featured} />

      {/* Technical Expertise Section */}
      <TechnicalExpertise />

      {/* Professional Journey Section */}
      <ProfessionalJourney milestones={professionalMilestones} />

      {/* Latest Blog Posts Section */}
      <BlogPreviewSection posts={posts} />

      {/* Contact Section */}
      <ContactSection {...contactContent} />
    </div>
  );
}
