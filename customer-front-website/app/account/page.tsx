import { Metadata } from "next";
import React from "react";
import { auth } from "../_libs/auth";

export const metadata: Metadata = {
  title: "Account",
};

// Server-side Rendered Component
export default async function Page(): Promise<React.ReactElement> {
  const session = await auth();
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session?.user?.name}
    </h2>
  );
}
