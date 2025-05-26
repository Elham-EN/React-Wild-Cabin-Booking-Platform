"use client";
import React from "react";
import { format } from "date-fns";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useReservation } from "../_libs/contexts";

export default function ReservationReminder(): React.ReactElement | null {
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-accent-500 text-primary-800 
        py-5 px-8 rounded-full font-semibold shadow-xl shadow-slate-900 flex gap-8 
        items-center"
    >
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
        onClick={resetRange}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
