"use client";
import React from "react";
import Link from "next/link";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

interface SideNavigationProps {
  onNavItemClick?: () => void;
}

/**
 * Side navigation component for the account section
 * Responsive design with proper mobile support
 */
function SideNavigation({ onNavItemClick }: SideNavigationProps): React.ReactElement {
  const pathname = usePathname();
  
  return (
    <nav className="border-r border-primary-400 w-64 md:w-auto h-full">
      <ul className="flex flex-col gap-2 h-full text-base md:text-lg p-4 pt-20 md:p-0">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 
                transition-colors flex items-center gap-4 font-semibold rounded-sm md:rounded-none
                text-primary-200 ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
              onClick={onNavItemClick}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
        <li className="mt-auto">
          <SignOutButton onClick={onNavItemClick} />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
