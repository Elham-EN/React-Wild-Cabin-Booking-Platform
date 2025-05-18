/**
 * Filter Component for Cabin Capacity Filtering
 * 
 * This client-side component provides a user interface for filtering cabins by capacity.
 * It manages URL query parameters to enable shareable filtered views and browser history integration.
 */

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactElement } from "react";

/**
 * Filter Component
 * 
 * Renders a set of filter buttons that allow users to filter cabins by capacity ranges.
 * Uses Next.js navigation hooks to manage URL parameters for state persistence.
 * 
 * Features:
 * - Updates URL query parameters (preserved in browser history)
 * - Maintains filter state across page refreshes
 * - Allows for shareable filtered URLs
 * - Provides visual indication of active filter
 * 
 * @returns {ReactElement} The rendered filter component with filter buttons
 */
export default function Filter(): ReactElement {
  // Get the current URL search parameters (?capacity=value)
  const searchParams = useSearchParams();
  
  // Router used for programmatic navigation without full page refreshes
  const router = useRouter();
  
  // Current URL path without query parameters
  const pathname = usePathname();
  
  // Extract the active filter from URL, defaulting to "all" if not present
  const activeFilter = searchParams.get("capacity") ?? "all";

  /**
   * Handles filter button clicks by updating the URL query parameters
   * 
   * @param {string} filter - The filter value to apply (all, small, medium, large)
   * @returns {void}
   */
  const handleFilter = (filter: string): void => {
    // Create a mutable copy of the current search parameters
    const params = new URLSearchParams(searchParams);
    
    // Set the capacity parameter to the selected filter value
    params.set("capacity", filter);
    
    // Update the URL with the new parameters while preserving the current path
    // The scroll: false option prevents the page from scrolling to top on filter change
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border border-primary-800 flex">
      {/* Filter buttons for different cabin capacity ranges */}
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

/**
 * Props Interface for the FilterButton Component
 * 
 * @property {string} filter - The filter value this button represents (all, small, medium, large)
 * @property {Function} handleFilter - Callback function when filter is selected
 * @property {string} activeFilter - Currently active filter for highlighting the selected button
 * @property {React.ReactNode} children - Content to display inside the button
 */
interface FilterButtonProps {
  filter: string;
  handleFilter: (filter: string) => void;
  activeFilter: string;
  children: React.ReactNode;
}

/**
 * FilterButton Component
 * 
 * A reusable button component for filter options that:
 * - Handles click events to update the active filter
 * - Applies appropriate styling based on whether it's the active filter
 * - Displays custom content via children prop
 * 
 * @param {FilterButtonProps} props - Component props
 * @returns {ReactElement} The rendered filter button
 */
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
        // Apply different background styling to indicate active state
        filter === activeFilter ? "bg-primary-700" : "text-primary-50"
      }`}
    >
      {children}
    </button>
  );
}
