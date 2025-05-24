import Image from "next/image";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Section,
  Heading,
  Text,
  Hero,
} from "@/components/ui";
import { ThemeToggle } from '../components/ui/ThemeToggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Hero
        title="Senior Full-Stack Developer"
        description="Building modern web applications with React, Next.js, and TypeScript. Passionate about creating beautiful, performant, and accessible user experiences."
        location="San Francisco, CA"
        avatarSrc="/avatar.png"
        avatarAlt="Profile picture"
        ctaPrimary={{
          text: "Contact Me",
          link: "/contact",
        }}
        ctaSecondary={{
          text: "View Work",
          link: "/work",
        }}
      />

      <Section variant="surface" spacing="lg" className="border-b border-accent/20">
        <div className="container mx-auto flex justify-between items-center">
          <Heading as="h1" size="h2" className="text-accent">UI Component Showcase</Heading>
          <ThemeToggle />
        </div>
      </Section>

      <Section spacing="lg" maxWidth="4xl" align="center" className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Heading as="h2" size="h3" className="text-accent">Buttons</Heading>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button isLoading>Loading</Button>
            </div>
          </div>

          <div className="space-y-4">
            <Heading as="h2" size="h3" className="text-accent">Badges</Heading>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Card className="bg-surface">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text>This is the card content area with some example text to demonstrate the theme integration.</Text>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Section variant="accent" spacing="md" maxWidth="md" align="center" className="rounded-lg">
            <Heading as="h3" size="h4">Section Title</Heading>
            <Text>This is a section container with accent background and centered text.</Text>
          </Section>
        </div>

        <div className="mt-12">
          <Heading as="h2" size="h3" className="text-accent mb-6">Typography</Heading>
          <div className="space-y-4">
            <Heading as="h1" size="h1">Heading 1</Heading>
            <Heading as="h2" size="h2">Heading 2</Heading>
            <Heading as="h3" size="h3">Heading 3</Heading>
            <Heading as="h4" size="h4">Heading 4</Heading>
            <Heading as="h5" size="h5">Heading 5</Heading>
            <Heading as="h6" size="h6">Heading 6</Heading>
            <Text size="xl">Body text xl</Text>
            <Text size="lg">Body text lg</Text>
            <Text size="base">Body text base</Text>
            <Text size="sm">Body text sm</Text>
            <Text size="xs">Body text xs</Text>
            <Text variant="muted">Muted text</Text>
            <Text variant="subtle">Subtle text</Text>
            <Text weight="bold">Bold text</Text>
            <Text weight="semibold">Semibold text</Text>
            <Text weight="medium">Medium text</Text>
          </div>
        </div>
      </Section>

      <Section variant="surface" spacing="md" className="border-t border-accent/20">
        <div className="container mx-auto flex flex-wrap gap-6 items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-accent"
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-accent"
            href="https://vercel.com/templates"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-accent"
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </div>
      </Section>
    </div>
  );
}
