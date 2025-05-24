import { render, screen } from "@testing-library/react";
import { Hero } from "../Hero";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe("Hero", () => {
  it("renders with required props", () => {
    render(
      <Hero
        title="Test Title"
        description="Test Description"
      />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders with location badge when provided", () => {
    render(
      <Hero
        title="Test Title"
        description="Test Description"
        location="San Francisco, CA"
      />
    );

    expect(screen.getByText("San Francisco, CA")).toBeInTheDocument();
  });

  it("renders with avatar when provided", () => {
    render(
      <Hero
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
      <Hero
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
      <Hero
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
      <Hero
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
      <Hero
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
      <Hero
        title="Test Title"
        description="Test Description"
      />
    );

    const scrollIndicator = screen.getByTestId("scroll-indicator");
    expect(scrollIndicator).toBeInTheDocument();
    expect(scrollIndicator.parentElement).toHaveClass("animate-bounce");
  });
}); 