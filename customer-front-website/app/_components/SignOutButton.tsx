"use client";

import React from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";

interface SignOutButtonProps {
  onClick?: () => void;
}

export default function SignOutButton({ onClick }: SignOutButtonProps): React.ReactElement {
  return (
    <button
      className="flex items-center gap-4 py-3 px-5 w-full
        hover:bg-primary-900 hover:text-primary-100 transition-colors
          font-semibold text-primary-200 cursor-pointer rounded-sm md:rounded-none"
      onClick={onClick}
    >
      <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-primary-600" />
      <span>Sign out</span>
    </button>
  );
}
