import { Metadata } from "next";
import React, { Key, ReactElement, Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";

// This will skip the Full Route Cache and the Data Cache. Meaning
// components will be rendered and data fetched every 1 hr.
// (This page rendered dynamically) (Route Level)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cabins",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Server-side Rendered Component
async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  // Await the searchParams promise in next.js v15
  const params = await searchParams;
  // Get the capacity parameter with proper type handling
  const filter = params?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* Fallback was not shown in the cabin list because all page navigation are 
        wrapped in transition & suspense will not re-render the fallback. To fix
        that we need to pass a key */}
      <Suspense fallback={<Spinner />} key={filter as Key}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}

export default Page;
