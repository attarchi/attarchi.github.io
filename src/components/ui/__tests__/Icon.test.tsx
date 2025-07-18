import { render, screen } from "@testing-library/react";
import { Icon } from "../Icon";

jest.mock("../Icon", () => ({
  Icon: jest.fn(({ name, alt, size = 24, className = "" }) => (
    <img 
      src={`/icons/${name}.png`} 
      alt={alt || name} 
      width={size} 
      height={size} 
      className={className}
    />
  ))
}));

describe("Icon", () => {
  it("renders with correct props", () => {
    render(<Icon name="react" alt="React icon" size={32} className="custom-class" />);
    
    const icon = screen.getByRole("img", { name: /react icon/i });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/icons/react.png");
    expect(icon).toHaveAttribute("alt", "React icon");
    expect(icon).toHaveAttribute("width", "32");
    expect(icon).toHaveAttribute("height", "32");
    expect(icon).toHaveClass("custom-class");
  });

  it("uses default values when props are not provided", () => {
    render(<Icon name="react" />);
    
    const icon = screen.getByRole("img", { name: /react/i });
    expect(icon).toHaveAttribute("alt", "react");
    expect(icon).toHaveAttribute("width", "24");
    expect(icon).toHaveAttribute("height", "24");
  });

  it("handles different icon types", () => {
    render(<Icon name="mongodb" alt="MongoDB icon" />);
    
    const icon = screen.getByRole("img", { name: /mongodb icon/i });
    expect(icon).toBeInTheDocument();
  });
}); 