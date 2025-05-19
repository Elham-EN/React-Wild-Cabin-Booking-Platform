import React from "react";
import { render, screen } from "../../__tests__/utils/test-utils";
import SignOutButton from "../../_components/SignOutButton";

describe("SignOutButton", () => {
  it("renders sign out button correctly", () => {
    render(<SignOutButton />);

    // Check if text is rendered
    const signOutText = screen.getByText("Sign out");
    expect(signOutText).toBeInTheDocument();

    // Check if icon is rendered
    const signOutIcon = screen.getByTestId("signout-icon");
    expect(signOutIcon).toBeInTheDocument();
  });

  it("has correct styling", () => {
    render(<SignOutButton />);

    // Find the button element
    const button = screen.getByRole("button");

    // Check if it has the expected classes
    expect(button).toHaveClass("flex");
    expect(button).toHaveClass("items-center");
    expect(button).toHaveClass("gap-4");
    expect(button).toHaveClass("py-3");
    expect(button).toHaveClass("px-5");
    expect(button).toHaveClass("w-full");
  });
});
