import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test("calls onClick prop when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("is disabled when disabled prop is true", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    expect(screen.getByText("Disabled")).toBeDisabled();
    fireEvent.click(screen.getByText("Disabled"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
