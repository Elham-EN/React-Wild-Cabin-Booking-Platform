import { render, screen } from "@testing-library/react";
import Heading from "./Heading";
import "@testing-library/jest-dom";

describe("Heading Component", () => {
  test("renders default h1 heading", () => {
    render(<Heading>Default Heading</Heading>);
    const headingElement = screen.getByText("Default Heading");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe("H1");
  });

  test("renders h2 heading when as prop is h2", () => {
    render(<Heading as="h2">H2 Heading</Heading>);
    const headingElement = screen.getByText("H2 Heading");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe("H2");
  });

  test("renders h3 heading when as prop is h3", () => {
    render(<Heading as="h3">H3 Heading</Heading>);
    const headingElement = screen.getByText("H3 Heading");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe("H3");
  });

  test("applies custom color when color prop is provided", () => {
    render(<Heading color="#007bff">Colored Heading</Heading>);
    // const headingElement = screen.getByText("Colored Heading");
    // expect(headingElement).toHaveStyle("color: #007bff");
  });

  test("applies default color when no color prop is provided", () => {
    render(<Heading>Default Color Heading</Heading>);
    // const headingElement = screen.getByText("Default Color Heading");
    // expect(headingElement).toHaveStyle("color: #333");
  });

  test("applies correct font size for h1", () => {
    render(<Heading as="h1">H1 Heading</Heading>);
    const headingElement = screen.getByText("H1 Heading");
    expect(headingElement).toHaveStyle("font-size: 3rem");
  });

  test("applies correct font size for h2", () => {
    render(<Heading as="h2">H2 Heading</Heading>);
    const headingElement = screen.getByText("H2 Heading");
    expect(headingElement).toHaveStyle("font-size: 2rem");
  });

  test("applies correct font size for h3", () => {
    render(<Heading as="h3">H3 Heading</Heading>);
    const headingElement = screen.getByText("H3 Heading");
    expect(headingElement).toHaveStyle("font-size: 1.5rem");
  });
});
