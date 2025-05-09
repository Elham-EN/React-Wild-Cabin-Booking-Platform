import { Metadata } from "next";
import React from "react";
import { Cabin } from "@/app/_types/Cabin";
import CabinCard from "@/app/_components/CabinCard";

export const metadata: Metadata = {
  title: "Cabins",
};

// Server-side Rendered Component
export default function page(): React.ReactElement {
  const cabins: Cabin[] = [];
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
      {cabins.length > 0 && (
        <div>
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </div>
  );
}
