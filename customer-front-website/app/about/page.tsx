import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About",
};

// Server-side Rendered Component
export default function Page(): React.ReactElement {
  return <h1>About Page</h1>;
}
