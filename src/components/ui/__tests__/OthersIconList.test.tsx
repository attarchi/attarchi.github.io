import { render, screen, fireEvent } from "@testing-library/react";
import { OthersIconList } from "../OthersIconList";

jest.mock("../Icon", () => ({
  Icon: jest.fn(({ name, alt, size }) => (
    <img src={`/icons/${name}.png`} alt={alt} width={size} height={size} />
  ))
}));

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

  it("shows tooltip on hover", () => {
    render(<OthersIconList others={mockOthers} />);
    
    const githubIcon = screen.getByRole("img", { name: /github icon/i });
    const container = githubIcon.closest('[data-testid="other-icon-container"]');
    
    fireEvent.mouseEnter(container!);
    
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("hides tooltip when mouse leaves", () => {
    render(<OthersIconList others={mockOthers} />);
    
    const githubIcon = screen.getByRole("img", { name: /github icon/i });
    const container = githubIcon.closest('[data-testid="other-icon-container"]');
    
    fireEvent.mouseEnter(container!);
    fireEvent.mouseLeave(container!);
    
    expect(screen.queryByText("GitHub")).not.toBeInTheDocument();
  });

  it("handles empty others array", () => {
    render(<OthersIconList others={[]} />);
    
    expect(screen.queryByText("Others")).not.toBeInTheDocument();
    expect(screen.queryByTestId("other-icon-container")).not.toBeInTheDocument();
  });

  it("handles undefined others", () => {
    render(<OthersIconList />);
    
    expect(screen.queryByText("Others")).not.toBeInTheDocument();
    expect(screen.queryByTestId("other-icon-container")).not.toBeInTheDocument();
  });
}); 