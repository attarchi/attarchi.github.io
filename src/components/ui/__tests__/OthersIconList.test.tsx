import { render, screen, fireEvent } from "@testing-library/react";
import { OthersIconList } from "../OthersIconList";

const mockOthers = [
  { name: "GitHub", icon: "github-mark" },
  { name: "Prisma", icon: "prisma" },
  { name: "CouchDB", icon: "couchdb" }
];

describe("OthersIconList", () => {
  it("renders others section with title", () => {
    render(<OthersIconList others={mockOthers} />);
    
    expect(screen.getByText("Others")).toBeInTheDocument();
  });

  it("renders all other skills as icons", () => {
    render(<OthersIconList others={mockOthers} />);
    
    expect(screen.getByRole("img", { name: /github icon/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /prisma icon/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /couchdb icon/i })).toBeInTheDocument();
  });

  it("renders icons with proper size and styling", () => {
    render(<OthersIconList others={mockOthers} />);
    
    const icons = screen.getAllByRole("img");
    icons.forEach(icon => {
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
    });
  });

  it("applies circle frame styling to icons", () => {
    render(<OthersIconList others={mockOthers} />);
    
    const iconContainers = screen.getAllByTestId("other-icon-container");
    iconContainers.forEach(container => {
      const innerDiv = container.querySelector('div');
      expect(innerDiv).toHaveClass("rounded-full", "border-2", "p-2");
    });
  });

  it("shows tooltip on hover", () => {
    render(<OthersIconList others={mockOthers} />);
    
    const githubIcon = screen.getByRole("img", { name: /github icon/i });
    const container = githubIcon.closest('[data-testid="other-icon-container"]');
    
    fireEvent.mouseEnter(container!);
    
    // Tooltip should be visible
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("hides tooltip when mouse leaves", () => {
    render(<OthersIconList others={mockOthers} />);
    
    const githubIcon = screen.getByRole("img", { name: /github icon/i });
    const container = githubIcon.closest('[data-testid="other-icon-container"]');
    
    fireEvent.mouseEnter(container!);
    fireEvent.mouseLeave(container!);
    
    // Tooltip should be hidden
    expect(screen.queryByText("GitHub")).not.toBeInTheDocument();
  });

  it("handles empty others array", () => {
    render(<OthersIconList others={[]} />);
    
    expect(screen.queryByText("Others")).not.toBeInTheDocument();
    expect(screen.queryByTestId("other-icon-container")).not.toBeInTheDocument();
  });

  it("handles undefined others", () => {
    render(<OthersIconList others={undefined} />);
    
    expect(screen.queryByText("Others")).not.toBeInTheDocument();
  });
}); 