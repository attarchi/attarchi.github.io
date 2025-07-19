import { render, screen, waitFor } from "@testing-library/react";
import { HeroSection } from "@/components/sections";
import { CtaButton } from "@/content";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, width, height, className } = props;
    return <img src={src} alt={alt} width={width} height={height} className={className} />;
  },
}));

jest.mock("@/components/micro");

describe("HeroSection", () => {
  const defaultCtaButtons: CtaButton[] = [
    {
      text: "Contact Me",
      link: "/contact",
      variant: "default",
      size: "lg",
      icon: "arrow-right"
    },
    {
      text: "View Projects",
      link: "/projects",
      variant: "outline",
      size: "lg"
    }
  ];

  it("renders with required props", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
      />
    );
    const heading = await screen.findByRole('heading', { level: 1 });
    await waitFor(() => {
      expect(heading).toHaveTextContent("Test Title");
    });
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders with location badge when provided", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        location="San Francisco, CA"
      />
    );
    await screen.findByRole('heading', { level: 1 });
    expect(screen.getByText("📍 San Francisco, CA")).toBeInTheDocument();
  });

  it("renders with avatar when provided", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        avatarAlt="Test Avatar"
      />
    );
    await screen.findByRole('heading', { level: 1 });
    const avatar = screen.getByAltText("Test Avatar");
    expect(avatar).toBeInTheDocument();
  });

  it("renders CTA buttons from array", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        ctaButtons={defaultCtaButtons}
      />
    );
    await screen.findByRole('heading', { level: 1 });
    
    const contactButton = screen.getByRole("link", { name: /contact me/i });
    const projectsButton = screen.getByRole("link", { name: /view projects/i });
    
    expect(contactButton).toBeInTheDocument();
    expect(contactButton).toHaveAttribute("href", "/contact");
    expect(projectsButton).toBeInTheDocument();
    expect(projectsButton).toHaveAttribute("href", "/projects");
  });

  it("handles empty CTA buttons array", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        ctaButtons={[]}
      />
    );
    await screen.findByRole('heading', { level: 1 });
    
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("applies custom className", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        className="custom-class"
      />
    );
    const heading = await screen.findByRole('heading', { level: 1 });
    const section = heading.closest("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders scroll indicator", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
      />
    );
    await screen.findByRole('heading', { level: 1 });
    const scrollIndicator = screen.getByTestId("scroll-indicator");
    expect(scrollIndicator).toBeInTheDocument();
  });

  it("renders single CTA button", async () => {
    const singleCtaButton: CtaButton[] = [
      {
        text: "Single Button",
        link: "/single",
        variant: "default"
      }
    ];

    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        ctaButtons={singleCtaButton}
      />
    );
    await screen.findByRole('heading', { level: 1 });
    
    const button = screen.getByRole("link", { name: /single button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/single");
  });
}); 