import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Account",
};

// Server-side Rendered Component
export default function Page(): React.ReactElement {
  return (
    <h1 className="text-5xl text-center bg-amber-600 p-5 font-bold">
      AccountPage
    </h1>
  );
}
