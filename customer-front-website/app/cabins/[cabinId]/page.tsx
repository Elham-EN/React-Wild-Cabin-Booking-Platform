/**
 * Individual Cabin Detail Page
 * 
 * This page displays detailed information about a specific cabin.
 * It implements dynamic routes, static generation, and server-side metadata generation.
 */

import { getCabin, getCabins } from "@/app/_libs/api-service";
import React, { ReactElement } from "react";
import Cabin from "@/app/_components/Cabin";
import { Metadata } from "next";

/**
 * Props Interface for the Page Component
 * 
 * @property {Promise<Object>} params - Route parameters containing the cabinId
 * In Next.js 15, params is a Promise that needs to be awaited
 */
interface PageProps {
  params: Promise<{ cabinId: string }>;
}

/**
 * Dynamic Metadata Generation
 * 
 * This function generates custom metadata for each cabin page:
 * - Fetches the cabin data using the ID from route parameters
 * - Creates a dynamic page title containing the cabin name
 * 
 * @param {PageProps} props - Component props containing route params
 * @returns {Promise<Metadata>} Page metadata including title
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Extract cabinId from params (awaiting the Promise)
  const { cabinId } = await params;
  
  // Fetch cabin data to get the name
  const { name } = await getCabin(cabinId);
  
  // Return dynamic metadata with cabin name in the title
  return {
    title: `Cabin ${name}`,
  };
}

/**
 * Static Path Generation for Static Site Generation (SSG)
 * 
 * This function:
 * - Pre-renders pages at build time for all existing cabins
 * - Improves performance by generating static HTML
 * - Enables SEO benefits of pre-rendered content
 * 
 * @returns {Promise<Array<{cabinId: string}>>} Array of path params to pre-render
 */
export async function generateStaticParams() {
  // Fetch all cabins to get their IDs
  const cabins = await getCabins();
  
  // Map each cabin to its ID parameter format
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  
  return ids;
}

/**
 * Cabin Detail Page Component
 * 
 * This server component:
 * - Extracts the cabin ID from route parameters
 * - Fetches detailed information for the specific cabin
 * - Renders the cabin details in a centered container
 * 
 * @param {PageProps} props - Component props containing route params
 * @returns {Promise<ReactElement>} The rendered cabin detail page
 */
async function Page({ params }: PageProps): Promise<ReactElement> {
  // Extract cabinId from params (awaiting the Promise)
  const { cabinId } = await params;
  
  // Fetch detailed cabin data using the ID
  const cabin = await getCabin(cabinId);

  return (
    // Container with maximum width and centered horizontally
    <div className="max-w-6xl mx-auto mt-8">
      {/* Render the Cabin component with the fetched data */}
      <Cabin cabin={cabin} />
    </div>
  );
}

export default Page;
