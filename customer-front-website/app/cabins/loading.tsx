import React from "react";
import Spinner from "@/app/_components/Spinner";

export default function loading(): React.ReactElement {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}
