import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-styled-components";
import Button from "./Button";
import { ThemeProvider } from "styled-components";

// Mock theme for styled-components
const theme = {
  colors: {
    brand: {
      50: "#f0f0f0",
      600: "#1a1a1a",
      700: "#0a0a0a",
    },
    grey: {
      0: "#ffffff",
      50: "#f5f5f5",
      200: "#e0e0e0",
      600: "#757575",
    },
    red: {
      100: "#ffcccb",
      700: "#d32f2f",
      800: "#c62828",
    },
  },
};

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe("Button Component", () => {
  test("renders with default props", () => {
    renderWithTheme(<Button>Default Button</Button>);
    const button = screen.getByText("Default Button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle(`
      font-size: 1.4rem;
      padding: 1.2rem 1.6rem;
    `);
  });

  test("renders small size button", () => {
    renderWithTheme(<Button size="small">Small Button</Button>);
    const button = screen.getByText("Small Button");
    expect(button).toHaveStyle(`
      font-size: 1.2rem;
      padding: 0.4rem 0.8rem;
    `);
  });

  test("renders large size button", () => {
    renderWithTheme(<Button size="large">Large Button</Button>);
    const button = screen.getByText("Large Button");
    expect(button).toHaveStyle(`
      font-size: 1.6rem;
      padding: 1.2rem 2.4rem;
    `);
  });

  test("renders primary variation", () => {
    renderWithTheme(<Button variation="primary">Primary Button</Button>);
    const button = screen.getByText("Primary Button");
    expect(button).toHaveStyleRule("color", "var(--color-brand-50)");
    expect(button).toHaveStyleRule("background-color", "var(--color-brand-600)");
  });

  test("renders secondary variation", () => {
    renderWithTheme(<Button variation="secondary">Secondary Button</Button>);
    const button = screen.getByText("Secondary Button");
    expect(button).toHaveStyleRule("color", "var(--color-grey-600)");
    expect(button).toHaveStyleRule("background", "var(--color-grey-0)");
    expect(button).toHaveStyleRule("border", "1px solid var(--color-grey-200)");
  });

  test("renders danger variation", () => {
    renderWithTheme(<Button variation="danger">Danger Button</Button>);
    const button = screen.getByText("Danger Button");
    expect(button).toHaveStyleRule("color", "var(--color-red-100)");
    expect(button).toHaveStyleRule("background-color", "var(--color-red-700)");
  });

  test("applies custom className", () => {
    renderWithTheme(<Button className="custom-class">Custom Class Button</Button>);
    const button = screen.getByText("Custom Class Button");
    expect(button).toHaveClass("custom-class");
  });

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    renderWithTheme(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInTheDocument();
  });

  test("handles click events", () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders with long text without breaking layout", () => {
    renderWithTheme(
      <Button>This is a very long button text that should not break the layout</Button>
    );
    const button = screen.getByText(
      "This is a very long button text that should not break the layout"
    );
    expect(button).toBeInTheDocument();
    // You might want to add more specific checks here depending on how you want long text to be handled
  });

  test("is disabled when disabled prop is true", () => {
    renderWithTheme(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText("Disabled Button");
    expect(button).toBeDisabled();
  });

  test("renders children correctly", () => {
    renderWithTheme(
      <Button>
        <span>Child 1</span>
        <span>Child 2</span>
      </Button>
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });
});
