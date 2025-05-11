import { getCabin } from "@/app/_libs/api-service";
import React, { ReactElement } from "react";
import Cabin from "@/app/_components/Cabin";

interface PageProps {
  params: Promise<{ cabinId: string }>;
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
