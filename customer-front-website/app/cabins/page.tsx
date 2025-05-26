/**
 * Cabins Page Component
 *
 * This is the main page for displaying all available cabins with filtering capability.
 * Implements server-side rendering with dynamic data revalidation and suspense for loading states.
 */

import { Metadata } from "next";
import React, { Key, ReactElement, Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

/**
 * Revalidation Configuration
 *
 * Setting revalidate to 3600 seconds (1 hour) ensures:
 * - The page is rendered dynamically (Server-Side Rendering)
 * - The Full Route Cache and Data Cache are bypassed
 * - Data is refreshed every hour, balancing freshness with performance
 */
export const revalidate = 3600;

/**
 * Page Metadata
 *
 * Defines the page title for SEO and browser tabs
 */
export const metadata: Metadata = {
  title: "Cabins",
};

/**
 * Props Interface for the Page Component
 *
 * @property {Promise<Object>} searchParams - URL query parameters passed to the page
 * In Next.js 15, searchParams is a Promise that needs to be awaited
 */
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Server-side Rendered Page Component for Cabins Listing
 *
 * This component:
 * - Processes URL query parameters for filtering
 * - Displays descriptive content about the cabins
 * - Renders a filter component for user interaction
 * - Implements Suspense for graceful loading states during data fetching
 *
 * @param {PageProps} props - Component props containing searchParams
 * @returns {Promise<ReactElement>} The rendered page content
 */
async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  // Await the searchParams promise - Next.js v15 specific pattern
  const params = await searchParams;

  // Extract and normalize the capacity filter parameter
  // Default to "all" if no capacity filter is specified
  const filter = params?.capacity ?? "all";

  return (
    <div>
      {/* Page heading with styled typography */}
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>

      {/* Descriptive paragraph with styled typography */}
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      {/* Container for the filter component, aligned to the right */}
      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* 
        Suspense Boundary with Loading Spinner
        
        The key attribute is critical here:
        - When filter changes, the key changes, forcing Suspense to show the fallback again
        - This fixes an issue where navigations wrapped in transitions don't re-render the fallback
      */}
      <Suspense fallback={<Spinner />} key={filter as Key}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}

export default Page;
