"use client";

import { useRouter } from "next/navigation";
import React, { ReactElement } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
}

function Error({ error }: ErrorProps): ReactElement {
  const router = useRouter();
  return (
    <main className="flex flex-col justify-center items-center  gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>
      <button
        type="button"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 
            text-lg cursor-pointer hover:bg-accent-600 transition-colors"
        onClick={() => router.push("/")}
      >
        Try again
      </button>
    </main>
  );
}

export default Error;
