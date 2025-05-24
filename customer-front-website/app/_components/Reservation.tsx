import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_libs/api-service";
import { Cabin } from "../_types/Cabin";

interface ReservationProps {
  cabin: Cabin;
}

export default async function Reservation({
  cabin,
}: ReservationProps): Promise<React.ReactElement> {
  // Get data at the same time instead of one by one
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div
      className="rounded-lg overflow-hidden shadow-xl border border-primary-800 
        mx-auto max-w-5xl my-8"
    >
      <div className="grid md:grid-cols-2 grid-cols-1 min-h-[550px]">
        <DateSelector
          settings={settings}
          bookedDates={bookedDates}
          cabin={cabin}
        />
        <ReservationForm cabin={cabin} />
      </div>
    </div>
  );
}
