import { render, screen } from "@testing-library/react";
import { Icon } from "../Icon";

describe("Icon", () => {
  it("renders PNG icon correctly", () => {
    render(<Icon name="react" alt="React icon" />);
    
    const icon = screen.getByRole("img", { name: /react icon/i });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/icons/react.png");
    expect(icon).toHaveAttribute("alt", "React icon");
  });

  it("renders SVG icon correctly", () => {
    render(<Icon name="mongodb" alt="MongoDB icon" />);
    
    const icon = screen.getByRole("img", { name: /mongodb icon/i });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/icons/mongodb.svg");
  });

  it("applies custom size", () => {
    render(<Icon name="react" alt="React icon" size={32} />);
    
    const icon = screen.getByRole("img", { name: /react icon/i });
    expect(icon).toHaveAttribute("width", "32");
    expect(icon).toHaveAttribute("height", "32");
  });

  it("applies custom className", () => {
    render(<Icon name="react" alt="React icon" className="custom-class" />);
    
    const icon = screen.getByRole("img", { name: /react icon/i });
    expect(icon).toHaveClass("custom-class");
  });

  it("renders with default alt text when not provided", () => {
    render(<Icon name="react" />);
    
    const icon = screen.getByRole("img", { name: /react/i });
    expect(icon).toHaveAttribute("alt", "react");
  });

  it("handles missing icons gracefully", () => {
    render(<Icon name="nonexistent" alt="Missing icon" />);
    
    const icon = screen.getByRole("img", { name: /missing icon/i });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/icons/nonexistent.png");
  });

  it("defaults to 24px size when not specified", () => {
    render(<Icon name="react" alt="React icon" />);
    
    const icon = screen.getByRole("img", { name: /react icon/i });
    expect(icon).toHaveAttribute("width", "24");
    expect(icon).toHaveAttribute("height", "24");
  });
}); 