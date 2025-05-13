import { getCabin, getCabins } from "@/app/_libs/api-service";
import React, { ReactElement } from "react";
import Cabin from "@/app/_components/Cabin";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ cabinId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  return ids;
}

// Any page or layout is associated with a dynamic route segment
// which get access to a 'params' arg / prop
async function Page({ params }: PageProps): Promise<ReactElement> {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
    </div>
  );
}

export default Page;
