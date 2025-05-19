import React from "react";
import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

/**
 * Header component that contains the logo and navigation.
 * Fully responsive with a hamburger menu on mobile screens.
 */
function Header(): React.ReactElement {
  return (
    <header className="border-b border-primary-900 px-4 sm:px-6 md:px-8 py-4 md:py-5 relative z-20">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
