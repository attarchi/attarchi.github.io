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
} from "@/components/ui";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Test colors */}
      <div className="fixed top-4 left-4 flex flex-col gap-2">
        <div className="w-20 h-20 bg-background border border-text"></div>
        <div className="w-20 h-20 bg-accent"></div>
        <div className="w-20 h-20 bg-muted"></div>
        <div className="w-20 h-20 bg-surface"></div>
      </div>
     
      <Section spacing="lg" maxWidth="4xl" align="center" className="row-start-2 w-full flex flex-col gap-12 items-center mt-8">
        <Heading as="h2" size="h2" className="mb-2 text-accent">UI Component Showcase</Heading>
        <div className="flex flex-wrap gap-8 justify-center w-full">
          <div className="flex flex-col gap-2 items-center">
            <Text weight="bold" className="text-accent">Badges</Text>
            <div className="flex gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Text weight="bold" className="text-accent">Buttons</Text>
            <div className="flex gap-2 flex-wrap">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button isLoading>Loading</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 justify-center w-full">
          <div className="flex flex-col gap-2 items-center">
            <Text weight="bold" className="text-accent">Card</Text>
            <Card className="w-80 bg-surface">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here.</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>This is the card content area.</Text>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Text weight="bold" className="text-accent">Section</Text>
            <Section spacing="md" maxWidth="md" align="center" className="bg-surface rounded-lg p-4 w-80">
              <Heading as="h3" size="h4">Section Title</Heading>
              <Text>This is a section container with spacing and alignment.</Text>
            </Section>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          <Text weight="bold" className="text-accent">Typography</Text>
          <div className="flex flex-col gap-1 items-center w-full">
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

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-accent"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
      </footer>
    </div>
  );
}
