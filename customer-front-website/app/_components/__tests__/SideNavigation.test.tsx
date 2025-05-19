import React from "react";
import { render, screen } from "../../__tests__/utils/test-utils";
import SideNavigation from "../../_components/SideNavigation";

// Mock usePathname to test different active states
const mockedUsePathname = jest.requireMock("next/navigation").usePathname;

describe("SideNavigation", () => {
  beforeEach(() => {
    // Reset mock to default value
    mockedUsePathname.mockImplementation(() => "/account");
  });

  it("renders all navigation links correctly", () => {
    render(<SideNavigation />);

    // Check all navigation links are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Reservations")).toBeInTheDocument();
    expect(screen.getByText("Guest profile")).toBeInTheDocument();

    // Check all icons are rendered
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  it("includes SignOutButton at the bottom", () => {
    render(<SideNavigation />);
    expect(screen.getByText("Sign out")).toBeInTheDocument();
  });

  it("highlights the Home link when pathname is /account", () => {
    mockedUsePathname.mockImplementation(() => "/account");
    render(<SideNavigation />);

    // Get all links (we could use getByRole, but this is more direct for this test)
    const homeLink = screen.getByText("Home").closest("a");
    const reservationsLink = screen.getByText("Reservations").closest("a");
    const profileLink = screen.getByText("Guest profile").closest("a");

    // Check Home link has bg-primary-900 class (indicating it's active)
    expect(homeLink).toHaveClass("bg-primary-900");

    // Check other links don't have the active class
    expect(reservationsLink).not.toHaveClass("bg-primary-900");
    expect(profileLink).not.toHaveClass("bg-primary-900");
  });

  it("highlights the Reservations link when pathname is /account/reservations", () => {
    mockedUsePathname.mockImplementation(() => "/account/reservations");
    render(<SideNavigation />);

    const homeLink = screen.getByText("Home").closest("a");
    const reservationsLink = screen.getByText("Reservations").closest("a");
    const profileLink = screen.getByText("Guest profile").closest("a");

    expect(homeLink).not.toHaveClass("bg-primary-900");
    expect(reservationsLink).toHaveClass("bg-primary-900");
    expect(profileLink).not.toHaveClass("bg-primary-900");
  });

  it("highlights the Guest profile link when pathname is /account/profile", () => {
    mockedUsePathname.mockImplementation(() => "/account/profile");
    render(<SideNavigation />);

    const homeLink = screen.getByText("Home").closest("a");
    const reservationsLink = screen.getByText("Reservations").closest("a");
    const profileLink = screen.getByText("Guest profile").closest("a");

    expect(homeLink).not.toHaveClass("bg-primary-900");
    expect(reservationsLink).not.toHaveClass("bg-primary-900");
    expect(profileLink).toHaveClass("bg-primary-900");
  });
});
