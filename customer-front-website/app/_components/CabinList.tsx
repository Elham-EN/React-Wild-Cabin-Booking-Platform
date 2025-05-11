import React, { ReactElement } from "react";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_libs/api-service";

// Server Component
export default async function CabinList(): Promise<ReactElement | null> {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
