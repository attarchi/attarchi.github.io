import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, className } = props;
    return <img src={src} alt={alt} className={className} />;
  },
}));

describe("HeroSection - Location Badge", () => {
  it("renders location badge with correct content", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
      />
    );
    await screen.findByRole('heading', { level: 1 });
    const locationBadge = await screen.findByText("📍 Available for remote opportunities");
    expect(locationBadge).toBeInTheDocument();
  });

  it("has correct background colors for light and dark themes", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
      />
    );
    await screen.findByRole('heading', { level: 1 });
    const locationBadge = await screen.findByText("📍 Available for remote opportunities");
    expect(locationBadge).toHaveClass("bg-[#f6f8fa]");
    expect(locationBadge).toHaveClass("dark:bg-[#21262d]");
  });

  it("has correct border styling", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
      />
    );
    await screen.findByRole('heading', { level: 1 });
    const locationBadge = await screen.findByText("📍 Available for remote opportunities");
    expect(locationBadge).toHaveClass("border");
    expect(locationBadge).toHaveClass("border-[#d0d7de]");
    expect(locationBadge).toHaveClass("dark:border-[#30363d]");
  });

  it("has correct text color styling", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
      />
    );
    await screen.findByRole('heading', { level: 1 });
    const locationBadge = await screen.findByText("📍 Available for remote opportunities");
    expect(locationBadge).toHaveClass("text-[#656d76]");
    expect(locationBadge).toHaveClass("dark:text-[#8b949e]");
  });

  it("has correct padding and border radius", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
      />
    );
    await screen.findByRole('heading', { level: 1 });
    const locationBadge = await screen.findByText("📍 Available for remote opportunities");
    expect(locationBadge).toHaveClass("px-3");
    expect(locationBadge).toHaveClass("py-1");
    expect(locationBadge).toHaveClass("rounded-full");
  });

  it("has correct font styling", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
      />
    );
    await screen.findByRole('heading', { level: 1 });
    const locationBadge = await screen.findByText("📍 Available for remote opportunities");
    expect(locationBadge).toHaveClass("font-sans");
    expect(locationBadge).toHaveClass("text-sm");
  });

  it("appears after subtitle in correct position", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
      />
    );
    const heading = await screen.findByRole('heading', { level: 1 });
    const locationBadge = await screen.findByText("📍 Available for remote opportunities");
    const description = await screen.findByText("Test Description");
    // Get the parent container
    const container = heading.closest(".space-y-6");
    const children = Array.from(container?.children || []);
    const headingIndex = children.findIndex(child => child.contains(heading));
    const badgeIndex = children.findIndex(child => child.contains(locationBadge));
    const descriptionIndex = children.findIndex(child => child.contains(description));
    expect(badgeIndex).toBeGreaterThan(headingIndex);
    expect(descriptionIndex).toBeGreaterThan(badgeIndex);
  });

  it("does not render old location badge when location prop is provided", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        location="San Francisco, CA"
      />
    );
    await screen.findByRole('heading', { level: 1 });
    expect(screen.queryByText("San Francisco, CA")).not.toBeInTheDocument();
    const locationBadge = await screen.findByText("📍 San Francisco, CA");
    expect(locationBadge).toBeInTheDocument();
  });

  it("uses location prop in the new GitHub-style badge", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
        location="Istanbul, Turkey • Remote Worldwide"
      />
    );
    await screen.findByRole('heading', { level: 1 });
    const locationBadge = await screen.findByText("📍 Istanbul, Turkey • Remote Worldwide");
    expect(locationBadge).toBeInTheDocument();
    expect(locationBadge).toHaveClass("bg-[#f6f8fa]");
    expect(locationBadge).toHaveClass("dark:bg-[#21262d]");
    expect(locationBadge).toHaveClass("rounded-full");
  });

  it("falls back to default text when no location prop is provided", async () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
      />
    );
    await screen.findByRole('heading', { level: 1 });
    const locationBadge = await screen.findByText("📍 Available for remote opportunities");
    expect(locationBadge).toBeInTheDocument();
  });
}); 