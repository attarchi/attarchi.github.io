import { render, screen } from "@testing-library/react";
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
  it("renders with required props", () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
      />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders with location badge when provided", () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        location="San Francisco, CA"
      />
    );

    // Location prop is ignored, old badge should not appear
    expect(screen.queryByText("San Francisco, CA")).not.toBeInTheDocument();
    
    // New location badge should show the location prop value with emoji
    expect(screen.getByText("📍 San Francisco, CA")).toBeInTheDocument();
  });

  it("renders with avatar when provided", () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        avatarSrc="/test-avatar.jpg"
        avatarAlt="Test Avatar"
      />
    );

    const avatar = screen.getByAltText("Test Avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "/test-avatar.jpg");
  });

  it("renders with primary CTA button when provided", () => {
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

    const ctaButton = screen.getByRole("link", { name: /contact me/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "/contact");
  });

  it("renders with secondary CTA button when provided", () => {
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

    const ctaButton = screen.getByRole("link", { name: /view work/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "/work");
  });

  it("renders both CTA buttons when both are provided", () => {
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

    expect(screen.getByRole("link", { name: /contact me/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view work/i })).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        className="custom-class"
      />
    );

    const section = screen.getByText("Test Title").closest("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders scroll indicator", () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
      />
    );

    const scrollIndicator = screen.getByTestId("scroll-indicator");
    expect(scrollIndicator).toBeInTheDocument();
    expect(scrollIndicator.parentElement).toHaveClass("animate-bounce");
  });
}); 