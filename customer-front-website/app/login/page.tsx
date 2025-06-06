import React from "react";
import SignInButton from "../_components/SignInButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function page(): React.ReactElement {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
}
