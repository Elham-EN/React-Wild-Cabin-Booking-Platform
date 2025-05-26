import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_libs/api-service";
import { Cabin } from "../_types/Cabin";
import { auth } from "../_libs/auth";
import LoginMessage from "./LoginMessage";

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

  const session = await auth();

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
        {session?.user ? <ReservationForm cabin={cabin} /> : <LoginMessage />}
      </div>
    </div>
  );
}
