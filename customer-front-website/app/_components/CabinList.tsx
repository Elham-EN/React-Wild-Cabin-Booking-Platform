import React, { ReactElement } from "react";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_libs/api-service";
import { Cabin } from "@/app/_types/Cabin";

interface CabinListProps {
  filter: string | string[];
}

// Server Component
export default async function CabinList({
  filter,
}: CabinListProps): Promise<ReactElement | null> {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayCabins: Cabin[] | undefined;

  if (filter === "all") displayCabins = cabins;
  if (filter === "small")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins &&
        displayCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
    </div>
  );
}
