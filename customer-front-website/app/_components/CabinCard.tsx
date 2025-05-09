import React from "react";
import { Cabin } from "@/app/_types/Cabin";

interface CabinCardProps {
  cabin: Cabin;
}

function CabinCard({ cabin }: CabinCardProps): React.ReactElement {
  return <div>{cabin.name}</div>;
}

export default CabinCard;
