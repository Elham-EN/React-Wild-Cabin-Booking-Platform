"use client";

import React, { useState } from "react";
import SideNavigation from "../_components/SideNavigation";
import { Bars3Icon } from "@heroicons/react/24/solid";

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

/**
 * Account section layout with responsive sidebar navigation
 * On mobile, the sidebar is hidden by default and can be toggled
 * On desktop, the sidebar is always visible
 */
function Layout(props: LayoutProps): React.ReactElement {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-full">
      {/* Mobile menu toggle button - only visible on small screens */}
      <button
        className="fixed top-20 left-4 z-30 md:hidden bg-primary-900 text-primary-200 p-2 rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-expanded={isSidebarOpen}
        aria-label="Toggle sidebar navigation"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Responsive grid layout */}
      <div className="grid md:grid-cols-[16rem_1fr] h-full">
        {/* Sidebar - fixed on mobile when open, always visible on desktop */}
        <div
          className={`
            fixed md:static top-0 left-0 h-full bg-primary-950 z-20
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0
          `}
        >
          <SideNavigation onNavItemClick={() => setIsSidebarOpen(false)} />
        </div>

        {/* Overlay to close sidebar on mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main content area */}
        <div className="px-4 md:px-8 py-6 md:py-8">{props.children}</div>
      </div>
    </div>
  );
}

export default Layout;
