"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactElement } from "react";

export default function Filter(): ReactElement {
  // Lets you read the current URL's query string "?capacity=all"
  const searchParams = useSearchParams();
  // Allows you to programmatically change routes
  const router = useRouter();
  // Lets you read the current URL's pathname
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter: string): void => {
    //  Defines utility methods to work with the query string of a URL
    const params = new URLSearchParams(searchParams);
    // This only builds the URL but not navigating to it
    params.set("capacity", filter);
    // Where to move to?
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border border-primary-800 flex">
      <FilterButton
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        <p> All cabins </p>
      </FilterButton>
      <FilterButton
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        <p> 1 &mdash; 3 guests </p>
      </FilterButton>
      <FilterButton
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        <p> 4 &mdash; 7 guests </p>
      </FilterButton>
      <FilterButton
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        <p>8 &mdash; 12 guests </p>
      </FilterButton>
    </div>
  );
}

interface FilterButtonProps {
  filter: string;
  handleFilter: (filter: string) => void;
  activeFilter: string;
  children: React.ReactNode;
}

function FilterButton({
  filter,
  handleFilter,
  activeFilter,
  children,
}: FilterButtonProps): ReactElement {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 cursor-pointer ${
        filter === activeFilter ? "bg-primary-700" : "text-primary-50"
      }`}
    >
      {children}
    </button>
  );
}
