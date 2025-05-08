import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cabins",
};

// Server-side Rendered Component
export default function page(): React.ReactElement {
  return <h1>Cabins Page</h1>;
}
