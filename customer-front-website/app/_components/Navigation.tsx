"use client";

import React, { useState } from "react";
import Link from "next/link";

/**
 * Navigation component that displays the main site navigation links.
 * Responsive design with a hamburger menu on mobile and horizontal links on desktop.
 */
export default function Navigation(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="z-10 text-xl relative">
      {/* Mobile hamburger button - only visible on small screens */}
      <button 
        className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 focus:outline-none"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation menu"
      >
        <span className={`block w-6 h-0.5 bg-current transition-transform duration-200 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-current transition-opacity duration-200 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-6 h-0.5 bg-current transition-transform duration-200 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* 
        Desktop navigation - Horizontal style for larger screens 
        Hidden on mobile screens
      */}
      <ul className="hidden md:flex md:gap-16 md:items-center">
        <li>
          <Link
            href={"/cabins"}
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href={"/about"}
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href={"/account"}
            className="hover:text-accent-400 transition-colors"
          >
            Guest Area
          </Link>
        </li>
      </ul>

      {/* 
        Mobile menu - Shown when hamburger is clicked
        Fixed position that slides in from the right on mobile
        Hidden on desktop screens
      */}
      <ul 
        className={`
          md:hidden fixed top-0 right-0 flex flex-col gap-6 bg-primary-950 p-12 pt-24 h-screen w-64 shadow-xl 
          transition-all duration-300 ease-in-out z-20
          ${isMenuOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}
        `}
      >
        {/* Close button for mobile menu - positioned at the top right */}
        <button 
          className="absolute top-6 right-6 text-2xl p-2"
          onClick={toggleMenu}
          aria-label="Close navigation menu"
        >
          ✕
        </button>
        
        <li>
          <Link
            href={"/cabins"}
            className="hover:text-accent-400 transition-colors block py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href={"/about"}
            className="hover:text-accent-400 transition-colors block py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href={"/account"}
            className="hover:text-accent-400 transition-colors block py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Guest Area
          </Link>
        </li>
      </ul>

      {/* Overlay that appears behind the mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}
    </nav>
  );
}
