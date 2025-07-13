import { render, screen, waitFor } from "@testing-library/react";
import { HeroSection } from "../HeroSection";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, width, height, className } = props;
    return <img src={src} alt={alt} width={width} height={height} className={className} />;
  },
}));

describe("Hero", () => {
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
    expect(screen.queryByText("San Francisco, CA")).not.toBeInTheDocument();
    expect(screen.getByText("📍 San Francisco, CA")).toBeInTheDocument();
  });

  it("renders with avatar when provided", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        avatarSrc="/test-avatar.jpg"
        avatarAlt="Test Avatar"
      />
    );
    await screen.findByRole('heading', { level: 1 });
    const avatar = screen.getByAltText("Test Avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "/test-avatar.jpg");
  });

  it("renders with primary CTA button when provided", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        ctaPrimary={{
          text: "Contact Me",
          link: "/contact",
        }}
      />
    );
    await screen.findByRole('heading', { level: 1 });
    const ctaButton = screen.getByRole("link", { name: /contact me/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "/contact");
  });

  it("renders with secondary CTA button when provided", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        ctaSecondary={{
          text: "View Work",
          link: "/work",
        }}
      />
    );
    await screen.findByRole('heading', { level: 1 });
    const ctaButton = screen.getByRole("link", { name: /view work/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "/work");
  });

  it("renders both CTA buttons when both are provided", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        ctaPrimary={{
          text: "Contact Me",
          link: "/contact",
        }}
        ctaSecondary={{
          text: "View Work",
          link: "/work",
        }}
      />
    );
    await screen.findByRole('heading', { level: 1 });
    expect(screen.getByRole("link", { name: /contact me/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view work/i })).toBeInTheDocument();
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
    expect(scrollIndicator).toHaveClass("animate-bounce");
  });
}); 