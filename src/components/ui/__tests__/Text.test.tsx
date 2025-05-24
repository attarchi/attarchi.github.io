import { render, screen } from "@testing-library/react";
import { Text } from "../Text";

describe("Text", () => {
  it("renders with default props", () => {
    render(<Text>Default text</Text>);
    const textElement = screen.getByText("Default text");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("text-base text-text font-normal");
  });

  it("renders with custom size", () => {
    render(<Text size="xl">Large text</Text>);
    const textElement = screen.getByText("Large text");
    expect(textElement).toHaveClass("text-xl");
  });

  it("renders with custom variant", () => {
    render(<Text variant="muted">Muted text</Text>);
    const textElement = screen.getByText("Muted text");
    expect(textElement).toHaveClass("text-muted");
  });

  it("renders with custom weight", () => {
    render(<Text weight="bold">Bold text</Text>);
    const textElement = screen.getByText("Bold text");
    expect(textElement).toHaveClass("font-bold");
  });

  it("renders with custom className", () => {
    render(<Text className="custom-class">Custom class text</Text>);
    const textElement = screen.getByText("Custom class text");
    expect(textElement).toHaveClass("custom-class");
  });

  it("renders with all custom props", () => {
    render(
      <Text size="lg" variant="subtle" weight="semibold" className="custom-class">
        Custom text
      </Text>
    );
    const textElement = screen.getByText("Custom text");
    expect(textElement).toHaveClass("text-lg text-subtle font-semibold custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = jest.fn();
    render(<Text ref={ref}>Ref text</Text>);
    expect(ref).toHaveBeenCalled();
  });

  it("forwards additional props", () => {
    render(<Text data-testid="test-text" aria-label="Test label">Props text</Text>);
    const textElement = screen.getByTestId("test-text");
    expect(textElement).toHaveAttribute("aria-label", "Test label");
  });
}); 